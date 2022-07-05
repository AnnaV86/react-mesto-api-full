import React from 'react';
import classNames from 'classnames';
import acceptIcon from '../images/accept.svg';
import crossIcon from '../images/cross.svg';

export const InfoToolTip = ({
  isOpen,
  onClose,
  isAccept,
  messageAcceptAuth,
}) => {
  const classPopup = classNames(`popup popup_type_infoTooltip`, {
    ['popup_opened']: isOpen,
  });

  const handleMouseDown = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={classPopup} onMouseDown={handleMouseDown}>
      <div className='popup__container popup__container-info'>
        <div className='popup__form'>
          <img
            className='info__image'
            src={isAccept ? acceptIcon : crossIcon}
          />
          <h1 className='info__message'>{messageAcceptAuth}</h1>
        </div>
        <button
          aria-label='Close'
          className='popup__close'
          type='button'
          onClick={() => onClose(false)}
        ></button>
      </div>
    </div>
  );
};
