export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // Получение информации о пользователе GET users/me
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      credentials: 'include',
    }).then(this._getResponseData);
  }

  // Поиск всех карточек GET
  getCardList() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      credentials: 'include',
    }).then(this._getResponseData);
  }

  // Редактирование данных пользователя PATCH
  setUserInfo(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
      credentials: 'include',
    }).then(this._getResponseData);
  }

  // Создание карточки POST
  postNewCard(newCard) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: newCard.name,
        link: newCard.link,
      }),
      credentials: 'include',
    }).then(this._getResponseData);
  }

  // Удалить карточку по ID DELETE
  deleteCard(id) {
    return fetch(`${this._baseUrl}cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    }).then(this._getResponseData);
  }

  changeLikeCardStatus(id, isLiked) {
    return isLiked ? this.putLike(id) : this.deleteLike(id);
  }

  // Поставить лайк карточке PUT
  putLike(id) {
    return fetch(`${this._baseUrl}cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
      credentials: 'include',
    }).then(this._getResponseData);
  }

  // Убрать лайк DELETE
  deleteLike(id) {
    return fetch(`${this._baseUrl}cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    }).then(this._getResponseData);
  }

  // Редактирование аватара пользователя PATCH
  setUpdateAvatar(avatarLink) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink,
      }),
      credentials: 'include',
    }).then(this._getResponseData);
  }

  _getResponseData(res) {
    console.log('ответ', res)
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

const api = new Api({
  baseUrl: 'http://api.mestovid.students.nomoredomains.xyz',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
