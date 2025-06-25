import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CategorieCard from '../components/categories/CategorieCard';
import styles from '../styles/HomePage.module.css';

const HomePage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error("Erreur lors du chargement des catégories :", error));
  }, []);

  return (
    <>
      <div className={styles.hero}>
        <div className={styles.textBlock}>
          <h1>Youssitex Cuisine</h1>
          <p>
            Des vêtements professionnels pensés pour les chefs, pâtissiers, artisans du goût.<br />
            Élégance, confort et durabilité réunis dans chaque pièce.
          </p>
          <Link to="/notre-histoire">
            <button className={styles.heroButton}>Découvrez notre histoire</button>
          </Link>
        </div>

        <div className={styles.imageBlock}>
          <img src="/images/hero.jpg" alt="Veste de cuisine" className={styles.heroImage} />
        </div>
      </div>

      <div className={styles.categoriesSection}>
        <h2 className={styles.sectionTitle}>Nos catégories de vêtements</h2>
        <div className={styles.categoriesContainer}>
          {categories.map(categorie => (
            <CategorieCard key={categorie.id} categorie={categorie} />
            
            ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
