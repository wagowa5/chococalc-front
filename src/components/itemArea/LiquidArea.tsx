import { useContext } from 'react';

import { Grid } from '@mui/material';
import Button from '@mui/material/Button';

import {
  CharacterStatusContext,
  InputStatusContext,
} from 'contexts/StatusContext';
import { ITEMS, STATUS } from 'constants/constants';
import ButtonGroupComponent from './ButtonGroupComponent';
import { liquidButtonsData } from './itemConfig';
import {
  getInputStatus,
  calculateDisplayStatus,
  resetLiquidStatus,
} from 'util/StatusUtil';

const LiquidArea = () => {
  const characterContext = useContext(CharacterStatusContext);
  const inputContext = useContext(InputStatusContext);
  // コンテキストが undefined でないことを確認
  if (!characterContext || !inputContext) {
    console.error(
      'CharacterStatusContext or InputStatusContext is not provided',
    );
    return <div>エラー：適切なプロバイダが設定されていません。</div>;
  }
  // 必要な関数や状態を抽出するための分割代入
  const { characterStatus, updateCharacter } = characterContext;
  const { inputStatus } = inputContext;

  // リキッドボタンクリック時の処理
  const handleLiquidButtons: { [key: string]: { handle: () => void } } = {
    [ITEMS.LIQUID.ATK.key]: {
      handle: () => {
        getInputStatus(characterStatus, inputStatus, updateCharacter);
        calculateDisplayStatus(characterStatus, updateCharacter);

        let newCharacterStatus = { ...characterStatus };

        const magnified =
          newCharacterStatus[STATUS.ATK].totalWithoutItem +
          newCharacterStatus[STATUS.ATK].scroll -
          newCharacterStatus[STATUS.POW].totalWithoutItem * 3 +
          newCharacterStatus[STATUS.POW].displayStatus * 2;
        const magnif =
          Math.max(
            newCharacterStatus[STATUS.POW].displayStatus +
              newCharacterStatus[STATUS.LEVEL].totalWithoutItem -
              100,
            110,
          ) * 0.01;

        newCharacterStatus[STATUS.ATK].liquid = Math.floor(magnified * magnif);

        updateCharacter(newCharacterStatus);
        calculateDisplayStatus(characterStatus, updateCharacter);
      },
    },
    [ITEMS.LIQUID.DEF.key]: {
      handle: () => {
        getInputStatus(characterStatus, inputStatus, updateCharacter);
        calculateDisplayStatus(characterStatus, updateCharacter);

        let newCharacterStatus = { ...characterStatus };

        const magnified =
          newCharacterStatus[STATUS.DEF].totalWithoutItem +
          newCharacterStatus[STATUS.DEF].scroll -
          newCharacterStatus[STATUS.VIT].totalWithoutItem * 2 +
          newCharacterStatus[STATUS.VIT].displayStatus * 2;
        const magnif =
          Math.max(
            newCharacterStatus[STATUS.VIT].displayStatus +
              newCharacterStatus[STATUS.LEVEL].totalWithoutItem -
              100,
            110,
          ) * 0.01;

        newCharacterStatus[STATUS.DEF].liquid = Math.floor(magnified * magnif);

        updateCharacter(newCharacterStatus);
        calculateDisplayStatus(characterStatus, updateCharacter);
      },
    },
    [ITEMS.LIQUID.MAT.key]: {
      handle: () => {
        getInputStatus(characterStatus, inputStatus, updateCharacter);
        calculateDisplayStatus(characterStatus, updateCharacter);

        let newCharacterStatus = { ...characterStatus };

        const magnified =
          newCharacterStatus[STATUS.MAT].totalWithoutItem +
          newCharacterStatus[STATUS.MAT].scroll -
          newCharacterStatus[STATUS.INT].totalWithoutItem * 2 +
          newCharacterStatus[STATUS.INT].displayStatus * 2;
        const magnif =
          Math.max(
            newCharacterStatus[STATUS.INT].displayStatus +
              newCharacterStatus[STATUS.LEVEL].totalWithoutItem -
              100,
            110,
          ) * 0.01;

        newCharacterStatus[STATUS.MAT].liquid = Math.floor(magnified * magnif);

        updateCharacter(newCharacterStatus);
        calculateDisplayStatus(characterStatus, updateCharacter);
      },
    },
    [ITEMS.LIQUID.MDF.key]: {
      handle: () => {
        getInputStatus(characterStatus, inputStatus, updateCharacter);
        calculateDisplayStatus(characterStatus, updateCharacter);

        let newCharacterStatus = { ...characterStatus };

        const magnifiedInt =
          newCharacterStatus[STATUS.MDF].totalWithoutItem +
          newCharacterStatus[STATUS.MDF].scroll -
          newCharacterStatus[STATUS.INT].totalWithoutItem * 15 +
          newCharacterStatus[STATUS.INT].displayStatus * 2;
        const magnifiedVit =
          newCharacterStatus[STATUS.MDF].totalWithoutItem +
          newCharacterStatus[STATUS.MDF].scroll -
          newCharacterStatus[STATUS.INT].totalWithoutItem * 15 +
          newCharacterStatus[STATUS.VIT].displayStatus * 2;
        const magnifInt =
          Math.max(
            newCharacterStatus[STATUS.INT].displayStatus +
              newCharacterStatus[STATUS.LEVEL].totalWithoutItem -
              100,
            110,
          ) * 0.01;
        const magnifVit =
          Math.max(
            newCharacterStatus[STATUS.VIT].displayStatus +
              newCharacterStatus[STATUS.LEVEL].totalWithoutItem -
              100,
            110,
          ) * 0.01;

        newCharacterStatus[STATUS.MDF].liquid = Math.max(
          Math.floor(magnifiedInt * magnifInt),
          Math.floor(magnifiedVit * magnifVit),
        );

        updateCharacter(newCharacterStatus);
        calculateDisplayStatus(characterStatus, updateCharacter);
      },
    },
  };

  // リキッドリセットボタンクリック時の処理
  const handleLiquidReset = () => {
    // リキッドのステータスをリセットして更新
    resetLiquidStatus(characterStatus, updateCharacter);
    calculateDisplayStatus(characterStatus, updateCharacter);
  };

  return (
    <>
      <Grid container spacing={1} justifyContent="center" alignItems="start">
        {/* リキッドのリセットボタン */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={handleLiquidReset}
            color="warning"
          >
            リキッドリセット
          </Button>
        </Grid>

        {/* リキッド */}
        <Grid item xs={12}>
          <ButtonGroupComponent
            buttons={liquidButtonsData}
            handles={handleLiquidButtons}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default LiquidArea;
