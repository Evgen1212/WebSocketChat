
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('user-db', 'user', 'date', {
    dialect: 'sqlite',
    host: './dev.sqlite',
});

module.exports = sequelize;