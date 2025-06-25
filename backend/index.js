require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth');
const panierRoutes = require('./routes/panier');
const sequelize = require('./config/database');
const produitsRoutes = require('./routes/produits');
const categoriesRoutes = require('./routes/categories');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Images accessibles depuis le frontend
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Routes
app.use('/produits', produitsRoutes);
app.use('/', categoriesRoutes);
app.use('/api', authRoutes);
app.use('/api/panier', panierRoutes);
// Connexion à la base de données
sequelize.sync()
  .then(() => console.log('✅ Base de données synchronisée avec Sequelize !'))
  .catch(err => console.error('❌ Erreur de synchronisation :', err));

const { Produit, Categorie } = require('./models/associations');

// Lancement du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
