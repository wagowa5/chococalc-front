import React from 'react';
import { evaluate } from 'maths.ts';

import { MESSAGES, FIELDS, MANNEQUIN_FIELDS } from '../../constants/constants';
import { CharacterStatus, StatusInputFields } from '../../interface/Status';

import { TextField, Grid, Chip, Button } from '@mui/material';

// propsの型定義を追加
interface MannequinAreaProps {
    characterStatus: CharacterStatus;
    updateCharacter: (newCharacterStatus: CharacterStatus) => void;
    inputStatus: StatusInputFields;
    updateInputStatus: (newInputStatus: StatusInputFields) => void;
}

const MannequinArea = (
    {
        characterStatus,
        updateCharacter,
        inputStatus,
        updateInputStatus,
    }: MannequinAreaProps
) => {
    const [mannequinName, setMannequinName] = React.useState<string>('');
    
    const handleInputMannequinNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMannequinName(e.target.value);
    }

    const handleStoreMannequin = () => {
    }

    const handleDeleteMannequin = () => {
    }

    const handleGetMannequins = () => {
    }

    return (
        <>
        {/* マネキン名入力、登録ボタン、削除ボタン */}
        <Grid container spacing={1}>
            <Grid item xs={4}>
                <TextField 
                    name={MANNEQUIN_FIELDS.MANNEQUIN_NAME}
                    label='マネキン名:'
                    margin='none'
                    // error={!!inputStatus[FIELDS.LEVEL].errorMessage} // エラーがある場合はTextFieldをエラー状態にする
                    // helperText={inputStatus[FIELDS.LEVEL].errorMessage || ''} // エラーメッセージを表示
                    onChange={handleInputMannequinNameChange}
                />
            </Grid>
            <Grid item xs={4}>
                <Button
                    variant='outlined'
                    color='primary'
                    onClick={handleStoreMannequin}
                >
                    マネキン登録
                </Button>
            </Grid>
            <Grid item xs={4}>
                <Button
                    variant='contained'
                    color='error'
                    onClick={handleStoreMannequin}
                >
                    マネキン削除
                </Button>
            </Grid>
        </Grid>
        </>
    );
};

export default MannequinArea;
