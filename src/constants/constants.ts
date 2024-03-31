export const MESSAGES = {
    INPUT_ERROR: {
        CANNOT_CALCULATE: '計算できません',
    },
    AUTH_ERROR: {
        NEED_LOGIN: 'ログインが必要です。',
    },
    AUTH_MODAL_KEYS: {
        DEFAULT: 'default',
        LOGIN_ERROR: 'loginError',
        SIGNUP: 'signup',
        SIGNUP_ERROR: 'signupError',
        VERIFICATION_SUCCESS: 'verificationSuccess',
        VERIFICATION_ERROR: 'verificationError',
    },
    AUTH_MODAL_TITLE: {
        DEFAULT: '※注意',
        LOGIN_ERROR: 'ログインエラー',
        SIGNUP: '認証コードを送信しました',
        SIGNUP_ERROR: 'サインアップ失敗',
        VERIFICATION_SUCCESS: '認証成功',
        VERIFICATION_ERROR: '認証失敗',
    },
    AUTH_MODAL_MESSAGE: {
        DEFAULT: '他サービスと同じパスワードを使用しないでください。',
        LOGIN_ERROR: 'メールアドレスとパスワードを確認してください。',
        SIGNUP: 'メールを確認してください。',
        SIGNUP_ERROR: 'パスワードは8文字以上で大文字、小文字、数字、記号を含む必要があります。',
        VERIFICATION_SUCCESS: 'サインアップが完了しました。ログインできます。',
        VERIFICATION_ERROR: '認証コードが正しくありません。',
    },
}

export const AUTH_MODAL_ACTIONS = {
    SET_EMAIL: 'SET_EMAIL',
    SET_PASSWORD: 'SET_PASSWORD',
    SET_VERIFICATION_CODE: 'SET_VERIFICATION_CODE',
    SET_AUTH_STATUS: 'SET_AUTH_STATUS',
}

export const FIELDS = {
    LEVEL: 'inputLevel',
    HP: 'inputHp',
    SP: 'inputSp',
    CHARA_POW: 'inputCharaPow',
    CHARA_INT: 'inputCharaInt',
    CHARA_VIT: 'inputCharaVit',
    CHARA_SPD: 'inputCharaSpd',
    CHARA_LUK: 'inputCharaLuk',
    CARD_POW: 'inputCardPow',
    CARD_INT: 'inputCardInt',
    CARD_VIT: 'inputCardVit',
    CARD_SPD: 'inputCardSpd',
    CARD_LUK: 'inputCardLuk',
    TOTAL_POW: 'inputTotalPow',
    TOTAL_INT: 'inputTotalInt',
    TOTAL_VIT: 'inputTotalVit',
    TOTAL_SPD: 'inputTotalSpd',
    TOTAL_LUK: 'inputTotalLuk',
    ATK: 'inputAtk',
    DEF: 'inputDef',
    MAT: 'inputMat',
    MDF: 'inputMdf',
}

export const MANNEQUIN_FIELDS = {
    MANNEQUIN_NAME: 'inputMannequinName',
}

export const STATUS = {
    LEVEL: 'level',
    HP: 'hp',
    SP: 'sp',
    POW: 'pow',
    INT: 'int',
    VIT: 'vit',
    SPD: 'spd',
    LUK: 'luk',
    ATK: 'atk',
    DEF: 'def',
    MAT: 'mat',
    MDF: 'mdf',
};

export const ITEMS = {
    VITA: {
        ALL: {
            key: 'allVita',
            label: 'ALLビタ',
        },
        POW: {
            key: 'powVita',
            label: 'POWビタ',
        },
        INT: {
            key: 'intVita',
            label: 'INTビタ',
        },
        SPD: {
            key: 'spdVita',
            label: 'SPDビタ',
        },
        VIT: {
            key: 'vitVita',
            label: 'VITビタ',
        },
        LUK: {
            key: 'lukVita',
            label: 'LUKビタ',
        },
    },
    CAN: {
        A: {
            key: 'canA',
            label: '魔獣覚醒缶A',
        },
        B: {
            key: 'canB',
            label: '魔獣覚醒缶B',
        },
    },
    SEAL: {
        POW: {
            key: 'powSeal',
            label: 'POWシール',
        },
        INT: {
            key: 'intSeal',
            label: 'INTシール',
        },
        SPD: {
            key: 'spdSeal',
            label: 'SPDシール',
        },
        VIT: {
            key: 'vitSeal',
            label: 'VITシール',
        },
        LUK: {
            key: 'lukSeal',
            label: 'LUKシール',
        },
    },
    LIQUID: {
        ATK: {
            key: 'atkLiquid',
            label: 'アタークリキッド',
        },
        DEF: {
            key: 'defLiquid',
            label: 'マモールリキッド',
        },
        MAT: {
            key: 'matLiquid',
            label: 'マホアタリキッド',
        },
        MDF: {
            key: 'mdfLiquid',
            label: 'マホマモリキッド',
        },
    },
}

export const SCROLL_RANK = {
    NONE: 'None',
    RANK1: '壱ノ巻',
    RANK2: '弍ノ巻',
    RANK3: '参ノ巻',
    RANK4: '肆ノ巻',
    RANK5: '伍ノ巻',
    RANK6: '陸ノ巻',
    RANK7: '漆ノ巻',
    RANK8: '捌ノ巻',
    RANK9: '玖ノ巻',
    RANK10: '拾ノ巻',
}
