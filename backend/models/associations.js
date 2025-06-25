const Produit = require('./Produit');
const Categorie = require('./Categorie');

// Déclaration des relations
Categorie.hasMany(Produit, { foreignKey: 'categorie_id' });
Produit.belongsTo(Categorie, { foreignKey: 'categorie_id' });

module.exports = { Produit, Categorie };
