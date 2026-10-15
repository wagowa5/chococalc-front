import React from 'react';
import { Alert, Box } from '@mui/material';

export default function ServiceEndNotice() {
    return (
        <Box sx={{ mx: 2, my: 2 }}>
            <Alert severity="warning" role="note">
                チョコットランドのサービス終了に伴い、この計算機は
                <strong><time dateTime="2027-03-29">2027年3月29日</time>に公開を終了します。</strong>
            </Alert>
        </Box>
    );
}
