import React, { useState } from 'react';
import './App.css';
import CharacterArea from './characterArea/CharacterArea';
import { CharacterStatus } from './interface/Status';

import { Button } from "@mui/material";

function App() {

  const [characterStatus, setCharacterStatus] = useState(new CharacterStatus({pow: 0, int: 0, vit: 0, spd: 0, luk: 0, atk: 0, def: 0, mat: 0, mdf: 0}));

  // ステータス更新関数
  const updateCharacterStatus = (newStatus: CharacterStatus) => {
    setCharacterStatus(newStatus);
  };

  return (
    <div className="app">
      <header className="App-header">
        <h1>チョコラン計算機(非公式)</h1>
      </header>

      <div>
        {/* キャラクターの情報入力欄を配置しているエリア */}
        <CharacterArea characterStatus={characterStatus} updateCharacterStatus={updateCharacterStatus} />

        {/* アイテムボタンを配置しているエリア */}

        {/* スキルボタンを配置しているエリア */}

        {/* 計算結果を表示するエリア */}
      </div>
    </div>
  );
}

export default App;
