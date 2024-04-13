import React from 'react';
import {
  CharacterStatusProvider,
  InputStatusProvider,
} from './contexts/StatusContext';
import DesktopMainComponent from './components/desktop/DesktopMainComponent';
import MobileMainComponent from './components/mobile/MobileMainComponent';

const App: React.FC = () => {
  const isMobile = window.innerWidth <= 768; // 768pxをモバイルとデスクトップの分岐点とする
  return (
    <>
      <CharacterStatusProvider>
        <InputStatusProvider>
          {isMobile ? <MobileMainComponent /> : <DesktopMainComponent />}
        </InputStatusProvider>
      </CharacterStatusProvider>
    </>
  );
};

export default App;
