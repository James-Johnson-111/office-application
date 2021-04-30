-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 30, 2021 at 09:13 AM
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

--
-- Dumping data for table `candidate_images`
--

INSERT INTO `candidate_images` (`id`, `candidate_id`, `candidate_image`) VALUES
(41, 59, 'UsDev1234.png'),
(42, 60, 'AbDri1236.png'),
(43, 61, 'YuStu2137.png'),
(44, 62, 'HaStu2376.png'),
(45, 63, 'JaMan2334.png'),
(46, 64, 'SaAct1237.png'),
(47, 65, 'HaStu2347.png'),
(48, 66, 'JaStu4623.png'),
(49, 67, 'HaStu3463.png'),
(50, 68, 'JGjkl9834.png'),
(51, 69, 'UsDev3324.png'),
(52, 71, 'SuDev1234.png'),
(53, 72, 'MaDev2332.png'),
(54, 73, 'fhsdl3284.png'),
(55, 74, 'ShDev3423.png');

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
  `insert_date` varchar(255) NOT NULL,
  `inserted_time` varchar(255) NOT NULL,
  `insert_by` varchar(255) NOT NULL,
  `edit_date` varchar(255) DEFAULT NULL,
  `edited_time` varchar(255) DEFAULT NULL,
  `edit_by` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `candidate_info`
--

INSERT INTO `candidate_info` (`candidate_id`, `candidate_name`, `candidate_passport`, `candidate_age`, `candidate_nationality`, `candidate_gender`, `candidate_marital_status`, `candidate_profession`, `place_of_issue`, `travelling_to`, `insert_date`, `inserted_time`, `insert_by`, `edit_date`, `edited_time`, `edit_by`) VALUES
(59, 'Usman Badar', '1234567890', 18, 'Pakistan', 'Male', 'UnMarried', 'Developer', 'karachi', 'Riaz', '2021-April-27', '3:31 pm', 'Usman Badar', '2021-April-27', '3:31 pm', 'Usman Badar'),
(60, 'Abul Kareem', '12365123921312569', 12, 'Pakistan', 'Male', 'Married', 'Driver', 'Karachi', 'England', '2021-April-28', '9:11 am', 'Usman Badar', '2021-April-28', '9:11 am', 'Usman Badar'),
(61, 'Yush', '213719263232190', 11, 'England', 'Male', 'UnMarried', 'Student', 'London', 'Lahore', '2021-April-28', '9:14 am', 'Usman Badar', NULL, NULL, NULL),
(62, 'Haadi', '2376239723', 18, 'Pakisatn', 'Male', 'UnMarried', 'Student', 'Karachi', ' Lahore', '2021-April-28', '9:27 am', 'Usman Badar', NULL, NULL, NULL),
(63, 'Jahanazaib', '233442234', 20, 'Pakistan', 'Male', 'Married', 'Manager', 'Karachi', 'Islamabad', '2021-April-28', '9:52 am', 'Usman Badar', NULL, NULL, NULL),
(64, 'Saleem Khan', '123786349234', 34, 'Afghanistan', 'Male', 'Married', 'Actor', 'Qandhar', 'Karachi', '2021-April-28', '10:17 am', 'Admin', NULL, NULL, NULL),
(65, 'Hania', '2347630223', 15, 'Pakistan', 'FeMale', 'UnMarried', 'Student', 'Karachi', 'England', '2021-April-28', '12:02 pm', 'Admin', NULL, NULL, NULL),
(66, 'Jasmin', '46234604623046', 23, 'America', 'FeMale', 'Married', 'Student', 'New York', 'Karachi', '2021-April-28', '1:47 pm', 'Usman Badar', NULL, NULL, NULL),
(67, 'Haadi', '346302643', 18, 'Afghanistan', 'Male', 'Married', 'Student', 'Qandhar', 'Karachi', '2021-April-29', '1:09 pm', 'Admin', NULL, NULL, NULL),
(68, 'JGDSHFGHDGF', '983474893023', 52, 'sdhsdfjsjf', 'Male', 'Married', 'jklhejklfdjkfdk', 'jksdkljhkdsfjsd', 'jsdfhfdhjfdd', '2021-April-29', '2:41 pm', 'Shahzad Bhai', NULL, NULL, NULL),
(69, 'Usman', '332434334323123123213', 12, 'Pakistan', 'Male', 'Married', 'Developer', 'dkgfdjhashdldsadsad', 'England', '2021-April-29', '2:44 pm', 'Shahzad Bhai', NULL, NULL, NULL),
(70, 'Usman', '21378347347-23', 32, 'Pakistan', 'Male', 'Married', 'sdfdssfd', 'dkgfdjhashdld', 'Islamabad', '2021-April-30', '10:31 am', 'Usman Badar', NULL, NULL, NULL),
(71, 'Sulaiman', '12345677893499', 54, 'Himalia', 'Male', 'Married', 'Developer', 'New York', 'England', '2021-April-30', '10:33 am', 'Usman Badar', NULL, NULL, NULL),
(72, 'Maya', '233213231123', 12, 'Himalia', 'Male', 'Married', 'Developer', 'kjdfk;f;sd', 'England', '2021-April-30', '10:38 am', 'Usman Badar', NULL, NULL, NULL),
(73, 'fhhdfjd', '3284789479434', 239230, 'dhdh;jha;d', 'Male', 'Married', 'sdlfhsdjfhfjd', 'hfjdsdlsfdhfd1', 'kjdkhsdfhsfdhsdfjhd', '2021-April-30', '11:00 am', 'Usman Badar', NULL, NULL, NULL),
(74, 'Shahzad', '342342324234234', 80, 'Pakistan', 'Male', 'Married', 'Developer', 'Karachi', 'England', '2021-April-30', '11:06 am', 'Usman Badar', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `candidate_tokens`
--

CREATE TABLE `candidate_tokens` (
  `token_id` int(11) NOT NULL,
  `candidate_id` int(11) NOT NULL,
  `token_no` varchar(255) NOT NULL,
  `token_date` varchar(255) NOT NULL,
  `token_time` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `candidate_tokens`
--

INSERT INTO `candidate_tokens` (`token_id`, `candidate_id`, `token_no`, `token_date`, `token_time`) VALUES
(19, 59, 'a42a', '2021-April-27', '3:31 pm'),
(20, 60, 'b948', '2021-April-28', '9:11 am'),
(21, 61, 'b747', '2021-April-28', '9:14 am'),
(22, 62, '85d1', '2021-April-28', '9:27 am'),
(23, 63, 'c63d', '2021-April-28', '9:52 am'),
(24, 64, '9e60', '2021-April-28', '10:17 am'),
(25, 65, '0a05', '2021-April-28', '12:02 pm'),
(26, 66, '2678', '2021-April-28', '1:47 pm'),
(27, 67, '0513', '2021-April-29', '1:09 pm'),
(28, 68, 'd8a8', '2021-April-29', '2:41 pm'),
(29, 69, '7e31', '2021-April-29', '2:44 pm'),
(30, 71, '0fad', '2021-April-30', '10:33 am'),
(31, 72, '7bd6', '2021-April-30', '10:38 am'),
(32, 73, 'b069', '2021-April-30', '11:00 am'),
(33, 74, '050c', '2021-April-30', '11:06 am');

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

--
-- Dumping data for table `covid_status`
--

INSERT INTO `covid_status` (`id`, `status`, `date`, `insert_by`, `insert_date`, `insert_time`, `edit_by`, `edit_date`, `edit_time`, `candidate_id`) VALUES
(6, 'no', '2021-March-29', 'Usman Badar', '2021-April-30', '11:09 am', NULL, NULL, NULL, 74);

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

--
-- Dumping data for table `laboratory_investigation`
--

INSERT INTO `laboratory_investigation` (`investigation_id`, `candidate_id`, `blood_group`, `hemoglobin`, `malaria`, `micro_filaria`, `RBs`, `lft`, `creatinine`, `hivIII`, `HbsAg`, `antiHcv`, `vdrl`, `tpha`, `sugar`, `albumin`, `CovidPCR`, `CovidAntibodies`, `helminthes`, `ova`, `cyst`, `others`, `vaccination_id`, `insert_by`, `insert_date`, `insert_time`, `edit_by`, `edit_date`, `edit_time`) VALUES
(2, 74, 'asdasdasd', 'asdasdasdasdsda', 'assdsdasd', 'asdasd', 'asdsadsdasd', 'asdasdasd', 'asdasasd', 'sdasdasdasdasd', 'asdsdasdasd', 'sasdsdaasdasd', 'asdasdasdasd', 'asasd', 'asasdasdsda', 'asdasdsdasdasd', 'sdasdasdasdasdasd', 'asdasdasdasd', 'ghgghgh', 'ghgfg', 'tyrtyrtyrtyrt', 'gfgfhgfghgfgf', 4, 'Usman Badar', '2021-April-30', '11:09 am', NULL, NULL, NULL);

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

--
-- Dumping data for table `medical_e_1`
--

INSERT INTO `medical_e_1` (`examination_id`, `candidate_id`, `height`, `weight`, `body_mass_index`, `blood_pressure`, `pulse`, `pr`, `unaided_distant_rt_eye`, `unaided_distant_lt_eye`, `aided_distant_rt_eye`, `aided_distant_lt_eye`, `unaided_near_rt_eye`, `unaided_near_lt_eye`, `aided_near_rt_eye`, `aided_near_lt_eye`, `color_vision`, `right_ear`, `left_ear`, `insert_by`, `insert_date`, `insert_time`, `edit_by`, `edit_date`, `edit_time`) VALUES
(1, 64, '56', '70', 12, '70 / 130', '30', '12', '21/6', '34/6', '33/6', '33/6', '20/12', '20/12', '20/33', '20/23', 'Doubtful', '23', '43', 'Admin', '2021-April-28', '10:27 am', NULL, NULL, NULL),
(2, 66, 'asdsdsd', 'asdasdsda', 0, 'asdasdsdasd / asdsdasd', 'asdasd', 'asdasdsd', 'das/6', 'asd/6', 'asd/6', 'asd/6', '20/da', '20/asd', '20/asd', '20/asd', 'Normal', 'adsasdasd', 'asdsdasdasasd', 'Usman Badar', '2021-April-28', '1:47 pm', NULL, NULL, NULL),
(3, 67, '12', '45', 0, '70 / 130', '234', '1234', '1/6', '1/6', '1/6', '1/6', '20/1', '20/1', '20/1', '20/1', 'Normal', 'dasdasds', 'adaasdasdasd', 'Admin', '2021-April-29', '1:09 pm', NULL, NULL, NULL),
(4, 69, 'xzxc', 'zxcxczxc', 0, 'zxczxc / zxcxc', 'xczxcxc', 'zxczxcxcz', '23/6', '23/6', '23/6', '23/6', '20/23', '20/23', '20/23', '20/23', 'Doubtful', 'dasd324234', 'dasdasdasd3423434', 'Shahzad Bhai', '2021-April-29', '2:44 pm', NULL, NULL, NULL),
(5, 71, '12', '45', 0, '70 / 130', '234', '1234', '1/6', '2/6', '2/6', 'null', '20/2', '20/2', '20/2', '20/2', 'Normal', 'sssss', 'ssss', 'Usman Badar', '2021-April-30', '10:34 am', NULL, NULL, NULL),
(6, 72, '12', '45', 0, '70 / 130', '234', '1234', '7/6', '7/6', '7/6', '7/6', '20/1', '20/1', '20/1', '20/1', 'Normal', 'dasdasds', 'ssss', 'Usman Badar', '2021-April-30', '10:39 am', NULL, NULL, NULL),
(7, 73, '12', '45', 0, '70 / 130', '234', '1234', '1/6', '1/6', '1/6', '1/6', '20/12', '20/1', '20/1', '20/12', 'Normal', 'dasdasds', 'ssss', 'Usman Badar', '2021-April-30', '11:01 am', NULL, NULL, NULL),
(8, 74, '12', '45', 23, '70 / 130', '234', '1234', '6/6', '5/6', '5/6', '5/6', '20/12', '20/12', '20/12', '20/12', 'Normal', 'dasdasds', 'adaasdasdasd', 'Usman Badar', '2021-April-30', '11:07 am', NULL, NULL, NULL);

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

--
-- Dumping data for table `medical_e_2`
--

INSERT INTO `medical_e_2` (`examination_id`, `candidate_id`, `general_appearance`, `cardio_vascular`, `respiratory`, `ent`, `Abdomen`, `hernia`, `hydrocele`, `exremities`, `back`, `skin`, `cns`, `deformities`, `speech`, `behaviour`, `orientation`, `memory`, `concentration`, `mood`, `thoughts`, `others`, `insert_by`, `insert_date`, `insert_time`, `edit_by`, `edit_date`, `edit_time`) VALUES
(1, 69, 'gfgfds', 'jkghsdflsdlf', 'asdasdsda', 'jkh;kfhsdjhsfdj', 'khfdjhdfsjfd', 'dsfjgsfsd', 'sdaasdds', 'sfdffsfd', 'sfsdfsfdsfdfddfdsfds', 'jdfgjdfgsfgdl', 'jksdfhjksfsdf;jhsf', 'jkshdfjkfhsdfh;sdfsd', 'dffdsfdfd', 'fdsfdsfdfdfd', 'fssfdsfdsfd', 'fdsdfsfdfds', 'asdasd', 'fffffff', 'sfdsfdfsdsfd', 'sfdfsfdfdssfd', 'Shahzad Bhai', '2021-April-29', '2:45 pm', NULL, NULL, NULL),
(2, 71, 'dsdasasd', 'jkghsdflsdlf', 'asdasdsda', 'jkh;kfhsdjhsfdj', 'khfdjhdfsjfd', 'dsfjgsfsd', 'sdfsdfsfdsdf', 'sfdffsfd', 'sfsdfsfdsfdfddfdsfds', 'asdasdsd', 'jksdfhjksfsdf;jhsf', 'jkshdfjkfhsdfh;sdfsd', 'dffdsfdfd', 'fdsfdsfdfdfd', 'fssfdsfdsfd', 'fdsdfsfdfds', 'asdasd', 'fffffff', 'sfdsfdfsdsfd', 'sfdfsfdfdssfd', 'Usman Badar', '2021-April-30', '10:35 am', NULL, NULL, NULL),
(3, 72, 'gfgfds', 'jkghsdflsdlf', 'asdasdsda', 'jkh;kfhsdjhsfdj', 'asdsdaasd', 'dsfjgsfsd', 'sdfsdfsfdsdf', 'sfdffsfd', 'sfsdfsfdsfdfddfdsfds', 'jdfgjdfgsfgdl', 'jksdfhjksfsdf;jhsf', 'jkshdfjkfhsdfh;sdfsd', 'dffdsfdfd', 'fdsfdsfdfdfd', 'fssfdsfdsfd', 'fdsdfsfdfds', 'asdasd', 'fffffff', 'sfdsfdfsdsfd', 'sfdfsfdfdssfd', 'Usman Badar', '2021-April-30', '10:41 am', NULL, NULL, NULL),
(4, 73, 'dsdasasd', 'jkghsdflsdlf', 'asdasdsda', 'jkh;kfhsdjhsfdj', 'khfdjhdfsjfd', 'dsfjgsfsd', 'sdfsdfsfdsdf', 'sfdffsfd', 'sfsdfsfdsfdfddfdsfds', 'asdasdsd', 'jksdfhjksfsdf;jhsf', 'jkshdfjkfhsdfh;sdfsd', 'dffdsfdfd', 'fdsfdsfdfdfd', 'fssfdsfdsfd', 'fdsdfsfdfds', 'asdasd', 'fffffff', 'sfdsfdfsdsfd', 'sfdfsfdfdssfd', 'Usman Badar', '2021-April-30', '11:01 am', NULL, NULL, NULL),
(5, 74, 'gfgfds', 'jkghsdflsdlf', 'asdasdsda', 'jkh;kfhsdjhsfdj', 'khfdjhdfsjfd', 'dsfjgsfsd', 'sdfsdfsfdsdf', 'sfdffsfd', 'sfsdfsfdsfdfddfdsfds', 'asdasdsd', 'jksdfhjksfsdf;jhsf', 'jkshdfjkfhsdfh;sdfsd', 'dffdsfdfd', 'fdsfdsfdfdfd', 'fssfdsfdsfd', 'fdsdfsfdfds', 'asdasd', 'fffffff', 'sfdsfdfsdsfd', 'sfdfsfdfdssfd', 'Usman Badar', '2021-April-30', '11:08 am', NULL, NULL, NULL);

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

--
-- Dumping data for table `meningococcal_status`
--

INSERT INTO `meningococcal_status` (`id`, `status`, `date`, `insert_by`, `insert_date`, `insert_time`, `edit_by`, `edit_date`, `edit_time`, `candidate_id`) VALUES
(6, 'yes', '2021-April-13', 'Usman Badar', '2021-April-30', '11:09 am', NULL, NULL, NULL, 74);

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

--
-- Dumping data for table `mmr1_status`
--

INSERT INTO `mmr1_status` (`id`, `status`, `date`, `insert_by`, `insert_date`, `insert_time`, `edit_by`, `edit_date`, `edit_time`, `candidate_id`) VALUES
(6, 'no', '2013-February-12', 'Usman Badar', '2021-April-30', '11:09 am', NULL, NULL, NULL, 74);

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

--
-- Dumping data for table `mmr2_status`
--

INSERT INTO `mmr2_status` (`id`, `status`, `date`, `insert_by`, `insert_date`, `insert_time`, `edit_by`, `edit_date`, `edit_time`, `candidate_id`) VALUES
(6, 'yes', '2021-April-06', 'Usman Badar', '2021-April-30', '11:09 am', NULL, NULL, NULL, 74);

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

--
-- Dumping data for table `polio_status`
--

INSERT INTO `polio_status` (`id`, `status`, `date`, `insert_by`, `insert_date`, `insert_time`, `edit_by`, `edit_date`, `edit_time`, `candidate_id`) VALUES
(6, 'yes', '2021-March-29', 'Usman Badar', '2021-April-30', '11:09 am', NULL, NULL, NULL, 74);

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
(4, 'Shahzad Bhai', 'Default', 'sha1$3853e39c$1$d79f59a70c85a8324bd48fca4f7a70b3ea695543'),
(13, 'Usman Badar', 'Default', 'sha1$6f86cede$1$80e6c16c29595ea775cf533fbf6d55f24e962a49');

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
-- Dumping data for table `vaccination`
--

INSERT INTO `vaccination` (`id`, `candidate_id`, `polio_status`, `mmr1_status`, `mmr2_status`, `meningococcal_status`, `covid_status`, `insert_by`, `insert_date`, `insert_time`, `edit_by`, `edit_date`, `edit_time`) VALUES
(4, 74, 6, 6, 6, 6, 6, 'Usman Badar', '2021-April-30', '11:09 am', NULL, NULL, NULL);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `candidate_info`
--
ALTER TABLE `candidate_info`
  MODIFY `candidate_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `candidate_tokens`
--
ALTER TABLE `candidate_tokens`
  MODIFY `token_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `covid_status`
--
ALTER TABLE `covid_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `laboratory_investigation`
--
ALTER TABLE `laboratory_investigation`
  MODIFY `investigation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `medical_e_1`
--
ALTER TABLE `medical_e_1`
  MODIFY `examination_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `medical_e_2`
--
ALTER TABLE `medical_e_2`
  MODIFY `examination_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `meningococcal_status`
--
ALTER TABLE `meningococcal_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `mmr1_status`
--
ALTER TABLE `mmr1_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `mmr2_status`
--
ALTER TABLE `mmr2_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `polio_status`
--
ALTER TABLE `polio_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `vaccination`
--
ALTER TABLE `vaccination`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
