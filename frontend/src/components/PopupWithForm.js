import React from 'react';
import classNames from 'classnames';

export const PopupWithForm = ({
  name,
  title,
  isOpen,
  onClose,
  onSubmit,
  children,
}) => {
  const classPopup = classNames(`popup popup_type_${name}`, {
    ['popup_opened']: isOpen,
  });

  const handleMouseDown = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={classPopup} onMouseDown={handleMouseDown}>
      <div className='popup__container'>
        <h2 className='popup__heading'>{title}</h2>
        <form
          className='popup__form'
          name={name}
          noValidate
          onSubmit={onSubmit}
        >
          {children}
        </form>
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
