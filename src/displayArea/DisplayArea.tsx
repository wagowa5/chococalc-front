import React, { useEffect, useState } from 'react';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Divider from '@mui/material/Divider';
import { Grid } from '@mui/material';

import { evaluate } from 'maths.ts';

import { STATUS } from '../constants/constants';
import { CharacterStatus } from '../interface/Status';


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
}

const DisplayArea = (
    {
        characterStatus
    }: DisplayAreaProps
) => {

    return (
        <>
        <Grid container spacing={1} justifyContent="center" alignItems="start">
            {/* 1行目 */}
            {/* HP・SP */}
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
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
                        <StyledTableCell align="center">1100({100})</StyledTableCell>
                        <StyledTableCell align="center">1100({100})</StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={1}></Grid>

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
                        <StyledTableCell align="center">66000 (64000)</StyledTableCell>
                        <StyledTableCell align="center">110000 (100000)</StyledTableCell>
                        <StyledTableCell align="center">110000 (100000)</StyledTableCell>
                        <StyledTableCell align="center">110000 (100000)</StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
                </TableContainer>
            </Grid>
        </Grid>
        </>
    );
};

export default DisplayArea;
