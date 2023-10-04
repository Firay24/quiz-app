/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/style-prop-object */
import React from 'react';
import Button from 'components/Button';
import PropTypes from 'prop-types';

function PreQuiz({ onClickStart }) {
  const handleClikButton = () => {
    onClickStart(true);
  };

  return (
    <div className="flex flex-col items-center m-auto">
      <div className="w-1/2 text-lg text-center">
        <p>
          It is a long established fact that a reader will be distracted by the readable content
          of a page when looking at its layout. The point of using Lorem Ipsum is that it has a
          more-or-less normal distribution of letters, as opposed to using Content here, content
          here, making it look like readable English. Many desktop publishing packages and web page
          editors now use Lorem Ipsum as their default model text, and a search
        </p>
      </div>
      <div className="mt-5">
        <Button onClick={handleClikButton} text="Mulai" style="text-white bg-blue-500 hover:bg-blue-600" />
      </div>
      <div className="mt-5">
        <p>
          durasi kuis selama
          {' '}
          <span className="font-medium">5 menit</span>
        </p>
      </div>
    </div>
  );
}

PreQuiz.propTypes = {
  onClickStart: PropTypes.string.isRequired,
};

export default PreQuiz;
