import React, { useState } from 'react';

// ステータスの型定義
interface Status {
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
class InputStatus {
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
class TotalStatus {
    constructor(public status: Status) {}
}

export {
    CharacterStatus,
    CardStatus,
    VitaStatus,
    ScrollStatus,
    CanStatus,
    SpecialSkillStatus,
    TotalStatus,
};
