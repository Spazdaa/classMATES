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
    <>
      <h2 className="classtitle">My Classes</h2>
      <Paper
        className="classList"
        sx={{
          backgroundColor: '#3b2559',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <box>
          {
          post.slice(0, 6).map((myClass) => <Class name={myClass.name} lec={myClass.username} />)
        }
        </box>
      </Paper>
    </>
  );
}
