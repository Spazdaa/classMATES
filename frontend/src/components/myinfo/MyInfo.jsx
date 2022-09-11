import React from 'react';
import Card from '@mui/material/Card';
import axios from 'axios';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './MyInfo.css';

export default function MyInfo() {
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        setPost(response.data);
      });
  });

  if (!post) return null;
  return (
    <Card className="infocard" style={{ backgroundColor: '#8FD14F' }}>
      <CardContent>
        <Typography color="white">
          Welcome,
        </Typography>
        <Typography variant="h4" component="div" className="name">
          <b>John Doe </b>
        </Typography>
        <Typography color="white">
          My Contact info
        </Typography>
      </CardContent>
    </Card>
  );
}
