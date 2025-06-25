const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Commande = sequelize.define('Commande', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  utilisateur_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'utilisateurs',
      key: 'id'
    }
  },
  statut: {
    type: DataTypes.ENUM('panier', 'en_attente', 'payée', 'expédiée', 'livrée', 'annulée'),
    defaultValue: 'panier'
  },
  mode_paiement: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'commandes',
  timestamps: true, // ou false si tu ne veux pas de createdAt/updatedAt
  createdAt: 'date_creation', // si tu veux garder la trace sans date_commande manuelle
  updatedAt: false
});

module.exports = Commande;
