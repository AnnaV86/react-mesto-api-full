export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._getResponseData);
  }
  getCardList() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._getResponseData);
  }

  setUserInfo(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
    }).then(this._getResponseData);
  }

  postNewCard(newCard) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: newCard.name,
        link: newCard.link,
      }),
    }).then(this._getResponseData);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._getResponseData);
  }

  changeLikeCardStatus(id, isLiked) {
    return isLiked ? this.putLike(id) : this.deleteLike(id);
  }
  putLike(id) {
    return fetch(`${this._baseUrl}cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    }).then(this._getResponseData);
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._getResponseData);
  }

  setUpdateAvatar(avatarLink) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    }).then(this._getResponseData);
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-39/',
  headers: {
    authorization: '948b0f51-8156-492a-af46-4004deceb58a',
    'Content-Type': 'application/json',
  },
});

export default api;
