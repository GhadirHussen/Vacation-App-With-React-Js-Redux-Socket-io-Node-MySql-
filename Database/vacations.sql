-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 02, 2021 at 12:20 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations`
--

-- --------------------------------------------------------

--
-- Table structure for table `followvacations`
--

CREATE TABLE `followvacations` (
  `userID` int(11) NOT NULL,
  `vacationID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `followvacations`
--

INSERT INTO `followvacations` (`userID`, `vacationID`) VALUES
(2, 2),
(4, 1),
(2, 4),
(4, 3),
(3, 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `firstName` varchar(10) NOT NULL,
  `lastName` varchar(10) NOT NULL,
  `userName` varchar(10) NOT NULL,
  `password` varchar(30) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `firstName`, `lastName`, `userName`, `password`, `isAdmin`) VALUES
(1, 'admin', 'admin', 'admin', 'admin', 1),
(2, 'hussen', 'hussen', 'hussen', 'hussen', 0),
(3, 'user', 'user', 'user', 'user', 0),
(4, 'neel', 'neel', 'neel', 'neel', 0),
(6, 'ghadir', 'ghadir', 'ghadir', 'ghadir', 0),
(10, 'user2', 'user2', 'user2', 'user2', 0);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationID` int(11) NOT NULL,
  `description` varchar(500) NOT NULL,
  `destination` varchar(15) NOT NULL,
  `imageName` varchar(500) NOT NULL,
  `fromDate` date NOT NULL,
  `toDate` date NOT NULL,
  `price` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationID`, `description`, `destination`, `imageName`, `fromDate`, `toDate`, `price`) VALUES
(1, 'bora bora', 'bora bora', '22dfffa5-2e55-46d8-b2a3-36f16438169e.jpeg', '2021-10-13', '2021-10-28', 499),
(2, 'Phuket it is a nice vacation ', 'Phuket', '16448db5-4f30-413d-a7f8-6ec4e6f44dec.jpg', '2021-10-15', '2021-11-04', 412),
(3, 'Dubai', 'Dubai', 'd1cb5f11-da5e-4b96-ac95-f3291939ed5b.jpg', '2021-10-27', '2021-11-04', 342),
(4, 'paris', 'paris', '69c29ee4-51f2-4935-8d45-7d22982ee4d1.jpg', '2021-10-13', '2021-11-04', 342),
(5, 'Austria', 'Austria', '376c8cf1-3e45-4270-b158-63afab3382fd.jpg', '2021-10-13', '2021-10-21', 299);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followvacations`
--
ALTER TABLE `followvacations`
  ADD KEY `FK_vacation` (`userID`),
  ADD KEY `FK_user` (`vacationID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followvacations`
--
ALTER TABLE `followvacations`
  ADD CONSTRAINT `FK_user` FOREIGN KEY (`vacationID`) REFERENCES `vacations` (`vacationID`),
  ADD CONSTRAINT `FK_vacation` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
