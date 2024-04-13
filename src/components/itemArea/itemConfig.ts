import { ITEMS, SCROLL_RANK } from "../../constants/constants"; 

// ボタン設定
export const vitaButtonsData = [
  ITEMS.VITA.ALL,
  ITEMS.VITA.POW,
  ITEMS.VITA.INT,
  ITEMS.VITA.SPD,
  ITEMS.VITA.VIT,
  ITEMS.VITA.LUK,
];

export const canButtonsData = [
  ITEMS.CAN.A,
  ITEMS.CAN.B,
];

export const sealButtonsData = [
  ITEMS.SEAL.POW,
  ITEMS.SEAL.INT,
  ITEMS.SEAL.SPD,
  ITEMS.SEAL.VIT,
  ITEMS.SEAL.LUK,
];

export const liquidButtonsData = [
  ITEMS.LIQUID.ATK,
  ITEMS.LIQUID.DEF,
  ITEMS.LIQUID.MAT,
  ITEMS.LIQUID.MDF,
];

// 巻物設定
export const hpSpScrollOptions = [
  { value: 0, label: SCROLL_RANK.NONE },
  { value: 200, label: SCROLL_RANK.RANK1 },
  { value: 400, label: SCROLL_RANK.RANK2 },
  { value: 600, label: SCROLL_RANK.RANK3 },
  { value: 800, label: SCROLL_RANK.RANK4 },
  { value: 1000, label: SCROLL_RANK.RANK5 },
  { value: 1200, label: SCROLL_RANK.RANK6 },
  { value: 1400, label: SCROLL_RANK.RANK7 },
  { value: 1600, label: SCROLL_RANK.RANK8 },
  { value: 1800, label: SCROLL_RANK.RANK9 },
  { value: 2000, label: SCROLL_RANK.RANK10 },
];

export const basicScrollOptions = [
  { value: 0, label: SCROLL_RANK.NONE },
  { value: 1, label: SCROLL_RANK.RANK1 },
  { value: 2, label: SCROLL_RANK.RANK2 },
  { value: 3, label: SCROLL_RANK.RANK3 },
  { value: 4, label: SCROLL_RANK.RANK4 },
  { value: 5, label: SCROLL_RANK.RANK5 },
  { value: 6, label: SCROLL_RANK.RANK6 },
  { value: 7, label: SCROLL_RANK.RANK7 },
  { value: 8, label: SCROLL_RANK.RANK8 },
  { value: 9, label: SCROLL_RANK.RANK9 },
  { value: 10, label: SCROLL_RANK.RANK10 },
];

export const detailScrollOptions = [
  { value: 0, label: SCROLL_RANK.NONE },
  { value: 20, label: SCROLL_RANK.RANK1 },
  { value: 40, label: SCROLL_RANK.RANK2 },
  { value: 60, label: SCROLL_RANK.RANK3 },
  { value: 80, label: SCROLL_RANK.RANK4 },
  { value: 100, label: SCROLL_RANK.RANK5 },
  { value: 120, label: SCROLL_RANK.RANK6 },
  { value: 140, label: SCROLL_RANK.RANK7 },
  { value: 160, label: SCROLL_RANK.RANK8 },
  { value: 180, label: SCROLL_RANK.RANK9 },
  { value: 200, label: SCROLL_RANK.RANK10 },
];
