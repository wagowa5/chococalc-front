import React from 'react';
import { getMannequins, storeMannequin, deleteMannequin, Mannequin } from '../../api/mannequins';
import { getSession } from '../../util/cognitoSession';

import { CognitoUserPool } from 'amazon-cognito-identity-js';

import { TextField, Grid, Button } from '@mui/material';

import { MESSAGES, MANNEQUIN_FIELDS } from '../../constants/constants';
import { StatusInputFields } from '../../interface/Status';

// propsの型定義を追加
interface MannequinAreaProps {
    inputStatus: StatusInputFields;
    updateInputStatus: (newInputStatus: StatusInputFields) => void;
    userPool: CognitoUserPool;
}

const MannequinArea = (
    {
        inputStatus,
        updateInputStatus,
        userPool,
    }: MannequinAreaProps
) => {
    const [mannequinName, setMannequinName] = React.useState<string>('');
    const [mannequinList, setMannequinList] = React.useState<Mannequin[]>([]);
    
    const handleInputMannequinNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMannequinName(e.target.value);
    }

    const [busy, setBusy] = React.useState(false);
    const [error, setError] = React.useState('');

    const runRequest = async (operation?: (token: string) => Promise<void>) => {
        const cognitoUser = userPool.getCurrentUser();
        if (!cognitoUser) {
            alert(MESSAGES.AUTH_ERROR.NEED_LOGIN);
            return;
        }
        setBusy(true);
        setError('');
        try {
            const session = await getSession(cognitoUser);
            const token = session.getIdToken().getJwtToken();
            if (operation) await operation(token);
            setMannequinList(await getMannequins(token));
        } catch (error) {
            setError(error instanceof Error ? error.message : '通信に失敗しました。');
        } finally {
            setBusy(false);
        }
    };

    const handleStoreMannequin = () => runRequest(token =>
        storeMannequin(token, { mannequinName, inputStatus }));
    const handleDeleteMannequin = () => runRequest(token =>
        deleteMannequin(token, mannequinName));
    const handleGetMannequins = () => runRequest();

    return (
        <>
        {error && <p role="alert">{error}</p>}
        <Grid container spacing={1}>
            {/* マネキン名入力、登録ボタン、削除ボタン */}
            <Grid item xs={3}>
                <TextField 
                    name={MANNEQUIN_FIELDS.MANNEQUIN_NAME}
                    label='マネキン名:'
                    margin='none'
                    // error={!!inputStatus[FIELDS.LEVEL].errorMessage} // エラーがある場合はTextFieldをエラー状態にする
                    // helperText={inputStatus[FIELDS.LEVEL].errorMessage || ''} // エラーメッセージを表示
                    onChange={handleInputMannequinNameChange}
                />
            </Grid>
            <Grid item xs={5}>
                <Button
                    variant='outlined'
                    color='primary'
                    fullWidth
                    disabled={busy}
                    onClick={handleStoreMannequin}
                >
                    マネキン登録・更新
                </Button>
            </Grid>
            <Grid item xs={4}>
                <Button
                    variant='contained'
                    color='error'
                    fullWidth
                    disabled={busy}
                    onClick={handleDeleteMannequin}
                >
                    マネキン削除
                </Button>
            </Grid>

            <Grid item xs={12}>
                <Button
                    variant='contained'
                    color='primary'
                    disabled={busy}
                    onClick={handleGetMannequins}
                >
                    マネキン一覧取得
                </Button>
            </Grid>
        </Grid>
        <Grid container spacing={1} margin={0}>
            {/* マネキン一覧で取得したマネキン名でボタンを表示していく */}
            {mannequinList.map((mannequin, index) => (
                <Grid item xs={3} key={index}>
                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => {
                            /* mannequinに関連する処理 */
                            updateInputStatus(mannequin.statusFields);
                        }}
                    >
                        {mannequin.mannequinName}
                    </Button>
                </Grid>
            ))}
        </Grid>
        </>
    );
};

export default MannequinArea;
