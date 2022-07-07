const BASE_URL = 'https://api.mestovid.students.nomoredomains.xyz';

/**
 * Обработка ответа от сервера
 */
const getResponse = (response) => {
  try {
    if (!response.ok) {
      throw new Error('Ошибка запроса');
    }
    return response.json();
  } catch (err) {
    return err;
  }
};

/**
 * Регистрация
 * @return пример успешного ответа {
    "data": {
        "_id": "5f5204c577488bcaa8b7bdf2",,
        "email": "email@yandex.ru"
    }
}
 */
export const signupFetch = async (authData) => {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  });

  return await getResponse(response);
};

/**
 * Авторизация
 * @return пример успешного ответа {
   
  }
 */
export const signinFetch = async (authData) => {
  const response = await fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  });

  return await getResponse(response);
};

/**
 * Проверка валидности токена
 * @return пример успешного ответа {
    "_id":"1f525cf06e02630312f3fed7",
    "email":"email@email.ru"
  }
//  */
export const validJWTFetch = async () => {
  const response = await fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  });

  return await getResponse(response);
};

/**
 * Проверка авторизации
 */

// export const checkAuth = async () => {
//   const token = localStorage.getItem('token');
//   if (!token) {
//     return false;
//   }
//   return await validJWTFetch(token);
// };

