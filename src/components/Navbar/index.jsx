/* eslint-disable react/prop-types */
import React from 'react';
import Progress from 'components/Progress';
import Timer from 'components/Timer';
import Profile from 'components/Profile';

function Navbar({ countDone }) {
  return (
    <div className="flex justify-between mx-10 my-5">
      <div className="font-medium">
        <p>Unit 3 Practice Test 3</p>
      </div>
      <div>
        <Progress countDone={countDone} />
      </div>
      <div className="flex gap-x-5">
        <div>
          <Timer />
        </div>
        <div>
          <Profile />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
