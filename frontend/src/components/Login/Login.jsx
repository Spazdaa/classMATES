/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

export default function Login() {
  return (
    <div className="login-wrapper">
      <h1>Plase Log In</h1>
      <form>
        <label>
          <p>username</p>
          <input type="text" />
        </label>
        <label>
          <p>Password</p>
          <input type="password" />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
