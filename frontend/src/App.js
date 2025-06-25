import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import CategoryDetailPage from './pages/CategoryDetailPage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import NotreHistoirePage from './pages/NotreHistoirePage';
import LoginPage from './pages/LoginPage';
import MonComptePage from './pages/MonComptePage';
import InscriptionPage from './pages/InscriptionPage';

function App() {
  return (
    <Router>
      <Header />
      <main style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/:id" element={<CategoryDetailPage />} />
          <Route path="/categorie/:categorie" element={<CategoryPage />} />
          <Route path="/produits/:id" element={<ProductPage />} />
          <Route path="/panier" element={<CartPage />} />
          <Route path="/notre-histoire" element={<NotreHistoirePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/inscription" element={<InscriptionPage />} />
          <Route path="/mon-compte" element={<MonComptePage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
