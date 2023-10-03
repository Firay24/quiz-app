import React from 'react';

function question({ item }) {
  return (
    <div className="text-xl leading-8">
      <p>
        {item && item.question && item.question}
      </p>
    </div>
  );
}

export default question;
