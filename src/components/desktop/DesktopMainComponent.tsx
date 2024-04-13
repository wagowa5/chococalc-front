import React, { useState } from 'react';

// material-ui
import { Button, Grid, Divider } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';

import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';

import cognitoConfig from '../../config/awsConfig';
import './DesktopMainComponent.css';
import AuthModal from '../auth/AuthModal';
import ChangePasswordModal from '../auth/ChangePasswordModal';
import CharacterArea from './../characterArea/CharacterArea';
import DesktopItemArea from './DesktopItemArea';
import DisplayArea from './../displayArea/DisplayArea';
import SkillArea from './../skillArea/SkillArea';
import MannequinArea from '../mannequinArea/MannequinArea';

const userPool = new CognitoUserPool({
  UserPoolId: cognitoConfig.userPoolId,
  ClientId: cognitoConfig.clientId,
});
const initialCognitoUser = userPool.getCurrentUser();

function DesktopMainComponent() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
  const [cognitoUser, setCognitoUser] = useState<CognitoUser | null>(
    initialCognitoUser,
  );

  const handleLogout = () => {
    if (cognitoUser) {
      cognitoUser.signOut();
      setCognitoUser(null);
    }
  };

  const handleChangePassword = () => {
    setChangePasswordModalOpen(true);
  };

  const handleLoginButton = () => {
    setAuthModalOpen(true);
  };

  return (
    <>
      <CssBaseline />
      <AuthModal
        authModalOpen={authModalOpen}
        userPool={userPool}
        setAuthModalOpen={setAuthModalOpen}
        setCognitoUser={setCognitoUser}
      />
      <ChangePasswordModal
        changePasswordModalOpen={changePasswordModalOpen}
        userPool={userPool}
        setChangePasswordModalOpen={setChangePasswordModalOpen}
        setCognitoUser={setCognitoUser}
      />
      {/* ヘッダー */}
      <ElevationScroll>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                チョコラン計算機(非公式)
              </Typography>
              {cognitoUser ? (
                <>
                  {/* ログイン時にログアウトボタンとパスワード変更ボタンを表示 */}
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={handleLogout}
                    sx={{ mx: 1 }}
                  >
                    ログアウト
                  </Button>
                  <Button
                    color="warning"
                    variant="contained"
                    onClick={handleChangePassword}
                  >
                    パスワード変更
                  </Button>
                </>
              ) : (
                // ログイン関連のコンポーネントまたはボタンを表示
                <Button
                  color="inherit"
                  variant="outlined"
                  onClick={handleLoginButton}
                >
                  ログイン
                </Button>
              )}
            </Toolbar>
          </AppBar>
        </Box>
      </ElevationScroll>
      <Toolbar /> {/* AppBarによって占められる領域分の余白を確保 */}
      {/* コンテンツ */}
      <Grid
        container
        spacing={1}
        margin={0}
        justifyContent={'center'}
        alignItems={'start'}
      >
        {/* キャラクターの情報入力欄を配置しているエリア */}
        <Grid item xs={6}>
          <Box
            sx={{
              bgcolor: 'background.paper',
              boxShadow: 1,
              borderRadius: 2,
              p: 2,
            }}
          >
            <CharacterArea />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              bgcolor: 'background.paper',
              boxShadow: 1,
              borderRadius: 2,
              p: 2,
            }}
          >
            <MannequinArea userPool={userPool} />
          </Box>
        </Grid>
      </Grid>
      <Divider textAlign="left"></Divider>
      <Grid
        container
        spacing={1}
        margin={0}
        justifyContent={'center'}
        alignItems={'start'}
      >
        {/* アイテムボタンを配置しているエリア */}
        <Grid item xs={12}>
          <Box
            sx={{
              bgcolor: 'background.paper',
              boxShadow: 1,
              borderRadius: 2,
              p: 2,
            }}
          >
            <DesktopItemArea />
          </Box>
        </Grid>
      </Grid>
      <Divider textAlign="left"></Divider>
      <Grid container spacing={1} margin={0}>
        {/* 計算結果を表示するエリア */}
        <Grid item xs={7}>
          <DisplayArea />
        </Grid>

        {/* スキルボタンを配置しているエリア */}
        <Grid item xs={5}>
          <Box
            sx={{
              bgcolor: 'background.paper',
              boxShadow: 1,
              borderRadius: 2,
              p: 2,
            }}
          >
            <SkillArea />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default DesktopMainComponent;

/**
 * AppBarのスクロール設定
 * 公式コピペ: https://mui.com/material-ui/react-app-bar/#elevate-app-bar
 */
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

function ElevationScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}
