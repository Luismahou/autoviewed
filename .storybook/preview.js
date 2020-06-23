import React from 'react';
import { addDecorator } from '@storybook/react';
import CssBaseline from '@material-ui/core/CssBaseline';

addDecorator(storyFn => (
  <>
    <CssBaseline />
    {storyFn()}
  </>
))
