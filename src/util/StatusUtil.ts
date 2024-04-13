import { evaluate } from 'mathjs';
import { STATUS, FIELDS } from 'constants/constants';
import { CharacterStatus, StatusInputFields } from 'interface/Status';

/**
 * 文字列が計算可能かチェックする関数
 * 可能であれば計算結果を返す
 * 不可能であれば一律0を返す
 */
const strCalculate = (value: string): number => {
  try {
    // evaluate で直接計算結果を取得
    const result = evaluate(value);
    // isFinite 関数で結果が有限数かどうかをチェック
    return isFinite(result) ? result : 0;
  } catch (error) {
    // 計算不可能な場合は 0 を返す
    return 0;
  }
}

// 入力フィールドを取得する関数
export const getInputStatus = (
  characterStatus: CharacterStatus,
  inputStatus: StatusInputFields,
  updateCharacter: (newCharacterStatus: CharacterStatus) => void,
) => {
  let newCharacterStatus = { ...characterStatus }

  newCharacterStatus[STATUS.POW].base = strCalculate(inputStatus[FIELDS.CHARA_POW].value);
  newCharacterStatus[STATUS.INT].base = strCalculate(inputStatus[FIELDS.CHARA_INT].value);
  newCharacterStatus[STATUS.VIT].base = strCalculate(inputStatus[FIELDS.CHARA_VIT].value);
  newCharacterStatus[STATUS.SPD].base = strCalculate(inputStatus[FIELDS.CHARA_SPD].value);
  newCharacterStatus[STATUS.LUK].base = strCalculate(inputStatus[FIELDS.CHARA_LUK].value);
  newCharacterStatus[STATUS.POW].card = strCalculate(inputStatus[FIELDS.CARD_POW].value);
  newCharacterStatus[STATUS.INT].card = strCalculate(inputStatus[FIELDS.CARD_INT].value);
  newCharacterStatus[STATUS.VIT].card = strCalculate(inputStatus[FIELDS.CARD_VIT].value);
  newCharacterStatus[STATUS.SPD].card = strCalculate(inputStatus[FIELDS.CARD_SPD].value);
  newCharacterStatus[STATUS.LUK].card = strCalculate(inputStatus[FIELDS.CARD_LUK].value);
  newCharacterStatus[STATUS.LEVEL].totalWithoutItem = strCalculate(inputStatus[FIELDS.LEVEL].value);
  newCharacterStatus[STATUS.HP].totalWithoutItem = strCalculate(inputStatus[FIELDS.HP].value);
  newCharacterStatus[STATUS.SP].totalWithoutItem = strCalculate(inputStatus[FIELDS.SP].value);
  newCharacterStatus[STATUS.POW].totalWithoutItem = strCalculate(inputStatus[FIELDS.TOTAL_POW].value);
  newCharacterStatus[STATUS.INT].totalWithoutItem = strCalculate(inputStatus[FIELDS.TOTAL_INT].value);
  newCharacterStatus[STATUS.VIT].totalWithoutItem = strCalculate(inputStatus[FIELDS.TOTAL_VIT].value);
  newCharacterStatus[STATUS.SPD].totalWithoutItem = strCalculate(inputStatus[FIELDS.TOTAL_SPD].value);
  newCharacterStatus[STATUS.LUK].totalWithoutItem = strCalculate(inputStatus[FIELDS.TOTAL_LUK].value);
  newCharacterStatus[STATUS.ATK].totalWithoutItem = strCalculate(inputStatus[FIELDS.ATK].value);
  newCharacterStatus[STATUS.DEF].totalWithoutItem = strCalculate(inputStatus[FIELDS.DEF].value);
  newCharacterStatus[STATUS.MAT].totalWithoutItem = strCalculate(inputStatus[FIELDS.MAT].value);
  newCharacterStatus[STATUS.MDF].totalWithoutItem = strCalculate(inputStatus[FIELDS.MDF].value);

  updateCharacter(newCharacterStatus);
};

// 表示用のステータスを計算する関数
export const calculateDisplayStatus = (
  characterStatus: CharacterStatus,
  updateCharacter: (newCharacterStatus: CharacterStatus) => void
) => {
    let newCharacterStatus = { ...characterStatus }

  // HPの表示用ステータスを計算
  newCharacterStatus[STATUS.HP].displayStatus = 
    newCharacterStatus[STATUS.HP].totalWithoutItem
    + newCharacterStatus[STATUS.HP].scroll
    + newCharacterStatus[STATUS.HP].specialSkill;
  
  // SPの表示用ステータスを計算
  newCharacterStatus[STATUS.SP].displayStatus = 
    newCharacterStatus[STATUS.SP].totalWithoutItem
    + newCharacterStatus[STATUS.SP].scroll
    + newCharacterStatus[STATUS.SP].specialSkill;
  
  // POWの表示用ステータスを計算
  newCharacterStatus[STATUS.POW].displayStatus = 
    newCharacterStatus[STATUS.POW].totalWithoutItem
    + newCharacterStatus[STATUS.POW].card
    + newCharacterStatus[STATUS.POW].allVita
    + newCharacterStatus[STATUS.POW].vita
    + newCharacterStatus[STATUS.POW].scroll
    + newCharacterStatus[STATUS.POW].canSeal
    + newCharacterStatus[STATUS.POW].bradScraper
    + newCharacterStatus[STATUS.POW].specialSkill;
    
  // INTの表示用ステータスを計算
  newCharacterStatus[STATUS.INT].displayStatus = 
    newCharacterStatus[STATUS.INT].totalWithoutItem
    + newCharacterStatus[STATUS.INT].card
    + newCharacterStatus[STATUS.INT].allVita
    + newCharacterStatus[STATUS.INT].vita
    + newCharacterStatus[STATUS.INT].scroll
    + newCharacterStatus[STATUS.INT].canSeal
    + newCharacterStatus[STATUS.INT].specialSkill;
  
  // SPDの表示用ステータスを計算
  newCharacterStatus[STATUS.SPD].displayStatus = 
    newCharacterStatus[STATUS.SPD].totalWithoutItem
    + newCharacterStatus[STATUS.SPD].card
    + newCharacterStatus[STATUS.SPD].allVita
    + newCharacterStatus[STATUS.SPD].vita
    + newCharacterStatus[STATUS.SPD].scroll
    + newCharacterStatus[STATUS.SPD].canSeal
    + newCharacterStatus[STATUS.SPD].specialSkill;
  
  // VITの表示用ステータスを計算
  newCharacterStatus[STATUS.VIT].displayStatus = 
    newCharacterStatus[STATUS.VIT].totalWithoutItem
    + newCharacterStatus[STATUS.VIT].card
    + newCharacterStatus[STATUS.VIT].allVita
    + newCharacterStatus[STATUS.VIT].vita
    + newCharacterStatus[STATUS.VIT].scroll
    + newCharacterStatus[STATUS.VIT].canSeal
    + newCharacterStatus[STATUS.VIT].specialSkill;
  
  // LUKの表示用ステータスを計算
  newCharacterStatus[STATUS.LUK].displayStatus = 
    newCharacterStatus[STATUS.LUK].totalWithoutItem
    + newCharacterStatus[STATUS.LUK].card
    + newCharacterStatus[STATUS.LUK].allVita
    + newCharacterStatus[STATUS.LUK].vita
    + newCharacterStatus[STATUS.LUK].scroll
    + newCharacterStatus[STATUS.LUK].canSeal
    + newCharacterStatus[STATUS.LUK].specialSkill;
  
  // ATKの表示用ステータスを計算
  newCharacterStatus[STATUS.ATK].displayStatus = 
    newCharacterStatus[STATUS.ATK].totalWithoutItem
    + newCharacterStatus[STATUS.ATK].scroll
    + newCharacterStatus[STATUS.ATK].specialSkill
    + newCharacterStatus[STATUS.ATK].liquid
    + 3*(
      newCharacterStatus[STATUS.POW].card
      + newCharacterStatus[STATUS.POW].allVita
      + newCharacterStatus[STATUS.POW].vita
      + newCharacterStatus[STATUS.POW].scroll
      + newCharacterStatus[STATUS.POW].canSeal
      + newCharacterStatus[STATUS.POW].bradScraper
      + newCharacterStatus[STATUS.POW].specialSkill
    );
    
  // DEFの表示用ステータスを計算
  newCharacterStatus[STATUS.DEF].displayStatus = 
    newCharacterStatus[STATUS.DEF].totalWithoutItem
    + newCharacterStatus[STATUS.DEF].scroll
    + newCharacterStatus[STATUS.DEF].specialSkill
    + newCharacterStatus[STATUS.DEF].liquid
    + 2*(
      newCharacterStatus[STATUS.VIT].card
      + newCharacterStatus[STATUS.VIT].allVita
      + newCharacterStatus[STATUS.VIT].vita
      + newCharacterStatus[STATUS.VIT].scroll
      + newCharacterStatus[STATUS.VIT].canSeal
      + newCharacterStatus[STATUS.VIT].specialSkill
    );
  
  // MATの表示用ステータスを計算
  newCharacterStatus[STATUS.MAT].displayStatus = 
    newCharacterStatus[STATUS.MAT].totalWithoutItem
    + newCharacterStatus[STATUS.MAT].scroll
    + newCharacterStatus[STATUS.MAT].specialSkill
    + newCharacterStatus[STATUS.MAT].liquid
    + 2*(
      newCharacterStatus[STATUS.INT].card
      + newCharacterStatus[STATUS.INT].allVita
      + newCharacterStatus[STATUS.INT].vita
      + newCharacterStatus[STATUS.INT].scroll
      + newCharacterStatus[STATUS.INT].canSeal
      + newCharacterStatus[STATUS.INT].specialSkill
    );
  
  // MDFの表示用ステータスを計算
  newCharacterStatus[STATUS.MDF].displayStatus = 
    newCharacterStatus[STATUS.MDF].totalWithoutItem
    + newCharacterStatus[STATUS.MDF].scroll
    + newCharacterStatus[STATUS.MDF].specialSkill
    + newCharacterStatus[STATUS.MDF].liquid
    + 15*(
      newCharacterStatus[STATUS.INT].card
      + newCharacterStatus[STATUS.INT].allVita
      + newCharacterStatus[STATUS.INT].vita
      + newCharacterStatus[STATUS.INT].scroll
      + newCharacterStatus[STATUS.INT].canSeal
      + newCharacterStatus[STATUS.INT].specialSkill
    );

  updateCharacter(newCharacterStatus);
};

// 缶・シールのステータスをリセットする関数
export const resetCanSealStatus = (
  characterStatus: CharacterStatus,
  updateCharacter: (newCharacterStatus: CharacterStatus) => void
) => {
    let newCharacterStatus = { ...characterStatus }

  newCharacterStatus[STATUS.POW].canSeal = 0;
  newCharacterStatus[STATUS.INT].canSeal = 0;
  newCharacterStatus[STATUS.SPD].canSeal = 0;
  newCharacterStatus[STATUS.VIT].canSeal = 0;
  newCharacterStatus[STATUS.LUK].canSeal = 0;

  updateCharacter(newCharacterStatus);
}

// ビタのステータスをリセットする関数
export const resetVitaStatus = (
  characterStatus: CharacterStatus,
  updateCharacter: (newCharacterStatus: CharacterStatus) => void
) => {
    let newCharacterStatus = { ...characterStatus }

  newCharacterStatus[STATUS.POW].allVita = 0;
  newCharacterStatus[STATUS.POW].vita = 0;
  newCharacterStatus[STATUS.INT].allVita = 0;
  newCharacterStatus[STATUS.INT].vita = 0;
  newCharacterStatus[STATUS.SPD].allVita = 0;
  newCharacterStatus[STATUS.SPD].vita = 0;
  newCharacterStatus[STATUS.VIT].allVita = 0;
  newCharacterStatus[STATUS.VIT].vita = 0;
  newCharacterStatus[STATUS.LUK].allVita = 0;
  newCharacterStatus[STATUS.LUK].vita = 0;
  
  updateCharacter(newCharacterStatus);
}

// 巻物のステータスをリセットする関数
export const resetScrollStatus = (
  characterStatus: CharacterStatus,
  updateCharacter: (newCharacterStatus: CharacterStatus) => void
) => {
    let newCharacterStatus = { ...characterStatus }

  newCharacterStatus[STATUS.HP].scroll = 0;
  newCharacterStatus[STATUS.SP].scroll = 0;
  newCharacterStatus[STATUS.POW].scroll = 0;
  newCharacterStatus[STATUS.INT].scroll = 0;
  newCharacterStatus[STATUS.SPD].scroll = 0;
  newCharacterStatus[STATUS.VIT].scroll = 0;
  newCharacterStatus[STATUS.LUK].scroll = 0;
  newCharacterStatus[STATUS.ATK].scroll = 0;
  newCharacterStatus[STATUS.DEF].scroll = 0;
  newCharacterStatus[STATUS.MAT].scroll = 0;
  newCharacterStatus[STATUS.MDF].scroll = 0;

  updateCharacter(newCharacterStatus);
}

// リキッドのステータスをリセットする関数
export const resetLiquidStatus = (
  characterStatus: CharacterStatus,
  updateCharacter: (newCharacterStatus: CharacterStatus) => void
) => {
    let newCharacterStatus = { ...characterStatus }
  
  newCharacterStatus[STATUS.ATK].liquid = 0;
  newCharacterStatus[STATUS.DEF].liquid = 0;
  newCharacterStatus[STATUS.MAT].liquid = 0;
  newCharacterStatus[STATUS.MDF].liquid = 0;

  updateCharacter(newCharacterStatus);
}

// 特殊スキルのステータスをリセットする関数
export const resetSpecialSkillStatus = (
  characterStatus: CharacterStatus,
  updateCharacter: (newCharacterStatus: CharacterStatus) => void
) => {
    let newCharacterStatus = { ...characterStatus }

  newCharacterStatus[STATUS.HP].specialSkill = 0;
  newCharacterStatus[STATUS.SP].specialSkill = 0;
  newCharacterStatus[STATUS.POW].specialSkill = 0;
  newCharacterStatus[STATUS.INT].specialSkill = 0;
  newCharacterStatus[STATUS.SPD].specialSkill = 0;
  newCharacterStatus[STATUS.VIT].specialSkill = 0;
  newCharacterStatus[STATUS.LUK].specialSkill = 0;
  newCharacterStatus[STATUS.ATK].specialSkill = 0;
  newCharacterStatus[STATUS.DEF].specialSkill = 0;
  newCharacterStatus[STATUS.MAT].specialSkill = 0;
  newCharacterStatus[STATUS.MDF].specialSkill = 0;

  updateCharacter(newCharacterStatus);
}

// ブラッドスクレイパーのステータスをリセットする関数
export const resetBradScraperStatus = (
  characterStatus: CharacterStatus,
  updateCharacter: (newCharacterStatus: CharacterStatus) => void
) => {
    let newCharacterStatus = { ...characterStatus }
  
  newCharacterStatus[STATUS.POW].bradScraper = 0;

  updateCharacter(newCharacterStatus);
}

// アイテム・スキルをすべてリセットする関数
export const resetAllItemSkillStatus = (
  characterStatus: CharacterStatus,
  updateCharacter: (newCharacterStatus: CharacterStatus) => void
) => {
  resetCanSealStatus(characterStatus, updateCharacter);
  resetVitaStatus(characterStatus, updateCharacter);
  resetScrollStatus(characterStatus, updateCharacter);
  resetLiquidStatus(characterStatus, updateCharacter);
  resetSpecialSkillStatus(characterStatus, updateCharacter);
  resetBradScraperStatus(characterStatus, updateCharacter);
}
