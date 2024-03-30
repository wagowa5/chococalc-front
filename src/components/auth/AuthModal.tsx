import React, { useState } from 'react';

// AWS Cognito SDK とモーダル用のUIコンポーネントをインポート
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
// モーダル用のUIライブラリをインポート、Material-UIの例です
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField, Box, Grid } from '@mui/material';

import { MESSAGES } from '../../constants/constants';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface AuthModalProps {
    authModalOpen: boolean;
    userPool: CognitoUserPool;
    setAuthModalOpen: (isOpen: boolean) => void;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

interface ModalMessage {
    title: string;
    message: string;
}
interface ModalMessages {
    [key: string]: ModalMessage;
}
interface AuthModalBase {
    [key: string]: string;
}

// MESSAGESオブジェクトから取得した実際のデータを使用
const authModalKeys: AuthModalBase = MESSAGES.AUTH_MODAL_KEYS;
const authModalTitles: AuthModalBase = MESSAGES.AUTH_MODAL_TITLE;
const authModalMessages: AuthModalBase = MESSAGES.AUTH_MODAL_MESSAGE;

const MODAL_MESSAGES: ModalMessages = {};

Object.keys(authModalKeys).forEach((key: string) => {
    const keyName = key as keyof AuthModalBase;
    const titleKey = key as keyof AuthModalBase;
    const messageKey = key as keyof AuthModalBase;

    MODAL_MESSAGES[authModalKeys[keyName]] = {
        title: authModalTitles[titleKey],
        message: authModalMessages[messageKey],
    };
});

const AuthModal = (
    {
        authModalOpen,
        userPool,
        setAuthModalOpen,
        setIsLoggedIn,
    }: AuthModalProps
) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [authStatus, setAuthStatus] = useState(MESSAGES.AUTH_MODAL_KEYS.DEFAULT);
    
    const handleLogin = () => {
        const authenticationDetails = new AuthenticationDetails({
            Username: email,
            Password: password,
        });
        
        const cognitoUser = new CognitoUser({
            Username: email,
            Pool: userPool,
        });

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (session) => {
                setEmail('');
                setPassword('');
                setVerificationCode('');
                setIsLoggedIn(true); // ログイン状態を更新
                setAuthModalOpen(false); // モーダルを閉じる
            },
            onFailure: (err) => {
                setPassword('');
                setVerificationCode('');
                setAuthStatus(MESSAGES.AUTH_MODAL_KEYS.LOGIN_ERROR);
            },
        });
    };

    const handleSignup = () => {
        userPool.signUp(email, password, [], [], (err, result) => {
            if (err) {
                setAuthStatus(MESSAGES.AUTH_MODAL_KEYS.SIGNUP_ERROR);
                return;
            }
            // サインアップ成功時の処理
            setAuthStatus(MESSAGES.AUTH_MODAL_KEYS.SIGNUP);
        });
    };

    const handleEmailConfirm = () => {
        const cognitoUser = new CognitoUser({
            Username: email,
            Pool: userPool,
        });
        // 認証コードを使ってユーザーのメールアドレスを検証します。
        cognitoUser.confirmRegistration(verificationCode, true, function(err, result) {
            if (err) {
                // エラーが発生した場合の処理をここに記述します。
                setAuthStatus(MESSAGES.AUTH_MODAL_KEYS.VERIFICATION_ERROR);
                return;
            }
            // 認証に成功した場合の処理をここに記述します。
            setVerificationCode('');
            setAuthStatus(MESSAGES.AUTH_MODAL_KEYS.VERIFICATION_SUCCESS);
        })
    };

    return (
        <>
            <Modal
                open={authModalOpen}
                onClose={() => setAuthModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div>
                <Box sx={style}>
                    <Grid container spacing={1} margin={2}>
                        <Grid item xs={12}>
                        <TextField label="メールアドレス" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField label="パスワード" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Grid>

                        <Grid item xs={6}>
                        <Button
                            onClick={handleLogin}
                            variant='contained'
                            color='primary'
                        >
                            ログイン
                        </Button>
                        </Grid>

                        <Grid item xs={6}>
                        <Button
                            onClick={handleSignup}
                            variant='contained'
                            color='success'
                        >
                            サインアップ
                        </Button>
                        </Grid>
                    </Grid>

                    <Grid container spacing={1} margin={2}>
                    <Grid item xs={12}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {MODAL_MESSAGES[authStatus]?.title}
                        </Typography>
                        </Grid>
                        <Grid item xs={12}>
                        <Typography id="modal-modal-description">
                            {MODAL_MESSAGES[authStatus]?.message}
                        </Typography>
                        </Grid>
                        
                        <Grid item xs={12}>
                        <TextField
                            label="認証コード"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <Button
                            onClick={handleEmailConfirm}
                            variant='contained'
                            color='success'
                        >
                            メール認証
                        </Button>
                        </Grid>
                    </Grid>
                </Box>
                </div>
            </Modal>
        </>
    );
};

export default AuthModal;