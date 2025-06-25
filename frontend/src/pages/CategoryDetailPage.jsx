import React from 'react';
import { useParams } from 'react-router-dom';

const CategoryDetailPage = () => {
  const { id } = useParams();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Produits de la catégorie #{id}</h1>
    </div>
  );
};

export default CategoryDetailPage;
