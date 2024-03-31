import React from 'react';
import axios from 'axios';

import { CognitoUserPool, CognitoUserSession } from 'amazon-cognito-identity-js';

import { TextField, Grid, Button } from '@mui/material';

import { MESSAGES, MANNEQUIN_FIELDS } from '../../constants/constants';
import { CharacterStatus, StatusInputFields } from '../../interface/Status';

// propsの型定義を追加
interface MannequinAreaProps {
    characterStatus: CharacterStatus;
    updateCharacter: (newCharacterStatus: CharacterStatus) => void;
    inputStatus: StatusInputFields;
    updateInputStatus: (newInputStatus: StatusInputFields) => void;
    userPool: CognitoUserPool;
}

const MannequinArea = (
    {
        characterStatus,
        updateCharacter,
        inputStatus,
        updateInputStatus,
        userPool,
    }: MannequinAreaProps
) => {
    const [mannequinName, setMannequinName] = React.useState<string>('');
    
    const handleInputMannequinNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMannequinName(e.target.value);
    }

    const handleStoreMannequin = () => {
        const cognitoUser = userPool.getCurrentUser();

        if (!cognitoUser) {
            alert(MESSAGES.AUTH_ERROR.NEED_LOGIN);
            return;
        }

        cognitoUser.getSession(function(err: null, session: CognitoUserSession) {
            // セッションが無効ならトークンをリフレッシュ
            if (!session.isValid()) {
                cognitoUser.refreshSession(session.getRefreshToken(), (refreshErr, newSession) => {
                    if (refreshErr) {
                        console.error(refreshErr);
                    } else {
                        const idToken = newSession.getIdToken().getJwtToken();
                        // 新しいトークンを使用してAPIリクエストを再実行など
                        storeMannquin(idToken, { mannequinName, inputStatus });
                    }
                });
            } else {
                // セッションが有効なら、既存のトークンを使用してAPIリクエストを行う
                const idToken = session.getIdToken().getJwtToken();
                // APIリクエストなど
                storeMannquin(idToken, { mannequinName, inputStatus });
            }
        });
    }

    const handleDeleteMannequin = () => {
        const cognitoUser = userPool.getCurrentUser();

        if (!cognitoUser) {
            alert(MESSAGES.AUTH_ERROR.NEED_LOGIN);
            return;
        }

        cognitoUser.getSession(function(err: null, session: CognitoUserSession) {
            // セッションが無効ならトークンをリフレッシュ
            if (!session.isValid()) {
                cognitoUser.refreshSession(session.getRefreshToken(), (refreshErr, newSession) => {
                    if (refreshErr) {
                        console.error(refreshErr);
                    } else {
                        const idToken = newSession.getIdToken().getJwtToken();
                        // 新しいトークンを使用してAPIリクエストを再実行など
                        deleteMannequin(idToken, mannequinName);
                    }
                });
            } else {
                // セッションが有効なら、既存のトークンを使用してAPIリクエストを行う
                const idToken = session.getIdToken().getJwtToken();
                // APIリクエストなど
                deleteMannequin(idToken, mannequinName);
            }
        });
    }

    const handleGetMannequins = () => {
        const cognitoUser = userPool.getCurrentUser();

        if (!cognitoUser) {
            alert(MESSAGES.AUTH_ERROR.NEED_LOGIN);
            return;
        }

        cognitoUser.getSession(function(err: null, session: CognitoUserSession) {
            // セッションが無効ならトークンをリフレッシュ
            if (!session.isValid()) {
                cognitoUser.refreshSession(session.getRefreshToken(), (refreshErr, newSession) => {
                    if (refreshErr) {
                        console.error(refreshErr);
                    } else {
                        const idToken = newSession.getIdToken().getJwtToken();
                        // 新しいトークンを使用してAPIリクエストを再実行など
                        getMannequins(idToken);
                    }
                });
            } else {
                // セッションが有効なら、既存のトークンを使用してAPIリクエストを行う
                const idToken = session.getIdToken().getJwtToken();
                // APIリクエストなど
                getMannequins(idToken);
            }
        });
    }

    return (
        <>
        <Grid container spacing={1}>
            {/* マネキン名入力、登録ボタン、削除ボタン */}
            <Grid item xs={4}>
                <TextField 
                    name={MANNEQUIN_FIELDS.MANNEQUIN_NAME}
                    label='マネキン名:'
                    margin='none'
                    // error={!!inputStatus[FIELDS.LEVEL].errorMessage} // エラーがある場合はTextFieldをエラー状態にする
                    // helperText={inputStatus[FIELDS.LEVEL].errorMessage || ''} // エラーメッセージを表示
                    onChange={handleInputMannequinNameChange}
                />
            </Grid>
            <Grid item xs={4}>
                <Button
                    variant='outlined'
                    color='primary'
                    onClick={handleStoreMannequin}
                >
                    マネキン登録
                </Button>
            </Grid>
            <Grid item xs={4}>
                <Button
                    variant='contained'
                    color='error'
                    onClick={handleDeleteMannequin}
                >
                    マネキン削除
                </Button>
            </Grid>

            <Grid item xs={12}>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={handleGetMannequins}
                >
                    マネキン一覧取得
                </Button>
            </Grid>
        </Grid>
        <Grid container spacing={1}>
            {/* マネキン一覧で取得したマネキン名でボタンを表示していく */}
        </Grid>
        </>
    );
};

export default MannequinArea;

function getMannequins(token: string) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
    };
    
    axios.get(
        process.env.REACT_APP_CHOCOCALC_API_ENDPOINT + '/mannequins',
        config
    )
        .then(response => console.log(response.data))
        .catch(error => console.error('API call failed:', error));
}

function storeMannquin(
    token: string,
    data: { mannequinName: string, inputStatus: StatusInputFields }
) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const requestBody = {
        "mannequinName": data.mannequinName,
        "statusFields": data.inputStatus
    }
    
    axios.post(
        process.env.REACT_APP_CHOCOCALC_API_ENDPOINT + '/mannequin',
        requestBody,
        config
    )
        // .then(response => console.log(response.data))
        .catch(error => console.error('API call failed:', error));
}

function deleteMannequin(token: string, mannequinName: string) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            mannequinName: mannequinName
        }
    };

    axios.delete(
        process.env.REACT_APP_CHOCOCALC_API_ENDPOINT + '/mannequin',
        config
    )
        // .then(response => console.log(response.data))
        .catch(error => console.error('API call failed:', error));
}

