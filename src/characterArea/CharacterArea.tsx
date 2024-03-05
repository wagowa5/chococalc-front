import React, { useState } from 'react';
import { CharacterStatus } from '../interface/Status';
import './CharacterArea.css';

import theme from '../muiSetting/theme';
import { TextField } from "@mui/material";

const CharacterArea = () => {
    // Status型のオブジェクトを初期化
    const initialStatus = {
        pow: 0,
        int: 0,
        spd: 0,
        vit: 0,
        luk: 0,
        atk: 0,
        def: 0,
        mat: 0,
        mdf: 0,
    };

    // CharacterStatusのインスタンスをuseStateで初期化
    const [inputCharacterStatus, setInputCharacterStatus] = useState<CharacterStatus>(new CharacterStatus(initialStatus));

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        // statusプロパティを更新する
        setInputCharacterStatus(prevStatus => new CharacterStatus({ ...prevStatus.status, [name]: Number(value) }));
    }

    // このコードをCSSファイルに移動することもできます
    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr', // 2つのカラムを定義
        gap: '10px', // グリッドアイテム間のスペース
        marginBottom: '20px', // グリッドコンテナの下のスペース
    };

    return (
        <>
            <div className="character-container">
            <div className="status-row">
                <label htmlFor="pow">POW:</label>
                <TextField 
                    name="pow"
                    placeholder='157'
                />
            </div>
            <div className="status-row">
                <label htmlFor="int">INT:</label>
                <TextField type="number" name="int" onChange={handleInputChange} placeholder='1' />
            </div>
            <div className="status-row">
                <label htmlFor="spd">SPD:</label>
                <TextField type="number" name="spd" onChange={handleInputChange} placeholder='1' />
            </div>
            <div className="status-row">
                <label htmlFor="vit">VIT:</label>
                <TextField type="number" name="vit" onChange={handleInputChange} placeholder='1' />
            </div>
            <div className="status-row">
                <label htmlFor="luk">LUK:</label>
                <TextField type="number" name="luk" onChange={handleInputChange} placeholder='1' />
            </div>

            <div className="status-grid">
                <div className="status-cell">
                    <label htmlFor="atk">ATK:</label>
                    <TextField type="number" name="atk" onChange={handleInputChange} placeholder='1' />
                </div>
                <div className="status-cell">
                    <label htmlFor="def">DEF:</label>
                    <TextField type="number" name="def" onChange={handleInputChange} placeholder='1' />
                </div>
                <div className="status-cell">
                    <label htmlFor="mat">MAT:</label>
                    <TextField type="number" name="mat" onChange={handleInputChange} placeholder='1' />
                </div>
                <div className="status-cell">
                    <label htmlFor="mdf">MDF:</label>
                    <TextField variant='outlined' type="number" name="mdf" onChange={handleInputChange} placeholder='1' />
                </div>
            </div>
        </div>
        </>
    );
};

export default CharacterArea;
