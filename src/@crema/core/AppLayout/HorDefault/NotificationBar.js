import React from 'react';
import {Alert} from 'antd';

export default function NotificationBar() {
  const onClose = () => {
    console.log('I was closed.');
  };

  return (
    <Alert
      className='header-alert'
      message=' Get flat 60% off on your first purchase'
      type='warning'
      closable
      onClose={onClose}
    />
  );
}
