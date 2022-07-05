import React from 'react';
import classNames from 'classnames';

export const ImagePopup = ({ card, isOpen, onClose }) => {
  const { name, link } = card;
  const classPopup = classNames(`popup popup_type_img`, {
    ['popup_opened']: isOpen,
  });

  const handleMouseDown = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={classPopup} onMouseDown={handleMouseDown}>
      <div className='popup__container-img'>
        <img className='popup__photo-img' src={link} />
        <h2 className='popup__title-img'>{name}</h2>
        <button
          aria-label='Close'
          className='popup__close'
          type='button'
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
};
