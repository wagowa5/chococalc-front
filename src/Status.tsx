import React, { useState } from 'react';

// ステータスの型定義
interface Status {
    level: number;
    hp: number;
    sp: number;
    pow: number;
    int: number;
    vit: number;
    spd: number;
    luk: number;
    atk: number;
    def: number;
    mat: number;
    mdf: number;
}

// 汎用的なステータスクラス
class GenericStatus {
    constructor(public status: Status) {}

    update(status: Status) {
        this.status = status;
    }
}

// キャラクターが持つ各種ステータスを管理するクラス
class Character {
    // ステ振りのステータス
    characterStatus: GenericStatus;
    // カードのステータス
    cardStatus: GenericStatus;
    // ビタのステータス
    vitaStatus: GenericStatus;
    // 入力された合計ステータス
    inputedTotalStatus: GenericStatus;
    // 巻物のステータス
    scrollStatus: GenericStatus;
    // 缶・シールのステータス
    canStatus: GenericStatus;
    // 特殊スキルのステータス
    specialSkillStatus: GenericStatus;
    // 表示用の合計ステータス
    displayStatus: GenericStatus;

    constructor(
        characterStatus: Status,
        cardStatus: Status,
        vitaStatus: Status,
        inputedTotalStatus: Status,
        scrollStatus: Status,
        canStatus: Status,
        specialSkillStatus: Status,
        displayStatus: Status
    ) {
        this.characterStatus = new GenericStatus(characterStatus);
        this.cardStatus = new GenericStatus(cardStatus);
        this.vitaStatus = new GenericStatus(vitaStatus);
        this.inputedTotalStatus = new GenericStatus(inputedTotalStatus);
        this.scrollStatus = new GenericStatus(scrollStatus);
        this.canStatus = new GenericStatus(canStatus);
        this.specialSkillStatus = new GenericStatus(specialSkillStatus);
        this.displayStatus = new GenericStatus(displayStatus);
    }

    // 必要に応じてキャラクター関連のメソッドを追加
}

export {
    Character,
};
