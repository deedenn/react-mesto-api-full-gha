class Auth {
  constructor(options) {
    this._url = options.url;
  }

  _getResponseData(res) {
    return res.json()
      .then((res) => {
        throw new Error(res.message);
      });
  }

  register({ email, password }) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((response) => {
      if (response.ok) return response.json();
      return this._getResponseData(response);
    });
  }

  authorization({ email, password }) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((response) => {
      if (response.ok) return response.json();
      return this._getResponseData(response);
    });
  }

  getContent(token) {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        return this._getResponseData(response);
      })
      .then((data) => data);
  }
}

const auth = new Auth({
  url: 'https://mesto-backend.nomoredomains.rocks',
});

// export const auth = new Auth({
//   url: "https://auth.nomoreparties.co",
// });

export default auth;