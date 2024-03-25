import React from 'react';
import DesktopMainComponent from './components/desktop/DesktopMainComponent';
import MobileMainComponent from './components/mobile/MobileMainComponent';

const App: React.FC = () => {
  const isMobile = window.innerWidth < 768; // 768pxをモバイルとデスクトップの分岐点とする
  return (
    <div>
      {isMobile ? <MobileMainComponent /> : <DesktopMainComponent />}
    </div>
  );
};

export default App;