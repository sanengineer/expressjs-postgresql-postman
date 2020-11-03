module.exports = {
  development: {
    username: process.env.YOUR_DB_LOCAL,
    password: null,
    database: "expressjs_postman_db_development",
    host: "localhost",
    dialect: "postgres",
  },
  test: {
    username: process.env.YOUR_DB_LOCAL,
    password: null,
    database: "expressjs_postman_db_test",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: process.env.YOUR_DB_LOCAL,
    password: null,
    database: "expressjs_postman_db_production",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};
