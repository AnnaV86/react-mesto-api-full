import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Register = ({ onRegister }) => {
  const [userData, setUserData] = useState({
    password: '',
    email: '',
  });

  const inputData = (evt) => {
    const { name, value } = evt.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const enterRegistration = (e) => {
    if (!userData.password || !userData.email) {
      return;
    }
    e.preventDefault();
    onRegister(userData);
  };

  return (
    <div className='login'>
      <h1 className='login__title'>Регистрация</h1>
      <form className='login__form'>
        <input
          className='login__input'
          type='email'
          name='email'
          id='email'
          placeholder='Email'
          onChange={inputData}
          required
        />
        <input
          className='login__input'
          type='password'
          name='password'
          id='password'
          placeholder='Пароль'
          onChange={inputData}
          required
        />
        <button
          className='login__button'
          type='submit'
          onClick={enterRegistration}
        >
          Зарегистрироваться
        </button>
      </form>
      <div className='login__info-text'>
        <span>Уже зарегистрированы? </span>
        <Link to='/sign-in' className='login__link'>
          Войти
        </Link>
      </div>
    </div>
  );
};
