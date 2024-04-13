import { useContext } from 'react';

import { Grid } from '@mui/material';
import Button from '@mui/material/Button';

import {
  CharacterStatusContext,
  InputStatusContext,
} from 'contexts/StatusContext';
import { ITEMS, STATUS } from 'constants/constants';
import ButtonGroupComponent from './ButtonGroupComponent';
import { vitaButtonsData } from './itemConfig';
import {
  getInputStatus,
  calculateDisplayStatus,
  resetVitaStatus,
} from 'util/StatusUtil';

const VitaArea = () => {
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

  // ビタボタンクリック時の処理を生成する関数
  const generateVitaHandler = (statusKey: string) => {
    // 入力値を取得
    getInputStatus(characterStatus, inputStatus, updateCharacter);

    let newCharacterStatus = { ...characterStatus };

    // ビタのステータスを更新
    if (newCharacterStatus[statusKey].base * 0.2 < 1) {
      newCharacterStatus[statusKey].vita = 1;
    } else {
      newCharacterStatus[statusKey].vita = Math.floor(
        newCharacterStatus[statusKey].base * 0.2,
      );
    }

    updateCharacter(newCharacterStatus);
    calculateDisplayStatus(characterStatus, updateCharacter);
  };
  // ビタボタンクリック時の処理
  const handleVitaButtons: { [key: string]: { handle: () => void } } = {
    [ITEMS.VITA.ALL.key]: {
      handle: () => {
        // 入力値を取得
        getInputStatus(characterStatus, inputStatus, updateCharacter);

        let newCharacterStatus = { ...characterStatus };

        // ビタのステータスを更新
        if (newCharacterStatus[STATUS.POW].base * 0.1 < 1) {
          newCharacterStatus[STATUS.POW].allVita = 1;
        } else {
          newCharacterStatus[STATUS.POW].allVita = Math.floor(
            newCharacterStatus[STATUS.POW].base * 0.1,
          );
        }
        if (newCharacterStatus[STATUS.INT].base * 0.1 < 1) {
          newCharacterStatus[STATUS.INT].allVita = 1;
        } else {
          newCharacterStatus[STATUS.INT].allVita = Math.floor(
            newCharacterStatus[STATUS.INT].base * 0.1,
          );
        }
        if (newCharacterStatus[STATUS.SPD].base * 0.1 < 1) {
          newCharacterStatus[STATUS.SPD].allVita = 1;
        } else {
          newCharacterStatus[STATUS.SPD].allVita = Math.floor(
            newCharacterStatus[STATUS.SPD].base * 0.1,
          );
        }
        if (newCharacterStatus[STATUS.VIT].base * 0.1 < 1) {
          newCharacterStatus[STATUS.VIT].allVita = 1;
        } else {
          newCharacterStatus[STATUS.VIT].allVita = Math.floor(
            newCharacterStatus[STATUS.VIT].base * 0.1,
          );
        }
        if (newCharacterStatus[STATUS.LUK].base * 0.1 < 1) {
          newCharacterStatus[STATUS.LUK].allVita = 1;
        } else {
          newCharacterStatus[STATUS.LUK].allVita = Math.floor(
            newCharacterStatus[STATUS.LUK].base * 0.1,
          );
        }

        updateCharacter(newCharacterStatus);
        calculateDisplayStatus(characterStatus, updateCharacter);
      },
    },
    [ITEMS.VITA.POW.key]: {
      handle: () => {
        generateVitaHandler(STATUS.POW);
      },
    },
    [ITEMS.VITA.INT.key]: {
      handle: () => {
        generateVitaHandler(STATUS.INT);
      },
    },
    [ITEMS.VITA.SPD.key]: {
      handle: () => {
        generateVitaHandler(STATUS.SPD);
      },
    },
    [ITEMS.VITA.VIT.key]: {
      handle: () => {
        generateVitaHandler(STATUS.VIT);
      },
    },
    [ITEMS.VITA.LUK.key]: {
      handle: () => {
        generateVitaHandler(STATUS.LUK);
      },
    },
  };

  // ビタリセットボタンクリック時の処理
  const handleVitaReset = () => {
    // ビタのステータスをリセットして更新
    resetVitaStatus(characterStatus, updateCharacter);
    calculateDisplayStatus(characterStatus, updateCharacter);
  };

  return (
    <>
      <Grid container spacing={1} justifyContent="center" alignItems="start">
        {/* ----- 1行目 ----- */}
        {/* ビタのリセットボタン */}
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleVitaReset} color="warning">
            ビタリセット
          </Button>
        </Grid>

        {/* ----- 2行目 ----- */}
        {/* ビタ */}
        <Grid item xs={12}>
          <ButtonGroupComponent
            buttons={vitaButtonsData}
            handles={handleVitaButtons}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default VitaArea;
