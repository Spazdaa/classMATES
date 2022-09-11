/* eslint-disable linebreak-style */
import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { Box } from '@mui/material';
import api from '../../api/api';
import ClassList from '../classlist/ClassList';
import UploadIcs from '../UploadIcs';
import MyInfo from '../myinfo/MyInfo';
import MatchList from '../MatchList';
import Logout from '../Logout/Logout';

export default function Dashboard() {
  const [matches, setMatches] = useState([]);
  useEffect(() => {
    api.getMatches(1, 5).then((response) => {
      setMatches(response);
    });
  }, []);

  return (
    <div className="App">
      <div className="stripe" />
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
      >
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '10px',
          paddingTop: '0px',
        }}
        >
          <Logout />
          <MyInfo />
          <ClassList />
        </Box>

        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '93vh',
          justifyContent: 'space-between',
        }}
        >
          <h2 className="mymatches">My Matches</h2>
          <MatchList matches={matches} />
          <UploadIcs />
        </Box>
      </Box>
    </div>
  );
}
