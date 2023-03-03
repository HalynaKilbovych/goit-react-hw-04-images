import React, { useEffect } from 'react';
import { Backdrop, ModalWrap } from './Modal.styled';
import PropTypes from 'prop-types';

export const Modal = ({ image, tags, onClick }) => {

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClick();
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClick]);

  const handleClose = event => {
    if (event.target === event.currentTarget) {
      onClick();
    }
  };

  return (
    <Backdrop onClick={handleClose}>
      <ModalWrap>
        <img src={image} alt={tags} />
      </ModalWrap>
    </Backdrop>
  );
};

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  tags: PropTypes.string.isRequired,
};