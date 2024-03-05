import React, { useState } from 'react';
import './App.css';
import CharacterArea from './characterArea/CharacterArea';

import { Button } from "@mui/material";

function App() {
  const [stats, setStats] = useState({
    pow: 0,
    int: 0,
    // 他のステータスも同様に
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    // この例ではnameは使用していませんが、複数の入力フィールドを処理する場合に役立ちます
    setStats({ ...stats, pow: Number(value) });
  }

  const handleSubmit = () => {
    // 送信ボタンが押されたときの処理
    // 例えば、APIリクエストを送信する
  }

  return (
    <div className="app">
      <header className="App-header">
        <h1>チョコラン計算機(非公式)</h1>
      </header>

      <div>
        <CharacterArea />

        <Button variant='outlined' onClick={handleSubmit} className="all-reset">
          すべてリセット
        </Button>
        {/* 他のボタンも同様に */}
      </div>
    </div>
  );
}

export default App;
