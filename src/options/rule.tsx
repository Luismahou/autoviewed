import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import { Rule as RuleModel } from './model';
import { RuleDialog } from './rule-dialog';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rule: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gridGap: 8,
    alignItems: 'center',
  },
  regex: {
    padding: 4,
    border: '2px solid darkgray',
    borderRadius: 4,
    backgroundColor: '#EEE',
  },
  toolbar: {
    display: 'grid',
    gridAutoFlow: 'column',
  },
});

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
