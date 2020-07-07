import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import partial from 'lodash-es/partial';
import React from 'react';
import { Li, Ul } from '../base-components';
import { ConfirmDialog } from './confirm-dialog';
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
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = React.useState(
    false,
  );

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

  const onOpenConfirmDeleteDialog = () => {
    setShowConfirmDeleteDialog(true);
  };
  const onCancelDelete = () => {
    setShowConfirmDeleteDialog(false);
  };
  const onConfirmDelete = () => {
    setShowConfirmDeleteDialog(false);
    onDelete();
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
                <IconButton
                  onClick={onOpenConfirmDeleteDialog}
                  aria-label="Delete repository"
                >
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
                Add a rule to start marking as viewed files automatically in
                this repository
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
          {repo.rules.length > 0 && (
            <Ul>
              {repo.rules.map((rule) => {
                return (
                  <Li key={rule.id}>
                    <Rule
                      key={rule.id}
                      rule={rule}
                      onUpdateRule={partial(onUpdateRule, rule.id)}
                      onDeleteRule={partial(onDeleteRule, rule.id)}
                    />
                  </Li>
                );
              })}
            </Ul>
          )}
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
      <ConfirmDialog
        open={showConfirmDeleteDialog}
        title="Delete repository?"
        message="This action cannot be undone"
        okLabel="Delete"
        onCancel={onCancelDelete}
        onOk={onConfirmDelete}
      />
    </>
  );
};
