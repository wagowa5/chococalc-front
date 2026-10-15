import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import DeleteAccountDialog from './DeleteAccountDialog';
import { deleteAccount } from '../../util/deleteAccount';

jest.mock('../../util/deleteAccount');
const remove = deleteAccount as jest.MockedFunction<typeof deleteAccount>;
const pool = { getCurrentUser: jest.fn(() => ({})) } as unknown as CognitoUserPool;
const onDeleted = jest.fn();
const onClose = jest.fn();
beforeEach(() => {
    jest.clearAllMocks();
    (pool.getCurrentUser as jest.Mock).mockReturnValue({});
});
function show() { render(<DeleteAccountDialog open userPool={pool} onDeleted={onDeleted} onClose={onClose} />); }

test('requires consent, prevents duplicate submission, and reports success only after completion', async () => {
    let resolve!: () => void;
    remove.mockImplementation(() => new Promise<void>(done => { resolve = done; }));
    show();
    const button = screen.getByRole('button', { name: '完全に削除する' });
    expect(button).toBeDisabled();
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(button);
    fireEvent.click(button);
    expect(remove).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: 'キャンセル' })).toBeDisabled();
    expect(onDeleted).not.toHaveBeenCalled();
    resolve();
    await waitFor(() => expect(onDeleted).toHaveBeenCalledTimes(1));
});

test('cancel never deletes and failure leaves retry available', async () => {
    remove.mockRejectedValue(new Error('network failure'));
    show();
    fireEvent.click(screen.getByRole('button', { name: 'キャンセル' }));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(remove).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('button', { name: '完全に削除する' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('network failure');
    expect(onDeleted).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: '完全に削除する' })).toBeEnabled();
});
