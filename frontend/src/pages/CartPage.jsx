import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CartPage = () => {
  const [articles, setArticles] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const utilisateur = JSON.parse(localStorage.getItem('utilisateur'));

    if (!utilisateur) {
      const panierLocal = JSON.parse(localStorage.getItem('panier') || '[]');
      setArticles(panierLocal);
      calculerTotal(panierLocal);
    } else {
      axios.get(`http://localhost:5000/api/panier/${utilisateur.id}`)
        .then(res => {
          setArticles(res.data);
          calculerTotal(res.data);
        })
        .catch(err => console.error('Erreur chargement panier :', err));
    }
  }, []);

  const calculerTotal = (data) => {
    const total = data.reduce((acc, item) => {
      const prix = item.prix_unitaire ?? item.produit?.prix;
      const quantite = item.quantite ?? 1;
      if (!prix) return acc;
      return acc + prix * quantite;
    }, 0);
    setTotal(total.toFixed(2));
  };

  const modifierQuantite = async (index, delta) => {
    const copie = [...articles];
    const utilisateur = JSON.parse(localStorage.getItem('utilisateur'));
    const idDetail = articles[index].id;

    copie[index].quantite += delta;

    if (copie[index].quantite < 1) {
      copie.splice(index, 1);
      setArticles(copie);
      calculerTotal(copie);

      if (!utilisateur) {
        localStorage.setItem('panier', JSON.stringify(copie));
      } else {
        await axios.delete(`http://localhost:5000/api/panier/article/${idDetail}`);
      }

      return;
    }

    setArticles(copie);
    calculerTotal(copie);

    if (!utilisateur) {
      localStorage.setItem('panier', JSON.stringify(copie));
    } else {
      try {
        await axios.patch(`http://localhost:5000/api/panier/${idDetail}`, {
          quantite: copie[index].quantite
        });
      } catch (err) {
        console.error('Erreur mise à jour backend :', err);
      }
    }
  };

  const viderPanier = async () => {
    const utilisateur = JSON.parse(localStorage.getItem('utilisateur'));

    if (!utilisateur) {
      localStorage.removeItem('panier');
      setArticles([]);
      setTotal(0);
    } else {
      try {
        await axios.delete(`http://localhost:5000/api/panier/vider/${utilisateur.id}`);
        setArticles([]);
        setTotal(0);
      } catch (err) {
        console.error("Erreur suppression panier :", err);
      }
    }
  };

  if (articles.length === 0) return <p style={{ margin: '3rem' }}>🛒 Votre panier est vide.</p>;

  return (
    <div style={{ maxWidth: '800px', margin: '4rem auto' }}>
      <h2>🛒 Mon Panier</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '2rem' }}>
        <thead>
          <tr>
            <th>Produit</th>
            <th>Quantité</th>
            <th>Taille</th>
            <th>Prix</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((item, index) => {
            const nomProduit = item.nom || item.produit?.nom || '???';
            const prix = item.prix_unitaire ?? item.produit?.prix ?? 0;

            return (
              <tr key={index} style={{ textAlign: 'center', borderBottom: '1px solid #ccc' }}>
                <td>{nomProduit}</td>
                <td>
                  <button onClick={() => modifierQuantite(index, -1)}>-</button>
                  <span style={{ margin: '0 8px' }}>{item.quantite}</span>
                  <button onClick={() => modifierQuantite(index, 1)}>+</button>
                </td>
                <td>{item.taille}</td>
                <td>{Number(prix).toFixed(2)} €</td>
                <td>{(prix * item.quantite).toFixed(2)} €</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h3 style={{ textAlign: 'right', marginTop: '2rem' }}>Total : {total} €</h3>

      <button
        onClick={viderPanier}
        style={{
          marginTop: '2rem',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#e74c3c',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        🧹 Vider le panier
      </button>
    </div>
  );
};

export default CartPage;
