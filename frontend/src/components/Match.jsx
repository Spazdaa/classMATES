import React, { useEffect } from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import api, { MatchInfo } from '../api/api';

export default function Match(props) {
  const { match } = props;
  const [matchOpen, setMatchOpen] = React.useState(false);
  const [matchDetails, setMatchDetails] = React.useState(undefined);
  // eslint-disable-next-line no-console
  console.log(matchOpen);

  useEffect(async () => {
    if (matchOpen) {
      setMatchDetails(await api.getMatchDetails(match.uid));
      // eslint-disable-next-line no-console
      console.log(matchDetails);
    }
  }, [matchOpen]);

  function displayClasses() {
    return matchDetails.classes.map((classInfo) => (
      <Card>
        <CardContent>
          <Typography key={classInfo.uid} variant="body2" color="text.secondary">
            {classInfo.subject}
          </Typography>
          <Typography key={classInfo.uid} variant="body2" color="text.secondary">
            {classInfo.number}
          </Typography>
          <Typography key={classInfo.uid} variant="body2" color="text.secondary">
            {classInfo.section}
          </Typography>
        </CardContent>
      </Card>
    ));
  }

  return (
    <Box>
      <Card elevation={2} sx={{ m: 2 }}>
        <CardActionArea onClick={() => setMatchOpen(true)}>
          <CardContent>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{match.name}</Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>{`${match.percentage}% Match` }</Typography>
            <Typography variant="subtitle1">{`${match.contactType.toUpperCase()}: ${match.contactInfo}`}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Dialog
        open={matchOpen}
        onClose={() => setMatchOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{match.name}</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>{`${match.percentage}% Match` }</Typography>
          <Typography variant="subtitle1">{`${match.contactType.toUpperCase()}: ${match.contactInfo}`}</Typography>
          <Typography variant="subtitle1">Matching Classes:</Typography>
          {matchDetails ? displayClasses() : null}
        </DialogContent>
      </Dialog>
    </Box>
  );
}

Match.propTypes = {
  match: PropTypes.instanceOf(MatchInfo).isRequired,
};
