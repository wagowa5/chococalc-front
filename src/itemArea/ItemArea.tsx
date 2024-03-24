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

    // 入力フィールドを取得する関数
    const getInputStatus = () => {
        const newCharacterStatus = { ...characterStatus };
        newCharacterStatus[STATUS.POW].base = evaluate(inputStatus[FIELDS.CHARA_POW].value).getNumberValue();
        newCharacterStatus[STATUS.INT].base = evaluate(inputStatus[FIELDS.CHARA_INT].value).getNumberValue();
        newCharacterStatus[STATUS.VIT].base = evaluate(inputStatus[FIELDS.CHARA_VIT].value).getNumberValue();
        newCharacterStatus[STATUS.SPD].base = evaluate(inputStatus[FIELDS.CHARA_SPD].value).getNumberValue();
        newCharacterStatus[STATUS.LUK].base = evaluate(inputStatus[FIELDS.CHARA_LUK].value).getNumberValue();
        newCharacterStatus[STATUS.POW].card = evaluate(inputStatus[FIELDS.CARD_POW].value).getNumberValue();
        newCharacterStatus[STATUS.INT].card = evaluate(inputStatus[FIELDS.CARD_INT].value).getNumberValue();
        newCharacterStatus[STATUS.VIT].card = evaluate(inputStatus[FIELDS.CARD_VIT].value).getNumberValue();
        newCharacterStatus[STATUS.SPD].card = evaluate(inputStatus[FIELDS.CARD_SPD].value).getNumberValue();
        newCharacterStatus[STATUS.LUK].card = evaluate(inputStatus[FIELDS.CARD_LUK].value).getNumberValue();
        newCharacterStatus[STATUS.LEVEL].totalWithoutItem = evaluate(inputStatus[FIELDS.LEVEL].value).getNumberValue();
        newCharacterStatus[STATUS.HP].totalWithoutItem = evaluate(inputStatus[FIELDS.HP].value).getNumberValue();
        newCharacterStatus[STATUS.SP].totalWithoutItem = evaluate(inputStatus[FIELDS.SP].value).getNumberValue();
        newCharacterStatus[STATUS.POW].totalWithoutItem = evaluate(inputStatus[FIELDS.TOTAL_POW].value).getNumberValue();
        newCharacterStatus[STATUS.INT].totalWithoutItem = evaluate(inputStatus[FIELDS.TOTAL_INT].value).getNumberValue();
        newCharacterStatus[STATUS.VIT].totalWithoutItem = evaluate(inputStatus[FIELDS.TOTAL_VIT].value).getNumberValue();
        newCharacterStatus[STATUS.SPD].totalWithoutItem = evaluate(inputStatus[FIELDS.TOTAL_SPD].value).getNumberValue();
        newCharacterStatus[STATUS.LUK].totalWithoutItem = evaluate(inputStatus[FIELDS.TOTAL_LUK].value).getNumberValue();
        newCharacterStatus[STATUS.ATK].totalWithoutItem = evaluate(inputStatus[FIELDS.ATK].value).getNumberValue();
        newCharacterStatus[STATUS.DEF].totalWithoutItem = evaluate(inputStatus[FIELDS.DEF].value).getNumberValue();
        newCharacterStatus[STATUS.MAT].totalWithoutItem = evaluate(inputStatus[FIELDS.MAT].value).getNumberValue();
        newCharacterStatus[STATUS.MDF].totalWithoutItem = evaluate(inputStatus[FIELDS.MDF].value).getNumberValue();
        updateCharacter(newCharacterStatus);
    };

    // 表示用のステータスを計算する関数
    const calculateDisplayStatus = () => {
        const newCharacterStatus = { ...characterStatus };
        // HPの表示用ステータスを計算
        newCharacterStatus[STATUS.HP].displayStatus = 
            newCharacterStatus[STATUS.HP].totalWithoutItem
            + newCharacterStatus[STATUS.HP].scroll
            + newCharacterStatus[STATUS.HP].specialSkill;
        
        // SPの表示用ステータスを計算
        newCharacterStatus[STATUS.SP].displayStatus = 
            newCharacterStatus[STATUS.SP].totalWithoutItem
            + newCharacterStatus[STATUS.SP].scroll
            + newCharacterStatus[STATUS.SP].specialSkill;
        
        // POWの表示用ステータスを計算
        newCharacterStatus[STATUS.POW].displayStatus = 
            newCharacterStatus[STATUS.POW].totalWithoutItem
            + newCharacterStatus[STATUS.POW].card
            + newCharacterStatus[STATUS.POW].allVita
            + newCharacterStatus[STATUS.POW].vita
            + newCharacterStatus[STATUS.POW].scroll
            + newCharacterStatus[STATUS.POW].canSeal
            + newCharacterStatus[STATUS.POW].bradScraper
            + newCharacterStatus[STATUS.POW].specialSkill;
        
        // INTの表示用ステータスを計算
        newCharacterStatus[STATUS.INT].displayStatus = 
            newCharacterStatus[STATUS.INT].totalWithoutItem
            + newCharacterStatus[STATUS.INT].card
            + newCharacterStatus[STATUS.INT].allVita
            + newCharacterStatus[STATUS.INT].vita
            + newCharacterStatus[STATUS.INT].scroll
            + newCharacterStatus[STATUS.INT].canSeal
            + newCharacterStatus[STATUS.INT].specialSkill;
        
        // SPDの表示用ステータスを計算
        newCharacterStatus[STATUS.SPD].displayStatus = 
            newCharacterStatus[STATUS.SPD].totalWithoutItem
            + newCharacterStatus[STATUS.SPD].card
            + newCharacterStatus[STATUS.SPD].allVita
            + newCharacterStatus[STATUS.SPD].vita
            + newCharacterStatus[STATUS.SPD].scroll
            + newCharacterStatus[STATUS.SPD].canSeal
            + newCharacterStatus[STATUS.SPD].specialSkill;
        
        // VITの表示用ステータスを計算
        newCharacterStatus[STATUS.VIT].displayStatus = 
            newCharacterStatus[STATUS.VIT].totalWithoutItem
            + newCharacterStatus[STATUS.VIT].card
            + newCharacterStatus[STATUS.VIT].allVita
            + newCharacterStatus[STATUS.VIT].vita
            + newCharacterStatus[STATUS.VIT].scroll
            + newCharacterStatus[STATUS.VIT].canSeal
            + newCharacterStatus[STATUS.VIT].specialSkill;
        
        // LUKの表示用ステータスを計算
        newCharacterStatus[STATUS.LUK].displayStatus = 
            newCharacterStatus[STATUS.LUK].totalWithoutItem
            + newCharacterStatus[STATUS.LUK].card
            + newCharacterStatus[STATUS.LUK].allVita
            + newCharacterStatus[STATUS.LUK].vita
            + newCharacterStatus[STATUS.LUK].scroll
            + newCharacterStatus[STATUS.LUK].canSeal
            + newCharacterStatus[STATUS.LUK].specialSkill;
        
        // ATKの表示用ステータスを計算
        newCharacterStatus[STATUS.ATK].displayStatus = 
            newCharacterStatus[STATUS.ATK].totalWithoutItem
            + newCharacterStatus[STATUS.ATK].scroll
            + newCharacterStatus[STATUS.ATK].specialSkill
            + newCharacterStatus[STATUS.ATK].liquid
            + 3*(
                newCharacterStatus[STATUS.POW].card
                + newCharacterStatus[STATUS.POW].allVita
                + newCharacterStatus[STATUS.POW].vita
                + newCharacterStatus[STATUS.POW].scroll
                + newCharacterStatus[STATUS.POW].canSeal
                + newCharacterStatus[STATUS.POW].bradScraper
                + newCharacterStatus[STATUS.POW].specialSkill
            )
            ;
        
        // DEFの表示用ステータスを計算
        newCharacterStatus[STATUS.DEF].displayStatus = 
            newCharacterStatus[STATUS.DEF].totalWithoutItem
            + newCharacterStatus[STATUS.DEF].scroll
            + newCharacterStatus[STATUS.DEF].specialSkill
            + newCharacterStatus[STATUS.DEF].liquid
            + 2*(
                newCharacterStatus[STATUS.VIT].card
                + newCharacterStatus[STATUS.VIT].allVita
                + newCharacterStatus[STATUS.VIT].vita
                + newCharacterStatus[STATUS.VIT].scroll
                + newCharacterStatus[STATUS.VIT].canSeal
                + newCharacterStatus[STATUS.VIT].specialSkill
            );
        
        // MATの表示用ステータスを計算
        newCharacterStatus[STATUS.MAT].displayStatus = 
            newCharacterStatus[STATUS.MAT].totalWithoutItem
            + newCharacterStatus[STATUS.MAT].scroll
            + newCharacterStatus[STATUS.MAT].specialSkill
            + newCharacterStatus[STATUS.MAT].liquid
            + 2*(
                newCharacterStatus[STATUS.INT].card
                + newCharacterStatus[STATUS.INT].allVita
                + newCharacterStatus[STATUS.INT].vita
                + newCharacterStatus[STATUS.INT].scroll
                + newCharacterStatus[STATUS.INT].canSeal
                + newCharacterStatus[STATUS.INT].specialSkill
            );
        
        // MDFの表示用ステータスを計算
        newCharacterStatus[STATUS.MDF].displayStatus = 
            newCharacterStatus[STATUS.MDF].totalWithoutItem
            + newCharacterStatus[STATUS.MDF].scroll
            + newCharacterStatus[STATUS.MDF].specialSkill
            + newCharacterStatus[STATUS.MDF].liquid
            + 15*(
                newCharacterStatus[STATUS.INT].card
                + newCharacterStatus[STATUS.INT].allVita
                + newCharacterStatus[STATUS.INT].vita
                + newCharacterStatus[STATUS.INT].scroll
                + newCharacterStatus[STATUS.INT].canSeal
                + newCharacterStatus[STATUS.INT].specialSkill
            );
        updateCharacter(newCharacterStatus);
    };

    // ビタボタンクリック時の処理
    const handleVitaButtons: {[key: string]: { handle: () => void; }} = {
        [ITEMS.VITA.ALL.key]: { handle: () => {
            // 入力値を取得
            getInputStatus();

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
            calculateDisplayStatus();
        }},
        [ITEMS.VITA.POW.key]: { handle: () => {
            // 入力値を取得
            getInputStatus();

            const newCharacterStatus = { ...characterStatus };        
            // ビタのステータスを更新
            if (newCharacterStatus[STATUS.POW].base * 0.2 < 1) {
                newCharacterStatus[STATUS.POW].vita = 1;
            } else {
                newCharacterStatus[STATUS.POW].vita = Math.floor(newCharacterStatus[STATUS.POW].base * 0.2);
            };
            updateCharacter(newCharacterStatus);
            calculateDisplayStatus();
        }},
        [ITEMS.VITA.INT.key]: { handle: () => {
            // 入力値を取得
            getInputStatus();

            const newCharacterStatus = { ...characterStatus };
            // ビタのステータスを更新
            if (newCharacterStatus[STATUS.INT].base * 0.2 < 1) {
                newCharacterStatus[STATUS.INT].vita = 1;
            } else {
                newCharacterStatus[STATUS.INT].vita = Math.floor(newCharacterStatus[STATUS.INT].base * 0.2);
            };
            updateCharacter(newCharacterStatus);
            calculateDisplayStatus();
        }},
        [ITEMS.VITA.SPD.key]: { handle: () => {
            // 入力値を取得
            getInputStatus();

            const newCharacterStatus = { ...characterStatus };
            // ビタのステータスを更新
            if (newCharacterStatus[STATUS.SPD].base * 0.2 < 1) {
                newCharacterStatus[STATUS.SPD].vita = 1;
            } else {
                newCharacterStatus[STATUS.SPD].vita = Math.floor(newCharacterStatus[STATUS.SPD].base * 0.2);
            }
            updateCharacter(newCharacterStatus);
            calculateDisplayStatus();
        }},
        [ITEMS.VITA.VIT.key]: { handle: () => {
            // 入力値を取得
            getInputStatus();

            const newCharacterStatus = { ...characterStatus };
            // ビタのステータスを更新
            if (newCharacterStatus[STATUS.VIT].base * 0.2 < 1) {
                newCharacterStatus[STATUS.VIT].vita = 1;
            } else {
                newCharacterStatus[STATUS.VIT].vita = Math.floor(newCharacterStatus[STATUS.VIT].base * 0.2);
            }
            updateCharacter(newCharacterStatus);
            calculateDisplayStatus();
        }},
        [ITEMS.VITA.LUK.key]: { handle: () => {
            // 入力値を取得
            getInputStatus();

            const newCharacterStatus = { ...characterStatus };
            // ビタのステータスを更新
            if (newCharacterStatus[STATUS.LUK].base * 0.2 < 1) {
                newCharacterStatus[STATUS.LUK].vita = 1;
            } else {
                newCharacterStatus[STATUS.LUK].vita = Math.floor(newCharacterStatus[STATUS.LUK].base * 0.2);
            }
            updateCharacter(newCharacterStatus);
            calculateDisplayStatus();
        }},
    };

    // 缶ボタンクリック時の処理
    const handleCanButtons: {[key: string]: { handle: () => void; }} = {
        [ITEMS.CAN.A.key]: { handle: () => {
            // 入力値を取得
            getInputStatus();

            const newCharacterStatus = { ...characterStatus };

            updateCharacter(newCharacterStatus);
        }},
        [ITEMS.CAN.B.key]: { handle: () => {
            // 入力値を取得
            getInputStatus();

            const newCharacterStatus = { ...characterStatus };
            

            updateCharacter(newCharacterStatus);
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
