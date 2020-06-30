import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
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
  repoList: {
    display: 'grid',
    gridRowGap: theme.spacing(2),
  },
}));

export const RepoList = ({
  initialRepoList,
  onChange,
}: {
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

  return (
    <div>
      <Ul className={classes.repoList}>
        {state.repos.map((repo) => {
          const onDelete = () => {
            dispatch({ kind: 'DELETE_REPO', repoId: repo.id });
          };
          const onEditName = (newName: string) => {
            dispatch({ kind: 'UPDATE_REPO_NAME', repoId: repo.id, newName });
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
      {state.repos.length > 0 ? <Box p={1} /> : null}
      <Button
        variant="contained"
        color="primary"
        onClick={onShowCreateRepoDialog}
      >
        Add repository
      </Button>
      <RepoDialog
        kind="create"
        open={showRepoDialog}
        onCancel={onCancelCreateRepo}
        onSubmit={onCreateRepo}
      />
    </div>
  );
};
