import React from 'react';
import PropTypes from 'prop-types';

import './FetchError.scss';

const Error = ({ message, onRetry }) => (
  <div className="error">
    <h3>Oops, someting went wrong</h3>
    <p>{message}</p>
    <button onClick={onRetry}>Retry</button>
  </div>
);

export default Error;

Error.propTypes = {
  message: PropTypes.string,
  onRetry: PropTypes.func,
};

Error.defaultProps = {
  message: '',
  onRetry: () => {},
};
