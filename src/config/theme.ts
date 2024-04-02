import { createTheme } from '@mui/material/styles';

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
        // default-primary
        // const primary = {
        //   main: '#1976d2',
        //   light: '#42a5f5',
        //   dark: '#1565c0',
        //   contrastText: '#fff',
        // };
        // Secondaryカラーを設定
        // main白で他を薄い水色にする
        secondary: {
            light: '#64b5f6',
            main: '#ffffff',
            dark: '#64b5f6',
            contrastText: '#1976d2',
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
