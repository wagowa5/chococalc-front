import React, { useEffect, useState } from 'react';

import { evaluate } from 'maths.ts';

import { StatusInputFields, CharacterStatus } from './../interface/Status';
import { MESSAGES, FIELDS, ITEMS, STATUS } from '../constants/constants';
import ButtonGroupComponent from './ButtonGroupComponent';
import ScrollSelect from './ScrollSelect';
import { 
    vitaButtonsData, canButtonsData, sealButtonsData, liquidButtonsData,
    hpSpScrollOptions, basicScrollOptions, detailScrollOptions
} from './itemConfig';
import { 
    getInputStatus,
    calculateDisplayStatus,
    resetAllItemSkillStatus,
    resetVitaStatus,
    resetCanSealStatus,
    resetScrollStatus,
    resetLiquidStatus,
    resetBradScraperStatus,
    resetSpecialSkillStatus,
} from '../util/StatusUtil';

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
    characterStatus: CharacterStatus;
    updateCharacter: (newCharacterStatus: CharacterStatus) => void;
    inputStatus: StatusInputFields;
    updateInputStatus: (newInputStatus: StatusInputFields) => void;
}

const ItemArea = (
    {
        characterStatus,
        updateCharacter,
        inputStatus,
        updateInputStatus,
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

    // ビタボタンクリック時の処理を生成する関数
    const generateVitaHandler = (statusKey: string) => {
        // 入力値を取得
        getInputStatus(characterStatus, inputStatus, updateCharacter);

        const newCharacterStatus = { ...characterStatus };        
        // ビタのステータスを更新
        if (newCharacterStatus[statusKey].base * 0.2 < 1) {
            newCharacterStatus[statusKey].vita = 1;
        } else {
            newCharacterStatus[statusKey].vita = Math.floor(newCharacterStatus[statusKey].base * 0.2);
        };
        
        updateCharacter(newCharacterStatus);
        calculateDisplayStatus(characterStatus, updateCharacter);
    };
    // ビタボタンクリック時の処理
    const handleVitaButtons: {[key: string]: { handle: () => void; }} = {
        [ITEMS.VITA.ALL.key]: { handle: () => {
            // 入力値を取得
            getInputStatus(characterStatus, inputStatus, updateCharacter);

            const newCharacterStatus = { ...characterStatus };
            // ビタのステータスを更新
            if (newCharacterStatus[STATUS.POW].base * 0.1 < 1) {
                newCharacterStatus[STATUS.POW].allVita = 1;
            } else {
                newCharacterStatus[STATUS.POW].allVita = Math.floor(newCharacterStatus[STATUS.POW].base * 0.1);
            };
            if (newCharacterStatus[STATUS.INT].base * 0.1 < 1) {
                newCharacterStatus[STATUS.INT].allVita = 1;
            } else {
                newCharacterStatus[STATUS.INT].allVita = Math.floor(newCharacterStatus[STATUS.INT].base * 0.1);
            };
            if (newCharacterStatus[STATUS.SPD].base * 0.1 < 1) {
                newCharacterStatus[STATUS.SPD].allVita = 1;
            } else {
                newCharacterStatus[STATUS.SPD].allVita = Math.floor(newCharacterStatus[STATUS.SPD].base * 0.1);
            };
            if (newCharacterStatus[STATUS.VIT].base * 0.1 < 1) {
                newCharacterStatus[STATUS.VIT].allVita = 1;
            } else {
                newCharacterStatus[STATUS.VIT].allVita = Math.floor(newCharacterStatus[STATUS.VIT].base * 0.1);
            };
            if (newCharacterStatus[STATUS.LUK].base * 0.1 < 1) {
                newCharacterStatus[STATUS.LUK].allVita = 1;
            } else {
                newCharacterStatus[STATUS.LUK].allVita = Math.floor(newCharacterStatus[STATUS.LUK].base * 0.1);
            };

            updateCharacter(newCharacterStatus);
            calculateDisplayStatus(characterStatus, updateCharacter);
        }},
        [ITEMS.VITA.POW.key]: { handle: () => { generateVitaHandler(STATUS.POW); }},
        [ITEMS.VITA.INT.key]: { handle: () => { generateVitaHandler(STATUS.INT); }},
        [ITEMS.VITA.SPD.key]: { handle: () => { generateVitaHandler(STATUS.SPD); }},
        [ITEMS.VITA.VIT.key]: { handle: () => { generateVitaHandler(STATUS.VIT); }},
        [ITEMS.VITA.LUK.key]: { handle: () => { generateVitaHandler(STATUS.LUK); }},
    };

    // 缶ボタンクリック時の処理
    const handleCanButtons: {[key: string]: { handle: () => void; }} = {
        [ITEMS.CAN.A.key]: { handle: () => {
            // 入力値を取得
            getInputStatus(characterStatus, inputStatus, updateCharacter);

            // ビタ・缶・シールのステータスをリセットしてから更新
            resetCanSealStatus(characterStatus, updateCharacter);
            const newCharacterStatus = { ...characterStatus };
            newCharacterStatus[STATUS.POW].canSeal = 10;
            newCharacterStatus[STATUS.INT].canSeal = -10;
            
            updateCharacter(newCharacterStatus);
            calculateDisplayStatus(characterStatus, updateCharacter);
        }},
        [ITEMS.CAN.B.key]: { handle: () => {
            // 入力値を取得
            getInputStatus(characterStatus, inputStatus, updateCharacter);
            
            // ビタ・缶・シールのステータスをリセットしてから更新
            resetCanSealStatus(characterStatus, updateCharacter);
            const newCharacterStatus = { ...characterStatus };
            newCharacterStatus[STATUS.INT].canSeal = 10;
            newCharacterStatus[STATUS.VIT].canSeal = -10;
            
            updateCharacter(newCharacterStatus);
            calculateDisplayStatus(characterStatus, updateCharacter);
        }},
    };

    // シールボタンクリック時の処理
    const handleSealButtons: {[key: string]: { handle: () => void; }} = {
        [ITEMS.SEAL.POW.key]: { handle: () => {
            // 入力値を取得
            getInputStatus(characterStatus, inputStatus, updateCharacter);

            // ビタ・缶・シールのステータスをリセットしてから更新
            resetCanSealStatus(characterStatus, updateCharacter);
            const newCharacterStatus = { ...characterStatus };
            newCharacterStatus[STATUS.POW].canSeal = 15;
            newCharacterStatus[STATUS.INT].canSeal = -15;
            
            updateCharacter(newCharacterStatus);
            calculateDisplayStatus(characterStatus, updateCharacter);
        }},
        [ITEMS.SEAL.INT.key]: { handle: () => {
            // 入力値を取得
            getInputStatus(characterStatus, inputStatus, updateCharacter);
            
            // ビタ・缶・シールのステータスをリセットしてから更新
            resetCanSealStatus(characterStatus, updateCharacter);
            const newCharacterStatus = { ...characterStatus };
            newCharacterStatus[STATUS.INT].canSeal = 15;
            newCharacterStatus[STATUS.POW].canSeal = -15;
            
            updateCharacter(newCharacterStatus);
            calculateDisplayStatus(characterStatus, updateCharacter);
        }},
        [ITEMS.SEAL.SPD.key]: { handle: () => {
            // 入力値を取得
            getInputStatus(characterStatus, inputStatus, updateCharacter);
            
            // ビタ・缶・シールのステータスをリセットしてから更新
            resetCanSealStatus(characterStatus, updateCharacter);
            const newCharacterStatus = { ...characterStatus };
            newCharacterStatus[STATUS.SPD].canSeal = 15;
            newCharacterStatus[STATUS.LUK].canSeal = -15;
            
            updateCharacter(newCharacterStatus);
            calculateDisplayStatus(characterStatus, updateCharacter);
        }},
        [ITEMS.SEAL.VIT.key]: { handle: () => {
            // 入力値を取得
            getInputStatus(characterStatus, inputStatus, updateCharacter);
            
            // ビタ・缶・シールのステータスをリセットしてから更新
            resetCanSealStatus(characterStatus, updateCharacter);
            const newCharacterStatus = { ...characterStatus };
            newCharacterStatus[STATUS.VIT].canSeal = 15;
            newCharacterStatus[STATUS.SPD].canSeal = -15;
            
            updateCharacter(newCharacterStatus);
            calculateDisplayStatus(characterStatus, updateCharacter);
        }},
        [ITEMS.SEAL.LUK.key]: { handle: () => {
            // 入力値を取得
            getInputStatus(characterStatus, inputStatus, updateCharacter);
            
            // ビタ・缶・シールのステータスをリセットしてから更新
            resetCanSealStatus(characterStatus, updateCharacter);
            const newCharacterStatus = { ...characterStatus };
            newCharacterStatus[STATUS.LUK].canSeal = 15;
            newCharacterStatus[STATUS.VIT].canSeal = -15;
            
            updateCharacter(newCharacterStatus);
            calculateDisplayStatus(characterStatus, updateCharacter);
        }},
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
                <ButtonGroupComponent buttons={vitaButtonsData} handles={handleVitaButtons} />
            </Grid>
            
            {/* 魔獣缶・シール(かき氷) */}
            <Grid item xs={4}>
                <Grid container spacing={1}>
                    {/* 魔獣缶 */}
                    <Grid item xs = {6}>
                        <ButtonGroupComponent buttons={canButtonsData} handles={handleCanButtons} />
                    </Grid>

                    {/* シール(かき氷) */}
                    <Grid item xs = {6}>
                        <ButtonGroupComponent buttons={sealButtonsData} handles={handleSealButtons} />
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
