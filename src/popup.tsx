import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import ReactDOM from 'react-dom';
import { PopupMessage } from './popup/popup-message';

chrome.storage.sync.get(['db'], (result) => {
  const isConfigured = 'db' in result ? result.db.repos.length > 0 : false;

  const App = () => (
    <React.Fragment>
      <CssBaseline />
      <PopupMessage
        isConfigured={isConfigured}
        optionsUrl={chrome.runtime.getURL('options.html')}
      />
    </React.Fragment>
  );

  ReactDOM.render(<App />, document.getElementById('app'));
});
