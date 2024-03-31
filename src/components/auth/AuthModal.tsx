import React, { useReducer } from 'react';

// AWS Cognito SDK とモーダル用のUIコンポーネントをインポート
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField, Box, Grid, Divider } from '@mui/material';

import { MESSAGES, AUTH_MODAL_ACTIONS } from '../../constants/constants';

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
    setCognitoUser: (cognitoUser: CognitoUser | null) => void;
}

interface AuthModalReducerState {
    email: string;
    password: string;
    verificationCode: string;
    authStatus: string;
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

const initialState = {
    email: '',
    password: '',
    verificationCode: '',
    authStatus: MESSAGES.AUTH_MODAL_KEYS.DEFAULT,
};

function reducer(
    state: AuthModalReducerState,
    action: { type: string, payload: string }
) {
    switch (action.type) {
        case AUTH_MODAL_ACTIONS.SET_EMAIL:
            return { ...state, email: action.payload };
        case AUTH_MODAL_ACTIONS.SET_PASSWORD:
            return { ...state, password: action.payload };
        case AUTH_MODAL_ACTIONS.SET_VERIFICATION_CODE:
            return { ...state, verificationCode: action.payload };
        case AUTH_MODAL_ACTIONS.SET_AUTH_STATUS:
            return { ...state, authStatus: action.payload };
        default:
            return state;
    }
}

const AuthModal = (
    {
        authModalOpen,
        userPool,
        setAuthModalOpen,
        setCognitoUser,
    }: AuthModalProps
) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { email, password, verificationCode, authStatus } = state;
    
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
                dispatch({ type: AUTH_MODAL_ACTIONS.SET_EMAIL, payload: '' });
                dispatch({ type: AUTH_MODAL_ACTIONS.SET_PASSWORD, payload: '' });
                dispatch({ type: AUTH_MODAL_ACTIONS.SET_VERIFICATION_CODE, payload: '' });
                setCognitoUser(cognitoUser);
                setAuthModalOpen(false); // モーダルを閉じる
            },
            onFailure: (err) => {
                dispatch({ type: AUTH_MODAL_ACTIONS.SET_PASSWORD, payload: '' });
                dispatch({ type: AUTH_MODAL_ACTIONS.SET_VERIFICATION_CODE, payload: '' });
                dispatch({ type: AUTH_MODAL_ACTIONS.SET_AUTH_STATUS, payload: MESSAGES.AUTH_MODAL_KEYS.LOGIN_ERROR });
                setCognitoUser(null);
            },
        });
    };

    const handleSignup = () => {
        userPool.signUp(email, password, [], [], (err, result) => {
            if (err) {
                dispatch({ type: AUTH_MODAL_ACTIONS.SET_AUTH_STATUS, payload: MESSAGES.AUTH_MODAL_KEYS.SIGNUP_ERROR });
                return;
            }
            // サインアップ成功時の処理
            dispatch({ type: AUTH_MODAL_ACTIONS.SET_AUTH_STATUS, payload: MESSAGES.AUTH_MODAL_KEYS.SIGNUP });
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
                dispatch({ type: AUTH_MODAL_ACTIONS.SET_AUTH_STATUS, payload: MESSAGES.AUTH_MODAL_KEYS.VERIFICATION_ERROR });
                return;
            }
            // 認証に成功した場合の処理をここに記述します。
            dispatch({ type: AUTH_MODAL_ACTIONS.SET_VERIFICATION_CODE, payload: '' });
            dispatch({ type: AUTH_MODAL_ACTIONS.SET_AUTH_STATUS, payload: MESSAGES.AUTH_MODAL_KEYS.VERIFICATION_SUCCESS });
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
                    <Grid container spacing={1} margin={1}>
                        <Grid item xs={12}>
                        <TextField label="メールアドレス" value={email} onChange={(e) => dispatch({ type: AUTH_MODAL_ACTIONS.SET_EMAIL, payload: e.target.value})} />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField label="パスワード" type="password" value={password} onChange={(e) => dispatch({ type: AUTH_MODAL_ACTIONS.SET_PASSWORD, payload: e.target.value })} />
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

                    <Divider textAlign="left"></Divider>

                    <Grid container spacing={1} margin={0}>
                    <Grid item xs={12}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {MODAL_MESSAGES[authStatus]?.title}
                        </Typography>
                        </Grid>
                        <Grid item xs={12}>
                        <Typography id="modal-modal-description" whiteSpace={'pre-wrap'}>
                            {MODAL_MESSAGES[authStatus]?.message}
                        </Typography>
                        </Grid>
                        
                        <Grid item xs={6}>
                        <TextField
                            label="認証コード"
                            margin='none'
                            value={verificationCode}
                            onChange={(e) => dispatch({ type: AUTH_MODAL_ACTIONS.SET_VERIFICATION_CODE, payload: e.target.value})}
                        />
                        </Grid>
                        <Grid item xs={6}>
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
