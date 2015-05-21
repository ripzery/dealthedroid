-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: May 16, 2015 at 02:55 PM
-- Server version: 5.5.34
-- PHP Version: 5.5.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+07:00";

--
-- Database: `dealthedroid`
--

-- --------------------------------------------------------

--
-- Table structure for table `android`
--

CREATE TABLE `android` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `model` varchar(50) NOT NULL,
  `price` varchar(10) NOT NULL,
  `quantity` double DEFAULT NULL,
  `description` varchar(500) NOT NULL DEFAULT 'Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
  `brand_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `model` (`model`),
  KEY `index_foreignkey_android_brand` (`brand_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=204 ;

--
-- Dumping data for table `android`
--

INSERT INTO `android` (`id`, `model`, `price`, `quantity`, `description`, `brand_id`) VALUES
(187, 'Mi 4i', '12000', 17, 'The Xiomi Mi 4i is an affordable dual-SIM smartphone sporting a 5-inch 1080p screen, 1.7-GHz Qualcomm Snapdragon 615 octa-core chip, 2GB of RAM and 16GB of stor', 20),
(189, 'Redmi Note', '6900', 19, 'The Redmi Note have two versions: with an octa-core 1.4GHz CPU and 1GB of RAM, and with an octa-core 1.7Ghz CPU and 2GB of RAM.', 20),
(190, 'Find 7A', '17000', 19, 'The Find 7a is a high-end device to consider, if you don’t mind buying your smartphone from a China-based company. The 7a features Color OS.', 37),
(191, 'Find 5', '12000', 19, 'Oppo Find 5 is the world''s second phone with Full HD display. The 5-incher sports a display with 1920x1080 pixels, just like the Droid DNA, clocking at 441ppi.', 37),
(192, 'G4', '24000', 20, 'The LG G4 certainly isn''t the "radically different" smartphone LG executives promised, but it isn''t last year''s phone either.', 39),
(193, 'Moto G 2014', '7000', 20, 'While most of the buzz has been for its brother the new Moto X, there is officially a new Moto G as well.', 40),
(194, 'Moto X', '15000', 19, 'DESCRIPTION\nWith the new Moto X we are getting a 5.2-inch AMOLED display running at 1080p, a customized Snapdragon 801 clocked at 2.5GHz, 2GB of RAM', 40),
(195, 'DROID MAXX', '17800', 19, 'Motorola DROID MAXX has a 3500 mAh battery, which is 200 mAh more than its predecessor, and the kind of capacity only phablets get equipped with nowadays', 40),
(196, 'ONE M9', '23990', 19, 'With a premium all-metal unibody, the beautiful One M9 doesn''t stray away from HTC''s gorgeous design tradition for its flagship line.', 43),
(198, 'Design 816', '15000', 18, 'he HTC Desire 816 sports 5.5-inch display, 1.6GHz quad-core processor, 4G LTE connectivity and two powerful cameras - a 13MP rear-facing camera as well as a 5MP', 43),
(199, 'Zenfone 2', '10990', 18, 'The most notable feature of the Asus ZenFone 2 is the 4 Gigs of RAM. It''s other hardware include LTE-enabled, 64-bit Intel Atom Z3580 processor with four cores', 42),
(200, 'Nexus 6', '17000', 18, 'The Nexus 6 is powered by the Snapdragon 805 system chip, the jewel in Qualcomm’s 32-bit crown', 41);

-- --------------------------------------------------------

--
-- Table structure for table `brand`
--

CREATE TABLE `brand` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=44 ;

--
-- Dumping data for table `brand`
--

INSERT INTO `brand` (`id`, `name`) VALUES
(42, 'Asus'),
(41, 'Google'),
(43, 'HTC'),
(39, 'LG'),
(40, 'Motolora'),
(19, 'OnePlus'),
(37, 'Oppo'),
(18, 'Samsung'),
(20, 'Xiaomi');

-- --------------------------------------------------------

--
-- Table structure for table `records`
--

CREATE TABLE `records` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `model` varchar(50) NOT NULL,
  `brand` varchar(50) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` varchar(20) NOT NULL,
  `transactions_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_foreignkey_records_transactions` (`transactions_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=63 ;

--
-- Dumping data for table `records`
--

INSERT INTO `records` (`id`, `model`, `brand`, `quantity`, `price`, `transactions_id`) VALUES
(10, 'Galaxy', 'Samsung', 1, '2000', 9),
(11, 'Note', 'Samsung', 1, '24000', 9),
(12, 'N2', 'Oppo', 1, '12990', 10),
(13, 'Ace', 'Samsung', 2, '6000', 10),
(14, 'Galaxy Note 4', 'Samsung', 1, '2000', 11),
(15, 'One', 'OnePlus', 1, '12990', 12),
(16, 'N3', 'Oppo', 1, '14990', 13),
(17, 'N4', 'Oppo', 1, '14990', 13),
(18, 'Note edge', 'Samsung', 1, '24000', 14),
(19, 'N3', 'Oppo', 1, '14990', 14),
(20, 'N4', 'Oppo', 1, '14990', 14),
(21, 'One', 'OnePlus', 1, '12990', 15),
(22, 'N3', 'Oppo', 1, '14990', 15),
(23, 'Note edge', 'Samsung', 1, '24000', 15),
(24, 'N4', 'Oppo', 1, '14990', 15),
(25, 'Note 4', 'Samsung', 1, '22222', 15),
(26, 'N2', 'Oppo', 1, '12990', 15),
(27, 'G5', 'LG', 1, '12000', 16),
(28, 'G6', 'LG', 1, '12000', 16),
(29, 'G1', 'LG', 1, '12000', 16),
(30, 'Ace', 'Samsung', 1, '180.180045', 17),
(31, 'N3', 'Oppo', 1, '450.149812425', 17),
(32, 'N2', 'Oppo', 1, '239.992800072', 18),
(33, 'Mi3s', 'Xiaomi', 1, '266.99199008', 18),
(34, 'Ace2', 'Samsung', 1, '149.995500045', 18),
(35, 'Ace2', 'Samsung', 1, '149.979000735', 21),
(36, 'N2', 'Oppo', 1, '239.966401176', 21),
(37, 'Mi3s', 'Xiaomi', 1, '266.962621308', 21),
(38, 'Ace3', 'Samsung', 1, '149.979000735', 21),
(39, 'N2', 'Oppo', 1, '240.0228', 22),
(40, 'Ace3', 'Samsung', 1, '150.03', 23),
(41, 'R5', 'Oppo', 1, '16016.2236', 24),
(42, 'Galaxy S5 Plus', 'Samsung', 1, '18019.5036', 24),
(43, 'G2', 'LG', 1, '18900', 25),
(44, 'Galaxy S6', 'Samsung', 20, '23990', 25),
(45, 'Galaxy Note 4', 'Samsung', 1, '1', 26),
(46, 'Mi 4i', 'Xiaomi', 1, '12000', 26),
(47, 'Redmi Note', 'Xiaomi', 1, '6900', 26),
(48, 'Nexus 6', 'Google', 1, '17000', 27),
(49, 'Design 816', 'HTC', 1, '15000', 27),
(50, 'Zenfone 2', 'Asus', 1, '10990', 27),
(51, 'Nexus 6', 'Google', 1, '17000', 28),
(52, 'Nexus', 'Google', 1, '1', 28),
(53, 'Design 816', 'HTC', 1, '15000', 28),
(54, 'ONE M9', 'HTC', 1, '23990', 28),
(55, 'Zenfone 2', 'Asus', 1, '10990', 28),
(56, 'Moto X', 'Motolora', 1, '15000', 28),
(57, 'DROID MAXX', 'Motolora', 1, '17800', 28),
(58, 'Find 5', 'Oppo', 1, '12000', 29),
(59, 'Mi 4i', 'Xiaomi', 1, '12000', 29),
(60, 'Galaxy Note 4', 'Samsung', 110, '1', 29),
(61, 'Mi 4i', 'Xiaomi', 1, '12000', 30),
(62, 'Find 7A', 'Oppo', 1, '17000', 30);

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `total_price` int(10) NOT NULL,
  `tax` varchar(20) NOT NULL,
  `shipping` varchar(20) NOT NULL,
  `currency` varchar(3) NOT NULL DEFAULT 'THB',
  `created_time` datetime NOT NULL,
  `users_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_foreignkey_transactions_users` (`users_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=31 ;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `total_price`, `tax`, `shipping`, `currency`, `created_time`, `users_id`) VALUES
(9, 27870, '1820', '50', 'THB', '2015-05-04 13:51:37', 2),
(10, 26789, '1749.3', '50', 'THB', '2015-05-04 13:54:54', 2),
(11, 2190, '140', '50', 'THB', '2015-05-04 13:59:12', 2),
(12, 13949, '909.3', '50', 'THB', '2015-05-05 01:46:01', 6),
(13, 32129, '2098.6', '50', 'THB', '2015-05-05 01:55:12', 6),
(14, 57809, '3778.6', '50', 'THB', '2015-05-05 05:18:20', 6),
(15, 109385, '7152.74', '50', 'THB', '2015-05-05 09:11:07', 6),
(16, 38570, '2520', '50', 'THB', '2015-05-05 19:53:33', 6),
(17, 724, '44.12', '50', 'THB', '2015-05-05 21:30:19', 18),
(18, 753, '45.99', '50', 'THB', '2015-05-07 05:30:48', 2),
(19, 9573, '623', '50', 'THB', '2015-05-07 05:38:26', 2),
(20, 13960, '910', '50', 'THB', '2015-05-07 05:41:47', 2),
(21, 913, '56.48', '50', 'THB', '2015-05-07 05:47:58', 2),
(22, 307, '16.8', '50', '$', '2015-05-07 05:55:09', 2),
(23, 211, '10.5', '50', '$', '2015-05-07 05:56:44', 2),
(24, 36468, '2382.5', '50', 'THB', '2015-05-07 07:58:50', 2),
(25, 533659, '34909', '50', 'THB', '2015-05-07 08:04:27', 6),
(26, 20274, '1323.07', '50', 'THB', '2015-05-13 15:40:03', 2),
(27, 46049, '3009.3', '50', 'THB', '2015-05-16 05:05:49', 6),
(28, 106816, '6984.67', '50', 'THB', '2015-05-16 05:07:31', 6),
(29, 25848, '1687.7', '50', 'THB', '2015-05-16 09:39:29', 2),
(30, 31080, '2030', '50', 'THB', '2015-05-16 09:49:30', 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `role` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=21 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`) VALUES
(1, 'admin', 'd033e22ae348aeb5660fc2140aec35850c4da997', 'admin'),
(2, 'bob', '48181acd22b3edaebc8a447868a7df7ce629920a', 'user'),
(6, 'ripzery', '4588c2a6d20331ba7b777571cc0dce778aadeab1', 'user'),
(7, 'username', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', 'user'),
(14, 'InternalServer', '4884311515a05368b6ad8ad9c0eab94cfd773521', 'user'),
(18, 'caramelfalcao', 'ea0884ba59dc444db3bc3a773217c0370c3e7ae2', 'user'),
(20, 'pppp', 'eca0395ce52ff7c48b95f88737bbfb6a062bab2e', 'user');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `android`
--
ALTER TABLE `android`
  ADD CONSTRAINT `c_fk_android_brand_id` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `c_fk_transactions_users_id` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;