import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';

import { STATUS } from '../../constants/constants';
import { CharacterStatus, StatusInputFields } from '../../interface/Status';
import {
    getInputStatus,
    calculateDisplayStatus,
    resetAllItemSkillStatus,
} from '../../util/StatusUtil';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        //backgroundColor: theme.palette.common.black,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

// propsの型定義を追加
interface DisplayAreaProps {
    characterStatus: CharacterStatus;
    updateCharacter: (newCharacterStatus: CharacterStatus) => void;
    inputStatus: StatusInputFields;
    updateInputStatus: (newInputStatus: StatusInputFields) => void;
}

const DisplayArea = (
    {
        characterStatus,
        updateCharacter,
        inputStatus,
        updateInputStatus,
    }: DisplayAreaProps
) => {

    // ステータス入力を反映ボタンクリック時の処理
    const handleReflectInputStatus = () => {
        // ステータス入力を反映
        getInputStatus(characterStatus, inputStatus, updateCharacter);
        calculateDisplayStatus(characterStatus, updateCharacter);
    }

    // すべてリセットボタンクリック時の処理
    const handleResetAll = () => {
        resetAllItemSkillStatus(characterStatus, updateCharacter);
        calculateDisplayStatus(characterStatus, updateCharacter);
    }

    return (
        <>
        <Grid container spacing={1} justifyContent="center" alignItems="start">

            {/* 1行目 */}
            {/* 入力内容反映ボタン */}
            <Grid item xs={12}>
                <Button 
                    variant="contained"
                    onClick={handleReflectInputStatus}
                    color='success'
                >ステータス入力値を反映</Button>
            </Grid>

            {/* 1行目 */}
            {/* HP・SP */}
            <Grid item xs={12}>
                <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">HP (上昇値)</StyledTableCell>
                            <StyledTableCell align="center">SP (上昇値)</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <StyledTableRow key={"disp-hp-sp"}>
                        <StyledTableCell align="center">{characterStatus[STATUS.HP].displayStatus} ({characterStatus[STATUS.HP].specialSkill})</StyledTableCell>
                        <StyledTableCell align="center">{characterStatus[STATUS.SP].displayStatus} ({characterStatus[STATUS.SP].specialSkill})</StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
                </TableContainer>
            </Grid>

            {/* 2行目 */}
            {/* POW・INT・SPD・VIT・LUK */}
            <Grid item xs={12}>
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">POW</StyledTableCell>
                            <StyledTableCell align="center">INT</StyledTableCell>
                            <StyledTableCell align="center">SPD</StyledTableCell>
                            <StyledTableCell align="center">VIT</StyledTableCell>
                            <StyledTableCell align="center">LUK</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <StyledTableRow key={"disp-basic-status"}>
                        <StyledTableCell align="center">{characterStatus[STATUS.POW].displayStatus}</StyledTableCell>
                        <StyledTableCell align="center">{characterStatus[STATUS.INT].displayStatus}</StyledTableCell>
                        <StyledTableCell align="center">{characterStatus[STATUS.SPD].displayStatus}</StyledTableCell>
                        <StyledTableCell align="center">{characterStatus[STATUS.VIT].displayStatus}</StyledTableCell>
                        <StyledTableCell align="center">{characterStatus[STATUS.LUK].displayStatus}</StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
                </TableContainer>
            </Grid>

            {/* 3行目 */}
            {/* ATK・DEF・MAT・MDF */}
            <Grid item xs={12}>
                <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">ATK (上昇値)</StyledTableCell>
                            <StyledTableCell align="center">DEF (上昇値)</StyledTableCell>
                            <StyledTableCell align="center">MAT (上昇値)</StyledTableCell>
                            <StyledTableCell align="center">MDF (上昇値)</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <StyledTableRow key={"disp-detail-status"}>
                        <StyledTableCell align="center">{characterStatus[STATUS.ATK].displayStatus} ({characterStatus[STATUS.ATK].liquid})</StyledTableCell>
                        <StyledTableCell align="center">{characterStatus[STATUS.DEF].displayStatus} ({characterStatus[STATUS.DEF].liquid})</StyledTableCell>
                        <StyledTableCell align="center">{characterStatus[STATUS.MAT].displayStatus} ({characterStatus[STATUS.MAT].liquid})</StyledTableCell>
                        <StyledTableCell align="center">{characterStatus[STATUS.MDF].displayStatus} ({characterStatus[STATUS.MDF].liquid})</StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
                </TableContainer>
            </Grid>

            {/* 4行目 */}
            {/* すべてリセットボタン */}
            <Grid item xs={4}></Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
                <Button 
                    variant="contained"
                    onClick={handleResetAll}
                    color='error'
                >すべてリセット</Button>
            </Grid>
        </Grid>
        </>
    );
};

export default DisplayArea;
