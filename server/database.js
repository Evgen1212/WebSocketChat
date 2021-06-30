
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('user-db', 'admin', '12345', {
    dialect: 'sqlite',
    host: './dev.sqlite',
    // убрали дополнительные столбцы createdAt и updatedAt
    define: {
        timestamps: false
    }
});

module.exports = sequelize;