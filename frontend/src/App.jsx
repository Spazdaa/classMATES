import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import api from './api/api';
import MatchList from './components/MatchList';
import ClassList from './components/classlist/ClassList';
import './App.css';
import MyInfo from './components/myinfo/MyInfo';

function App() {
  const [matches, setMatches] = useState([]);
  useEffect(() => {
    api.getMatches(1, 5).then((response) => {
      setMatches(response);
    });
  }, []);

  return (
    <div className="App">
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
          <MyInfo />
          <ClassList />
        </Box>

        <MatchList matches={matches} />
      </Box>
    </div>
  );
}

export default App;
