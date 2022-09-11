import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import Match from './Match';
import api from '../api/api';

export default function MatchList() {
  const [matches, setMatches] = useState([]);
  useEffect(async () => {
    await api.getMatches(1, 30).then((response) => {
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
      {matches.length ? (
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
      ) : (
        <Box
          sx={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 'auto', mb: 2,
          }}
        >
          <Typography variant="h5"><b>Upload your .ics file from BearTracks first!</b></Typography>
          <KeyboardDoubleArrowDownIcon />
        </Box>
      )}
    </Paper>
  );
}
