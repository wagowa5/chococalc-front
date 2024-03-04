import React, { useState } from 'react';
import './App.css';
import StatusInput from './StatusInput';

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
      <StatusInput></StatusInput>


      <div className="pow">
        <input
          type="number"
          name="inputPow"
          value={stats.pow}
          onChange={handleInputChange}
          className="input-pow"
        />
        {/* 他の入力フィールドも同様に */}
      </div>
      <button onClick={handleSubmit} className="all-reset">
        すべてリセット
      </button>
      {/* 他のボタンも同様に */}
    </div>
  );
}

export default App;
