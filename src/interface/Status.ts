/**
 * ステータス入力管理
 * @param フィールドごとの入力値
 * @param フィールドごとのエラーメッセージ
 */
export interface StatusInputFields {
  [key: string]: {
    value: string;
    errorMessage: string;
  }
}

// ステータスの型定義
export interface CharacterStatus {
  [key: string]: {
    base: number; // ステ振りのステータス
    card: number; // カードのステータス
    totalWithoutItem: number; // アイテムなしの合計ステータス
    allVita: number; // ALLビタのステータス
    vita: number; // ビタのステータス
    scroll: number; // 巻物のステータス
    canSeal: number; // 缶・シールのステータス
    bradScraper: number; // ブラッドスクレイパーのステータス
    specialSkill: number; // 特殊スキルのステータス
    liquid: number; // リキッドのステータス
    displayStatus: number; // 表示用の合計ステータス
  }
}
