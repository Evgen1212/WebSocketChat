const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database');

class User extends Model { }

User.init({
    username: {
        type: DataTypes.STRING
    },
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    }

}, {
    sequelize,
    modelName: 'user'
})

module.exports = User;