import { useEffect, useState } from 'react';
import { PopupWithForm } from './PopupWithForm';
import classNames from 'classnames';

export const AddPlacePopup = ({ isOpen, onClose, onAddPlace, currentUser }) => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [isNameValid, setNameValid] = useState(false);
  const [isLinkValid, setLinkValid] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [linkErrorMessage, setLinkErrorMessage] = useState('');
  const [buttonText, setButtonText] = useState('Сохранить');
  const classErrorName = classNames(`placeName-error popup__error`, {
    ['popup__error_visible']: !isNameValid,
  });
  const classErrorLink = classNames(`placeLink-error popup__error`, {
    ['popup__error_visible']: !isLinkValid,
  });
  const classPopupButton = classNames(`popup__button`, {
    ['popup__button_disabled']: !isNameValid || !isLinkValid,
  });

  const handleChangeName = (e) => {
    checkNameValidation(e.target);
    setName(e.target.value);
  };

  const checkNameValidation = (newName) => {
    if (!newName.validity.valid) {
      setNameErrorMessage(newName.validationMessage);
      setNameValid(false);
    } else {
      setNameValid(true);
    }
  };

  const handleChangeLink = (e) => {
    checkLinkValidation(e.target);
    setLink(e.target.value);
  };

  const checkLinkValidation = (newLink) => {
    if (!newLink.validity.valid) {
      setLinkErrorMessage(newLink.validationMessage);
      setLinkValid(false);
    } else {
      setLinkValid(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonText('Сохранение...');
    onAddPlace({
      name,
      link,
    });
    setName('');
    setLink('');
    setLinkValid(false);
    setNameValid(false);
  };

  useEffect(() => {
    setName('');
    setLink('');
    setButtonText('Сохранить');
  }, [isOpen]);

  return (
    <PopupWithForm
      name='place'
      title='Новое место'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className='popup__input'
        type='text'
        name='placeName'
        id='placeName'
        value={name}
        placeholder='Название'
        required
        minLength='2'
        maxLength='30'
        onChange={handleChangeName}
      />
      <span className={classErrorName}>{nameErrorMessage}</span>
      <input
        className='popup__input'
        type='url'
        name='placeLink'
        id='placeLink'
        value={link}
        placeholder='Ссылка на картинку'
        required
        onChange={handleChangeLink}
      />
      <span className={classErrorLink}>{linkErrorMessage}</span>
      <button className={classPopupButton} type='submit' disabled={(!isNameValid || !isLinkValid) ?  true : false}>
        {buttonText}
      </button>
    </PopupWithForm>
  );
};
