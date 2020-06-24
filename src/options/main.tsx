import { AppBar, Box, Container, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
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
