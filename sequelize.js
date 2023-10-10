const { Sequelize } = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'mssql',
  username: process.env.DB_USER, // better stored in an app setting such as process.env.DB_USER
  password: process.env.DB_PASSWORD, // better stored in an app setting such as process.env.DB_PASSWORD
  host: process.env.DB_SERVER, // better stored in an app setting such as process.env.DB_SERVER
  port: process.env.DB_PORT, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
  database: process.env.DB_NAME,
  port: 1433, // Default SQL Server port
  dialectOptions: {
    encrypt: true, // Use SSL for secure connection
  },
});

module.exports = sequelize;
