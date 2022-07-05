import React from 'react';
import { PopupWithForm } from './PopupWithForm';

export const DeleteCardPopup = ({ isOpen, onClose, acceptDeleteCard }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    acceptDeleteCard();
  };

  return (
    <PopupWithForm
      name='delete'
      title='Вы уверены?'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <button className='popup__button' type='submit'>
        Да
      </button>
    </PopupWithForm>
  );
};
