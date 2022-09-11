import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
} from 'react-router-dom';

import Dashboard from './components/Dashboard/Dashboard';
// import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import Preferences from './components/Preferences/Preferences';
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
      <h1>Application 2</h1>
      <Logout />
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/preferences">Preferences</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/preferences" element={<Preferences />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
