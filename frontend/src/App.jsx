import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import api from './api/api';
import MatchList from './components/MatchList';
import ClassList from './components/classlist/ClassList';
import UploadIcs from './components/UploadIcs';

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
        <ClassList />
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
        >
          <MatchList matches={matches} />
          <UploadIcs />
        </Box>
      </Box>
    </div>
  );
}

export default App;
