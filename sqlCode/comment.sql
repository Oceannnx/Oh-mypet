-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Dec 17, 2023 at 09:35 PM
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
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `_id` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `userID` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `advPostID` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `commentText` mediumtext,
  `commentDate` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`_id`, `userID`, `advPostID`, `commentText`, `commentDate`) VALUES
('hhAm_srbp1tP99C1_xyPBy8r', '75NyUtCcQmWLiVODEZQDuI1E', 'z09MzN8rnXmNV2usu_jtU1ES', 'FC มานานละครับ', '2023-12-18 03:33:27'),
('IzLyJDwe8n_JStiP57jqoYWS', 'h3JDuoGVUJ0asm5CKLp9BZWG', '7kGdRcEwL0dWzXJrjm0VzEhY', 'ไซร่างเทพเก็บหมด', '2023-12-18 04:17:46'),
('mSCAT4P57Eb9mi1g2dUGuPFn', '75NyUtCcQmWLiVODEZQDuI1E', 'z09MzN8rnXmNV2usu_jtU1ES', 'สวัสดีจั๊ฟพรี่', '2023-12-18 03:32:15'),
('omEZka4qDocTKs1N6xL5X4IU', 'PlQgMCfYzaD_LktV49qj5hqu', '7kGdRcEwL0dWzXJrjm0VzEhY', 'พี่ชายไม่มีศัตรู😌👍', '2023-12-18 04:22:22'),
('YOQ-7NL26Bpm9auvxDo20xHL', '75NyUtCcQmWLiVODEZQDuI1E', '7kGdRcEwL0dWzXJrjm0VzEhY', 'ปลาหางกระดิ่งเป็นสัตว์คุ้มครองนะครับ', '2023-12-18 04:18:30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`_id`),
  ADD KEY `userID` (`userID`),
  ADD KEY `advPostID` (`advPostID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user` (`_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`advPostID`) REFERENCES `advPost` (`_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
