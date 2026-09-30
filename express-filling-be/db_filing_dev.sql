-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 30, 2026 at 10:57 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_filing_dev`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `refresh_token` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id`, `username`, `password`, `role`, `refresh_token`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', '$2b$10$4bB5YPG7A0tWh54a8ZDnDuWGvh2ug9vY9SROfMu8MHoRMKMQ0rEsy', 'user', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOjEsInVzZXIiOiJhZG1pbiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjg5MTAxNTgxLCJleHAiOjE2ODkxMDE1ODJ9.P1Fgj5dWNmNOD3ouqm6AmqQ5oQwXdnfN6VXSPhPXNfg', '2023-07-11 18:52:44', '2023-07-11 18:53:01');

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `id` int(11) NOT NULL,
  `user_id` varchar(40) DEFAULT NULL,
  `workshop_id` int(11) DEFAULT NULL,
  `kesimpulan_materi` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth`
--

CREATE TABLE `auth` (
  `id` varchar(40) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_id` varchar(40) DEFAULT NULL,
  `role_id` varchar(40) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auth`
--

INSERT INTO `auth` (`id`, `username`, `password`, `user_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
('21522ec4-f815-4d22-98ce-f65789d37aae', 'udin@gmail.com', '$2b$10$jF/4FEtGNuBqx8jRXwwKAeQkr9bfkbjwNvnU0tQDLUcq32xHeLlfa', 'efb4a3be-37ab-416a-912a-03147f87754c', '71ce8f4e-4fbd-42e6-b67d-f247bcb5cf03', '2026-09-29 07:53:44', '2026-09-29 07:53:44', NULL),
('23f1d87b-c73b-4a73-b3cb-86a68003325b', 'alwi@gmail.com', '$2b$10$tgdcyeniwSeap3rjW/qsK.FTefSN63O.5mydvOxvvYq52Hlz3wFMa', 'f06133ef-50a0-42d1-9bcc-5fd8eaafa28d', '71ce8f4e-4fbd-42e6-b67d-f247bcb5cf03', '2023-07-12 11:05:28', '2023-07-12 11:05:28', NULL),
('2b21f58d-a840-4316-a9c7-c7e0f08c41d0', 'admin', '$2b$10$H9ILR5x0/Z/53sByU1UgyeB7T8uTlJVK/zneEazllX7i5mIR2Z6ku', '84a2f8f1-ddbe-419a-8893-bff335acf710', '0c2f99e2-3ffc-454c-88c3-4ba40fb12b9d', '2023-07-08 11:35:10', '2026-09-28 03:01:00', NULL),
('30e55fd6-8685-4410-a039-62f6fcae4538', 'ilham@gmail.com', '$2b$10$MH2YZUusNzevj7tHXtopaOllIWP1k1M3uhrydnJwJXnHkgb7vPPRC', '4e7d45fb-f51a-4787-9a11-305c52fdc8fe', '71ce8f4e-4fbd-42e6-b67d-f247bcb5cf03', '2026-09-29 02:54:34', '2026-09-29 02:54:34', NULL),
('875791c2-02fe-4021-92dd-ec1ae1185e30', 'alip@gmail.com', '$2b$10$Ksnc1J6zPEHU5uB05KDLgOUkLvtLh0Ft/W5Km/.kjeewKIEFIN5Vi', '5763e261-6156-46ae-a3cd-7534e21db170', NULL, '2023-07-08 11:51:20', '2023-07-08 11:51:20', NULL),
('89cf1094-f493-45c0-8ba5-1cef503549fe', 'admin@gmail.com', '$2b$10$H9ILR5x0/Z/53sByU1UgyeB7T8uTlJVK/zneEazllX7i5mIR2Z6ku', 'b9d9da23-fd0f-4541-b64e-5f966195fd07', '0c2f99e2-3ffc-454c-88c3-4ba40fb12b9d', '2023-07-12 10:34:28', '2026-09-28 03:01:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` int(11) NOT NULL,
  `user_id` varchar(40) DEFAULT NULL,
  `workshop_id` int(11) DEFAULT NULL,
  `feedback` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `id` int(11) NOT NULL,
  `user_id` varchar(40) NOT NULL,
  `workshop_id` int(11) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `uniq_code` varchar(255) DEFAULT NULL,
  `metode_pembayaran` varchar(255) DEFAULT NULL,
  `bukti_pembayaran` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`id`, `user_id`, `workshop_id`, `status`, `uniq_code`, `metode_pembayaran`, `bukti_pembayaran`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '209c0a27-9705-4931-b37c-2de1ed928801', 1, 'Menunggu Pembayaran', NULL, 'Debit', 'a.jpg', '2023-07-12 06:31:13', '2023-07-12 06:31:13', NULL),
(4, 'f06133ef-50a0-42d1-9bcc-5fd8eaafa28d', 1, 'Lunas', '28e7d065-cce9-48af-b9b8-13c260ee96ac', 'transfer', 'a9581188-68a5-40bd-904b-f754ca76fe17.png', '2023-07-12 12:58:49', '2026-09-28 03:40:06', NULL),
(5, '4e7d45fb-f51a-4787-9a11-305c52fdc8fe', 3, 'Lunas', '3db28e1f-dadd-4bf2-a12a-3c027ec48c56', 'transfer', '7d7dc1e0-0249-4e59-b56f-88a62eb56c7d.jpeg', '2026-09-29 04:06:49', '2026-09-29 04:07:19', NULL),
(6, '4e7d45fb-f51a-4787-9a11-305c52fdc8fe', 2, 'Lunas', '5de411e1-662e-445d-8ad4-96e5d16fea74', 'transfer', 'caeeb932-2f5b-40a1-bf48-6fbbfab3c34f.jpeg', '2026-09-29 04:08:48', '2026-09-29 04:21:57', NULL),
(7, 'efb4a3be-37ab-416a-912a-03147f87754c', 3, 'Lunas', '00d44b5c-6276-434f-bb05-f263aa5dba94', 'transfer', 'c36074fd-5e5b-4c5a-adf2-c6f4f35940d7.jpeg', '2026-09-29 08:03:21', '2026-09-29 08:03:50', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` varchar(40) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `deskripsi` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `nama`, `deskripsi`, `created_at`, `updated_at`, `deleted_at`) VALUES
('0c2f99e2-3ffc-454c-88c3-4ba40fb12b9d', 'Admin', 'admin all akseses', '2023-07-05 16:25:14', '2023-07-11 17:56:08', NULL),
('71ce8f4e-4fbd-42e6-b67d-f247bcb5cf03', 'User', 'user not all aksestr', '2023-07-05 16:47:03', '2023-07-11 17:56:16', '2023-07-05 16:49:34');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(40) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `npm` varchar(255) DEFAULT NULL,
  `kelas` varchar(255) DEFAULT NULL,
  `jurusan` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `line_account` varchar(255) DEFAULT NULL,
  `wa_account` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `role_id` varchar(40) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `npm`, `kelas`, `jurusan`, `email`, `line_account`, `wa_account`, `phone_number`, `img`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
('209c0a27-9705-4931-b37c-2de1ed928801', 'alwis', 'gunawans', '12312', '1212', 'SIs', 'alwis@gmail.com', '08123213213', '0823132133', '08231321323', '44131aa7-cbe7-4523-94d9-19801c1d95a4.png', '71ce8f4e-4fbd-42e6-b67d-f247bcb5cf03', '2023-07-11 19:44:53', '2023-07-11 20:12:36', NULL),
('4e7d45fb-f51a-4787-9a11-305c52fdc8fe', 'Ilham', 'Ramadhan', '50422001', '3IA01', 'Teknik Informatika', 'ilham@gmail.com', NULL, NULL, NULL, NULL, '71ce8f4e-4fbd-42e6-b67d-f247bcb5cf03', '2026-09-29 02:54:34', '2026-09-29 05:04:07', NULL),
('b9d9da23-fd0f-4541-b64e-5f966195fd07', NULL, NULL, NULL, NULL, NULL, 'admin@gmail.com', NULL, NULL, NULL, NULL, '71ce8f4e-4fbd-42e6-b67d-f247bcb5cf03', '2023-07-12 10:34:28', '2023-07-12 10:34:28', NULL),
('efb4a3be-37ab-416a-912a-03147f87754c', NULL, NULL, NULL, NULL, NULL, 'udin@gmail.com', NULL, NULL, NULL, NULL, '71ce8f4e-4fbd-42e6-b67d-f247bcb5cf03', '2026-09-29 07:53:44', '2026-09-29 07:53:44', NULL),
('f06133ef-50a0-42d1-9bcc-5fd8eaafa28d', 'Alwi', 'Shihab', '50422002', '3KA01', 'Sistem Informasi', 'alwi@gmail.com', NULL, NULL, NULL, NULL, '71ce8f4e-4fbd-42e6-b67d-f247bcb5cf03', '2023-07-12 11:05:28', '2026-09-29 05:04:07', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `workshop`
--

CREATE TABLE `workshop` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `tanggal` date DEFAULT NULL,
  `jam` time DEFAULT NULL,
  `tempat` varchar(255) DEFAULT NULL,
  `harga` decimal(10,2) DEFAULT NULL,
  `kuota` int(11) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `workshop`
--

INSERT INTO `workshop` (`id`, `nama`, `tanggal`, `jam`, `tempat`, `harga`, `kuota`, `img`, `deskripsi`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Matematika', '2023-07-12', '13:04:15', 'Jakarta', 10000.00, 102, 'f3631d00-fee0-40d3-82d1-2eae2f6a7a91.jpg', 'matematika fun', '2023-07-12 06:04:34', '2026-09-28 03:38:58', NULL),
(2, 'english', '2026-09-28', '23:00:00', 'Jakarta', 20000.00, 40, '31367151-e6f8-4d0b-b9b7-7567c29be955.jpg', 'dsdsds', '2026-09-28 03:39:59', '2026-09-29 04:08:29', NULL),
(3, 'Digital Marketing', '2026-09-29', '11:00:00', 'Jakarta', 20000.00, 40, '782e60ae-af16-40b4-8ddb-fa38add3c568.jpg', 'dsdsd', '2026-09-29 03:44:41', '2026-09-29 03:44:41', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `auth`
--
ALTER TABLE `auth`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `workshop_id` (`workshop_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `workshop`
--
ALTER TABLE `workshop`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `workshop`
--
ALTER TABLE `workshop`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `auth`
--
ALTER TABLE `auth`
  ADD CONSTRAINT `auth_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `auth_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `payment_ibfk_2` FOREIGN KEY (`workshop_id`) REFERENCES `workshop` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
