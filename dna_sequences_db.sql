-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-07-2024 a las 18:13:18
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dna_sequences_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dna_sequences`
--

CREATE TABLE `dna_sequences` (
  `id` int(11) NOT NULL,
  `sequence` varchar(255) NOT NULL,
  `person_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `dna_sequences`
--

INSERT INTO `dna_sequences` (`id`, `sequence`, `person_name`) VALUES
(3, 'ATCGATCGATCG', 'Alice'),
(4, 'ATCGTAGCTAGC', 'Bob'),
(5, 'CCGGATCGATCG', 'Charlie'),
(6, 'ATCGATCGTAGC', 'David'),
(7, 'ATCGATCGTAGC', 'Emma'),
(8, 'ATCGATCGGCTA', 'Frank'),
(9, 'ATCGTAGCTAGC', 'Grace'),
(10, 'GCGGATCGATCG', 'Henry'),
(11, 'ATCGATCGTAGC', 'Iris'),
(12, 'ATCGATCGGCTA', 'Jack'),
(13, 'ATCGTAGCTAGC', 'Kevin'),
(14, 'CCGGATCGATCG', 'Lily'),
(15, 'ATCGATCGTAGC', 'Mike'),
(16, 'ATCGATCGGCTA', 'Nancy'),
(17, 'ATCGATCGTAGC', 'Olivia'),
(18, 'ATCGTAGCTAGC', 'Peter'),
(19, 'GCGGATCGATCG', 'Quinn'),
(20, 'ATCGATCGTAGC', 'Rachel'),
(21, 'ATCGATCGGCTA', 'Sam'),
(22, 'ATCGATCGTAGC', 'Tom');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `dna_sequences`
--
ALTER TABLE `dna_sequences`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `dna_sequences`
--
ALTER TABLE `dna_sequences`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
