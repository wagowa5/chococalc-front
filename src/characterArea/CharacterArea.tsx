import React, { useState } from 'react';
import { CharacterStatus } from '../interface/Status';
import './CharacterArea.css';

import { TextField, Box, Grid } from '@mui/material';

const CharacterArea = () => {

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
        <Grid item xs={11} >
        <Grid container spacing={4} >
            <Grid item xs={1}></Grid>
            <Grid item xs={2}>
                <TextField 
                    name='level'
                    label='Lv:'
                    placeholder='99'
                />
            </Grid>
            <Grid item xs={4}>
                <TextField 
                    name='HP'
                    label='HP:'
                    placeholder='10000'
                />
            </Grid>
            <Grid item xs={4}>
                <TextField 
                    name='SP'
                    label='SP:'
                    placeholder='10000'
                />
            </Grid>
        </Grid>
        </Grid>

        {/* ステ振り, カード, 合計 */}
        <Grid item xs={12}>
            <Grid container spacing={3} className='character-status'>
                <Grid item xs={2}>
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

                <Grid item xs={8}>
                <div className='sum-status'>
                    <div>合計(ヌシステあり、ビタ等なしの数値を入力)</div>
                    <TextField 
                        name='pow'
                        label='合計POW:'
                        placeholder='入力例: 162+342'
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
                />
                </Grid>
                <Grid item xs={5}>
                <TextField 
                    type='string'
                    label='DEF:'
                    name='def'
                    placeholder='1'
                />
                </Grid>
                <Grid item xs={5}>
                <TextField 
                    type='string'
                    label='MAT:'
                    name='mat'
                    placeholder='1'
                />
                </Grid>
                <Grid item xs={5}>
                <TextField 
                    type='string'
                    label='MDF:'
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
