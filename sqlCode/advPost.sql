-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Dec 17, 2023 at 09:34 PM
-- Server version: 8.2.0
-- PHP Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ohMyPet`
--

-- --------------------------------------------------------

--
-- Table structure for table `advPost`
--

CREATE TABLE `advPost` (
  `_id` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `userID` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `title` varchar(50) DEFAULT NULL,
  `postDesc` mediumtext,
  `postDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `advPost`
--

INSERT INTO `advPost` (`_id`, `userID`, `title`, `postDesc`, `postDate`) VALUES
('7kGdRcEwL0dWzXJrjm0VzEhY', 'wIxbChmJJAKuniZyPDWXd8B0', 'ปลาผมโคตรเอา', 'ปลาผมเก่งมาก กินได้ทุกอย่าง ไม่เคยร้อง หิวก็กระโดดออกจากตู้ไปหาอะไรกินเอง', '2023-12-18 04:17:08'),
('z09MzN8rnXmNV2usu_jtU1ES', 'W56j2v6mIVS8U_oTAidYBrJF', 'สวัสดีโลก', 'ไม่มีอะไรมาก แค่อยากมาลองระบบเฉยๆ', '2023-12-18 03:31:14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `advPost`
--
ALTER TABLE `advPost`
  ADD PRIMARY KEY (`_id`),
  ADD KEY `userID` (`userID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `advPost`
--
ALTER TABLE `advPost`
  ADD CONSTRAINT `advPost_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user` (`_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
