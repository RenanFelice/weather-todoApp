const { Sequelize } = require('sequelize');
require('dotenv').config();

const db = new Sequelize('weathertodoapp', process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: process.env.DB_DIALECT,
    define: {
      timestamps: false
  }
  });
  
  (async function () {
    try {
      await db.authenticate();
      console.log('Database conectado com sucesso!');
    } catch (error) {
      console.error('Falha ao conectar com o DB:', error);
    }
  })()

  module.exports = db;

  