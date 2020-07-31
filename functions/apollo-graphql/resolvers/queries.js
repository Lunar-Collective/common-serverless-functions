const hello = require('./queries/hello');
const allAuthors = require('./queries/allAuthors');
const author = require('./queries/author');
const authorByName = require('./queries/authorByName');

module.exports = {
    hello,
    allAuthors,
    author,
    authorByName,
}