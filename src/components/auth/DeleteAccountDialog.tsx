import React, { useRef, useState } from 'react';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { Alert, Button, Checkbox, Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle, FormControlLabel } from '@mui/material';
import { deleteAccount } from '../../util/deleteAccount';

interface Props {
    open: boolean;
    userPool: CognitoUserPool;
    onClose: () => void;
    onDeleted: () => void;
}

export default function DeleteAccountDialog({ open, userPool, onClose, onDeleted }: Props) {
    const [confirmed, setConfirmed] = useState(false);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    const submitting = useRef(false);

    const close = () => {
        if (submitting.current) return;
        setConfirmed(false);
        setError('');
        onClose();
    };
    const remove = async () => {
        if (!confirmed || submitting.current) return;
        submitting.current = true;
        setBusy(true);
        setError('');
        try {
            const user = userPool.getCurrentUser();
            if (!user) throw new Error('再ログインしてください。');
            await deleteAccount(user);
            setConfirmed(false);
            onDeleted();
        } catch (error) {
            setError('削除を完了できませんでした。保存済みマネキンの一部または全部が削除されている場合があります。' +
                (error instanceof Error ? error.message : '再度お試しください。'));
        } finally {
            submitting.current = false;
            setBusy(false);
        }
    };

    return <Dialog open={open} onClose={close} fullWidth maxWidth="sm"
        aria-labelledby="delete-account-title" aria-describedby="delete-account-description">
        <DialogTitle id="delete-account-title">アカウント削除</DialogTitle>
        <DialogContent>
            <DialogContentText id="delete-account-description">
                保存済みマネキンをすべて削除してから、アカウントを削除します。この操作は取り消せません。
                削除中は別の画面で保存操作を行わないでください。
            </DialogContentText>
            <FormControlLabel control={<Checkbox checked={confirmed} disabled={busy}
                onChange={event => setConfirmed(event.target.checked)} />}
                label="アカウントと保存済みマネキンの削除に同意します" />
            {error && <Alert severity="error">{error}</Alert>}
        </DialogContent>
        <DialogActions>
            <Button onClick={close} disabled={busy}>キャンセル</Button>
            <Button color="error" variant="contained" disabled={!confirmed || busy} onClick={remove}>
                {busy ? '削除中…' : '完全に削除する'}
            </Button>
        </DialogActions>
    </Dialog>;
}
