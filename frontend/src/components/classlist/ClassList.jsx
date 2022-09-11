import React from 'react';
import { Box, Paper } from '@mui/material';
import Class from './Class';
import './ClassList.css';
import api from '../../api/api';

export default function ClassList() {
  const [post, setPost] = React.useState(null);

  React.useEffect(async () => {
    await api.getMatchDetails('self').then((response) => {
      setPost(response);
    });
  }, []);

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
        <Box>
          {
          post.matched_classes_all_section?.map(
            (myClass) => <Class name={myClass.course} lec={myClass.section} />,
          )
        }
        </Box>
      </Paper>
    </>
  );
}
