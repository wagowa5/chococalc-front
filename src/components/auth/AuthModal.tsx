import React, { useState, useReducer } from 'react';

// AWS Cognito SDK とモーダル用のUIコンポーネントをインポート
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField, Box, Grid, Divider } from '@mui/material';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { SxProps, Theme } from '@mui/system';

import { MESSAGES, AUTH_MODAL_ACTIONS } from '../../constants/constants';
import { getAutoGeneratePassword } from '../../util/generatePassword';

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    minwidth: 350,
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
    modalSx?: SxProps<Theme>;
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
        modalSx = modalStyle,
    }: AuthModalProps
) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { email, password, verificationCode, authStatus } = state;
    const [showPassword, setShowPassword] = React.useState(false);
    const [message, setMessage] = useState('');

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleGeneratePassword = () => {
        const generatedPassword = getAutoGeneratePassword();
        dispatch({ type: AUTH_MODAL_ACTIONS.SET_PASSWORD, payload: generatedPassword }); // 生成したパスワードをセット
        navigator.clipboard.writeText(generatedPassword) // クリップボードにコピー
            .then(() => setMessage('パスワードがクリップボードにコピーされました。'))
            .catch(err => console.error('クリップボードにコピーできませんでした。', err));
    };
    
    const handleLogin = () => {
        const authenticationDetails = new AuthenticationDetails({
            Username: email,
            Password: (password === '') ? process.env.REACT_APP_COGNITO_PASS : password,
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
        userPool.signUp(
            email,
            (password === '') ? process.env.REACT_APP_COGNITO_PASS : password,
            [],
            [],
            (err, result) => {
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
                <Box sx={modalSx}>
                    <Grid container spacing={1} margin={0}>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={6}>
                            <Button
                                variant='outlined'
                                fullWidth
                                onClick={() => setAuthModalOpen(false) }
                            >
                                閉じる
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                        <TextField label="メールアドレス" value={email} fullWidth onChange={(e) => dispatch({ type: AUTH_MODAL_ACTIONS.SET_EMAIL, payload: e.target.value})} />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" fullWidth >
                                <InputLabel htmlFor="outlined-adornment-password">パスワード</InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    label="パスワード"
                                    type={showPassword ? 'text' : 'password'}
                                    size='small'
                                    value={password}
                                    onChange={(e) => dispatch({ type: AUTH_MODAL_ACTIONS.SET_PASSWORD, payload: e.target.value })}
                                    endAdornment={
                                        <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            //onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant='outlined'
                                fullWidth
                                onClick={handleGeneratePassword}
                                startIcon={<ContentCopyIcon />}
                            >
                                パスワードを生成してコピー
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                        </Grid>
                        {message && (
                            <Grid item xs={12}>
                            <Typography marginBottom={1} textAlign="center">
                                {message}
                            </Typography>
                            <Divider />
                            </Grid>
                        )}

                        <Grid item xs={6} marginBottom={1}>
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
