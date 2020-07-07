import React from 'react';
import { PopupMessage } from '../popup-message';

export default {
  title: 'Popup Message',
  component: PopupMessage,
};

export const configured = () => (
  <PopupMessage isConfigured={true} optionsUrl="http://www.example.com" />
);

export const notConfigured = () => (
  <PopupMessage isConfigured={false} optionsUrl="http://www.example.com" />
);
