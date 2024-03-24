import React, { useEffect, useState } from 'react';

import { evaluate } from 'maths.ts';

import { StatusInputFields, CharacterStatus } from '../interface/Status';
import { MESSAGES, FIELDS } from '../constants/constants';
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


/**
 * SkillAreaProps
 */
interface SkillAreaProps {
    characterStatus: CharacterStatus;
    updateCharacter: (newCharacterStatus: CharacterStatus) => void;
    inputStatus: StatusInputFields;
    updateInputStatus: (newInputStatus: StatusInputFields) => void;
}

const SkillArea = (
    {
        characterStatus,
        updateCharacter,
        inputStatus,
        updateInputStatus,
    }: SkillAreaProps
) => {


    // ブラッドスクレイパーのスキルを計算する
    const handleBradScraper = () => {

        calculateDisplayStatus(characterStatus, updateCharacter)
    }

    // ブラッドスクレイパーのスキルをリセットする
    const handleResetBradScraper = () => {
        resetBradScraperStatus(characterStatus, updateCharacter);
        calculateDisplayStatus(characterStatus, updateCharacter)
    }

    // 特殊スキルをリセットする
    const handleResetSpecialSkill = () => {
        resetSpecialSkillStatus(characterStatus, updateCharacter);
        calculateDisplayStatus(characterStatus, updateCharacter)
    }

    return (
        <>
        <Grid container spacing={1} margin={1} justifyContent="center" alignItems="start">
            {/* ----- 1行目 ----- */}
            {/* スキルリセットボタン */}
            <Grid item xs={6}>
                <Button
                    variant="contained"
                    onClick={handleResetBradScraper}
                    color='warning'
                >
                    スクレイパーリセット
                </Button>
            </Grid>
            <Grid item xs={6}>
                <Button
                    variant="contained"
                    onClick={handleResetSpecialSkill}
                    color='warning'
                >
                    特殊リセット
                </Button>
            </Grid>

            {/* スキル */}
            {/* ----- 2行目 ----- */}
            <Grid item xs={6}>
                <Button variant="outlined" onClick={handleBradScraper}>ブラッドスクレイパー</Button>
            </Grid>
            <Grid item xs={6}></Grid>

            {/* ----- 3行目 ----- */}
            <Grid item xs={6}>
                <Button variant="outlined">妖精王の祝福(物理)</Button>
            </Grid>
            <Grid item xs={6}>
                <Button variant="outlined">妖精王の祝福(魔法)</Button>
            </Grid>
            
            {/* ----- 4行目 ----- */}
            <Grid item xs={6}>
                <Button variant="outlined">大天使の加護</Button>
            </Grid>
            <Grid item xs={6}>
                <Button variant="outlined">祝福の蒼盾</Button>
            </Grid>

            {/* ----- 5行目 ----- */}
            <Grid item xs={6}>
                <Button variant="outlined">リエ</Button>
            </Grid>
            <Grid item xs={6}>
                <Button variant="outlined">リアぱ</Button>
            </Grid>
            
            {/* ----- 6行目 ----- */}
            <Grid item xs={6}>
                <Button variant="outlined">邪神の呪詛</Button>
            </Grid>
            <Grid item xs={6}>
                <Button variant="outlined"></Button>
            </Grid>
        </Grid>
        </>
    )
}

export default SkillArea;
