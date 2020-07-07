import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useReducer, useState } from 'react';
import { Li, Ul } from '../base-components';
import { Action, reducer, RepoList as RepoListModel } from './model';
import { Repo } from './repo';
import { RepoDialog } from './repo-dialog';

function createReducer(onChange: (newRepoList: RepoListModel) => void) {
  return (state: RepoListModel, action: Action): RepoListModel => {
    const nextState = reducer(state, action);
    onChange(nextState);
    return nextState;
  };
}

const useStyles = makeStyles((theme) => ({
  vbox: {
    display: 'grid',
    gridRowGap: theme.spacing(2),
  },
  message: {
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'center',
    alignItems: 'center',
    padding: theme.spacing(4),
  },
}));

export const RepoList = ({
  extensionId,
  initialRepoList,
  onChange,
}: {
  extensionId: string;
  initialRepoList: RepoListModel;
  onChange: (newRepoList: RepoListModel) => void;
}) => {
  const [state, dispatch] = useReducer(
    createReducer(onChange),
    initialRepoList,
  );
  const [showRepoDialog, setShowRepoDialog] = useState(false);
  const classes = useStyles();

  const onShowCreateRepoDialog = () => {
    setShowRepoDialog(true);
  };
  const onCancelCreateRepo = () => {
    setShowRepoDialog(false);
  };
  const onCreateRepo = (name: string) => {
    setShowRepoDialog(false);
    dispatch({ kind: 'ADD_REPO', name });
  };

  const addRepoBtn = (
    <Button
      variant="contained"
      color="primary"
      onClick={onShowCreateRepoDialog}
    >
      Add repository
    </Button>
  );

  return (
    <div>
      {state.repos.length > 0 && (
        <div className={classes.vbox}>
          <Ul className={classes.vbox}>
            {state.repos.map((repo) => {
              const onDelete = () => {
                dispatch({ kind: 'DELETE_REPO', repoId: repo.id });
              };
              const onEditName = (newName: string) => {
                dispatch({
                  kind: 'UPDATE_REPO_NAME',
                  repoId: repo.id,
                  newName,
                });
              };
              const onAddRule = (regex: string, hide: boolean) => {
                dispatch({ kind: 'ADD_RULE', repoId: repo.id, regex, hide });
              };
              const onUpdateRule = (
                ruleId: number,
                newRegex: string,
                newHide: boolean,
              ) => {
                dispatch({
                  kind: 'UPDATE_RULE',
                  repoId: repo.id,
                  ruleId,
                  newRegex,
                  newHide,
                });
              };
              const onDeleteRule = (ruleId: number) => {
                dispatch({
                  kind: 'DELETE_RULE',
                  repoId: repo.id,
                  ruleId,
                });
              };
              return (
                <Li key={repo.id}>
                  <Repo
                    key={repo.id}
                    repo={repo}
                    onDelete={onDelete}
                    onEditName={onEditName}
                    onAddRule={onAddRule}
                    onUpdateRule={onUpdateRule}
                    onDeleteRule={onDeleteRule}
                  />
                </Li>
              );
            })}
          </Ul>
          <div>{addRepoBtn}</div>
        </div>
      )}
      {state.repos.length === 0 && (
        <div className={classes.message}>
          <Typography gutterBottom={true}>
            Thanks for installing{' '}
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://chrome.google.com/webstore/detail/${extensionId}`}
            >
              this extension
            </a>
            .
          </Typography>
          <Typography gutterBottom={true}>
            Speed up your code reviews by adding your first GitHub repository.
          </Typography>
          <Box p={2}>{addRepoBtn}</Box>
        </div>
      )}
      <RepoDialog
        kind="create"
        open={showRepoDialog}
        onCancel={onCancelCreateRepo}
        onSubmit={onCreateRepo}
      />
    </div>
  );
};
