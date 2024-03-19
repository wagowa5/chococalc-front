import React, { useEffect, useState } from 'react';

import { evaluate } from 'maths.ts';

import { Character } from '../interface/Status';
import { MESSAGES, FIELDS } from '../constants/text';
import ButtonGroupComponent from './ButtonGroupComponent';
import ScrollSelect from './ScrollSelect';
import { 
    vitaButtonsData, canButtonsData, sealButtonsData,
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

    // HP巻物のセレクトボックスの変更時の処理
    const handleHpScrollChange = (event: SelectChangeEvent) => {
        setHpScroll(event.target.value);
    };

    // SP巻物のセレクトボックスの変更時の処理
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
                <ButtonGroupComponent buttons={vitaButtonsData} />
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
                        <ButtonGroupComponent buttons={canButtonsData} />
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
                        <ButtonGroupComponent buttons={sealButtonsData} />
                    </Box>
                    </Grid>
                </Grid>
            </Grid>

            {/* 巻物 */}
            <Grid item xs={6}>
                <Grid container spacing={2}>
                    {/* HP, POW, INT, SPD, VIT, LUK */}
                    {/* HP */}
                    <Grid item xs={6}>
                        <ScrollSelect
                            options={hpSpScrollOptions}
                            label="HP"
                            selectedValue={hpScroll}
                            onChange={handleHpScrollChange}
                        />
                    </Grid>

                    {/* SP, ATK, DEF, MAT, MDF */}
                    {/* SP */}
                    <Grid item xs={6}>
                        <ScrollSelect
                            options={hpSpScrollOptions} // この例では、HPとSPで同じオプションを使用しています。必要に応じて変更してください。
                            label="SP"
                            selectedValue={spScroll}
                            onChange={handleSpScrollChange}
                        />
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
