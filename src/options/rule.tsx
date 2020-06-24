import { IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
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
  const [showDialog, setShowDialog] = React.useState(false);
  const classes = useStyles();

  const onEdit = () => {
    setShowDialog(true);
  };
  const onCancel = () => {
    setShowDialog(false);
  };
  const onSubmit = (newRegex: string, newHide: boolean) => {
    setShowDialog(false);
    onUpdateRule(newRegex, newHide);
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
        <IconButton onClick={onEdit}>
          <CreateIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={onDeleteRule}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </div>
      <RuleDialog
        kind="update"
        initialRegex={rule.regex}
        initialHide={rule.hide}
        open={showDialog}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
    </div>
  );
};
