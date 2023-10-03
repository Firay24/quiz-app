/* eslint-disable react/require-default-props */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Button({ text, style, onClick }) {
  return (
    <button onClick={onClick} className={`py-2 px-5 rounded-full ${style}`}>
      <Link>{ text }</Link>
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Button;
