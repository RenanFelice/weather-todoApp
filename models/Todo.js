const { Sequelize } = require('sequelize');
const db = require('../config/database')

const Todo = db.define('todo', {
    task: {
        type:Sequelize.STRING,
    }
})

module.exports = Todo;