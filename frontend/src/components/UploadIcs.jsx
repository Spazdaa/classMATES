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
        await api.uploadIcs();
      };
    }
  }, [filename]);

  return (
    <Button variant="contained" component="label" sx={{ height: '15%', backgroundColor: '#8FD14F', marginLeft: '20px' }}>
      {'Add your schedule >///<'}
      <span>
        <input hidden accept=".ics" type="file" onChange={(e) => { setFilename(e.target.files[0]); }} />
      </span>
    </Button>
  );
}
