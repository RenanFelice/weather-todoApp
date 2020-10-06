const { Sequelize } = require('sequelize');

const db = new Sequelize('weathertodoapp', 'root', 'renan', {
    host: 'localhost',
    dialect: 'mysql',
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

  