-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Dec 17, 2023 at 09:36 PM
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
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `_id` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `fName` varchar(30) DEFAULT NULL,
  `lName` varchar(30) DEFAULT NULL,
  `tel` varchar(10) DEFAULT NULL,
  `facebook` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `line` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `instagram` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `twitter` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `address` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `password` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`_id`, `email`, `fName`, `lName`, `tel`, `facebook`, `line`, `instagram`, `twitter`, `address`, `password`) VALUES
('75NyUtCcQmWLiVODEZQDuI1E', 'a@gmail.com', 'Louis', 'Cumyard', '', '', '', '', '', 's', '$2b$04$oVuwpf8RhxJqrigfAxd8/uH4vR6k1H8S8AZ4D8HQ45JFpH1sDXuKO'),
('arIeAhqz7MpoBEU2HI3pfSBF', 'nostisak47@gmail.com', 'ธนาคาร', 'หลักแหลม', '', '', '', '', '', '', '$2b$04$mAqGPDzTCwmxEWw03PV.4uEVV71rvdsJEpNxof12nrPxO3jPCPnq2'),
('faPr7irnXCUqJfDjx2cjYBTf', 'onopingping@gmail.com', 'Santijit', 'Kamnak', '3232', '', '', '', '', '', '$2b$04$z3TUhves2lCYRdDJ1tzGLePUzkRvoeI176phroMjdt6AQeZYfCZTW'),
('h3JDuoGVUJ0asm5CKLp9BZWG', 'narutchai@gmail.com', 'Narutchai', 'Billion', '', '', '', '', '', '', '$2b$04$FarcRD6F1ZBICckVxuKFseFmiOCA6icWzPtQUscSn0rpK64jpJJE2'),
('hX0gKOVdcP6Q3-7G0hsLpmye', 'malee@gmail.com', 'มาลี', 'สวยมาก', '', '', '', '', '', '', '$2b$04$ugg8jKCrXDfmxh8LWBd3le/71sv2YOAqp77UGlihppqdOqEPdhde6'),
('J5dWMHDhiPL2xpomE_-TIaa9', 'elon@gmail.com', 'Elon', 'Musk', '', '', '', '', '', '', '$2b$04$ZOxToLzTIUpvWpIDQJo4FOTAirHlMxXief9LU4GNu26Gb4G34zM/G'),
('PlQgMCfYzaD_LktV49qj5hqu', 'jin@gmail.com', 'เฮีย', 'จิน', '', '', '', '', '', '', '$2b$04$gvqLxK4rT59YgQH7dHCsOuMh/tViLf7QECfIy37DjLV7s8rFd1Ql.'),
('W56j2v6mIVS8U_oTAidYBrJF', 'techcast@gmail.com', 'ตุ้ย', 'Techcast', '', '', '', '', '', '', '$2b$04$HdtqG1d1uJiN.Vflj06.8OaPtt3PBTo1AwBIGuqZ65zFHtkPFlXiG'),
('wIxbChmJJAKuniZyPDWXd8B0', 'poomth@gmail.com', 'Poomthai', 'Promkrot', '', '', '', '', '', '', '$2b$04$iyqb0mQbDbt47VPENERU7eIRHoOgji8B3zwVQY7BF0Gal/AnPEmTa');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`_id`),
  ADD UNIQUE KEY `email` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
