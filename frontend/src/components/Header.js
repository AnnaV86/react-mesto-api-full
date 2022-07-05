import React from 'react';
import { Link, Route, Routes, Navigate } from 'react-router-dom';
import logo from '../images/logo.svg';

export const Header = ({ onSignOut, userDataAuth, login }) => {
  return (
    <header className='header'>
      <img className='header__logo' src={logo} alt='Место Russia' />
      <div className='header__links'>
        {login ? (
          <>
            <p className='header__email'>{userDataAuth.email}</p>

            <Link to='/sign-in' className='header__link' onClick={onSignOut}>
              Выйти
            </Link>
          </>
        ) : (
          <Routes>
            <Route
              path='/sign-up'
              element={
                <Link to='/sign-in' className='header__link'>
                  Войти
                </Link>
              }
            />
            <Route
              path='/sign-in'
              element={
                <Link to='/sign-up' className='header__link'>
                  Регистрация
                </Link>
              }
            />
            <Route path='*' element={<Navigate to='/sign-up' />} />
          </Routes>
        )}
      </div>
    </header>
  );
};
