import React from 'react';
import Class from './Class';
import './ClassList.css';

export default function ClassList() {
  return (
    <>
      <h1>My Classes</h1>
      <Class name="MATH 125" lec="lec A1" />
      <Class name="CMPUT 224" lec="lec 121" />
    </>
  );
}
