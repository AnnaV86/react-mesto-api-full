import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i === currentUser._id);

  const cardDeleteButtonClassName = `element-item__delete ${
    isOwn ? 'element-item__delete_type_active' : 'element-item__delete'
  }`;
  const cardLikeButtonClassName = `element-item__like ${
    isLiked ? 'element-item__like like-active' : 'element-item__like'
  }`;

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  return (
    <li className='element-item'>
      <img
        className='element-item__photo'
        src={card.link}
        alt={card.name}
        onClick={() => onCardClick(card)}
      />
      <div className='element-item__title-like'>
        <h2 className='element-item__title'>{card.name}</h2>
        <div className='element-item__like-count'>
          <button
            type='button'
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <h6 className='like-count'>{card.likes.length}</h6>
        </div>
      </div>
      <button
        type='button'
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
    </li>
  );
};
