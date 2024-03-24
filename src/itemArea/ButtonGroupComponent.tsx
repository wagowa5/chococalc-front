import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

// ButtonGroupComponentのPropsの型定義
interface ButtonGroupComponentProps {
    buttons: { key: string; label: string; }[];
    handles?: {
        [key: string]: {
            handle: () => void;
        }
    }
}

// ButtonGroupComponentの実装
const ButtonGroupComponent: React.FC<ButtonGroupComponentProps> = ({ buttons, handles }) => {
    return (
        <ButtonGroup orientation="vertical" aria-label="Vertical button group">
            {buttons.map(button => (
            handles && handles[button.key] ? (
                <Button 
                    key={button.key}
                    onClick={handles[button.key].handle}
                >
                    {button.label}
                </Button>
            ) : (
                <Button key={button.key}>{button.label}</Button>
            )
            ))}
        </ButtonGroup>
    );
}

export default ButtonGroupComponent;