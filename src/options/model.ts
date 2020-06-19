export type Rule = {
  readonly id: number;
  readonly regex: string;
  readonly hide: boolean;
};

export type Repo = {
  readonly id: number;
  readonly name: string;
  readonly rules: readonly Rule[];
};

export type RepoList = {
  readonly repos: readonly Repo[];
};

export type Action =
  | { type: 'ADD_REPO' }
  | { type: 'REPO_UPDATE_NAME'; repoId: number; newName: string }
  | { type: 'DELETE_REPO'; repoId: number }
  | { type: 'ADD_RULE'; repoId: number }
  | { type: 'DELETE_RULE'; repoId: number; ruleId: number }
  | {
      type: 'RULE_UPDATE_REGEX';
      repoId: number;
      ruleId: number;
      newRegex: string;
    }
  | {
      type: 'RULE_UPDATE_HIDE_FLAG';
      repoId: number;
      ruleId: number;
      newHideFlag: boolean;
    };

const computeNextRepoId = (repoList: RepoList) => {
  const maxId = repoList.repos.reduce(
    (memo, repo) => Math.max(repo.id, memo),
    0,
  );
  return maxId + 1;
};

const computeNextRuleId = (repo: Repo) => {
  const maxId = repo.rules.reduce((memo, rule) => Math.max(rule.id, memo), 0);
  return maxId + 1;
};

function addRepo(state: RepoList) {
  return {
    repos: [
      ...state.repos,
      { id: computeNextRepoId(state), name: '', rules: [] },
    ],
  };
}
function repoUpdateName(state: RepoList, repoId: number, newName: string) {
  // TODO
  return state;
}
function deleteRepo(state: RepoList, repoId: number) {
  return {
    repos: state.repos.filter(repo => repo.id !== repoId),
  };
}
function addRule(state: RepoList, repoId: number) {
  return state;
}
function deleteRule(state: RepoList, repoId: number, ruleId: number) {
  return state;
}
function ruleUpdateRegex(
  state: RepoList,
  repoId: number,
  ruleId: number,
  newRegex: string,
) {
  return state;
}
function ruleUpdateHideFlag(
  state: RepoList,
  repoId: number,
  ruleId: number,
  newHideFlag: boolean,
) {
  return state;
}

export function reducer(state: RepoList, action: Action): RepoList {
  switch (action.type) {
    case 'ADD_REPO':
      return addRepo(state);
    case 'REPO_UPDATE_NAME':
      return repoUpdateName(state, action.repoId, action.newName);
    case 'DELETE_REPO':
      return deleteRepo(state, action.repoId);
    case 'ADD_RULE':
      return addRule(state, action.repoId);
    case 'DELETE_RULE':
      return deleteRule(state, action.repoId, action.ruleId);
    case 'RULE_UPDATE_REGEX':
      return ruleUpdateRegex(
        state,
        action.repoId,
        action.ruleId,
        action.newRegex,
      );
    case 'RULE_UPDATE_HIDE_FLAG':
      return ruleUpdateHideFlag(
        state,
        action.repoId,
        action.ruleId,
        action.newHideFlag,
      );
  }
}
