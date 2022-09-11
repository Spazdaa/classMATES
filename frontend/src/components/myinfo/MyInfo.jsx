import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './MyInfo.css';
import api from '../../api/api';

export default function MyInfo() {
  const [post, setPost] = React.useState(null);

  React.useEffect(async () => {
    await api.getMatchDetails('self').then((response) => {
      setPost(JSON.parse(response));
    });
  }, []);

  if (!post) return null;
  return (
    <Card className="infocard" style={{ backgroundColor: '#8FD14F' }}>
      <CardContent>
        <Typography color="white">
          Welcome,
        </Typography>
        <Typography variant="h4" component="div" className="name">
          <b>{post.username}</b>
        </Typography>
        <Typography color="white">
          {`${post.contact_type?.toUpperCase()}: ${post.contact_info}`}
        </Typography>
      </CardContent>
    </Card>
  );
}
