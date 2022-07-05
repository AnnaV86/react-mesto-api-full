import { useRef, useState, useEffect } from 'react';
import { PopupWithForm } from './PopupWithForm';
import classNames from 'classnames';

export const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const avatarRef = useRef();
  const [isLinkValid, setLinkValid] = useState(false);
  const [linkErrorMessage, setLinkErrorMessage] = useState('');
  const [buttonText, setButtonText] = useState('Сохранить');
  const classErrorLink = classNames(`avatarLink-error popup__error`, {
    ['popup__error_visible']: !isLinkValid,
  });
  const classPopupButton = classNames(`popup__button`, {
    ['popup__button_disabled']: !isLinkValid,
  });

  const handleChangeLink = (e) => {
    checkLinkValidation(e.target);
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
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    avatarRef.current.value = '';
  };

  useEffect(() => {
    avatarRef.current.value = '';
    setButtonText('Сохранить');
  }, [isOpen]);

  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        className='popup__input'
        type='url'
        name='avatarLink'
        id='avatarLink'
        placeholder='Ссылка на картинку'
        required
        onChange={handleChangeLink}
      />
      <span className={classErrorLink}>{linkErrorMessage}</span>
      <button className={classPopupButton} type='submit'>
        {buttonText}
      </button>
    </PopupWithForm>
  );
};
