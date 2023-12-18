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
('1-YvcofPTjkFP83TEWLJg6Tj', 'wIxbChmJJAKuniZyPDWXd8B0', 'Kissing Fish', 'fish', 'Kiss', 2, 'Muaf', 'female', '2022-02-14', 420.00, 'Ratchaburi, Thailand', 'https://qlkszkixdrbsawzxywik.supabase.co/storage/v1/object/public/images/images/EAC2teoQH9mXpfUdjJjW8', 'ผมทนไม่ไหวกับปลาตัวนี้แล้ว ปลาตัวนี้จะจุ้บทุกอย่างเลยแม้กระทั่งกะทะ', '2023-12-18 04:11:17'),
('fZiQm0VWliXmSe64iKtEc8VI', '75NyUtCcQmWLiVODEZQDuI1E', 'Princess Ro III', 'cat', 'persia', 4, 'Ro', 'male', '2020-07-16', 99999.00, 'Miami, USA', 'https://qlkszkixdrbsawzxywik.supabase.co/storage/v1/object/public/images/images/766gXq5aUwWBCzbNykDAD', 'I just want to share my cute cat.', '2023-12-18 02:59:57'),
('im-GF-OC_9DDEJ753W7jiBJB', 'PlQgMCfYzaD_LktV49qj5hqu', 'ปลานักฆ่า', 'fish', 'Killer', 1, 'ปลานักฆ่า', 'male', '2022-12-18', 10.00, 'Sakonnakorn, Thailand', 'https://qlkszkixdrbsawzxywik.supabase.co/storage/v1/object/public/images/images/sCabJp9ozpYEI4T_Wgp_i', 'ผมกลัวมาก มันอยู่ในตู้ละมันพยายามพ่นน้ำที่แหลมคมดั่งใบมีดมาฆ่าผม กว่าผมจะจับมันได้เกือบเสียแขนไปข้างนึง', '2023-12-18 03:54:41'),
('J6zu0TpgDz2PMS1ucGC0A6TO', 'arIeAhqz7MpoBEU2HI3pfSBF', 'อาก้ากินหนักมาก เลี้ยงไม่ไหว', 'cat', 'Scottish fold', 3, 'Akaradetchak 47', 'male', '2021-01-15', 69420.00, 'Mikey way, Universe', 'https://qlkszkixdrbsawzxywik.supabase.co/storage/v1/object/public/images/images/9AdMpfW64gegSsuUEZC9z', 'อาก้ากินเยอะไม่ไหว แถมยังมากวนตอนเล่นดอท ฟาร์มแรคอีก ซนมากไม่ไหวแล้ว', '2023-12-18 03:07:24'),
('jaYP8v9gXVvXr1NJbjeATw4c', 'hX0gKOVdcP6Q3-7G0hsLpmye', 'หมา KFC', 'dog', 'KFC', 3, 'KFC', 'male', '2021-07-07', 399.00, 'โคราช, ประเทศไทย', 'https://qlkszkixdrbsawzxywik.supabase.co/storage/v1/object/public/images/images/iHd15S09pOEe_6eSbucdp', 'ผมสั่งมาผิดตอนเมา ตอนนั้นอยากกินเคเอฟซีเลยสั่งมา แต่ตื่นมาก็งงเลยว่า kfc ผมมันเห่าได้ ตอนแรกผมก็นึกว่าผมเมาค้างแหละ สักพักมันเริ่มเห่า ใจผมหั่นละโดนแม่แหม่มด่า ผมเลยตัดสินใจขายมัน', '2023-12-18 03:29:46'),
('TNmlZBreFmvQvsb4dgyvaGOD', '75NyUtCcQmWLiVODEZQDuI1E', 'just brib', 'bird', 'birb', 19, 'rem', 'female', '2005-02-02', 323.00, 'Tokyo, Japan', 'https://qlkszkixdrbsawzxywik.supabase.co/storage/v1/object/public/images/images/6kg1QiHFZnxYMdZtP5vsc', 'I only have Emilia.', '2023-12-18 03:50:11'),
('vCQd3mDrKuTgN2P6yqd4_bm2', 'J5dWMHDhiPL2xpomE_-TIaa9', 'Doggo to the moon', 'dog', 'shiba', 4, 'Doggo', 'male', '2020-12-19', 3.00, 'Moon, Mikey way', 'https://qlkszkixdrbsawzxywik.supabase.co/storage/v1/object/public/images/images/xYJGHzIJLCN8vcHYIRPAj', 'I hope the dog can go to the moon when i sell the Doggo.', '2023-12-18 04:02:28'),
('WIJMiYKhFw_KtVEqcbKhF8Hx', 'h3JDuoGVUJ0asm5CKLp9BZWG', 'นกแก้วร้องเพลงคุ้กกี้', 'bird', 'pierrot', 3, 'คุ้กกี้', 'female', '2021-04-13', 1000.00, 'BKK, Thailand', 'https://qlkszkixdrbsawzxywik.supabase.co/storage/v1/object/public/images/images/l2MTpvmOx7z5KMoVauDla', 'นกแก้วร้องคุกกี้เพราะมาก แต่ทั้งวันเลยครับหูผมทนไม่ไหวแล้วหูผมจะพัง', '2023-12-18 04:15:37');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sellPost`
--
ALTER TABLE `sellPost`
  ADD PRIMARY KEY (`_id`),
  ADD KEY `userID` (`userID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `sellPost`
--
ALTER TABLE `sellPost`
  ADD CONSTRAINT `sellPost_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user` (`_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
