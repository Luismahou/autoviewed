import produce, { castDraft } from 'immer';

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
  | { kind: 'ADD_REPO'; name: string }
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

function computeNextRepoId(repoList: RepoList) {
  const maxId = repoList.repos.reduce(
    (memo, repo) => Math.max(repo.id, memo),
    0,
  );
  return maxId + 1;
}
function computeNextRuleId(repo: Repo) {
  const maxId = repo.rules.reduce((memo, rule) => Math.max(rule.id, memo), 0);
  return maxId + 1;
}

function getRepoIndexOrThrow(state: RepoList, repoId: number) {
  const repoIndex = state.repos.findIndex((repo) => repo.id === repoId);
  if (repoIndex < 0) {
    throw new Error(`No repo for ${repoId}`);
  }

  return repoIndex;
}
function getRepoOrThrow(state: RepoList, repoId: number) {
  const repoIndex = getRepoIndexOrThrow(state, repoId);
  return state.repos[repoIndex];
}
function getRuleIndexOrThrow(state: Repo, ruleId: number) {
  const ruleIndex = state.rules.findIndex((rule) => rule.id === ruleId);
  if (ruleIndex < 0) {
    throw new Error(`No rule for ${ruleId}`);
  }

  return ruleIndex;
}
function getRuleOrThrow(state: Repo, ruleId: number) {
  const ruleIndex = getRuleIndexOrThrow(state, ruleId);
  return state.rules[ruleIndex];
}

function addRepo(state: RepoList, name: string) {
  castDraft(state.repos).push({
    id: computeNextRepoId(state),
    name,
    rules: [],
  });
}
function repoUpdateName(state: RepoList, repoId: number, newName: string) {
  const repo = getRepoOrThrow(state, repoId);
  castDraft(repo).name = newName;
}
function deleteRepo(state: RepoList, repoId: number) {
  const repoIndex = getRepoIndexOrThrow(state, repoId);
  castDraft(state.repos).splice(repoIndex, 1);
}
function addRule(
  state: RepoList,
  repoId: number,
  regex: string,
  hide: boolean,
) {
  const repo = getRepoOrThrow(state, repoId);
  castDraft(repo.rules).push({
    id: computeNextRuleId(repo),
    regex,
    hide,
  });
}
function deleteRule(state: RepoList, repoId: number, ruleId: number) {
  const repo = getRepoOrThrow(state, repoId);
  const ruleIndex = getRuleIndexOrThrow(repo, ruleId);
  castDraft(repo.rules).splice(ruleIndex, 1);
}
function updateRule(
  state: RepoList,
  repoId: number,
  ruleId: number,
  newRegex: string,
  newHide: boolean,
) {
  const repo = getRepoOrThrow(state, repoId);
  const rule = getRuleOrThrow(repo, ruleId);
  castDraft(rule).regex = newRegex;
  castDraft(rule).hide = newHide;
}

export const reducer = produce((draft: RepoList, action: Action): RepoList => {
  switch (action.kind) {
    case 'ADD_REPO':
      addRepo(draft, action.name);
      break;
    case 'UPDATE_REPO_NAME':
      repoUpdateName(draft, action.repoId, action.newName);
      break;
    case 'DELETE_REPO':
      deleteRepo(draft, action.repoId);
      break;
    case 'ADD_RULE':
      addRule(draft, action.repoId, action.regex, action.hide);
      break;
    case 'DELETE_RULE':
      deleteRule(draft, action.repoId, action.ruleId);
      break;
    case 'UPDATE_RULE':
      updateRule(
        draft,
        action.repoId,
        action.ruleId,
        action.newRegex,
        action.newHide,
      );
      break;
  }

  return draft;
});
