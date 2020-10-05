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
      console.log('database funcionando corretamente!!!! colocou a senha correta aeeee');
    } catch (error) {
      console.error('Alanzei.. deu ruim:', error);
    }
  })()

  module.exports = db;

  