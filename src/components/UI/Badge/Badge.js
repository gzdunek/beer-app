import React from 'react';
import PropTypes from 'prop-types';

import './Badge.scss';

const Badge = ({ backgroundColor, name, value }) => (
  <div className="badge" style={{ backgroundColor }}>
    <div className="badge__name">{name}</div>
    <div className="badge__value">{value}</div>
  </div>
);

export default Badge;

Badge.propTypes = {
  backgroundColor: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
};

Badge.defaultProps = {
  backgroundColor: 'black',
  name: '',
  value: '',
};
