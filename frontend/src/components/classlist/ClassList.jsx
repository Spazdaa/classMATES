import React from 'react';
import axios from 'axios';
import { Paper } from '@mui/material';
import Class from './Class';
import './ClassList.css';

export default function ClassList() {
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        setPost(response.data);
      });
  });

  if (!post) return null;

  return (
    <Paper
      className="classList"
      sx={{
        backgroundColor: 'grey.100',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginTop: '15px',
      }}
    >
      <h2>My Classes</h2>
      <box>
        {
        post.slice(0, 6).map((myClass) => <Class name={myClass.name} lec={myClass.username} />)
      }
      </box>
    </Paper>
  );
}
