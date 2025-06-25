import React, { useEffect, useState } from 'react';

const MonComptePage = () => {
  const [utilisateur, setUtilisateur] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('utilisateur');
    if (data) setUtilisateur(JSON.parse(data));
  }, []);

  if (!utilisateur) return <p style={{ padding: '2rem' }}>Vous n’êtes pas connecté.</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h1>👤 Mon Compte</h1>
      <p><strong>Prénom :</strong> {utilisateur.prenom}</p>
      <p><strong>Nom :</strong> {utilisateur.nom}</p>
      <p><strong>Email :</strong> {utilisateur.email}</p>
      <p><strong>Rôle :</strong> {utilisateur.role}</p>
    </div>
  );
};

export default MonComptePage;
