-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 10, 2021 at 11:31 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `office-database`
--

-- --------------------------------------------------------

--
-- Table structure for table `candidate_images`
--

CREATE TABLE `candidate_images` (
  `id` int(11) NOT NULL,
  `candidate_id` int(11) NOT NULL,
  `candidate_image` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `candidate_info`
--

CREATE TABLE `candidate_info` (
  `candidate_id` int(11) NOT NULL,
  `candidate_name` varchar(255) NOT NULL,
  `candidate_passport` varchar(255) NOT NULL,
  `candidate_age` int(11) NOT NULL,
  `candidate_nationality` varchar(255) NOT NULL,
  `candidate_gender` varchar(255) NOT NULL,
  `candidate_marital_status` varchar(255) NOT NULL,
  `candidate_profession` varchar(255) NOT NULL,
  `place_of_issue` varchar(255) NOT NULL,
  `travelling_to` varchar(255) DEFAULT NULL,
  `insert_date` varchar(255) DEFAULT NULL,
  `inserted_time` varchar(255) DEFAULT NULL,
  `insert_by` varchar(255) DEFAULT NULL,
  `edit_date` varchar(255) DEFAULT NULL,
  `edited_time` varchar(255) DEFAULT NULL,
  `edit_by` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `candidate_tokens`
--

CREATE TABLE `candidate_tokens` (
  `token_id` int(11) NOT NULL,
  `candidate_id` int(11) NOT NULL,
  `token_status` varchar(255) DEFAULT NULL,
  `token_no` varchar(255) NOT NULL,
  `token_date` varchar(255) NOT NULL,
  `token_time` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `covid_status`
--

CREATE TABLE `covid_status` (
  `id` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `insert_by` varchar(255) NOT NULL,
  `insert_date` varchar(255) NOT NULL,
  `insert_time` varchar(255) NOT NULL,
  `edit_by` varchar(255) DEFAULT NULL,
  `edit_date` varchar(255) DEFAULT NULL,
  `edit_time` varchar(255) DEFAULT NULL,
  `candidate_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `laboratory_investigation`
--

CREATE TABLE `laboratory_investigation` (
  `investigation_id` int(11) NOT NULL,
  `candidate_id` int(11) NOT NULL,
  `blood_group` varchar(255) NOT NULL,
  `hemoglobin` varchar(255) NOT NULL,
  `malaria` varchar(255) NOT NULL,
  `micro_filaria` varchar(255) NOT NULL,
  `RBs` varchar(255) NOT NULL,
  `lft` varchar(255) NOT NULL,
  `creatinine` varchar(255) NOT NULL,
  `hivIII` varchar(255) NOT NULL,
  `HbsAg` varchar(255) NOT NULL,
  `antiHcv` varchar(255) NOT NULL,
  `vdrl` varchar(255) NOT NULL,
  `tpha` varchar(255) NOT NULL,
  `sugar` varchar(255) NOT NULL,
  `albumin` varchar(255) NOT NULL,
  `CovidPCR` varchar(255) NOT NULL,
  `CovidAntibodies` varchar(255) NOT NULL,
  `helminthes` varchar(255) NOT NULL,
  `ova` varchar(255) NOT NULL,
  `cyst` varchar(255) NOT NULL,
  `others` varchar(255) NOT NULL,
  `vaccination_id` int(11) NOT NULL,
  `insert_by` varchar(255) NOT NULL,
  `insert_date` varchar(255) NOT NULL,
  `insert_time` varchar(255) NOT NULL,
  `edit_by` varchar(255) DEFAULT NULL,
  `edit_date` varchar(255) DEFAULT NULL,
  `edit_time` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `medical_e_1`
--

CREATE TABLE `medical_e_1` (
  `examination_id` int(11) NOT NULL,
  `candidate_id` int(11) NOT NULL,
  `height` varchar(255) NOT NULL,
  `weight` varchar(255) NOT NULL,
  `body_mass_index` int(11) NOT NULL,
  `blood_pressure` varchar(255) NOT NULL,
  `pulse` varchar(255) NOT NULL,
  `pr` varchar(255) NOT NULL,
  `unaided_distant_rt_eye` varchar(255) NOT NULL,
  `unaided_distant_lt_eye` varchar(255) NOT NULL,
  `aided_distant_rt_eye` varchar(255) NOT NULL,
  `aided_distant_lt_eye` varchar(255) NOT NULL,
  `unaided_near_rt_eye` varchar(255) NOT NULL,
  `unaided_near_lt_eye` varchar(255) NOT NULL,
  `aided_near_rt_eye` varchar(255) NOT NULL,
  `aided_near_lt_eye` varchar(255) NOT NULL,
  `color_vision` varchar(255) NOT NULL,
  `right_ear` varchar(255) NOT NULL,
  `left_ear` varchar(255) NOT NULL,
  `insert_by` varchar(255) NOT NULL,
  `insert_date` varchar(255) NOT NULL,
  `insert_time` varchar(255) NOT NULL,
  `edit_by` varchar(255) DEFAULT NULL,
  `edit_date` varchar(255) DEFAULT NULL,
  `edit_time` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `medical_e_2`
--

CREATE TABLE `medical_e_2` (
  `examination_id` int(11) NOT NULL,
  `candidate_id` int(11) NOT NULL,
  `general_appearance` varchar(255) NOT NULL,
  `cardio_vascular` varchar(255) NOT NULL,
  `respiratory` varchar(255) NOT NULL,
  `ent` varchar(255) NOT NULL,
  `Abdomen` varchar(255) NOT NULL,
  `hernia` varchar(255) NOT NULL,
  `hydrocele` varchar(255) NOT NULL,
  `exremities` varchar(255) NOT NULL,
  `back` varchar(255) NOT NULL,
  `skin` varchar(255) NOT NULL,
  `cns` varchar(255) NOT NULL,
  `deformities` varchar(255) NOT NULL,
  `speech` varchar(255) NOT NULL,
  `behaviour` varchar(255) NOT NULL,
  `orientation` varchar(255) NOT NULL,
  `memory` varchar(255) NOT NULL,
  `concentration` varchar(255) NOT NULL,
  `mood` varchar(255) NOT NULL,
  `thoughts` varchar(255) NOT NULL,
  `others` varchar(255) NOT NULL,
  `insert_by` varchar(255) NOT NULL,
  `insert_date` varchar(255) NOT NULL,
  `insert_time` varchar(255) NOT NULL,
  `edit_by` varchar(255) DEFAULT NULL,
  `edit_date` varchar(255) DEFAULT NULL,
  `edit_time` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `meningococcal_status`
--

CREATE TABLE `meningococcal_status` (
  `id` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `insert_by` varchar(255) NOT NULL,
  `insert_date` varchar(255) NOT NULL,
  `insert_time` varchar(255) NOT NULL,
  `edit_by` varchar(255) DEFAULT NULL,
  `edit_date` varchar(255) DEFAULT NULL,
  `edit_time` varchar(255) DEFAULT NULL,
  `candidate_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `mmr1_status`
--

CREATE TABLE `mmr1_status` (
  `id` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `insert_by` varchar(255) NOT NULL,
  `insert_date` varchar(255) NOT NULL,
  `insert_time` varchar(255) NOT NULL,
  `edit_by` varchar(255) DEFAULT NULL,
  `edit_date` varchar(255) DEFAULT NULL,
  `edit_time` varchar(255) DEFAULT NULL,
  `candidate_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `mmr2_status`
--

CREATE TABLE `mmr2_status` (
  `id` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `insert_by` varchar(255) NOT NULL,
  `insert_date` varchar(255) NOT NULL,
  `insert_time` varchar(255) NOT NULL,
  `edit_by` varchar(255) DEFAULT NULL,
  `edit_date` varchar(255) DEFAULT NULL,
  `edit_time` varchar(255) DEFAULT NULL,
  `candidate_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `polio_status`
--

CREATE TABLE `polio_status` (
  `id` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `insert_by` varchar(255) NOT NULL,
  `insert_date` varchar(255) NOT NULL,
  `insert_time` varchar(255) NOT NULL,
  `edit_by` varchar(255) DEFAULT NULL,
  `edit_date` varchar(255) DEFAULT NULL,
  `edit_time` varchar(255) DEFAULT NULL,
  `candidate_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

CREATE TABLE `tokens` (
  `id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `token_time` varchar(255) NOT NULL,
  `token_date` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `token_used`
--

CREATE TABLE `token_used` (
  `id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `login_id` varchar(255) NOT NULL,
  `params` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_role` varchar(255) NOT NULL,
  `user_image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `login_id`, `params`, `user_password`, `user_role`, `user_image`) VALUES
(14, 'Jahanzaib', 'Default', 'sha1$3b38a0b0$1$8fbfc9eef6667f3d1c885c08686788306aa0829c', 'User', 'JaDefUser.png'),
(15, 'Admin', 'Category 1', 'sha1$70a97d78$1$ad6eaa2c563c8c484f3da16e9dac386cc7c47f70', 'Admin', 'AdC4Admi.png'),
(16, 'Shahzad Bhai', 'Category 1', 'sha1$5586610c$1$1547ecb1fb629c71e79221b7f3435889f575c0ec', 'User', 'ShCatUser.png'),
(17, 'Rehan', 'Category 3', 'sha1$ce6530f9$1$975cbb958ebe1a7d384e3e930803676885fb9039', 'Others', 'ReCatOthe.png'),
(18, 'Usman Badar', 'Category 1', 'sha1$97d665a9$1$771704531aee90a2728c4ebd1d5f09da5e946fb6', 'User', 'UsCatUser.png');

-- --------------------------------------------------------

--
-- Table structure for table `vaccination`
--

CREATE TABLE `vaccination` (
  `id` int(11) NOT NULL,
  `candidate_id` int(11) NOT NULL,
  `polio_status` int(11) NOT NULL,
  `mmr1_status` int(11) NOT NULL,
  `mmr2_status` int(11) NOT NULL,
  `meningococcal_status` int(11) NOT NULL,
  `covid_status` int(11) NOT NULL,
  `insert_by` varchar(255) NOT NULL,
  `insert_date` varchar(255) NOT NULL,
  `insert_time` varchar(255) NOT NULL,
  `edit_by` varchar(255) DEFAULT NULL,
  `edit_date` varchar(255) DEFAULT NULL,
  `edit_time` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `candidate_images`
--
ALTER TABLE `candidate_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `candidate_id` (`candidate_id`);

--
-- Indexes for table `candidate_info`
--
ALTER TABLE `candidate_info`
  ADD PRIMARY KEY (`candidate_id`);

--
-- Indexes for table `candidate_tokens`
--
ALTER TABLE `candidate_tokens`
  ADD PRIMARY KEY (`token_id`);

--
-- Indexes for table `covid_status`
--
ALTER TABLE `covid_status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `laboratory_investigation`
--
ALTER TABLE `laboratory_investigation`
  ADD PRIMARY KEY (`investigation_id`);

--
-- Indexes for table `medical_e_1`
--
ALTER TABLE `medical_e_1`
  ADD PRIMARY KEY (`examination_id`);

--
-- Indexes for table `medical_e_2`
--
ALTER TABLE `medical_e_2`
  ADD PRIMARY KEY (`examination_id`);

--
-- Indexes for table `meningococcal_status`
--
ALTER TABLE `meningococcal_status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mmr1_status`
--
ALTER TABLE `mmr1_status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mmr2_status`
--
ALTER TABLE `mmr2_status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `polio_status`
--
ALTER TABLE `polio_status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `token_used`
--
ALTER TABLE `token_used`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `vaccination`
--
ALTER TABLE `vaccination`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `candidate_images`
--
ALTER TABLE `candidate_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT for table `candidate_info`
--
ALTER TABLE `candidate_info`
  MODIFY `candidate_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=122;

--
-- AUTO_INCREMENT for table `candidate_tokens`
--
ALTER TABLE `candidate_tokens`
  MODIFY `token_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `covid_status`
--
ALTER TABLE `covid_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `laboratory_investigation`
--
ALTER TABLE `laboratory_investigation`
  MODIFY `investigation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `medical_e_1`
--
ALTER TABLE `medical_e_1`
  MODIFY `examination_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `medical_e_2`
--
ALTER TABLE `medical_e_2`
  MODIFY `examination_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `meningococcal_status`
--
ALTER TABLE `meningococcal_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `mmr1_status`
--
ALTER TABLE `mmr1_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `mmr2_status`
--
ALTER TABLE `mmr2_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `polio_status`
--
ALTER TABLE `polio_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `token_used`
--
ALTER TABLE `token_used`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `vaccination`
--
ALTER TABLE `vaccination`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `candidate_images`
--
ALTER TABLE `candidate_images`
  ADD CONSTRAINT `candidate_images_ibfk_1` FOREIGN KEY (`candidate_id`) REFERENCES `candidate_info` (`candidate_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
