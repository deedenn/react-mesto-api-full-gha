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

  getContent() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        return this._getResponseData(response);
      })
      .then((data) => data);
  }
}

export const auth = new Auth({
  url: 'https://mesto-backend.nomoredomains.rocks',
});