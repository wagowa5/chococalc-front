import React, { useState } from 'react';
import './App.css';
import CharacterArea from './characterArea/CharacterArea';
import {  CharacterStatus,
          CardStatus,
          InputTotalStatus,
          VitaStatus,
          CanStatus,
          ScrollStatus,
          SpecialSkillStatus,
          DisplayStatus,
          InputStatus,
} from './interface/Status';
//import AppHeader from './util/AppHeader'
import { Tabs, Button, Grid } from "@mui/material";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';


function App() {

  // 数値格納用のステータス
  const [characterStatus, setCharacterStatus] = useState(new CharacterStatus({level: 0, hp: 0, sp: 0, pow: 0, int: 0, vit: 0, spd: 0, luk: 0, atk: 0, def: 0, mat: 0, mdf: 0}));
  const [cardStatus, setCardStatus] = useState(new CardStatus({level: 0, hp: 0, sp: 0, pow: 0, int: 0, vit: 0, spd: 0, luk: 0, atk: 0, def: 0, mat: 0, mdf: 0}));
  const [inputTotalStatus, setInputTotalStatus] = useState(new InputTotalStatus({level: 0, hp: 0, sp: 0, pow: 0, int: 0, vit: 0, spd: 0, luk: 0, atk: 0, def: 0, mat: 0, mdf: 0}));
  const [vitaStatus, setVitaStatus] = useState(new VitaStatus({level: 0, hp: 0, sp: 0, pow: 0, int: 0, vit: 0, spd: 0, luk: 0, atk: 0, def: 0, mat: 0, mdf: 0}));
  const [canStatus, setCanStatus] = useState(new CanStatus({level: 0, hp: 0, sp: 0, pow: 0, int: 0, vit: 0, spd: 0, luk: 0, atk: 0, def: 0, mat: 0, mdf: 0}));
  const [scrollStatus, setScrollStatus] = useState(new ScrollStatus({level: 0, hp: 0, sp: 0, pow: 0, int: 0, vit: 0, spd: 0, luk: 0, atk: 0, def: 0, mat: 0, mdf: 0}));
  const [specialSkillStatus, setSpecialSkillStatus] = useState(new SpecialSkillStatus({level: 0, hp: 0, sp: 0, pow: 0, int: 0, vit: 0, spd: 0, luk: 0, atk: 0, def: 0, mat: 0, mdf: 0}));
  const [displayStatus, setDisplayStatus] = useState(new DisplayStatus({level: 0, hp: 0, sp: 0, pow: 0, int: 0, vit: 0, spd: 0, luk: 0, atk: 0, def: 0, mat: 0, mdf: 0}));

  // 入力用ステータス
  const [inputStatus, setInputStatus] = useState(new InputStatus({
    inputLevel: '',
    inputHp: '',
    inputSp: '',
    inputCharaPow: '',
    inputCharaInt: '',
    inputCharaVit: '',
    inputCharaSpd: '',
    inputCharaLuk: '',
    inputCardPow: '',
    inputCardInt: '',
    inputCardVit: '',
    inputCardSpd: '',
    inputCardLuk: '',
    inputTotalPow: '',
    inputTotalInt: '',
    inputTotalVit: '',
    inputTotalSpd: '',
    inputTotalLuk: '',
    inputAtk: '',
    inputDef: '',
    inputMat: '',
    inputMdf: '',
}))


  // ステータス更新関数
  const updateCharacterStatus = (newStatus: CharacterStatus) => {
    setCharacterStatus(newStatus);
  };
  const updateCardStatus = (newStatus: CardStatus) => {
    setCardStatus(newStatus);
  }
  const updateInputTotalStatus = (newStatus: InputTotalStatus) => {
    setInputTotalStatus(newStatus);
  }
  const updateVitaStatus = (newStatus: VitaStatus) => {
    setVitaStatus(newStatus);
  }
  const updateCanStatus = (newStatus: CanStatus) => {
    setCanStatus(newStatus);
  }
  const updateScrollStatus = (newStatus: ScrollStatus) => {
    setScrollStatus(newStatus);
  }
  const updateSpecialSkillStatus = (newStatus: SpecialSkillStatus) => {
    setSpecialSkillStatus(newStatus);
  }
  const updateDisplayStatus = (newStatus: DisplayStatus) => {
    setDisplayStatus(newStatus);
  }
  const updateInputStatus = (newInputStatus: InputStatus) => {
    setInputStatus(newInputStatus);
  }

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
        <Grid item xs={7}></Grid>

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
