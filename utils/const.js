const urlRegex = /http[s]?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?/;
const MONGO_DB_DEFAULT = 'mongodb://localhost:27017/bitfilmsdb';
const MONGO_DB = process.env.MONGO_URL || MONGO_DB_DEFAULT;

module.exports = {
  urlRegex,
  MONGO_DB,
};
