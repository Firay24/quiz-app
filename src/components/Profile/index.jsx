/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { BsPersonCircle } from 'react-icons/bs';

function Profile() {
  return (
    <div className="flex items-center gap-x-2">
      <div className="text-gray-500">
        <BsPersonCircle />
      </div>
      <div className="text-gray-800">
        <p>Fira Yusi</p>
      </div>
    </div>
  );
}

export default Profile;
