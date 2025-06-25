const express = require('express');
const router = express.Router();
const Categorie = require('../models/Categorie');

// GET /categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Categorie.findAll();
    res.status(200).json(categories);
  } catch (err) {
    console.error('❌ Erreur récupération des catégories :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// POST /categorie
router.post('/categorie', async (req, res) => {
  try {
    const { nom } = req.body;
    const categorie = await Categorie.create({ nom });
    res.status(201).json(categorie);
  } catch (err) {
    console.error('❌ Erreur création catégorie :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
