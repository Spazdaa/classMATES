/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import 'core-js/stable';

async function loginUser(credentials) {
  return fetch('http://127.0.0.1:8000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
    .then((data) => data.json());
}

async function registerUser(credentials) {
  return fetch('http://127.0.0.1:8000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
    .then((data) => data.json());
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  // eslint-disable-next-line camelcase
  const [contact_type, setContactType] = useState();
  // eslint-disable-next-line camelcase
  const [contact_info, setContactInfo] = useState();

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    setToken(token);
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    const token = await registerUser({
      username,
      password,
      contact_type,
      contact_info,
    });
    setToken(token);
  };

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmitLogin}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={(e) => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Log in</button>
        </div>
      </form>
      <hr />
      <h1>Please Sign up</h1>
      <form onSubmit={handleSubmitRegister}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label>
          <p>Contact Type</p>
          <input type="text" onChange={(e) => setContactType(e.target.value)} />
        </label>
        <label>
          <p>Contact Info</p>
          <input type="text" onChange={(e) => setContactInfo(e.target.value)} />
        </label>
        <div>
          <button type="submit">Sign up</button>
        </div>
      </form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
