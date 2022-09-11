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
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Login" {...a11yProps(0)} />
          <Tab label="Sign Up" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
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
      </TabPanel>
      <TabPanel value={value} index={1}>
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
      </TabPanel>
    </Box>
  );
}

LoginRegisterTabbed.propTypes = {
  setToken: PropTypes.func.isRequired,
};
