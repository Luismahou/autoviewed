import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import React, { useEffect, useReducer } from 'react';
import { Action, reducer, RepoList as RepoListModel } from './model';
import { Repo } from './repo';

type FinalAction =
  | { kind: 'LOADED_FROM_STORAGE'; repoList: RepoListModel }
  | Action;

type RepoListState = 'NOT_LOADED' | RepoListModel;

function finalReducer(
  state: RepoListState,
  action: FinalAction,
): RepoListState {
  if (state === 'NOT_LOADED' && action.kind === 'LOADED_FROM_STORAGE') {
    return action.repoList;
  } else if (state !== 'NOT_LOADED' && action.kind !== 'LOADED_FROM_STORAGE') {
    const nextState = reducer(state, action);
    // Save to local storate
    return nextState;
  } else {
    throw Error('unexpected state');
  }
}

const useStyles = makeStyles((theme) => ({
  repoList: {
    display: 'grid',
    gridRowGap: theme.spacing(2),
  },
}));

export const RepoList = () => {
  const [state, dispatch] = useReducer(finalReducer, 'NOT_LOADED');
  useEffect(() => {
    dispatch({ kind: 'LOADED_FROM_STORAGE', repoList: { repos: [] } });
  }, []);
  const classes = useStyles();

  if (state === 'NOT_LOADED') {
    return <span>Loading...</span>;
  }

  const onAddRepo = () => {
    dispatch({ kind: 'ADD_REPO' });
  };
  console.log('something: ', classes.repoList);

  return (
    <div>
      <div className={classes.repoList}>
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
            <Repo
              key={repo.id}
              repo={repo}
              onDelete={onDelete}
              onEditName={onEditName}
              onAddRule={onAddRule}
              onUpdateRule={onUpdateRule}
              onDeleteRule={onDeleteRule}
            />
          );
        })}
      </div>
      {state.repos.length > 0 ? <Box p={1} /> : null}
      <Button variant="contained" color="primary" onClick={onAddRepo}>
        Add repository
      </Button>
    </div>
  );
};
