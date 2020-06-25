import { action } from '@storybook/addon-actions';
import React from 'react';
import { RepoList } from '../repo-list';

export default {
  title: 'Repo list',
  component: RepoList,
};

export const Interactive = () => {
  return (
    <RepoList onChange={action('on change')} initialRepoList={{ repos: [] }} />
  );
};
