import React, { useState } from 'react';
import { CharacterStatus } from '../interface/Status';
import './CharacterArea.css';

import { TextField, Box, Grid } from '@mui/material';

// propsの型定義を追加
interface CharacterAreaProps {
    characterStatus: CharacterStatus;
    updateCharacterStatus: (newStatus: CharacterStatus) => void;
}

const CharacterArea = ({ characterStatus, updateCharacterStatus }: CharacterAreaProps) => {

    const handleInputStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // TODO type見てstringなら↓してNumberする
        // const anExampleVariable = Function('return (' + your-string + ');')()
        const newStatus = {
            ...characterStatus,
            status: {
                ...characterStatus.status,
                [name]: Number(value),
            },
        };
        updateCharacterStatus(newStatus); // Appから渡された関数を使用して状態を更新
    };

    return (
        <Box
            component='section'
            aria-label='ステータス入力'
            height={400}
            width={550}
            my={4}
            display='flex'
            alignItems='center'
            gap={4}
            p={2}
            sx={{ border: '1px dashed grey' }}
        >
        <Grid container spacing={3}>

        {/* レベル, HP, SP */}
        <Grid item xs={12} >
        <Grid container spacing={4} >
            <Grid item xs={1}></Grid>
            <Grid item xs={3}>
                <TextField 
                    name='level'
                    label='Lv:'
                    placeholder='99'
                    value={characterStatus.status.pow === 0 ? '' : characterStatus.status.pow}
                    onChange={handleInputStatusChange}
                />
            </Grid>
            <Grid item xs={3}>
                <TextField 
                    name='HP'
                    label='HP:'
                    placeholder='10000'
                    // TODO intに変える
                    value={characterStatus.status.pow === 0 ? '' : characterStatus.status.pow}
                    onChange={handleInputStatusChange}
                />
            </Grid>
            <Grid item xs={3}>
                <TextField 
                    name='SP'
                    label='SP:'
                    placeholder='10000'
                    value={characterStatus.status.pow === 0 ? '' : characterStatus.status.pow}
                    onChange={handleInputStatusChange}
                />
            </Grid>
        </Grid>
        </Grid>

        {/* ステ振り, カード, 合計 */}
        <Grid item xs={12}>
            <Grid container spacing={3} className='character-status'>
                <Grid item xs={3}>
                <div className='base-status'>
                    <div>ステ振り</div>
                    <TextField 
                        name='pow'
                        label='POW:'
                        placeholder='157'
                        value={characterStatus.status.pow === 0 ? '' : characterStatus.status.pow}
                        onChange={handleInputStatusChange}
                    />
                    <TextField 
                        name='int'
                        label='INT:'
                        placeholder='157'
                        value={characterStatus.status.pow === 0 ? '' : characterStatus.status.pow}
                        onChange={handleInputStatusChange}
                    />
                    <TextField 
                        name='spd'
                        label='SPD:'
                        placeholder='157'
                        value={characterStatus.status.pow === 0 ? '' : characterStatus.status.pow}
                        onChange={handleInputStatusChange}
                    />
                    <TextField 
                        name='vit'
                        label='VIT:'
                        placeholder='157'
                        value={characterStatus.status.pow === 0 ? '' : characterStatus.status.pow}
                        onChange={handleInputStatusChange}
                    />
                    <TextField 
                        name='luk'
                        label='LUK:'
                        placeholder='157'
                        value={characterStatus.status.pow === 0 ? '' : characterStatus.status.pow}
                        onChange={handleInputStatusChange}
                    />
                </div>
                </Grid>

                <Grid item xs={2}>
                <div className='card-status'>
                <div>カード</div>
                    <TextField 
                        name='pow'
                        label='POW:'
                        placeholder='157'
                        value={characterStatus.status.pow === 0 ? '' : characterStatus.status.pow}
                        onChange={handleInputStatusChange}
                    />
                    <TextField 
                        name='int'
                        label='INT:'
                        placeholder='157'
                        value={characterStatus.status.pow === 0 ? '' : characterStatus.status.pow}
                        onChange={handleInputStatusChange}
                    />
                    <TextField 
                        name='spd'
                        label='SPD:'
                        placeholder='157'
                        value={characterStatus.status.pow === 0 ? '' : characterStatus.status.pow}
                        onChange={handleInputStatusChange}
                    />
                    <TextField 
                        name='vit'
                        label='VIT:'
                        placeholder='157'
                        value={characterStatus.status.pow === 0 ? '' : characterStatus.status.pow}
                        onChange={handleInputStatusChange}
                    />
                    <TextField 
                        name='luk'
                        label='LUK:'
                        placeholder='157'
                        value={characterStatus.status.pow === 0 ? '' : characterStatus.status.pow}
                        onChange={handleInputStatusChange}
                    />
                </div>
                </Grid>

                <Grid item xs={7}>
                <div className='sum-status'>
                    <div>合計(ヌシステはあり、ビタ等なしの数値)</div>
                    <TextField 
                        name='pow'
                        label='合計POW:'
                        type='string'
                        placeholder='入力例: 162+342'
                        value={characterStatus.status.pow === 0 ? '' : characterStatus.status.pow}
                        onChange={handleInputStatusChange}
                    />
                    <TextField 
                        name='int'
                        label='INT:'
                        type='string'
                        placeholder='入力例: 162+342'
                        value={characterStatus.status.pow === 0 ? '' : characterStatus.status.pow}
                        onChange={handleInputStatusChange}
                    />
                    <TextField 
                        name='spd'
                        label='SPD:'
                        type='string'
                        placeholder='入力例: 162+342'
                        value={characterStatus.status.pow === 0 ? '' : characterStatus.status.pow}
                        onChange={handleInputStatusChange}
                    />
                    <TextField 
                        name='vit'
                        label='VIT:'
                        type='string'
                        placeholder='入力例: 162+342'
                        value={characterStatus.status.pow === 0 ? '' : characterStatus.status.pow}
                        onChange={handleInputStatusChange}
                    />
                    <TextField 
                        name='luk'
                        label='LUK:'
                        type='string'
                        placeholder='入力例: 162+342'
                        value={characterStatus.status.pow === 0 ? '' : characterStatus.status.pow}
                        onChange={handleInputStatusChange}
                    />
                </div>
                </Grid>
            </Grid>
        </Grid>

        {/* ATK, DEF, MAT, MDF */}
        <Grid item xs={12}>
            <Grid container spacing={2} className='detail-status'>
                <Grid item xs={5}>
                <TextField 
                    type='string'
                    label='ATK:'
                    name='atk'
                    placeholder='1'
                    value={characterStatus.status.pow === 0 ? '' : characterStatus.status.pow}
                    onChange={handleInputStatusChange}
                />
                </Grid>
                <Grid item xs={5}>
                <TextField 
                    type='string'
                    label='DEF:'
                    name='def'
                    placeholder='1'
                    value={characterStatus.status.pow === 0 ? '' : characterStatus.status.pow}
                    onChange={handleInputStatusChange}
                />
                </Grid>
                <Grid item xs={5}>
                <TextField 
                    type='string'
                    label='MAT:'
                    name='mat'
                    placeholder='1'
                    value={characterStatus.status.pow === 0 ? '' : characterStatus.status.pow}
                    onChange={handleInputStatusChange}
                />
                </Grid>
                <Grid item xs={5}>
                <TextField 
                    type='string'
                    label='MDF:'
                    name='mdf'
                    placeholder='1'
                    value={characterStatus.status.pow === 0 ? '' : characterStatus.status.pow}
                    onChange={handleInputStatusChange}
                />
                </Grid>
            </Grid>
        </Grid>

        </Grid>
        </Box>
    );
};

export default CharacterArea;
