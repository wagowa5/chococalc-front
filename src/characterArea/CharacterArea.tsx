import React, { useState } from 'react';
import { CharacterStatus } from '../interface/Status';
import './CharacterArea.css';

import { TextField, Box, Grid } from '@mui/material';

// propsの型定義を追加
interface CharacterAreaProps {
    characterStatus: CharacterStatus;
    updateCharacterStatus: (newStatus: CharacterStatus) => void;
    cardStatus: CharacterStatus;
    updateCardStatus: (newStatus: CharacterStatus) => void;
    inputTotalStatus: CharacterStatus;
    updateInputTotalStatus: (newStatus: CharacterStatus) => void;
}

const CharacterArea = (
    {
        characterStatus, updateCharacterStatus,
        cardStatus, updateCardStatus,
        inputTotalStatus, updateInputTotalStatus,
    }: CharacterAreaProps
) => {

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
                />
            </Grid>
            <Grid item xs={3}>
                <TextField 
                    name='hp'
                    label='HP:'
                    placeholder='10000'
                />
            </Grid>
            <Grid item xs={3}>
                <TextField 
                    name='sp'
                    label='SP:'
                    placeholder='10000'
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
                    />
                    <TextField 
                        name='int'
                        label='INT:'
                        placeholder='157'
                    />
                    <TextField 
                        name='spd'
                        label='SPD:'
                        placeholder='157'
                    />
                    <TextField 
                        name='vit'
                        label='VIT:'
                        placeholder='157'
                    />
                    <TextField 
                        name='luk'
                        label='LUK:'
                        placeholder='157'
                    />
                </div>
                </Grid>

                <Grid item xs={2}>
                <div className='card-status'>
                <div>カード</div>
                    <TextField 
                        name='pow'
                        label='POW:'
                        placeholder='18'
                    />
                    <TextField 
                        name='int'
                        label='INT:'
                        placeholder='18'
                    />
                    <TextField 
                        name='spd'
                        label='SPD:'
                        placeholder='18'
                    />
                    <TextField 
                        name='vit'
                        label='VIT:'
                        placeholder='18'
                    />
                    <TextField 
                        name='luk'
                        label='LUK:'
                        placeholder='18'
                    />
                </div>
                </Grid>

                <Grid item xs={7}>
                <div className='sum-status'>
                    <div>合計(ヌシステはあり、ビタ等なしの数値)</div>
                    <TextField 
                        name='pow'
                        label='合計POW:'
                        placeholder='入力例: 162+342'
                    />
                    <TextField 
                        name='int'
                        label='INT:'
                        placeholder='入力例: 162+342'
                    />
                    <TextField 
                        name='spd'
                        label='SPD:'
                        placeholder='入力例: 162+342'
                    />
                    <TextField 
                        name='vit'
                        label='VIT:'
                        placeholder='入力例: 162+342'
                    />
                    <TextField 
                        name='luk'
                        label='LUK:'
                        placeholder='入力例: 162+342'
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
                    label='表示ATK:'
                    name='atk'
                    placeholder='1'
                />
                </Grid>
                <Grid item xs={5}>
                <TextField 
                    label='表示DEF:'
                    name='def'
                    placeholder='1'
                />
                </Grid>
                <Grid item xs={5}>
                <TextField 
                    label='表示MAT:'
                    name='mat'
                    placeholder='1'
                />
                </Grid>
                <Grid item xs={5}>
                <TextField 
                    label='表示MDF:'
                    name='mdf'
                    placeholder='1'
                />
                </Grid>
            </Grid>
        </Grid>

        </Grid>
        </Box>
    );
};

export default CharacterArea;
