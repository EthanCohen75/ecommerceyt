import React from 'react';
import styles from './CategorieCard.module.css';
import { Link } from 'react-router-dom';

const CategorieCard = ({ categorie }) => {
  return (
    <Link to={`/categorie/${categorie.nom}`} style={{ textDecoration: 'none' }}>
      <div className={styles.card}>
        <h3 className={styles.title}>{categorie.nom}</h3>
        <img
          src={`http://localhost:5000${categorie.image}`}
          alt={categorie.nom}
          className={styles.image}
        />
      </div>
    </Link>
  );
};

export default CategorieCard;
