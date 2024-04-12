import React from 'react';
import { evaluate } from 'maths.ts';

import { MESSAGES, FIELDS } from '../../constants/constants';
import { StatusInputFields } from '../../interface/Status';
import './CharacterArea.css';

import { TextField, Grid, Chip } from '@mui/material';

// propsの型定義を追加
interface CharacterAreaProps {
  inputStatus: StatusInputFields;
  updateInputStatus: (newInputStatus: StatusInputFields) => void;
}

const CharacterArea = ({
  inputStatus,
  updateInputStatus,
}: CharacterAreaProps) => {
  // 各TextField更新時の処理
  const handleInputStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // 現在のinputStatusをコピーして新しい状態を生成
    let newInputStatus = { ...inputStatus };

    // 文字列が計算可能か事前にチェックする
    // 入力値のStatusクラスへの格納や計算は別コンポーネントで行う
    try {
      const inputValue = Number(evaluate(value));

      // 数値がNaNまたは無限大の場合、エラーメッセージを更新
      const errorMessage = !isFinite(inputValue)
        ? MESSAGES.INPUT_ERROR.CANNOT_CALCULATE
        : '';
      newInputStatus[name] = { value: value, errorMessage: errorMessage };
    } catch (error) {
      newInputStatus[name] = {
        value: value,
        errorMessage: MESSAGES.INPUT_ERROR.CANNOT_CALCULATE,
      };
    }

    updateInputStatus(newInputStatus);
  };

  return (
    <>
      {/* 空(位置調整), レベル, HP, SP */}
      <Grid container spacing={1}>
        <Grid item xs={1}></Grid>
        <Grid item xs={3}>
          <TextField
            name={FIELDS.LEVEL}
            label="Lv:"
            value={inputStatus[FIELDS.LEVEL].value}
            placeholder="99"
            error={!!inputStatus[FIELDS.LEVEL].errorMessage} // エラーがある場合はTextFieldをエラー状態にする
            helperText={inputStatus[FIELDS.LEVEL].errorMessage || ''} // エラーメッセージを表示
            onChange={handleInputStatusChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name={FIELDS.HP}
            label="HP:"
            value={inputStatus[FIELDS.HP].value}
            placeholder="10000"
            error={!!inputStatus[FIELDS.HP].errorMessage} // エラーがある場合はTextFieldをエラー状態にする
            helperText={inputStatus[FIELDS.HP].errorMessage || ''} // エラーメッセージを表示
            onChange={handleInputStatusChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name={FIELDS.SP}
            label="SP:"
            value={inputStatus[FIELDS.SP].value}
            placeholder="10000"
            error={!!inputStatus[FIELDS.SP].errorMessage} // エラーがある場合はTextFieldをエラー状態にする
            helperText={inputStatus[FIELDS.SP].errorMessage || ''} // エラーメッセージを表示
            onChange={handleInputStatusChange}
          />
        </Grid>
      </Grid>

      {/* 項目名 */}
      <Grid container spacing={1} margin={0}>
        <Grid item xs={3}>
          <Chip label="ステ振り" />
        </Grid>
        <Grid item xs={3}>
          <Chip label="カード" />
        </Grid>
        <Grid item xs={6}>
          <Chip label="合計(ヌシステ含む)" />
        </Grid>
      </Grid>

      {/* ステ振り, カード, 合計 */}
      <Grid container spacing={1} className="character-status">
        <Grid item xs={3}>
          <TextField
            name={FIELDS.CHARA_POW}
            label="POW:"
            value={inputStatus[FIELDS.CHARA_POW].value}
            placeholder="157"
            error={!!inputStatus[FIELDS.CHARA_POW].errorMessage} // エラーがある場合はTextFieldをエラー状態にする
            helperText={inputStatus[FIELDS.CHARA_POW].errorMessage || ''} // エラーメッセージを表示
            onChange={handleInputStatusChange}
          />
          <TextField
            name={FIELDS.CHARA_INT}
            label="INT:"
            value={inputStatus[FIELDS.CHARA_INT].value}
            placeholder="1"
            error={!!inputStatus[FIELDS.CHARA_INT].errorMessage} // エラーがある場合はTextFieldをエラー状態にする
            helperText={inputStatus[FIELDS.CHARA_INT].errorMessage || ''} // エラーメッセージを表示
            onChange={handleInputStatusChange}
          />
          <TextField
            name={FIELDS.CHARA_SPD}
            label="SPD:"
            value={inputStatus[FIELDS.CHARA_SPD].value}
            placeholder="1"
            error={!!inputStatus[FIELDS.CHARA_SPD].errorMessage} // エラーがある場合はTextFieldをエラー状態にする
            helperText={inputStatus[FIELDS.CHARA_SPD].errorMessage || ''} // エラーメッセージを表示
            onChange={handleInputStatusChange}
          />
          <TextField
            name={FIELDS.CHARA_VIT}
            label="VIT:"
            value={inputStatus[FIELDS.CHARA_VIT].value}
            placeholder="1"
            error={!!inputStatus[FIELDS.CHARA_VIT].errorMessage} // エラーがある場合はTextFieldをエラー状態にする
            helperText={inputStatus[FIELDS.CHARA_VIT].errorMessage || ''} // エラーメッセージを表示
            onChange={handleInputStatusChange}
          />
          <TextField
            name={FIELDS.CHARA_LUK}
            label="LUK:"
            value={inputStatus[FIELDS.CHARA_LUK].value}
            placeholder="1"
            error={!!inputStatus[FIELDS.CHARA_LUK].errorMessage} // エラーがある場合はTextFieldをエラー状態にする
            helperText={inputStatus[FIELDS.CHARA_LUK].errorMessage || ''} // エラーメッセージを表示
            onChange={handleInputStatusChange}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            name={FIELDS.CARD_POW}
            label="POW:"
            value={inputStatus[FIELDS.CARD_POW].value}
            placeholder="18"
            error={!!inputStatus[FIELDS.CARD_POW].errorMessage} // エラーがある場合はTextFieldをエラー状態にする
            helperText={inputStatus[FIELDS.CARD_POW].errorMessage || ''} // エラーメッセージを表示
            onChange={handleInputStatusChange}
          />
          <TextField
            name={FIELDS.CARD_INT}
            label="INT:"
            value={inputStatus[FIELDS.CARD_INT].value}
            placeholder="0"
            defaultValue="0"
            error={!!inputStatus[FIELDS.CARD_INT].errorMessage} // エラーがある場合はTextFieldをエラー状態にする
            helperText={inputStatus[FIELDS.CARD_INT].errorMessage || ''} // エラーメッセージを表示
            onChange={handleInputStatusChange}
          />
          <TextField
            name={FIELDS.CARD_SPD}
            label="SPD:"
            value={inputStatus[FIELDS.CARD_SPD].value}
            placeholder="0"
            defaultValue="0"
            error={!!inputStatus[FIELDS.CARD_SPD].errorMessage} // エラーがある場合はTextFieldをエラー状態にする
            helperText={inputStatus[FIELDS.CARD_SPD].errorMessage || ''} // エラーメッセージを表示
            onChange={handleInputStatusChange}
          />
          <TextField
            name={FIELDS.CARD_VIT}
            label="VIT:"
            value={inputStatus[FIELDS.CARD_VIT].value}
            placeholder="0"
            defaultValue="0"
            error={!!inputStatus[FIELDS.CARD_VIT].errorMessage} // エラーがある場合はTextFieldをエラー状態にする
            helperText={inputStatus[FIELDS.CARD_VIT].errorMessage || ''} // エラーメッセージを表示
            onChange={handleInputStatusChange}
          />
          <TextField
            name={FIELDS.CARD_LUK}
            label="LUK:"
            value={inputStatus[FIELDS.CARD_LUK].value}
            placeholder="0"
            defaultValue="0"
            error={!!inputStatus[FIELDS.CARD_LUK].errorMessage} // エラーがある場合はTextFieldをエラー状態にする
            helperText={inputStatus[FIELDS.CARD_LUK].errorMessage || ''} // エラーメッセージを表示
            onChange={handleInputStatusChange}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            name={FIELDS.TOTAL_POW}
            label="合計POW:"
            value={inputStatus[FIELDS.TOTAL_POW].value}
            placeholder="入力例: 157+342"
            error={!!inputStatus[FIELDS.TOTAL_POW].errorMessage} // エラーがある場合はTextFieldをエラー状態にする
            helperText={inputStatus[FIELDS.TOTAL_POW].errorMessage || ''} // エラーメッセージを表示
            onChange={handleInputStatusChange}
          />
          <TextField
            name={FIELDS.TOTAL_INT}
            label="合計INT:"
            value={inputStatus[FIELDS.TOTAL_INT].value}
            placeholder="入力例: 1+150"
            error={!!inputStatus[FIELDS.TOTAL_INT].errorMessage} // エラーがある場合はTextFieldをエラー状態にする
            helperText={inputStatus[FIELDS.TOTAL_INT].errorMessage || ''} // エラーメッセージを表示
            onChange={handleInputStatusChange}
          />
          <TextField
            name={FIELDS.TOTAL_SPD}
            label="合計SPD:"
            value={inputStatus[FIELDS.TOTAL_SPD].value}
            placeholder="入力例: 1"
            error={!!inputStatus[FIELDS.TOTAL_SPD].errorMessage} // エラーがある場合はTextFieldをエラー状態にする
            helperText={inputStatus[FIELDS.TOTAL_SPD].errorMessage || ''} // エラーメッセージを表示
            onChange={handleInputStatusChange}
          />
          <TextField
            name={FIELDS.TOTAL_VIT}
            label="合計VIT:"
            value={inputStatus[FIELDS.TOTAL_VIT].value}
            placeholder="入力例: 1+80"
            error={!!inputStatus[FIELDS.TOTAL_VIT].errorMessage} // エラーがある場合はTextFieldをエラー状態にする
            helperText={inputStatus[FIELDS.TOTAL_VIT].errorMessage || ''} // エラーメッセージを表示
            onChange={handleInputStatusChange}
          />
          <TextField
            name={FIELDS.TOTAL_LUK}
            label="合計LUK:"
            value={inputStatus[FIELDS.TOTAL_LUK].value}
            placeholder="入力例: 1"
            error={!!inputStatus[FIELDS.TOTAL_LUK].errorMessage} // エラーがある場合はTextFieldをエラー状態にする
            helperText={inputStatus[FIELDS.TOTAL_LUK].errorMessage || ''} // エラーメッセージを表示
            onChange={handleInputStatusChange}
          />
        </Grid>
      </Grid>

      {/* ATK, DEF, MAT, MDF */}
      <Grid container spacing={0} margin={1} className="detail-status">
        <Grid item xs={1}></Grid>
        <Grid item xs={4}>
          <TextField
            name={FIELDS.ATK}
            label="表示ATK:"
            value={inputStatus[FIELDS.ATK].value}
            placeholder="1"
            error={!!inputStatus[FIELDS.ATK].errorMessage} // エラーがある場合はTextFieldをエラー状態にする
            helperText={inputStatus[FIELDS.ATK].errorMessage || ''} // エラーメッセージを表示
            onChange={handleInputStatusChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            name={FIELDS.DEF}
            label="表示DEF:"
            value={inputStatus[FIELDS.DEF].value}
            placeholder="1"
            error={!!inputStatus[FIELDS.DEF].errorMessage} // エラーがある場合はTextFieldをエラー状態にする
            helperText={inputStatus[FIELDS.DEF].errorMessage || ''} // エラーメッセージを表示
            onChange={handleInputStatusChange}
          />
        </Grid>
        <Grid item xs={3}></Grid>

        <Grid item xs={1}></Grid>
        <Grid item xs={4}>
          <TextField
            name={FIELDS.MAT}
            label="表示MAT:"
            value={inputStatus[FIELDS.MAT].value}
            placeholder="1"
            error={!!inputStatus[FIELDS.MAT].errorMessage} // エラーがある場合はTextFieldをエラー状態にする
            helperText={inputStatus[FIELDS.MAT].errorMessage || ''} // エラーメッセージを表示
            onChange={handleInputStatusChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            name={FIELDS.MDF}
            label="表示MDF:"
            value={inputStatus[FIELDS.MDF].value}
            placeholder="1"
            error={!!inputStatus[FIELDS.MDF].errorMessage} // エラーがある場合はTextFieldをエラー状態にする
            helperText={inputStatus[FIELDS.MDF].errorMessage || ''} // エラーメッセージを表示
            onChange={handleInputStatusChange}
          />
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </>
  );
};

export default CharacterArea;
