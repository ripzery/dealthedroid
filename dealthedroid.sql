-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: May 06, 2015 at 05:18 AM
-- Server version: 5.5.34
-- PHP Version: 5.5.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

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
  `brand_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `model` (`model`),
  KEY `index_foreignkey_android_brand` (`brand_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=163 ;

--
-- Dumping data for table `android`
--

INSERT INTO `android` (`id`, `model`, `price`, `quantity`, `brand_id`) VALUES
(149, 'N3', '14990', 8, 37),
(151, 'Note 4', '22222', 1, 18),
(152, 'Mi3', '12000', 5, 37),
(153, 'Mi4', '12000', 5, 37),
(154, 'Mi2', '12000', 5, 37),
(155, 'ne', '12000', 5, 19),
(156, 'One', '12000', 5, 19),
(157, 'Two', '12000', 5, 19),
(158, 'Three', '12000', 5, 19),
(159, 'G5', '12000', 4, 39),
(160, 'G6', '12000', 4, 39),
(161, 'G1', '12000', 4, 39),
(162, 'G2', '7000', 5, 39);

-- --------------------------------------------------------

--
-- Table structure for table `brand`
--

CREATE TABLE `brand` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=40 ;

--
-- Dumping data for table `brand`
--

INSERT INTO `brand` (`id`, `name`) VALUES
(39, 'LG'),
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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=32 ;

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
(31, 'N3', 'Oppo', 1, '450.149812425', 17);

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `total_price` int(10) NOT NULL,
  `tax` varchar(20) NOT NULL,
  `shipping` varchar(20) NOT NULL,
  `created_time` datetime NOT NULL,
  `users_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_foreignkey_transactions_users` (`users_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=18 ;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `total_price`, `tax`, `shipping`, `created_time`, `users_id`) VALUES
(9, 27870, '1820', '50', '2015-05-04 13:51:37', 2),
(10, 26789, '1749.3', '50', '2015-05-04 13:54:54', 2),
(11, 2190, '140', '50', '2015-05-04 13:59:12', 2),
(12, 13949, '909.3', '50', '2015-05-05 01:46:01', 6),
(13, 32129, '2098.6', '50', '2015-05-05 01:55:12', 6),
(14, 57809, '3778.6', '50', '2015-05-05 05:18:20', 6),
(15, 109385, '7152.74', '50', '2015-05-05 09:11:07', 6),
(16, 38570, '2520', '50', '2015-05-05 19:53:33', 6),
(17, 724, '44.12', '50', '2015-05-05 21:30:19', 18);

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=19 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`) VALUES
(1, 'admin', 'd033e22ae348aeb5660fc2140aec35850c4da997', 'admin'),
(2, 'bob', '48181acd22b3edaebc8a447868a7df7ce629920a', 'user'),
(6, 'ripzery', '4588c2a6d20331ba7b777571cc0dce778aadeab1', 'user'),
(7, 'username', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', 'user'),
(14, 'InternalServer', '4884311515a05368b6ad8ad9c0eab94cfd773521', 'user'),
(18, 'caramelfalcao', 'ea0884ba59dc444db3bc3a773217c0370c3e7ae2', 'user');

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
