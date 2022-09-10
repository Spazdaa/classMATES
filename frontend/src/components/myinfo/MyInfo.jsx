import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './MyInfo.css';

export default function MyInfo() {
  return (
    <Card className="infocard" style={{ backgroundColor: '#8FD14F' }}>
      <CardContent>
        <Typography color="white">
          Welcome,
        </Typography>
        <Typography variant="h4" component="div" className="name">
          <b>John Doe</b>
        </Typography>
        <Typography color="white">
          My Contact info
        </Typography>
      </CardContent>
    </Card>
  );
}
