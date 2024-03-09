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

// 入力されたステータス
interface EditStatus {
    inputLevel: string;
    inputHp: string;
    inputSp: string;
    inputCharaPow: string;
    inputCharaInt: string;
    inputCharaVit: string;
    inputCharaSpd: string;
    inputCharaLuk: string;
    inputCardPow: string;
    inputCardInt: string;
    inputCardVit: string;
    inputCardSpd: string;
    inputCardLuk: string;
    inputTotalPow: string;
    inputTotalInt: string;
    inputTotalVit: string;
    inputTotalSpd: string;
    inputTotalLuk: string;
    inputAtk: string;
    inputDef: string;
    inputMat: string;
    inputMdf: string;
}

/**
 * キャラクターのステータスを管理するクラス
 */
class CharacterStatus {
    constructor(public status: Status) {}
}

/**
 * カードのステータスを管理するクラス
 */
class CardStatus {
    constructor(public status: Status) {}
}

/**
 * 入力用のステータスを管理するクラス
 */
class InputTotalStatus {
    constructor(public status: Status) {}
}

/**
 * ビタのステータスを管理するクラス
 */
class VitaStatus {
    constructor(public status: Status) {}
}

/**
 * 巻物のステータスを管理するクラス
 */
class ScrollStatus {
    constructor(public status: Status) {}
}

/**
 * 缶・シールのステータスを管理するクラス
 */
class CanStatus {
    constructor(public status: Status) {}
}

/**
 * 特殊スキルのステータスを管理するクラス
 */
class SpecialSkillStatus {
    constructor(public status: Status) {}
}

/**
 * 表示用の合計ステータスを管理するクラス
 */
class DisplayStatus {
    constructor(public status: Status) {}
}

/**
 * 入力した文字列をそのまま管理するクラス
 */
class InputStatus {
    constructor(public editStatus: EditStatus) {}

    update(editStatus: EditStatus) {
        this.editStatus = editStatus;
    }
}

export {
    CharacterStatus,
    CardStatus,
    InputTotalStatus,
    VitaStatus,
    ScrollStatus,
    CanStatus,
    SpecialSkillStatus,
    DisplayStatus,
    InputStatus,
};
