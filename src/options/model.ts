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
  | { kind: 'ADD_REPO' }
  | { kind: 'UPDATE_REPO_NAME'; repoId: number; newName: string }
  | { kind: 'DELETE_REPO'; repoId: number }
  | { kind: 'ADD_RULE'; repoId: number; regex: string; hide: boolean }
  | { kind: 'DELETE_RULE'; repoId: number; ruleId: number }
  | {
      kind: 'UPDATE_RULE';
      repoId: number;
      ruleId: number;
      newRegex: string;
      newHide: boolean;
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
    repos: state.repos.filter((repo) => repo.id !== repoId),
  };
}
function addRule(
  state: RepoList,
  repoId: number,
  regex: string,
  hide: boolean,
) {
  return state;
}
function deleteRule(state: RepoList, repoId: number, ruleId: number) {
  return state;
}
function updateRule(
  state: RepoList,
  repoId: number,
  ruleId: number,
  newRegex: string,
  newHide: boolean,
) {
  return state;
}

export function reducer(state: RepoList, action: Action): RepoList {
  switch (action.kind) {
    case 'ADD_REPO':
      return addRepo(state);
    case 'UPDATE_REPO_NAME':
      return repoUpdateName(state, action.repoId, action.newName);
    case 'DELETE_REPO':
      return deleteRepo(state, action.repoId);
    case 'ADD_RULE':
      return addRule(state, action.repoId, action.regex, action.hide);
    case 'DELETE_RULE':
      return deleteRule(state, action.repoId, action.ruleId);
    case 'UPDATE_RULE':
      return updateRule(
        state,
        action.repoId,
        action.ruleId,
        action.newRegex,
        action.newHide,
      );
  }
}
