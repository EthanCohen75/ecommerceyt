const express = require('express');
const router = express.Router();
const { Commande, DetailCommande, Produit } = require('../models');
const { Op } = require('sequelize');

// 🔶 Ajouter un produit au panier
router.post('/', async (req, res) => {
  const { utilisateur_id, produit_id, taille, quantite, prix_unitaire } = req.body;

  try {
    let commande = await Commande.findOne({
      where: {
        utilisateur_id,
        statut: 'panier'
      }
    });

    if (!commande) {
      commande = await Commande.create({
        utilisateur_id,
        statut: 'panier'
      });
    }

    const existant = await DetailCommande.findOne({
      where: {
        commande_id: commande.id,
        produit_id,
        taille
      }
    });

    if (existant) {
      existant.quantite += quantite;
      await existant.save();
    } else {
      await DetailCommande.create({
        commande_id: commande.id,
        produit_id,
        taille,
        quantite,
        prix_unitaire
      });
    }

    res.status(200).json({ message: 'Produit ajouté au panier.' });
  } catch (err) {
    console.error('Erreur ajout panier :', err);
    res.status(500).json({ message: "Erreur serveur." });
  }
});

// 🔶 Obtenir le panier d'un utilisateur
router.get('/:utilisateurId', async (req, res) => {
  const { utilisateurId } = req.params;

  try {
    const commande = await Commande.findOne({
      where: {
        utilisateur_id: utilisateurId,
        statut: 'panier'
      }
    });

    if (!commande) {
      return res.json([]);
    }

    const details = await DetailCommande.findAll({
      where: { commande_id: commande.id },
      include: [{
        model: Produit,
        as: 'produit',
        attributes: ['id', 'nom', 'prix', 'image']
      }]
    });

    res.json(details);
  } catch (err) {
    console.error('Erreur récupération panier :', err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// 🔶 Modifier la quantité d’un article
router.patch('/:id', async (req, res) => {
  const { quantite } = req.body;
  const { id } = req.params;

  try {
    const detail = await DetailCommande.findByPk(id);

    if (!detail) return res.status(404).json({ message: "Article non trouvé" });

    detail.quantite = quantite;
    await detail.save();

    res.json({ message: "Quantité mise à jour", detail });
  } catch (err) {
    console.error('Erreur PATCH panier :', err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// 🔶 Supprimer un article du panier
router.delete('/article/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await DetailCommande.destroy({ where: { id } });
    res.json({ message: "Article supprimé du panier." });
  } catch (err) {
    console.error('Erreur suppression article panier :', err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// 🔶 Vider le panier d’un utilisateur
router.delete('/vider/:utilisateurId', async (req, res) => {
  const { utilisateurId } = req.params;

  try {
    const commande = await Commande.findOne({
      where: { utilisateur_id: utilisateurId, statut: 'panier' }
    });

    if (commande) {
      await DetailCommande.destroy({ where: { commande_id: commande.id } });
    }

    res.json({ message: "Panier vidé" });
  } catch (err) {
    console.error('Erreur suppression panier :', err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
