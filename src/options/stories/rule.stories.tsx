import React from 'react';
import { action } from '@storybook/addon-actions';
import { Rule } from '../rule';

export default {
  title: 'Rule',
  component: Rule,
};

export const Visible = () => (
  <Rule
    rule={{
      id: 1,
      regex: '^.*.proto.ts$',
      hide: false,
    }}
    onUpdateRule={action('on update rule')}
    onDeleteRule={action('on delete rule')}
  />
);

export const Hidden = () => (
  <Rule
    rule={{
      id: 1,
      regex: '^.*.proto.ts$',
      hide: true,
    }}
    onUpdateRule={action('on update rule')}
    onDeleteRule={action('on delete rule')}
  />
);
