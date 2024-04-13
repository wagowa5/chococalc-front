import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CharacterStatus, StatusInputFields } from 'interface/Status';
import { STATUS, FIELDS } from 'constants/constants';

const initialStatusInputFields: StatusInputFields = Object.keys(
  FIELDS,
).reduce<StatusInputFields>((acc, key) => {
  const fieldKey = FIELDS[key as keyof typeof FIELDS]; // This ensures that fieldKey is typed correctly
  acc[fieldKey] = { value: '0', errorMessage: '' };
  return acc;
}, {});

const initialCharacterStatus: CharacterStatus = Object.keys(
  STATUS,
).reduce<CharacterStatus>((acc, key) => {
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
    displayStatus: 0,
  };
  return acc;
}, {});

// ステータスコンテキストの作成
export const CharacterStatusContext = createContext<
  | {
      characterStatus: CharacterStatus;
      updateCharacter: (status: CharacterStatus) => void;
    }
  | undefined
>(undefined);

export const InputStatusContext = createContext<
  | {
      inputStatus: StatusInputFields;
      updateInputStatus: (status: StatusInputFields) => void;
    }
  | undefined
>(undefined);

// Provider コンポーネントの定義
export const CharacterStatusProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [characterStatus, setCharacterStatus] = useState<CharacterStatus>(
    initialCharacterStatus,
  );

  const updateCharacter = (newStatus: CharacterStatus) => {
    setCharacterStatus(newStatus);
  };

  return (
    <CharacterStatusContext.Provider
      value={{ characterStatus, updateCharacter }}
    >
      {children}
    </CharacterStatusContext.Provider>
  );
};

export const InputStatusProvider = ({ children }: { children: ReactNode }) => {
  const [inputStatus, setInputStatus] = useState<StatusInputFields>(
    initialStatusInputFields,
  );

  const updateInputStatus = (newStatus: StatusInputFields) => {
    setInputStatus(newStatus);
  };

  return (
    <InputStatusContext.Provider value={{ inputStatus, updateInputStatus }}>
      {children}
    </InputStatusContext.Provider>
  );
};
