import React from 'react';

import { Grid } from '@mui/material';
import Button from '@mui/material/Button';

import { StatusInputFields, CharacterStatus } from '../../interface/Status';
import { ITEMS, STATUS } from '../../constants/constants';
import ButtonGroupComponent from './ButtonGroupComponent';
import { canButtonsData, sealButtonsData } from './itemConfig';
import { 
    getInputStatus,
    calculateDisplayStatus,
    resetCanSealStatus,
} from '../../util/StatusUtil';

/**
 * ItemAreaProps
 */
interface CanSealProps {
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
    }: CanSealProps
) => {

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

    // 缶・シールリセットボタンクリック時の処理
    const handleCanSealReset = () => {
        // 缶・シールのステータスをリセットして更新
        resetCanSealStatus(characterStatus, updateCharacter);
        calculateDisplayStatus(characterStatus, updateCharacter);
    };

    return (
        <>
        <Grid container spacing={1} justifyContent="center" alignItems="start">
            {/* ----- 1行目 ----- */}
            {/* 缶・シールのリセットボタン */}
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    onClick={handleCanSealReset}
                    color='warning'
                >
                    缶・シールリセット
                </Button>
            </Grid>
            <Grid item xs={4}></Grid>
                
            {/* ----- 2行目 ----- */}
            {/* 魔獣缶・シール(かき氷) */}
            <Grid item xs={12}>
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
        </Grid>
        </>
    )
}

export default ItemArea;
