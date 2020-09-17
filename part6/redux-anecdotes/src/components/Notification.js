import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const style = notification
    ? {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
      }
    : null;

  return <div style={style}>{notification}</div>;
};

export default Notification;
