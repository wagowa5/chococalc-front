import React from 'react';

import { Grid } from '@mui/material';

import { StatusInputFields, CharacterStatus } from '../../interface/Status';
import VitaArea from '../itemArea/VitaArea';
import CanSealArea from '../itemArea/CanSealArea';
import ScrollArea from '../itemArea/ScrollArea';
import LiquidArea from '../itemArea/LiquidArea';

/**
 * DesktopItemAreaProps
 */
interface DesktopItemAreaProps {
  characterStatus: CharacterStatus;
  updateCharacter: (newCharacterStatus: CharacterStatus) => void;
  inputStatus: StatusInputFields;
  updateInputStatus: (newInputStatus: StatusInputFields) => void;
}

const DesktopItemArea = ({
  characterStatus,
  updateCharacter,
  inputStatus,
  updateInputStatus,
}: DesktopItemAreaProps) => {
  return (
    <>
      <Grid container spacing={1} justifyContent="center" alignItems="start">
        {/* ----- 1行目 ----- */}
        {/* ビタと缶・シール */}
        <Grid item xs={2}>
          <VitaArea
            characterStatus={characterStatus}
            updateCharacter={updateCharacter}
            inputStatus={inputStatus}
            updateInputStatus={updateInputStatus}
          />
        </Grid>
        <Grid item xs={3}>
          <CanSealArea
            characterStatus={characterStatus}
            updateCharacter={updateCharacter}
            inputStatus={inputStatus}
            updateInputStatus={updateInputStatus}
          />
        </Grid>

        {/* ----- 2行目 ----- */}
        {/* 巻物 */}
        <Grid item xs={4}>
          <ScrollArea
            characterStatus={characterStatus}
            updateCharacter={updateCharacter}
            inputStatus={inputStatus}
            updateInputStatus={updateInputStatus}
          />
        </Grid>

        {/* リキッド */}
        <Grid item xs={3}>
          <LiquidArea
            characterStatus={characterStatus}
            updateCharacter={updateCharacter}
            inputStatus={inputStatus}
            updateInputStatus={updateInputStatus}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default DesktopItemArea;
