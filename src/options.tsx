import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import ReactDOM from 'react-dom';
import { Main } from './options/main';
import { RepoList } from './options/model';

chrome.storage.sync.get(['db'], (result) => {
  const initialRepoList = 'db' in result ? result.db : { repos: [] };

  const onChange = (repoList: RepoList) => {
    chrome.storage.sync.set({ db: repoList });
  };

  const App = () => (
    <React.Fragment>
      <CssBaseline />
      <Main onChange={onChange} initialRepoList={initialRepoList} />
    </React.Fragment>
  );

  ReactDOM.render(<App />, document.getElementById('app'));
});
