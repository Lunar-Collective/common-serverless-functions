const auth0verify = require('auth0-jwt-lambda');
const { Database } = require("arangojs");

module.exports = (integrationContext) => {
    const db = new Database({
        url: process.env.DB_HOST
      });

      db.useDatabase(process.env.DB_NAME);

    return {
        token: '',
        decoded: {},
        db
    };
}