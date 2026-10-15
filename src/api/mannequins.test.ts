import { deleteMannequin, getMannequins, storeMannequin } from './mannequins';

const fetchMock = jest.fn();
beforeEach(() => {
    global.fetch = fetchMock;
    fetchMock.mockReset();
    process.env.REACT_APP_CHOCOCALC_API_ENDPOINT = 'https://api.example.test/';
});

test('GET returns mannequins and sends the bearer token', async () => {
    const items = [{ mannequinName: 'A', statusFields: {} }];
    fetchMock.mockResolvedValue({ ok: true, json: async () => items });
    await expect(getMannequins('token')).resolves.toEqual(items);
    expect(fetchMock).toHaveBeenCalledWith('https://api.example.test/mannequins', {
        headers: { Authorization: 'Bearer token' },
    });
});

test('POST sends JSON and DELETE encodes reserved characters in the name', async () => {
    fetchMock.mockResolvedValue({ ok: true });
    await storeMannequin('token', { mannequinName: 'abc', inputStatus: {} });
    expect(fetchMock.mock.calls[0][1]).toEqual({ method: 'POST',
        headers: { Authorization: 'Bearer token', 'Content-Type': 'application/json' },
        body: JSON.stringify({ mannequinName: 'ABC', statusFields: {} }),
    });
    await deleteMannequin('token', 'a &?#日本');
    const [url, options] = fetchMock.mock.calls[1];
    expect(new URL(url).searchParams.get('mannequinName')).toBe('A &?#日本');
    expect(options.method).toBe('DELETE');
});

test.each([401, 403, 500])('HTTP %s rejects rather than returning an empty success', async status => {
    fetchMock.mockResolvedValue({ ok: false, status });
    await expect(getMannequins('token')).rejects.toThrow(String(status));
    await expect(storeMannequin('token', { mannequinName: 'a', inputStatus: {} })).rejects.toThrow(String(status));
    await expect(deleteMannequin('token', 'a')).rejects.toThrow(String(status));
});

test('network errors and malformed responses reject', async () => {
    fetchMock.mockRejectedValueOnce(new Error('offline'));
    await expect(getMannequins('token')).rejects.toThrow('offline');
    fetchMock.mockResolvedValue({ ok: true, json: async () => ({ message: 'not an array' }) });
    await expect(getMannequins('token')).rejects.toThrow('応答が不正');
});
