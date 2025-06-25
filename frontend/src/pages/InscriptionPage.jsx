import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/pop in/Toast';

const InscriptionPage = () => {
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    email: '',
    mot_de_passe: '',
    telephone: ''
  });

  const [erreurs, setErreurs] = useState({});
  const [touche, setTouche] = useState({});
  const [erreurGlobale, setErreurGlobale] = useState('');
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

  const validerChampsChamp = (champ, valeur) => {
    let message = '';

    if (champ === 'nom' && valeur.trim().length < 2)
      message = 'Le nom doit contenir au moins 2 caractères.';

    if (champ === 'prenom' && valeur.trim().length < 2)
      message = 'Le prénom doit contenir au moins 2 caractères.';

    if (champ === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valeur))
      message = 'Adresse email invalide.';

    if (champ === 'mot_de_passe' && valeur.length < 8)
      message = 'Mot de passe : au moins 8 caractères (une phrase est recommandée).';

    if (champ === 'telephone' && valeur && !/^[0-9]{10}$/.test(valeur))
      message = 'Le téléphone doit contenir exactement 10 chiffres.';

    setErreurs(prev => ({ ...prev, [champ]: message }));
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (touche[name]) {
      validerChampsChamp(name, value);
    }
  };

  const handleBlur = e => {
    const { name, value } = e.target;
    setTouche(prev => ({ ...prev, [name]: true }));
    validerChampsChamp(name, value);
  };

  const validerTousLesChamps = () => {
    const champs = ['nom', 'prenom', 'email', 'mot_de_passe', 'telephone'];
    champs.forEach(champ => validerChampsChamp(champ, form[champ]));
    return Object.values(erreurs).every(err => !err);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const ok = validerTousLesChamps();
    if (!ok) return;

    try {
      await axios.post('http://localhost:5000/api/inscription', form);
      setToast({ message: 'Inscription réussie ! Bienvenue 👋', type: 'success' });
        setTimeout(() => navigate('/'), 2000); // redirection douce

    } catch (err) {
      setErreurGlobale(err.response?.data?.message || "Erreur lors de l’inscription.");
    }
  };

  const champStyle = champ => ({
    border: erreurs[champ] ? '1px solid red' : '1px solid #ccc',
    padding: '0.5rem',
    borderRadius: '6px'
  });

  return (
    <div style={{ maxWidth: '500px', margin: '4rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '12px' }}>
      <h2>Créer un compte</h2>
      <p style={{ fontSize: '0.85rem', color: '#666' }}>Les champs marqués d’un * sont obligatoires.</p>
      {erreurGlobale && <p style={{ color: 'red' }}>{erreurGlobale}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          name="prenom"
          placeholder="Prénom *"
          value={form.prenom}
          onChange={handleChange}
          onBlur={handleBlur}
          style={champStyle('prenom')}
        />
        {touche.prenom && erreurs.prenom && <p style={{ color: 'red', fontSize: '0.9rem' }}>❗ {erreurs.prenom}</p>}

        <input
          name="nom"
          placeholder="Nom *"
          value={form.nom}
          onChange={handleChange}
          onBlur={handleBlur}
          style={champStyle('nom')}
        />
        {touche.nom && erreurs.nom && <p style={{ color: 'red', fontSize: '0.9rem' }}>❗ {erreurs.nom}</p>}

        <input
          name="email"
          type="email"
          placeholder="Email *"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
          style={champStyle('email')}
        />
        {touche.email && erreurs.email && <p style={{ color: 'red', fontSize: '0.9rem' }}>❗ {erreurs.email}</p>}

        <input
          name="mot_de_passe"
          type="password"
          placeholder="Mot de passe *"
          value={form.mot_de_passe}
          onChange={handleChange}
          onBlur={handleBlur}
          style={champStyle('mot_de_passe')}
        />
        <p style={{ fontSize: '0.8rem', color: '#777', margin: 0 }}>
          🔐 Conseil : utilisez une phrase simple, ex. <em>j’aimelefromagedemontagne</em>
        </p>
        {touche.mot_de_passe && erreurs.mot_de_passe && <p style={{ color: 'red', fontSize: '0.9rem' }}>❗ {erreurs.mot_de_passe}</p>}

        <input
          name="telephone"
          placeholder="Téléphone"
          value={form.telephone}
          onChange={handleChange}
          onBlur={handleBlur}
          style={champStyle('telephone')}
        />
        {touche.telephone && erreurs.telephone && <p style={{ color: 'red', fontSize: '0.9rem' }}>❗ {erreurs.telephone}</p>}

        <button type="submit" style={{ padding: '0.8rem', backgroundColor: '#4a90e2', color: 'white', border: 'none', borderRadius: '8px' }}>
          S'inscrire
        </button>
      </form>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

    </div>
  );
};

export default InscriptionPage;
