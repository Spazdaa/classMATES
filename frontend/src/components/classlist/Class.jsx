import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import './Class.css';

export default function Class(props) {
  const { name, lec } = props;
  return (
    <Card className="card">
      <CardContent>
        <Typography variant="h5" component="div" className="classheader">
          <b>{name}</b>
        </Typography>
        <Typography color="text.secondary">
          {lec}
        </Typography>
      </CardContent>
    </Card>
  );
}

Class.propTypes = {
  name: PropTypes.string,
  lec: PropTypes.string,
};

Class.defaultProps = {
  name: 'Class',
  lec: 'A1',
};
