import CssBaseline from '@material-ui/core/CssBaseline';
import { addDecorator } from '@storybook/react';
import React from 'react';

addDecorator((storyFn) => (
  <>
    <CssBaseline />
    {storyFn()}
  </>
));
