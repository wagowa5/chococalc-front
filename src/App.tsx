import React, { useState } from 'react';
import './App.css';
import CharacterArea from './characterArea/CharacterArea';

import { Button } from "@mui/material";

function App() {

  return (
    <div className="app">
      <header className="App-header">
        <h1>チョコラン計算機(非公式)</h1>
      </header>

      <div>
        {/* キャラクターの情報入力欄を配置しているエリア */}
        <CharacterArea />

        {/* アイテムボタンを配置しているエリア */}

        {/* スキルボタンを配置しているエリア */}

        {/* 計算結果を表示するエリア */}
      </div>
    </div>
  );
}

export default App;
