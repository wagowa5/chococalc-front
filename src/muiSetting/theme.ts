import * as React from 'react';
import { red } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';


// フォントを設定
const fontFamily = [
    'Noto Sans JP',
    'メイリオ',
    'ＭＳ Ｐゴシック',
    'sans-serif',
    // 使用したいフォントを以降に羅列してください
].join(',');

/*****************
 * テーマを設定
 *****************
 */
const theme = createTheme({
    typography: {
        fontFamily: fontFamily,  // フォント
    },
    palette: {
        // Primaryカラーを設定
        // primary: {
        //     light: '#54C527',
        //     main: '#ff9800',
        //     dark: '#b26a00',
        //     contrastText: '#000000',
        // },
        // Secondaryカラーを設定
        secondary: {
            light: '#2196f3',
            main: '#ffffff',
            dark: '#00a152',
            contrastText: '#2196f3',
        },
    },
    mixins: {
        // ツールバーの高さ
        toolbar: {
            minHeight: 64,
        },
    },
    // 各パーツのスタイルをカスタマイズ
    components: {
        MuiCheckbox: {
            defaultProps: {
                color: 'primary',
            },
        },
        MuiList: {
            defaultProps: {
                dense: true,
            },
        },
        MuiTable: {
            defaultProps: {
                size: 'small',
            },
        },
        MuiFormControl: {
            defaultProps: {
                sx: {
                    minWidth: 80,
                },
                variant: 'outlined',
                size: 'small',
            },
        },
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
                size: 'small',
                type: 'string',
                margin: 'dense',
            },
        },
        MuiSelect: {
            defaultProps: {
                variant: 'outlined',
                size: 'small',
                margin: 'dense',
            },
        },
    },
});

export default theme;
