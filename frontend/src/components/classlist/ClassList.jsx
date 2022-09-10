import React from 'react';
import axios from 'axios';
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
    <div className="classList">
      <h2>My Classes</h2>
      {
        post.map((myClass) => <Class name={myClass.name} lec={myClass.username} />)
      }
    </div>
  );
}
