require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // Désactiver les logs SQL pour éviter le spam dans la console
  }
);

sequelize.authenticate()
  .then(() => console.log('✅ Connexion à MySQL réussie avec Sequelize !'))
  .catch(err => console.error('❌ Erreur de connexion à MySQL :', err));

module.exports = sequelize;
