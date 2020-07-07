import debounce from 'lodash-es/debounce';
import find from 'lodash-es/find';
import { assert, assertIsDefined } from './base';
import type { RepoList } from './options/model';

type ConfigRule = {
  regex: RegExp;
  hide: boolean;
};

type Config = {
  repo: string;
  rules: readonly ConfigRule[];
};

let configs: readonly Config[] = [];

// Detect when the url changes.
// We're only interested in running the autoapprove process when
// we're on `github.com/<owner>/<repo>/pull/<pull-id>/files` but we need
// to be installed on `github.com/<owner/<repo>/pull/<pull-id>/*` because
// github navigates to the different sections of a PR using javascript.
let oldHref = document.location.href;
let oldFilesCount = 0;
const observer = new MutationObserver((mutations) => {
  mutations.forEach(() => {
    if (oldHref != document.location.href) {
      oldHref = document.location.href;
      if (shouldActivate()) {
        markAllAsViewed();
      }
    } else if (shouldActivate()) {
      const filesCount = document.getElementsByClassName('file').length;
      if (oldFilesCount != filesCount) {
        markAllAsViewed();
      }
    }
  });
});
const bodyEl = document.querySelector('body');
assertIsDefined(bodyEl, '"body" elements must exist');
observer.observe(bodyEl, {
  childList: true,
  subtree: true,
});

function findRepoConfig(): Config | undefined {
  const pathname = window.location.pathname.toLowerCase();
  return find(configs, (config) => pathname.startsWith(`/${config.repo}/`));
}

function shouldActivate(): boolean {
  return window.location.pathname.endsWith('/files') && !!findRepoConfig();
}

const markAllAsViewed = debounce(() => {
  const config = findRepoConfig();
  assertIsDefined(config, '"config" should exist');
  const fileElements = document.getElementsByClassName(
    'file',
  ) as HTMLCollectionOf<HTMLDivElement>;
  oldFilesCount = fileElements.length;
  for (let fileElement of fileElements) {
    if (!fileElement.id.startsWith('diff-')) {
      continue;
    }
    try {
      const filename = extractFilename(fileElement);

      config.rules.forEach((rule) => {
        if (rule.regex.test(filename)) {
          markAsViewed(filename, fileElement);
          if (rule.hide) {
            hideFile(fileElement);
          }
        }
      });
    } catch (error) {
      // This error normally happens because GitHub uses `file` class for some hidden comment components
      console.error('Cannot find filename for:', fileElement);
    }
  }
}, 200);

function extractFilename(fileElement: HTMLDivElement) {
  return fileElement.getElementsByTagName('a')[0].title;
}

function markAsViewed(filename: string, fileElement: HTMLDivElement) {
  try {
    const formElement = fileElement.getElementsByTagName('form')[0];
    const viewedCheckboxElement = formElement.querySelector(
      'input[name="viewed"]',
    );
    assertIsDefined(viewedCheckboxElement, '"viewed" checkbox must exist');
    assert(
      viewedCheckboxElement instanceof HTMLInputElement,
      '"viewed" element must be a checkbox',
    );
    // Only click on the checkbox if it isn't checked, otherwise we would
    // toggle the current value.
    if (!viewedCheckboxElement.checked) {
      formElement.getElementsByTagName('label')[0].click();
    }
  } catch (error) {
    console.error('Cannot process: ', filename, error);
  }
}

function hideFile(fileElement: HTMLDivElement) {
  fileElement.style.display = 'none';
}

chrome.storage.sync.get(['db'], (result) => {
  const repoList: RepoList =
    'db' in result ? (result.db as RepoList) : { repos: [] };
  configs = repoList.repos.map((repo) => ({
    repo: repo.name,
    rules: repo.rules.map((rule) => ({
      regex: new RegExp(rule.regex),
      hide: rule.hide,
    })),
  }));
  if (shouldActivate()) {
    markAllAsViewed();
  }
});
