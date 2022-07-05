import { useContext } from 'react';
import { Card } from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Footer } from './Footer';
export const Main = ({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardDelete,
  onCardLike,
}) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <main className='content'>
        <section className='profile'>
          <div className='profile__user'>
            {currentUser.avatar && (
              <img
                className='profile__avatar'
                src={currentUser.avatar}
                alt='Фото профиля'
              />
            )}
            <div className='profile__avatar-overlay'>
              <button
                className='profile__avatar-editing'
                type='button'
                onClick={onEditAvatar}
              ></button>
            </div>

            <div className='profile__info'>
              <div className='profile__name-edit'>
                <h1 className='profile__name'>{currentUser.name}</h1>
                <button
                  className='profile__editing'
                  aria-label='Edit'
                  type='button'
                  onClick={onEditProfile}
                ></button>
              </div>
              <p className='profile__about-me'>{currentUser.about}</p>
            </div>
          </div>
          <button
            className='profile__new'
            type='button'
            onClick={onAddPlace}
          ></button>
        </section>
        <section className='photo-card'>
          <ul className='elements'>
            {cards.map((card) => {
              return (
                <Card
                  card={card}
                  key={card._id}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
                />
              );
            })}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
};
