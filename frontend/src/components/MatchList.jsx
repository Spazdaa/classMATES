import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@mui/material';
import { Match, MatchInfo } from './Match';

export default function MatchList(props) {
  const { matches } = props;
  return (
    <Paper sx={{
      backgroundColor: 'grey.100',
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '20px',
      width: '100%',
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
    </Paper>
  );
}

MatchList.propTypes = {
  matches: PropTypes.arrayOf(PropTypes.instanceOf(MatchInfo)).isRequired,
};
