/* eslint-disable linebreak-style */
import React from 'react';
import './Dashboard.css';
import { Box } from '@mui/material';
import ClassList from '../classlist/ClassList';
import UploadIcs from '../UploadIcs';
import MyInfo from '../myinfo/MyInfo';
import MatchList from '../MatchList';
import Logout from '../Logout/Logout';

export default function Dashboard() {
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
          <MatchList />
          <UploadIcs />
        </Box>
      </Box>
    </div>
  );
}
