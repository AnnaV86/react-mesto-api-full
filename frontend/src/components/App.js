import { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Main } from './Main';
import { ImagePopup } from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { EditProfilePopup } from './EditProfilePopup';
import { EditAvatarPopup } from './EditAvatarPopup';
import { AddPlacePopup } from './AddPlacePopup';
import { DeleteCardPopup } from './DeleteCardPopup';
import { Login } from './Login';
import { Register } from './Register';
import ProtectedRoute from './ProtectedRoute';
import { InfoToolTip } from './InfoTooltip';
import { signupFetch, signinFetch, validJWTFetch } from '../utils/auth';

export const App = () => {
  const navigate = useNavigate();
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [cardDelete, setCardDelete] = useState({});
  const [isInfoTooltipOpen, setInfoTooltip] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  const [login, setLogin] = useState(false);
  const [userDataAuth, setUserDataAuth] = useState({
    email: '',
  });
  const [messageAcceptAuth, setMessageAcceptAuth] = useState('');

  const handleCardLike = (oldCard) => {
    const isLiked = oldCard.likes.some((i) => i === currentUser._id);
    api.changeLikeCardStatus(oldCard._id, !isLiked).then((newCard) => {
          setCards((prev) => prev.map((card) => {
            return card._id === oldCard._id ? newCard : card}));
    });
  };

  const handleAcceptDelete = (card) => {
    setDeletePopupOpen(true);
    setCardDelete(card);
  };

  const handleCardDelete = () => {
    api
      .deleteCard(cardDelete._id)
      .then(() => {
        setCards(cards.concat().filter((el) => el._id !== cardDelete._id));
      })
      .then(setCardDelete({}))
      .then(() => closeAllPopups());
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setImagePopupOpen(true);
  };

  const closeAllPopups = () => {
    setImagePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setDeletePopupOpen(false);
    setSelectedCard({});
    setInfoTooltip(false);
  };

  const handleUpdateUser = (userData) => {
    api
      .setUserInfo(userData)
      .then((newUserData) => setCurrentUser(newUserData))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  };

  const handleUpdateAvatar = (avatarLink) => {
    api
      .setUpdateAvatar(avatarLink.avatar)
      .then((newUserData) => setCurrentUser(newUserData))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  };

  const handleAddPlaceSubmit = (card) => {
    api
      .postNewCard(card)
      .then((newCard) => {
        return setCards([newCard, ...cards])})
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  };

  const handleEscClose = (e) => {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  };

  // Регистрация
  const onRegister = async (userData) => {
    const response = await signupFetch(userData);

    if (response) {
      setMessageAcceptAuth('Вы успешно зарегистрировались!');
      setIsAccept(true);
      setInfoTooltip(true);
      navigate('/sign-in');
    } else {
      setMessageAcceptAuth('Что-то пошло не так! Попробуйте ещё раз.');
      setIsAccept(false);
      setInfoTooltip(true);
    }
  };

//  // Проверка токена
  const tokenCheck = () => {
    const token = localStorage.getItem('token');
      if (!token) {
      return false;
    }
    return validJWTFetch();
  };

 // Авторизация (вход)
  const onLogin = async (userData) => {
    const response = await signinFetch(userData);

    if (response.token) {
      setLogin(true);
      setUserDataAuth(userData);
      localStorage.setItem('token', response.token);
      navigate('/main');
    } else {
      setMessageAcceptAuth('Что-то пошло не так! Попробуйте ещё раз.');
      setIsAccept(false);
      setInfoTooltip(true);
    }
  };

  // Выход из аккаунта
  const onSignOut = () => {
    localStorage.removeItem('token');
    setLogin(false);
    setUserDataAuth({
      email: '',
    });
  };

  useEffect(() => {
       (async () => {
      const response = await tokenCheck();

      if (response) {
        setLogin(true);
        setUserDataAuth({
          email: response.email,
        });
        navigate('/main');
      }
    })();
  }, [login]);

  useEffect(() => {
    document.addEventListener('keyup', handleEscClose);
  }, []);

  useEffect(() => {
    if (login) {
      Promise.all([api.getUserInfo(), api.getCardList()])
        .then((res) => {
          const [userData, cards] = res;
          setCurrentUser(userData);
          setCards(cards);
        })
        .catch((err) => console.log(err));
    }
  }, [login]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {
        <div className='page'>
          <Header
            onSignOut={onSignOut}
            userDataAuth={userDataAuth}
            login={login}
          />
          <Routes>
            <Route
              exact
              path='/'
              element={
                login ? <Navigate to='/main' /> : <Navigate to='/sign-in' />
              }
            />
            <Route
              path='/main'
              element={
                <ProtectedRoute login={login}>
                  <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardDelete={handleAcceptDelete}
                    onCardLike={handleCardLike}
                  />
                </ProtectedRoute>
              }
            />
            <Route path='/sign-in' element={<Login onLogin={onLogin} />} />
            <Route
              path='/sign-up'
              element={<Register onRegister={onRegister} />}
            />
          </Routes>
          <InfoToolTip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            isAccept={isAccept}
            messageAcceptAuth={messageAcceptAuth}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            currentUser={currentUser}
          />
          <DeleteCardPopup
            isOpen={isDeletePopupOpen}
            onClose={closeAllPopups}
            acceptDeleteCard={handleCardDelete}
          />
          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
          />
        </div>
      }
    </CurrentUserContext.Provider>
  );
};
