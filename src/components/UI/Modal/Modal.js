import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';

import './Modal.scss';

ReactModal.setAppElement('#root');

const Modal = ({ isOpen, onRequestClose, children }) => (
  <ReactModal
    isOpen={isOpen}
    shouldCloseOnEsc
    onRequestClose={onRequestClose}
    className="modal"
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
