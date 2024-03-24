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
