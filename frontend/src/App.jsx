import React from 'react';
import './App.css';

import Dashboard from './components/Dashboard/Dashboard';
import Logout from './components/Logout/Logout';
import LoginRegisterTabbed from './components/LoginRegisterTabbed/LoginRegisterTabbed';
import useToken from './components/App/useToken';

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return (
      <LoginRegisterTabbed setToken={setToken} />
    );
  }

  return (
    <div className="wrapper">
      <div>
        <Logout />
      </div>
      <div>
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
