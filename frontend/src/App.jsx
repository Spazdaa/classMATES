import React, { useEffect, useState } from 'react';
import api from './api/api';
import MatchList from './components/MatchList';

function App() {
  const [matches, setMatches] = useState([]);
  useEffect(() => {
    api.getMatches(1, 5).then((response) => {
      setMatches(response);
    });
  }, []);

  return (
    <div className="App">
      <MatchList matches={matches} />
    </div>
  );
}

export default App;
