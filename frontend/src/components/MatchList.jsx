import React, { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import Match from './Match';
import api from '../api/api';

export default function MatchList() {
  const [matches, setMatches] = useState([]);
  useEffect(async () => {
    await api.getMatches(1, 5).then((response) => {
      setMatches(response);
    });
  }, []);

  return (
    <Paper sx={{
      backgroundColor: 'grey.100',
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '50px',
      height: '75%',
      overflowY: 'scroll',
      '&::-webkit-scrollbar': {
        display: null,
      },
    }}
    >
      <Paper sx={{
        backgroundColor: 'grey.100',
        display: 'flex',
        flexDirection: 'column',
      }}
      >
        {matches.map((match) => {
          const parsedMatch = JSON.parse(match);
          return <Match key={parsedMatch.uid} match={parsedMatch} />;
        })}
      </Paper>
    </Paper>
  );
}
