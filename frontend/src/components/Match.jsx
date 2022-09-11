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
import api from '../api/api';

export default function Match(props) {
  const { match } = props;
  const [matchOpen, setMatchOpen] = React.useState(false);
  const [matchDetails, setMatchDetails] = React.useState(undefined);

  useEffect(async () => {
    if (matchOpen) {
      setMatchDetails(await api.getMatchDetails(match.uid));
    }
  }, [matchOpen]);

  function displayClasses() {
    return matchDetails.matched_classes_all_section.map((classInfo) => (
      <Card sx={{ mb: '10px' }}>
        <CardContent sx={{ padding: '5px' }}>
          <Typography key={classInfo.uid} variant="h6" color="#8FD14F">
            <b>{classInfo.course}</b>
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
            <Typography variant="h4" sx={{ fontWeight: 'bold' }} color="#49306B">{match?.username}</Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }} color="white" className="match">{`${match?.percentage}% Match` }</Typography>
            <Typography variant="subtitle1">{`${match?.contact_type?.toUpperCase()}: ${match?.contact_info}`}</Typography>
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
          <Typography variant="h4" sx={{ fontWeight: 'bold', mt: '10px' }} color="#49306B">{match?.username}</Typography>
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4" className="match" sx={{ fontWeight: 'bold', mb: 2 }} color="white">{`${match?.percentage}% Match` }</Typography>
          <Typography variant="subtitle1">{`${match?.contact_type?.toUpperCase()}: ${match?.contact_info}`}</Typography>
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
  match: PropTypes.shape({
    uid: PropTypes.string,
    username: PropTypes.string,
    percentage: PropTypes.string,
    contact_type: PropTypes.string,
    contact_info: PropTypes.string,
  }).isRequired,
};
