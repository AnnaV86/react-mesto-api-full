import { useState, useContext, useEffect } from 'react';
import { PopupWithForm } from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import classNames from 'classnames';

export const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isNameValid, setNameValid] = useState(true);
  const [isDescriptionValid, setDescriptionValid] = useState(true);
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [descriptionErrorMessage, setDescriptionErrorMessage] = useState('');
  const [buttonText, setButtonText] = useState('Сохранить');
  const classErrorName = classNames(`profName-error popup__error`, {
    ['popup__error_visible']: !isNameValid,
  });
  const classErrorAboutMe = classNames(`profAboutMe-error popup__error`, {
    ['popup__error_visible']: !isDescriptionValid,
  });

  const classPopupButton = classNames(`popup__button`, {
    ['popup__button_disabled']: !isNameValid || !isDescriptionValid,
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

  const handleChangeDescription = (e) => {
    checkDescriptionValidation(e.target);
    setDescription(e.target.value);
  };

  const checkDescriptionValidation = (newText) => {
    if (!newText.validity.valid) {
      setDescriptionErrorMessage(newText.validationMessage);
      setDescriptionValid(false);
    } else {
      setDescriptionValid(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonText('Сохранение...');
    onUpdateUser({
      name,
      about: description,
    });
  };

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    setButtonText('Сохранить');
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name='profile'
      title='Редактировать профиль'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className='popup__input'
        type='text'
        name='profileName'
        id='profName'
        required
        minLength='2'
        maxLength='30'
        value={name || ''}
        onChange={handleChangeName}
      />
      <span className={classErrorName}>{nameErrorMessage}</span>
      <input
        className='popup__input'
        type='text'
        name='profileAboutMe'
        id='profAboutMe'
        required
        minLength='2'
        maxLength='200'
        value={description || ''}
        onChange={handleChangeDescription}
      />
      <span className={classErrorAboutMe}>{descriptionErrorMessage}</span>
      <button className={classPopupButton} type='submit' disabled={(!isNameValid || !isDescriptionValid) ?  true : false}>
        {buttonText}
      </button>
    </PopupWithForm>
  );
};
