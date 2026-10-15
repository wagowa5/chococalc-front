import { StatusInputFields } from '../interface/Status';

export interface Mannequin {
    mannequinName: string;
    statusFields: StatusInputFields;
}

async function request(path: string, token: string, options: RequestInit = {}) {
    const endpoint = process.env.REACT_APP_CHOCOCALC_API_ENDPOINT;
    if (!endpoint) throw new Error('API の接続先が設定されていません。');
    const response = await fetch(`${endpoint.replace(/\/$/, '')}${path}`, {
        ...options,
        headers: {
            Authorization: `Bearer ${token}`,
            ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        },
    });
    if (!response.ok) throw new Error(`API 通信に失敗しました（${response.status}）。`);
    return response;
}

export async function getMannequins(token: string): Promise<Mannequin[]> {
    const response = await request('/mannequins', token);
    const data: unknown = await response.json();
    if (!Array.isArray(data) || data.some(item => !item ||
        typeof item.mannequinName !== 'string' || !item.statusFields ||
        typeof item.statusFields !== 'object')) {
        throw new Error('マネキン一覧の応答が不正です。');
    }
    return data;
}

export async function storeMannequin(token: string,
    data: { mannequinName: string; inputStatus: StatusInputFields }): Promise<void> {
    await request('/mannequin', token, {
        method: 'POST',
        body: JSON.stringify({ mannequinName: data.mannequinName.toUpperCase(), statusFields: data.inputStatus }),
    });
}

export async function deleteMannequin(token: string, name: string): Promise<void> {
    const query = new URLSearchParams({ mannequinName: name.toUpperCase() });
    await request(`/mannequin?${query}`, token, { method: 'DELETE' });
}
