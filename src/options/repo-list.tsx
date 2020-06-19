import React, { useEffect, useReducer } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Repo } from './repo';
import { RepoList as RepoListModel, Action, reducer } from './model';
import { makeStyles } from '@material-ui/core';

type FinalAction =
  | { type: 'LOADED_FROM_STORAGE'; repoList: RepoListModel }
  | Action;

type RepoListState = 'NOT_LOADED' | RepoListModel;

function finalReducer(
  state: RepoListState,
  action: FinalAction,
): RepoListState {
  if (state === 'NOT_LOADED' && action.type === 'LOADED_FROM_STORAGE') {
    return action.repoList;
  } else if (state !== 'NOT_LOADED' && action.type !== 'LOADED_FROM_STORAGE') {
    const nextState = reducer(state, action);
    // Save to local storate
    return nextState;
  } else {
    throw Error('unexpected state');
  }
}

const useStyles = makeStyles(theme => ({
  repoList: {
    display: 'grid',
    gridRowGap: theme.spacing(2),
  },
}));

export const RepoList = () => {
  const [state, dispatch] = useReducer(finalReducer, 'NOT_LOADED');
  useEffect(() => {
    dispatch({ type: 'LOADED_FROM_STORAGE', repoList: { repos: [] } });
  }, []);
  const classes = useStyles();

  if (state === 'NOT_LOADED') {
    return <span>Loading...</span>;
  }

  const onAddRepo = () => {
    dispatch({ type: 'ADD_REPO' });
  };
  console.log('something: ', classes.repoList);

  return (
    <div>
      <div className={classes.repoList}>
        {state.repos.map(repo => {
          const onDelete = () => {
            dispatch({ type: 'DELETE_REPO', repoId: repo.id });
          };
          const onAddRule = () => {
            dispatch({ type: 'ADD_RULE', repoId: repo.id });
          };
          const onUpdateRuleRegex = (ruleId: number, newRegex: string) => {
            dispatch({
              type: 'RULE_UPDATE_REGEX',
              repoId: repo.id,
              ruleId,
              newRegex,
            });
          };
          const onUpdateHideFlag = (ruleId: number, newHideFlag: boolean) => {
            dispatch({
              type: 'RULE_UPDATE_HIDE_FLAG',
              repoId: repo.id,
              ruleId,
              newHideFlag,
            });
          };
          return (
            <Repo
              key={repo.id}
              repo={repo}
              onDelete={onDelete}
              onAddRule={onAddRule}
              onUpdateRuleRegex={onUpdateRuleRegex}
              onUpdateHideFlag={onUpdateHideFlag}
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
