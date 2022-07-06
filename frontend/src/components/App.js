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
import { signupFetch, signinFetch, validJWTFetch, logout } from '../utils/auth';

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

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
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
      .then((newCard) => setCards([newCard, ...cards]))
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

  // const tokenCheck = () => {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     return false;
  //   }
  //   return validJWTFetch(token);
  // };

  //Авторизация (Войти)
  const onLogin = async (userData) => {
    const response = await signinFetch(userData);
    console.log('ПОСМОТРИ ТУТ Арр', response)

    if (response) {
      console.log('ПОСМОТРИ ТУТ Арр2', response)
      setLogin(true);
      setUserDataAuth(userData);
      // localStorage.setItem('token', response.token);
      navigate('/main');
    } else {
      console.log('ПОСМОТРИ ТУТ Арр3', response)
      setMessageAcceptAuth('Что-то пошло не так! Попробуйте ещё раз.');
      setIsAccept(false);
      setInfoTooltip(true);
    }
  };

  // выход из аккаунта
  const onSignOut = async () => {
    const response = await logout()
    if (response) {
      setLogin(false);
      setUserDataAuth({
        email: '',
      });
      navigate('/sign-in');
    } else {
      console.log(`Что-то пошло не так!`);
    }
  };

  console.log(login)

  useEffect(() => {
    (async () => {
      const response = await validJWTFetch();
      console.log('я тут', response);
      if (response) {
        console.log('я тут', response)
        setLogin(true);
        setUserDataAuth({
          email: response.email,
        });
        navigate('/main');
      } else {
        setLogin(false);
        setUserDataAuth({
          email:'',
        });
        navigate('/sign-in');
      }
    })();
  }, []);

  useEffect(() => {
    document.addEventListener('keyup', handleEscClose);
  }, []);

  useEffect(() => {
    if (login) {
      Promise.all([api.getUserInfo(), api.getCardList()])
        .then((res) => {
          console.log('тут',res)
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
