import React from 'react';

import { Grid } from '@mui/material';
import Button from '@mui/material/Button';

import { StatusInputFields, CharacterStatus } from '../../interface/Status';
import { ITEMS, STATUS } from '../../constants/constants';
import ButtonGroupComponent from './ButtonGroupComponent';
import ScrollSelect from './ScrollSelect';
import {
  vitaButtonsData,
  canButtonsData,
  sealButtonsData,
  liquidButtonsData,
  hpSpScrollOptions,
  basicScrollOptions,
  detailScrollOptions,
} from './itemConfig';
import {
  getInputStatus,
  calculateDisplayStatus,
  resetVitaStatus,
  resetCanSealStatus,
  resetScrollStatus,
  resetLiquidStatus,
} from '../../util/StatusUtil';

/**
 * ItemAreaProps
 */
interface ItemAreaProps {
  characterStatus: CharacterStatus;
  updateCharacter: (newCharacterStatus: CharacterStatus) => void;
  inputStatus: StatusInputFields;
  updateInputStatus: (newInputStatus: StatusInputFields) => void;
}

const ItemArea = ({
  characterStatus,
  updateCharacter,
  inputStatus,
  updateInputStatus,
}: ItemAreaProps) => {
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
    // スクロールの状態を更新
    const setScrollStateFunction = {
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
    }[statusType];
    setScrollStateFunction(value);

    // 巻物ステータスをリセットして更新
    resetScrollStatus(characterStatus, updateCharacter);
    const newCharacterStatus = { ...characterStatus };
    newCharacterStatus[statusType].scroll = Number(value);
    updateCharacter(newCharacterStatus);
    // 表示用ステータスを計算
    calculateDisplayStatus(characterStatus, updateCharacter);
  };

  // ビタボタンクリック時の処理を生成する関数
  const generateVitaHandler = (statusKey: string) => {
    // 入力値を取得
    getInputStatus(characterStatus, inputStatus, updateCharacter);

    const newCharacterStatus = { ...characterStatus };
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

        const newCharacterStatus = { ...characterStatus };
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

  // 缶ボタンクリック時の処理
  const handleCanButtons: { [key: string]: { handle: () => void } } = {
    [ITEMS.CAN.A.key]: {
      handle: () => {
        // 入力値を取得
        getInputStatus(characterStatus, inputStatus, updateCharacter);

        // ビタ・缶・シールのステータスをリセットしてから更新
        resetCanSealStatus(characterStatus, updateCharacter);
        const newCharacterStatus = { ...characterStatus };
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
        const newCharacterStatus = { ...characterStatus };
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
        const newCharacterStatus = { ...characterStatus };
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
        const newCharacterStatus = { ...characterStatus };
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
        const newCharacterStatus = { ...characterStatus };
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
        const newCharacterStatus = { ...characterStatus };
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
        const newCharacterStatus = { ...characterStatus };
        newCharacterStatus[STATUS.LUK].canSeal = 15;
        newCharacterStatus[STATUS.VIT].canSeal = -15;

        updateCharacter(newCharacterStatus);
        calculateDisplayStatus(characterStatus, updateCharacter);
      },
    },
  };

  // リキッドボタンクリック時の処理
  const handleLiquidButtons: { [key: string]: { handle: () => void } } = {
    [ITEMS.LIQUID.ATK.key]: {
      handle: () => {
        getInputStatus(characterStatus, inputStatus, updateCharacter);
        calculateDisplayStatus(characterStatus, updateCharacter);

        const newCharacterStatus = { ...characterStatus };
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

        const newCharacterStatus = { ...characterStatus };
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

        const newCharacterStatus = { ...characterStatus };
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

        const newCharacterStatus = { ...characterStatus };
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

  // ビタリセットボタンクリック時の処理
  const handleVitaReset = () => {
    // ビタのステータスをリセットして更新
    resetVitaStatus(characterStatus, updateCharacter);
    calculateDisplayStatus(characterStatus, updateCharacter);
  };

  // 缶・シールリセットボタンクリック時の処理
  const handleCanSealReset = () => {
    // 缶・シールのステータスをリセットして更新
    resetCanSealStatus(characterStatus, updateCharacter);
    calculateDisplayStatus(characterStatus, updateCharacter);
  };

  // 巻物リセットボタンクリック時の処理
  const handleScrollReset = () => {
    // 巻物のステータスをリセットして更新
    resetScrollStatus(characterStatus, updateCharacter);
    calculateDisplayStatus(characterStatus, updateCharacter);
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
        {/* ----- 1行目 ----- */}
        {/* ビタと缶・シールのリセットボタン */}
        <Grid item xs={4}>
          <Button variant="contained" onClick={handleVitaReset} color="warning">
            ビタリセット
          </Button>
        </Grid>
        <Grid item xs={4}>
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
        {/* ビタ */}
        <Grid item xs={4}>
          <ButtonGroupComponent
            buttons={vitaButtonsData}
            handles={handleVitaButtons}
          />
        </Grid>

        {/* 魔獣缶・シール(かき氷) */}
        <Grid item xs={4}>
          <Grid container spacing={1}>
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
        <Grid item xs={4}></Grid>

        {/* ----- 3行目 ----- */}
        {/* 巻物とリキッドのリセットボタン */}
        <Grid item xs={8}>
          <Button
            variant="contained"
            onClick={handleScrollReset}
            color="warning"
          >
            巻物リセット
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            onClick={handleLiquidReset}
            color="warning"
          >
            リキッドリセット
          </Button>
        </Grid>

        {/* ----- 4行目 ----- */}
        {/* 巻物 */}
        <Grid item xs={8}>
          <Grid container spacing={0}>
            {/* HP */}
            <Grid item xs={3}>
              <ScrollSelect
                options={hpSpScrollOptions}
                label="HP"
                selectedValue={hpScroll}
                onChange={(event) =>
                  handleScrollChange(STATUS.HP, event.target.value)
                }
              />
            </Grid>
            {/* SP */}
            <Grid item xs={3}>
              <ScrollSelect
                options={hpSpScrollOptions}
                label="SP"
                selectedValue={spScroll}
                onChange={(event) =>
                  handleScrollChange(STATUS.SP, event.target.value)
                }
              />
            </Grid>
            <Grid item xs={6}></Grid>
            {/* POW */}
            <Grid item xs={3}>
              <ScrollSelect
                options={basicScrollOptions}
                label="POW"
                selectedValue={powScroll}
                onChange={(event) =>
                  handleScrollChange(STATUS.POW, event.target.value)
                }
              />
            </Grid>
            {/* INT */}
            <Grid item xs={3}>
              <ScrollSelect
                options={basicScrollOptions}
                label="INT"
                selectedValue={intScroll}
                onChange={(event) =>
                  handleScrollChange(STATUS.INT, event.target.value)
                }
              />
            </Grid>
            {/* VIT */}
            <Grid item xs={3}>
              <ScrollSelect
                options={basicScrollOptions}
                label="VIT"
                selectedValue={vitScroll}
                onChange={(event) =>
                  handleScrollChange(STATUS.VIT, event.target.value)
                }
              />
            </Grid>
            <Grid item xs={3}></Grid>
            {/* SPD */}
            <Grid item xs={3}>
              <ScrollSelect
                options={basicScrollOptions}
                label="SPD"
                selectedValue={spdScroll}
                onChange={(event) =>
                  handleScrollChange(STATUS.SPD, event.target.value)
                }
              />
            </Grid>
            {/* LUK */}
            <Grid item xs={3}>
              <ScrollSelect
                options={basicScrollOptions}
                label="LUK"
                selectedValue={lukScroll}
                onChange={(event) =>
                  handleScrollChange(STATUS.LUK, event.target.value)
                }
              />
            </Grid>
            <Grid item xs={6}></Grid>

            {/* ATK */}
            <Grid item xs={3}>
              <ScrollSelect
                options={detailScrollOptions}
                label="ATK"
                selectedValue={atkScroll}
                onChange={(event) =>
                  handleScrollChange(STATUS.ATK, event.target.value)
                }
              />
            </Grid>
            {/* DEF */}
            <Grid item xs={3}>
              <ScrollSelect
                options={detailScrollOptions}
                label="DEF"
                selectedValue={defScroll}
                onChange={(event) =>
                  handleScrollChange(STATUS.DEF, event.target.value)
                }
              />
            </Grid>
            {/* MAT */}
            <Grid item xs={3}>
              <ScrollSelect
                options={detailScrollOptions}
                label="MAT"
                selectedValue={matScroll}
                onChange={(event) =>
                  handleScrollChange(STATUS.MAT, event.target.value)
                }
              />
            </Grid>
            {/* MDF */}
            <Grid item xs={3}>
              <ScrollSelect
                options={detailScrollOptions}
                label="MDF"
                selectedValue={mdfScroll}
                onChange={(event) =>
                  handleScrollChange(STATUS.MDF, event.target.value)
                }
              />
            </Grid>
          </Grid>
        </Grid>

        {/* リキッド */}
        <Grid item xs={4}>
          <ButtonGroupComponent
            buttons={liquidButtonsData}
            handles={handleLiquidButtons}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ItemArea;
