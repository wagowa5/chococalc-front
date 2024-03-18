import React, { useEffect, useState } from 'react';

import { evaluate } from 'maths.ts';

import { Character } from '../interface/Status';
import { MESSAGES, FIELDS } from '../constants/text';

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

/**
 * ビタボタン
 *  TODO 全ボタン用意する
 *  TODO フィールド名を定数ファイルにして、そこから取得する
 */
const vitaButtons = [
    <Button key="all-vita">ALLビタ</Button>,
    <Button key="pvita">POWビタ</Button>,
    <Button key="ivita">INTビタ</Button>,
    <Button key="svita">SPDビタ</Button>,
];

/**
 * 缶ボタン
 *  TODO フィールド名を定数ファイルにして、そこから取得する
 */
const canButtons = [
    <Button key="canA">魔獣覚醒缶A</Button>,
    <Button key="canB">魔獣覚醒缶B</Button>,
];

/**
 * シールボタン(かき氷)
 *  TODO フィールド名を定数ファイルにして、そこから取得する
 */
const sealButtons = [
    <Button key="pseal">シールPOW</Button>,
    <Button key="iseal">シールINT</Button>,
];

/**
 * HP,SP巻物のセレクトボックスの値
 */
const hpSpScrollValues = [
    <MenuItem value={0}><em>None</em></MenuItem>,
    <MenuItem value={800}>肆ノ巻</MenuItem>,
    <MenuItem value={1000}>伍ノ巻</MenuItem>,
    <MenuItem value={1200}>陸ノ巻</MenuItem>,
];

/**
 * POW, INT, SPD, VIT, LUK巻物のセレクトボックスの値
 */
const basicScrollValues = [
    <MenuItem value={0}><em>None</em></MenuItem>,
    <MenuItem value={4}>肆ノ巻</MenuItem>,
    <MenuItem value={5}>伍ノ巻</MenuItem>,
    <MenuItem value={6}>陸ノ巻</MenuItem>,
];

/**
 * ATK, DEF, MAT, MDF巻物のセレクトボックスの値
 */
const detailScrollValues = [
    <MenuItem value={0}><em>None</em></MenuItem>,
    <MenuItem value={80}>肆ノ巻</MenuItem>,
    <MenuItem value={100}>伍ノ巻</MenuItem>,
    <MenuItem value={120}>陸ノ巻</MenuItem>,
];

const ItemArea = (
    {
    }: ItemAreaProps
) => {
    const [errorMessages, setErrorMessages] = useState<ErrorMessages>({});

    // 巻物のセレクトボックス
    const [hpScroll, setHpScroll] = React.useState('');
    const [spScroll, setSpScroll] = React.useState('');

    // セレクトボックスの変更時の処理
    const handleHpScrollChange = (event: SelectChangeEvent) => {
        setHpScroll(event.target.value);
    };
    const handleSpScrollChange = (event: SelectChangeEvent) => {
        setSpScroll(event.target.value);
    };

    return (
        <>
        <Grid container spacing={2}>
            {/* ビタ */}
            <Grid item xs={5}>
            <Box
                sx={{
                    display: 'flex',
                    '& > *': {
                        m: 1,
                    },
                }}
            >
                <ButtonGroup orientation="vertical" aria-label="Vertical button group">
                    {vitaButtons}
                </ButtonGroup>
            </Box>
            </Grid>

            {/* 魔獣缶・シール(かき氷) */}
            <Grid item xs={7}>
                <Grid container spacing={2}>
                    {/* 魔獣缶 */}
                    <Grid item xs = {6}>
                    <Box
                        sx={{
                            display: 'flex',
                            '& > *': {
                                m: 1,
                            },
                        }}
                        >
                        <ButtonGroup orientation="vertical" aria-label="Vertical button group">
                            {canButtons}
                        </ButtonGroup>
                    </Box>
                    </Grid>

                    {/* シール(かき氷) */}
                    <Grid item xs = {6}>
                    <Box
                        sx={{
                            display: 'flex',
                            '& > *': {
                                m: 1,
                            },
                        }}
                        >
                        <ButtonGroup orientation="vertical" aria-label="Vertical button group">
                            {sealButtons}
                        </ButtonGroup>
                    </Box>
                    </Grid>
                </Grid>
            </Grid>

            {/* 巻物 */}
            <Grid item xs={6}>
                <Grid container spacing={2}>
                    {/* HP, POW, INT, SPD, VIT, LUK */}
                    <Grid item xs={6}>
                    {/* HP */}
                    <FormControl sx={{ m: 1, minWidth: 80 }}>
                        <InputLabel id="demo-simple-select-autowidth-label">HP</InputLabel>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={hpScroll}
                            onChange={handleHpScrollChange}
                            autoWidth
                            label="HP"
                        >
                            {hpSpScrollValues}
                        </Select>
                    </FormControl>
                    </Grid>

                    {/* SP, ATK, DEF, MAT, MDF */}
                    <Grid item xs={6}>
                    <FormControl sx={{ m: 1, minWidth: 80 }}>
                        <InputLabel id="demo-simple-select-autowidth-label">SP</InputLabel>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={spScroll}
                            onChange={handleSpScrollChange}
                            autoWidth
                            label="SP"
                        >
                            {hpSpScrollValues}
                        </Select>
                    </FormControl>
                    </Grid>
                </Grid>
            </Grid>

            {/* リキッド */}
            <Grid item xs={6}>

            </Grid>
        </Grid>
        </>
    )
}

export default ItemArea;
