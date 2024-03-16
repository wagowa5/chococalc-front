import React, { useEffect, useState } from 'react';

import { evaluate } from 'maths.ts';

import { Character } from '../interface/Status';
import { MESSAGES, FIELDS } from '../constants/text';
import './CharacterArea.css';

import { TextField, Box, Grid } from '@mui/material';


interface ErrorMessages {
    [key: string]: string;
}

/**
 * ItemAreaProps
 */
interface ItemAreaProps {
    character: Character;
}

const ItemArea = (
    {
        character,
    }: ItemAreaProps
) => {
    const [errorMessages, setErrorMessages] = useState<ErrorMessages>({});


    return (
        <>
            {/* ビタ */}
            {/* 魔獣缶・シール(かき氷) */}
            {/* 巻物 */}
            {/* リキッド */}
        </>
    )
}

export default ItemArea;
