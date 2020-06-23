import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import ReactDOM from 'react-dom';
import { Main } from './options/main';

const App = () => (
  <React.Fragment>
    <CssBaseline />
    <Main />
  </React.Fragment>
);

ReactDOM.render(<App />, document.getElementById('app'));
