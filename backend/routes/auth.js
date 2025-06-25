const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Utilisateur = require('../models/utilisateurs');

// POST /api/connexion
router.post('/connexion', async (req, res) => {
  const { email, mot_de_passe } = req.body;

  try {
    const utilisateur = await Utilisateur.findOne({ where: { email } });

    if (!utilisateur) {
      console.log('❌ Email non trouvé :', email);
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const estValide = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);

    console.log('✅ Saisi :', mot_de_passe);
    console.log('📦 En BDD :', utilisateur.mot_de_passe);
    console.log('Résultat comparaison :', estValide);

    if (!estValide) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const { mot_de_passe: _, ...utilisateurSansMotDePasse } = utilisateur.toJSON();
    res.status(200).json(utilisateurSansMotDePasse);
  } catch (err) {
    console.error('Erreur connexion :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// ✅ POST /api/inscription
router.post('/inscription', async (req, res) => {
  const { nom, prenom, email, mot_de_passe, telephone } = req.body;

  try {
    const existant = await Utilisateur.findOne({ where: { email } });
    if (existant) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    if (!nom || nom.length < 2 || !prenom || prenom.length < 2 || !email || !mot_de_passe || mot_de_passe.length < 8) {
      return res.status(400).json({ message: "Champs invalides ou incomplets." });
    }

    const hashed = await bcrypt.hash(mot_de_passe, 10);

    const nouvelUtilisateur = await Utilisateur.create({
      nom,
      prenom,
      email,
      mot_de_passe: hashed,
      telephone
    });

    console.log('✅ Utilisateur créé :', nouvelUtilisateur.email);
    res.status(201).json({ message: "Compte créé avec succès." });
  } catch (err) {
    console.error('Erreur inscription :', err);
    res.status(500).json({ message: "Erreur serveur. Veuillez réessayer." });
  }
});

module.exports = router;
