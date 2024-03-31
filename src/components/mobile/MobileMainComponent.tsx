import React, { useState } from 'react';

import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';

// material-ui
import { Button, Grid, Divider } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';

import './MobileMainComponent.css';
import cognitoConfig from '../../config/awsConfig';
import AuthModal from '../auth/AuthModal';
import CharacterArea from './../characterArea/CharacterArea';
import { StatusInputFields, CharacterStatus } from './../../interface/Status';
import DisplayArea from './../displayArea/DisplayArea';
import SkillArea from './../skillArea/SkillArea';
import { FIELDS, STATUS } from './../../constants/constants';
import MobileItemArea from './MobileItemArea';

const initialStatusInputFields: StatusInputFields = Object.keys(FIELDS).reduce<StatusInputFields>((acc, key) => {
    const fieldKey = FIELDS[key as keyof typeof FIELDS]; // This ensures that fieldKey is typed correctly
    acc[fieldKey] = { value: '0', errorMessage: '' };
    return acc;
}, {});

const initialCharacterStatus: CharacterStatus = Object.keys(STATUS).reduce<CharacterStatus>((acc, key) => {
    const statusKey = STATUS[key as keyof typeof STATUS]; // This ensures that fieldKey is typed correctly
    acc[statusKey] = { 
        base: 0,
        card: 0,
        totalWithoutItem: 0,
        allVita: 0,
        vita: 0,
        scroll: 0,
        canSeal: 0,
        bradScraper: 0,
        specialSkill: 0,
        liquid: 0,
        displayStatus: 0
    };
    return acc;
}, {});

const userPool = new CognitoUserPool({
    UserPoolId: cognitoConfig.userPoolId,
    ClientId: cognitoConfig.clientId,
});
const initialCognitoUser = userPool.getCurrentUser();

function MobileMainComponent() {
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [cognitoUser, setCognitoUser] = useState<CognitoUser | null>(initialCognitoUser);

    const handleLogout = () => {
        setCognitoUser(userPool.getCurrentUser());

        if (cognitoUser) {
            cognitoUser.signOut();
        }
    };

    const handleLoginButton = () => {
        console.log('cognito', cognitoUser);
        console.log('cognito', initialCognitoUser);
        setAuthModalOpen(true);
    }

    // 数値格納用のステータス
    const [characterStatus, setCharacterStatus] = useState<CharacterStatus>(
        initialCharacterStatus
    );
    // CharacterAreaの入力フィールドを管理する
    const [inputStatus, setInputStatus] = useState<StatusInputFields>(initialStatusInputFields);
    
    // characterを更新する関数
    const updateCharacter = (newCharacterStatus: CharacterStatus) => {
        setCharacterStatus(newCharacterStatus);
    };
    // inputStatusを更新する関数
    const updateInputStatus = (newStatus: StatusInputFields) => {
        setInputStatus(newStatus);
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
            {/* ヘッダー */}
            <ElevationScroll>
                <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            チョコラン計算機(非公式)
                        </Typography>
                        {cognitoUser ? (
                            // ログイン時にログアウトボタンを表示
                            <Button
                                color="warning"
                                variant='contained'
                                onClick={handleLogout}>
                                ログアウト
                            </Button>
                        ) : (
                            // ログイン関連のコンポーネントまたはボタンを表示
                            <Button
                                color="inherit"
                                variant='outlined'
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
            <Grid container spacing={1} margin={1} justifyContent={'center'} alignItems={'start'}>
                {/* キャラクターの情報入力欄を配置しているエリア */}
                <Grid item xs={12}>
                <CharacterArea 
                    inputStatus={inputStatus}
                    updateInputStatus={updateInputStatus}
                />
                </Grid>
            </Grid>

            <Divider textAlign="left"></Divider>

            <Grid container spacing={1} margin={1} justifyContent={'center'} alignItems={'start'}>
                {/* アイテムボタンを配置しているエリア */}
                <Grid item xs={12}>
                <MobileItemArea
                    characterStatus={characterStatus}
                    updateCharacter={updateCharacter}
                    inputStatus={inputStatus}
                    updateInputStatus={updateInputStatus}
                />
                </Grid>
            </Grid>

            <Divider textAlign="left"></Divider>

            <Grid container spacing={0} margin={0}>
                {/* スキルボタンを配置しているエリア */}
                <Grid item xs={12}>
                    <SkillArea
                        characterStatus={characterStatus}
                        updateCharacter={updateCharacter}
                        inputStatus={inputStatus}
                        updateInputStatus={updateInputStatus}
                    />
                </Grid>
            </Grid>

            <Divider textAlign="left"></Divider>
            
            <Grid container spacing={0} margin={1}>
                {/* 計算結果を表示するエリア */}
                <Grid item xs={12}>
                <DisplayArea
                    characterStatus={characterStatus}
                    updateCharacter={updateCharacter}
                    inputStatus={inputStatus}
                    updateInputStatus={updateInputStatus}
                />
                </Grid>
            </Grid>
        </>
    );
}

export default MobileMainComponent;

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
