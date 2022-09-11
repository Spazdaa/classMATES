/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import 'core-js/stable';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './LoginRegisterTabbed.css';
import { Button, Paper } from '@mui/material';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

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

export default function LoginRegisterTabbed({ setToken }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  // eslint-disable-next-line camelcase
  const [contact_type, setContactType] = useState();
  // eslint-disable-next-line camelcase
  const [contact_info, setContactInfo] = useState();

  const [error, setError] = useState(false);

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });

    if (token.message) {
      setError(true);
    } else {
      setToken(token);
      setError(false);
    }
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const token = await registerUser({
        username,
        password,
        contact_type,
        contact_info,
      });

      if (token.message) {
        setError(true);
      } else {
        setToken(token);
        setError(false);
      }
    } else {
      setError(true);
    }
  };

  return (
    <Box sx={{ width: '100%' }} className="login">
      <Paper className="logincard" sx={{ boxShadow: 5 }}>
        <h1 className="logo">
          Class
          <span style={{ color: '#8FD14F' }}>MATES</span>
        </h1>
        <h5>Please Don&apos;t Use Us as a Dating App</h5>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs centered value={value} onChange={handleChange} aria-label="basic tabs example" textColor="#8FD14F" TabIndicatorProps={{ style: { backgroundColor: '#8FD14F' } }}>
            <Tab label="Login" {...a11yProps(0)} />
            <Tab label="Sign Up" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <h2>Please Log In</h2>
          {error && <Typography variant="subtitle2" color="red">Error</Typography>}
          <form onSubmit={handleSubmitLogin} className="loginform">
            <label>
              <p>Username</p>
              <input type="text" onChange={(e) => setUserName(e.target.value)} />
            </label>
            <label>
              <p>Password</p>
              <input type="password" onChange={(e) => setPassword(e.target.value)} />
            </label>
            <div>
              <Button
                type="submit"
                variant="contained"
                className="submitbutton"
                sx={{
                  backgroundColor: '#FF8966',
                  ':hover': {
                    bgcolor: '#49306B',
                  },
                }}
              >
                Log in
              </Button>
            </div>
          </form>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <h2>Please Sign up</h2>
          {error && <Typography variant="subtitle2" color="red">Error</Typography>}
          <form onSubmit={handleSubmitRegister} className="loginform">
            <label>
              <p>Username</p>
              <input type="text" onChange={(e) => setUserName(e.target.value)} />
            </label>
            <label>
              <p>Password</p>
              <input type="password" onChange={(e) => setPassword(e.target.value)} />
            </label>
            <label>
              <p>Confirm Password</p>
              <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
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
              <Button
                type="submit"
                variant="contained"
                className="submitbutton"
                sx={{
                  backgroundColor: '#FF8966',
                  ':hover': {
                    bgcolor: '#49306B',
                  },
                }}
              >
                Sign up
              </Button>
            </div>
          </form>
        </TabPanel>
      </Paper>
    </Box>
  );
}

LoginRegisterTabbed.propTypes = {
  setToken: PropTypes.func.isRequired,
};
