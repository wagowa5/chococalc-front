import React, { useState } from 'react';

// AWS Cognito SDK とモーダル用のUIコンポーネントをインポート
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
// モーダル用のUIライブラリをインポート、Material-UIの例です
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField, Box, Grid } from '@mui/material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const userPool = new CognitoUserPool({
    UserPoolId: 'us-east-1_XXXXXXX', // ユーザープールID
    ClientId: 'XXXXXXXXXXXXXXXXXXXXXXXXXX' // アプリクライアントID
});

interface AuthModalProps {
    authModalOpen: boolean;
    setAuthModalOpen: (isOpen: boolean) => void;
}

const AuthModal = (
    { authModalOpen, setAuthModalOpen }: AuthModalProps
) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
                console.log('ログイン成功', session);
                setAuthModalOpen(false); // モーダルを閉じる
            },
            onFailure: (err) => {
                console.error('ログイン失敗', err);
            },
        });
    };

    const handleSignup = () => {
        userPool.signUp(email, password, [], [], (err, result) => {
            if (err) {
                console.error('サインアップ失敗', err);
                return;
            }
            console.log('サインアップ成功', result);
            // 必要に応じてユーザーに確認コードの入力を促す処理を追加
        });
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
                    <Grid container>
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
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                    </Grid>
                </Box>
                </div>
            </Modal>
        </>
    );
};

export default AuthModal;