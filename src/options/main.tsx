import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { RepoList } from './repo-list';

export const Main = () => (
  <>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Autoviewed options</Typography>
      </Toolbar>
    </AppBar>
    <Box p={1} />
    <Container>
      <RepoList />
    </Container>
  </>
);
