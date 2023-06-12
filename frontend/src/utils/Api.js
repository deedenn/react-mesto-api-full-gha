class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }

    setToken(token) {
        this._headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }

    _checkResponse(response) {
        if (response.ok) {
            return response.json();
        } else {
            console.log('Ошибка');
            return Promise.reject(`Ошибка: ${response.status}`);
        }
    }

    // получение информации о пользователе
    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
        })
            .then(this._checkResponse);
    }

    // загрузка всех карточек

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers,
        })
            .then(this._checkResponse);
    }

    // редактирование профиля
    editProfileInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            })
        })
            .then(this._checkResponse);
    }

    // поменять аватар

    changeAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then(this._checkResponse);
    }

    // добавление новой карточки

    addNewCard(data) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then(this._checkResponse);
    }

    // удаление созданной карточки

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: "DELETE",
            headers: this._headers,
        })
            .then(this._checkResponse);
    }

    // изменить лайк

    changeLikeCard(id, isLiked) {
        if (isLiked) {
            return fetch(`${this._url}/cards/${id}/likes`, {
                method: "DELETE",
                headers: this._headers,
            })
                .then(this._checkResponse);
        } else {
            return fetch(`${this._url}/cards/${id}/likes`, {
                method: "PUT",
                headers: this._headers,
            })
                .then(this._checkResponse);
        }
    }

}


// export const api = new Api({
//     url: 'http://localhost:3000',
//     headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json",
//     },
// });

export const api = new Api({
    url: 'https://mesto-backend.nomoredomains.rocks',
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});