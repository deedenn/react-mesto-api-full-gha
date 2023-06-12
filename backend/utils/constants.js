const regExp = /http(s)?:\/\/(www\.)?[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]+\.[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]+/;

const allowedCors = [
  'https://mesto-express.nomoredomains.rocks',
  'http://mesto-express.nomoredomains.rocks',
  'https://mesto-backend.nomoredomains.rocks',
  'http://mesto-backend.nomoredomains.rocks',
  'localhost:3000',
  'http://localhost:3000',
  'http://localhost:3001',
  'localhost:3001',
];

module.exports = {
  regExp, allowedCors,
};
