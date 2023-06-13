class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }

    setToken(token) {
        this._headers = {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
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
        const token = localStorage.getItem("token");
        return fetch(`${this._url}/users/me`, {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`,
              },
        })
            .then(this._checkResponse);
    }

    // загрузка всех карточек

    getInitialCards() {
        const token = localStorage.getItem("token");
        return fetch(`${this._url}/cards`, {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`,
              },
        })
            .then(this._checkResponse);
    }

    // редактирование профиля
    editProfileInfo(data) {
        const token = localStorage.getItem("token");
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`,
              },
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            })
        })
            .then(this._checkResponse);
    }

    // поменять аватар

    changeAvatar(data) {
        const token = localStorage.getItem("token");
        return fetch(`${this._url}/users/me/avatar`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`,
              },
            body: JSON.stringify(data)
        })
            .then(this._checkResponse);
    }

    // добавление новой карточки

    addNewCard(data) {
        const token = localStorage.getItem("token");
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`,
              },
            body: JSON.stringify(data)
        })
            .then(this._checkResponse);
    }

    // удаление созданной карточки

    deleteCard(id) {
        const token = localStorage.getItem("token");
        return fetch(`${this._url}/cards/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`,
              },
        })
            .then(this._checkResponse);
    }

    // изменить лайк

    changeLikeCard(id, isLiked) {
        const token = localStorage.getItem("token");
        if (isLiked) {
            return fetch(`${this._url}/cards/${id}/likes`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`,
                  },
            })
                .then(this._checkResponse);
        } else {
            return fetch(`${this._url}/cards/${id}/likes`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`,
                  },
            })
                .then(this._checkResponse);
        }
    }

}

export const api = new Api({
    url: 'https://mesto-backend.nomoredomains.rocks',
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});