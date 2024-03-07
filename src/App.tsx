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
          DisplayStatus 
} from './interface/Status';

import { Button } from "@mui/material";

function App() {

  const [characterStatus, setCharacterStatus] = useState(new CharacterStatus({level: 0, hp: 0, sp: 0, pow: 0, int: 0, vit: 0, spd: 0, luk: 0, atk: 0, def: 0, mat: 0, mdf: 0}));
  const [cardStatus, setCardStatus] = useState(new CardStatus({level: 0, hp: 0, sp: 0, pow: 0, int: 0, vit: 0, spd: 0, luk: 0, atk: 0, def: 0, mat: 0, mdf: 0}));
  const [inputTotalStatus, setInputTotalStatus] = useState(new InputTotalStatus({level: 0, hp: 0, sp: 0, pow: 0, int: 0, vit: 0, spd: 0, luk: 0, atk: 0, def: 0, mat: 0, mdf: 0}));
  const [vitaStatus, setVitaStatus] = useState(new VitaStatus({level: 0, hp: 0, sp: 0, pow: 0, int: 0, vit: 0, spd: 0, luk: 0, atk: 0, def: 0, mat: 0, mdf: 0}));
  const [canStatus, setCanStatus] = useState(new CanStatus({level: 0, hp: 0, sp: 0, pow: 0, int: 0, vit: 0, spd: 0, luk: 0, atk: 0, def: 0, mat: 0, mdf: 0}));
  const [scrollStatus, setScrollStatus] = useState(new ScrollStatus({level: 0, hp: 0, sp: 0, pow: 0, int: 0, vit: 0, spd: 0, luk: 0, atk: 0, def: 0, mat: 0, mdf: 0}));
  const [specialSkillStatus, setSpecialSkillStatus] = useState(new SpecialSkillStatus({level: 0, hp: 0, sp: 0, pow: 0, int: 0, vit: 0, spd: 0, luk: 0, atk: 0, def: 0, mat: 0, mdf: 0}));
  const [displayStatus, setDisplayStatus] = useState(new DisplayStatus({level: 0, hp: 0, sp: 0, pow: 0, int: 0, vit: 0, spd: 0, luk: 0, atk: 0, def: 0, mat: 0, mdf: 0}));

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

  return (
    <div className="app">
      <header className="App-header">
        <h1>チョコラン計算機(非公式)</h1>
      </header>

      <div>
        {/* キャラクターの情報入力欄を配置しているエリア */}
        <CharacterArea 
          // ステ振り情報
          characterStatus={characterStatus}
          updateCharacterStatus={updateCharacterStatus}
          // カードのステータス
          cardStatus={cardStatus}
          updateCardStatus={updateCardStatus}
          // 合計入力ステータス
          inputTotalStatus={inputTotalStatus}
          updateInputTotalStatus={updateInputTotalStatus}
        />

        {/* アイテムボタンを配置しているエリア */}

        {/* スキルボタンを配置しているエリア */}

        {/* 計算結果を表示するエリア */}
      </div>
    </div>
  );
}

export default App;
