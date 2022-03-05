-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 05, 2022 at 08:06 PM
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
  `vacationID` int(11) NOT NULL,
  `userID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `firstName` varchar(10) NOT NULL,
  `lastName` varchar(10) NOT NULL,
  `userName` varchar(10) NOT NULL,
  `password` varchar(500) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `firstName`, `lastName`, `userName`, `password`, `isAdmin`) VALUES
(67, 'User', 'User', 'User', '$2b$10$ltVzFozERzQHn5z.3cDIPesFT.PizUaUwIsMWi8oLYnXiBnM2/A..', 0),
(68, 'Test', 'Test', 'Test', '$2b$10$flm.iJdTTgSdeQT/QG9BH.yrZoD3im6em9cHzS5QtAq9qv3xfL9cm', 0),
(69, 'Admin', 'Admin', 'Admin', '$2b$10$FVawiia3j5SAYGy1SSy3jOI6nrWcvRnvim19LMQEPEon/2iejNZby', 1);

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
(2, 'nice desination :) ', 'bora bora', 'e17f3edb-0e98-4f45-9936-a7394f025561.jpeg', '2022-02-01', '2022-02-16', 699),
(3, 'very good destinaion', 'Phuket', '37e125b4-09f0-49de-bfee-8b3a6ba71a58.jpg', '2022-03-15', '2022-03-30', 599),
(4, 'paris ', 'paris', '010c309b-3e21-4431-90f4-3f0cb4088968.jpg', '2022-03-10', '2022-03-22', 333),
(5, 'dubai ', 'Dubai', 'fe54ace1-268a-4d6a-b3f6-c728c344560d.jpg', '2022-02-23', '2022-02-26', 449),
(7, 'Barcelona', 'Barcelona', '90a11a42-88c9-423e-83cd-5e3d9487b4aa.jpg', '2021-06-08', '2021-08-14', 420),
(21, 'it is nice Switzerland', 'Switzerland', '31ed7c5b-158a-46c9-b05c-0521283621a7.jpg', '2022-03-02', '2022-03-31', 500),
(22, 'Roma is a history city', 'Roma', '30e7ea60-de0f-4be5-b2eb-b0e72f1c628f.jpg', '2022-04-12', '2022-04-16', 300),
(51, 'Austria', 'Austria', 'a87c7654-4ab3-4851-a952-e5ca5450f1ca.jpg', '2022-03-10', '2022-03-15', 449);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followvacations`
--
ALTER TABLE `followvacations`
  ADD KEY `FK_user` (`userID`),
  ADD KEY `FK_vacation` (`vacationID`);

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
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followvacations`
--
ALTER TABLE `followvacations`
  ADD CONSTRAINT `FK_user` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`),
  ADD CONSTRAINT `FK_vacation` FOREIGN KEY (`vacationID`) REFERENCES `vacations` (`vacationID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
