import React from 'react';
import ReactModal from 'react-responsive-modal';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Modal.scss';

// ReactModal.setAppElement('#root');
const classes = {
  modal: classNames('modal'),
  overlay: classNames('overlay'),
};

const Modal = ({ isOpen, onRequestClose, children }) => (
  <ReactModal
    open={isOpen}
    onClose={onRequestClose}
    classNames={classes}
  >
    {children}
  </ReactModal>
);

export default Modal;

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  children: PropTypes.element,
};

Modal.defaultProps = {
  isOpen: false,
  onRequestClose: () => { },
  children: null,
};
