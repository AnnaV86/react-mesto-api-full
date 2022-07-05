import { useState } from 'react';

export const Login = ({ onLogin }) => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const inputData = (evt) => {
    const { name, value } = evt.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const enterLogin = (e) => {
    if (!userData.password || !userData.email) {
      return;
    }
    e.preventDefault();
    onLogin(userData);
  };

  return (
    <div className='login'>
      <h1 className='login__title'>Вход</h1>
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
        <button className='login__button' type='submit' onClick={enterLogin}>
          Войти
        </button>
      </form>
    </div>
  );
};
