import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CategorieCard from '../components/categories/CategorieCard';
import styles from '../styles/CategoriesPage.module.css';

console.log('CategorieCard:', CategorieCard);

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error("Erreur lors du chargement des catégories :", error));
  }, []);

  return (
    <div className={styles.container}>
      {categories.map(categorie => (
        <CategorieCard key={categorie.id} categorie={categorie} />
      ))}
      <button>Ajouter une catégorie</button>
    </div>
  );
};

export default CategoriesPage;
