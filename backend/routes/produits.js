const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Produit = require('../models/Produit');
const Categorie = require('../models/Categorie');

// ✅ GET /produits?categorie=nom
router.get('/', async (req, res) => {
  const nomCategorie = req.query.categorie;

  try {
    const categorie = await Categorie.findOne({
      where: { nom: { [Op.like]: `%${nomCategorie}%` } }
    });

    if (!categorie) {
      return res.status(404).json({ message: 'Catégorie introuvable' });
    }

    const produits = await Produit.findAll({
      where: { categorie_id: categorie.id },
      attributes: ['id', 'nom', 'description', 'prix', 'stock', 'image']
    });

    res.json(produits);
  } catch (err) {
    console.error('❌ Erreur récupération produits :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// ✅ GET /produits/:id
router.get('/:id', async (req, res) => {
  try {
    const produit = await Produit.findByPk(req.params.id, {
  attributes: ['id', 'nom', 'description', 'prix', 'stock', 'image', 'categorie_id']
});

    if (!produit) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    res.json(produit);
  } catch (err) {
    console.error('❌ Erreur récupération produit par ID :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
