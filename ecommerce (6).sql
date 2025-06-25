-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 25 juin 2025 à 14:09
-- Version du serveur : 9.1.0
-- Version de PHP : 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ecommerce`
--

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nom` (`nom`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id`, `nom`, `image`) VALUES
(1, 'Vestes', '/images/categories/Vestes.jpeg\r\n'),
(2, 'Chaussures', '/images/categories/chaussures.jpeg\r\n'),
(3, 'Pantalons', '/images/categories/pantalons.jpeg\r\n'),
(5, 'Tabliers', '/images/categories/tabliers.jpeg\r\n');

-- --------------------------------------------------------

--
-- Structure de la table `commandes`
--

DROP TABLE IF EXISTS `commandes`;
CREATE TABLE IF NOT EXISTS `commandes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `utilisateur_id` int NOT NULL,
  `statut` enum('panier','en_attente','payée','expédiée','livrée','annulée') NOT NULL DEFAULT 'panier',
  `date_creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `mode_paiement` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `commandes_fk_utilisateur` (`utilisateur_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `commandes`
--

INSERT INTO `commandes` (`id`, `utilisateur_id`, `statut`, `date_creation`, `mode_paiement`) VALUES
(2, 4, 'panier', '2025-06-24 09:21:41', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `details_commandes`
--

DROP TABLE IF EXISTS `details_commandes`;
CREATE TABLE IF NOT EXISTS `details_commandes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `commande_id` int NOT NULL,
  `produit_id` int NOT NULL,
  `taille` varchar(10) DEFAULT NULL,
  `quantite` int NOT NULL,
  `prix_unitaire` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_details_commande` (`commande_id`),
  KEY `fk_details_produit` (`produit_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `produits`
--

DROP TABLE IF EXISTS `produits`;
CREATE TABLE IF NOT EXISTS `produits` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `prix` decimal(10,2) NOT NULL,
  `stock` int NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `categorie_id` int DEFAULT NULL,
  `date_creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `categorie_id` (`categorie_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `produits`
--

INSERT INTO `produits` (`id`, `nom`, `description`, `prix`, `stock`, `image`, `categorie_id`, `date_creation`) VALUES
(4, 'Veste blanche manches courtes', 'Veste cuisinier blanche, col officier, manches courtes, poche crayon double compartiment, boutons pressions blancs, polycoton', 22.00, 20, '/images/produits/vestes/VC-B-MC.jpeg', 1, '2025-05-26 14:08:26'),
(5, 'Veste blanche manches longues', 'Veste cuisinier blanche, col officier, manches longues, poche crayon double compartiment, boutons pressions blancs, polycoton', 22.00, 20, '/images/produits/vestes/VC-B-ML.jpeg', 1, '2025-05-26 14:08:26'),
(6, 'Veste noire manches courtes', 'Veste cuisinier noire, col officier, manches courtes, poche crayon double compartiment, boutons pressions noirs, polycoton', 25.00, 20, '/images/produits/vestes/VC-N-MC.jpeg', 1, '2025-05-26 14:08:26'),
(7, 'Veste noire manches longues', 'Veste cuisinier noire, col officier, manches longues, poche crayon double compartiment, boutons pressions noirs, polycoton', 25.00, 20, '/images/produits/vestes/VC-N-ML.jpeg', 1, '2025-05-26 14:08:26'),
(8, 'Pantalon de Cuisine Pied de Poule', 'Pantalon de Cuisine Pied de Poule – 100 % Coton – Ceinture élastiquée, 2 poches italiennes, 1 poche arrière passepoilée, braguette à boutons', 22.00, 20, '/images/produits/pantalons/pcpp.jpeg', 3, '2025-05-26 23:46:13'),
(9, 'Pantalon de Cuisine Blanc', 'Pantalon de Cuisine Blanc – Ceinture à 5 passants, braguette zippée, 2 poches italiennes, 1 poche dos avec bouton, élastiques latéraux', 22.00, 20, '/images/produits/pantalons/pcb.jpeg', 3, '2025-05-26 23:46:13'),
(10, 'Pantalon de Cuisine Noir', 'Pantalon de Cuisine Noir – Ceinture à 5 passants, braguette zippée, 2 poches italiennes, 1 poche dos avec bouton, élastiques latéraux', 22.00, 20, '/images/produits/pantalons/pcn.jpeg', 3, '2025-05-26 23:46:13'),
(11, 'Pantalon Noir à Rayures', 'Pantalon Noir à Rayures – Ceinture élastiquée, 6 passants, poches italiennes, poche arrière avec bouton, braguette zippée, polycoton', 24.00, 20, '/images/produits/pantalons/pcnr.jpeg', 3, '2025-05-26 23:46:13'),
(12, 'Chaussures de cuisine blanches', 'Chaussures de cuisine en cuir hydrofuge blanches, doublure cambrelle, antistatique, antidérapante, semelle PU double densité, antichoc, S2', 29.00, 20, '/images/produits/chaussures/cc-b.jpeg', 2, '2025-05-26 23:57:14'),
(13, 'Sabots de cuisine blancs', 'Sabots en cuir hydrofuge blancs, doublure cambrelle, antistatique, antidérapante, semelle PU double densité, antichoc', 29.00, 20, '/images/produits/chaussures/sb-b.jpeg', 2, '2025-05-26 23:57:14'),
(14, 'Chaussures de cuisine noires', 'Chaussures de cuisine en cuir hydrofuge noires, doublure cambrelle, antistatique, antidérapante, semelle PU double densité, antichoc', 32.00, 20, '/images/produits/chaussures/cc-n.jpeg', 2, '2025-05-26 23:57:14'),
(15, 'Sabots de cuisine noirs ', 'Sabots en cuir hydrofuge noirs, doublure cambrelle, antistatique, antidérapante, semelle PU double densité, antichoc', 32.00, 20, '/images/produits/chaussures/sc-n.jpeg', 2, '2025-05-26 23:57:14');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

DROP TABLE IF EXISTS `utilisateurs`;
CREATE TABLE IF NOT EXISTS `utilisateurs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `prenom` varchar(50) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `role` enum('client','admin') NOT NULL DEFAULT 'client',
  `date_creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id`, `prenom`, `nom`, `email`, `mot_de_passe`, `telephone`, `role`, `date_creation`) VALUES
(2, 'Alice', 'Dupont', 'alice@example.com', '$2b$10$DqBm6sUyFzG/ZxJdmFVU5u.GE5D5mT0U9/mjM6s/D6e5W5gXEvOdO', NULL, 'client', '2025-03-24 11:16:28'),
(3, 'Bob', 'Martin', 'bob@example.com', '$2b$10$H3E/hLJkR.j0JqX9QlMPu.nUo5rV3pC/5UjN2l.hSm5Mj9qCQ/q6G', NULL, 'admin', '2025-03-24 11:16:28'),
(4, 'Ethan', 'Cohen', 'ethancohenajj@gmail.com', '$2b$10$Bn9NOGsGzrfBxS7MLuZ.AeMEFNbsDEyP9oI5ebzKLIvJrW3W/cc0u', NULL, 'client', '2025-06-01 15:05:25'),
(5, 'test', 'numéro2', 'testnumero2@gmail.com', '$2b$10$6Py/IMxRCSyit0HmPFWSr.thQ/cpDFvjyMZZ3oSiqENJbX4W.kQvO', NULL, 'client', '2025-06-09 10:55:30');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `commandes`
--
ALTER TABLE `commandes`
  ADD CONSTRAINT `commandes_fk_utilisateur` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateurs` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `details_commandes`
--
ALTER TABLE `details_commandes`
  ADD CONSTRAINT `fk_details_commande` FOREIGN KEY (`commande_id`) REFERENCES `commandes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_details_produit` FOREIGN KEY (`produit_id`) REFERENCES `produits` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `produits`
--
ALTER TABLE `produits`
  ADD CONSTRAINT `produits_ibfk_1` FOREIGN KEY (`categorie_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
