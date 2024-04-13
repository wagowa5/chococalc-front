import { useContext } from 'react';

import { Grid } from '@mui/material';
import Button from '@mui/material/Button';

import { CharacterStatus } from 'interface/Status';
import {
  CharacterStatusContext,
  InputStatusContext,
} from 'contexts/StatusContext';
import { ITEMS, STATUS } from 'constants/constants';
import ButtonGroupComponent from './ButtonGroupComponent';
import { canButtonsData, sealButtonsData } from './itemConfig';
import {
  getInputStatus,
  calculateDisplayStatus,
  resetCanSealStatus,
} from 'util/StatusUtil';

const ItemArea = () => {
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

  // 缶ボタンクリック時の処理
  const handleCanButtons: { [key: string]: { handle: () => void } } = {
    [ITEMS.CAN.A.key]: {
      handle: () => {
        // 入力値を取得
        getInputStatus(characterStatus, inputStatus, updateCharacter);

        // ビタ・缶・シールのステータスをリセットしてから更新
        resetCanSealStatus(characterStatus, updateCharacter);
        let newCharacterStatus = { ...characterStatus };

        newCharacterStatus[STATUS.POW].canSeal = 10;
        newCharacterStatus[STATUS.INT].canSeal = -10;

        updateCharacter(newCharacterStatus);
        calculateDisplayStatus(characterStatus, updateCharacter);
      },
    },
    [ITEMS.CAN.B.key]: {
      handle: () => {
        // 入力値を取得
        getInputStatus(characterStatus, inputStatus, updateCharacter);

        // ビタ・缶・シールのステータスをリセットしてから更新
        resetCanSealStatus(characterStatus, updateCharacter);
        let newCharacterStatus = { ...characterStatus };

        newCharacterStatus[STATUS.INT].canSeal = 10;
        newCharacterStatus[STATUS.VIT].canSeal = -10;

        updateCharacter(newCharacterStatus);
        calculateDisplayStatus(characterStatus, updateCharacter);
      },
    },
  };
  // シールボタンクリック時の処理
  const handleSealButtons: { [key: string]: { handle: () => void } } = {
    [ITEMS.SEAL.POW.key]: {
      handle: () => {
        // 入力値を取得
        getInputStatus(characterStatus, inputStatus, updateCharacter);

        // ビタ・缶・シールのステータスをリセットしてから更新
        resetCanSealStatus(characterStatus, updateCharacter);
        let newCharacterStatus = { ...characterStatus };

        newCharacterStatus[STATUS.POW].canSeal = 15;
        newCharacterStatus[STATUS.INT].canSeal = -15;

        updateCharacter(newCharacterStatus);
        calculateDisplayStatus(characterStatus, updateCharacter);
      },
    },
    [ITEMS.SEAL.INT.key]: {
      handle: () => {
        // 入力値を取得
        getInputStatus(characterStatus, inputStatus, updateCharacter);

        // ビタ・缶・シールのステータスをリセットしてから更新
        resetCanSealStatus(characterStatus, updateCharacter);
        let newCharacterStatus = { ...characterStatus };

        newCharacterStatus[STATUS.INT].canSeal = 15;
        newCharacterStatus[STATUS.POW].canSeal = -15;

        updateCharacter(newCharacterStatus);
        calculateDisplayStatus(characterStatus, updateCharacter);
      },
    },
    [ITEMS.SEAL.SPD.key]: {
      handle: () => {
        // 入力値を取得
        getInputStatus(characterStatus, inputStatus, updateCharacter);

        // ビタ・缶・シールのステータスをリセットしてから更新
        resetCanSealStatus(characterStatus, updateCharacter);
        let newCharacterStatus = { ...characterStatus };

        newCharacterStatus[STATUS.SPD].canSeal = 15;
        newCharacterStatus[STATUS.LUK].canSeal = -15;

        updateCharacter(newCharacterStatus);
        calculateDisplayStatus(characterStatus, updateCharacter);
      },
    },
    [ITEMS.SEAL.VIT.key]: {
      handle: () => {
        // 入力値を取得
        getInputStatus(characterStatus, inputStatus, updateCharacter);

        // ビタ・缶・シールのステータスをリセットしてから更新
        resetCanSealStatus(characterStatus, updateCharacter);
        let newCharacterStatus = { ...characterStatus };

        newCharacterStatus[STATUS.VIT].canSeal = 15;
        newCharacterStatus[STATUS.SPD].canSeal = -15;

        updateCharacter(newCharacterStatus);
        calculateDisplayStatus(characterStatus, updateCharacter);
      },
    },
    [ITEMS.SEAL.LUK.key]: {
      handle: () => {
        // 入力値を取得
        getInputStatus(characterStatus, inputStatus, updateCharacter);

        // ビタ・缶・シールのステータスをリセットしてから更新
        resetCanSealStatus(characterStatus, updateCharacter);
        let newCharacterStatus = { ...characterStatus };

        newCharacterStatus[STATUS.LUK].canSeal = 15;
        newCharacterStatus[STATUS.VIT].canSeal = -15;

        updateCharacter(newCharacterStatus);
        calculateDisplayStatus(characterStatus, updateCharacter);
      },
    },
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
            color="warning"
          >
            缶・シールリセット
          </Button>
        </Grid>
        <Grid item xs={4}></Grid>

        {/* ----- 2行目 ----- */}
        {/* 魔獣缶・シール(かき氷) */}
        <Grid item xs={12}>
          <Grid container spacing={0}>
            {/* 魔獣缶 */}
            <Grid item xs={6}>
              <ButtonGroupComponent
                buttons={canButtonsData}
                handles={handleCanButtons}
              />
            </Grid>

            {/* シール(かき氷) */}
            <Grid item xs={6}>
              <ButtonGroupComponent
                buttons={sealButtonsData}
                handles={handleSealButtons}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ItemArea;
