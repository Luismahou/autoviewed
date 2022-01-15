import { IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import { ConfirmDialog } from './confirm-dialog';
import { Rule as RuleModel } from './model';
import { RuleDialog } from './rule-dialog';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rule: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gridGap: theme.spacing(2),
    alignItems: 'center',
  },
  regex: {
    padding: theme.spacing(0.5),
    border: `2px solid ${theme.palette.secondary.main}`,
    borderRadius: 4,
    backgroundColor: theme.palette.background.default,
    color: theme.palette.secondary.main,
  },
  toolbar: {
    display: 'grid',
    gridAutoFlow: 'column',
  },
}));

type RuleProps = {
  rule: RuleModel;
  onDeleteRule: () => void;
  onUpdateRule: (newRegex: string, newHide: boolean) => void;
};

export const Rule = ({ rule, onDeleteRule, onUpdateRule }: RuleProps) => {
  const [showEditDialog, setShowEditDialog] = React.useState(false);
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] =
    React.useState(false);
  const classes = useStyles();

  const onEdit = () => {
    setShowEditDialog(true);
  };
  const onCancel = () => {
    setShowEditDialog(false);
  };
  const onSubmit = (newRegex: string, newHide: boolean) => {
    setShowEditDialog(false);
    onUpdateRule(newRegex, newHide);
  };

  const onOpenConfirmDeleteDialog = () => {
    setShowConfirmDeleteDialog(true);
  };
  const onCancelDelete = () => {
    setShowConfirmDeleteDialog(false);
  };
  const onConfirmDelete = () => {
    setShowConfirmDeleteDialog(false);
    onDeleteRule();
  };

  return (
    <div className={classes.container}>
      <div className={classes.rule}>
        <Typography>
          <code className={classes.regex}>{rule.regex}</code>
        </Typography>
        {rule.hide && (
          <Typography>
            <em>Hidden</em>
          </Typography>
        )}
      </div>
      <div className={classes.toolbar}>
        <IconButton aria-label="Edit rule" onClick={onEdit}>
          <CreateIcon fontSize="small" />
        </IconButton>
        <IconButton
          aria-label="Delete rule"
          onClick={onOpenConfirmDeleteDialog}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </div>
      <RuleDialog
        kind="update"
        initialRegex={rule.regex}
        initialHide={rule.hide}
        open={showEditDialog}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
      <ConfirmDialog
        open={showConfirmDeleteDialog}
        title="Delete rule?"
        message="This action cannot be undone"
        okLabel="Delete"
        onCancel={onCancelDelete}
        onOk={onConfirmDelete}
      />
    </div>
  );
};
