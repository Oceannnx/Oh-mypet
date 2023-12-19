-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Dec 19, 2023 at 01:14 PM
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
('HmLzLEi9jh_NCa8h5iOYAJ7Q', '75NyUtCcQmWLiVODEZQDuI1E', 'dsadsa', 'dsada', '2023-12-19 08:41:28'),
('z09MzN8rnXmNV2usu_jtU1ES', 'W56j2v6mIVS8U_oTAidYBrJF', 'สวัสดีโลก', 'ไม่มีอะไรมาก แค่อยากมาลองระบบเฉยๆ', '2023-12-18 03:31:14');

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
('RAOF3exa_6tIXC96hqI_I4ZW', '75NyUtCcQmWLiVODEZQDuI1E', 'HmLzLEi9jh_NCa8h5iOYAJ7Q', 'dsadas', '2023-12-19 08:42:50'),
('YOQ-7NL26Bpm9auvxDo20xHL', '75NyUtCcQmWLiVODEZQDuI1E', '7kGdRcEwL0dWzXJrjm0VzEhY', 'ปลาหางกระดิ่งเป็นสัตว์คุ้มครองนะครับ', '2023-12-18 04:18:30');

-- --------------------------------------------------------

--
-- Table structure for table `sellPost`
--

CREATE TABLE `sellPost` (
  `_id` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `userID` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `title` varchar(50) DEFAULT NULL,
  `petType` varchar(10) DEFAULT NULL,
  `petGene` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `petAge` int DEFAULT NULL,
  `petName` varchar(20) DEFAULT NULL,
  `petGender` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `petBD` date DEFAULT NULL,
  `petPrice` double(8,2) DEFAULT NULL,
  `petLocation` varchar(50) DEFAULT NULL,
  `petImages` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `petDescription` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `petPostDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `sellPost`
--

INSERT INTO `sellPost` (`_id`, `userID`, `title`, `petType`, `petGene`, `petAge`, `petName`, `petGender`, `petBD`, `petPrice`, `petLocation`, `petImages`, `petDescription`, `petPostDate`) VALUES
('1-YvcofPTjkFP83TEWLJg6Tj', 'wIxbChmJJAKuniZyPDWXd8B0', 'Kissing Fish', 'fish', 'Kiss', 2, 'Muaf', 'female', '2022-02-14', 420.00, 'Ratchaburi, Thailand', 'https://qlkszkixdrbsawzxywik.supabase.co/storage/v1/object/public/images/post/EAC2teoQH9mXpfUdjJjW8', 'ผมทนไม่ไหวกับปลาตัวนี้แล้ว ปลาตัวนี้จะจุ้บทุกอย่างเลยแม้กระทั่งกะทะ', '2023-12-18 04:11:17'),
('fZiQm0VWliXmSe64iKtEc8VI', '75NyUtCcQmWLiVODEZQDuI1E', 'Princess Ro III', 'cat', 'persia', 4, 'Ro', 'male', '2020-07-16', 99999.00, 'Miami, USA', 'https://qlkszkixdrbsawzxywik.supabase.co/storage/v1/object/public/images/post/766gXq5aUwWBCzbNykDAD', 'I just want to share my cute cat.', '2023-12-18 02:59:57'),
('im-GF-OC_9DDEJ753W7jiBJB', 'PlQgMCfYzaD_LktV49qj5hqu', 'ปลานักฆ่า', 'fish', 'Killer', 1, 'ปลานักฆ่า', 'male', '2022-12-18', 10.00, 'Sakonnakorn, Thailand', 'https://qlkszkixdrbsawzxywik.supabase.co/storage/v1/object/public/images/post/sCabJp9ozpYEI4T_Wgp_i', 'ผมกลัวมาก มันอยู่ในตู้ละมันพยายามพ่นน้ำที่แหลมคมดั่งใบมีดมาฆ่าผม กว่าผมจะจับมันได้เกือบเสียแขนไปข้างนึง', '2023-12-18 03:54:41'),
('J6zu0TpgDz2PMS1ucGC0A6TO', 'arIeAhqz7MpoBEU2HI3pfSBF', 'อาก้ากินหนักมาก เลี้ยงไม่ไหว', 'cat', 'Scottish fold', 3, 'Akaradetchak 47', 'male', '2021-01-15', 69420.00, 'Mikey way, Universe', 'https://qlkszkixdrbsawzxywik.supabase.co/storage/v1/object/public/images/post/9AdMpfW64gegSsuUEZC9z', 'อาก้ากินเยอะไม่ไหว แถมยังมากวนตอนเล่นดอท ฟาร์มแรคอีก ซนมากไม่ไหวแล้ว', '2023-12-18 03:07:24'),
('jaYP8v9gXVvXr1NJbjeATw4c', 'hX0gKOVdcP6Q3-7G0hsLpmye', 'หมา KFC', 'dog', 'KFC', 3, 'KFC', 'male', '2021-07-07', 399.00, 'โคราช, ประเทศไทย', 'https://qlkszkixdrbsawzxywik.supabase.co/storage/v1/object/public/images/post/iHd15S09pOEe_6eSbucdp', 'ผมสั่งมาผิดตอนเมา ตอนนั้นอยากกินเคเอฟซีเลยสั่งมา แต่ตื่นมาก็งงเลยว่า kfc ผมมันเห่าได้ ตอนแรกผมก็นึกว่าผมเมาค้างแหละ สักพักมันเริ่มเห่า ใจผมหั่นละโดนแม่แหม่มด่า ผมเลยตัดสินใจขายมัน', '2023-12-18 03:29:46'),
('TNmlZBreFmvQvsb4dgyvaGOD', '75NyUtCcQmWLiVODEZQDuI1E', 'just brib', 'bird', 'birb', 19, 'rem', 'female', '2005-02-02', 323.00, 'Tokyo, Japan', 'https://qlkszkixdrbsawzxywik.supabase.co/storage/v1/object/public/images/post/6kg1QiHFZnxYMdZtP5vsc', 'I only have Emilia.', '2023-12-18 03:50:11'),
('vCQd3mDrKuTgN2P6yqd4_bm2', 'J5dWMHDhiPL2xpomE_-TIaa9', 'Doggo to the moon', 'dog', 'shiba', 4, 'Doggo', 'male', '2020-12-19', 3.00, 'Moon, Mikey way', 'https://qlkszkixdrbsawzxywik.supabase.co/storage/v1/object/public/images/post/xYJGHzIJLCN8vcHYIRPAj', 'I hope the dog can go to the moon when i sell the Doggo.', '2023-12-18 04:02:28'),
('WIJMiYKhFw_KtVEqcbKhF8Hx', 'h3JDuoGVUJ0asm5CKLp9BZWG', 'นกแก้วร้องเพลงคุ้กกี้', 'bird', 'pierrot', 3, 'คุ้กกี้', 'female', '2021-04-13', 1000.00, 'BKK, Thailand', 'https://qlkszkixdrbsawzxywik.supabase.co/storage/v1/object/public/images/post/l2MTpvmOx7z5KMoVauDla', 'นกแก้วร้องคุกกี้เพราะมาก แต่ทั้งวันเลยครับหูผมทนไม่ไหวแล้วหูผมจะพัง', '2023-12-18 04:15:37');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `_id` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `fName` varchar(30) DEFAULT NULL,
  `lName` varchar(30) DEFAULT NULL,
  `profileImg` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
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

INSERT INTO `user` (`_id`, `email`, `fName`, `lName`, `profileImg`, `tel`, `facebook`, `line`, `instagram`, `twitter`, `address`, `password`) VALUES
('75NyUtCcQmWLiVODEZQDuI1E', 'a@gmail.com', 'Alien', 'Safeplanet', 'https://qlkszkixdrbsawzxywik.supabase.co/storage/v1/object/public/images/profileImage/g6SKeuEm-kH0ZBNsmyTT5', '', '', '', '', '', 's', '$2b$04$oVuwpf8RhxJqrigfAxd8/uH4vR6k1H8S8AZ4D8HQ45JFpH1sDXuKO'),
('arIeAhqz7MpoBEU2HI3pfSBF', 'nostisak47@gmail.com', 'ธนาคาร', 'หลักแหลม', '', '', '', '', '', '', '', '$2b$04$mAqGPDzTCwmxEWw03PV.4uEVV71rvdsJEpNxof12nrPxO3jPCPnq2'),
('faPr7irnXCUqJfDjx2cjYBTf', 'onopingping@gmail.com', 'Santijit', 'Kamnak', '', '3232', '', '', '', '', '', '$2b$04$z3TUhves2lCYRdDJ1tzGLePUzkRvoeI176phroMjdt6AQeZYfCZTW'),
('h3JDuoGVUJ0asm5CKLp9BZWG', 'narutchai@gmail.com', 'Narutchai', 'Billion', '', '', '', '', '', '', '', '$2b$04$FarcRD6F1ZBICckVxuKFseFmiOCA6icWzPtQUscSn0rpK64jpJJE2'),
('hX0gKOVdcP6Q3-7G0hsLpmye', 'malee@gmail.com', 'มาลี', 'สวยมาก', 'https://qlkszkixdrbsawzxywik.supabase.co/storage/v1/object/public/images/profileImage/9s92H_XlyCs5peIvEH8jQ', '', '', '', '', '', '', '$2b$04$ugg8jKCrXDfmxh8LWBd3le/71sv2YOAqp77UGlihppqdOqEPdhde6'),
('J5dWMHDhiPL2xpomE_-TIaa9', 'elon@gmail.com', 'Elon', 'Musk', '', '', '', '', '', '', '', '$2b$04$ZOxToLzTIUpvWpIDQJo4FOTAirHlMxXief9LU4GNu26Gb4G34zM/G'),
('PlQgMCfYzaD_LktV49qj5hqu', 'jin@gmail.com', 'เฮีย', 'จิน', '', '', '', '', '', '', '', '$2b$04$gvqLxK4rT59YgQH7dHCsOuMh/tViLf7QECfIy37DjLV7s8rFd1Ql.'),
('W56j2v6mIVS8U_oTAidYBrJF', 'techcast@gmail.com', 'ตุ้ย', 'Techcast', '', '', '', '', '', '', '', '$2b$04$HdtqG1d1uJiN.Vflj06.8OaPtt3PBTo1AwBIGuqZ65zFHtkPFlXiG'),
('wIxbChmJJAKuniZyPDWXd8B0', 'poomth@gmail.com', 'Poomthai', 'Promkrot', '', '', '', '', '', '', '', '$2b$04$iyqb0mQbDbt47VPENERU7eIRHoOgji8B3zwVQY7BF0Gal/AnPEmTa');

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
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`_id`),
  ADD KEY `userID` (`userID`),
  ADD KEY `advPostID` (`advPostID`);

--
-- Indexes for table `sellPost`
--
ALTER TABLE `sellPost`
  ADD PRIMARY KEY (`_id`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `advPost`
--
ALTER TABLE `advPost`
  ADD CONSTRAINT `advPost_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user` (`_id`);

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user` (`_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`advPostID`) REFERENCES `advPost` (`_id`) ON DELETE CASCADE;

--
-- Constraints for table `sellPost`
--
ALTER TABLE `sellPost`
  ADD CONSTRAINT `sellPost_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user` (`_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
