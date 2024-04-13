import React, { useContext } from 'react';
import axios from 'axios';

import {
  CognitoUserPool,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';

import { TextField, Grid, Button } from '@mui/material';

import { MESSAGES, MANNEQUIN_FIELDS } from 'constants/constants';
import { StatusInputFields } from 'interface/Status';
import { InputStatusContext } from 'contexts/StatusContext';

// propsの型定義を追加
interface MannequinAreaProps {
  userPool: CognitoUserPool;
}

interface Mannequin {
  mannequinName: string;
  statusFields: StatusInputFields;
}

const MannequinArea = ({ userPool }: MannequinAreaProps) => {
  const inputContext = useContext(InputStatusContext);
  // コンテキストが undefined でないことを確認
  if (!inputContext) {
    console.error(
      'CharacterStatusContext or InputStatusContext is not provided',
    );
    return <div>エラー：適切なプロバイダが設定されていません。</div>;
  }
  // 必要な関数や状態を抽出するための分割代入
  const { inputStatus, updateInputStatus } = inputContext;

  const [mannequinName, setMannequinName] = React.useState<string>('');
  const [mannequinList, setMannequinList] = React.useState<Mannequin[]>([]);

  const handleInputMannequinNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setMannequinName(e.target.value);
  };

  const handleStoreMannequin = () => {
    const cognitoUser = userPool.getCurrentUser();

    if (!cognitoUser) {
      alert(MESSAGES.AUTH_ERROR.NEED_LOGIN);
      return;
    }

    cognitoUser.getSession(async function (
      err: null,
      session: CognitoUserSession,
    ) {
      // セッションが無効ならトークンをリフレッシュ
      if (!session.isValid()) {
        cognitoUser.refreshSession(
          session.getRefreshToken(),
          async (refreshErr, newSession) => {
            if (refreshErr) {
              console.error(refreshErr);
            } else {
              const idToken = newSession.getIdToken().getJwtToken();
              // 新しいトークンを使用してAPIリクエストを再実行など
              await storeMannquin(idToken, { mannequinName, inputStatus });
              const mannequins = await getMannequins(idToken);
              await setMannequinList(mannequins);
            }
          },
        );
      } else {
        // セッションが有効なら、既存のトークンを使用してAPIリクエストを行う
        const idToken = session.getIdToken().getJwtToken();
        // APIリクエストなど
        await storeMannquin(idToken, { mannequinName, inputStatus });
        const mannequins = await getMannequins(idToken);
        setMannequinList(mannequins);
      }
    });
  };

  const handleDeleteMannequin = () => {
    const cognitoUser = userPool.getCurrentUser();

    if (!cognitoUser) {
      alert(MESSAGES.AUTH_ERROR.NEED_LOGIN);
      return;
    }

    cognitoUser.getSession(async function (
      err: null,
      session: CognitoUserSession,
    ) {
      // セッションが無効ならトークンをリフレッシュ
      if (!session.isValid()) {
        cognitoUser.refreshSession(
          session.getRefreshToken(),
          async (refreshErr, newSession) => {
            if (refreshErr) {
              console.error(refreshErr);
            } else {
              const idToken = newSession.getIdToken().getJwtToken();
              // 新しいトークンを使用してAPIリクエストを再実行など
              await deleteMannequin(idToken, mannequinName);
              const mannequins = await getMannequins(idToken);
              setMannequinList(mannequins);
            }
          },
        );
      } else {
        // セッションが有効なら、既存のトークンを使用してAPIリクエストを行う
        const idToken = session.getIdToken().getJwtToken();
        // APIリクエストなど
        await deleteMannequin(idToken, mannequinName);
        const mannequins = await getMannequins(idToken);
        setMannequinList(mannequins);
      }
    });
  };

  const handleGetMannequins = () => {
    const cognitoUser = userPool.getCurrentUser();

    if (!cognitoUser) {
      alert(MESSAGES.AUTH_ERROR.NEED_LOGIN);
      return;
    }

    cognitoUser.getSession(async function (
      err: null,
      session: CognitoUserSession,
    ) {
      // セッションが無効ならトークンをリフレッシュ
      if (!session.isValid()) {
        cognitoUser.refreshSession(
          session.getRefreshToken(),
          async (refreshErr, newSession) => {
            if (refreshErr) {
              console.error(refreshErr);
            } else {
              const idToken = newSession.getIdToken().getJwtToken();
              // 新しいトークンを使用してAPIリクエストを再実行など
              const mannequins = await getMannequins(idToken);
              setMannequinList(mannequins);
            }
          },
        );
      } else {
        // セッションが有効なら、既存のトークンを使用してAPIリクエストを行う
        const idToken = session.getIdToken().getJwtToken();
        // APIリクエストなど
        const mannequins = await getMannequins(idToken);
        setMannequinList(mannequins);
      }
    });
  };

  return (
    <>
      <Grid container spacing={1}>
        {/* マネキン名入力、登録ボタン、削除ボタン */}
        <Grid item xs={3}>
          <TextField
            name={MANNEQUIN_FIELDS.MANNEQUIN_NAME}
            label="マネキン名:"
            margin="none"
            // error={!!inputStatus[FIELDS.LEVEL].errorMessage} // エラーがある場合はTextFieldをエラー状態にする
            // helperText={inputStatus[FIELDS.LEVEL].errorMessage || ''} // エラーメッセージを表示
            onChange={handleInputMannequinNameChange}
          />
        </Grid>
        <Grid item xs={5}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleStoreMannequin}
          >
            マネキン登録・更新
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={handleDeleteMannequin}
          >
            マネキン削除
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
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

async function getMannequins(token: string): Promise<Mannequin[]> {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_CHOCOCALC_API_ENDPOINT}/mannequins`,
      config,
    );
    return response.data as Mannequin[];
  } catch (error) {
    console.error('API call failed:', error);
    return [];
  }
}

async function storeMannquin(
  token: string,
  data: { mannequinName: string; inputStatus: StatusInputFields },
) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // すべて大文字にする
  const requestBody = {
    mannequinName: data.mannequinName.toUpperCase(),
    statusFields: data.inputStatus,
  };

  await axios
    .post(
      import.meta.env.VITE_APP_CHOCOCALC_API_ENDPOINT + '/mannequin',
      requestBody,
      config,
    )
    // .then(response => console.log(response.data))
    .catch((error) => console.error('API call failed:', error));
}

async function deleteMannequin(token: string, mannequinName: string) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // すべて大文字にする
    params: {
      mannequinName: mannequinName.toUpperCase(),
    },
  };

  await axios
    .delete(
      import.meta.env.VITE_APP_CHOCOCALC_API_ENDPOINT + '/mannequin',
      config,
    )
    // .then(response => console.log(response.data))
    .catch((error) => console.error('API call failed:', error));
}
