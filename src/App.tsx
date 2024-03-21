import React, { useState } from 'react';
import './App.css';
import CharacterArea from './characterArea/CharacterArea';
import {  Character } from './interface/Status';
import { MESSAGES, FIELDS } from './constants/constants';
//import AppHeader from './util/AppHeader'
import { Tabs, Button, Grid } from "@mui/material";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import ItemArea from './itemArea/ItemArea';

/**
 * ステータス入力管理
 * @param フィールドごとの入力値
 * @param フィールドごとのエラーメッセージ
 */
interface StatusInputFields {
  [key: string]: {
      value: string;
      errorMessage: string;
  }
}

const initialStatusInputFields: StatusInputFields = Object.keys(FIELDS).reduce<StatusInputFields>((acc, key) => {
  const fieldKey = FIELDS[key as keyof typeof FIELDS]; // This ensures that fieldKey is typed correctly
  acc[fieldKey] = { value: '', errorMessage: '' };
  return acc;
}, {});

function App() {
  // デフォルトステータスオブジェクト
  const defaultStatus = {
    level: 0, hp: 0, sp: 0, pow: 0, int: 0, vit: 0, spd: 0, luk: 0, atk: 0, def: 0, mat: 0, mdf: 0
  };

  // 数値格納用のステータス
  const [character, setCharacter] = useState(new Character(
    defaultStatus, // characterStatus
    defaultStatus, // cardStatus
    defaultStatus, // vitaStatus
    defaultStatus, // inputedTotalStatus
    defaultStatus, // scrollStatus
    defaultStatus, // canStatus
    defaultStatus, // specialSkillStatus
    defaultStatus  // displayStatus
  ));

  // CharacterAreaの入力フィールドを管理する
  const [inputStatus, setInputStatus] = useState<StatusInputFields>(initialStatusInputFields);
  // inputStatusを更新する関数
  const updateInputStatus = (newStatus: StatusInputFields) => {
    setInputStatus(newStatus);
  };

  return (
    <>
      <CssBaseline />
      {/* ヘッダー */}
      <ElevationScroll>
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              チョコラン計算機(非公式)
            </Typography>
            <Button color="inherit" variant='outlined'>ログイン</Button>     
          </Toolbar>
        </AppBar>
        </Box>
      </ElevationScroll>
      <Toolbar /> {/* AppBarによって占められる領域分の余白を確保 */}
      
      {/* コンテンツ */}
      <Grid container spacing={2} margin={1}>
        {/* キャラクターの情報入力欄を配置しているエリア */}
        <Grid item xs={5}>
        <CharacterArea 
          inputStatus={inputStatus}
          updateInputStatus={updateInputStatus}
        />
        </Grid>

        {/* アイテムボタンを配置しているエリア */}
        <Grid item xs={7}>
        <ItemArea/>
        </Grid>

        {/* スキルボタンを配置しているエリア */}

        {/* 計算結果を表示するエリア */}
      </Grid>
    </>
  );
}

export default App;

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
