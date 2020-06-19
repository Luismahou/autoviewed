import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Main } from './options/main';

const App = () => (
  <React.Fragment>
    <CssBaseline />
    <Main />
  </React.Fragment>
);

ReactDOM.render(<App />, document.getElementById('app'));
