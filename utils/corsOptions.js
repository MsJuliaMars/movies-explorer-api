module.exports.options = {
  origin: [
    'https://movies.kozhevnikova.nomoredomains.monster',
    'http://movies.kozhevnikova.nomoredomains.monster',
    'http://localhost:3000',
    'localhost:3000',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};
