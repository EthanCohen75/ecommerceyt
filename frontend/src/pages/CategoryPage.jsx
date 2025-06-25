import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/CategorieProduits.module.css';
import ProductCard from '../components/products/ProductCard';

const CategoryPage = () => {
  const { categorie } = useParams();
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/produits?categorie=${categorie}`)
      .then((res) => setProduits(res.data))
      .catch((err) => console.error(`Erreur chargement ${categorie} :`, err));
  }, [categorie]);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{categorie.charAt(0).toUpperCase() + categorie.slice(1)} de Cuisine</h1>
      <div className={styles.grid}>
  {produits.map(produit => (
    <ProductCard key={produit.id} produit={produit} />
  ))}
</div>
    </div>
  );
};

export default CategoryPage;
