const { Sequelize } = require("sequelize");
require("dotenv").config();
const sequelize = new Sequelize({
  dialect: "mssql",
  username: process.env.DB_USER, 
  password: process.env.DB_PASSWORD, 
  host: process.env.DB_SERVER, 
  port: process.env.DB_PORT, 
  database: process.env.DB_NAME,
  port: 1433,
  dialectOptions: {
    encrypt: true
  },
});
module.exports = sequelize;
