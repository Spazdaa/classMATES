import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import api, { MatchInfo } from '../api/api';

export class MatchInfo {
  constructor(uid, name, percentage, contactInfo, contactType) {
    this.uid = uid;
    this.name = name;
    this.percentage = percentage;
    this.contactInfo = contactInfo;
    this.contactType = contactType;
  }
}

export function Match(props) {
  const { match } = props;
  return (
    <Card elevation={2} sx={{ m: 2 }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{match.name}</Typography>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>{`${match.percentage}% Match` }</Typography>
        <Typography variant="subtitle1">{`${match.contactType.toUpperCase()}: ${match.contactInfo}`}</Typography>
      </CardContent>
    </Card>
  );
}

Match.propTypes = {
  match: PropTypes.instanceOf(MatchInfo).isRequired,
};
