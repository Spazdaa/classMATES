/* eslint-disable linebreak-style */
import React from 'react';

export default function Logout() {
  const logOut = async () => {
    localStorage.setItem('token', null);
    window.location.reload();
  };

  return (
    <p>
      <button type="button" onClick={logOut}>Logout</button>
    </p>
  );
}
