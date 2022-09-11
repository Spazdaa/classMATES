/* eslint-disable linebreak-style */
import React from 'react';
import { Button } from '@mui/material';

export default function Logout() {
  const logOut = async () => {
    localStorage.setItem('token', null);
    window.location.reload();
  };

  return (
    <p>
      <Button
        variant="contained"
        component="label"
        sx={{
          backgroundColor: '#8FD14F',
          ':hover': {
            bgcolor: '#FF8966',
          },
        }}
        onClick={logOut}
      >
        Logout
      </Button>
    </p>
  );
}
