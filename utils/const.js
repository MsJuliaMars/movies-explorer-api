const MONGO_DB = 'mongodb://localhost:27017/bitfilmsdb';
const urlRegex = /http[s]?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?/;

module.exports = {
  MONGO_DB,
  urlRegex,
};
