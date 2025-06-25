// backend/models/index.js

const Produit = require('./Produit');
const Categorie = require('./Categorie');
const Commande = require('./commandes');
const Utilisateur = require('./utilisateurs');
const DetailCommande = require('./details_commandes'); // à créer si pas encore fait

// Définir les associations (relations entre tables)
Categorie.hasMany(Produit, { foreignKey: 'categorie_id' });
Produit.belongsTo(Categorie, { foreignKey: 'categorie_id' });

Commande.belongsTo(Utilisateur, { foreignKey: 'utilisateur_id' });
Utilisateur.hasMany(Commande, { foreignKey: 'utilisateur_id' });

Commande.hasMany(DetailCommande, { foreignKey: 'commande_id' });
DetailCommande.belongsTo(Commande, { foreignKey: 'commande_id' });

Produit.hasMany(DetailCommande, { foreignKey: 'produit_id' });
DetailCommande.belongsTo(Produit, { foreignKey: 'produit_id' });

module.exports = {
  Produit,
  Categorie,
  Commande,
  Utilisateur,
  DetailCommande,
};
