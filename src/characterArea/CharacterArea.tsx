import React, { useEffect, useState } from 'react';
import { evaluate } from 'maths.ts';

import { InputStatus } from '../interface/Status';
import { MESSAGES, FIELDS } from '../constants/text';
import './CharacterArea.css';

import { TextField, Box, Grid } from '@mui/material';
import { start } from 'repl';

interface ErrorMessages {
    [key: string]: string;
}

// propsの型定義を追加
interface CharacterAreaProps {
    inputStatus: InputStatus;
    updateInputStatus: (newStatus: InputStatus) => void;
}

const CharacterArea = (
    {
        inputStatus,
        updateInputStatus,
    }: CharacterAreaProps
) => {
    // エラーメッセージを格納
    const [errorMessages, setErrorMessages] = useState<ErrorMessages>({});

    // 各TextField更新時の処理
    const handleInputStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // 文字列が計算可能か事前にチェックする
        // 入力値のStatusクラスへの格納や計算は別コンポーネントで行う
        try {
            const inputValue = Number(evaluate(value));
            if (!isFinite(inputValue)) {
                // 数値がNaNまたは無限大の場合、エラーメッセージを更新
                setErrorMessages(prevErrors => ({ ...prevErrors, [name]: MESSAGES.INPUT_ERROR.CANNOT_CALCULATE }));
            } else {
                // 成功した場合、エラーメッセージをクリア
                setErrorMessages(prevErrors => ({ ...prevErrors, [name]: '' }));
            }
        } catch (error) {
            // エラーが発生した場合、エラーメッセージを更新
            setErrorMessages(prevErrors => ({ ...prevErrors, [name]: MESSAGES.INPUT_ERROR.CANNOT_CALCULATE }));
        }

        const newStatus = {
            ...inputStatus.editStatus,
            [name]: value,
        };
        inputStatus.update(newStatus)
        updateInputStatus(inputStatus); // Appから渡された関数を使用して状態を更新
    };

    return (
        <>
        {/* <Box
            component='section'
            aria-label='ステータス入力'
            height={550}
            width={550}
            my={0}
            display='flex'
            alignItems='center'
            gap={4}
            p={2}
            sx={{ border: '1px dashed grey' }}
        > */}

        {/*
            ・レベル, HP, SP
            ・5ステ入力
            ・ATK, MAT, DEF, MDF
            の3行に分割
        */}
        <Grid container spacing={3}>

        {/* 空(位置調整), レベル, HP, SP */}
        <Grid item xs={12} >
        <Grid container spacing={4} >
            <Grid item xs={1}></Grid>
            <Grid item xs={3}>
                <TextField 
                    name={FIELDS.LEVEL}
                    label='Lv:'
                    placeholder='99'
                    error={!!errorMessages[FIELDS.LEVEL]} // エラーがある場合はTextFieldをエラー状態にする
                    helperText={errorMessages[FIELDS.LEVEL] || ''} // エラーメッセージを表示
                    onChange={handleInputStatusChange}
                />
            </Grid>
            <Grid item xs={3}>
                <TextField 
                    name={FIELDS.HP}
                    label='HP:'
                    placeholder='10000'
                    error={!!errorMessages[FIELDS.HP]} // エラーがある場合はTextFieldをエラー状態にする
                    helperText={errorMessages[FIELDS.HP] || ''} // エラーメッセージを表示
                    onChange={handleInputStatusChange}
                />
            </Grid>
            <Grid item xs={3}>
                <TextField 
                    name={FIELDS.SP}
                    label='SP:'
                    placeholder='10000'
                    error={!!errorMessages[FIELDS.SP]} // エラーがある場合はTextFieldをエラー状態にする
                    helperText={errorMessages[FIELDS.SP] || ''} // エラーメッセージを表示
                    onChange={handleInputStatusChange}
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
                        name={FIELDS.CHARA_POW}
                        label='POW:'
                        placeholder='157'
                        error={!!errorMessages[FIELDS.CHARA_POW]} // エラーがある場合はTextFieldをエラー状態にする
                        helperText={errorMessages[FIELDS.CHARA_POW] || ''} // エラーメッセージを表示
                        onChange={handleInputStatusChange}
                    />
                    <TextField 
                        name={FIELDS.CHARA_INT}
                        label='INT:'
                        placeholder='1'
                        error={!!errorMessages[FIELDS.CHARA_INT]} // エラーがある場合はTextFieldをエラー状態にする
                        helperText={errorMessages[FIELDS.CHARA_INT] || ''} // エラーメッセージを表示
                        onChange={handleInputStatusChange}
                    />
                    <TextField 
                        name={FIELDS.CHARA_SPD}
                        label='SPD:'
                        placeholder='1'
                        error={!!errorMessages[FIELDS.CHARA_SPD]} // エラーがある場合はTextFieldをエラー状態にする
                        helperText={errorMessages[FIELDS.CHARA_SPD] || ''} // エラーメッセージを表示
                        onChange={handleInputStatusChange}
                    />
                    <TextField 
                        name={FIELDS.CHARA_VIT}
                        label='VIT:'
                        placeholder='1'
                        error={!!errorMessages[FIELDS.CHARA_VIT]} // エラーがある場合はTextFieldをエラー状態にする
                        helperText={errorMessages[FIELDS.CHARA_VIT] || ''} // エラーメッセージを表示
                        onChange={handleInputStatusChange}
                    />
                    <TextField 
                        name={FIELDS.CHARA_LUK}
                        label='LUK:'
                        placeholder='1'
                        error={!!errorMessages[FIELDS.CHARA_LUK]} // エラーがある場合はTextFieldをエラー状態にする
                        helperText={errorMessages[FIELDS.CHARA_LUK] || ''} // エラーメッセージを表示
                        onChange={handleInputStatusChange}
                    />
                </div>
                </Grid>

                <Grid item xs={3}>
                <div className='card-status'>
                <div>カード</div>
                    <TextField 
                        name={FIELDS.CARD_POW}
                        label='POW:'
                        placeholder='18'
                        error={!!errorMessages[FIELDS.CARD_POW]} // エラーがある場合はTextFieldをエラー状態にする
                        helperText={errorMessages[FIELDS.CARD_POW] || ''} // エラーメッセージを表示
                        onChange={handleInputStatusChange}
                    />
                    <TextField 
                        name={FIELDS.CARD_INT}
                        label='INT:'
                        placeholder='0'
                        defaultValue={'0'}
                        error={!!errorMessages[FIELDS.CARD_INT]} // エラーがある場合はTextFieldをエラー状態にする
                        helperText={errorMessages[FIELDS.CARD_INT] || ''} // エラーメッセージを表示
                        onChange={handleInputStatusChange}
                    />
                    <TextField 
                        name={FIELDS.CARD_SPD}
                        label='SPD:'
                        placeholder='0'
                        defaultValue={'0'}
                        error={!!errorMessages[FIELDS.CARD_SPD]} // エラーがある場合はTextFieldをエラー状態にする
                        helperText={errorMessages[FIELDS.CARD_SPD] || ''} // エラーメッセージを表示
                        onChange={handleInputStatusChange}
                    />
                    <TextField 
                        name={FIELDS.CARD_VIT}
                        label='VIT:'
                        placeholder='0'
                        defaultValue={'0'}
                        error={!!errorMessages[FIELDS.CARD_VIT]} // エラーがある場合はTextFieldをエラー状態にする
                        helperText={errorMessages[FIELDS.CARD_VIT] || ''} // エラーメッセージを表示
                        onChange={handleInputStatusChange}
                    />
                    <TextField 
                        name={FIELDS.CARD_LUK}
                        label='LUK:'
                        placeholder='0'
                        defaultValue={'0'}
                        error={!!errorMessages[FIELDS.CARD_LUK]} // エラーがある場合はTextFieldをエラー状態にする
                        helperText={errorMessages[FIELDS.CARD_LUK] || ''} // エラーメッセージを表示
                        onChange={handleInputStatusChange}
                    />
                </div>
                </Grid>

                <Grid item xs={6}>
                <div className='sum-status'>
                    <div>合計(ヌシステ含む)</div>
                    <TextField 
                        name={FIELDS.TOTAL_POW}
                        label='合計POW:'
                        placeholder='入力例: 157+342'
                        error={!!errorMessages[FIELDS.TOTAL_POW]} // エラーがある場合はTextFieldをエラー状態にする
                        helperText={errorMessages[FIELDS.TOTAL_POW] || ''} // エラーメッセージを表示
                        onChange={handleInputStatusChange}
                    />
                    <TextField 
                        name={FIELDS.TOTAL_INT}
                        label='合計INT:'
                        placeholder='入力例: 1+150'
                        error={!!errorMessages[FIELDS.TOTAL_INT]} // エラーがある場合はTextFieldをエラー状態にする
                        helperText={errorMessages[FIELDS.TOTAL_INT] || ''} // エラーメッセージを表示
                        onChange={handleInputStatusChange}
                    />
                    <TextField 
                        name={FIELDS.TOTAL_SPD}
                        label='合計SPD:'
                        placeholder='入力例: 1'
                        error={!!errorMessages[FIELDS.TOTAL_SPD]} // エラーがある場合はTextFieldをエラー状態にする
                        helperText={errorMessages[FIELDS.TOTAL_SPD] || ''} // エラーメッセージを表示
                        onChange={handleInputStatusChange}
                    />
                    <TextField 
                        name={FIELDS.TOTAL_VIT}
                        label='合計VIT:'
                        placeholder='入力例: 1+80'
                        error={!!errorMessages[FIELDS.TOTAL_VIT]} // エラーがある場合はTextFieldをエラー状態にする
                        helperText={errorMessages[FIELDS.TOTAL_VIT] || ''} // エラーメッセージを表示
                        onChange={handleInputStatusChange}
                    />
                    <TextField 
                        name={FIELDS.TOTAL_LUK}
                        label='合計LUK:'
                        placeholder='入力例: 1'
                        error={!!errorMessages[FIELDS.TOTAL_LUK]} // エラーがある場合はTextFieldをエラー状態にする
                        helperText={errorMessages[FIELDS.TOTAL_LUK] || ''} // エラーメッセージを表示
                        onChange={handleInputStatusChange}
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
                    name={FIELDS.ATK}
                    label='表示ATK:'
                    placeholder='1'
                    error={!!errorMessages[FIELDS.ATK]} // エラーがある場合はTextFieldをエラー状態にする
                    helperText={errorMessages[FIELDS.ATK] || ''} // エラーメッセージを表示
                    onChange={handleInputStatusChange}
                />
                </Grid>
                <Grid item xs={5}>
                <TextField 
                    name={FIELDS.DEF}
                    label='表示DEF:'
                    placeholder='1'
                    error={!!errorMessages[FIELDS.DEF]} // エラーがある場合はTextFieldをエラー状態にする
                    helperText={errorMessages[FIELDS.DEF] || ''} // エラーメッセージを表示
                    onChange={handleInputStatusChange}
                />
                </Grid>
                <Grid item xs={5}>
                <TextField 
                    name={FIELDS.MAT}
                    label='表示MAT:'
                    placeholder='1'
                    error={!!errorMessages[FIELDS.MAT]} // エラーがある場合はTextFieldをエラー状態にする
                    helperText={errorMessages[FIELDS.MAT] || ''} // エラーメッセージを表示
                    onChange={handleInputStatusChange}
                />
                </Grid>
                <Grid item xs={5}>
                <TextField 
                    name={FIELDS.MDF}
                    label='表示MDF:'
                    placeholder='1'
                    error={!!errorMessages[FIELDS.MDF]} // エラーがある場合はTextFieldをエラー状態にする
                    helperText={errorMessages[FIELDS.MDF] || ''} // エラーメッセージを表示
                    onChange={handleInputStatusChange}
                />
                </Grid>
            </Grid>
        </Grid>

        </Grid>
        {/* </Box> */}
        </>
    );
};

export default CharacterArea;
