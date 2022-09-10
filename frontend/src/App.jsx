import React, { useEffect, useState } from 'react';
import api from './api/api';
import MatchList from './components/MatchList';
import ClassList from './components/classlist/ClassList';
import UploadIcs from './components/UploadIcs';

function App() {
  const [matches, setMatches] = useState([]);
  useEffect(() => {
    api.getMatches(1, 5).then((response) => {
      setMatches(response);
    });
  }, []);

  return (
    <div className="App">
      <ClassList />
      <MatchList matches={matches} />
      <UploadIcs />
    </div>
  );
}

export default App;
