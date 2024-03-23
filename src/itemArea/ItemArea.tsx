import React, { useEffect, useState } from 'react';

import { evaluate } from 'maths.ts';

import { Character } from '../interface/Status';
import { MESSAGES, FIELDS } from '../constants/constants';
import ButtonGroupComponent from './ButtonGroupComponent';
import ScrollSelect from './ScrollSelect';
import { 
    vitaButtonsData, canButtonsData, sealButtonsData, liquidButtonsData,
    hpSpScrollOptions, basicScrollOptions, detailScrollOptions
} from './itemConfig';

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
    const [errorMessages, setErrorMessages] = useState<ErrorMessages>({});

    // 巻物のセレクトボックス
    const [hpScroll, setHpScroll] = React.useState('');
    const [spScroll, setSpScroll] = React.useState('');
    const [powScroll, setPowScroll] = React.useState('');
    const [intScroll, setIntScroll] = React.useState('');
    const [spdScroll, setSpdScroll] = React.useState('');
    const [vitScroll, setVitScroll] = React.useState('');
    const [lukScroll, setLukScroll] = React.useState('');
    const [atkScroll, setAtkScroll] = React.useState('');
    const [defScroll, setDefScroll] = React.useState('');
    const [matScroll, setMatScroll] = React.useState('');
    const [mdfScroll, setMdfScroll] = React.useState('');

    // 巻物のセレクトボックスの変更時の処理
    const handleHpScrollChange = (event: SelectChangeEvent) => {
        setHpScroll(event.target.value);
    };
    const handleSpScrollChange = (event: SelectChangeEvent) => {
        setSpScroll(event.target.value);
    };
    const handlePowScrollChange = (event: SelectChangeEvent) => {
        setPowScroll(event.target.value);
    };
    const handleIntScrollChange = (event: SelectChangeEvent) => {
        setIntScroll(event.target.value);
    };
    const handleSpdScrollChange = (event: SelectChangeEvent) => {
        setSpdScroll(event.target.value);
    };
    const handleVitScrollChange = (event: SelectChangeEvent) => {
        setVitScroll(event.target.value);
    };
    const handleLukScrollChange = (event: SelectChangeEvent) => {
        setLukScroll(event.target.value);
    };
    const handleAtkScrollChange = (event: SelectChangeEvent) => {
        setAtkScroll(event.target.value);
    };
    const handleDefScrollChange = (event: SelectChangeEvent) => {
        setDefScroll(event.target.value);
    };
    const handleMatScrollChange = (event: SelectChangeEvent) => {
        setMatScroll(event.target.value);
    };
    const handleMdfScrollChange = (event: SelectChangeEvent) => {
        setMdfScroll(event.target.value);
    };

    return (
        <>
        <Grid container spacing={1} justifyContent="center" alignItems="start">
            {/* ----- 1行目 ----- */}
            {/* ビタと缶・シールのリセットボタン */}
            <Grid item xs={4}>
                <Button variant="contained">ビタリセット</Button>
            </Grid>
            <Grid item xs={4}>
                <Button variant="contained">缶・シールリセット</Button>
            </Grid>
            <Grid item xs={4}></Grid>
                
            {/* ----- 2行目 ----- */}
            {/* ビタ */}
            <Grid item xs={4}>
                <ButtonGroupComponent buttons={vitaButtonsData} />
            </Grid>
            
            {/* 魔獣缶・シール(かき氷) */}
            <Grid item xs={4}>
                <Grid container spacing={1}>
                    {/* 魔獣缶 */}
                    <Grid item xs = {6}>
                        <ButtonGroupComponent buttons={canButtonsData} />
                    </Grid>

                    {/* シール(かき氷) */}
                    <Grid item xs = {6}>
                        <ButtonGroupComponent buttons={sealButtonsData} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={4}></Grid>

            {/* ----- 3行目 ----- */}
            {/* 巻物とリキッドのリセットボタン */}
            <Grid item xs={8}>
                <Button variant="contained">巻物リセット</Button>
            </Grid>
            <Grid item xs={4}>
                <Button variant="contained">リキッドリセット</Button>
            </Grid>

            {/* ----- 4行目 ----- */}
            {/* 巻物 */}
            <Grid item xs={8}>
                <Grid container spacing={0}>
                    {/* HP */}
                    <Grid item xs={3}>
                        <ScrollSelect
                            options={hpSpScrollOptions}
                            label="HP"
                            selectedValue={hpScroll}
                            onChange={handleHpScrollChange}
                        />
                    </Grid>
                    {/* SP */}
                    <Grid item xs={3}>
                        <ScrollSelect
                            options={hpSpScrollOptions}
                            label="SP"
                            selectedValue={spScroll}
                            onChange={handleSpScrollChange}
                        />
                    </Grid>
                    <Grid item xs={6}></Grid>
                    {/* POW */}
                    <Grid item xs={3}>
                        <ScrollSelect
                            options={basicScrollOptions}
                            label="POW"
                            selectedValue={powScroll}
                            onChange={handlePowScrollChange}
                        />
                    </Grid>
                    {/* INT */}
                    <Grid item xs={3}>
                        <ScrollSelect
                            options={basicScrollOptions}
                            label="INT"
                            selectedValue={intScroll}
                            onChange={handleIntScrollChange}
                        />
                    </Grid>
                    {/* VIT */}
                    <Grid item xs={3}>
                        <ScrollSelect
                            options={basicScrollOptions}
                            label="VIT"
                            selectedValue={vitScroll}
                            onChange={handleVitScrollChange}
                        />
                    </Grid>
                    <Grid item xs={3}></Grid>
                    {/* SPD */}
                    <Grid item xs={3}>
                        <ScrollSelect
                            options={basicScrollOptions}
                            label="SPD"
                            selectedValue={spdScroll}
                            onChange={handleSpdScrollChange}
                        />
                    </Grid>
                    {/* LUK */}
                    <Grid item xs={3}>
                        <ScrollSelect
                            options={basicScrollOptions}
                            label="LUK"
                            selectedValue={lukScroll}
                            onChange={handleLukScrollChange}
                        />
                    </Grid>
                    <Grid item xs={6}></Grid>

                    {/* ATK */}
                    <Grid item xs={3}>
                        <ScrollSelect
                            options={detailScrollOptions}
                            label="ATK"
                            selectedValue={atkScroll}
                            onChange={handleAtkScrollChange}
                        />
                    </Grid>
                    {/* DEF */}
                    <Grid item xs={3}>
                        <ScrollSelect
                            options={detailScrollOptions}
                            label="DEF"
                            selectedValue={defScroll}
                            onChange={handleDefScrollChange}
                        />
                    </Grid>
                    {/* MAT */}
                    <Grid item xs={3}>
                        <ScrollSelect
                            options={detailScrollOptions}
                            label="MAT"
                            selectedValue={matScroll}
                            onChange={handleMatScrollChange}
                        />
                    </Grid>
                    {/* MDF */}
                    <Grid item xs={3}>
                        <ScrollSelect
                            options={detailScrollOptions}
                            label="MDF"
                            selectedValue={mdfScroll}
                            onChange={handleMdfScrollChange}
                        />
                    </Grid>
                    
                </Grid>
            </Grid>

            {/* リキッド */}
            <Grid item xs={4}>
                <ButtonGroupComponent buttons={liquidButtonsData} />
            </Grid>
        </Grid>
        </>
    )
}

export default ItemArea;
