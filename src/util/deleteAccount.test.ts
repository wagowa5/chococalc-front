import { vi } from 'vitest';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { deleteAccount } from './deleteAccount';

const fetchMock = vi.fn();
const session = { isValid: () => true, getIdToken: () => ({ getJwtToken: () => 'token' }) };
function makeUser(sessionError: Error | null = null, deleteError: Error | null = null) {
    return {
        getSession: vi.fn(callback => callback(sessionError, sessionError ? null : session)),
        deleteUser: vi.fn(callback => callback(deleteError)),
        signOut: vi.fn(),
    };
}
beforeEach(() => {
    global.fetch = fetchMock;
    fetchMock.mockReset();
    vi.stubEnv('REACT_APP_CHOCOCALC_API_ENDPOINT', 'https://api.example.test');
});

test('cleans every mannequin before deleting the user and signing out', async () => {
    const user = makeUser();
    fetchMock.mockResolvedValueOnce({ ok: true, json: async () => [
        { mannequinName: 'one', statusFields: {} }, { mannequinName: 'two', statusFields: {} },
    ] }).mockResolvedValue({ ok: true });
    user.deleteUser.mockImplementation(callback => {
        expect(fetchMock).toHaveBeenCalledTimes(3);
        expect(fetchMock.mock.calls.slice(1).every(call => call[1].method === 'DELETE')).toBe(true);
        callback(null);
    });
    await deleteAccount(user as unknown as CognitoUser);
    expect(user.deleteUser).toHaveBeenCalledTimes(1);
    expect(user.signOut).toHaveBeenCalledTimes(1);
});

test('session errors cannot trigger cleanup or account deletion', async () => {
    const user = makeUser(new Error('expired'));
    await expect(deleteAccount(user as unknown as CognitoUser)).rejects.toThrow('再ログイン');
    expect(fetchMock).not.toHaveBeenCalled();
    expect(user.deleteUser).not.toHaveBeenCalled();
});

test('cleanup failure preserves the account and session for retry', async () => {
    const user = makeUser();
    fetchMock.mockResolvedValueOnce({ ok: true, json: async () => [{ mannequinName: 'one', statusFields: {} }] })
        .mockResolvedValueOnce({ ok: false, status: 500 });
    await expect(deleteAccount(user as unknown as CognitoUser)).rejects.toThrow('500');
    expect(user.deleteUser).not.toHaveBeenCalled();
    expect(user.signOut).not.toHaveBeenCalled();
});

test('Cognito deletion failures propagate without signing out', async () => {
    const user = makeUser(null, new Error('Cognito unavailable'));
    fetchMock.mockResolvedValue({ ok: true, json: async () => [] });
    await expect(deleteAccount(user as unknown as CognitoUser)).rejects.toThrow('Cognito unavailable');
    expect(user.signOut).not.toHaveBeenCalled();
});
