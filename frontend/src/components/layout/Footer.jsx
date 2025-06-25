import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#f1f1f1',
      textAlign: 'center',
      padding: '1rem',
      marginTop: '2rem',
      fontSize: '0.9rem',
      color: '#555'
    }}>
      © {new Date().getFullYear()} Vêtements de cuisine. Tous droits réservés.
      </footer>
  );
};

export default Footer;
