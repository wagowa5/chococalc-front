import { evaluate } from 'maths.ts';
import { STATUS, FIELDS } from '../constants/constants';
import { CharacterStatus, StatusInputFields } from '../interface/Status';

// 入力フィールドを取得する関数
export const getInputStatus = (
    characterStatus: CharacterStatus,
    inputStatus: StatusInputFields,
    updateCharacter: (newCharacterStatus: CharacterStatus) => void
) => {
    const newCharacterStatus = { ...characterStatus };
    newCharacterStatus[STATUS.POW].base = evaluate(inputStatus[FIELDS.CHARA_POW].value).getNumberValue();
    newCharacterStatus[STATUS.INT].base = evaluate(inputStatus[FIELDS.CHARA_INT].value).getNumberValue();
    newCharacterStatus[STATUS.VIT].base = evaluate(inputStatus[FIELDS.CHARA_VIT].value).getNumberValue();
    newCharacterStatus[STATUS.SPD].base = evaluate(inputStatus[FIELDS.CHARA_SPD].value).getNumberValue();
    newCharacterStatus[STATUS.LUK].base = evaluate(inputStatus[FIELDS.CHARA_LUK].value).getNumberValue();
    newCharacterStatus[STATUS.POW].card = evaluate(inputStatus[FIELDS.CARD_POW].value).getNumberValue();
    newCharacterStatus[STATUS.INT].card = evaluate(inputStatus[FIELDS.CARD_INT].value).getNumberValue();
    newCharacterStatus[STATUS.VIT].card = evaluate(inputStatus[FIELDS.CARD_VIT].value).getNumberValue();
    newCharacterStatus[STATUS.SPD].card = evaluate(inputStatus[FIELDS.CARD_SPD].value).getNumberValue();
    newCharacterStatus[STATUS.LUK].card = evaluate(inputStatus[FIELDS.CARD_LUK].value).getNumberValue();
    newCharacterStatus[STATUS.LEVEL].totalWithoutItem = evaluate(inputStatus[FIELDS.LEVEL].value).getNumberValue();
    newCharacterStatus[STATUS.HP].totalWithoutItem = evaluate(inputStatus[FIELDS.HP].value).getNumberValue();
    newCharacterStatus[STATUS.SP].totalWithoutItem = evaluate(inputStatus[FIELDS.SP].value).getNumberValue();
    newCharacterStatus[STATUS.POW].totalWithoutItem = evaluate(inputStatus[FIELDS.TOTAL_POW].value).getNumberValue();
    newCharacterStatus[STATUS.INT].totalWithoutItem = evaluate(inputStatus[FIELDS.TOTAL_INT].value).getNumberValue();
    newCharacterStatus[STATUS.VIT].totalWithoutItem = evaluate(inputStatus[FIELDS.TOTAL_VIT].value).getNumberValue();
    newCharacterStatus[STATUS.SPD].totalWithoutItem = evaluate(inputStatus[FIELDS.TOTAL_SPD].value).getNumberValue();
    newCharacterStatus[STATUS.LUK].totalWithoutItem = evaluate(inputStatus[FIELDS.TOTAL_LUK].value).getNumberValue();
    newCharacterStatus[STATUS.ATK].totalWithoutItem = evaluate(inputStatus[FIELDS.ATK].value).getNumberValue();
    newCharacterStatus[STATUS.DEF].totalWithoutItem = evaluate(inputStatus[FIELDS.DEF].value).getNumberValue();
    newCharacterStatus[STATUS.MAT].totalWithoutItem = evaluate(inputStatus[FIELDS.MAT].value).getNumberValue();
    newCharacterStatus[STATUS.MDF].totalWithoutItem = evaluate(inputStatus[FIELDS.MDF].value).getNumberValue();
    updateCharacter(newCharacterStatus);
};

// 表示用のステータスを計算する関数
export const calculateDisplayStatus = (
    characterStatus: CharacterStatus,
    updateCharacter: (newCharacterStatus: CharacterStatus) => void
) => {
    const newCharacterStatus = { ...characterStatus };
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
        )
        ;
    
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
    const newCharacterStatus = { ...characterStatus };
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
    const newCharacterStatus = { ...characterStatus };
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
    const newCharacterStatus = { ...characterStatus };
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
    const newCharacterStatus = { ...characterStatus };
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
    const newCharacterStatus = { ...characterStatus };
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
    const newCharacterStatus = { ...characterStatus };
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
