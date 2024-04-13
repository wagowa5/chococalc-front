import React, { useState } from 'react';
import {
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import { InputLabel } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { SxProps, Theme } from '@mui/system';

import { getAutoGeneratePassword } from '../../util/generatePassword';

const modalStyle = {
  position: 'absolute',
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

interface ChangePasswordModalProps {
  changePasswordModalOpen: boolean;
  userPool: CognitoUserPool;
  setChangePasswordModalOpen: (isOpen: boolean) => void;
  setCognitoUser: (cognitoUser: CognitoUser | null) => void;
  modalSx?: SxProps<Theme>;
}

const ChangePasswordModal = ({
  changePasswordModalOpen,
  userPool,
  setChangePasswordModalOpen,
  modalSx = modalStyle,
}: ChangePasswordModalProps) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);

  const handleClickShowCurrentPassword = () =>
    setShowCurrentPassword((show) => !show);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);

  const handleGeneratePassword = () => {
    const generatedPassword = getAutoGeneratePassword();
    setNewPassword(generatedPassword); // 新しいパスワードをセット
    navigator.clipboard
      .writeText(generatedPassword) // クリップボードにコピー
      .then(() =>
        setMessage('新しいパスワードがクリップボードにコピーされました。'),
      )
      .catch((err) =>
        console.error('クリップボードにコピーできませんでした。', err),
      );
  };

  const handleChangePassword = () => {
    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null) {
      cognitoUser.getSession((err: null, session: CognitoUserSession) => {
        cognitoUser.changePassword(
          currentPassword === ''
            ? import.meta.env.VITE_APP_COGNITO_PASS
            : currentPassword,
          newPassword,
          (err, result) => {
            if (err) {
              console.error(err);
              setMessage(
                'パスワードの変更に失敗しました。エラー: ' + err.message,
              );
              return;
            }
            // console.log('Password change result:', result);
            setMessage('パスワードが正常に変更されました。');
            // 成功後、フィールドをクリア
            setCurrentPassword('');
            setNewPassword('');
          },
        );
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
      <Box sx={modalSx}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography
              id="change-password-modal-title"
              variant="h6"
              component="h2"
              marginBottom={2}
            >
              パスワード変更
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => setChangePasswordModalOpen(false)}
            >
              閉じる
            </Button>
          </Grid>

          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                現在のパスワード
              </InputLabel>
              <OutlinedInput
                fullWidth
                label="現在のパスワード"
                type={showCurrentPassword ? 'text' : 'password'}
                size="small"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowCurrentPassword}
                      //onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                新しいパスワード
              </InputLabel>
              <OutlinedInput
                fullWidth
                label="新しいパスワード"
                type={showNewPassword ? 'text' : 'password'}
                size="small"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowNewPassword}
                      //onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleGeneratePassword}
              startIcon={<ContentCopyIcon />}
            >
              新しいパスワードを生成してコピー
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Divider />
            <Typography marginTop={2} textAlign="center">
              デフォルトパスワードから変更する場合は、現在のパスワードは空欄にしてください。
            </Typography>
          </Grid>
          {message && (
            <Grid item xs={12}>
              <Divider />
              <Typography marginTop={2} textAlign="center">
                {message}
              </Typography>
            </Grid>
          )}

          <Grid item xs={12}>
            <Divider />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleChangePassword}
            >
              パスワードを変更する
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ChangePasswordModal;
