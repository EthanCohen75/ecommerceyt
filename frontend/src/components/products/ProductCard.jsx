import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css'; // à créer si tu veux

const ProductCard = ({ produit }) => {
  return (
    <Link to={`/produits/${produit.id}`} style={{ textDecoration: 'none' }}>
      <div className={styles.card}>
        <img
          src={`http://localhost:5000${produit.image}`}
          alt={produit.nom}
          className={styles.image}
        />
        <h3>{produit.nom}</h3>
        <p>{Number(produit.prix).toFixed(2)} €</p>
      </div>
    </Link>
  );
};

export default ProductCard;
