import axios from 'axios';

// Ajoute un produit au panier (local ou backend selon user)
export const addToPanier = async (produit, quantite = 1) => {
  const utilisateur = JSON.parse(localStorage.getItem('utilisateur'));

  if (!utilisateur) {
    // Stockage local si non connecté
    const panier = JSON.parse(localStorage.getItem('panier') || '[]');
    const existant = panier.find(p => p.produitId === produit.produitId && p.taille === produit.taille);

    if (existant) {
      existant.quantite += quantite;
    } else {
      panier.push({ ...produit, prix_unitaire: Number(produit.prix), quantite });
    }

    localStorage.setItem('panier', JSON.stringify(panier));
    return;
  }

  // Envoie vers le backend
  try {
    await axios.post('http://localhost:5000/api/panier', {
      utilisateur_id: utilisateur.id,
      produit_id: produit.produitId,
      taille: produit.taille,
      quantite,
      prix_unitaire: produit.prix
    });
  } catch (err) {
    console.error('Erreur ajout panier backend :', err);
  }
};
