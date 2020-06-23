import { action } from '@storybook/addon-actions';
import React from 'react';
import { Repo } from '../repo';

export default {
  title: 'Repo',
  component: Repo,
};

const baseProps = {
  onDelete: action('on delete'),
  onEditName: action('on edit name'),
  onAddRule: action('on add rule'),
  onUpdateRule: action('on update rule'),
  onDeleteRule: action('on delete rule'),
};

export const WithoutRules = () => {
  return (
    <Repo
      {...baseProps}
      repo={{
        id: 1,
        name: 'foo/bar',
        rules: [],
      }}
    />
  );
};

export const WithRules = () => {
  return (
    <Repo
      {...baseProps}
      repo={{
        id: 1,
        name: 'foo/bar',
        rules: [
          {
            id: 1,
            regex: '^.*\\.snap$',
            hide: true,
          },
          {
            id: 2,
            regex: '^.*\\.proto\\.ts$',
            hide: false,
          },
        ],
      }}
    />
  );
};
