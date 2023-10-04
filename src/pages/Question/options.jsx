/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

function Options({
  answer, answerOptions, handleAnswer, isSelected,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const containerClasses = `flex items-center gap-x-3 p-2 mb-3 rounded-full
  ${isHovered ? 'border-white bg-blue-500 text-white' : 'bg-white border-gray-400'}
  ${isSelected ? 'bg-gray-400' : null}`;

  const handleClick = () => {
    handleAnswer(answer);
  };

  return (
    <div
      className={containerClasses}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="rounded-full border w-8 h-8 flex justify-center items-center p-4">
        <p>{answerOptions}</p>
      </div>
      <div>{answer}</div>
    </div>
  );
}

export default Options;
