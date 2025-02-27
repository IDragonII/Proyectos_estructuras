-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-07-2024 a las 16:34:02
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
-- Base de datos: `biblioteca`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libros`
--

CREATE TABLE `libros` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `autor` varchar(255) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `libros`
--

INSERT INTO `libros` (`id`, `nombre`, `autor`, `fecha`) VALUES
(1, 'The Help', 'Kathryn Stockett', '2009-02-10'),
(2, '1984', 'George Orwell', '1949-06-08'),
(3, 'The Great Gatsby', 'F. Scott Fitzgerald', '1925-04-10'),
(4, 'The Catcher in the Rye', 'J.D. Salinger', '1951-07-16'),
(6, 'Fahrenheit 451', 'Ray Bradbury', '1953-10-19'),
(7, 'Pride and Prejudice', 'Jane Austen', '1813-01-28'),
(8, 'Brave New World', 'Aldous Huxley', '1932-08-30'),
(9, 'Moby-Dick', 'Herman Melville', '1851-10-18'),
(10, 'War and Peace', 'Leo Tolstoy', '1869-01-01'),
(11, 'Jane Eyre', 'Charlotte Bronte', '1847-10-16'),
(12, 'Crime and Punishment', 'Fyodor Dostoevsky', '1866-01-01'),
(13, 'The Adventures of Huckleberry Finn', 'Mark Twain', '1884-12-10'),
(14, 'Wuthering Heights', 'Emily Bronte', '1847-12-01'),
(15, 'The Odyssey', 'Homer', '0800-01-01'),
(16, 'Madame Bovary', 'Gustave Flaubert', '1857-04-15'),
(17, 'The Iliad', 'Homer', '0800-01-01'),
(18, 'Frankenstein', 'Mary Shelley', '1818-01-01'),
(19, 'Great Expectations', 'Charles Dickens', '1861-01-01'),
(20, 'Anna Karenina', 'Leo Tolstoy', '1877-01-01'),
(21, 'Don Quixote', 'Miguel de Cervantes', '1615-01-01'),
(22, 'The Brothers Karamazov', 'Fyodor Dostoevsky', '1880-01-01'),
(23, 'One Hundred Years of Solitude', 'Gabriel Garcia Marquez', '1967-05-30'),
(24, 'The Count of Monte Cristo', 'Alexandre Dumas', '1844-08-28'),
(25, 'Ulysses', 'James Joyce', '1922-02-02'),
(26, 'The Sound and the Fury', 'William Faulkner', '1929-10-07'),
(27, 'The Picture of Dorian Gray', 'Oscar Wilde', '1890-07-20'),
(28, 'The Stranger', 'Albert Camus', '1942-01-01'),
(29, 'In Search of Lost Time', 'Marcel Proust', '1913-01-01'),
(30, 'Dracula', 'Bram Stoker', '1897-05-26'),
(31, 'Heart of Darkness', 'Joseph Conrad', '1899-01-01'),
(32, 'The Grapes of Wrath', 'John Steinbeck', '1939-04-14'),
(33, 'The Trial', 'Franz Kafka', '1925-01-01'),
(34, 'Middlemarch', 'George Eliot', '1871-12-01'),
(35, 'The Metamorphosis', 'Franz Kafka', '1915-01-01'),
(36, 'Catch-22', 'Joseph Heller', '1961-11-10'),
(37, 'The Sun Also Rises', 'Ernest Hemingway', '1926-10-22'),
(38, 'Les Miserables', 'Victor Hugo', '1862-01-01'),
(39, 'The Master and Margarita', 'Mikhail Bulgakov', '1967-01-01'),
(40, 'The Divine Comedy', 'Dante Alighieri', '1320-01-01'),
(41, 'Lolita', 'Vladimir Nabokov', '1955-01-01'),
(42, 'Beloved', 'Toni Morrison', '1987-09-02'),
(43, 'Mrs. Dalloway', 'Virginia Woolf', '1925-05-14'),
(44, 'Things Fall Apart', 'Chinua Achebe', '1958-06-17'),
(45, 'David Copperfield', 'Charles Dickens', '1850-05-30'),
(46, 'Mansfield Park', 'Jane Austen', '1814-07-09'),
(47, 'Sense and Sensibility', 'Jane Austen', '1811-10-30'),
(48, 'Emma', 'Jane Austen', '1815-12-23'),
(49, 'The Old Man and the Sea', 'Ernest Hemingway', '1952-09-01'),
(50, 'A Tale of Two Cities', 'Charles Dickens', '1859-04-30'),
(51, 'Of Mice and Men', 'John Steinbeck', '1937-11-23'),
(52, 'Slaughterhouse-Five', 'Kurt Vonnegut', '1969-03-31'),
(53, 'The Handmaids Tale', 'Margaret Atwood', '1985-09-01'),
(54, 'Animal Farm', 'George Orwell', '1945-08-17'),
(55, 'The Book Thief', 'Markus Zusak', '2005-09-01'),
(56, 'Gone with the Wind', 'Margaret Mitchell', '1936-06-30'),
(57, 'Life of Pi', 'Yann Martel', '2001-09-11'),
(58, 'The Road', 'Cormac McCarthy', '2006-09-26'),
(59, 'The Kite Runner', 'Khaled Hosseini', '2003-05-29'),
(60, 'Memoirs of a Geisha', 'Arthur Golden', '1997-09-27'),
(61, 'The Help', 'Kathryn Stockett', '2009-02-10'),
(62, 'Atonement', 'Ian McEwan', '2001-09-01'),
(63, 'The Lovely Bones', 'Alice Sebold', '2002-07-03'),
(64, 'Water for Elephants', 'Sara Gruen', '2006-05-26'),
(65, 'The Hunger Games', 'Suzanne Collins', '2008-09-14'),
(66, 'Catching Fire', 'Suzanne Collins', '2009-09-01'),
(67, 'Mockingjay', 'Suzanne Collins', '2010-08-24'),
(68, 'Harry Potter and the Sorcerers Stone', 'J.K. Rowling', '1997-06-26'),
(69, 'Harry Potter and the Chamber of Secrets', 'J.K. Rowling', '1998-07-02'),
(70, 'Harry Potter and the Prisoner of Azkaban', 'J.K. Rowling', '1999-07-08'),
(71, 'Harry Potter and the Goblet of Fire', 'J.K. Rowling', '2000-07-08'),
(72, 'Harry Potter and the Order of the Phoenix', 'J.K. Rowling', '2003-06-21'),
(73, 'Harry Potter and the Half-Blood Prince', 'J.K. Rowling', '2005-07-16'),
(74, 'Harry Potter and the Deathly Hallows', 'J.K. Rowling', '2007-07-21'),
(75, 'Twilight', 'Stephenie Meyer', '2005-10-05'),
(76, 'New Moon', 'Stephenie Meyer', '2006-09-06'),
(77, 'Eclipse', 'Stephenie Meyer', '2007-08-07'),
(78, 'Breaking Dawn', 'Stephenie Meyer', '2008-08-02'),
(79, 'The Da Vinci Code', 'Dan Brown', '2003-03-18'),
(80, 'Angels & Demons', 'Dan Brown', '2000-05-01'),
(81, 'Inferno', 'Dan Brown', '2013-05-14'),
(82, 'Digital Fortress', 'Dan Brown', '1998-02-01'),
(83, 'Deception Point', 'Dan Brown', '2001-11-01'),
(84, 'The Girl with the Dragon Tattoo', 'Stieg Larsson', '2005-08-01'),
(85, 'The Girl Who Played with Fire', 'Stieg Larsson', '2006-01-01'),
(86, 'The Girl Who Kicked the Hornets Nest', 'Stieg Larsson', '2007-05-01'),
(87, 'Gone Girl', 'Gillian Flynn', '2012-05-24'),
(88, 'The Fault in Our Stars', 'John Green', '2012-01-10'),
(89, 'Looking for Alaska', 'John Green', '2005-03-03'),
(90, 'Paper Towns', 'John Green', '2008-10-16'),
(91, 'An Abundance of Katherines', 'John Green', '2006-09-21'),
(92, 'Will Grayson, Will Grayson', 'John Green, David Levithan', '2010-04-06'),
(93, 'The Secret Garden', 'Frances Hodgson Burnett', '1911-08-01'),
(94, 'A Room with a View', 'E.M. Forster', '1908-01-01'),
(95, 'Rebecca', 'Daphne du Maurier', '1938-08-01'),
(96, 'The Bell Jar', 'Sylvia Plath', '1963-01-14'),
(97, 'The Scarlet Letter', 'Nathaniel Hawthorne', '1850-03-16'),
(98, 'The Wind in the Willows', 'Kenneth Grahame', '1908-10-08'),
(99, 'Treasure Island', 'Robert Louis Stevenson', '1883-11-14'),
(100, 'Little Women', 'Louisa May Alcott', '1868-09-30'),
(101, 'The Call of the Wild', 'Jack London', '1903-01-01'),
(102, 'White Fang', 'Jack London', '1906-01-01'),
(103, 'The Red Badge of Courage', 'Stephen Crane', '1895-10-01'),
(104, 'Uncle Toms Cabin', 'Harriet Beecher Stowe', '1852-03-20'),
(105, 'Robinson Crusoe', 'Daniel Defoe', '1719-04-25'),
(106, 'Gullivers Travels', 'Jonathan Swift', '1726-10-28'),
(107, 'Peter Pan', 'J.M. Barrie', '1904-12-27'),
(108, 'Anne of Green Gables', 'L.M. Montgomery', '1908-06-01'),
(109, 'The Three Musketeers', 'Alexandre Dumas', '1844-03-01'),
(110, 'The Hunchback of Notre-Dame', 'Victor Hugo', '1831-01-14'),
(111, 'Journey to the Center of the Earth', 'Jules Verne', '1864-11-25'),
(112, 'Around the World in Eighty Days', 'Jules Verne', '1872-10-02'),
(113, 'Twenty Thousand Leagues Under the Sea', 'Jules Verne', '1870-06-20'),
(114, 'The Time Machine', 'H.G. Wells', '1895-05-07'),
(115, 'The War of the Worlds', 'H.G. Wells', '1898-04-01'),
(116, 'The Invisible Man', 'H.G. Wells', '1897-06-01'),
(117, 'The Prince', 'Niccolo Machiavelli', '1532-01-01'),
(118, 'Leviathan', 'Thomas Hobbes', '1651-01-01'),
(119, 'Paradise Lost', 'John Milton', '1667-01-01'),
(120, 'Pilgrims Progress', 'John Bunyan', '1678-01-01'),
(121, 'A Christmas Carol', 'Charles Dickens', '1843-12-19'),
(122, 'Oliver Twist', 'Charles Dickens', '1837-02-07'),
(123, 'Hard Times', 'Charles Dickens', '1854-04-01'),
(124, 'Bleak House', 'Charles Dickens', '1853-08-01'),
(125, 'The Old Curiosity Shop', 'Charles Dickens', '1841-04-01'),
(126, 'Dombey and Son', 'Charles Dickens', '1848-10-01'),
(127, 'The Pickwick Papers', 'Charles Dickens', '1836-03-01'),
(128, 'Nicholas Nickleby', 'Charles Dickens', '1839-03-01'),
(129, 'Barnaby Rudge', 'Charles Dickens', '1841-02-01'),
(130, 'Martin Chuzzlewit', 'Charles Dickens', '1844-01-01'),
(131, 'Great Expectations', 'Charles Dickens', '1861-01-01'),
(132, 'David Copperfield', 'Charles Dickens', '1850-05-30'),
(133, 'A Tale of Two Cities', 'Charles Dickens', '1859-04-30'),
(134, 'Our Mutual Friend', 'Charles Dickens', '1865-11-01'),
(135, 'Little Dorrit', 'Charles Dickens', '1857-01-01'),
(136, 'The Mystery of Edwin Drood', 'Charles Dickens', '1870-01-01'),
(138, 'The Prince and the Pauper', 'Mark Twain', '1881-01-01'),
(139, 'Life on the Mississippi', 'Mark Twain', '1883-01-01'),
(140, 'Adventures of Huckleberry Finn', 'Mark Twain', '1884-12-10'),
(141, 'A Connecticut Yankee in King Arthurs Court', 'Mark Twain', '1889-01-01'),
(142, 'The Innocents Abroad', 'Mark Twain', '1869-01-01'),
(143, 'The Adventures of Tom Sawyer', 'Mark Twain', '1876-01-01'),
(144, 'The Mysterious Stranger', 'Mark Twain', '1916-01-01'),
(145, 'Puddnhead Wilson', 'Mark Twain', '1894-01-01'),
(146, 'The Celebrated Jumping Frog of Calaveras County', 'Mark Twain', '1865-11-18'),
(147, 'The Red and the Black', 'Stendhal', '1830-11-01'),
(148, 'The Charterhouse of Parma', 'Stendhal', '1839-03-01'),
(149, 'The Flowers of Evil', 'Charles Baudelaire', '1857-01-01'),
(150, 'Les Miserables', 'Victor Hugo', '1862-01-01'),
(151, 'Notre-Dame de Paris', 'Victor Hugo', '1831-01-14'),
(152, 'Toilers of the Sea', 'Victor Hugo', '1866-01-01'),
(153, 'The Man Who Laughs', 'Victor Hugo', '1869-01-01'),
(154, 'The Brothers Karamazov', 'Fyodor Dostoevsky', '1880-01-01'),
(155, 'Crime and Punishment', 'Fyodor Dostoevsky', '1866-01-01'),
(156, 'The Idiot', 'Fyodor Dostoevsky', '1869-01-01'),
(157, 'Demons', 'Fyodor Dostoevsky', '1872-01-01'),
(158, 'War and Peace', 'Leo Tolstoy', '1869-01-01'),
(159, 'Anna Karenina', 'Leo Tolstoy', '1877-01-01'),
(160, 'Resurrection', 'Leo Tolstoy', '1899-01-01'),
(161, 'Childhood', 'Leo Tolstoy', '1852-01-01'),
(162, 'The Death of Ivan Ilyich', 'Leo Tolstoy', '1886-01-01'),
(163, 'Eugene Onegin', 'Alexander Pushkin', '1833-01-01'),
(164, 'The Captains Daughter', 'Alexander Pushkin', '1836-01-01'),
(165, 'Dead Souls', 'Nikolai Gogol', '1842-01-01'),
(166, 'Taras Bulba', 'Nikolai Gogol', '1835-01-01'),
(167, 'Fathers and Sons', 'Ivan Turgenev', '1862-01-01'),
(168, 'The Queen of Spades', 'Alexander Pushkin', '1834-01-01'),
(169, 'War and Peace', 'Leo Tolstoy', '1869-01-01'),
(170, 'Crime and Punishment', 'Fyodor Dostoevsky', '1866-01-01'),
(171, 'The Master and Margarita', 'Mikhail Bulgakov', '1967-01-01'),
(172, 'Doctor Zhivago', 'Boris Pasternak', '1957-01-01'),
(173, 'Lolita', 'Vladimir Nabokov', '1955-01-01'),
(174, 'The Gulag Archipelago', 'Aleksandr Solzhenitsyn', '1973-01-01'),
(175, 'One Day in the Life of Ivan Denisovich', 'Aleksandr Solzhenitsyn', '1962-01-01'),
(176, 'The First Circle', 'Aleksandr Solzhenitsyn', '1968-01-01'),
(177, 'Cancer Ward', 'Aleksandr Solzhenitsyn', '1966-01-01'),
(178, 'We', 'Yevgeny Zamyatin', '1924-01-01'),
(179, 'Heart of a Dog', 'Mikhail Bulgakov', '1925-01-01'),
(180, 'The White Guard', 'Mikhail Bulgakov', '1925-01-01'),
(181, 'The Cherry Orchard', 'Anton Chekhov', '1904-01-01'),
(182, 'Three Sisters', 'Anton Chekhov', '1900-01-01'),
(183, 'The Seagull', 'Anton Chekhov', '1896-01-01'),
(187, 'The Great Gatsby', 'F. Scott Fitzgerald', '1925-04-10'),
(188, 'To Kill a Mockingbird', 'Harper Lee', '1960-07-11'),
(189, '1984', 'George Orwell', '1949-06-08'),
(190, 'Pride and Prejudice', 'Jane Austen', '1813-01-28'),
(191, 'The Catcher in the Rye', 'J.D. Salinger', '1951-07-16'),
(192, 'Harry Potter and the Philosophers Stone', 'J.K. Rowling', '1997-06-26'),
(193, 'Animal Farm', 'George Orwell', '1945-08-17'),
(194, 'Brave New World', 'Aldous Huxley', '1932-10-27'),
(195, 'The Hobbit', 'J.R.R. Tolkien', '1937-09-21'),
(196, 'Fahrenheit 451', 'Ray Bradbury', '1953-10-19'),
(197, 'The Lord of the Rings', 'J.R.R. Tolkien', '1954-07-29'),
(198, 'Jane Eyre', 'Charlotte Brontë', '1847-10-16'),
(199, 'Moby-Dick', 'Herman Melville', '1851-10-18'),
(200, 'The Hitchhikers Guide to the Galaxy', 'Douglas Adams', '1979-10-12'),
(201, 'Frankenstein', 'Mary Shelley', '1818-01-01'),
(202, 'Wuthering Heights', 'Emily Brontë', '1847-12-19'),
(203, 'The Picture of Dorian Gray', 'Oscar Wilde', '1890-06-20'),
(204, 'One Hundred Years of Solitude', 'Gabriel García Márquez', '1967-05-30'),
(205, 'Anna Karenina', 'Leo Tolstoy', '1877-03-03'),
(206, 'The Bell Jar', 'Sylvia Plath', '1963-01-14'),
(207, 'The Road', 'Cormac McCarthy', '2006-09-26'),
(208, 'Crime and Punishment', 'Fyodor Dostoevsky', '1866-11-14'),
(209, 'Gone with the Wind', 'Margaret Mitchell', '1936-06-30'),
(210, 'The Grapes of Wrath', 'John Steinbeck', '1939-04-14'),
(211, 'The Count of Monte Cristo', 'Alexandre Dumas', '1844-08-28'),
(212, 'The Shining', 'Stephen King', '1977-01-28'),
(213, 'The Brothers Karamazov', 'Fyodor Dostoevsky', '1880-11-26'),
(214, 'The Odyssey', 'Homer', '0800-01-01'),
(215, 'The Stranger', 'Albert Camus', '1942-05-19'),
(216, 'Les Misérables', 'Victor Hugo', '1862-03-30'),
(217, 'A Tale of Two Cities', 'Charles Dickens', '1859-11-26'),
(218, 'The Handmaids Tale', 'Margaret Atwood', '1985-09-17'),
(219, 'The Scarlet Letter', 'Nathaniel Hawthorne', '1850-03-16'),
(220, 'Slaughterhouse-Five', 'Kurt Vonnegut', '1969-03-31'),
(221, 'War and Peace', 'Leo Tolstoy', '1869-01-01'),
(222, 'Great Expectations', 'Charles Dickens', '1861-08-01'),
(223, 'The Little Prince', 'Antoine de Saint-Exupéry', '1943-04-06'),
(224, 'David Copperfield', 'Charles Dickens', '1850-05-14'),
(225, 'The Girl with the Dragon Tattoo', 'Stieg Larsson', '2005-08-16'),
(226, 'The Stand', 'Stephen King', '1978-09-01'),
(227, 'The Chronicles of Narnia', 'C.S. Lewis', '1950-10-16'),
(228, 'Catch-22', 'Joseph Heller', '1961-11-10'),
(229, 'The Diary of a Young Girl', 'Anne Frank', '1947-06-25'),
(230, 'Watership Down', 'Richard Adams', '1972-11-06'),
(231, 'The Old Man and the Sea', 'Ernest Hemingway', '1952-09-01'),
(232, 'The Name of the Rose', 'Umberto Eco', '1980-09-01'),
(233, 'The Adventures of Sherlock Holmes', 'Arthur Conan Doyle', '1892-10-14'),
(234, 'Don Quixote', 'Miguel de Cervantes', '1605-01-16'),
(235, 'Charlotte\'s Web', 'E.B. White', '1952-10-15'),
(236, 'The Wind-Up Bird Chronicle', 'Haruki Murakami', '1994-10-17'),
(237, 'The Secret History', 'Donna Tartt', '1992-09-05'),
(238, 'The Goldfinch', 'Donna Tartt', '2013-10-22'),
(239, 'The Trial', 'Franz Kafka', '1925-04-26'),
(240, 'Middlemarch', 'George Eliot', '1871-12-01'),
(241, 'The Book Thief', 'Markus Zusak', '2005-03-14'),
(242, 'The Outsider', 'Stephen King', '2018-05-22'),
(243, 'Beloved', 'Toni Morrison', '1987-09-02'),
(244, 'Great Expectations', 'Charles Dickens', '1861-08-01'),
(245, 'Lolita', 'Vladimir Nabokov', '1955-09-15'),
(246, 'The Wasp Factory', 'Iain Banks', '1984-06-08'),
(247, 'The Stand', 'Stephen King', '1978-09-01'),
(248, 'The Moon Is a Harsh Mistress', 'Robert A. Heinlein', '1966-01-01'),
(249, 'Foundation', 'Isaac Asimov', '1951-05-01'),
(250, 'Jurassic Park', 'Michael Crichton', '1990-11-20'),
(251, 'American Gods', 'Neil Gaiman', '2001-06-19'),
(252, 'The Time Machine', 'H.G. Wells', '1895-05-07'),
(253, 'Dune', 'Frank Herbert', '1965-08-01'),
(254, 'I, Robot', 'Isaac Asimov', '1950-12-02'),
(255, 'The Handmaids Tale', 'Margaret Atwood', '1985-09-17'),
(256, 'The Road', 'Cormac McCarthy', '2006-09-26'),
(257, 'The Book Thief', 'Markus Zusak', '2005-03-14'),
(258, 'The Catcher in the Rye', 'J.D. Salinger', '1951-07-16'),
(259, 'The Fault in Our Stars', 'John Green', '2012-01-10'),
(260, 'The Kite Runner', 'Khaled Hosseini', '2003-05-29'),
(261, 'Life of Pi', 'Yann Martel', '2001-09-11'),
(262, 'The Perks of Being a Wallflower', 'Stephen Chbosky', '1999-02-01'),
(263, 'The Maze Runner', 'James Dashner', '2009-10-06'),
(264, 'The Hunger Games', 'Suzanne Collins', '2008-09-14'),
(265, 'The Girl on the Train', 'Paula Hawkins', '2015-01-13'),
(266, 'Gone Girl', 'Gillian Flynn', '2012-06-05'),
(267, 'The Da Vinci Code', 'Dan Brown', '2003-03-18'),
(268, 'Twilight', 'Stephenie Meyer', '2005-10-05'),
(269, 'The Help', 'Kathryn Stockett', '2009-02-10'),
(270, 'The Lovely Bones', 'Alice Sebold', '2002-07-03'),
(271, 'Room', 'Emma Donoghue', '2010-08-29'),
(272, 'The Alchemist', 'Paulo Coelho', '1988-01-01'),
(273, 'The Shack', 'William P. Young', '2007-07-01'),
(274, 'Eat, Pray, Love', 'Elizabeth Gilbert', '2006-02-16'),
(275, 'The Notebook', 'Nicholas Sparks', '1996-10-01'),
(276, 'A Game of Thrones', 'George R.R. Martin', '1996-08-06'),
(277, 'The Martian', 'Andy Weir', '2011-09-27'),
(278, 'Big Little Lies', 'Liane Moriarty', '2014-07-29'),
(279, 'Crazy Rich Asians', 'Kevin Kwan', '2013-06-11'),
(280, 'The Night Circus', 'Erin Morgenstern', '2011-09-13'),
(281, 'The Goldfinch', 'Donna Tartt', '2013-10-22'),
(282, 'The Rosie Project', 'Graeme Simsion', '2013-01-30'),
(283, 'The Light Between Oceans', 'M.L. Stedman', '2012-07-31');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `libros`
--
ALTER TABLE `libros`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `libros`
--
ALTER TABLE `libros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=287;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
