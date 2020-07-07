import { Box, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';

export const PopupMessage = ({
  isConfigured,
  optionsUrl,
}: {
  isConfigured: boolean;
  optionsUrl: string;
}) => (
  <div style={{ minWidth: 300 }}>
    {isConfigured ? (
      <Alert severity="info">
        Thanks for using this extension! Make sure you configure your
        repositories properly to get the most out of this extension
      </Alert>
    ) : (
      <Alert severity="error">
        The extension hasn't been configured yet. Go to settings for the initial
        set up.
      </Alert>
    )}
    <Box p={1} display="flex" justifyContent="flex-end">
      <Button
        href="https://github.com/Luismahou/autoviewed#introduction"
        target="_blank"
        rel="noreferrer"
      >
        I need help
      </Button>
      <Box pl={1}>
        <Button href={optionsUrl} target="_blank" rel="noreferrer">
          Settings
        </Button>
      </Box>
    </Box>
  </div>
);
