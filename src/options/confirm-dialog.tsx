import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import React from 'react';

export const ConfirmDialog = ({
  open,
  title,
  message,
  okLabel,
  onOk,
  onCancel,
}: {
  open: boolean;
  title: string;
  message: string;
  okLabel: string;
  onOk: () => void;
  onCancel: () => void;
}) => {
  const handleClose = (_: object, reason: string) => {
    if (reason !== 'backdropClick') {
      onCancel();
    }
  };
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      aria-labelledby="confirm-dialog-title"
    >
      <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button color="primary" onClick={onOk}>
          {okLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
