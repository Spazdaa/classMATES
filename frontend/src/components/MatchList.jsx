import React from 'react';
import PropTypes from 'prop-types';
import { Box, Paper } from '@mui/material';
import { Match, MatchInfo } from './Match';

export default function MatchList(props) {
  const { matches } = props;
  return (
    <Box sx={{
      height: '25%',
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
        {matches.map((match) => (
          <Match key={match.uid} match={match} />
        ))}
      </Paper>
    </Box>
  );
}

MatchList.propTypes = {
  matches: PropTypes.arrayOf(PropTypes.instanceOf(MatchInfo)).isRequired,
};
