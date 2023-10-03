/* eslint-disable react/prop-types */
import React from 'react';

function Progress({ countDone }) {
  return (
    <div>{`${countDone}/5 questions`}</div>
  );
}

export default Progress;
