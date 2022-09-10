import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './MyInfo.css';

export default function MyInfo() {
  return (
    <Card className="card">
      <CardContent>
        <Typography color="text.secondary">
          Welcome,
        </Typography>
        <Typography variant="h4" component="div" className="classheader">
          <b>John Doe</b>
        </Typography>
        My Contact info
      </CardContent>
    </Card>
  );
}
