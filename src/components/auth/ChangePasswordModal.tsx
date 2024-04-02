import React, { useState } from 'react';
import { CognitoUser } from 'amazon-cognito-identity-js';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ChangePasswordModal = ({ changePasswordModalOpen, userPool, setChangePasswordModalOpen }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = () => {
    const cognitoUser = userPool.getCurrentUser();
    
    if (cognitoUser != null) {
      cognitoUser.getSession((err, session) => {
        if (err) {
          console.error(err);
          setMessage('セッションの取得に失敗しました。もう一度ログインしてください。');
          return;
        }

        cognitoUser.changePassword(currentPassword, newPassword, (err, result) => {
          if (err) {
            console.error(err);
            setMessage('パスワードの変更に失敗しました。エラー: ' + err.message);
            return;
          }
          console.log('Password change result:', result);
          setMessage('パスワードが正常に変更されました。');
          // 成功後、フィールドをクリア
          setCurrentPassword('');
          setNewPassword('');
        });
      });
    }
  };

  return (
    <Modal
      open={changePasswordModalOpen}
      onClose={() => setChangePasswordModalOpen(false)}
      aria-labelledby="change-password-modal-title"
      aria-describedby="change-password-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="change-password-modal-title" variant="h6" component="h2" marginBottom={2}>
          パスワード変更
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="現在のパスワード"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="新しいパスワード"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleChangePassword}
            >
              パスワードを変更する
            </Button>
          </Grid>
          {message && (
            <Grid item xs={12}>
              <Divider />
              <Typography marginTop={2} textAlign="center">
                {message}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Modal>
  );
};

export default ChangePasswordModal;
