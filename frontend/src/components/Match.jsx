import React, { useEffect } from 'react';
import {
  Box,
  Paper,
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
      <Card sx={{ mb: '10px' }}>
        <CardContent sx={{ padding: '5px' }}>
          <Typography key={classInfo.uid} variant="h6" color="#8FD14F">
            <b>{classInfo.subject}</b>
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
            <Typography variant="h4" sx={{ fontWeight: 'bold' }} color="#49306B">{match.name}</Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }} color="white" className="match">{`${match.percentage}% Match` }</Typography>
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
          <Typography variant="h4" sx={{ fontWeight: 'bold', mt: '10px' }} color="#49306B">{match.name}</Typography>
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4" className="match" sx={{ fontWeight: 'bold', mb: 2 }} color="white">{`${match.percentage}% Match` }</Typography>
          <Typography variant="subtitle1">{`${match.contactType.toUpperCase()}: ${match.contactInfo}`}</Typography>
          <Typography variant="h6"><b>Matching Classes</b></Typography>
          <Paper sx={{
            backgroundColor: 'grey.100',
            display: 'flex',
            flexDirection: 'column',
            width: '90%',
            padding: '10px',
            margin: 0,
          }}
          >
            {matchDetails ? displayClasses() : null}
          </Paper>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

Match.propTypes = {
  match: PropTypes.instanceOf(MatchInfo).isRequired,
};
