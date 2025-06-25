import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/Header.module.css';

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [menuCategorieOuvert, setMenuCategorieOuvert] = useState(false);
  const [utilisateur, setUtilisateur] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Charger utilisateur depuis localStorage
    const chargerUtilisateur = () => {
      const userData = localStorage.getItem('utilisateur');
      setUtilisateur(userData ? JSON.parse(userData) : null);
    };

    chargerUtilisateur(); // initial

    // Écouter les changements de localStorage (si plusieurs onglets ou forçage)
    window.addEventListener('storage', chargerUtilisateur);

    return () => {
      window.removeEventListener('storage', chargerUtilisateur);
    };
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Erreur chargement catégories :", err));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMenuCategorieOuvert(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => setMenuOuvert(prev => !prev);
  const toggleSousMenu = () => setMenuCategorieOuvert(prev => !prev);

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>Youssitex</Link>

      <button className={styles.burger} onClick={toggleMenu}>
        {menuOuvert ? '✖' : '☰'}
      </button>

      <nav className={`${styles.nav} ${menuOuvert ? styles.active : ''}`}>
        <Link to="/" className={styles.navLink} onClick={() => setMenuOuvert(false)}>Accueil</Link>

        <div className={styles.dropdown} ref={dropdownRef}>
          <div
            className={`${styles.navLink} ${styles.dropdownTrigger}`}
            onClick={toggleSousMenu}
          >
            Catégories ⏷
          </div>

          {menuCategorieOuvert && (
            <div className={styles.dropdownMenu}>
              {categories.map(c => (
                <Link
                  key={c.id}
                  to={`/categorie/${c.nom}`}
                  className={styles.dropdownItem}
                  onClick={() => {
                    setMenuOuvert(false);
                    setMenuCategorieOuvert(false);
                  }}
                >
                  {c.nom}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link to="/panier" className={styles.navLink} onClick={() => setMenuOuvert(false)}>Panier</Link>
        <Link to="/notre-histoire" className={styles.navLink} onClick={() => setMenuOuvert(false)}>Notre histoire</Link>
            
        {utilisateur ? (
  <>
    <Link to="/mon-compte" className={styles.navLink} onClick={() => setMenuOuvert(false)}>
      👤 Mon compte
    </Link>
    <div
      className={styles.navLink}
      onClick={() => {
        localStorage.removeItem('utilisateur');
        setUtilisateur(null);
        setMenuOuvert(false);
        setMenuCategorieOuvert(false);
      }}
    >
      🚪 Déconnexion
    </div>
  </>
) : (
  <>
    <Link to="/login" className={styles.navLink} onClick={() => setMenuOuvert(false)}>
      Connexion
    </Link>
    <Link to="/inscription" className={styles.navLink} onClick={() => setMenuOuvert(false)}>
      Inscription
    </Link>
  </>
)}

      </nav>
    </header>
  );
};

export default Header;
