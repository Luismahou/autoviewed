import { AppBar, Box, Container, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { RepoList as RepoListModel } from './model';
import { RepoList } from './repo-list';

export const Main = ({
  onChange,
  initialRepoList,
}: {
  onChange: (initialRepoList: RepoListModel) => void;
  initialRepoList: RepoListModel;
}) => (
  <>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Autoviewed options</Typography>
      </Toolbar>
    </AppBar>
    <Box p={1} />
    <Container>
      <RepoList onChange={onChange} initialRepoList={initialRepoList} />
    </Container>
  </>
);
