import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreur, setErreur] = useState('');
  const navigate = useNavigate();

  const handleConnexion = async (e) => {
    e.preventDefault();
    setErreur('');

    try {
      const res = await axios.post('http://localhost:5000/api/connexion', {
        email,
        mot_de_passe: motDePasse,
      });

      localStorage.setItem('utilisateur', JSON.stringify(res.data));
      window.dispatchEvent(new Event("storage")); // 🔄 force la mise à jour du Header
      navigate('/mon-compte'); // ou "/" si tu préfères
    } catch (err) {
      setErreur('Identifiants incorrects');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
      <h2>Connexion</h2>
      {erreur && <p style={{ color: 'red' }}>{erreur}</p>}
      <form onSubmit={handleConnexion}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Email</label><br />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Mot de passe</label><br />
          <input
            value={motDePasse}
            onChange={e => setMotDePasse(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <button type="submit" style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#4a90e2',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
