import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import api from '../api/api';

export default function UploadIcs() {
  const [filename, setFilename] = React.useState('No file chosen');

  useEffect(() => {
    const reader = new FileReader();
    if (filename !== 'No file chosen') {
      reader.readAsText(filename);
      reader.onload = async (e) => {
        await api.deleteIcs();
        await api.uploadIcs(e.target.result);
        window.location.reload();
      };
    }
  }, [filename]);

  return (
    <Button
      variant="contained"
      component="label"
      sx={{
        height: '15%',
        backgroundColor: '#8FD14F',
        marginLeft: '45px',
        ':hover': {
          bgcolor: '#FF8966',
        },
      }}
    >
      <b>{'Add your schedule >///<'}</b>
      <span>
        <input hidden accept=".ics" type="file" onChange={(e) => { setFilename(e.target.files[0]); }} />
      </span>
    </Button>
  );
}
