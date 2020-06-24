import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import partial from 'lodash-es/partial';
import React from 'react';
import { Repo as RepoModel } from './model';
import { RepoDialog } from './repo-dialog';
import { Rule } from './rule';
import { RuleDialog } from './rule-dialog';

const useStyles = makeStyles((theme) => ({
  message: {
    display: 'grid',
    gridGap: theme.spacing(2),
    justifyItems: 'center',
    padding: theme.spacing(4),
  },
}));

type RepoProps = {
  repo: RepoModel;
  onDelete: () => void;
  onEditName: (newName: string) => void;
  onAddRule: (regex: string, hide: boolean) => void;
  onUpdateRule: (ruleId: number, newRegex: string, newHide: boolean) => void;
  onDeleteRule: (ruleId: number) => void;
};

export const Repo = ({
  repo,
  onDelete,
  onEditName,
  onAddRule,
  onUpdateRule,
  onDeleteRule,
}: RepoProps) => {
  const classes = useStyles();
  const [showRuleDialog, setShowRuleDialog] = React.useState(false);
  const [showRepoDialog, setShowRepoDialog] = React.useState(false);

  const onShowCreateRuleDialog = () => {
    setShowRuleDialog(true);
  };
  const onCancelCreateRule = () => {
    setShowRuleDialog(false);
  };
  const onCreateRule = (regex: string, hide: boolean) => {
    setShowRuleDialog(false);
    onAddRule(regex, hide);
  };

  const onShowEditRepoDialog = () => {
    setShowRepoDialog(true);
  };
  const onCancelEditRepo = () => {
    setShowRepoDialog(false);
  };
  const onUpdateRepo = (name: string) => {
    setShowRepoDialog(false);
    onEditName(name);
  };
  return (
    <>
      <Card variant="outlined">
        <CardHeader
          title={repo.name || 'Unnamed'}
          action={
            <CardActions>
              <Tooltip title="Add rule">
                <IconButton
                  onClick={onShowCreateRuleDialog}
                  aria-label="Add rule"
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit repository name">
                <IconButton
                  onClick={onShowEditRepoDialog}
                  aria-label="Edit repository name"
                >
                  <CreateIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete repository">
                <IconButton onClick={onDelete} aria-label="Delete repository">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </CardActions>
          }
        />
        <Divider variant="middle" />
        <CardContent>
          {repo.rules.length === 0 && (
            <div className={classes.message}>
              <Typography>
                Add rule to start approving files automatically in this
                repository
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={onShowCreateRuleDialog}
              >
                Add rule
              </Button>
            </div>
          )}
          {repo.rules.map((rule) => {
            return (
              <Rule
                key={rule.id}
                rule={rule}
                onUpdateRule={partial(onUpdateRule, rule.id)}
                onDeleteRule={partial(onDeleteRule, rule.id)}
              />
            );
          })}
        </CardContent>
      </Card>
      <RuleDialog
        kind="create"
        onCancel={onCancelCreateRule}
        onSubmit={onCreateRule}
        open={showRuleDialog}
      />
      <RepoDialog
        kind="update"
        initialName={repo.name}
        onCancel={onCancelEditRepo}
        onSubmit={onUpdateRepo}
        open={showRepoDialog}
      />
    </>
  );
};
