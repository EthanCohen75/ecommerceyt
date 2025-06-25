const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Produit = require('./Produit');

const DetailCommande = sequelize.define('DetailCommande', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  commande_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  produit_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  taille: {
    type: DataTypes.STRING,
    allowNull: true
  },
  quantite: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  prix_unitaire: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: 'details_commandes',
  timestamps: false
});

// Association : un détail de commande appartient à un produit
DetailCommande.belongsTo(Produit, {
  foreignKey: 'produit_id',
  as: 'produit'
});

module.exports = DetailCommande;
