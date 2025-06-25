import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/ProductPage.module.css';
import { addToPanier } from '../utils/panier';
import Toast from '../components/pop in/Toast';

const ProductPage = () => {
  const { id } = useParams();
  const [produit, setProduit] = useState(null);
  const [tailleChoisie, setTailleChoisie] = useState('');
  const [quantite, setQuantite] = useState(1);
  const [taillesDispo, setTaillesDispo] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/produits/${id}`)
      .then((res) => setProduit(res.data))
      .catch((err) => console.error('Erreur produit :', err));
  }, [id]);

  useEffect(() => {
    if (!produit) return;
    if (produit.categorie_id === 1 || produit.categorie_id === 3) {
      setTaillesDispo(['S', 'M', 'L', 'XL', 'XXL']);
    } else if (produit.categorie_id === 2) {
      setTaillesDispo(['36', '37', '38', '39', '40', '41', '42', '43', '44', '45']);
    } else {
      setTaillesDispo([]);
    }
  }, [produit]);

  if (!produit) return <div>Chargement...</div>;

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <img
          src={`http://localhost:5000${produit.image}`}
          alt={produit.nom}
          className={styles.image}
        />
        <div className={styles.info}>
          <h1>{produit.nom}</h1>
          <ul className={styles.description}>
            {produit.description.split(',').map((item, index) => (
              <li key={index}>{item.trim()}</li>
            ))}
          </ul>

          <p className={styles.price}>{Number(produit.prix).toFixed(2)} €</p>

          <label>Choisir une taille :</label>
          <select
            value={tailleChoisie}
            onChange={e => setTailleChoisie(e.target.value)}
            style={{ padding: '0.5rem', marginBottom: '1rem' }}
          >
            <option value="">-- Sélectionner --</option>
            {taillesDispo.map(taille => (
              <option key={taille} value={taille}>{taille}</option>
            ))}
          </select>

          <label>Quantité :</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <button
              onClick={() => setQuantite(q => Math.max(1, q - 1))}
              style={{ padding: '0.5rem 1rem' }}
            >
              -
            </button>
            <span>{quantite}</span>
            <button
              onClick={() => setQuantite(q => q + 1)}
              style={{ padding: '0.5rem 1rem' }}
            >
              +
            </button>
          </div>

          <button
            className={styles.button}
            onClick={() => {
              if (!tailleChoisie) {
                setToast({ message: "Veuillez sélectionner une taille.", type: "error" });
                return;
              }

              addToPanier({
                produitId: produit.id,
                nom: produit.nom,
                prix: produit.prix,
                taille: tailleChoisie
              }, quantite);

              setToast({ message: 'Produit ajouté au panier !', type: 'success' });
            }}
          >
            Ajouter au panier
          </button>

          {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
