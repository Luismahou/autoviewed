import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { RepoList as RepoListModel } from './model';
import { RepoList } from './repo-list';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
}));

export const Main = ({
  onChange,
  initialRepoList,
}: {
  onChange: (initialRepoList: RepoListModel) => void;
  initialRepoList: RepoListModel;
}) => {
  const classes = useStyles();
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6">
            Autoviewed options
          </Typography>
          <Button
            href="https://github.com/Luismahou/autoviewed#introduction"
            target="_blank"
            rel="noreferrer"
            color="inherit"
          >
            I need help
          </Button>
        </Toolbar>
      </AppBar>
      <Box p={1} />
      <Container>
        <RepoList
          extensionId={chrome.runtime.id}
          onChange={onChange}
          initialRepoList={initialRepoList}
        />
      </Container>
    </>
  );
};
