import React, { useState } from 'react';
import { evaluate } from 'maths.ts';

import { CharacterStatus } from '../interface/Status';
import { MESSAGES } from '../constants/text';
import './CharacterArea.css';

import { TextField, Box, Grid } from '@mui/material';

// propsの型定義を追加
interface CharacterAreaProps {
    characterStatus: CharacterStatus;
    updateCharacterStatus: (newStatus: CharacterStatus) => void;
    cardStatus: CharacterStatus;
    updateCardStatus: (newStatus: CharacterStatus) => void;
    inputTotalStatus: CharacterStatus;
    updateInputTotalStatus: (newStatus: CharacterStatus) => void;
}

// 入力用パラメータ
interface InputParam {
    inputLevel: string;
    inputHp: string;
    inputSp: string;
    inputCharaPow: string;
    inputCharaInt: string;
    inputCharaVit: string;
    inputCharaSpd: string;
    inputCharaLuk: string;
    inputCardPow: string;
    inputCardInt: string;
    inputCardVit: string;
    inputCardSpd: string;
    inputCardLuk: string;
    inputTotalPow: string;
    inputTotalInt: string;
    inputTotalVit: string;
    inputTotalSpd: string;
    inputTotalLuk: string;
    inputAtk: string;
    inputDef: string;
    inputMat: string;
    inputMdf: string;
}

const CharacterArea = (
    {
        inputLevel,
        inputHp,
        inputSp,
        inputCharaPow,
        inputCharaInt,
        inputCharaVit,
        inputCharaSpd,
        inputCharaLuk,
        inputCardPow,
        inputCardInt,
        inputCardVit,
        inputCardSpd,
        inputCardLuk,
        inputTotalPow,
        inputTotalInt,
        inputTotalVit,
        inputTotalSpd,
        inputTotalLuk,
        inputAtk,
        inputDef,
        inputMat,
        inputMdf,
    }: InputParam
) => {
    // エラーメッセージを格納
    const [errorMessages, setErrorMessages] = useState({});

    // 文字列ができるかどうかを事前にチェックする
    // 入力値のStatusクラスへの格納や計算は別コンポーネントで行う
    const calculate = (expression: string, field: string) => {
        try {
            const result = evaluate(expression);
            // 成功した場合、エラーメッセージをクリア
            setErrorMessages(prevErrors => ({ ...prevErrors, [field]: '' }));
            return result;
        } catch (error) {
            // エラーが発生した場合、エラーメッセージを更新
            setErrorMessages(prevErrors => ({ ...prevErrors, [field]: MESSAGES.INPUT_ERROR.CANNOT_CALCULATE }));
            return null; // または適切なデフォルト値
        }
    };

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
        <Grid item xs={12} >
        <Grid container spacing={4} >
            <Grid item xs={1}></Grid>
            <Grid item xs={3}>
                <TextField 
                    name='level'
                    label='Lv:'
                    placeholder='99'
                    value={}
                />
            </Grid>
            <Grid item xs={3}>
                <TextField 
                    name='hp'
                    label='HP:'
                    placeholder='10000'
                />
            </Grid>
            <Grid item xs={3}>
                <TextField 
                    name='sp'
                    label='SP:'
                    placeholder='10000'
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
                        placeholder='18'
                    />
                    <TextField 
                        name='int'
                        label='INT:'
                        placeholder='18'
                    />
                    <TextField 
                        name='spd'
                        label='SPD:'
                        placeholder='18'
                    />
                    <TextField 
                        name='vit'
                        label='VIT:'
                        placeholder='18'
                    />
                    <TextField 
                        name='luk'
                        label='LUK:'
                        placeholder='18'
                    />
                </div>
                </Grid>

                <Grid item xs={7}>
                <div className='sum-status'>
                    <div>合計(ヌシステはあり、ビタ等なしの数値)</div>
                    <TextField 
                        name='pow'
                        label='合計POW:'
                        placeholder='入力例: 162+342'
                    />
                    <TextField 
                        name='int'
                        label='INT:'
                        placeholder='入力例: 162+342'
                    />
                    <TextField 
                        name='spd'
                        label='SPD:'
                        placeholder='入力例: 162+342'
                    />
                    <TextField 
                        name='vit'
                        label='VIT:'
                        placeholder='入力例: 162+342'
                    />
                    <TextField 
                        name='luk'
                        label='LUK:'
                        placeholder='入力例: 162+342'
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
                    label='表示ATK:'
                    name='atk'
                    placeholder='1'
                />
                </Grid>
                <Grid item xs={5}>
                <TextField 
                    label='表示DEF:'
                    name='def'
                    placeholder='1'
                />
                </Grid>
                <Grid item xs={5}>
                <TextField 
                    label='表示MAT:'
                    name='mat'
                    placeholder='1'
                />
                </Grid>
                <Grid item xs={5}>
                <TextField 
                    label='表示MDF:'
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
