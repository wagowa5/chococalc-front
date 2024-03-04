import React, { useState } from 'react';

// ステータスの型定義
interface Status {
    pow: number;
    int: number;
    vit: number;
    spd: number;
    luk: number;
    atk: number;
    mat: number;
}

const StatusInput = () => {
    // ステータスのステート
    const [status, setStatus] = useState<Status>({
        pow: 0,
        int: 0,
        vit: 0,
        spd: 0,
        luk: 0,
        atk: 0,
        mat: 0,
    });

    // ステータスを更新するハンドラ
    const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>, type: keyof Status) => {
        setStatus({ ...status, [type]: Number(e.target.value) });
    };

    return (
        <div>
            <label>
                POW:
                <input type="number" value={status.pow} onChange={(e) => handleStatusChange(e, 'pow')} />
            </label>
            {/* 各ステータスの入力フィールドを追加 */}
            {/* ... */}
            <button onClick={() => console.log(status)}>ステータスを確認</button>
        </div>
    );
};

export default StatusInput;
