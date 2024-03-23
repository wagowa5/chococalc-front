import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

// ButtonGroupComponentのPropsの型定義
interface ButtonGroupComponentProps {
    buttons: { key: string; label: string; }[];
}

// ButtonGroupComponentの実装
const ButtonGroupComponent: React.FC<ButtonGroupComponentProps> = ({ buttons }) => {
    return (
        <ButtonGroup orientation="vertical" aria-label="Vertical button group">
            {buttons.map(button => (
                <Button key={button.key}>{button.label}</Button>
            ))}
        </ButtonGroup>
    );
}

export default ButtonGroupComponent;
