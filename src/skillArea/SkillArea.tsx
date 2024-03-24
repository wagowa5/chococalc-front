import React, { useEffect, useState } from 'react';

import { evaluate } from 'maths.ts';

import { Character } from '../interface/Status';
import { MESSAGES, FIELDS } from '../constants/constants';

import { TextField, Box, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


interface ErrorMessages {
    [key: string]: string;
}

/**
 * ItemAreaProps
 */
interface ItemAreaProps {
}

const ItemArea = (
    {
    }: ItemAreaProps
) => {

    return (
        <>
        <Grid container spacing={1} justifyContent="center" alignItems="start">
            {/* ----- 1行目 ----- */}
            {/* スキルリセットボタン */}
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
                <Button variant="contained">スキルリセット</Button>
            </Grid>
            <Grid item xs={3}></Grid>

            {/* スキル */}
            {/* ----- 2行目 ----- */}
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
                <Button variant="outlined">ブラッドスクレイパー</Button>
            </Grid>
            <Grid item xs={3}></Grid>

            {/* ----- 3行目 ----- */}
            <Grid item xs={1}></Grid>
            <Grid item xs={5}>
                <Button variant="outlined">妖精王の祝福(物理)</Button>
            </Grid>
            <Grid item xs={5}>
                <Button variant="outlined">妖精王の祝福(魔法)</Button>
            </Grid>
            <Grid item xs={1}></Grid>

            {/* ----- 4行目 ----- */}
            <Grid item xs={1}></Grid>
            <Grid item xs={5}>
                <Button variant="outlined">大天使の加護</Button>
            </Grid>
            <Grid item xs={5}>
                <Button variant="outlined">祝福の蒼盾</Button>
            </Grid>
            <Grid item xs={1}></Grid>

            {/* ----- 5行目 ----- */}
            <Grid item xs={1}></Grid>
            <Grid item xs={5}>
                <Button variant="outlined">リエ</Button>
            </Grid>
            <Grid item xs={5}>
                <Button variant="outlined">リアぱ</Button>
            </Grid>
            <Grid item xs={1}></Grid>

            {/* ----- 6行目 ----- */}
            <Grid item xs={1}></Grid>
            <Grid item xs={5}>
                <Button variant="outlined">邪神の呪詛</Button>
            </Grid>
            <Grid item xs={5}>
                <Button variant="outlined"></Button>
            </Grid>
            <Grid item xs={1}></Grid>
        </Grid>
        </>
    )
}

export default ItemArea;
