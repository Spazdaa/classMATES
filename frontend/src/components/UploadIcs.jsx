import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import api from '../api/api';

export default function UploadIcs() {
  const [filename, setFilename] = React.useState('No file chosen');

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(filename);
    const reader = new FileReader();
    if (filename !== 'No file chosen') {
      reader.readAsText(filename);
      reader.onload = async (e) => {
        // eslint-disable-next-line no-console
        console.log(e.target.result);
        await api.uploadIcs(e.target.result);
      };
    }
  }, [filename]);

  return (
    <Button
      variant="contained"
      component="label"
      sx={{
        height: '15%',
        backgroundColor: '#49306B',
        marginLeft: '20px',
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
