import React from 'react';

import { Grid } from '@mui/material';
import Button from '@mui/material/Button';

import { StatusInputFields, CharacterStatus } from '../../interface/Status';
import { STATUS } from '../../constants/constants';
import ScrollSelect from './ScrollSelect';
import { hpSpScrollOptions, basicScrollOptions, detailScrollOptions } from './itemConfig';
import { calculateDisplayStatus, resetScrollStatus } from '../../util/StatusUtil';

/**
 * ScrollAreaProps
 */
interface ScrollAreaProps {
    characterStatus: CharacterStatus;
    updateCharacter: (newCharacterStatus: CharacterStatus) => void;
    inputStatus: StatusInputFields;
    updateInputStatus: (newInputStatus: StatusInputFields) => void;
}

const ScrollArea = (
    {
        characterStatus,
        updateCharacter,
        inputStatus,
        updateInputStatus,
    }: ScrollAreaProps
) => {
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
    const handleScrollChange = (statusType: string, value: string) => {
        // ステート更新関数のマッピング
        const setScrollStateFunctions = {
            [STATUS.HP]: setHpScroll,
            [STATUS.SP]: setSpScroll,
            [STATUS.POW]: setPowScroll,
            [STATUS.INT]: setIntScroll,
            [STATUS.SPD]: setSpdScroll,
            [STATUS.VIT]: setVitScroll,
            [STATUS.LUK]: setLukScroll,
            [STATUS.ATK]: setAtkScroll,
            [STATUS.DEF]: setDefScroll,
            [STATUS.MAT]: setMatScroll,
            [STATUS.MDF]: setMdfScroll,
        };

        // 選択されたスクロールタイプに対応するステートを更新
        const updateFunction = setScrollStateFunctions[statusType];
        if (updateFunction) {
            updateFunction(value);
        }

        // その他のスクロールのステートをリセット
        Object.keys(setScrollStateFunctions).forEach((key) => {
            if (key !== statusType) {
                setScrollStateFunctions[key]('');
            }
        });
        
        // 巻物ステータスをリセットして更新
        resetScrollStatus(characterStatus, updateCharacter);
        const newCharacterStatus = { ...characterStatus };
        //const newCharacterStatus = JSON.parse(JSON.stringify(characterStatus));
        newCharacterStatus[statusType].scroll = Number(value);
        updateCharacter(newCharacterStatus);
        // 表示用ステータスを計算
        calculateDisplayStatus(characterStatus, updateCharacter);
    };

    // 巻物リセットボタンクリック時の処理
    const handleScrollReset = () => {
        // 巻物のステータスをリセットして更新
        resetScrollStatus(characterStatus, updateCharacter);
        calculateDisplayStatus(characterStatus, updateCharacter);
    };

    return (
        <>
        <Grid container spacing={1} justifyContent="center" alignItems="start">
            {/* ----- 1行目 ----- */}
            {/* 巻物のリセットボタン */}
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    onClick={handleScrollReset}
                    color='warning'
                >
                    巻物リセット
                </Button>
            </Grid>

            {/* ----- 2行目 ----- */}
            {/* 巻物 */}
            <Grid item xs={12}>
                <Grid container spacing={0}>
                    {/* HP */}
                    <Grid item xs={4}>
                        <ScrollSelect
                            options={hpSpScrollOptions}
                            label="HP"
                            selectedValue={hpScroll}
                            onChange={(event) => handleScrollChange(STATUS.HP, event.target.value)}
                        />
                    </Grid>
                    {/* POW */}
                    <Grid item xs={4}>
                        <ScrollSelect
                            options={basicScrollOptions}
                            label="POW"
                            selectedValue={powScroll}
                            onChange={(event) => handleScrollChange(STATUS.POW, event.target.value)}
                        />
                    </Grid>
                    {/* ATK */}
                    <Grid item xs={4}>
                        <ScrollSelect
                            options={detailScrollOptions}
                            label="ATK"
                            selectedValue={atkScroll}
                            onChange={(event) => handleScrollChange(STATUS.ATK, event.target.value)}
                        />
                    </Grid>

                    {/* SP */}
                    <Grid item xs={4}>
                        <ScrollSelect
                            options={hpSpScrollOptions}
                            label="SP"
                            selectedValue={spScroll}
                            onChange={(event) => handleScrollChange(STATUS.SP, event.target.value)}
                        />
                    </Grid>
                    {/* INT */}
                    <Grid item xs={4}>
                        <ScrollSelect
                            options={basicScrollOptions}
                            label="INT"
                            selectedValue={intScroll}
                            onChange={(event) => handleScrollChange(STATUS.INT, event.target.value)}
                        />
                    </Grid>
                    {/* DEF */}
                    <Grid item xs={4}>
                        <ScrollSelect
                            options={detailScrollOptions}
                            label="DEF"
                            selectedValue={defScroll}
                            onChange={(event) => handleScrollChange(STATUS.DEF, event.target.value)}
                        />
                    </Grid>

                    <Grid item xs={4}></Grid>
                    {/* VIT */}
                    <Grid item xs={4}>
                        <ScrollSelect
                            options={basicScrollOptions}
                            label="VIT"
                            selectedValue={vitScroll}
                            onChange={(event) => handleScrollChange(STATUS.VIT, event.target.value)}
                        />
                    </Grid>
                    {/* MAT */}
                    <Grid item xs={4}>
                        <ScrollSelect
                            options={detailScrollOptions}
                            label="MAT"
                            selectedValue={matScroll}
                            onChange={(event) => handleScrollChange(STATUS.MAT, event.target.value)}
                        />
                    </Grid>

                    <Grid item xs={4}></Grid>
                    {/* SPD */}
                    <Grid item xs={4}>
                        <ScrollSelect
                            options={basicScrollOptions}
                            label="SPD"
                            selectedValue={spdScroll}
                            onChange={(event) => handleScrollChange(STATUS.SPD, event.target.value)}
                        />
                    </Grid>
                    {/* MDF */}
                    <Grid item xs={4}>
                        <ScrollSelect
                            options={detailScrollOptions}
                            label="MDF"
                            selectedValue={mdfScroll}
                            onChange={(event) => handleScrollChange(STATUS.MDF, event.target.value)}
                        />
                    </Grid>

                    <Grid item xs={4}></Grid>
                    {/* LUK */}
                    <Grid item xs={4}>
                        <ScrollSelect
                            options={basicScrollOptions}
                            label="LUK"
                            selectedValue={lukScroll}
                            onChange={(event) => handleScrollChange(STATUS.LUK, event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4}></Grid>
                </Grid>
            </Grid>
        </Grid>
        </>
    )
}

export default ScrollArea;
