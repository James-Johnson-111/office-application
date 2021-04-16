-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 16, 2021 at 09:00 AM
-- Server version: 8.0.13-4
-- PHP Version: 7.2.24-0ubuntu0.18.04.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `8tttXb5VZx`
--

-- --------------------------------------------------------

--
-- Table structure for table `candidate_images`
--

CREATE TABLE `candidate_images` (
  `id` int(11) NOT NULL,
  `candidate_id` int(11) NOT NULL,
  `candidate_image` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `candidate_images`
--

INSERT INTO `candidate_images` (`id`, `candidate_id`, `candidate_image`) VALUES
(6, 20, 'avatar6.png'),
(7, 21, 'JaEng1234'),
(8, 22, 'UsEmp2347'),
(9, 23, 'SeStu3128'),
(10, 24, 'HaTra2364.png'),
(11, 25, 'SaNur9857.png'),
(12, 26, 'YoOld9056.png'),
(13, 27, 'KaDri4874.png'),
(14, 28, 'HaTra4356.png'),
(15, 29, 'SaDri0437.png'),
(16, 30, 'TaShi3427.png');

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
  `insert_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `insert_by` varchar(255) NOT NULL,
  `edit_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `edit_by` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `candidate_info`
--

INSERT INTO `candidate_info` (`candidate_id`, `candidate_name`, `candidate_passport`, `candidate_age`, `candidate_nationality`, `candidate_gender`, `candidate_marital_status`, `candidate_profession`, `insert_by`, `edit_by`) VALUES
(20, 'Maya', '0987654321', 21, 'American', 'FeMale', 'Married', 'Doctor', 'Usman Badar', 'Usman Badar'),
(21, 'Jahangir', '123455566666778', 23, 'England', 'Male', 'UnMarried', 'Engineer', 'Usman Badar', 'Usman Badar'),
(22, 'Usama', '2347878973432543', 32, 'Pakistan', 'Male', 'Married', 'Employee', 'Usman Badar', 'Usman Badar'),
(23, 'Seema', '31284567394394', 19, 'Rashiya', 'FeMale', 'UnMarried', 'Student', 'Usman Badar', 'Usman Badar'),
(24, 'Hatim', '236473564750567', 50, 'Saudia Arabia', 'Male', 'Married', 'Tranporter', 'Usman Badar', 'Usman Badar'),
(25, 'Samama', '98576087584', 45, 'Quba', 'FeMale', 'UnMarried', 'Nurse', 'Usman Badar', 'Usman Badar'),
(26, 'Yousuf', '9056875474034', 33, 'Australia', 'Male', 'Married', 'Old Man', 'Usman Badar', 'Usman Badar'),
(27, 'Kashif', '4874357430234', 18, 'Himalia', 'Male', 'UnMarried', 'Driver', 'Usman Badar', 'Usman Badar'),
(28, 'Hamza', '435647859343', 67, 'Iran', 'Male', 'Married', 'Trader', 'Usman Badar', 'Usman Badar'),
(29, 'Samandar Khan', '04375643052343', 55, 'Afghanistan', 'Male', 'UnMarried', 'Driver', 'Admin', 'Admin'),
(30, 'Taimoor', '342745623940', 23, 'Bangladash', 'Male', 'Married', 'Shipping', 'Usman Badar', 'Usman Badar');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `login_id` varchar(255) NOT NULL,
  `params` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `login_id`, `params`, `user_password`) VALUES
(1, 'Admin', 'C1', 'sha1$10ede508$1$635e73d97e8e4d88be35a662afaacace13fef937'),
(3, 'Usman Badar', 'Default', 'sha1$2008ddd5$1$2e48ce7725cbf0eea025849f9636531cc69450bc');

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
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `candidate_images`
--
ALTER TABLE `candidate_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `candidate_info`
--
ALTER TABLE `candidate_info`
  MODIFY `candidate_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
