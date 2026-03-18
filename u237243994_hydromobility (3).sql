-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Feb 12, 2026 at 06:32 AM
-- Server version: 11.8.3-MariaDB-log
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u237243994_hydromobility`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_menu`
--

CREATE TABLE `admin_menu` (
  `id` int(10) UNSIGNED NOT NULL,
  `parent_id` int(11) NOT NULL DEFAULT 0,
  `order` int(11) NOT NULL DEFAULT 0,
  `title` varchar(50) NOT NULL,
  `icon` varchar(50) NOT NULL,
  `uri` varchar(50) DEFAULT NULL,
  `permission` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin_menu`
--

INSERT INTO `admin_menu` (`id`, `parent_id`, `order`, `title`, `icon`, `uri`, `permission`, `created_at`, `updated_at`) VALUES
(1, 0, 1, 'Dashboard', 'fa-bar-chart', '/', NULL, NULL, '2024-01-18 15:17:32'),
(8, 9, 7, 'App Settings', 'fa-cog', 'app-settings', '*', '2020-04-02 12:42:07', '2025-10-14 14:52:03'),
(9, 0, 3, 'Settings', 'fa-cogs', NULL, '*', '2020-04-02 13:34:23', '2025-10-14 14:52:03'),
(10, 0, 68, 'Cancellation Reasons', 'fa-th-list', 'cancellation-reasons', '*', '2020-04-02 14:15:00', '2025-10-25 19:01:18'),
(12, 0, 65, 'Tax Lists', 'fa-briefcase', 'tax-lists', '*', '2020-04-02 15:45:48', '2025-10-25 19:01:18'),
(16, 9, 8, 'Trip Settings', 'fa-asterisk', 'trip-settings', '*', '2020-04-03 06:46:34', '2025-10-14 14:52:03'),
(18, 0, 71, 'Faqs', 'fa-bars', 'faqs', '*', '2020-04-03 07:29:41', '2025-10-25 19:01:18'),
(19, 0, 72, 'Privacy Policies', 'fa-pied-piper-pp', 'privacy-policies', '*', '2020-04-03 07:56:48', '2025-10-25 19:01:18'),
(20, 74, 59, 'Payment Methods', 'fa-hand-o-right', 'payment-methods', '*', '2020-04-03 08:23:01', '2025-10-25 19:01:18'),
(21, 0, 64, 'Promo Codes', 'fa-gift', 'promo-codes', '*', '2020-04-03 08:39:09', '2025-10-25 19:01:18'),
(23, 0, 36, 'Vehicle Categories', 'fa-automobile', 'vehicle-categories', '*', '2020-04-04 00:19:34', '2025-10-25 19:01:18'),
(24, 38, 55, 'Complaint Categories', 'fa-close', 'complaint-categories', '*', '2020-04-04 00:34:52', '2025-10-25 19:01:18'),
(25, 38, 56, 'Complaint Sub Categories', 'fa-adjust', 'complaint-sub-categories', '*', '2020-04-04 01:15:57', '2025-10-25 19:01:18'),
(27, 38, 57, 'Complaints', 'fa-comment', 'complaints', '*', '2020-04-04 12:30:58', '2025-10-25 19:01:18'),
(28, 45, 15, 'Customers', 'fa-female', 'customers', NULL, '2020-04-04 12:58:58', '2025-10-14 16:17:04'),
(29, 41, 27, 'Drivers', 'fa-compass', 'drivers', '*', '2020-04-04 13:42:27', '2025-10-25 19:01:18'),
(31, 41, 28, 'Driver Vehicles', 'fa-cab', 'driver-vehicles', '*', '2020-04-06 04:03:38', '2025-10-25 19:01:18'),
(32, 9, 9, 'Contact Settings', 'fa-pinterest-p', 'contact-settings', '*', '2020-04-06 11:26:03', '2025-10-14 14:52:03'),
(33, 0, 67, 'Notification Messages', 'fa-bell', 'notification-messages', '*', '2020-04-07 07:50:56', '2025-10-25 19:01:18'),
(38, 0, 54, 'Complaints', 'fa-bars', NULL, '*', '2020-09-07 07:58:36', '2025-10-25 19:01:18'),
(39, 0, 69, 'User Types', 'fa-bars', 'user-types', '*', '2020-09-27 10:17:53', '2025-10-25 19:01:18'),
(40, 45, 17, 'Customer Wallet Histories', 'fa-cc-mastercard', 'customer-wallet-histories', '*', '2020-09-27 11:41:29', '2025-10-14 16:17:04'),
(41, 0, 26, 'Drivers', 'fa-male', NULL, '*', '2020-10-01 22:10:55', '2025-10-25 19:01:18'),
(42, 41, 29, 'Driver Wallet Histories', 'fa-bars', 'driver-wallet-histories', '*', '2020-10-01 22:11:53', '2025-10-25 19:01:18'),
(43, 41, 31, 'Driver Earnings', 'fa-bars', 'driver-earnings', '*', '2020-10-01 22:12:25', '2025-10-25 19:01:18'),
(44, 41, 32, 'Driver Withdrawals', 'fa-bars', 'driver-withdrawals', '*', '2020-10-01 22:14:36', '2025-10-25 19:01:18'),
(45, 0, 14, 'Customers', 'fa-group', NULL, NULL, '2020-10-01 22:37:39', '2025-10-14 16:17:04'),
(46, 41, 33, 'Driver Bank Details', 'fa-bars', 'driver-bank-kyc-details', '*', '2020-10-02 03:08:01', '2025-10-25 19:01:18'),
(47, 41, 35, 'Driver Tutorials', 'fa-bars', 'driver-tutorials', '*', '2020-10-04 06:17:55', '2025-10-25 19:01:18'),
(48, 62, 46, 'Trips', 'fa-bars', 'trips', '*', '2020-10-14 23:02:27', '2025-10-25 19:01:18'),
(49, 62, 50, 'Booking Statuses', 'fa-bars', 'booking-statuses', '*', '2020-10-15 07:05:00', '2025-10-25 19:01:18'),
(55, 74, 60, 'Payment Types', 'fa-bars', 'payment-types', '*', '2020-11-25 05:54:07', '2025-10-25 19:01:18'),
(61, 45, 16, 'Customer Sos Contacts', 'fa-bars', 'customer-sos-contacts', '*', '2021-01-08 06:28:28', '2025-10-14 16:17:04'),
(62, 0, 45, 'Trips', 'fa-angle-double-right', NULL, '*', '2021-02-05 04:30:35', '2025-10-25 19:01:18'),
(63, 62, 47, 'Trip Types', 'fa-bars', 'trip-types', '*', '2021-02-05 04:31:29', '2025-10-25 19:01:18'),
(64, 65, 39, 'Daily Fare Managements', 'fa-dollar', 'daily-fare-managements', '*', '2021-02-12 07:37:37', '2025-10-25 19:01:18'),
(65, 0, 38, 'Fare Managements', 'fa-dollar', NULL, '*', '2021-02-12 07:38:09', '2025-10-25 19:01:18'),
(66, 65, 42, 'Outstation Fare Managements', 'fa-dollar', 'outstation-fare-managements', '*', '2021-02-12 08:18:55', '2025-10-25 19:01:18'),
(67, 65, 40, 'Packages', 'fa-dollar', 'packages', '*', '2021-02-12 08:22:15', '2025-10-25 19:01:18'),
(68, 65, 41, 'Rental Fare Managements', 'fa-dollar', 'rental-fare-managements', '*', '2021-02-12 08:23:42', '2025-10-25 19:01:18'),
(69, 62, 52, 'Trip Request Statuses', 'fa-arrow-right', 'trip-request-statuses', '*', '2021-02-26 10:09:00', '2025-10-25 19:01:18'),
(70, 62, 51, 'Driver Trip Requests', 'fa-bars', 'driver-trip-requests', '*', '2021-02-26 10:45:56', '2025-10-25 19:01:18'),
(73, 74, 61, 'Payment histories', 'fa-bars', 'payment-histories', '*', '2021-03-02 08:01:45', '2025-10-25 19:01:18'),
(74, 0, 58, 'Payments', 'fa-dollar', NULL, '*', '2021-03-02 08:02:17', '2025-10-25 19:01:18'),
(75, 62, 49, 'Trip Requests', 'fa-arrow-circle-right', 'trip-requests', '*', '2021-03-02 08:05:43', '2025-10-25 19:01:18'),
(76, 0, 73, 'Status', 'fa-arrow-circle-right', 'statuses', '*', '2021-03-06 02:50:54', '2025-10-25 19:01:18'),
(78, 41, 34, 'Driver Recharges', 'fa-money', 'driver_recharges', NULL, '2021-03-23 17:27:58', '2025-10-25 19:01:18'),
(79, 45, 18, 'Customer Favourites', 'fa-bars', 'customer-favourites', '*', '2021-03-29 09:51:11', '2025-10-14 16:17:04'),
(80, 62, 48, 'Trip Sub Types', 'fa-bars', 'trip-sub-types', '*', '2021-04-12 04:25:47', '2025-10-25 19:01:18'),
(81, 65, 43, 'Delivery Fare Management', 'fa-bars', 'delivery-fare-managements', '*', '2021-04-12 09:58:56', '2025-10-25 19:01:18'),
(85, 62, 53, 'Stops', 'fa-arrow-right', 'stops', '*', '2021-06-27 15:07:52', '2025-10-25 19:01:18'),
(86, 0, 37, 'Livechat', 'fa-wechat', 'live_chat', NULL, '2022-05-28 02:41:04', '2025-10-25 19:01:18'),
(87, 41, 30, 'Driver Tips', 'fa-money', 'driver_tips', NULL, '2022-06-26 10:38:04', '2025-10-25 19:01:18'),
(88, 0, 13, 'Zones', 'fa-map-marker', 'zones', NULL, '2022-06-27 14:08:57', '2025-10-14 16:17:04'),
(89, 65, 44, 'Shared Fare Management', 'fa-money', 'shared-fare-managements', NULL, '2022-08-06 01:24:32', '2025-10-25 19:01:18'),
(98, 9, 10, 'Shared Trip Setting', 'fa-users', 'shared-trip-settings', NULL, '2022-12-29 12:07:28', '2025-10-14 14:52:03'),
(99, 0, 2, 'Dispatch Panel', 'fa-desktop', 'dispatch_panel', NULL, '2023-03-10 17:06:42', '2025-10-14 14:52:03'),
(100, 9, 11, 'Vehicle Slug', 'fa-car', 'vehicle-slug', NULL, '2023-03-11 12:43:36', '2025-10-14 14:52:03'),
(101, 9, 6, 'App Versions', 'fa-angle-double-right', 'app_versions', '*', '2023-03-21 18:09:19', '2025-10-14 14:52:03'),
(107, 9, 4, 'Website Settings', 'fa-globe', 'website_settings', '*', '2025-01-17 10:13:39', '2025-10-14 14:52:03'),
(108, 0, 62, 'Our Services', 'fa-server', 'our_services', NULL, '2025-01-17 10:44:58', '2025-10-25 19:01:18'),
(109, 0, 63, 'Testimonials', 'fa-comments', 'testimonials', NULL, '2025-01-17 10:59:11', '2025-10-25 19:01:18'),
(110, 9, 5, 'Map Settings', 'fa-map', 'map_settings', NULL, '2025-06-16 14:28:36', '2025-10-14 14:52:03'),
(111, 0, 66, 'Terms And Conditions', 'fa-eye', 'term_conditions', NULL, '2025-10-14 11:06:01', '2025-10-25 19:01:18'),
(112, 0, 19, 'Corporate Customers', 'fa-users', NULL, NULL, '2025-10-14 14:50:44', '2025-10-14 16:17:04'),
(113, 0, 70, 'How It Works', 'fa-question-circle', 'how_it_works', NULL, '2025-10-14 16:15:53', '2025-10-25 19:01:18'),
(114, 9, 12, 'App Details', 'fa-info', 'app_details', NULL, '2025-10-14 16:16:56', '2025-10-14 16:17:04'),
(115, 112, 20, 'All Corporate Customers', 'fa-user', 'corporate-customers', NULL, '2025-10-14 16:20:18', '2025-10-23 12:48:44'),
(116, 112, 21, 'Corporate Customer Requests', 'fa-check-square', 'corporate-customer-requests', NULL, '2025-10-14 16:21:39', '2025-10-23 12:48:44'),
(117, 112, 22, 'Corporate Agents', 'fa-user', 'corporate_agents', NULL, '2025-10-23 12:46:50', '2025-10-23 12:46:57'),
(118, 112, 23, 'Corporate Policies', 'fa-adjust', 'policies', NULL, '2025-10-23 12:47:37', '2025-10-23 12:49:05'),
(119, 112, 24, 'Corporate Groups', 'fa-users', 'groups', NULL, '2025-10-23 12:48:03', '2025-10-23 12:49:16'),
(120, 112, 25, 'Payment Statements', 'fa-credit-card-alt', 'payment_statements', NULL, '2025-10-25 19:01:08', '2025-10-25 19:01:18');

-- --------------------------------------------------------

--
-- Table structure for table `admin_operation_log`
--

CREATE TABLE `admin_operation_log` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `path` varchar(255) NOT NULL,
  `method` varchar(10) NOT NULL,
  `ip` varchar(255) NOT NULL,
  `input` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `admin_permissions`
--

CREATE TABLE `admin_permissions` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `slug` varchar(50) NOT NULL,
  `http_method` varchar(255) DEFAULT NULL,
  `http_path` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin_permissions`
--

INSERT INTO `admin_permissions` (`id`, `name`, `slug`, `http_method`, `http_path`, `created_at`, `updated_at`) VALUES
(1, 'All permission', '*', '', '*', NULL, NULL),
(2, 'Dashboard', 'dashboard', 'GET', '/', NULL, NULL),
(3, 'Login', 'auth.login', '', '/auth/login\r\n/auth/logout', NULL, NULL),
(4, 'User setting', 'auth.setting', 'GET,PUT', '/auth/setting', NULL, NULL),
(5, 'Auth management', 'auth.management', '', '/auth/roles\r\n/auth/permissions\r\n/auth/menu\r\n/auth/logs', NULL, NULL),
(6, 'Customers', 'customers', 'GET,POST,PUT,DELETE,PATCH,OPTIONS,HEAD', '/customers*', '2021-04-19 20:39:47', '2021-04-19 20:39:47'),
(7, 'ONKAR UG', 'GERMAN', 'HEAD', NULL, '2022-07-11 18:35:33', '2022-07-11 18:35:33'),
(8, 'Dispatch Panel', 'dispatch_panel', 'GET,POST,PUT,DELETE,PATCH,OPTIONS,HEAD', '/dispatch_panel*', '2022-12-29 09:48:32', '2022-12-29 09:48:32');

-- --------------------------------------------------------

--
-- Table structure for table `admin_roles`
--

CREATE TABLE `admin_roles` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `slug` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin_roles`
--

INSERT INTO `admin_roles` (`id`, `name`, `slug`, `created_at`, `updated_at`) VALUES
(1, 'Administrator', 'administrator', '2020-04-02 02:49:21', '2020-04-02 02:49:21'),
(2, 'sub_admin', 'sub_admin', '2021-04-19 20:36:19', '2024-08-15 18:02:15'),
(4, 'testa', 'Teste cliente', '2025-02-13 21:19:49', '2025-02-13 21:19:49');

-- --------------------------------------------------------

--
-- Table structure for table `admin_role_menu`
--

CREATE TABLE `admin_role_menu` (
  `role_id` int(11) NOT NULL,
  `menu_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin_role_menu`
--

INSERT INTO `admin_role_menu` (`role_id`, `menu_id`, `created_at`, `updated_at`) VALUES
(1, 8, NULL, NULL),
(1, 9, NULL, NULL),
(1, 16, NULL, NULL),
(1, 32, NULL, NULL),
(1, 50, NULL, NULL),
(1, 51, NULL, NULL),
(1, 52, NULL, NULL),
(1, 57, NULL, NULL),
(1, 58, NULL, NULL),
(1, 88, NULL, NULL),
(1, 2, NULL, NULL),
(1, 8, NULL, NULL),
(1, 9, NULL, NULL),
(1, 16, NULL, NULL),
(1, 32, NULL, NULL),
(1, 50, NULL, NULL),
(1, 51, NULL, NULL),
(1, 52, NULL, NULL),
(1, 53, NULL, NULL),
(1, 57, NULL, NULL),
(1, 58, NULL, NULL),
(1, 88, NULL, NULL),
(1, 98, NULL, NULL),
(1, 101, NULL, NULL),
(1, 103, NULL, NULL),
(1, 105, NULL, NULL),
(2, 101, NULL, NULL),
(2, 8, NULL, NULL),
(2, 16, NULL, NULL),
(2, 32, NULL, NULL),
(1, 107, NULL, NULL),
(2, 107, NULL, NULL),
(1, 108, NULL, NULL),
(1, 109, NULL, NULL),
(1, 110, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `admin_role_permissions`
--

CREATE TABLE `admin_role_permissions` (
  `role_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin_role_permissions`
--

INSERT INTO `admin_role_permissions` (`role_id`, `permission_id`, `created_at`, `updated_at`) VALUES
(1, 1, NULL, NULL),
(1, 1, NULL, NULL),
(2, 1, NULL, NULL),
(4, 8, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `admin_role_users`
--

CREATE TABLE `admin_role_users` (
  `role_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin_role_users`
--

INSERT INTO `admin_role_users` (`role_id`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 1, NULL, NULL),
(1, 1, NULL, NULL),
(1, 8, NULL, NULL),
(4, 9, NULL, NULL),
(2, 10, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `admin_users`
--

CREATE TABLE `admin_users` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(190) NOT NULL,
  `password` varchar(60) NOT NULL,
  `name` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin_users`
--

INSERT INTO `admin_users` (`id`, `username`, `password`, `name`, `avatar`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'admin', '$2y$10$KbGgQSyhUIP6KmLdGEWDueHHOurwvoc7C/IYrr90h0bxcpnz0vEhe', 'Admin', 'image/2b5746f9a0e9541ae9599461b571e882.png', 'nHipJkW1wyzWEKQsf2qkMnEnDNFpc1H2BcMFBBPTF6fNWoKCArqu0dwRMe4j', '2020-04-02 02:49:21', '2025-10-06 10:37:06');

-- --------------------------------------------------------

--
-- Table structure for table `admin_user_permissions`
--

CREATE TABLE `admin_user_permissions` (
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin_user_permissions`
--

INSERT INTO `admin_user_permissions` (`user_id`, `permission_id`, `created_at`, `updated_at`) VALUES
(2, 1, NULL, NULL),
(4, 3, NULL, NULL),
(5, 1, NULL, NULL),
(6, 2, NULL, NULL),
(6, 3, NULL, NULL),
(6, 6, NULL, NULL),
(7, 2, NULL, NULL),
(7, 3, NULL, NULL),
(7, 4, NULL, NULL),
(7, 5, NULL, NULL),
(7, 6, NULL, NULL),
(2, 1, NULL, NULL),
(4, 3, NULL, NULL),
(5, 1, NULL, NULL),
(6, 2, NULL, NULL),
(6, 3, NULL, NULL),
(6, 6, NULL, NULL),
(7, 2, NULL, NULL),
(7, 3, NULL, NULL),
(7, 4, NULL, NULL),
(7, 5, NULL, NULL),
(7, 6, NULL, NULL),
(8, 1, NULL, NULL),
(9, 8, NULL, NULL),
(10, 2, NULL, NULL),
(10, 8, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `app_details`
--

CREATE TABLE `app_details` (
  `id` int(11) NOT NULL,
  `title` varchar(250) NOT NULL,
  `description` text NOT NULL,
  `icon` varchar(250) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `app_details`
--

INSERT INTO `app_details` (`id`, `title`, `description`, `icon`, `created_at`, `updated_at`) VALUES
(1, 'Quick Booking', 'Book a ride in just 3 taps with our intuitive interface.', 'image/b1b2137c26147d3e6fb3bbed0f3e849c.png', '2025-10-14 16:42:44', '2025-10-14 16:42:44'),
(2, 'Live Tracking', 'Watch your driver approach in real-time on interactive maps.', 'image/e867f4c94721a7b9e050ee2aecf8374b.png', '2025-10-14 16:43:18', '2025-10-14 16:43:18'),
(3, 'Easy Payments', 'Multiple payment options including cash, card, and digital wallets.', 'image/60628eadb2da3877efcad261ac3422b4.png', '2025-10-14 16:43:40', '2025-10-14 16:43:40');

-- --------------------------------------------------------

--
-- Table structure for table `app_settings`
--

CREATE TABLE `app_settings` (
  `id` int(11) NOT NULL,
  `app_name` varchar(250) NOT NULL,
  `logo` varchar(250) NOT NULL,
  `app_version` varchar(10) NOT NULL,
  `driver_app_version` varchar(10) NOT NULL,
  `default_currency` varchar(100) NOT NULL,
  `default_country` varchar(250) DEFAULT NULL,
  `phone_code` varchar(10) DEFAULT NULL,
  `default_currency_symbol` varchar(10) NOT NULL,
  `currency_short_code` varchar(10) NOT NULL,
  `about_us` text NOT NULL,
  `about_us_ar` text DEFAULT NULL,
  `referral_amount` double DEFAULT NULL,
  `driver_referral_amount` double NOT NULL,
  `language_status` int(11) NOT NULL DEFAULT 1,
  `default_language` varchar(100) NOT NULL DEFAULT 'en',
  `subscription_status` int(11) NOT NULL DEFAULT 1,
  `polyline_status` int(11) NOT NULL DEFAULT 1,
  `driver_trip_time` double NOT NULL DEFAULT 10,
  `capital_lat` float NOT NULL DEFAULT 0,
  `capital_lng` float NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `app_settings`
--

INSERT INTO `app_settings` (`id`, `app_name`, `logo`, `app_version`, `driver_app_version`, `default_currency`, `default_country`, `phone_code`, `default_currency_symbol`, `currency_short_code`, `about_us`, `about_us_ar`, `referral_amount`, `driver_referral_amount`, `language_status`, `default_language`, `subscription_status`, `polyline_status`, `driver_trip_time`, `capital_lat`, `capital_lng`, `created_at`, `updated_at`) VALUES
(1, 'Hydromobility EV', 'image/f677381becab3166ef3d72357e44858e.png', '1.0', '1.0', 'KSh', 'NGN', '+234', 'KSh', 'KSh', 'You can now get an advanced app for taxi booking  for Android and iOS. The application works on real time and has integrated Mobile Payment feature which ensures that the payment for signed up drivers can be automatically taken care of. There are two mobile applications that come with the Taxi Booking app', 'يمكنك الآن الحصول على تطبيق متقدم لحجز سيارات الأجرة لنظامي Android و iOS. يعمل التطبيق في الوقت الفعلي ويحتوي على ميزة الدفع عبر الهاتف المحمول المتكاملة التي تضمن إمكانية دفع رسوم السائقين المسجلين تلقائيًا. هناك نوعان من تطبيقات الهاتف المحمول التي تأتي مع تطبيق Taxi Booking', 100, 100, 1, 'en', 1, 1, 30, 9.91035, 78.0889, '2022-12-18 11:10:55', '2025-10-17 12:35:20');

-- --------------------------------------------------------

--
-- Table structure for table `app_versions`
--

CREATE TABLE `app_versions` (
  `id` int(11) NOT NULL,
  `platform` int(11) NOT NULL,
  `version_number` varchar(10) NOT NULL,
  `version_code` varchar(10) NOT NULL,
  `date_of_upload` date NOT NULL,
  `date_of_approved` date NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `app_versions`
--

INSERT INTO `app_versions` (`id`, `platform`, `version_number`, `version_code`, `date_of_upload`, `date_of_approved`, `created_at`, `updated_at`) VALUES
(1, 1, '1.0', '1', '2023-03-21', '2023-03-21', '2023-03-21 18:28:40', '2024-12-29 00:54:15'),
(2, 2, '1.0', '1', '2023-10-20', '2023-10-21', '2023-10-21 18:03:17', '2024-07-26 17:56:04');

-- --------------------------------------------------------

--
-- Table structure for table `booking_statuses`
--

CREATE TABLE `booking_statuses` (
  `id` int(11) NOT NULL,
  `status_name` varchar(100) NOT NULL,
  `customer_status_name` varchar(250) NOT NULL,
  `status_name_ar` varchar(100) DEFAULT NULL,
  `customer_status_name_ar` varchar(250) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `booking_statuses`
--

INSERT INTO `booking_statuses` (`id`, `status_name`, `customer_status_name`, `status_name_ar`, `customer_status_name_ar`, `created_at`, `updated_at`) VALUES
(1, 'Accepted', 'Your ride on the way', 'وافقت', 'رحلتك على الطريق', '2020-10-13 15:10:16', '2021-03-06 03:35:43'),
(2, 'At Point', 'Driver reached your location', 'عند نقطة', 'وصل السائق إلى موقعك', '2020-10-13 15:10:16', '2021-03-06 03:36:23'),
(3, 'Start Trip', 'Your trip started,  Enjoy your doorstep pick-up on-time', 'ابدأ الرحلة', 'بدأت رحلتك ، واستمتع باستلامك عند عتبة بابك في الوقت المحدد', '2020-10-13 15:11:58', '2023-06-30 14:53:47'),
(4, 'End Trip', 'Reached your drop point. Hope you enjoy the trip.', 'نهاية الرحلة', 'وصلت إلى نقطة إسقاطك. أتمنى أن تستمتع بالسفر.', '2020-10-13 15:11:58', '2023-06-30 14:54:17'),
(5, 'Completed', 'The trip was completed. We are waiting for your other booking', 'مكتمل', 'اكتملت الرحلة. نحن ننتظر حجزك الآخر', '2020-10-13 15:13:14', '2023-06-30 14:54:53'),
(6, 'Cancelled By Customer', 'Your trip was cancelled', 'ألغى العميل', 'تم إلغاء رحلتك', '2020-10-13 15:12:32', '2021-03-06 03:40:20'),
(7, 'Cancelled By Driver', 'Your trip was cancelled by this driver, sorry for your inconvenience', 'ألغى السائق', 'تم إلغاء رحلتك من قبل هذا السائق ، نأسف للإزعاج', '2020-10-13 15:12:32', '2021-03-06 03:41:56'),
(8, 'Cancelled By Corporate', 'Your trip was cancelled by corporate', NULL, NULL, '2025-12-30 16:34:06', '2025-12-30 16:34:06');

-- --------------------------------------------------------

--
-- Table structure for table `cancellation_reasons`
--

CREATE TABLE `cancellation_reasons` (
  `id` int(11) NOT NULL,
  `reason` varchar(250) NOT NULL,
  `reason_ar` varchar(250) DEFAULT NULL,
  `type` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cancellation_reasons`
--

INSERT INTO `cancellation_reasons` (`id`, `reason`, `reason_ar`, `type`, `created_at`, `updated_at`) VALUES
(1, 'Change in our destination place', 'تغيير في مكان وجهتنا', 1, '2021-03-01 10:14:28', '2021-03-06 03:44:28'),
(2, 'Want to change vehicle', 'تريد تغيير السيارة', 1, '2021-03-01 12:50:47', '2021-03-06 03:44:47'),
(3, 'No need this driver', 'لا حاجة لهذا السائق', 1, '2021-03-01 12:51:29', '2021-03-06 03:45:04'),
(4, 'Vehicle is not good', 'المركبة غير نظيفة', 1, '2021-03-19 12:51:25', '2021-03-19 12:51:25'),
(5, 'Customer didn\'t pick phone call', 'الزبون لم يختار مكالمة هاتفية', 2, '2021-06-03 12:48:47', '2021-06-03 12:48:47'),
(6, 'Long distance drop location', 'موقع إسقاط لمسافات طويلة', 2, '2021-06-03 12:49:51', '2021-06-03 12:49:51'),
(7, 'Bad location', 'موقع سيء', 2, '2021-06-03 12:50:48', '2021-06-03 12:50:48'),
(8, 'Some personal issues', 'بعض القضايا الشخصية', 2, '2021-06-03 12:51:28', '2021-06-03 12:51:28'),
(9, 'heavy traffic', NULL, 2, '2024-06-24 14:02:53', '2024-06-24 14:02:53'),
(10, 'changed the plan', 'غيرت الخطة', 1, '2024-07-25 13:33:30', '2025-01-31 17:26:48'),
(11, 'Not Ready for Pickup', 'غير جاهز للاستلام', 1, '2024-10-13 13:23:00', '2025-01-31 17:27:38');

-- --------------------------------------------------------

--
-- Table structure for table `cancellation_settings`
--

CREATE TABLE `cancellation_settings` (
  `id` int(11) NOT NULL,
  `no_of_free_cancellation` int(11) NOT NULL,
  `cancellation_charge` double NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `complaints`
--

CREATE TABLE `complaints` (
  `id` int(11) NOT NULL,
  `trip_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `driver_id` int(11) NOT NULL,
  `complaint_category` int(11) NOT NULL,
  `complaint_sub_category` int(11) NOT NULL,
  `subject` varchar(250) NOT NULL,
  `description` text DEFAULT NULL,
  `status` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `complaint_categories`
--

CREATE TABLE `complaint_categories` (
  `id` int(11) NOT NULL,
  `complaint_category_name` varchar(250) NOT NULL,
  `complaint_category_name_ar` varchar(250) DEFAULT NULL,
  `status` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `complaint_categories`
--

INSERT INTO `complaint_categories` (`id`, `complaint_category_name`, `complaint_category_name_ar`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Payment Related', NULL, 1, '2024-11-13 12:23:15', '2024-11-13 12:23:15'),
(2, 'Driver Related', NULL, 1, '2024-11-13 12:23:22', '2024-11-13 12:23:22'),
(3, 'Ride Related', NULL, 1, '2024-11-13 12:23:31', '2024-11-13 12:23:31'),
(4, 'Safety', NULL, 1, '2024-11-13 12:23:36', '2024-11-13 12:23:36');

-- --------------------------------------------------------

--
-- Table structure for table `complaint_sub_categories`
--

CREATE TABLE `complaint_sub_categories` (
  `id` int(11) NOT NULL,
  `complaint_category` int(11) NOT NULL,
  `complaint_sub_category_name` varchar(250) NOT NULL,
  `short_description` varchar(250) DEFAULT NULL,
  `complaint_sub_category_name_ar` varchar(250) DEFAULT NULL,
  `short_description_ar` varchar(250) DEFAULT NULL,
  `status` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `complaint_sub_categories`
--

INSERT INTO `complaint_sub_categories` (`id`, `complaint_category`, `complaint_sub_category_name`, `short_description`, `complaint_sub_category_name_ar`, `short_description_ar`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'I need a copy of my invoice', 'You need a copy of invoice  to send email address details. Please inform us.', NULL, NULL, 1, '2023-03-11 12:20:33', '2023-03-11 13:58:41'),
(2, 1, 'I have issues with recharging my Wallet Balance', 'After recharging your wallet account, we will try  to fetch your updated balance again when you are redirected to the app.After your wallet recharges, please recheck the status of your transaction and restart the app.', NULL, NULL, 1, '2023-03-11 12:21:22', '2023-03-11 13:20:54'),
(3, 1, 'I was not able to change the payment method during the ride', 'You are not allowed to change your payment method once the ride starts as we will block the ongoing ride amount in your wallet beforehand.', NULL, NULL, 1, '2023-03-11 12:21:55', '2023-03-11 13:24:27'),
(4, 1, 'I paid extra cash to my driver', 'Please inform what happened to your ride  details and clarify it.', NULL, NULL, 1, '2023-03-11 12:22:19', '2023-03-11 13:26:05'),
(5, 1, 'My ride fare is higher than  the estimated fare', 'Estimated fare range for your ride  fare may be higher than if you exceed the number of kilometers or number of hours. An additional kilometer fare before you confirm a booking.', NULL, NULL, 1, '2023-03-11 12:26:48', '2023-03-11 13:28:48'),
(6, 1, 'I was charged without taking a ride', 'Our customer do not share OTP with the driver until they have boarded the cab.', NULL, NULL, 1, '2023-03-11 12:27:08', '2023-03-11 13:29:59'),
(7, 1, 'I did not get my offer discount', 'If you applied a coupon and it\'s not showing in your invoice, please call us. Some offers might give you a discount on the next ride. Please refer to the terms&conditions  of the offers.', NULL, NULL, 1, '2023-03-11 12:27:26', '2023-03-11 13:32:11'),
(8, 1, 'I was charged toll/parking fee incorrectly', 'Please note that toll/parking charges if applicable on your ride are automatically added to your total ride fare. You can always check the invoice  sent on your registered email ID for toll/parking charges.', NULL, NULL, 1, '2023-03-11 12:28:02', '2023-03-11 13:34:23'),
(9, 1, 'My debit/credit card/UPI ID/ Wallet payment failed', 'When your payment fails through your selected payment method we request you to change your payment method and retry.', NULL, NULL, 1, '2023-03-11 12:28:35', '2023-03-11 13:35:42'),
(10, 1, 'I was charged twice on my credit card/debit card / UPI id/ Wallet', 'We are sorry for the trouble. we assure you that a refund will be initiated automatically and you will be receiving a communication for the same within 7 working days.', NULL, NULL, 1, '2023-03-11 12:29:18', '2023-03-11 13:37:24'),
(11, 1, 'I was not able to pay online for this ride', 'If you weren\'t able to pay during the ride, please ask your driver-Partner to check this app at the end of your trip. If the fare needs to be paid in cash, please pay the Driver-partner.', NULL, NULL, 1, '2023-03-11 12:29:39', '2023-03-11 13:39:18'),
(12, 2, 'My driver asked to cancel the ride and pay offline', 'We advise our customers to strictly take rides on the app to enjoy the benefits of the safety features provided while taking the ride. we are sorry for the inconvenience you had to face due to driver behaviour.', NULL, NULL, 1, '2023-03-11 12:30:10', '2023-03-11 13:41:13'),
(13, 2, 'My driver took a long or incorrect route', 'We advise our drivers to take the optimal route to the destination as suggested by google maps.', NULL, NULL, 1, '2023-03-11 12:30:33', '2023-03-11 13:42:03'),
(14, 2, 'My driver requested extra cash', 'In case the driver collected any extra cash for this ride, please inform us.', NULL, NULL, 1, '2023-03-11 12:30:55', '2023-03-11 13:42:52'),
(15, 2, 'My driver stopped the trip midway', 'We are always committed to offer you a safe, convenient and comfortable travel. we are very sorry to hear that your trip was not completed. Please call us.', NULL, NULL, 1, '2023-03-11 12:31:18', '2023-03-11 13:44:44'),
(16, 2, 'My driver was late for pickup', 'We are sorry  to hear that your pickup was delayed. Please let us details send it.', NULL, NULL, 1, '2023-03-11 12:31:53', '2023-03-11 13:45:44'),
(17, 2, 'A different driver came for pickup', 'Safety of all passengers is our priority .If the driver picking you up is different from the one allotted by for your ride,we request to let us know.', NULL, NULL, 1, '2023-03-11 12:32:14', '2023-03-11 13:47:04'),
(18, 2, 'I missed my flight/train', 'We regret for this inconvenience caused due to the cab delay in your trip. please send the details of your missed event and we will look into the issue.', NULL, NULL, 1, '2023-03-11 12:32:30', '2023-03-11 13:48:28'),
(19, 2, 'Other driver related issue?', 'We apologize for the inconvenience you had to face. Please send your feedback to take an approriate action against the driver.', NULL, NULL, 1, '2023-03-11 12:32:49', '2023-03-11 13:50:14'),
(20, 3, 'I had an issue with the cab quality', 'We instruct our driver partners to keep their cars clean, well maintained, and in excellent condition.If you feel that the cab quality wasn\'t upto your expectations, please let us know what went wrong.', NULL, NULL, 1, '2023-03-11 12:33:14', '2023-03-11 13:52:27'),
(21, 3, 'My vehicle broke down during the ride', 'We insist that our drive-partners keep the vehicles in optimum condition. We\'re really sorry that you had to face this inconvenience.', NULL, NULL, 1, '2023-03-11 12:33:34', '2023-03-11 13:53:31'),
(22, 3, 'I left a belonging in the vehicle', 'Sorry for the inconvenience caused. We request you to call the driver and arrange for a pickup of the belonging at a convenient location.', NULL, NULL, 1, '2023-03-11 12:33:57', '2023-03-11 13:54:38'),
(23, 4, 'I met  with an accident during the ride', 'We are very sorry to hear that you had to face such an unfortunate event. We hope that you are safe. Please call us for immediate assistance.', NULL, NULL, 1, '2023-03-11 12:34:39', '2023-03-11 13:56:00'),
(24, 4, 'I didn\'t feel safe during the ride', 'We are very sorry to hear that you felt unsafe during a trip. Your safety is of utmost importance to us and we can never compromise on that.', NULL, NULL, 1, '2023-03-11 12:35:34', '2023-03-11 13:57:18');

-- --------------------------------------------------------

--
-- Table structure for table `contact_settings`
--

CREATE TABLE `contact_settings` (
  `id` int(11) NOT NULL,
  `phone_number` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `address` text NOT NULL,
  `lat` varchar(250) NOT NULL,
  `lng` varchar(250) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contact_settings`
--

INSERT INTO `contact_settings` (`id`, `phone_number`, `email`, `address`, `lat`, `lng`, `created_at`, `updated_at`) VALUES
(1, '+21624978684', 'tunisianlahnina@gmail.com', 'Bardo tunisia', '9.8899873', '78.0818419', '2022-12-18 10:49:40', '2025-06-27 03:21:44');

-- --------------------------------------------------------

--
-- Table structure for table `corporate_agents`
--

CREATE TABLE `corporate_agents` (
  `id` int(11) NOT NULL,
  `corporate_customer_id` int(11) NOT NULL,
  `first_name` varchar(250) NOT NULL,
  `last_name` varchar(250) NOT NULL,
  `phone_number` varchar(250) NOT NULL,
  `phone_with_code` varchar(250) NOT NULL,
  `profile_picture` varchar(250) DEFAULT 'corporate_agents',
  `email` varchar(250) NOT NULL,
  `username` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `address` text NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `corporate_agents`
--

INSERT INTO `corporate_agents` (`id`, `corporate_customer_id`, `first_name`, `last_name`, `phone_number`, `phone_with_code`, `profile_picture`, `email`, `username`, `password`, `address`, `status`, `created_at`, `updated_at`) VALUES
(1, 2, 'Gayathri', 'k', '8765232211', '+918765232211', 'corporate_agents/1761301750.jpg', 'gayu@gmail.com', 'Gayu', '$2y$12$mUsVGaUZ/iisCC3qpuRQLOFnC9xLTpsYUJZFrbpyOYiYeagA0Wjnm', 'Madurai', 1, '2025-10-23 11:36:12', '2025-10-25 12:08:05'),
(2, 2, 'Karthick', 'S', '9223166721', '+2349223166721', 'corporate_agents/1761301274.jpg', 'karthick@gmail.com', 'karthick', '$2y$12$e31AcQb/DK72K6ZSp63Ci.TmfDANvlWGqfOQsbcG3wAkuI/lIRTWS', 'Madurai', 1, '2025-10-23 13:30:36', '2025-10-25 17:40:51'),
(3, 2, 'Yashika', 'k', '9437483434', '+919437483434', NULL, 'yashika@gmail.com', 'Yashika', '$2y$12$t8RJpy16zzr81C9SXVjYDu2SDJudFPaBPYXGU.FtigqFeaEYdHfYu', 'Madurai', 1, '2025-10-24 18:11:57', '2025-10-24 18:11:57'),
(4, 2, 'Aliya', 'S', '9232738278', '+919232738278', NULL, 'aliya@gmail.com', 'Aliya', '$2y$12$llENl4hoKBpWWwzqOZh7AeJaXOkGuXv0EpjiGwLrn03dkfT8Y/rF.', 'Madurai', 1, '2025-10-24 18:13:28', '2025-10-24 18:13:28'),
(5, 9, 'Pavi', 'S', '9265352532', '+919265352532', NULL, 'pavi@gmail.com', 'Pavi', '$2y$12$tiHB7x2UIBkOAtwE9X83EeZ2MBuWdkRtBVDhKo32LrSs2tPdaAGtq', 'Madurai', 1, '2025-10-25 11:02:30', '2025-10-25 11:02:30'),
(6, 10, 'Arunn', 'S', '9452432323', '+919452432323', 'corporate_agents/1761551279.jpg', 'arun3@gmail.com', 'arun', '$2y$12$J0tgxCzafcmEUjWcXGNdbuq6bi0c//2WcUAF.VJhgymTTZyOwS9ui', 'madurai', 1, '2025-10-27 12:41:09', '2025-10-27 13:18:02'),
(7, 12, 'Yuva', 'S', '9564552119', '+2349564552119', 'corporate_agents/1761635642.jpg', 'yuva@gmail.com', 'Yuva', '$2y$12$YKAqIFsblZF67PgSXWB9qe8iAb1AnmB7cJCPlP0xc376lLqOKdmJ2', 'Madurai', 1, '2025-10-28 10:37:11', '2025-12-05 10:57:32'),
(8, 15, 'Sakthi', 'S', '9273232323', '+919273232323', NULL, 'sakthi@gmail.com', 'Sakthi', '$2y$12$WxXFXD8MxXwki0nabJi4Y.aTPokoYcBcOC.cHDNbnm1RARDs8JWFe', 'Madurai', 1, '2025-11-03 12:40:38', '2025-11-03 12:40:38'),
(9, 1, 'Udhai', 'S', '9887553651', '+2549887553651', NULL, 'udhai@gmail.com', 'Udhai', '$2y$12$4AykFCK26bxYtq3JTAwFfeiOnRq3wRBOKJ3SeoWx063L4k0.xiw7W', 'Kenya', 1, '2026-01-30 17:31:25', '2026-01-30 17:31:25');

-- --------------------------------------------------------

--
-- Table structure for table `corporate_customers`
--

CREATE TABLE `corporate_customers` (
  `id` int(11) NOT NULL,
  `first_name` varchar(250) NOT NULL,
  `last_name` varchar(250) NOT NULL,
  `phone_number` varchar(250) NOT NULL,
  `phone_with_code` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `company_name` varchar(250) NOT NULL,
  `registration_number` varchar(250) DEFAULT NULL,
  `vat_number` double NOT NULL DEFAULT 0,
  `designation` varchar(250) NOT NULL,
  `address` text NOT NULL,
  `profile_picture` varchar(250) DEFAULT 'corporate_customers/avatar.png',
  `username` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `status` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `corporate_customers`
--

INSERT INTO `corporate_customers` (`id`, `first_name`, `last_name`, `phone_number`, `phone_with_code`, `email`, `company_name`, `registration_number`, `vat_number`, `designation`, `address`, `profile_picture`, `username`, `password`, `parent_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 'John', 'Deo', '9876543210', '+919876543210', 'john@gmail.com', 'TechAI Solutions pvt Ltd', 'REG-2025-009', 567, 'Manager', 'Chennai, Tamil Nadu', 'corporate_customers/1760686159.jpg', 'johndeo', '$2y$12$13HJd3gWRwyAxRsa7AvxNOheNMGNgET/.TFzmiwrZfGK./GTjU3NO', NULL, 1, '2025-10-14 16:24:52', '2026-02-03 17:58:14'),
(2, 'William', 'k', '9750023344', '+919750023344', 'haq@gmail.com', 'Hnm tech', '1234', 123, 'Manager', 'Madurai', 'corporate_customers/1760620868.jpg', 'William', '$2y$12$nTUcWDmDvtptFtJgkcxgh.aYvemZR0qNh8ptC3VpOhriIPRi7f93m', NULL, 1, '2025-10-15 10:15:25', '2025-10-27 14:14:46'),
(3, 'Gokul', 'S', '6445332761', '+916445332761', 'gokul@gmail.com', 'Menpani', NULL, 0, 'Manager', 'Madurai', 'corporate_customers/avatar.png', 'gokul', '$2y$10$oHtrmf96rXULmxER6nmm.OQ.G5NatOW6jHG7pYNJplbvS0vrQub2a', 0, 1, '2025-10-23 11:40:40', '2025-10-23 11:40:40'),
(4, 'peter', 'S', '6445332789', '+916445332789', 'peter@gmail.com', 'Menpani', NULL, 0, 'Manager', 'Madurai', 'corporate_customers/avatar.png', 'Peter', '$2y$10$8rtUtKKUcdJb17yu6hxCvOw.qBxZUaCOHwodmoILkAq7Hukmc8RaG', 0, 1, '2025-10-23 11:42:55', '2025-10-23 11:42:55'),
(5, 'Malar', 'S', '6445332700', '+916445332700', 'malar@gmail.com', 'Menpani', NULL, 0, 'Manager', 'Madurai', 'corporate_customers/avatar.png', 'Malar', '$2y$10$pg6dFnowMaMh02o4ozROB.puF1VOsTAbcrSg0GttHn3wv0OMRFJqG', 2, 1, '2025-10-23 11:43:45', '2025-10-23 11:43:45'),
(6, 'Alive', 'S', '9220013344', '+919220013344', 'alive@gmail.com', 'Menpani', NULL, 0, 'HR', 'Madurai', 'corporate_customers/avatar.png', 'Alive', '$2y$10$j5WtDmB139p6Tf8KItPNH.lKI4Qq3MffoG13hWHivIGqlW.t1TJKS', 2, 1, '2025-10-23 13:22:30', '2025-10-23 13:27:27'),
(7, 'Lakshmiii', 'M', '9335662199', '+2349335662199', 'lakshmi@gmail.com', 'Menpani', '123', 123, 'Hr', 'Madurai', 'corporate_customers/avatar.png', 'Lakshmi', '$2y$10$IioW1OIbEMCxvGQ41C9X4.gUpPqb.OhmwD6TBiiscm5EydRbIbo8S', 2, 1, '2025-10-23 13:29:38', '2025-10-24 14:21:53'),
(8, 'Thiru', 'K', '9242472434', '+919242472434', 'thiru@gmail.com', 'Menpani', NULL, 0, 'Hr', 'madurai', 'corporate_customers/avatar.png', 'Thiru', '$2y$10$JKp7x8UpwP6HEaodWS/MCOht0V23IPbW.y3xyZi7c1Ubt7Hkmo7.6', 2, 1, '2025-10-24 18:11:08', '2025-10-24 18:11:08'),
(9, 'Rayan', 'K', '986867782', '+234986867782', 'amc@gmail.com', 'AMC Tech', NULL, 0, 'Manager', 'Africa', 'corporate_customers//2a8d9c886a07fbd1c4584780c690c2fe.jpg', 'Rayan', '$2y$12$ScmEdneg2yhGPQKuZ3rUNup5ltDItN0EJszTmWa0h0SjGC0maoEB.', NULL, 1, '2025-10-25 11:00:04', '2025-10-25 11:00:04'),
(10, 'Umaya', 'S', '9765523345', '+2349765523345', 'abc@gmail.com', 'ABC TEch', '123', 123, 'Manager', 'Madurai', 'corporate_customers/1761549150.jpg', 'Umaya', '$2y$12$TkMANDefs5Yn4llst2qwSus2G2dNAYZQbE0b8petAhLGG/bBAP2fC', NULL, 1, '2025-10-27 12:37:46', '2025-10-27 12:43:06'),
(11, 'Ajay', 'S', '9836352132', '+919836352132', 'ajay@gmail.com', 'ABC', NULL, 0, 'HR', 'Madurai', 'corporate_customers/1761551392.jpg', 'Ajay', '$2y$10$e3o61fCM.AYt.U9ZEuFmmuYlfAslZeDUBqMxuQgq0ogP1LXGm1tCC', 10, 1, '2025-10-27 12:40:32', '2025-10-27 13:20:08'),
(12, 'Siva', 'S', '795 531783', '+254795531783', 'afc@gmail.com', 'AFC Tech', '123', 345, 'Manager', 'Madurai', 'corporate_customers/1761628099.jpg', 'Siva', '$2y$12$BWFCmsKqDxilvEJImHEOduQnqiq/YLbKAlKzbwRkWUbxhoJScLM0e', NULL, 1, '2025-10-28 10:32:37', '2026-01-30 18:34:37'),
(13, 'Prabha', 'S', '9346657722', '+2349346657722', 'prabha@gmail.com', 'MNC Tech', NULL, 0, 'Hr', 'Madurai', 'corporate_customers/avatar.png', 'Prabha', '$2y$10$4vYfEYMDIih4awgVLKDgsOXi0RhDvaz2lEVxL6tHeWfQJ/CjGrYcW', 12, 1, '2025-10-28 10:35:57', '2025-10-28 10:35:57'),
(14, 'Vickram', 'S', '9886752222', '+2349886752222', 'asg@gmail.com', 'ASG Tech', NULL, 0, 'Hr', 'Africa', 'corporate_customers//c103e9efd000937a75c2f3fbb901663d.jpg', 'Vickram', '$2y$12$FTahtwE1f3zdgGrNvPvxmOZnwi3TRn7inlB2qRU0PjV82ZoZJtlPC', NULL, 1, '2025-10-28 13:36:43', '2025-10-28 13:36:43'),
(15, 'Anitha', 'S', '8656656566', '+918656656566', 'mnctech@gmail.com', 'MNC Tech', '12345654', 1234, 'manager', 'madurai', 'corporate_customers/1762154369.jpg', 'Anitha', '$2y$12$lQ4NTmf0ufWV6LIgcciJE.2l2DoxPFQb.LcbcRN/kA/lpSBQUNEbm', NULL, 1, '2025-11-03 12:33:45', '2025-11-03 12:49:29'),
(16, 'Renu', 'S', '8316736131', '+918316736131', 'renu@gmail.com', 'MNC tech', NULL, 0, 'Hr', 'Madurai', 'corporate_customers/avatar.png', 'Renu', '$2y$10$GYYv4nRGvrCQ/PZYeQHDz./bVCHy6aELPBY3PORQ9Gi8FMItQzOLG', 15, 1, '2025-11-03 12:38:47', '2025-11-03 12:38:47'),
(17, 'Kiruthika', 'S', '9723726372', '+919723726372', 'kiruthika@gmail.com', 'Menpani', NULL, 0, 'Hr', 'Madurai', 'corporate_customers/avatar.png', 'Kiruthika', '$2y$10$M9YFj8wqmIobkCahkQBzS.iB9foHV.K6lR.clyNLFiH.Twls6EnTO', 12, 1, '2025-12-29 19:18:57', '2025-12-29 19:18:57'),
(18, 'Linen', 'S', '9666767323', '+919666767323', 'linen@gmail.com', 'AMC Tech', NULL, 0, 'Hr', 'Madurai', 'corporate_customers/avatar.png', 'Linen', '$2y$10$c2VExbL1mActKCQ/4gm.u.w6v36DJxvpHDi.7atX88q5/mH7qDroy', 17, 1, '2025-12-30 13:05:57', '2025-12-30 13:05:57'),
(19, 'test', 'test', '674345677', '+254674345677', 'test@gmail.com', 'AWS Tech', NULL, 0, 'Developer', 'Madurai', 'corporate_customers/avatar.png', 'test65', '$2y$10$GlcYkjWsy7TRLYHCbou9m.4rNcOcmeQlJKSyvRFjyggjdfN0CXVZ6', 12, 1, '2025-12-30 16:37:09', '2025-12-30 16:37:09'),
(20, 'Nagu', 'M N G', '9325455523', '91932545523', 'nagu@gmail.com', 'AFC Tech', NULL, 0, 'Administrator', 'Chennai', 'corporate_customers/avatar.png', 'nagu', '$2y$10$ERNVliWqivBdKuKJ/pV.4.QKliTKzM.gSHTAw3hJJ7Enf2H9F.3K6', 12, 1, '2026-01-26 11:25:41', '2026-01-26 11:25:41'),
(21, 'Swathi', 'K', '9443002311', '+919443002311', 'swathi@gmail.com', 'AFC Tech', NULL, 0, 'Administrator', 'Chennai', 'corporate_customers/avatar.png', 'swathi', '$2y$10$qlf01xZUc.CD7nBr3/6GpeWNFrpl8JlCHGQKRcg90Q4HiNaGY1sBS', 12, 1, '2026-01-26 11:26:23', '2026-01-26 11:26:23'),
(22, 'Deepa', 'S', '9776526312', '+919776526312', 'deepa@gmail.com', 'Menpani', NULL, 0, 'Hr', 'Chennai', 'corporate_customers/avatar.png', 'deepa', '$2y$10$d1fOUEFpBEFKZL9pbrjZs.BrHhadkdGfz3KXMqqGQqc2E2EjzqUVC', 12, 1, '2026-01-26 11:41:43', '2026-01-26 11:41:43'),
(23, 'Nagarani', 'M N G', '6383575669', '+916383575669', 'nagaranimng23@gmail.com', 'Menpani', '123', 0, 'Developer', 'Madurai', 'corporate_customers//7b7d121ebc61378eb24bcb36e961bf97.jpg', 'Nagarani', '$2y$12$rsXeEqoHmu/d0f9M6HSVL.BazUSnMmEz4MUAJ3SjaMwGSvUbQB3jW', NULL, 1, '2026-01-28 12:18:10', '2026-02-04 16:42:44'),
(24, 'Peter', 'S', '9765786278', '+2549765786278', 'peter@gmail.com', 'AFG tech', '179', 0, 'Hr', 'Kenya', 'corporate_customers//fbe499db3b45503b1cf26e33b72c16c7.jpg', 'Peter', '$2y$12$3HJaCHOE8v2jBOnRvfZc8.F887Ds7sbb7MpLm1cCe2zFkQ4usDbea', NULL, 1, '2026-01-30 16:40:49', '2026-01-30 16:40:49'),
(25, 'Varun', 'K', '9446623442', '+2349446623442', 'varun@gmail.com', 'AFC Tech', NULL, 0, 'Administrator', 'Chennai', 'corporate_customers/avatar.png', 'varun', '$2y$10$hAja6tGrfQYwV/U2chULLO.q7nCvMOKdHKp8zBzNeIUHTyrOkiTRe', 12, 1, '2026-02-04 14:27:48', '2026-02-04 14:27:48'),
(26, 'Sakthi', 'S', '9887546521', '+919887546523', 'sakthi@gmail.com', 'AFC Tech', NULL, 0, 'Administrator', 'Madurai', 'corporate_customers/avatar.png', 'sakthi', '$2y$10$3bqcs3bQQQflWPyq1Jwh2eN41bQqwj./wASO19gYy80paxQIksIte', 12, 1, '2026-02-04 15:25:13', '2026-02-04 15:25:13'),
(27, 'Sethu', 'S', '6445332799', '+916445332799', 'sethu@gmail.com', 'Menpani', NULL, 0, 'Manager', 'Madurai', 'corporate_customers/avatar.png', 'Sethu', '$2y$10$AaQw22ZLYJf/3K72AeK1lOB9JbtJu9iJbxVnBUhCrM5OHNf/bxwQO', 2, 1, '2026-02-04 15:40:59', '2026-02-04 15:40:59'),
(28, 'Isai', 'S', '6445332788', '+916445332788', 'isai@gmail.com', 'Menpani', NULL, 0, 'Manager', 'Madurai', 'corporate_customers/avatar.png', 'Isai', '$2y$10$/FfgWkDlV9fioAHA2RjCL./GhaECZ9ngA396/TyyP6VH3n8PropVy', 12, 1, '2026-02-04 15:43:21', '2026-02-04 15:43:21'),
(29, 'Meera', 'k', '7867347455', '+917867347455', 'meera@gmail.com', 'Menpani', NULL, 0, 'Manager', 'Madurai', 'corporate_customers/avatar.png', 'Meera', '$2y$10$srlUGml8jXHnKOFYGFbB7.67ShTOuBxiwLX.niNVz9ywch5iHeRbq', 12, 1, '2026-02-04 15:48:59', '2026-02-04 15:48:59'),
(30, 'Deeshal', 'S', '9454262637', '+919454262637', 'deeshal@gmail.com', 'AFC Tech', NULL, 0, 'Administrator', 'Madurai', 'corporate_customers/avatar.png', 'deeshal', '$2y$10$EUm3ETXUIV0JsEQXm//D1O013I8AOBgRidjYeAkbbpgfErWl5sOhy', 12, 1, '2026-02-04 15:51:03', '2026-02-04 15:51:03'),
(31, 'Mirunal', 'K', '9562326323', '+919562326323', 'mirunal@gmail.com', 'AFC Tech', NULL, 0, 'Administrator', 'Madurai', 'corporate_customers/avatar.png', 'mirunal', '$2y$10$pVFZiv4UacbxvbfEahduD.4sp5yYpy3lgBUQqto59kOnyVd.P5dPu', 12, 1, '2026-02-04 16:32:15', '2026-02-04 16:32:15');

-- --------------------------------------------------------

--
-- Table structure for table `corporate_customer_requests`
--

CREATE TABLE `corporate_customer_requests` (
  `id` int(11) NOT NULL,
  `first_name` varchar(250) NOT NULL,
  `last_name` varchar(250) NOT NULL,
  `phone_number` varchar(250) NOT NULL,
  `phone_with_code` varchar(250) NOT NULL,
  `company_email` varchar(250) NOT NULL,
  `company_name` varchar(300) NOT NULL,
  `designation` varchar(250) NOT NULL,
  `address` text NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `corporate_customer_requests`
--

INSERT INTO `corporate_customer_requests` (`id`, `first_name`, `last_name`, `phone_number`, `phone_with_code`, `company_email`, `company_name`, `designation`, `address`, `status`, `created_at`, `updated_at`) VALUES
(1, 'John', 'Deo', '9876543210', '+919876543210', 'john@gmail.com', 'ABC Technologies Pvt Ltd', 'HR Manager', 'No. 24, Anna Nagar, Chennai, Tamil Nadu', 2, '2025-10-14 16:22:49', '2025-10-14 16:56:07'),
(2, 'William', 'k', '9750023344', '+919750023344', 'haq@gmail.com', 'HAR Tech', 'Manager', 'Madurai', 2, '2025-10-15 10:12:28', '2025-10-15 10:15:35'),
(3, 'Rayan', 'K', '986867782', '+234986867782', 'amc@gmail.com', 'AMC Tech', 'Manager', 'Africa', 0, '2025-10-15 13:00:40', '2025-10-15 13:00:40'),
(4, 'Teena', 'K', '987276667', '+234987276667', 'mnc@gmail.com', 'MNC tech', 'Manager', 'Coimbatore', 0, '2025-10-15 14:29:00', '2025-10-15 14:29:00'),
(5, 'Tony', 'Stark', '6384628989', '+916384628989', 'conner@gmail.com', 'Stark Industries', 'CEO', 'New York,United States', 0, '2025-10-15 21:15:14', '2025-10-15 21:15:14'),
(6, 'steve', 'Roger', '7878787878', '+917878787878', 'steve@gmail.com', 'Steve Tech', 'CEO', 'Newyork', 0, '2025-10-16 18:14:33', '2025-10-16 18:14:33'),
(7, 'Dia', 'k', '9765540222', '+919765540222', 'amc@gmail.com', 'AMC Tech', 'Manager', 'Madurai', 0, '2025-10-16 18:33:41', '2025-10-16 18:33:41'),
(8, 'Jonadab', 'Emeribe', '903225675', '+234903225675', 'jonadabbanks@gmail.com', 'Nigeria', 'ICT OFFICER', 'No 1 Ezelane', 0, '2025-10-17 03:57:03', '2025-10-17 03:57:03'),
(9, 'Umaya', 'S', '9765523345', '+2349765523345', 'abc@gmail.com', 'ABC TEch', 'Manager', 'Madurai', 2, '2025-10-27 12:36:18', '2025-10-27 12:37:57'),
(10, 'Siva', 'S', '9786662323', '+2349786662323', 'afc@gmail.com', 'AFC Tech', 'Manager', 'Madurai', 2, '2025-10-28 10:30:59', '2025-10-28 10:37:49'),
(11, 'Vickram', 'S', '9886752222', '+2349886752222', 'asg@gmail.com', 'ASG Tech', 'Hr', 'Africa', 2, '2025-10-28 13:35:24', '2025-10-28 13:36:56'),
(12, 'Anitha', 'S', '8656656566', '+918656656566', 'mnctech@gmail.com', 'MNC Tech', 'manager', 'madurai', 2, '2025-11-03 12:31:22', '2025-11-03 12:34:24'),
(13, 'Chigozie', 'Emeribe', '098765987', '+234098765987', 'jonadabemeribe@gmail.com', 'Airbag construction company limited', 'ICT OFFICER', 'Rivers State', 0, '2025-12-11 12:57:08', '2025-12-11 12:57:08'),
(14, 'Bethel', 'S', '7652434232', '+2347652434232', 'az@gmail.com', 'AZ Tech', 'manager', 'Kenya', 0, '2026-02-03 16:22:55', '2026-02-03 16:22:55'),
(15, 'Sanju', 'M', '9875362552', '+2549875362552', 'azf@gmail.com', 'AZF Tech', 'Hr', 'kenya', 0, '2026-02-06 05:55:50', '2026-02-06 05:55:50');

-- --------------------------------------------------------

--
-- Table structure for table `corporate_tutorials`
--

CREATE TABLE `corporate_tutorials` (
  `id` int(11) NOT NULL,
  `title` varchar(250) NOT NULL,
  `image` varchar(250) NOT NULL,
  `short_description` text NOT NULL,
  `long_description` text NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `corporate_tutorials`
--

INSERT INTO `corporate_tutorials` (`id`, `title`, `image`, `short_description`, `long_description`, `status`, `created_at`, `updated_at`) VALUES
(1, 'How I became a Vendor', 'images/d7f5c96cd7f0c62e6199548fc052eca8.jpg', 'Learn the process of becoming a certified vendor on our platform', 'Learn the process of becoming a certified vendor on our platform', 1, '2025-10-16 11:45:08', '2025-10-16 11:45:08');

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` int(11) NOT NULL,
  `phone_code` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `country_name` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` int(11) NOT NULL,
  `short_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `country_name_ar` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `short_name_ar` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `timezone` varchar(250) DEFAULT NULL,
  `capital_lat` varchar(250) NOT NULL,
  `capital_lng` varchar(250) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `first_name` varchar(250) NOT NULL,
  `last_name` varchar(250) DEFAULT NULL,
  `country_code` varchar(10) NOT NULL,
  `phone_number` varchar(250) NOT NULL,
  `phone_with_code` varchar(100) NOT NULL,
  `email` varchar(250) DEFAULT NULL,
  `email_verification_status` int(11) NOT NULL DEFAULT 0,
  `email_verification_code` varchar(250) DEFAULT NULL,
  `profile_picture` varchar(250) DEFAULT 'customers/avatar.png',
  `password` varchar(250) DEFAULT NULL,
  `fcm_token` text DEFAULT NULL,
  `status` int(11) NOT NULL,
  `wallet` double DEFAULT 0,
  `gender` int(11) DEFAULT 0,
  `referral_code` varchar(100) DEFAULT NULL,
  `overall_ratings` double NOT NULL DEFAULT 0,
  `no_of_ratings` int(11) NOT NULL DEFAULT 0,
  `refered_by` varchar(100) DEFAULT NULL,
  `current_sub_id` int(11) NOT NULL DEFAULT 0,
  `subscription_trips` int(11) NOT NULL DEFAULT 0,
  `sub_purchased_at` date DEFAULT NULL,
  `sub_expired_at` date DEFAULT NULL,
  `is_deleted` int(11) NOT NULL DEFAULT 0,
  `corporate_customer_id` int(11) DEFAULT 0,
  `group_id` int(11) DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `first_name`, `last_name`, `country_code`, `phone_number`, `phone_with_code`, `email`, `email_verification_status`, `email_verification_code`, `profile_picture`, `password`, `fcm_token`, `status`, `wallet`, `gender`, `referral_code`, `overall_ratings`, `no_of_ratings`, `refered_by`, `current_sub_id`, `subscription_trips`, `sub_purchased_at`, `sub_expired_at`, `is_deleted`, `corporate_customer_id`, `group_id`, `created_at`, `updated_at`) VALUES
(1, 'Harold', 'Finch', '+91', '6384628981', '+916384628981', 'Harold@gmail.com', 0, NULL, 'customers/1761552433.png', '$2y$12$tOLN9eGGBeSqnrCzlSJKyuL05rMM/h8WmL5fa.yEwFanGsNXPyRMe', 'ePof5OJ-TOGwRH0MLEkjou:APA91bFXerCzwuMFK_ekPAeuHrmPGZd_ll_NR0k-30rJ0gAbMRGg2knxX7vQ9uVfQdxCCAE4tyP72MOugmhDvKqaf5lI7jwnCoqc6tvcWk7WMwHpjjoQpj4', 1, 82265.21, 1, 'CUS00001', 0, 0, NULL, 0, 0, NULL, NULL, 0, NULL, 0, '2025-10-06 11:42:29', '2026-02-05 11:49:44'),
(2, 'Jonadab', 'Emeribe', '+234', '9032253277', '+254795531783', 'chigsbanks@gmail.com', 0, NULL, 'customers/avatar.png', '$2y$12$RDs9HMyz5wj3GZ4xGAT8BOUfSVwHGdkjCUV6PwF7zLtsgtKu3OOdy', 'fzSSMmYCR2y2_sg_lvBtjj:APA91bFMvnsOH4nmohYyPyx_s-NI6BjSjBLMhHD7_rEGuNn5StwhISdZ6IekIzkCbf2jYrczfq-5ugvhFZfhfDkTlyz90z0jbxOKucTZ4D-d3ja_8xbxMGo', 1, 0, 0, 'CUS00002', 0, 0, NULL, 0, 0, NULL, NULL, 0, 0, 0, '2025-10-07 13:30:49', '2025-10-07 13:30:51'),
(3, 'Karthick', 'S', '+91', '9750023355', '+919750023355', 'karthick@gmail.com', 0, NULL, 'customers/avatar.png', '$2y$12$ei7CNhqq8/OE6sYs7ozTsujLiTwUvPCqc8.WCxsoc5QEtEULhxSMm', 'erQisefsRIaPL_ePknAmua:APA91bEaICklnneTUSLUoS6ZXnvIrxCQz-Uek5ffliRQE5Ua6ZMaxE1j2Cmj5XzmizYNU42ikmyldC38nvoiu-PTtLU3-nwj8yq9H-0-dKhDXtWW01h8Alo', 1, 0, 0, 'CUS00003', 0, 0, NULL, 0, 0, NULL, NULL, 0, 0, 0, '2025-10-13 16:35:47', '2026-01-01 16:28:33'),
(4, 'Varshini', 'R', '+91', '9120694111', '9120694111', 'varshini@example.com', 0, NULL, 'customers/avatar.png', '$2y$12$uWn6SKGqaKo..b4E3ZWVo.PuVrAktDnOVzMxfbh0E12Eh6cGCQxsG', 'some_fcm_token_here', 1, 0, 0, 'CUS00004', 0, 0, NULL, 0, 0, NULL, NULL, 0, 1, 0, '2025-10-17 18:28:35', '2025-10-17 18:28:36'),
(5, 'Rahul Sharma', NULL, '+91', '+919876543210', '+919876543210', NULL, 0, NULL, 'customers/avatar.png', NULL, NULL, 1, 0, 0, NULL, 0, 0, NULL, 0, 0, NULL, NULL, 0, 0, 0, '2025-10-17 18:44:33', '2025-10-17 18:44:33'),
(6, 'Chigozie', 'Emeribe', '+234', '8122198820', '+2348122198820', 'jonadabemeribe@gmail.com', 0, NULL, 'customers/1760775272.png', '$2y$12$.hmkNYuxJBPyKXyzEH1Sve1h91Ch2LOQjwBIkrGk4tWzH4eiyddrK', 'dKpS3duzTB-PJL5u_kaTIF:APA91bEVfNz4v67oRK18CoRVb9pCYD8QlZ1PuNMgISriR-8xJJMs950EosT2fvUR-LAiGbkj9nnk9oQOdCXrvI1Difdhxy55VDbVF9bgWb0SyRDMEb5mAic', 1, 0, 0, 'CUS00006', 0, 0, NULL, 0, 0, NULL, NULL, 0, 0, 0, '2025-10-18 13:43:03', '2025-10-18 13:44:33'),
(7, 'Saran', 'k', '+91', '7867347433', '+917867347433', 'saran@gmail.com', 0, NULL, 'customers/avatar.png', '$2y$12$f7gzJcOQ35Yts0efF5rdV.2aps4.RXp/agqmE434o.Ga6DCodkpSS', 'dLibBj4gS324uDFcKIqdrK:APA91bFBVzbjwxlb2F_MyTwdZNxLJtfcjPnU-0zoP2kJgiJzNnuU-zJOL9As_KtHkACbF1N33Kvj9l3nHoeH9TvvmamBgOVwGwCKrkEwqKuCMsiwIPuUqlA', 1, 0, 0, 'CUS00007', 0, 0, NULL, 0, 0, NULL, NULL, 0, 0, 0, '2025-10-22 10:45:09', '2025-10-27 11:06:06'),
(8, 'Swetha', 'k', '+91', '7867347400', '+917867347400', 'swetha@gmail.com', 0, NULL, 'customers/avatar.png', '$2y$12$UaWOmcFuEjD0Lk6WaDZ5cutwZTzqO.yGVgaLDl7x2Zdabp5HhJ8lu', '123456', 1, 0, 0, 'CUS00008', 0, 0, NULL, 0, 0, NULL, NULL, 0, 2, 0, '2025-10-22 10:50:47', '2025-10-22 10:50:48'),
(9, 'Revathi', 'k', '+91', '7867347411', '+917867347411', 'revathi@gmail.com', 0, NULL, 'customers/avatar.png', '$2y$12$GlZ3tjEL7hq7Tb1zBFec/eTndvL/woV7F6Eo5oPLpvNLLBDsM6R.m', '123456', 1, 0, 0, 'CUS00009', 0, 0, NULL, 0, 0, NULL, NULL, 0, 2, 0, '2025-10-22 10:59:58', '2025-10-22 11:00:00'),
(10, 'Ria', 'k', '+91', '7867347499', '+917867347499', 'ria@gmail.com', 0, NULL, 'customers/avatar.png', '$2y$12$bt3hpHNIggDQz3kdI0S6JO7prt8VSSnncTxGmWP6LKi5r8L96u0WG', '123456', 1, 0, 0, 'CUS00010', 0, 0, NULL, 0, 0, NULL, NULL, 0, 2, 2, '2025-10-22 11:05:13', '2025-10-22 11:05:15'),
(11, 'Ramya', NULL, '+91', '+919876543111', '+919876543111', NULL, 0, NULL, 'customers/avatar.png', NULL, NULL, 1, 0, 0, NULL, 0, 0, NULL, 0, 0, NULL, NULL, 0, 1, 0, '2025-10-22 11:23:35', '2025-10-22 11:23:35'),
(12, 'Rahul', NULL, '+91', '+919876578960', '+919876578960', NULL, 0, NULL, 'customers/avatar.png', NULL, NULL, 1, 0, 0, NULL, 0, 0, NULL, 0, 0, NULL, NULL, 0, 1, 0, '2025-10-22 11:26:49', '2025-10-22 11:26:49'),
(13, 'meera', NULL, '+91', '+918876543111', '+918876543111', NULL, 0, NULL, 'customers/avatar.png', NULL, NULL, 1, 0, 0, NULL, 0, 0, NULL, 0, 0, NULL, NULL, 0, 2, 0, '2025-10-22 11:38:58', '2025-10-22 11:38:58'),
(14, 'Radhi', 'R', '+91', '+919876578989', '+919876578989', 'radhi@gmail.com', 0, NULL, 'customers/avatar.png', '$2y$12$DCPRt7J4gT2LM9a4CwW64uWMwNflGipXm09QbeexFCGVSjweQqPDy', NULL, 1, 0, 2, NULL, 0, 0, NULL, 0, 0, NULL, NULL, 0, 1, 2, '2025-10-22 11:41:19', '2025-10-23 10:59:09'),
(15, 'Rithika', 's', '+237', '23798777778881', '+23723798777778881', 'rithika@gmail.com', 0, NULL, 'customers/avatar.png', '$2y$12$DqmsQMJzHXPxTd/8V70Q.eT8mzJ6LEaTSl3E9lGMP/NOMaDOLMciG', '123456', 1, 0, 0, 'CUS00015', 0, 0, NULL, 0, 0, NULL, NULL, 0, 2, 1, '2025-10-22 12:54:48', '2025-10-22 12:54:49'),
(16, 'Dia', 's', '+91', '9740089972', '+919740089972', 'dia@gmail.com', 0, NULL, 'customers/avatar.png', '$2y$12$gOdruvymznHOFnf79syyWuIvaRUkL8AFIm1B/0hrXQ.yo8TqYpQJS', 'cCChbh9hQ1-5LCV7VR07Sz:APA91bGUdul3Ub4fSRRiu2imCOHke-EKEN57N2jKsuGKGxSH2Em8F54mdjzDisjbBOpPVV6uswzegIhHToSX7XzkDeXWZWAdKhtlfvuYn6KGMvcVSpw0qWs', 1, 0, 0, 'CUS00016', 0, 0, NULL, 0, 0, NULL, NULL, 0, 2, 2, '2025-10-22 13:04:15', '2025-10-27 14:03:16'),
(17, 'Priyadharshini', 's', '+237', '9666666662', '+2379666666662', 'priya@gmail.com', 0, NULL, 'customers/avatar.png', '$2y$12$47CV1fwQZW/pPNPKRxGS4OsVmDmgBzvp8nclvTAzW0qEUx9/x7UIC', '123456', 1, 0, 0, 'CUS00017', 0, 0, NULL, 0, 0, NULL, NULL, 0, 2, 1, '2025-10-22 13:05:51', '2025-10-22 13:05:52'),
(18, 'Dharshini', 's', '+27', '9888888883', '+279888888883', 'dharshini@gmail.com', 0, NULL, 'customers/avatar.png', '$2y$12$PhrOp2ois2H9VMfUxMCqcuNX6.9xABu/a0Yxcl1N3.eiMD4saTl..', '123456', 1, 0, 0, 'CUS00018', 0, 0, NULL, 0, 0, NULL, NULL, 0, 2, 3, '2025-10-22 14:51:51', '2025-10-22 16:53:31'),
(19, 'Bethel', 'Emeribe', '+254', '795531783', '+254795531783', 'ebethel058@gmail.com', 0, NULL, 'customers/avatar.png', '$2y$12$86pcupwauOgcjj9gxeRkTu46.rfo6h1QFq41yRYz9GaZ82QVxDBZu', 'fYC6SqLuS9adG_Tq-ojrcR:APA91bHOdEsDfHNJ-ob-wI1F6JnsMmkXfUHMkTjHkCAT7BsNDwdTcktbBWGMJYcG01SVYMe_wKFUylTWvK2-nf02dMz98O78XS0dFvj1gvpSlbLZ81MfL5s', 1, 0, 0, 'CUS00019', 0, 0, NULL, 0, 0, NULL, NULL, 0, 0, 0, '2025-10-22 15:02:28', '2025-12-08 19:12:51'),
(20, 'Rithika', 'S', '+91', '+919750023388', '+919750023388', 'rithka@gmail.com', 0, NULL, 'customers/avatar.png', '$2y$12$YlDWLPxwrva6i4UrKPSy3uZ7UE7liRvBrt8EFJEbveEnIMujshnPy', 'cDvKuojuTveuZhy8QNkfGC:APA91bEo4JRa8pCrC0ISxg6v5N2imj4thO4T1LZHUer1FGvMXxZdn38ZtLSM4QkSn4753pHJj309lXTL2VcuAK_6k6iv1YCOWGPv9dZx6-UKDqgAEquV06A', 1, 0, 2, NULL, 0, 0, NULL, 0, 0, NULL, NULL, 0, 2, 1, '2025-10-22 18:34:45', '2025-10-27 11:46:49'),
(21, 'Divya', 'k', '+91', '+919777233343', '+919777233343', 'divya@gmail.com', 0, NULL, 'customers/avatar.png', '$2y$12$SIuKjXlmG2TKJmccVWw3O.tc0mtBAq00DXK9J2TBtkXko2dvdHxFu', NULL, 1, 0, 1, NULL, 0, 0, NULL, 0, 0, NULL, NULL, 0, 2, 1, '2025-10-23 10:30:33', '2025-10-23 10:46:14'),
(22, 'Yamini', 'K', '+234', '9767677882', '+2349767677882', 'yamini@gmail.com', 0, NULL, 'customers/avatar.png', '$2y$12$uRbMdyV1sKKjiqNgFp9gpODgMonznB5pZ3LC2xOOJARZg1R3pBBa2', '123456', 1, 0, 0, 'CUS00022', 0, 0, NULL, 0, 0, NULL, NULL, 0, 2, 2, '2025-10-23 13:28:20', '2025-10-23 13:28:21'),
(23, 'saranya', 'S', '+234', '8273723277', '+2348273723277', 'saranya@gmail.com', 0, NULL, 'customers/avatar.png', '$2y$12$I1a20JxObZntNr/wVlFXzuLOBs/u3BsB88vO3cspp0GrSmf8suahi', '123456', 1, 0, 0, 'CUS00023', 0, 0, NULL, 0, 0, NULL, NULL, 0, 2, 3, '2025-10-24 11:13:59', '2025-10-24 11:14:01'),
(24, 'Thiru', 'K', '+91', '9272747434', '+919272747434', 'thiru@gmail.com', 0, NULL, 'customers/avatar.png', '$2y$12$ZAvBfNbuD8x7m6SCR3wl4edAHiiWlaonnfPIAPZsrMIbldGb64uJi', 'dLibBj4gS324uDFcKIqdrK:APA91bFBVzbjwxlb2F_MyTwdZNxLJtfcjPnU-0zoP2kJgiJzNnuU-zJOL9As_KtHkACbF1N33Kvj9l3nHoeH9TvvmamBgOVwGwCKrkEwqKuCMsiwIPuUqlA', 1, 0, 0, 'CUS00024', 0, 0, NULL, 0, 0, NULL, NULL, 0, 2, 3, '2025-10-24 18:10:22', '2025-10-27 11:01:12'),
(25, 'Kavi', 'S', '+234', '9887665442', '+2349887665442', 'kavi@gmail.com', 0, NULL, 'customers/avatar.png', '$2y$12$9GReGgZmLwkZ0m5SseTVL.3gRlCwSBez8RyweSJvQ7w2SfUs9o6nu', '123456', 1, 0, 2, 'CUS00025', 0, 0, NULL, 0, 0, NULL, NULL, 0, 2, 5, '2025-10-25 11:51:22', '2025-10-27 11:40:08'),
(26, 'Sai', 'S', '+91', '9760023355', '+919760023355', 'sai@gmail.com', 0, NULL, 'customers/avatar.png', '$2y$12$lAQvON5YIzccuQT/BrIrpeiBseMvFuUaT8JuY.AmMbAzsTTAry6kq', 'cDvKuojuTveuZhy8QNkfGC:APA91bEo4JRa8pCrC0ISxg6v5N2imj4thO4T1LZHUer1FGvMXxZdn38ZtLSM4QkSn4753pHJj309lXTL2VcuAK_6k6iv1YCOWGPv9dZx6-UKDqgAEquV06A', 1, 0, 0, 'CUS00026', 0, 0, NULL, 0, 0, NULL, NULL, 0, 0, 0, '2025-10-27 11:16:34', '2025-10-27 11:16:36'),
(27, 'Kalaiselvi', 'K', '+91', '8736363434', '+918736363434', 'kalaiselvi@gmail.com', 0, NULL, 'customers/avatar.png', '$2y$12$6LptZjPUXVAtK.SOZ3fXheFbKdUqlmgqEBCjQBG106tXLEemPi5Bi', '123456', 1, 0, 0, 'CUS00027', 0, 0, NULL, 0, 0, NULL, NULL, 0, 10, 1, '2025-10-27 12:39:36', '2025-10-27 12:39:38'),
(28, 'Selvi', 'S', '+91', '9236323232', '+919236323232', 'selvi@gmail.com', 0, NULL, 'customers/avatar.png', '$2y$12$81ZSzBK5E7ytJckCJPeoIu/P7q0odu2WqitWBZHLusPgvmqq4dK/y', 'cDvKuojuTveuZhy8QNkfGC:APA91bEo4JRa8pCrC0ISxg6v5N2imj4thO4T1LZHUer1FGvMXxZdn38ZtLSM4QkSn4753pHJj309lXTL2VcuAK_6k6iv1YCOWGPv9dZx6-UKDqgAEquV06A', 1, 0, 0, 'CUS00028', 0, 0, NULL, 0, 0, NULL, NULL, 0, 2, 1, '2025-10-27 14:14:24', '2025-10-27 15:37:43'),
(31, 'Geetha', 'S', '+91', '9754223232', '+919754223232', 'geetha@gmail.com', 0, NULL, 'customers/avatar.png', '$2y$12$5vERkmwBRkJybdv3zPsmueAcJSvzC9SPHXCsE94XnreJC4N9wplGm', 'e1GX9naaTKmFj5m1qPq5Pq:APA91bHLqmrg8kUAw7AsCmLf5H-dBNsRZiGnUVU5ninNwPj-VEnisAtHiOz6YvdfvK-Ppyg7aMtnAal4rHpQODlYr03R1lXoR6_xj5CoKeWWtLY1kNa1_xE', 1, 0, 0, 'CUS00031', 0, 0, NULL, 0, 0, NULL, NULL, 0, 15, 7, '2025-11-03 12:37:58', '2025-11-03 13:21:17'),
(32, 'Jonadab', 'Emeribe', '+254', '708426620', '+254708426620', 'Testing@gmail.com', 0, NULL, 'customers/1765171387.png', '$2y$12$a6qYq8IsUP3pyPFQokEm/uPtemZ/pVRG3cAdkEuBdseaLknbVVA8u', 'dM3j4RCjRuqZq2OsGp92ad:APA91bFUwSd9ve9gQNjX-0KzXDXLr6jD45vXuGw3feL8fumRIDrwVlsfWHzAG3zPLpID9RfLEE7WtYhBMj4wqz1Of9py7T_QVezvq48S6ifhHw8ApxSruXs', 1, 0, 0, 'CUS00032', 0, 0, NULL, 0, 0, NULL, NULL, 0, 0, 0, '2025-12-03 10:27:48', '2025-12-08 10:53:08'),
(33, 'Paul', 'Mark', '+234', '9035224400', '+2349035224400', 'Testingd@gmail.com', 0, NULL, 'customers/1765893093.png', '$2y$12$NMTJYCjZy1uwz2pQ96F/f.Hw2QnEBGTddodD2PN8FDhA1ehFAwkGC', 'd39dfAeLSl2HiY0S2Danu2:APA91bHAR3oKy6532bSYR3Vpeh6FoiDGrpCvm5wBZcawKHZXdcTWO72LEZ7dnmlloP4SoJei_y0_33xxIkieCcXzeIeEeOXr4ZlpW2UFOakkyRHOp6OF-dc', 1, 0, 0, 'CUS00033', 0, 0, NULL, 0, 0, NULL, NULL, 0, 0, 0, '2025-12-16 19:06:31', '2025-12-16 19:21:35'),
(35, 'Vel', 'S', '+91', '9465233232', '+919465233232', 'vel@gmail.com', 0, NULL, 'customers/avatar.png', '$2y$12$YACJst4697UUPoSn91h75uBN0.wVpHinARfF3mXUryS6CU1eBkMia', '123456', 1, 0, 0, 'CUS00035', 0, 0, NULL, 0, 0, NULL, NULL, 0, 17, 13, '2025-12-30 13:12:53', '2025-12-30 13:12:54'),
(40, 'Nagarani', 'M N G', '+91', '6383575669', '+916383575669', 'nagarani@gmail.com', 0, NULL, 'customers/avatar.png', '$2y$12$upqCHPi8s3vuaDBTCX/92eZ3y4MBC81dodBldcpKpY3UhP/AL4SlG', 'ekNV9xqnR_2YpeIK2lsNha:APA91bHRHAtVyDtaJdZyeX-TC9VmIz6Qa0ab4w17JAYafkZNqosB6ajqXM27ye4M1z81Ba31wKiTAOKlCC2H_1_Y7lgvTxpNp7cqeFriwQ9IdadFQpk4mVc', 1, 0, 0, 'CUS00040', 0, 0, NULL, 0, 0, NULL, NULL, 0, 0, 0, '2026-01-28 17:48:16', '2026-02-05 10:49:26'),
(41, 'Swathi', 'K', '+91', '8870605176', '+918870605176', 'swathi@gmail.com', 0, NULL, 'customers/avatar.png', '$2y$12$SoCXoHblBewRz1ckrVxFr.E6l5smbKeDH.Kdzoi3MJ8v0zhMSGxjy', '123456', 1, 0, 0, 'CUS00041', 0, 0, NULL, 0, 0, NULL, NULL, 0, 0, 0, '2026-01-28 18:08:41', '2026-01-28 18:08:43'),
(42, 'jegan', NULL, '+234', '6384628982', '+2346384628982', NULL, 0, NULL, 'customers/avatar.png', NULL, NULL, 1, 0, 0, NULL, 0, 0, NULL, 0, 0, NULL, NULL, 0, 0, 0, '2026-02-02 15:43:10', '2026-02-02 15:43:10'),
(44, 'Sivam', 'k', '+91', '7867347477', '+917867347477', 'sivam@gmail.com', 0, NULL, 'customers/avatar.png', '$2y$12$dakg3PmZT57ZN6lnHXdVQ.UQOWd/L/ukPDixPHG1tKYCIjqCyl.sy', '123456', 1, 0, 0, 'CUS00044', 0, 0, NULL, 0, 0, NULL, NULL, 0, 2, 2, '2026-02-04 15:42:03', '2026-02-04 15:42:04'),
(45, 'Meera', 'k', '+91', '7867347455', '+917867347455', 'meera@gmail.com', 0, NULL, 'customers/avatar.png', '$2y$12$8vCIOKgoJ.3gBxyKhnWk9.GVWGeVlqfVJE/NaUKfYOVLc9L.8aIlK', '123456', 1, 0, 0, 'CUS00045', 0, 0, NULL, 0, 0, NULL, NULL, 0, 12, 2, '2026-02-04 15:47:39', '2026-02-04 15:47:41'),
(47, 'Mirunal', 'K', '+91', '9562326323', '+919562326323', 'mirunal@gmail.com', 0, NULL, 'customers/avatar.png', '$2y$12$4SQhyeH.Dt3RKTBIstFxDub6bCOr9yqAlIrl7OsFhaU9Vp9YhAkbC', '123456', 1, 0, 0, 'CUS00047', 0, 0, NULL, 0, 0, NULL, NULL, 0, 12, 21, '2026-02-04 16:31:57', '2026-02-04 16:31:59'),
(48, 'Hazi', 'S', '+91', '9994066435', '+919994066435', 'hazi@gmail.com', 0, NULL, 'customers/avatar.png', '$2y$12$lSNsjt4cxytmPwKgKahAnex9ZfKObof09RuZwyMAwsFASFMw7Pdwq', 'fFkXQQLkQ4ix01aG4w7gHL:APA91bGL47Kyt2bEc_aLr4reJFpZJARbiutNUH4_bHEb4fxWAATknlm5Bx3TTvpESpz6EP2-U7F_8rTTNI1GqW_iG4ar7dOpzbbxyMfAeHP03-Feu7uPD5s', 1, 0, 0, 'CUS00048', 0, 0, NULL, 0, 0, NULL, NULL, 0, 0, 0, '2026-02-04 17:28:02', '2026-02-04 17:28:03');

-- --------------------------------------------------------

--
-- Table structure for table `customer_chat_messages`
--

CREATE TABLE `customer_chat_messages` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `receiver` int(11) NOT NULL,
  `message` longtext NOT NULL,
  `is_seen` int(11) NOT NULL DEFAULT 0,
  `file` varchar(191) DEFAULT NULL,
  `file_name` varchar(191) DEFAULT NULL,
  `is_admin` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customer_chat_messages`
--

INSERT INTO `customer_chat_messages` (`id`, `user_id`, `receiver`, `message`, `is_seen`, `file`, `file_name`, `is_admin`, `created_at`, `updated_at`) VALUES
(1, 1, 35, 'hi', 0, NULL, NULL, 1, '2026-01-27 11:21:27', '2026-01-27 11:21:27');

-- --------------------------------------------------------

--
-- Table structure for table `customer_favourites`
--

CREATE TABLE `customer_favourites` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `address` varchar(250) NOT NULL,
  `lat` varchar(250) NOT NULL,
  `lng` varchar(250) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customer_offers`
--

CREATE TABLE `customer_offers` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL DEFAULT 0,
  `title` varchar(250) NOT NULL,
  `image` varchar(500) NOT NULL,
  `description` text NOT NULL,
  `view_status` int(11) NOT NULL DEFAULT 0,
  `type` int(11) NOT NULL,
  `ref_id` int(11) NOT NULL DEFAULT 0,
  `title_ar` varchar(150) DEFAULT NULL,
  `description_ar` varchar(250) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customer_promo_histories`
--

CREATE TABLE `customer_promo_histories` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `corporate_customer_id` int(11) DEFAULT NULL,
  `promo_id` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customer_sos_contacts`
--

CREATE TABLE `customer_sos_contacts` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `phone_number` varchar(250) NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer_sos_contacts`
--

INSERT INTO `customer_sos_contacts` (`id`, `customer_id`, `name`, `phone_number`, `status`, `created_at`, `updated_at`) VALUES
(1, 2, 'Test', '0903253277', 1, '2025-10-17 03:40:25', '2025-10-17 03:40:25'),
(2, 33, 'Test', '10855866986', 1, '2025-12-17 14:04:20', '2025-12-17 14:04:20');

-- --------------------------------------------------------

--
-- Table structure for table `customer_subscription_histories`
--

CREATE TABLE `customer_subscription_histories` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `sub_id` int(11) NOT NULL DEFAULT 0,
  `purchased_at` date NOT NULL,
  `expiry_at` date NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customer_wallet_histories`
--

CREATE TABLE `customer_wallet_histories` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `message` varchar(250) NOT NULL,
  `message_ar` varchar(150) DEFAULT NULL,
  `amount` double NOT NULL,
  `transaction_type` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customer_wallet_histories`
--

INSERT INTO `customer_wallet_histories` (`id`, `customer_id`, `type`, `message`, `message_ar`, `amount`, `transaction_type`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'Added to wallet', 'يا إى المحفظة', 0, 1, '2026-01-31 13:02:33', '2026-01-31 13:02:33'),
(2, 1, 1, 'Added to wallet', 'يا إى المحفظة', 0, 1, '2026-01-31 13:05:28', '2026-01-31 13:05:28'),
(3, 1, 1, 'Added to wallet', 'يا إى المحفظة', 0, 1, '2026-01-31 13:06:43', '2026-01-31 13:06:43'),
(4, 1, 1, 'Added to wallet', 'يا إى المحفظة', 0, 1, '2026-01-31 13:10:40', '2026-01-31 13:10:40'),
(5, 1, 1, 'Added to wallet', 'يا إى المحفظة', 0, 1, '2026-01-31 13:15:07', '2026-01-31 13:15:07'),
(6, 1, 1, 'Added to wallet', 'يا إى المحفظة', 22, 1, '2026-01-31 13:15:28', '2026-01-31 13:15:28'),
(7, 1, 1, 'Added to wallet', 'يا إى المحفظة', 644, 1, '2026-01-31 13:19:55', '2026-01-31 13:19:55'),
(8, 1, 1, 'Added to wallet', 'يا إى المحفظة', 81185, 1, '2026-01-31 13:20:23', '2026-01-31 13:20:23'),
(9, 1, 1, 'Added to wallet', 'يا إى المحفظة', 552, 1, '2026-01-31 13:29:16', '2026-01-31 13:29:16'),
(10, 1, 1, 'Added to wallet', 'يا إى المحفظة', 1, 1, '2026-01-31 14:34:19', '2026-01-31 14:34:19'),
(11, 1, 2, 'Amount debited for booking(#000127)', 'ام لم للحجز(#000127)', 19.52, 3, '2026-02-04 15:55:55', '2026-02-04 15:55:55'),
(12, 1, 2, 'Amount debited for booking(#000136)', 'ام لم للحجز(#000136)', 19.22, 3, '2026-02-05 08:06:42', '2026-02-05 08:06:42'),
(13, 1, 2, 'Amount debited for booking(#000139)', 'ام لم للحجز(#000139)', 19.22, 3, '2026-02-05 08:39:18', '2026-02-05 08:39:18'),
(14, 1, 2, 'Amount debited for booking(#000139)', 'ام لم للحجز(#000139)', 19.22, 3, '2026-02-05 09:05:55', '2026-02-05 09:05:55'),
(15, 1, 2, 'Amount debited for booking(#000147)', 'ام لم للحجز(#000147)', 12.2, 3, '2026-02-05 11:43:18', '2026-02-05 11:43:18'),
(16, 1, 2, 'Amount debited for booking(#000147)', 'ام لم للحجز(#000147)', 16.47, 3, '2026-02-05 11:45:12', '2026-02-05 11:45:12'),
(17, 1, 2, 'Amount debited for booking(#000147)', 'ام لم للحجز(#000147)', 16.47, 3, '2026-02-05 11:47:53', '2026-02-05 11:47:53'),
(18, 1, 2, 'Amount debited for booking(#000148)', 'ام لم للحجز(#000148)', 16.47, 3, '2026-02-05 11:49:44', '2026-02-05 11:49:44');

-- --------------------------------------------------------

--
-- Table structure for table `daily_fare_management`
--

CREATE TABLE `daily_fare_management` (
  `id` int(11) NOT NULL,
  `vehicle_type` int(11) NOT NULL DEFAULT 1,
  `base_fare` varchar(250) NOT NULL,
  `price_per_km` varchar(250) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `daily_fare_management`
--

INSERT INTO `daily_fare_management` (`id`, `vehicle_type`, `base_fare`, `price_per_km`, `status`, `created_at`, `updated_at`) VALUES
(12, 1, '10', '1.25', 1, '2025-04-26 23:07:19', '2025-07-16 15:30:48'),
(13, 2, '50', '10', 1, '2025-05-10 19:08:43', '2025-07-16 15:30:58'),
(14, 3, '50', '15', 1, '2025-05-10 19:08:56', '2025-05-10 19:08:56'),
(15, 2, '100', '25', 1, '2025-07-08 07:12:47', '2025-07-29 15:15:23');

-- --------------------------------------------------------

--
-- Table structure for table `delivery_fare_management`
--

CREATE TABLE `delivery_fare_management` (
  `id` int(11) NOT NULL,
  `vehicle_type` int(11) NOT NULL DEFAULT 0,
  `trip_sub_type_id` int(11) NOT NULL,
  `base_fare` varchar(250) NOT NULL,
  `price_per_km` varchar(250) NOT NULL,
  `driver_allowance` varchar(250) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `delivery_fare_management`
--

INSERT INTO `delivery_fare_management` (`id`, `vehicle_type`, `trip_sub_type_id`, `base_fare`, `price_per_km`, `driver_allowance`, `status`, `created_at`, `updated_at`) VALUES
(1, 11, 3, '100', '20', '100', 1, '2023-10-26 15:00:47', '2025-08-11 16:09:45'),
(2, 7, 4, '100', '30', '100', 1, '2023-10-26 15:01:03', '2024-11-30 11:40:45'),
(3, 17, 4, '1000', '25', '1000', 2, '2024-02-09 03:24:49', '2024-11-11 16:01:48'),
(4, 17, 3, '50', '5', '100', 2, '2024-05-10 12:20:58', '2024-11-11 16:01:58');

-- --------------------------------------------------------

--
-- Table structure for table `dispatch_trips`
--

CREATE TABLE `dispatch_trips` (
  `id` int(11) NOT NULL,
  `customer_name` varchar(150) NOT NULL,
  `customer_phone` varchar(150) NOT NULL,
  `pickup_address` varchar(250) DEFAULT NULL,
  `drop_address` varchar(250) DEFAULT NULL,
  `pickup_lat` varchar(100) NOT NULL,
  `pickup_lng` varchar(100) NOT NULL,
  `drop_lat` varchar(100) NOT NULL,
  `drop_lng` varchar(100) NOT NULL,
  `vehicle_type` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `dispatch_trips`
--

INSERT INTO `dispatch_trips` (`id`, `customer_name`, `customer_phone`, `pickup_address`, `drop_address`, `pickup_lat`, `pickup_lng`, `drop_lat`, `drop_lng`, `vehicle_type`, `created_at`, `updated_at`) VALUES
(1, 'jegan', '6384628982', 'Madakulam Kanmai', 'சிம்மக்கல் பஸ் ஸ்டாப்', '9.917817450000001', '78.07500139390376', '9.9242815', '78.1210165', 1, '2026-02-02 15:43:10', '2026-02-02 15:43:10'),
(2, 'Michael', '6384628982', 'Madakulam Kanmai', 'சிம்மக்கல் பஸ் ஸ்டாப்', '9.917817450000001', '78.07500139390376', '9.9242815', '78.1210165', 1, '2026-02-02 16:02:27', '2026-02-02 16:02:27'),
(3, 'Harold Finch', '6384628981', 'Madakkulam, Tamil Nadu, India', 'Simmakkal, Madurai Main, Madurai, Tamil Nadu, India', '9.916056099999999', '78.0900425', '9.9260717', '78.1215208', 1, '2026-02-05 07:56:57', '2026-02-05 07:56:57'),
(4, 'Harold Finch', '6384628981', 'Madakkulam, Tamil Nadu, India', 'Simmakkal, Madurai Main, Madurai, Tamil Nadu, India', '9.916056099999999', '78.0900425', '9.9260717', '78.1215208', 1, '2026-02-05 08:05:36', '2026-02-05 08:05:36'),
(5, 'Harold Finch', '6384628981', 'Madakkulam, Tamil Nadu, India', 'Simmakkal, Madurai Main, Madurai, Tamil Nadu, India', '9.916056099999999', '78.0900425', '9.9260717', '78.1215208', 1, '2026-02-05 08:17:47', '2026-02-05 08:17:47'),
(6, 'harold finch', '6384628981', 'Madakkulam, Tamil Nadu, India', 'Simmakkal, Madurai Main, Madurai, Tamil Nadu, India', '9.916056099999999', '78.0900425', '9.9260717', '78.1215208', 1, '2026-02-05 10:12:22', '2026-02-05 10:12:22'),
(7, 'Nagarani', '6383575669', 'Madakkulam, Tamil Nadu, India', 'Ponmeni, Madurai, Tamil Nadu, India', '9.916056099999999', '78.0900425', '9.9256569', '78.09009999999999', 1, '2026-02-05 10:28:21', '2026-02-05 10:28:21');

-- --------------------------------------------------------

--
-- Table structure for table `drivers`
--

CREATE TABLE `drivers` (
  `id` int(11) NOT NULL,
  `first_name` varchar(250) NOT NULL,
  `last_name` varchar(250) NOT NULL,
  `phone_number` varchar(250) NOT NULL,
  `phone_with_code` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `profile_picture` varchar(250) NOT NULL DEFAULT 'drivers/avatar.png',
  `date_of_birth` date NOT NULL,
  `address` varchar(250) DEFAULT NULL,
  `licence_number` varchar(250) NOT NULL,
  `id_proof` varchar(250) NOT NULL DEFAULT 'static_images/id_proof_icon.png	',
  `id_proof_status` int(11) NOT NULL DEFAULT 14,
  `rejected_reason` text DEFAULT NULL,
  `online_status` int(11) NOT NULL DEFAULT 0,
  `wallet` double NOT NULL DEFAULT 0,
  `overall_ratings` varchar(50) NOT NULL DEFAULT '0',
  `no_of_ratings` varchar(50) NOT NULL DEFAULT '0',
  `otp` varchar(50) DEFAULT NULL,
  `fcm_token` text DEFAULT NULL,
  `shared_ride_status` int(11) NOT NULL DEFAULT 0,
  `daily_ride_status` int(11) NOT NULL DEFAULT 1,
  `rental_ride_status` int(11) NOT NULL DEFAULT 1,
  `outstation_ride_status` int(11) NOT NULL DEFAULT 1,
  `driver_hiring_status` int(11) NOT NULL DEFAULT 0,
  `status` int(11) NOT NULL,
  `referral_code` varchar(100) DEFAULT NULL,
  `refered_by` varchar(100) DEFAULT NULL,
  `gth_lat` varchar(100) DEFAULT NULL,
  `gth_lng` varchar(100) DEFAULT NULL,
  `gth_location` varchar(250) DEFAULT NULL,
  `gth_status` int(11) NOT NULL DEFAULT 0,
  `is_deleted` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `drivers`
--

INSERT INTO `drivers` (`id`, `first_name`, `last_name`, `phone_number`, `phone_with_code`, `email`, `password`, `profile_picture`, `date_of_birth`, `address`, `licence_number`, `id_proof`, `id_proof_status`, `rejected_reason`, `online_status`, `wallet`, `overall_ratings`, `no_of_ratings`, `otp`, `fcm_token`, `shared_ride_status`, `daily_ride_status`, `rental_ride_status`, `outstation_ride_status`, `driver_hiring_status`, `status`, `referral_code`, `refered_by`, `gth_lat`, `gth_lng`, `gth_location`, `gth_status`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 'Elliot', 'Alderson', '6384628981', '+916384628981', 'Elliot@gmail.com', '$2y$12$87RefLrnLq47i2dHUf1dsuT/7hWERUO3pqjH7NL574zavh9/edTAa', 'drivers/1760689083.png', '2025-10-06', NULL, '737373', 'drivers/vehicle_documents/1759731261.png', 16, NULL, 1, 1479.85, '3.5', '2', NULL, 'cC-ssBLTTmafg0ku35ADaI:APA91bGTjpm-VfsWRfE7nN-thKHUWl8YSIPa5fp_1QQ2wgDkAvg_hFf_RsLPaM90Fasb22eXQrWedmnrAZKVL0NMtFGiUGK9hfo0uJ0U-TJQFCPjyTa0vGE', 1, 1, 1, 1, 0, 1, 'DVR00001', '', NULL, NULL, NULL, 0, 0, '2025-10-06 11:43:47', '2026-02-05 11:01:16'),
(2, 'Jonadab', 'Emeribe', '9032253277', '+2349032253277', 'jonadabemeribe@gmail.com', '$2y$12$g77oJEC1tXcTqyisheCJJOUaYyPe3h7uKwy0/YpZ0V96CXBXThsIu', 'drivers/1760654678.png', '2025-10-06', NULL, '9999966527', 'drivers/vehicle_documents/1760617093.png', 16, NULL, 1, 0, '0', '0', NULL, 'dqkDCNSoQE2nMP_msoPlnE:APA91bEtNcvLnnAtAA6ewgF7TFMU_6qJv8yfy6tW4ddl9L4DaKZI1nXLqgk4uXs9Y-0I-hD6h4lzsNiAPRQv_sUBdmEfrMfbFceUENkT98CEx_LFxJS8avg', 0, 1, 1, 1, 0, 1, 'DVR00002', '', '4.8448380281317', '7.0410143522553', 'Old Aba Road, Rumuodara, Rivers', 0, 0, '2025-10-06 16:43:36', '2025-10-25 13:19:32'),
(3, 'Kiran', 'S', '9750023369', '+919750023369', 'kiran@gmail.com', '$2y$12$DW2PO8PNUHpIiUnWIhLnkOAImxiByiXd1pAkZ8i5f5iMyE38wgoHW', 'drivers/avatar.png', '1994-10-14', NULL, '123456', 'drivers/vehicle_documents/1760418373.png', 16, NULL, 0, 2972.19, '0', '0', NULL, 'f-mP6ZwJSxWtbew8_vJlib:APA91bFi5kwe7_RlrG0Zr4uJrnb4iYigraGZ_RIQeuXErfw3p-wAgOC_oMjMowM5_ZvM1PQEcBb1-1ZWtsAJP-jE-hlpBxXOr5GrUfMa9PcfwvDczrdLkhk', 0, 1, 1, 1, 0, 1, 'DVR00003', '', '9.9159778', '78.111106699922', 'Periyar Paerundhu Nilaiyam, Madurai, Tamil Nadu', 0, 0, '2025-10-14 10:35:26', '2026-02-05 09:08:55'),
(4, 'Bethel', 'Emeribe', '795531783', '+254795531783', 'ebethel058@gmail.com', '$2y$12$EK6Rb6r3OYgbxdOnsX2Q9.hr.c/a11xfyrpG8P5UVhB37RvcvzOGC', 'drivers/avatar.png', '1974-10-22', NULL, 'KDC580K', 'static_images/id_proof_icon.png	', 14, NULL, 0, 0, '0', '0', NULL, 'eAXzWWcIQ7KQax3UGkY1lg:APA91bFsicEYSOgVnNetqDj9t6tXlKpcVcNuA9EWWnHPMA_aWKCG3W9BggOzgX50UOlmGYDf0k_askSZqdXSLRAf2eZ02KAJ7JIugnfZO9M2Nvr5lPEr0Do', 0, 1, 1, 1, 0, 1, 'DVR00004', '', NULL, NULL, NULL, 0, 0, '2025-10-22 15:43:35', '2026-01-10 13:30:03'),
(5, 'Devid', 'K', '9750023396', '+919750023396', 'devid@gmail.com', '$2y$12$GT3bp.zy/iN1qPJ8ec.Ph.RGP/zOjpGbRL74fCRdiBD2r.PrwlPBy', 'drivers/avatar.png', '2025-10-23', NULL, 'LIC23', 'drivers/vehicle_documents/1761226967.png', 16, NULL, 0, 993.05, '0', '0', NULL, 'cEQvjrSjSYKxv3Ujmxytmx:APA91bHMINDquLQ2ZpQsApvJSLi4CFxaGbDbJbLNWbik7RCJRXKLnZTubetlIR8E43u_2R41bW2mOw-EVOU2QludVpyIkWKnJlDtO8HebhW17KQBetUi6B4', 0, 1, 1, 1, 0, 1, 'DVR00005', '', '10.0824449', '77.9665547', 'Vadipatti Bus Stand, Vadipatti, Tamil Nadu', 0, 0, '2025-10-23 19:12:06', '2026-01-28 13:54:08'),
(6, 'Peter', 'S', '9885522337', '+919885522337', 'peter@gmail.com', '$2y$12$peQkypcW.jMgua/Gb/JyAenTsolWz5giu37zVx5varo93/EkfTLoC', 'drivers/avatar.png', '2025-10-27', NULL, 'LIC234', 'drivers/vehicle_documents/1761540491.png', 16, NULL, 0, 3975.46, '0', '0', NULL, 'eI8AzIHdSjG_bxyA3snOV3:APA91bGD2Bzx49cXdj-iSsOUk6fE-eJRhBBqNcCQJTf1iOzkguGS6PLHwIIU9EKgEBBihTQgsi8DepQ9OZgog4RRoHJDIoLPdsFOHQJEEnKZY4tHJJ6wxTw', 0, 1, 1, 1, 0, 1, 'DVR00006', '', NULL, NULL, NULL, 0, 0, '2025-10-27 10:16:03', '2025-10-27 16:15:47'),
(7, 'Fayas', 'S', '9776655421', '+919776655421', 'fayas@gmail.com', '$2y$12$uWSiht0oE73p4hhMKgkjX.MjYnevjllRbPgcFDArHLquqrojGAZTC', 'drivers/77cfe3781da62efd28c9fcc3084dab27.jpg', '2025-10-27', NULL, 'LIC23', 'drivers/vehicle_documents/676af3422bcf0670b23fcfb4e529566f.jpg', 16, NULL, 0, -13.9, '0', '0', NULL, 'eI8AzIHdSjG_bxyA3snOV3:APA91bGD2Bzx49cXdj-iSsOUk6fE-eJRhBBqNcCQJTf1iOzkguGS6PLHwIIU9EKgEBBihTQgsi8DepQ9OZgog4RRoHJDIoLPdsFOHQJEEnKZY4tHJJ6wxTw', 0, 1, 1, 1, 0, 1, NULL, NULL, NULL, NULL, NULL, 0, 0, '2025-10-27 16:23:54', '2025-10-27 18:38:10'),
(8, 'Davy', 'Jones', '6363636363', '+916363636363', 'Davy@gmail.com', '$2y$12$tdQZFReyfFvFUuRFT2Rkt.SFi9ngxyVQVWXPNy1KUMPLcupw/bAYe', 'drivers/avatar.png', '2000-10-22', NULL, '827', 'drivers/vehicle_documents/1761633666.png', 16, NULL, 1, 28, '0', '0', NULL, 'fkeWDKx0RvS5Akbv1nbP3W:APA91bEJZAQsj8q9UbYNRn8qKv15rmUuomEeW7DlooE2QWEiCsyBca9Zcc9jpp8sKn4mWh52ch-MvVqeED2pVFoHqGHXfUqoFLMkNbJvCbnPCl1ri7eix4U', 0, 1, 1, 1, 0, 1, 'DVR00008', '', NULL, NULL, NULL, 0, 0, '2025-10-28 12:10:07', '2026-02-05 12:01:08'),
(9, 'Saran', 'S', '9750023377', '+919750023377', 'saran@gmail.com', '$2y$12$GLaTPbZWjkQVKaF.3ARsPeSS0c6JvVI4bzFG9ekMew4ABBcyrfUmi', 'drivers/avatar.png', '1999-07-12', NULL, 'LIC234', 'drivers/vehicle_documents/1761637307.png', 16, NULL, 0, 3986.69, '0', '0', NULL, 'cSeGhtuJSRq2OLx_cTZ23G:APA91bGky1SindxyH3GBfzHav4W9bZnC4E3JZ-lvo72oXbxjAkQU6gs-FTPN5woeHzeDexVQxRi4ykSfemqR9kt1izct012fU5xDB4Efl9FN-81apjvBJxs', 0, 1, 1, 1, 0, 1, 'DVR00009', '', NULL, NULL, NULL, 0, 0, '2025-10-28 13:10:50', '2025-11-03 12:02:53'),
(10, 'Sivan', 'S', '9722331919', '+919722331919', 'sivan@gmail.com', '$2y$12$A1CA3oE30RYcDbWpTLOIVuuB2hsgWHlNfjlvFhWMrXp6mSmKLqKJO', 'drivers/avatar.png', '1999-07-12', NULL, 'LIc23', 'static_images/id_proof_icon.png	', 16, NULL, 1, 2993.05, '0', '0', NULL, 'cSeGhtuJSRq2OLx_cTZ23G:APA91bGky1SindxyH3GBfzHav4W9bZnC4E3JZ-lvo72oXbxjAkQU6gs-FTPN5woeHzeDexVQxRi4ykSfemqR9kt1izct012fU5xDB4Efl9FN-81apjvBJxs', 0, 1, 1, 1, 0, 1, 'DVR00010', '', NULL, NULL, NULL, 0, 0, '2025-11-03 13:00:19', '2025-11-03 13:40:17'),
(11, 'Michelle', 'Banks', '708426620', '+254708426620', 'testing@gmail.com', '$2y$12$SuN1ta.R0Uz50cdYPyrGr.ujHlnkCxQzT5XLmkPcZW8eNU/McQyGm', 'drivers/1765168372.png', '1995-08-07', NULL, '5677789', 'drivers/vehicle_documents/1764738160.png', 16, NULL, 0, -96.99, '0', '0', NULL, 'ftR45V5ESP2SeDPKrR80WD:APA91bH6EOxLxT7BgPaDnGxGFvTeoCnwCalzRgKTKjC4HfG_WXJdNr7iJlUglBnB8jYFZiF1Z4ixes3fHB9ChPyn8AsxpfV2zAQhyoZI7RZOO0xEbMPTj8E', 0, 1, 1, 1, 0, 1, 'DVR00011', '', NULL, NULL, NULL, 0, 0, '2025-12-03 10:31:31', '2025-12-09 11:20:13'),
(12, 'Jonadab', 'Emeribe', '8122198820', '+2348122198820', 'Example3@gnail.com', '$2y$12$tf.WWi3GQk0Sle2yhG88k.HWuBd4PnA2aIG9klG8ubcY8vU6Bcodu', 'drivers/1765794317.png', '1970-01-01', NULL, 'Bbbnj', 'drivers/vehicle_documents/1765794017.png', 16, NULL, 1, -76.47, '2.0', '1', NULL, 'dsBJbuEbS6C4addYHqiz0a:APA91bHn5AhhY2unf4P_nzZvLhNK43cxMNvmli_mKD_F_NCblV73UCRkX5pE26wtgafVzFwBVGrptl9zjZhCvrdD6nixwQ9igwEyKt7dY2PRk2IuVZ-3xks', 0, 1, 1, 1, 0, 1, 'DVR00012', '', '-1.205646', '36.7844571', 'Ruaka, Kiambu', 0, 0, '2025-12-15 15:49:04', '2025-12-19 13:54:54'),
(13, 'Raj', 'S', '6383575669', '+916383575669', 'raj@gmail.com', '$2y$12$l1qqqTql1Hq84/DDm17L5OaDCFBKxLP.sUMN1AVHStAeL3gBtpJIa', 'drivers/avatar.png', '1999-01-12', NULL, '123', 'drivers/vehicle_documents/1770206599.png', 16, NULL, 0, 0, '0', '0', NULL, 'cb30XhLlRMG9vEPcdH0dID:APA91bFMZ2AihSQt0M1B4i6sMZyjjsvsHGq2-QQy3k0hwVZLX23KQ_pIbQOfqw_6EfE6v2Up7QtaoZdACeRRVNa9p5sEHo9EAoJZ8o9r4TyG2hH2bJKPWpo', 0, 1, 1, 1, 0, 1, 'DVR00013', '', NULL, NULL, NULL, 0, 0, '2026-02-04 17:31:47', '2026-02-04 15:23:24');

-- --------------------------------------------------------

--
-- Table structure for table `driver_bank_kyc_details`
--

CREATE TABLE `driver_bank_kyc_details` (
  `id` int(11) NOT NULL,
  `driver_id` int(11) NOT NULL,
  `bank_name` varchar(50) NOT NULL,
  `bank_account_number` varchar(50) NOT NULL,
  `ifsc_code` varchar(50) NOT NULL,
  `aadhar_number` varchar(50) NOT NULL,
  `pan_number` varchar(50) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `driver_checkins`
--

CREATE TABLE `driver_checkins` (
  `id` int(11) NOT NULL,
  `driver-id` int(11) NOT NULL,
  `checkin_time` datetime NOT NULL,
  `checkout_time` datetime DEFAULT NULL,
  `total_hours` double NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `driver_commissions`
--

CREATE TABLE `driver_commissions` (
  `id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `picked_up` varchar(250) NOT NULL,
  `dropped` varchar(250) NOT NULL,
  `commission` varchar(250) NOT NULL,
  `mode_of_payment` int(11) NOT NULL,
  `date` varchar(250) NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `driver_earnings`
--

CREATE TABLE `driver_earnings` (
  `id` int(11) NOT NULL,
  `trip_id` int(11) NOT NULL,
  `driver_id` int(11) NOT NULL,
  `amount` double NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `driver_earnings`
--

INSERT INTO `driver_earnings` (`id`, `trip_id`, `driver_id`, `amount`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 16.8, '2025-10-06 11:46:57', '2025-10-06 11:46:57'),
(2, 2, 3, 14.1, '2025-10-14 10:45:56', '2025-10-14 10:45:56'),
(3, 3, 3, 10.37, '2025-10-14 10:48:02', '2025-10-14 10:48:02'),
(4, 4, 3, 55.28, '2025-10-14 15:29:17', '2025-10-14 15:29:17'),
(5, 5, 3, 11.8, '2025-10-14 15:54:24', '2025-10-14 15:54:24'),
(6, 6, 1, 18.3, '2025-10-17 15:15:53', '2025-10-17 15:15:53'),
(7, 7, 1, 22.67, '2025-10-22 11:43:22', '2025-10-22 11:43:22'),
(8, 8, 1, 16.52, '2025-10-22 14:53:38', '2025-10-22 14:53:38'),
(9, 14, 3, 10.37, '2025-10-23 10:32:24', '2025-10-23 10:32:24'),
(10, 15, 3, 14.01, '2025-10-23 16:03:22', '2025-10-23 16:03:22'),
(11, 18, 3, 14.01, '2025-10-23 16:24:29', '2025-10-23 16:24:29'),
(12, 30, 5, 14.09, '2025-10-25 18:47:51', '2025-10-25 18:47:51'),
(13, 31, 1, 23.94, '2025-10-26 00:51:45', '2025-10-26 00:51:45'),
(14, 32, 6, 25.3, '2025-10-27 10:34:05', '2025-10-27 10:34:05'),
(15, 33, 1, 15.43, '2025-10-27 11:01:41', '2025-10-27 11:01:41'),
(16, 33, 1, 15.43, '2025-10-27 11:01:47', '2025-10-27 11:01:47'),
(17, 34, 1, 14.09, '2025-10-27 11:21:07', '2025-10-27 11:21:07'),
(18, 35, 1, 14.1, '2025-10-27 11:48:09', '2025-10-27 11:48:09'),
(19, 36, 6, 25.3, '2025-10-27 13:49:39', '2025-10-27 13:49:39'),
(20, 36, 6, 25.3, '2025-10-27 13:49:43', '2025-10-27 13:49:43'),
(21, 36, 6, 25.3, '2025-10-27 13:50:08', '2025-10-27 13:50:08'),
(22, 36, 6, 25.3, '2025-10-27 13:53:14', '2025-10-27 13:53:14'),
(23, 40, 6, 21.45, '2025-10-27 14:06:06', '2025-10-27 14:06:06'),
(24, 41, 1, 25.3, '2025-10-27 14:21:01', '2025-10-27 14:21:01'),
(25, 42, 6, 15.56, '2025-10-27 14:21:22', '2025-10-27 14:21:22'),
(26, 38, 3, 22.04, '2025-10-27 14:21:38', '2025-10-27 14:21:38'),
(27, 44, 6, 21.11, '2025-10-27 14:27:39', '2025-10-27 14:27:39'),
(28, 43, 5, 25.3, '2025-10-27 14:31:30', '2025-10-27 14:31:30'),
(29, 45, 5, 25.3, '2025-10-27 14:38:21', '2025-10-27 14:38:21'),
(30, 46, 3, 25.3, '2025-10-27 14:38:32', '2025-10-27 14:38:32'),
(31, 47, 1, 23.83, '2025-10-27 14:39:25', '2025-10-27 14:39:25'),
(32, 48, 1, 16.32, '2025-10-27 14:42:39', '2025-10-27 14:42:39'),
(33, 49, 6, 14.09, '2025-10-27 14:49:04', '2025-10-27 14:49:04'),
(34, 50, 1, 13.43, '2025-10-27 15:01:48', '2025-10-27 15:01:48'),
(35, 52, 1, 15.66, '2025-10-27 15:06:09', '2025-10-27 15:06:09'),
(36, 51, 6, 25.3, '2025-10-27 15:11:27', '2025-10-27 15:11:27'),
(37, 53, 6, 25.3, '2025-10-27 15:30:50', '2025-10-27 15:30:50'),
(38, 54, 6, 16.26, '2025-10-27 16:05:36', '2025-10-27 16:05:36'),
(39, 39, 3, 22.04, '2025-10-27 16:18:08', '2025-10-27 16:18:08'),
(40, 55, 7, 25.3, '2025-10-27 16:26:22', '2025-10-27 16:26:22'),
(41, 56, 7, 14.08, '2025-10-27 17:19:51', '2025-10-27 17:19:51'),
(42, 57, 7, 14.1, '2025-10-27 17:32:00', '2025-10-27 17:32:00'),
(43, 58, 7, 10.37, '2025-10-27 17:33:55', '2025-10-27 17:33:55'),
(44, 58, 7, 10.37, '2025-10-27 17:34:02', '2025-10-27 17:34:02'),
(45, 58, 7, 10.37, '2025-10-27 17:34:45', '2025-10-27 17:34:45'),
(46, 59, 7, 25.3, '2025-10-27 17:58:59', '2025-10-27 17:58:59'),
(47, 60, 1, 25.3, '2025-10-28 10:54:52', '2025-10-28 10:54:52'),
(48, 61, 1, 14.09, '2025-10-28 11:00:21', '2025-10-28 11:00:21'),
(49, 62, 1, 25.3, '2025-10-28 11:18:51', '2025-10-28 11:18:51'),
(50, 63, 1, 24.87, '2025-10-28 11:38:07', '2025-10-28 11:38:07'),
(51, 64, 1, 14.5, '2025-10-28 11:49:58', '2025-10-28 11:49:58'),
(52, 65, 1, 14.5, '2025-10-28 12:22:11', '2025-10-28 12:22:11'),
(53, 66, 1, 17.16, '2025-10-28 12:50:00', '2025-10-28 12:50:00'),
(54, 67, 1, 14.09, '2025-10-28 12:52:26', '2025-10-28 12:52:26'),
(55, 68, 9, 25.3, '2025-10-28 13:14:25', '2025-10-28 13:14:25'),
(56, 69, 9, 25.3, '2025-10-28 14:25:53', '2025-10-28 14:25:53'),
(57, 70, 9, 24.87, '2025-10-28 14:27:14', '2025-10-28 14:27:14'),
(58, 71, 10, 25.3, '2025-11-03 13:08:01', '2025-11-03 13:08:01'),
(59, 72, 10, 14.09, '2025-11-03 13:40:11', '2025-11-03 13:40:11'),
(60, 73, 1, 12.24, '2025-12-05 14:48:49', '2025-12-05 14:48:49'),
(61, 74, 11, 262.98, '2025-12-08 10:15:31', '2025-12-08 10:15:31'),
(62, 75, 11, 286.63, '2025-12-08 10:49:20', '2025-12-08 10:49:20'),
(63, 76, 1, 15.3, '2025-12-15 12:44:45', '2025-12-15 12:44:45'),
(64, 77, 1, 15.76, '2025-12-15 13:20:40', '2025-12-15 13:20:40'),
(65, 82, 12, 36.74, '2025-12-16 19:53:40', '2025-12-16 19:53:40'),
(66, 84, 12, 15.87, '2025-12-17 13:56:53', '2025-12-17 13:56:53'),
(67, 87, 12, 148.38, '2025-12-17 15:28:23', '2025-12-17 15:28:23'),
(68, 88, 12, 15.95, '2025-12-17 15:50:12', '2025-12-17 15:50:12'),
(69, 89, 12, 148.38, '2025-12-17 17:24:24', '2025-12-17 17:24:24'),
(70, 91, 12, 26.54, '2025-12-17 17:31:24', '2025-12-17 17:31:24'),
(71, 92, 12, 23.32, '2025-12-17 17:33:51', '2025-12-17 17:33:51'),
(72, 93, 12, 18.18, '2025-12-19 10:57:28', '2025-12-19 10:57:28'),
(73, 94, 1, 28.09, '2025-12-19 12:43:21', '2025-12-19 12:43:21'),
(74, 96, 1, 14.41, '2025-12-22 12:10:41', '2025-12-22 12:10:41'),
(75, 97, 1, 18.62, '2025-12-29 13:01:46', '2025-12-29 13:01:46'),
(76, 100, 1, 14.25, '2025-12-29 15:03:44', '2025-12-29 15:03:44'),
(77, 102, 1, 11.65, '2025-12-31 11:15:28', '2025-12-31 11:15:28'),
(78, 103, 1, 11.65, '2025-12-31 12:55:45', '2025-12-31 12:55:45'),
(79, 113, 1, 5.83, '2025-12-31 17:39:44', '2025-12-31 17:39:44'),
(80, 114, 1, 14.87, '2026-01-01 14:10:06', '2026-01-01 14:10:06'),
(81, 117, 1, 14.87, '2026-01-02 12:13:43', '2026-01-02 12:13:43'),
(82, 119, 1, 14.14, '2026-01-02 13:11:05', '2026-01-02 13:11:05'),
(83, 120, 1, 15.02, '2026-01-02 18:17:35', '2026-01-02 18:17:35'),
(84, 121, 1, 11.65, '2026-01-21 11:18:44', '2026-01-21 11:18:44'),
(85, 122, 1, 12.08, '2026-01-28 14:14:20', '2026-01-28 14:14:20'),
(86, 123, 1, 12.08, '2026-01-30 12:30:26', '2026-01-30 12:30:26'),
(87, 124, 1, 13.1, '2026-01-30 17:37:13', '2026-01-30 17:37:13'),
(88, 124, 1, 13.1, '2026-01-30 17:37:14', '2026-01-30 17:37:14'),
(89, 125, 1, 15.09, '2026-02-03 17:32:23', '2026-02-03 17:32:23'),
(90, 126, 1, 12.08, '2026-02-04 16:15:27', '2026-02-04 16:15:27'),
(91, 127, 1, 16.59, '2026-02-04 15:56:03', '2026-02-04 15:56:03'),
(92, 130, 1, 11.67, '2026-02-05 06:27:16', '2026-02-05 06:27:16'),
(93, 136, 1, 16.34, '2026-02-05 08:08:32', '2026-02-05 08:08:32'),
(94, 139, 1, 16.34, '2026-02-05 08:39:26', '2026-02-05 08:39:26'),
(95, 139, 1, 16.34, '2026-02-05 09:06:01', '2026-02-05 09:06:01'),
(96, 138, 3, 12.81, '2026-02-05 09:08:45', '2026-02-05 09:08:45'),
(97, 145, 1, 14.39, '2026-02-05 10:54:22', '2026-02-05 10:54:22'),
(98, 147, 8, 14, '2026-02-05 11:48:37', '2026-02-05 11:48:37'),
(99, 148, 8, 14, '2026-02-05 11:49:52', '2026-02-05 11:49:52');

-- --------------------------------------------------------

--
-- Table structure for table `driver_hiring_fare_management`
--

CREATE TABLE `driver_hiring_fare_management` (
  `id` int(11) NOT NULL,
  `base_fare` double NOT NULL,
  `base_hours` int(11) NOT NULL,
  `extra_hour_charge` double NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `driver_hiring_requests`
--

CREATE TABLE `driver_hiring_requests` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `driver_id` int(11) NOT NULL,
  `pickup_location` text NOT NULL,
  `pickup_lat` varchar(100) NOT NULL,
  `pickup_lng` varchar(100) NOT NULL,
  `drop_location` text NOT NULL,
  `drop_lat` varchar(100) NOT NULL,
  `drop_lng` varchar(100) NOT NULL,
  `pickup_date` date NOT NULL,
  `pickup_time` time NOT NULL,
  `drop_date` date DEFAULT NULL,
  `drop_time` time DEFAULT NULL,
  `zone` int(11) NOT NULL,
  `total` double NOT NULL DEFAULT 0,
  `tax` double NOT NULL DEFAULT 0,
  `sub_total` double NOT NULL DEFAULT 0,
  `payment_method` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `driver_hiring_statuses`
--

CREATE TABLE `driver_hiring_statuses` (
  `id` int(11) NOT NULL,
  `status_name` varchar(100) NOT NULL,
  `customer_status_name` varchar(150) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `driver_queries`
--

CREATE TABLE `driver_queries` (
  `id` int(11) NOT NULL,
  `first_name` varchar(250) NOT NULL,
  `phone_number` varchar(250) NOT NULL,
  `status` int(11) NOT NULL,
  `email` varchar(250) NOT NULL,
  `last_name` varchar(250) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `driver_recharges`
--

CREATE TABLE `driver_recharges` (
  `id` int(11) NOT NULL,
  `driver_id` int(11) NOT NULL,
  `amount` double NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `driver_recharges`
--

INSERT INTO `driver_recharges` (`id`, `driver_id`, `amount`, `created_at`, `updated_at`) VALUES
(1, 1, 1000, '2025-10-06 11:49:11', '2025-10-06 11:49:11'),
(2, 3, 3000, '2025-10-14 10:46:21', '2025-10-14 10:46:21'),
(3, 6, 4000, '2025-10-27 10:21:22', '2025-10-27 10:21:22'),
(4, 5, 1000, '2025-10-27 14:40:43', '2025-10-27 14:40:43'),
(5, 9, 4000, '2025-10-28 13:15:20', '2025-10-28 13:15:20'),
(6, 10, 3000, '2025-11-03 13:05:23', '2025-11-03 13:05:23'),
(7, 1, 542, '2026-01-31 13:52:03', '2026-01-31 13:52:03');

-- --------------------------------------------------------

--
-- Table structure for table `driver_tips`
--

CREATE TABLE `driver_tips` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `trip_id` int(11) NOT NULL,
  `driver_id` int(11) NOT NULL,
  `tip` double NOT NULL,
  `tip_mode` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `driver_trip_requests`
--

CREATE TABLE `driver_trip_requests` (
  `id` int(11) NOT NULL,
  `driver_id` int(11) NOT NULL DEFAULT 0,
  `trip_request_id` int(11) NOT NULL DEFAULT 0,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `driver_trip_requests`
--

INSERT INTO `driver_trip_requests` (`id`, `driver_id`, `trip_request_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 3, '2025-10-06 06:15:40', '2025-10-06 06:15:44'),
(2, 3, 2, 3, '2025-10-14 05:14:46', '2025-10-14 05:14:55'),
(3, 3, 3, 3, '2025-10-14 05:17:01', '2025-10-14 05:17:06'),
(4, 3, 4, 3, '2025-10-14 09:45:41', '2025-10-14 09:45:48'),
(5, 3, 5, 4, '2025-10-14 15:50:22', '2025-10-14 15:50:22'),
(6, 3, 6, 4, '2025-10-14 15:53:28', '2025-10-14 15:53:28'),
(7, 3, 7, 3, '2025-10-14 10:23:36', '2025-10-14 10:23:44'),
(8, 1, 8, 3, '2025-10-17 09:45:00', '2025-10-17 09:45:04'),
(9, 1, 10, 4, '2025-10-22 10:17:45', '2025-10-22 10:17:45'),
(10, 1, 11, 4, '2025-10-22 10:35:46', '2025-10-22 10:35:46'),
(11, 1, 12, 4, '2025-10-22 11:26:09', '2025-10-22 11:26:09'),
(12, 1, 12, 4, '2025-10-22 11:26:54', '2025-10-22 11:26:54'),
(13, 1, 13, 4, '2025-10-22 11:27:05', '2025-10-22 11:27:05'),
(14, 1, 14, 4, '2025-10-22 11:30:11', '2025-10-22 11:30:11'),
(15, 1, 15, 4, '2025-10-22 11:35:05', '2025-10-22 11:35:05'),
(16, 1, 16, 4, '2025-10-22 11:38:34', '2025-10-22 11:38:34'),
(17, 1, 17, 4, '2025-10-22 11:39:13', '2025-10-22 11:39:13'),
(18, 1, 18, 4, '2025-10-22 11:40:43', '2025-10-22 11:40:43'),
(19, 1, 19, 4, '2025-10-22 11:41:34', '2025-10-22 11:41:34'),
(20, 1, 18, 4, '2025-10-22 11:42:14', '2025-10-22 11:42:14'),
(21, 1, 19, 4, '2025-10-22 11:42:14', '2025-10-22 11:42:14'),
(22, 1, 20, 3, '2025-10-22 06:12:22', '2025-10-22 06:12:25'),
(23, 1, 21, 4, '2025-10-22 11:46:38', '2025-10-22 11:46:38'),
(24, 1, 22, 4, '2025-10-22 14:03:10', '2025-10-22 14:03:10'),
(25, 1, 23, 3, '2025-10-22 09:14:23', '2025-10-22 09:14:33'),
(26, 2, 24, 3, '2025-10-22 09:30:55', '2025-10-22 09:31:07'),
(27, 3, 9, 3, '2025-10-17 12:35:45', '2025-10-22 10:24:40'),
(28, 3, 25, 3, '2025-10-22 10:25:21', '2025-10-22 10:25:23'),
(29, 3, 26, 3, '2025-10-22 10:34:59', '2025-10-22 10:35:00'),
(30, 3, 27, 4, '2025-10-22 18:28:13', '2025-10-22 18:28:13'),
(31, 3, 28, 3, '2025-10-22 13:04:47', '2025-10-22 13:04:55'),
(32, 3, 29, 3, '2025-10-23 05:00:35', '2025-10-23 05:00:36'),
(33, 3, 30, 4, '2025-10-23 16:01:20', '2025-10-23 16:01:20'),
(34, 3, 31, 3, '2025-10-23 10:31:39', '2025-10-23 10:31:42'),
(35, 3, 32, 3, '2025-10-23 10:40:13', '2025-10-23 10:40:22'),
(36, 3, 33, 3, '2025-10-23 10:41:16', '2025-10-23 10:41:21'),
(37, 3, 34, 3, '2025-10-23 10:51:02', '2025-10-23 10:51:13'),
(38, 3, 35, 4, '2025-10-23 17:03:13', '2025-10-23 17:03:13'),
(39, 3, 36, 4, '2025-10-23 17:09:48', '2025-10-23 17:09:48'),
(40, 3, 37, 4, '2025-10-23 17:45:19', '2025-10-23 17:45:19'),
(41, 3, 38, 4, '2025-10-23 17:45:52', '2025-10-23 17:45:52'),
(42, 3, 39, 4, '2025-10-23 17:50:27', '2025-10-23 17:50:27'),
(43, 3, 40, 4, '2025-10-23 17:53:28', '2025-10-23 17:53:28'),
(44, 3, 41, 4, '2025-10-23 17:56:36', '2025-10-23 17:56:36'),
(45, 3, 42, 4, '2025-10-23 18:36:31', '2025-10-23 18:36:31'),
(46, 5, 46, 4, '2025-10-23 19:19:36', '2025-10-23 19:19:36'),
(47, 5, 49, 4, '2025-10-23 19:31:31', '2025-10-23 19:31:31'),
(48, 5, 50, 4, '2025-10-23 19:34:31', '2025-10-23 19:34:31'),
(49, 5, 51, 4, '2025-10-24 09:39:15', '2025-10-24 09:39:15'),
(50, 5, 53, 3, '2025-10-24 04:36:12', '2025-10-24 04:36:14'),
(51, 5, 55, 4, '2025-10-24 10:12:48', '2025-10-24 10:12:48'),
(52, 5, 56, 4, '2025-10-24 10:17:02', '2025-10-24 10:17:02'),
(53, 5, 57, 4, '2025-10-24 10:24:30', '2025-10-24 10:24:30'),
(54, 5, 58, 4, '2025-10-24 10:27:17', '2025-10-24 10:27:17'),
(55, 5, 59, 4, '2025-10-24 10:39:37', '2025-10-24 10:39:37'),
(56, 5, 60, 4, '2025-10-24 10:43:24', '2025-10-24 10:43:24'),
(57, 5, 62, 4, '2025-10-24 10:57:02', '2025-10-24 10:57:02'),
(58, 5, 64, 4, '2025-10-24 11:01:52', '2025-10-24 11:01:52'),
(59, 5, 65, 4, '2025-10-24 11:37:28', '2025-10-24 11:37:28'),
(60, 5, 66, 3, '2025-10-24 06:07:57', '2025-10-24 06:07:58'),
(61, 5, 68, 4, '2025-10-24 13:00:38', '2025-10-24 13:00:38'),
(62, 5, 69, 4, '2025-10-24 13:01:26', '2025-10-24 13:01:26'),
(63, 5, 72, 4, '2025-10-24 16:15:45', '2025-10-24 16:15:45'),
(64, 5, 79, 3, '2025-10-24 11:05:53', '2025-10-24 11:05:55'),
(65, 5, 85, 3, '2025-10-24 12:52:06', '2025-10-24 12:52:25'),
(66, 1, 86, 3, '2025-10-24 13:00:09', '2025-10-24 13:00:09'),
(67, 5, 86, 4, '2025-10-24 18:30:27', '2025-10-24 18:30:27'),
(68, 1, 86, 3, '2025-10-24 13:00:09', '2025-10-24 13:00:27'),
(69, 1, 87, 3, '2025-10-25 05:00:07', '2025-10-25 05:33:52'),
(70, 1, 88, 3, '2025-10-25 05:38:54', '2025-10-25 05:38:56'),
(71, 5, 89, 4, '2025-10-25 13:23:46', '2025-10-25 13:23:46'),
(72, 1, 89, 3, '2025-10-25 07:53:32', '2025-10-25 07:53:46'),
(73, 5, 90, 4, '2025-10-25 13:36:29', '2025-10-25 13:36:29'),
(74, 5, 91, 4, '2025-10-25 13:39:52', '2025-10-25 13:39:52'),
(75, 5, 92, 4, '2025-10-25 13:40:56', '2025-10-25 13:40:56'),
(76, 1, 92, 3, '2025-10-25 08:10:42', '2025-10-25 08:10:56'),
(77, 1, 93, 3, '2025-10-25 12:12:48', '2025-10-25 12:12:49'),
(78, 5, 94, 3, '2025-10-25 13:11:19', '2025-10-25 13:11:31'),
(79, 1, 95, 3, '2025-10-25 19:04:24', '2025-10-25 19:04:29'),
(80, 6, 96, 3, '2025-10-27 04:50:48', '2025-10-27 04:50:48'),
(81, 1, 97, 3, '2025-10-27 05:29:35', '2025-10-27 05:29:37'),
(82, 1, 99, 3, '2025-10-27 05:46:56', '2025-10-27 05:47:09'),
(83, 1, 100, 3, '2025-10-27 06:17:17', '2025-10-27 06:17:22'),
(84, 1, 101, 4, '2025-10-27 13:07:15', '2025-10-27 13:07:15'),
(85, 6, 104, 3, '2025-10-27 08:15:49', '2025-10-27 08:15:51'),
(86, 6, 104, 4, '2025-10-27 13:46:42', '2025-10-27 13:46:42'),
(87, 3, 46, 3, '2025-10-23 13:49:26', '2025-10-27 08:20:21'),
(88, 3, 105, 3, '2025-10-27 08:27:54', '2025-10-27 08:27:55'),
(89, 3, 106, 3, '2025-10-27 08:31:50', '2025-10-27 08:31:50'),
(90, 6, 107, 3, '2025-10-27 08:34:54', '2025-10-27 08:34:57'),
(91, 1, 108, 3, '2025-10-27 08:40:06', '2025-10-27 08:40:08'),
(92, 6, 109, 3, '2025-10-27 08:45:49', '2025-10-27 08:45:53'),
(93, 5, 98, 4, '2025-10-27 14:21:53', '2025-10-27 14:21:53'),
(94, 5, 110, 3, '2025-10-27 08:52:05', '2025-10-27 08:52:06'),
(95, 5, 110, 4, '2025-10-27 14:22:43', '2025-10-27 14:22:43'),
(96, 6, 113, 3, '2025-10-27 08:56:04', '2025-10-27 08:56:08'),
(97, 5, 114, 4, '2025-10-27 14:35:19', '2025-10-27 14:35:19'),
(98, 6, 114, 4, '2025-10-27 14:35:37', '2025-10-27 14:35:37'),
(99, 5, 115, 3, '2025-10-27 09:06:38', '2025-10-27 09:06:39'),
(100, 3, 114, 3, '2025-10-27 09:05:02', '2025-10-27 09:05:37'),
(101, 1, 116, 3, '2025-10-27 09:07:59', '2025-10-27 09:08:02'),
(102, 1, 117, 4, '2025-10-27 14:40:04', '2025-10-27 14:40:04'),
(103, 1, 118, 4, '2025-10-27 14:40:56', '2025-10-27 14:40:56'),
(104, 1, 119, 3, '2025-10-27 09:11:07', '2025-10-27 09:11:10'),
(105, 6, 120, 3, '2025-10-27 09:17:25', '2025-10-27 09:17:30'),
(106, 1, 121, 3, '2025-10-27 09:18:22', '2025-10-27 09:18:25'),
(107, 6, 122, 3, '2025-10-27 09:29:07', '2025-10-27 09:29:09'),
(108, 6, 122, 4, '2025-10-27 14:59:33', '2025-10-27 14:59:33'),
(109, 1, 123, 4, '2025-10-27 15:03:21', '2025-10-27 15:03:21'),
(110, 6, 123, 4, '2025-10-27 15:03:43', '2025-10-27 15:03:43'),
(111, 1, 124, 3, '2025-10-27 09:34:55', '2025-10-27 09:34:59'),
(112, 6, 125, 3, '2025-10-27 09:59:19', '2025-10-27 09:59:19'),
(113, 6, 126, 3, '2025-10-27 10:33:31', '2025-10-27 10:33:31'),
(114, 7, 127, 3, '2025-10-27 10:55:36', '2025-10-27 10:55:37'),
(115, 7, 128, 3, '2025-10-27 11:48:32', '2025-10-27 11:48:35'),
(116, 7, 129, 3, '2025-10-27 11:58:59', '2025-10-27 11:59:08'),
(117, 7, 130, 3, '2025-10-27 12:02:51', '2025-10-27 12:02:52'),
(118, 7, 131, 3, '2025-10-27 12:28:01', '2025-10-27 12:28:13'),
(119, 1, 126, 4, '2025-10-27 21:32:31', '2025-10-27 21:32:31'),
(120, 1, 132, 3, '2025-10-28 05:24:01', '2025-10-28 05:24:02'),
(121, 1, 133, 3, '2025-10-28 05:28:28', '2025-10-28 05:28:32'),
(122, 1, 134, 3, '2025-10-28 05:47:54', '2025-10-28 05:48:07'),
(123, 1, 135, 3, '2025-10-28 06:07:29', '2025-10-28 06:07:30'),
(124, 1, 136, 3, '2025-10-28 06:19:09', '2025-10-28 06:19:18'),
(125, 1, 137, 3, '2025-10-28 06:51:30', '2025-10-28 06:51:32'),
(126, 1, 138, 3, '2025-10-28 07:19:22', '2025-10-28 07:19:23'),
(127, 1, 139, 3, '2025-10-28 07:21:23', '2025-10-28 07:21:27'),
(128, 9, 140, 3, '2025-10-28 07:43:46', '2025-10-28 07:43:47'),
(129, 9, 141, 3, '2025-10-28 08:55:14', '2025-10-28 08:55:16'),
(130, 9, 142, 3, '2025-10-28 08:56:39', '2025-10-28 08:56:40'),
(131, 10, 143, 3, '2025-11-03 07:36:25', '2025-11-03 07:36:27'),
(132, 10, 144, 3, '2025-11-03 07:51:53', '2025-11-03 07:51:59'),
(133, 1, 146, 3, '2025-12-05 09:18:07', '2025-12-05 09:18:09'),
(134, 11, 147, 3, '2025-12-08 04:38:50', '2025-12-08 04:39:01'),
(135, 11, 148, 3, '2025-12-08 05:08:16', '2025-12-08 05:08:23'),
(136, 1, 149, 4, '2025-12-15 12:32:20', '2025-12-15 12:32:20'),
(137, 1, 150, 3, '2025-12-15 07:05:50', '2025-12-15 07:05:53'),
(138, 1, 151, 3, '2025-12-15 07:48:36', '2025-12-15 07:48:39'),
(139, 12, 153, 3, '2025-12-16 13:37:35', '2025-12-16 13:37:43'),
(140, 12, 154, 3, '2025-12-16 13:39:23', '2025-12-16 13:39:31'),
(141, 12, 155, 3, '2025-12-16 13:41:12', '2025-12-16 13:41:22'),
(142, 12, 156, 3, '2025-12-16 13:47:16', '2025-12-16 13:47:25'),
(143, 12, 157, 3, '2025-12-16 13:53:27', '2025-12-16 13:53:36'),
(144, 12, 158, 4, '2025-12-17 11:11:04', '2025-12-17 11:11:04'),
(145, 12, 158, 3, '2025-12-17 05:40:47', '2025-12-17 05:41:04'),
(146, 12, 159, 3, '2025-12-17 08:18:38', '2025-12-17 08:18:46'),
(147, 12, 160, 4, '2025-12-17 14:09:42', '2025-12-17 14:09:42'),
(148, 12, 160, 4, '2025-12-17 14:10:17', '2025-12-17 14:10:17'),
(149, 12, 161, 3, '2025-12-17 09:49:54', '2025-12-17 09:50:00'),
(150, 12, 162, 3, '2025-12-17 09:52:43', '2025-12-17 09:52:49'),
(151, 12, 163, 3, '2025-12-17 09:56:02', '2025-12-17 09:56:17'),
(152, 12, 164, 3, '2025-12-17 10:18:46', '2025-12-17 10:18:52'),
(153, 12, 165, 3, '2025-12-17 11:50:26', '2025-12-17 11:50:33'),
(154, 12, 166, 3, '2025-12-17 11:55:39', '2025-12-17 11:55:45'),
(155, 12, 167, 3, '2025-12-17 11:59:55', '2025-12-17 12:00:07'),
(156, 12, 168, 3, '2025-12-17 12:02:26', '2025-12-17 12:02:34'),
(157, 12, 169, 3, '2025-12-19 05:26:12', '2025-12-19 05:26:18'),
(158, 1, 152, 4, '2025-12-19 12:04:19', '2025-12-19 12:04:19'),
(159, 1, 170, 3, '2025-12-19 06:44:28', '2025-12-19 06:44:31'),
(160, 1, 171, 4, '2025-12-22 11:50:48', '2025-12-22 11:50:48'),
(161, 1, 172, 3, '2025-12-22 06:21:22', '2025-12-22 06:21:31'),
(162, 1, 173, 3, '2025-12-22 06:37:16', '2025-12-22 06:37:17'),
(163, 1, 174, 3, '2025-12-29 07:24:41', '2025-12-29 07:27:45'),
(164, 1, 175, 3, '2025-12-29 08:19:14', '2025-12-29 08:19:15'),
(165, 1, 176, 3, '2025-12-29 08:21:14', '2025-12-29 08:21:24'),
(166, 1, 177, 3, '2025-12-29 09:30:33', '2025-12-29 09:30:34'),
(167, 1, 178, 4, '2025-12-29 15:33:13', '2025-12-29 15:33:13'),
(168, 1, 179, 4, '2025-12-29 18:18:23', '2025-12-29 18:18:23'),
(169, 1, 180, 4, '2025-12-29 19:36:17', '2025-12-29 19:36:17'),
(170, 1, 181, 4, '2025-12-30 14:58:59', '2025-12-30 14:58:59'),
(171, 1, 182, 4, '2025-12-30 15:01:57', '2025-12-30 15:01:57'),
(172, 1, 183, 3, '2025-12-30 11:08:36', '2025-12-30 11:08:38'),
(173, 1, 184, 4, '2025-12-31 10:32:24', '2025-12-31 10:32:24'),
(174, 1, 185, 3, '2025-12-31 05:41:01', '2025-12-31 05:41:02'),
(175, 1, 186, 4, '2025-12-31 12:53:58', '2025-12-31 12:53:58'),
(176, 1, 187, 3, '2025-12-31 07:24:58', '2025-12-31 07:25:00'),
(177, 1, 188, 3, '2025-12-31 07:28:44', '2025-12-31 07:28:46'),
(178, 1, 189, 3, '2025-12-31 07:43:59', '2025-12-31 07:44:00'),
(179, 1, 190, 3, '2025-12-31 07:45:30', '2025-12-31 07:45:32'),
(180, 1, 191, 3, '2025-12-31 08:21:12', '2025-12-31 08:21:14'),
(181, 1, 192, 3, '2025-12-31 08:22:29', '2025-12-31 08:22:31'),
(182, 1, 193, 3, '2025-12-31 09:53:29', '2025-12-31 09:53:36'),
(183, 1, 194, 3, '2025-12-31 09:57:14', '2025-12-31 09:57:15'),
(184, 1, 195, 3, '2025-12-31 10:03:50', '2025-12-31 10:03:52'),
(185, 1, 196, 3, '2025-12-31 10:15:49', '2025-12-31 10:15:50'),
(186, 1, 197, 3, '2025-12-31 12:08:52', '2025-12-31 12:09:03'),
(187, 1, 198, 4, '2025-12-31 19:40:41', '2025-12-31 19:40:41'),
(188, 1, 199, 3, '2026-01-01 08:39:10', '2026-01-01 08:39:11'),
(189, 1, 200, 3, '2026-01-01 12:40:56', '2026-01-01 12:40:57'),
(190, 1, 201, 3, '2026-01-01 13:11:34', '2026-01-01 13:11:35'),
(191, 1, 202, 3, '2026-01-02 06:38:31', '2026-01-02 06:38:32'),
(192, 1, 203, 3, '2026-01-02 07:16:21', '2026-01-02 07:16:23'),
(193, 1, 204, 3, '2026-01-02 07:36:51', '2026-01-02 07:36:52'),
(194, 1, 205, 3, '2026-01-02 12:45:08', '2026-01-02 12:45:10'),
(195, 1, 207, 3, '2026-01-21 05:48:01', '2026-01-21 05:48:02'),
(196, 1, 208, 4, '2026-01-28 13:59:29', '2026-01-28 13:59:29'),
(197, 1, 209, 3, '2026-01-28 08:43:30', '2026-01-28 08:43:32'),
(198, 1, 210, 3, '2026-01-30 06:59:48', '2026-01-30 06:59:49'),
(199, 1, 211, 3, '2026-01-30 12:06:06', '2026-01-30 12:06:16'),
(200, 1, 212, 4, '2026-02-02 15:40:42', '2026-02-02 15:40:42'),
(201, 1, 214, 4, '2026-02-02 15:43:54', '2026-02-02 15:43:54'),
(202, 1, 215, 4, '2026-02-02 16:03:24', '2026-02-02 16:03:24'),
(203, 1, 218, 4, '2026-02-02 16:06:05', '2026-02-02 16:06:05'),
(204, 1, 219, 4, '2026-02-02 17:11:10', '2026-02-02 17:11:10'),
(205, 1, 221, 3, '2026-02-03 12:01:14', '2026-02-03 12:01:24'),
(206, 1, 223, 4, '2026-02-04 14:42:23', '2026-02-04 14:42:23'),
(207, 1, 224, 4, '2026-02-04 14:42:50', '2026-02-04 14:42:50'),
(208, 1, 225, 4, '2026-02-04 14:43:04', '2026-02-04 14:43:04'),
(209, 1, 226, 4, '2026-02-04 15:42:29', '2026-02-04 15:42:29'),
(210, 1, 227, 4, '2026-02-04 16:10:48', '2026-02-04 16:10:48'),
(211, 1, 228, 4, '2026-02-04 16:13:09', '2026-02-04 16:13:09'),
(212, 1, 228, 4, '2026-02-04 16:13:41', '2026-02-04 16:13:41'),
(213, 1, 229, 3, '2026-02-04 10:44:45', '2026-02-04 10:44:47'),
(214, 1, 229, 4, '2026-02-04 16:15:19', '2026-02-04 16:15:19'),
(215, 1, 230, 4, '2026-02-04 16:28:44', '2026-02-04 16:28:44'),
(216, 1, 231, 4, '2026-02-04 16:34:04', '2026-02-04 16:34:04'),
(217, 1, 232, 4, '2026-02-04 16:35:00', '2026-02-04 16:35:00'),
(218, 1, 233, 4, '2026-02-04 16:40:22', '2026-02-04 16:40:22'),
(219, 1, 234, 4, '2026-02-04 16:40:51', '2026-02-04 16:40:51'),
(220, 1, 237, 4, '2026-02-04 18:09:21', '2026-02-04 18:09:21'),
(221, 1, 238, 3, '2026-02-04 12:57:34', '2026-02-04 12:57:43'),
(222, 1, 236, 3, '2026-02-04 16:59:35', '2026-02-05 04:50:51'),
(223, 1, 241, 4, '2026-02-05 06:06:19', '2026-02-05 06:06:19'),
(224, 1, 243, 3, '2026-02-05 05:08:24', '2026-02-05 05:08:28'),
(225, 1, 248, 3, '2026-02-05 05:24:43', '2026-02-05 05:24:47'),
(226, 1, 252, 4, '2026-02-05 06:33:24', '2026-02-05 06:33:24'),
(227, 1, 253, 4, '2026-02-05 06:35:06', '2026-02-05 06:35:06'),
(228, 1, 253, 3, '2026-02-05 05:34:51', '2026-02-05 05:34:59'),
(229, 1, 256, 3, '2026-02-05 05:55:27', '2026-02-05 05:55:32'),
(230, 1, 256, 4, '2026-02-05 06:55:43', '2026-02-05 06:55:43'),
(231, 1, 258, 4, '2026-02-05 07:06:34', '2026-02-05 07:06:34'),
(232, 1, 259, 4, '2026-02-05 07:13:00', '2026-02-05 07:13:00'),
(233, 1, 260, 3, '2026-02-05 06:22:23', '2026-02-05 06:22:28'),
(234, 1, 260, 4, '2026-02-05 07:22:38', '2026-02-05 07:22:38'),
(235, 1, 261, 3, '2026-02-05 06:25:11', '2026-02-05 06:25:15'),
(236, 1, 261, 4, '2026-02-05 07:25:24', '2026-02-05 07:25:24'),
(237, 1, 262, 4, '2026-02-05 07:26:36', '2026-02-05 07:26:36'),
(238, 1, 263, 4, '2026-02-05 07:55:00', '2026-02-05 07:55:00'),
(239, 1, 265, 3, '2026-02-05 06:56:58', '2026-02-05 06:57:06'),
(240, 1, 267, 3, '2026-02-05 07:05:37', '2026-02-05 07:06:03'),
(241, 1, 267, 3, '2026-02-05 07:05:37', '2026-02-05 07:06:08'),
(242, 3, 266, 3, '2026-02-05 06:57:49', '2026-02-05 06:57:49'),
(243, 1, 268, 3, '2026-02-05 07:17:48', '2026-02-05 07:18:03'),
(244, 3, 262, 3, '2026-02-05 06:26:22', '2026-02-05 06:26:22'),
(245, 1, 272, 3, '2026-02-05 08:12:56', '2026-02-05 08:13:09'),
(246, 1, 273, 3, '2026-02-05 08:35:51', '2026-02-05 08:35:53'),
(247, 1, 239, 4, '2026-02-05 09:59:10', '2026-02-05 09:59:10'),
(248, 1, 240, 4, '2026-02-05 10:00:17', '2026-02-05 10:00:17'),
(249, 1, 244, 4, '2026-02-05 10:09:24', '2026-02-05 10:09:24'),
(250, 1, 245, 4, '2026-02-05 10:10:31', '2026-02-05 10:10:31'),
(251, 1, 275, 4, '2026-02-05 10:22:27', '2026-02-05 10:22:27'),
(252, 1, 246, 3, '2026-02-05 05:11:41', '2026-02-05 09:23:21'),
(253, 1, 247, 4, '2026-02-05 10:25:07', '2026-02-05 10:25:07'),
(254, 1, 251, 4, '2026-02-05 10:28:50', '2026-02-05 10:28:50'),
(255, 1, 278, 4, '2026-02-05 10:29:30', '2026-02-05 10:29:30'),
(256, 1, 250, 4, '2026-02-05 10:29:51', '2026-02-05 10:29:51'),
(257, 1, 255, 4, '2026-02-05 10:44:40', '2026-02-05 10:44:40'),
(258, 1, 279, 4, '2026-02-05 10:45:03', '2026-02-05 10:45:03'),
(259, 1, 254, 4, '2026-02-05 10:49:41', '2026-02-05 10:49:41'),
(260, 1, 280, 3, '2026-02-05 09:52:11', '2026-02-05 09:52:19'),
(261, 1, 281, 3, '2026-02-05 09:53:23', '2026-02-05 09:53:28'),
(262, 8, 275, 4, '2026-02-05 10:57:13', '2026-02-05 10:57:13'),
(263, 8, 250, 4, '2026-02-05 10:57:19', '2026-02-05 10:57:19'),
(264, 8, 252, 4, '2026-02-05 10:57:24', '2026-02-05 10:57:24'),
(265, 8, 282, 4, '2026-02-05 10:57:31', '2026-02-05 10:57:31'),
(266, 8, 247, 4, '2026-02-05 11:02:09', '2026-02-05 11:02:09'),
(267, 8, 251, 4, '2026-02-05 11:02:16', '2026-02-05 11:02:16'),
(268, 8, 254, 4, '2026-02-05 11:02:23', '2026-02-05 11:02:23'),
(269, 8, 284, 3, '2026-02-05 10:03:00', '2026-02-05 10:03:03'),
(270, 8, 255, 4, '2026-02-05 11:07:19', '2026-02-05 11:07:19'),
(271, 8, 257, 4, '2026-02-05 11:07:25', '2026-02-05 11:07:25'),
(272, 8, 278, 4, '2026-02-05 11:08:19', '2026-02-05 11:08:19'),
(273, 8, 258, 4, '2026-02-05 11:08:38', '2026-02-05 11:08:38'),
(274, 8, 259, 4, '2026-02-05 11:12:47', '2026-02-05 11:12:47'),
(275, 8, 259, 4, '2026-02-05 11:13:35', '2026-02-05 11:13:35'),
(276, 8, 285, 3, '2026-02-05 10:32:49', '2026-02-05 10:32:52'),
(277, 8, 286, 3, '2026-02-05 10:48:56', '2026-02-05 10:49:00'),
(278, 1, 257, 4, '2026-02-05 11:49:22', '2026-02-05 11:49:22'),
(279, 8, 287, 4, '2026-02-05 11:51:33', '2026-02-05 11:51:33'),
(280, 8, 263, 4, '2026-02-05 11:54:12', '2026-02-05 11:54:12'),
(281, 8, 264, 4, '2026-02-05 11:55:14', '2026-02-05 11:55:14'),
(282, 8, 242, 4, '2026-02-05 12:06:22', '2026-02-05 12:06:22');

-- --------------------------------------------------------

--
-- Table structure for table `driver_tutorials`
--

CREATE TABLE `driver_tutorials` (
  `id` int(11) NOT NULL,
  `title` varchar(250) NOT NULL,
  `description` text NOT NULL,
  `title_ar` varchar(150) DEFAULT NULL,
  `description_ar` text DEFAULT NULL,
  `file` text NOT NULL,
  `thumbnail_image` varchar(250) NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `driver_tutorials`
--

INSERT INTO `driver_tutorials` (`id`, `title`, `description`, `title_ar`, `description_ar`, `file`, `thumbnail_image`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Driver Training Pro: Master the Roads', 'Welcome to Driver Training Pro, your ultimate companion for becoming a skilled and confident driver. Whether you’re a novice or looking to enhance your skills, our app offers comprehensive training modules tailored to all levels.', 'تدريب السائقين برو: السيطرة على الطريق', 'مرحبًا بك في Driver Training Pro، رفيقك المثالي لتصبح سائقًا ماهرًا وواثقًا. سواء كنت مبتدئًا أو تتطلع إلى تحسين مهاراتك، يقدم تطبيقنا وحدات تدريبية شاملة مصممة خصيصًا لجميع المستويات.', 'file/362f9dc9271cfc88db76d532040b5d7e.mp4', 'image/9c03babee0c1e040d3a4e95045057661.jpeg', 1, '2024-08-07 17:30:24', '2025-10-28 15:04:06'),
(3, 'DriveSmart Academy: Comprehensive Driver Training', 'Welcome to DriveSmart Academy, the all-in-one app designed to transform you into a confident and knowledgeable driver. Our innovative platform provides comprehensive training that caters to beginners and experienced drivers alike, ensuring you gain the skills needed to navigate the roads safely.', 'أكاديمية DriveSmart: تدريب شامل للسائقين', 'مرحبًا بك في DriveSmart Academy، التطبيق الشامل المصمم لتحويلك إلى سائق واثق ومطلع. توفر منصتنا المبتكرة تدريبًا شاملاً يلبي احتياجات السائقين المبتدئين وذوي الخبرة على حدٍ سواء، مما يضمن اكتسابك المهارات اللازمة للتنقل على الطرق بأمان.', 'file/9362f496f6b18f6c5f118520271632e1.mp4', 'image/c3291a28bebf4c3dc6126600666a1113.jpeg', 1, '2024-11-12 18:33:51', '2025-02-01 15:46:27'),
(4, 'DriveSmart Academy: Your Ultimate Driver Training Solution', 'Welcome to DriveSmart Academy, the revolutionary mobile app designed to equip drivers with essential skills and knowledge for safe and responsible driving. Whether you\'re a novice just getting behind the wheel or an experienced driver looking to sharpen your skills, our app provides an extensive array of training resources tailored to meet your needs.', 'أكاديمية DriveSmart: الحل الأمثل لتدريب السائقين', 'مرحبًا بك في DriveSmart Academy، تطبيق الهاتف المحمول الثوري المصمم لتزويد السائقين بالمهارات والمعرفة الأساسية للقيادة الآمنة والمسؤولة. سواء كنت مبتدئًا خلف عجلة القيادة أو سائقًا ذو خبرة تتطلع إلى صقل مهاراتك، فإن تطبيقنا يوفر مجموعة واسعة من موارد التدريب المصممة خصيصًا لتلبية احتياجاتك.', 'file/447a83c4a39cc54c2215e2853b5d2aa3.mp4', 'image/bd0dacaa8f400648c78cfa708ba776be.jpeg', 1, '2024-11-12 18:34:12', '2025-02-01 15:47:07'),
(5, 'DriveWise: Elevate Your Driving Skills', 'Welcome to DriveWise, the premier mobile app designed to revolutionize driver training. Whether you\'re a first-time driver or looking to enhance your skills, DriveWise offers a comprehensive training program that ensures you become a confident and safe driver. Our app combines cutting-edge technology, expert guidance, and a supportive community to deliver an unparalleled learning experience.', 'DriveWise: ارفع مهاراتك في القيادة', 'مرحبًا بك في DriveWise، تطبيق الهاتف المحمول الرائد المصمم لإحداث ثورة في تدريب السائقين. سواء كنت سائقًا لأول مرة أو تتطلع إلى تحسين مهاراتك، فإن DriveWise يقدم برنامجًا تدريبيًا شاملاً يضمن لك أن تصبح سائقًا واثقًا وآمنًا. يجمع تطبيقنا بين أحدث التقنيات وتوجيهات الخبراء ومجتمع داعم لتقديم تجربة تعليمية لا مثيل لها.', 'file/8b7531b5a76fec72b61d4fea844da826.mp4', 'image/578ed7db353215bfb7f5ba2412b731ca.jpeg', 1, '2024-11-12 18:34:37', '2025-02-01 15:47:33'),
(7, 'Driver On board Training', 'Get familiar with ride acceptance, navigation, safety guidelines, and earning tips to drive confidently and successfully.', 'تدريب السائقين على متن الطائرة', 'تعرف على قبول الركوب والملاحة وإرشادات السلامة ونصائح الكسب للقيادة بثقة ونجاح.', 'file/75838d9512ad5cda666e8df3aad403b3.mp4', 'image/f009f5c27ee995debccd4f8ec5d13fdd.webp', 1, '2025-08-15 11:30:02', '2025-08-15 11:30:02');

-- --------------------------------------------------------

--
-- Table structure for table `driver_vehicles`
--

CREATE TABLE `driver_vehicles` (
  `id` int(11) NOT NULL,
  `driver_id` int(11) NOT NULL,
  `vehicle_type` int(11) NOT NULL,
  `brand` varchar(250) NOT NULL,
  `color` varchar(250) NOT NULL,
  `vehicle_name` varchar(250) NOT NULL,
  `vehicle_number` varchar(250) NOT NULL,
  `vehicle_image` varchar(250) NOT NULL DEFAULT 'static_images/vehicle_image_icon.png',
  `vehicle_image_status` int(11) NOT NULL DEFAULT 14,
  `vehicle_certificate` varchar(500) NOT NULL DEFAULT 'static_images/vehicle_certificate_icon.png',
  `vehicle_certificate_status` int(11) NOT NULL DEFAULT 14,
  `vehicle_insurance` varchar(500) NOT NULL DEFAULT 'static_images/vehicle_insurance_icon.png',
  `vehicle_insurance_status` int(11) NOT NULL DEFAULT 14,
  `status` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `driver_vehicles`
--

INSERT INTO `driver_vehicles` (`id`, `driver_id`, `vehicle_type`, `brand`, `color`, `vehicle_name`, `vehicle_number`, `vehicle_image`, `vehicle_image_status`, `vehicle_certificate`, `vehicle_certificate_status`, `vehicle_insurance`, `vehicle_insurance_status`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'Maruthi', 'Black', 'Swift', '39373', 'drivers/vehicle_documents/1759731285.png', 16, 'drivers/vehicle_documents/1759731270.png', 16, 'drivers/vehicle_documents/1759731278.png', 16, 1, '2025-10-06 11:44:07', '2025-10-06 11:44:07'),
(2, 3, 1, 'Maruti', 'White', 'Weganar', 'TN64DA3456', 'drivers/vehicle_documents/1760418391.png', 16, 'drivers/vehicle_documents/1760418379.png', 16, 'drivers/vehicle_documents/1760418385.png', 16, 1, '2025-10-14 10:36:01', '2025-10-14 10:36:01'),
(3, 2, 3, '2016', 'Green', 'Kia', 'Sjeosjsbbsh', 'drivers/vehicle_documents/1760617146.png', 16, 'drivers/vehicle_documents/1760617110.png', 16, 'drivers/vehicle_documents/1760617130.png', 16, 1, '2025-10-16 17:47:28', '2025-10-16 17:47:28'),
(4, 4, 3, 'BMW', 'Black', 'BMW IX', 'KDC580K', 'static_images/vehicle_image_icon.png', 14, 'static_images/vehicle_certificate_icon.png', 14, 'static_images/vehicle_insurance_icon.png', 14, 1, '2025-10-22 15:45:54', '2025-10-22 15:45:54'),
(5, 5, 1, 'Maruti', 'White', 'Weganar', 'TN64AG23', 'drivers/vehicle_documents/1761226982.png', 16, 'drivers/vehicle_documents/1761226972.png', 16, 'drivers/vehicle_documents/1761226977.png', 16, 1, '2025-10-23 19:12:39', '2025-10-23 19:12:39'),
(6, 6, 1, 'Maruti', 'White', 'Weganar', 'TN64AG23', 'drivers/vehicle_documents/1761540506.png', 16, 'drivers/vehicle_documents/1761540496.png', 16, 'drivers/vehicle_documents/1761540501.png', 16, 1, '2025-10-27 10:16:39', '2025-10-27 10:16:39'),
(7, 7, 1, 'Maruti', 'White', 'Weganar', 'TN64AG78', 'drivers/vehicle_documents/1761562499.png', 16, 'drivers/vehicle_documents/1761562484.png', 16, 'drivers/vehicle_documents/1761562491.png', 16, 1, '2025-10-27 16:24:31', '2025-10-27 16:24:31'),
(8, 8, 1, 'Maruthi', 'Black', 'Swift', '3000', 'drivers/vehicle_documents/1761633679.png', 16, 'drivers/vehicle_documents/1761633674.png', 16, 'drivers/vehicle_documents/1761633684.png', 16, 1, '2025-10-28 12:10:58', '2025-10-28 12:10:58'),
(9, 9, 1, 'Maruti', 'White', 'Weganar', 'TN58AH1234', 'drivers/vehicle_documents/1761637330.png', 16, 'drivers/vehicle_documents/1761637315.png', 16, 'drivers/vehicle_documents/1761637322.png', 16, 1, '2025-10-28 13:11:35', '2025-10-28 13:11:35'),
(10, 10, 1, 'Maruti', 'White', 'Weganar', 'TN64AG7637', 'drivers/vehicle_documents/1762155141.png', 16, 'drivers/vehicle_documents/1762155109.png', 16, 'drivers/vehicle_documents/1762155129.png', 16, 1, '2025-11-03 13:01:19', '2025-11-03 13:01:19'),
(11, 11, 2, 'Kia', 'Green', 'Kia', '8766902', 'drivers/vehicle_documents/1764738208.png', 16, 'drivers/vehicle_documents/1764738181.png', 16, 'drivers/vehicle_documents/1764738193.png', 16, 1, '2025-12-03 10:32:04', '2025-12-03 10:32:04'),
(12, 12, 1, 'Tyu', 'Green', 'G', '677888', 'drivers/vehicle_documents/1765794178.png', 16, 'drivers/vehicle_documents/1765794042.png', 16, 'drivers/vehicle_documents/1765794168.png', 16, 1, '2025-12-15 15:49:36', '2025-12-15 15:49:36'),
(13, 13, 1, 'Maruti', 'White', 'Weganar', 'TN58SE2315', 'drivers/vehicle_documents/1770206629.png', 15, 'drivers/vehicle_documents/1770206611.png', 15, 'drivers/vehicle_documents/1770206619.png', 15, 1, '2026-02-04 17:32:20', '2026-02-04 17:32:20');

-- --------------------------------------------------------

--
-- Table structure for table `driver_wallet_histories`
--

CREATE TABLE `driver_wallet_histories` (
  `id` int(11) NOT NULL,
  `driver_id` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `message` varchar(250) NOT NULL,
  `message_ar` varchar(250) DEFAULT NULL,
  `amount` double NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `driver_wallet_histories`
--

INSERT INTO `driver_wallet_histories` (`id`, `driver_id`, `type`, `message`, `message_ar`, `amount`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 'debited from your account for the booking 1', 'إ ل سابك للط 1', 2.96, '2025-10-06 11:46:57', '2025-10-06 11:46:57'),
(2, 1, 1, 'Added to wallet', 'تمت إضافه إلى المحظة', 1000, '2025-10-06 11:49:11', '2025-10-06 11:49:11'),
(3, 3, 2, 'debited from your account for the booking 2', 'إ ل سابك للط 2', 2.49, '2025-10-14 10:45:56', '2025-10-14 10:45:56'),
(4, 3, 1, 'Added to wallet', 'تمت إضافته إلى المحفظة', 3000, '2025-10-14 10:46:21', '2025-10-14 10:46:21'),
(5, 3, 2, 'debited from your account for the booking 3', 'إ ل سابك للط 3', 1.83, '2025-10-14 10:48:02', '2025-10-14 10:48:02'),
(6, 3, 2, 'debited from your account for the booking 4', 'إ ل سابك للط 4', 9.75, '2025-10-14 15:29:17', '2025-10-14 15:29:17'),
(7, 3, 2, 'debited from your account for the booking 5', 'إ ل سابك للط 5', 2.08, '2025-10-14 15:54:24', '2025-10-14 15:54:24'),
(8, 1, 2, 'debited from your account for the booking 6', 'إ ل سابك للط 6', 3.23, '2025-10-17 15:15:53', '2025-10-17 15:15:53'),
(9, 1, 2, 'debited from your account for the booking 7', 'إ ل سابك للط 7', 4, '2025-10-22 11:43:22', '2025-10-22 11:43:22'),
(10, 1, 2, 'debited from your account for the booking 8', 'إ ل سابك للط 8', 2.91, '2025-10-22 14:53:39', '2025-10-22 14:53:39'),
(11, 3, 2, 'debited from your account for the booking 15', 'إ ل سابك للط 15', 2.47, '2025-10-23 16:03:22', '2025-10-23 16:03:22'),
(12, 3, 2, 'debited from your account for the booking 18', 'إ ل سابك للط 18', 2.47, '2025-10-23 16:24:29', '2025-10-23 16:24:29'),
(13, 5, 2, 'debited from your account for the booking 30', 'إ ل سابك للط 30', 2.49, '2025-10-25 18:47:51', '2025-10-25 18:47:51'),
(14, 1, 2, 'debited from your account for the booking 31', 'إ ل سابك للط 31', 4.22, '2025-10-26 00:51:45', '2025-10-26 00:51:45'),
(15, 6, 1, 'Added to wallet', 'تمت إضافته إلى المحفظة', 4000, '2025-10-27 10:21:22', '2025-10-27 10:21:22'),
(16, 1, 2, 'debited from your account for the booking 34', 'إ ل سابك للط 34', 2.49, '2025-10-27 11:21:07', '2025-10-27 11:21:07'),
(17, 1, 2, 'debited from your account for the booking 35', 'إ ل سابك للط 35', 2.49, '2025-10-27 11:48:09', '2025-10-27 11:48:09'),
(18, 6, 2, 'debited from your account for the booking 40', 'إ ل سابك للط 40', 3.79, '2025-10-27 14:06:06', '2025-10-27 14:06:06'),
(19, 6, 2, 'debited from your account for the booking 42', 'إ ل سابك للط 42', 2.75, '2025-10-27 14:21:22', '2025-10-27 14:21:22'),
(20, 6, 2, 'debited from your account for the booking 44', 'إ ل سابك للط 44', 3.72, '2025-10-27 14:27:39', '2025-10-27 14:27:39'),
(21, 5, 2, 'debited from your account for the booking 45', 'إ ل سابك للط 45', 4.46, '2025-10-27 14:38:21', '2025-10-27 14:38:21'),
(22, 3, 2, 'debited from your account for the booking 46', 'إ ل سابك للط 46', 4.46, '2025-10-27 14:38:32', '2025-10-27 14:38:32'),
(23, 1, 2, 'debited from your account for the booking 47', 'إ ل سابك للط 47', 4.21, '2025-10-27 14:39:25', '2025-10-27 14:39:25'),
(24, 5, 1, 'Added to wallet', 'تمت إضافته إلى المحفظة', 1000, '2025-10-27 14:40:43', '2025-10-27 14:40:43'),
(25, 1, 2, 'debited from your account for the booking 48', 'إ ل سابك للط 48', 2.88, '2025-10-27 14:42:39', '2025-10-27 14:42:39'),
(26, 6, 2, 'debited from your account for the booking 49', 'إ ل سابك للط 49', 2.49, '2025-10-27 14:49:04', '2025-10-27 14:49:04'),
(27, 1, 2, 'debited from your account for the booking 50', 'إ ل سابك للط 50', 2.37, '2025-10-27 15:01:48', '2025-10-27 15:01:48'),
(28, 1, 2, 'debited from your account for the booking 52', 'إ ل سابك للط 52', 2.76, '2025-10-27 15:06:09', '2025-10-27 15:06:09'),
(29, 6, 2, 'debited from your account for the booking 51', 'إ ل سابك للط 51', 4.46, '2025-10-27 15:11:27', '2025-10-27 15:11:27'),
(30, 6, 2, 'debited from your account for the booking 53', 'إ ل سابك للط 53', 4.46, '2025-10-27 15:30:50', '2025-10-27 15:30:50'),
(31, 6, 2, 'debited from your account for the booking 54', 'إ ل سابك للط 54', 2.87, '2025-10-27 16:05:37', '2025-10-27 16:05:37'),
(32, 7, 2, 'debited from your account for the booking 55', 'إ ل سابك للط 55', 4.46, '2025-10-27 16:26:22', '2025-10-27 16:26:22'),
(33, 7, 2, 'debited from your account for the booking 56', 'إ ل سابك للط 56', 2.49, '2025-10-27 17:19:51', '2025-10-27 17:19:51'),
(34, 7, 2, 'debited from your account for the booking 57', 'إ ل سابك للط 57', 2.49, '2025-10-27 17:32:00', '2025-10-27 17:32:00'),
(35, 7, 2, 'debited from your account for the booking 59', 'إ ل سابك للط 59', 4.46, '2025-10-27 17:58:59', '2025-10-27 17:58:59'),
(36, 1, 2, 'debited from your account for the booking 60', 'إ ل سابك للط 60', 4.46, '2025-10-28 10:54:52', '2025-10-28 10:54:52'),
(37, 1, 2, 'debited from your account for the booking 61', 'إ ل سابك للط 61', 2.49, '2025-10-28 11:00:21', '2025-10-28 11:00:21'),
(38, 1, 2, 'debited from your account for the booking 62', 'إ ل سابك للط 62', 4.46, '2025-10-28 11:18:51', '2025-10-28 11:18:51'),
(39, 1, 2, 'debited from your account for the booking 63', 'إ ل سابك للط 63', 4.39, '2025-10-28 11:38:07', '2025-10-28 11:38:07'),
(40, 1, 2, 'debited from your account for the booking 64', 'إ ل سابك للط 64', 2.56, '2025-10-28 11:49:58', '2025-10-28 11:49:58'),
(41, 1, 2, 'debited from your account for the booking 65', 'إ ل سابك للط 65', 2.56, '2025-10-28 12:22:11', '2025-10-28 12:22:11'),
(42, 1, 2, 'debited from your account for the booking 66', 'إ ل سابك للط 66', 3.03, '2025-10-28 12:50:00', '2025-10-28 12:50:00'),
(43, 1, 2, 'debited from your account for the booking 67', 'إ ل سابك للط 67', 2.49, '2025-10-28 12:52:26', '2025-10-28 12:52:26'),
(44, 9, 2, 'debited from your account for the booking 68', 'إ ل سابك للط 68', 4.46, '2025-10-28 13:14:25', '2025-10-28 13:14:25'),
(45, 9, 1, 'Added to wallet', 'تمت إضافته إلى المحفظة', 4000, '2025-10-28 13:15:20', '2025-10-28 13:15:20'),
(46, 9, 2, 'debited from your account for the booking 69', 'إ ل سابك للط 69', 4.46, '2025-10-28 14:25:54', '2025-10-28 14:25:54'),
(47, 9, 2, 'debited from your account for the booking 70', 'إ ل سابك للط 70', 4.39, '2025-10-28 14:27:14', '2025-10-28 14:27:14'),
(48, 10, 1, 'Added to wallet', 'تمت إضافته إلى المحفظة', 3000, '2025-11-03 13:05:23', '2025-11-03 13:05:23'),
(49, 10, 2, 'debited from your account for the booking 71', 'إ ل سابك للط 71', 4.46, '2025-11-03 13:08:01', '2025-11-03 13:08:01'),
(50, 10, 2, 'debited from your account for the booking 72', 'إ ل سابك للط 72', 2.49, '2025-11-03 13:40:11', '2025-11-03 13:40:11'),
(51, 1, 2, 'debited from your account for the booking 73', 'إ ل سابك للط 73', 2.16, '2025-12-05 14:48:49', '2025-12-05 14:48:49'),
(52, 11, 2, 'debited from your account for the booking 74', 'إ ل سابك للط 74', 46.41, '2025-12-08 10:15:31', '2025-12-08 10:15:31'),
(53, 11, 2, 'debited from your account for the booking 75', 'إ ل سابك للط 75', 50.58, '2025-12-08 10:49:20', '2025-12-08 10:49:20'),
(54, 1, 2, 'debited from your account for the booking 76', 'إ ل سابك للط 76', 2.7, '2025-12-15 12:44:45', '2025-12-15 12:44:45'),
(55, 1, 2, 'debited from your account for the booking 77', 'إ ل سابك للط 77', 2.78, '2025-12-15 13:20:40', '2025-12-15 13:20:40'),
(56, 12, 2, 'debited from your account for the booking 82', 'إ ل سابك للط 82', 6.48, '2025-12-16 19:53:40', '2025-12-16 19:53:40'),
(57, 12, 2, 'debited from your account for the booking 84', 'إ ل سابك للط 84', 2.8, '2025-12-17 13:56:53', '2025-12-17 13:56:53'),
(58, 12, 2, 'debited from your account for the booking 87', 'إ ل سابك للط 87', 26.19, '2025-12-17 15:28:23', '2025-12-17 15:28:23'),
(59, 12, 2, 'debited from your account for the booking 88', 'إ ل سابك للط 88', 2.81, '2025-12-17 15:50:12', '2025-12-17 15:50:12'),
(60, 12, 2, 'debited from your account for the booking 89', 'إ ل سابك للط 89', 26.19, '2025-12-17 17:24:24', '2025-12-17 17:24:24'),
(61, 12, 2, 'debited from your account for the booking 91', 'إ ل سابك للط 91', 4.68, '2025-12-17 17:31:24', '2025-12-17 17:31:24'),
(62, 12, 2, 'debited from your account for the booking 92', 'إ ل سابك للط 92', 4.11, '2025-12-17 17:33:51', '2025-12-17 17:33:51'),
(63, 12, 2, 'debited from your account for the booking 93', 'إ ل سابك للط 93', 3.21, '2025-12-19 10:57:28', '2025-12-19 10:57:28'),
(64, 1, 2, 'debited from your account for the booking 94', 'إ ل سابك للط 94', 4.96, '2025-12-19 12:43:21', '2025-12-19 12:43:21'),
(65, 1, 2, 'debited from your account for the booking 96', 'إ ل سابك للط 96', 2.54, '2025-12-22 12:10:41', '2025-12-22 12:10:41'),
(66, 1, 2, 'debited from your account for the booking 97', 'إ ل سابك للط 97', 3.29, '2025-12-29 13:01:46', '2025-12-29 13:01:46'),
(67, 1, 2, 'debited from your account for the booking 100', 'إ ل سابك للط 100', 2.51, '2025-12-29 15:03:44', '2025-12-29 15:03:44'),
(68, 1, 2, 'debited from your account for the booking 102', 'إ ل سابك للط 102', 2.06, '2025-12-31 11:15:28', '2025-12-31 11:15:28'),
(69, 1, 2, 'debited from your account for the booking 103', 'إ ل سابك للط 103', 2.06, '2025-12-31 12:55:45', '2025-12-31 12:55:45'),
(70, 1, 2, 'debited from your account for the booking 113', 'إ ل سابك للط 113', 1.03, '2025-12-31 17:39:44', '2025-12-31 17:39:44'),
(71, 1, 2, 'debited from your account for the booking 114', 'إ ل سابك للط 114', 2.62, '2026-01-01 14:10:06', '2026-01-01 14:10:06'),
(72, 1, 2, 'debited from your account for the booking 117', 'إ ل سابك للط 117', 2.62, '2026-01-02 12:13:43', '2026-01-02 12:13:43'),
(73, 1, 2, 'debited from your account for the booking 119', 'إ ل سابك للط 119', 2.49, '2026-01-02 13:11:05', '2026-01-02 13:11:05'),
(74, 1, 2, 'debited from your account for the booking 120', 'إ ل سابك للط 120', 2.65, '2026-01-02 18:17:35', '2026-01-02 18:17:35'),
(75, 1, 2, 'debited from your account for the booking 121', 'إ ل سابك للط 121', 2.06, '2026-01-21 11:18:44', '2026-01-21 11:18:44'),
(76, 1, 2, 'debited from your account for the booking 122', 'إ ل سابك للط 122', 2.13, '2026-01-28 14:14:20', '2026-01-28 14:14:20'),
(77, 1, 2, 'debited from your account for the booking 123', 'إ ل سابك للط 123', 2.13, '2026-01-30 12:30:27', '2026-01-30 12:30:27'),
(78, 1, 2, 'debited from your account for the booking 124', 'إ ل سابك للط 124', 2.31, '2026-01-30 17:37:13', '2026-01-30 17:37:13'),
(79, 1, 2, 'debited from your account for the booking 124', 'إ ل سابك للط 124', 2.31, '2026-01-30 17:37:14', '2026-01-30 17:37:14'),
(80, 1, 1, 'Added to wallet', 'تمت إضافه إلى المحظة', 542, '2026-01-31 13:52:03', '2026-01-31 13:52:03'),
(81, 1, 2, 'debited from your account for the booking 125', 'إ ل سابك للط 125', 2.66, '2026-02-03 17:32:23', '2026-02-03 17:32:23'),
(82, 1, 2, 'debited from your account for the booking 126', 'إ ل سابك للط 126', 2.13, '2026-02-04 16:15:27', '2026-02-04 16:15:27'),
(83, 1, 1, 'credited to your account for the booking 127', 'ضة  اب لطل 127', 16.59, '2026-02-04 15:56:03', '2026-02-04 15:56:03'),
(84, 1, 2, 'debited from your account for the booking 130', 'إ ل سابك للط 130', 2.06, '2026-02-05 06:27:16', '2026-02-05 06:27:16'),
(85, 1, 1, 'credited to your account for the booking 136', 'ضة  اب لطل 136', 16.34, '2026-02-05 08:08:32', '2026-02-05 08:08:32'),
(86, 1, 1, 'credited to your account for the booking 139', 'ضة  اب لطل 139', 16.34, '2026-02-05 08:39:26', '2026-02-05 08:39:26'),
(87, 1, 1, 'credited to your account for the booking 139', 'ضة  اب لطل 139', 16.34, '2026-02-05 09:06:01', '2026-02-05 09:06:01'),
(88, 3, 2, 'debited from your account for the booking 138', 'إ ل سابك للط 138', 2.26, '2026-02-05 09:08:45', '2026-02-05 09:08:45'),
(89, 1, 2, 'debited from your account for the booking 145', 'إ ل سابك للط 145', 2.54, '2026-02-05 10:54:22', '2026-02-05 10:54:22'),
(90, 8, 1, 'credited to your account for the booking 147', 'ضة  اب لطل 147', 14, '2026-02-05 11:48:37', '2026-02-05 11:48:37'),
(91, 8, 1, 'credited to your account for the booking 148', 'ضة  اب لطل 148', 14, '2026-02-05 11:49:52', '2026-02-05 11:49:52');

-- --------------------------------------------------------

--
-- Table structure for table `driver_withdrawals`
--

CREATE TABLE `driver_withdrawals` (
  `id` int(11) NOT NULL,
  `driver_id` int(11) NOT NULL,
  `amount` double NOT NULL,
  `reference_proof` varchar(200) DEFAULT NULL,
  `reference_no` text DEFAULT NULL,
  `existing_wallet` double NOT NULL DEFAULT 0,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `driver_withdrawals`
--

INSERT INTO `driver_withdrawals` (`id`, `driver_id`, `amount`, `reference_proof`, `reference_no`, `existing_wallet`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 10, NULL, NULL, 0, 11, '2025-10-27 11:02:48', '2025-10-27 11:02:48');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `faqs`
--

CREATE TABLE `faqs` (
  `id` int(11) NOT NULL,
  `user_type_id` int(11) NOT NULL,
  `question` varchar(250) NOT NULL,
  `answer` text NOT NULL,
  `question_ar` varchar(250) DEFAULT NULL,
  `answer_ar` text DEFAULT NULL,
  `status` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `faqs`
--

INSERT INTO `faqs` (`id`, `user_type_id`, `question`, `answer`, `question_ar`, `answer_ar`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'What is cancellation fee?', 'In Taxi2Door we appreciate the partners’ time and, thus, we always compensate the time spent on the road to the passenger if the trip never took place. In that case, user can be charged with a volume of 40 USD, if: -you cancelled trip more than 5 minutes after you have accepted the request -you are late for more than 5 minutes after driver has arrived at the pickup location, and you didn’t contact the driver to let him know about your delay User doesn’t charged a cancellation fee, if: -you cancelled trip during first 5 minutes after making request -driver is late for more than 5 minutes (after ETA, which you’ve accepted while made request) Mention that if you are late, you can notify driver that you are late via call or sms.', 'ما هي رسوم الإلغاء؟', 'في Taxi2Door نقدر وقت الشركاء ، وبالتالي ، فإننا نعوض دائمًا الوقت الذي يقضيه الراكب على الطريق إذا لم تحدث الرحلة مطلقًا. في هذه الحالة ، يمكن تحميل المستخدم مبلغ 40 دولارًا أمريكيًا ، إذا: - ألغيت الرحلة بعد أكثر من 5 دقائق من قبولك للطلب - تأخرت لأكثر من 5 دقائق بعد وصول السائق إلى موقع الالتقاء ، و لم تتصل بالسائق لإخباره بالتأخير الذي أجريته ، لم يتقاضى المستخدم رسوم إلغاء ، إذا: - ألغيت الرحلة خلال أول 5 دقائق بعد تقديم الطلب - تأخر السائق لأكثر من 5 دقائق (بعد ETA ، والتي لقد قبلت أثناء تقديم الطلب) اذكر أنه إذا تأخرت ، يمكنك إخطار السائق بأنك تأخرت عن طريق الاتصال أو الرسائل القصيرة.', 1, '2021-03-01 10:00:28', '2025-02-01 15:48:22'),
(2, 1, 'How to change language settings of the app?', 'Taxi2Door automatically sets the language based on the language settings of your device, so in order to change the language of the application, you should change the language settings of your smartphone.', 'كيفية تغيير إعدادات لغة التطبيق؟', 'يضبط تطبيق Taxi2Door اللغة تلقائيًا بناءً على إعدادات اللغة بجهازك ، لذلك لتغيير لغة التطبيق ، يجب عليك تغيير إعدادات اللغة بهاتفك الذكي.', 1, '2021-03-01 10:01:18', '2025-02-01 15:48:33'),
(3, 1, 'Do you provide self drive cars?', 'Sorry, we do not provide self-drive cars. Our driver drives up to your doorstep with the vehicle and drives you around during your entire journey.', 'هل تقدمون سيارات ذاتية القيادة؟', 'عذرا ، نحن لا نقدم سيارات ذاتية القيادة. سائقنا يقود سيارتك حتى عتبة داركم بالسيارة ويقودك خلال رحلتك بأكملها.', 1, '2021-03-01 10:02:09', '2021-03-06 07:16:07'),
(4, 1, 'What if my cab shows up late?', 'We are proud of our on-time performance but sometimes delays do happen. If the nature of your booking is time-sensative ...involving an airport pickup/drop or meeting at your destination, please budget for additional travel time (usually add 30mins for traffic delays for every 2 hours of estimated travel time) and also let us know of this as a special request when making your reservation. We will make additional efforts to ensure that we\'re vigilant and ensure a safe & punctual transit for you. if for any case, your cab is delayed and you have to cancel your reservation we will issue a full refund of any payment that you may have made in the form of advance towards the taxi reservation', 'ماذا لو تأخرت سيارتي؟', 'نحن فخورون بأدائنا في الوقت المحدد ولكن في بعض الأحيان يحدث تأخير. إذا كانت طبيعة حجزك حساسة للوقت ... بما في ذلك النقل من المطار / النزول أو الاجتماع في وجهتك ، فالرجاء تخصيص ميزانية لوقت السفر الإضافي (عادةً ما تضيف 30 دقيقة لتأخير حركة المرور لكل ساعتين من وقت السفر المقدر) وكذلك السماح نحن نعرف هذا كطلب خاص عند إجراء الحجز الخاص بك. سنبذل جهودًا إضافية للتأكد من أننا يقظين ونضمن لك عبورًا آمنًا ودقيقًا. إذا تأخرت سيارة الأجرة الخاصة بك على أي حال وكان عليك إلغاء الحجز الخاص بك ، فسنقوم بإرجاع كامل المبلغ المدفوع الذي ربما تكون قد سددته في شكل مقدم تجاه حجز سيارة الأجرة', 1, '2021-03-01 10:03:20', '2021-03-06 07:16:43'),
(5, 1, 'What if the cab breaks down during the journey?', 'All our taxi\'s are regularly inspected along over 30 different points. However, breakdowns cannot be anticipated and do happen. In those cases, we expediently arrange a backup cab to ensure that your travel plans continue uninterrupted and with the least possible delay.', NULL, NULL, 1, '2021-03-01 10:04:00', '2021-03-01 10:04:00'),
(6, 1, 'Do you provide an English-speaking driver?', 'We do try our best to provide a English speaking driver if the request is received on your booking under the additional requests section ahead of time. This is generally subject to availability of a English-speaking driver. If you are not a resident of the region, we suggest that you install Google Translate on your phone. Using the apps voice transcription features, you can speak in your native language and the app would translate it into spoken words of the language of your choice.', NULL, NULL, 1, '2021-03-01 10:04:46', '2021-03-01 10:04:46'),
(7, 1, 'How can I get a bill/receipt for my trip?', 'Invoices are automatically generated and sent to you by email for every trip that you complete with us.', NULL, NULL, 1, '2021-03-01 10:05:32', '2021-03-01 10:05:32'),
(8, 2, 'how to enter or change my destinations?', 'You will need to enter your destination before confirming your booking. You can do this by: Entering the address in the ‘destination’ field at the top of the screen. You can also change your destination during your ride by: Clicking ‘Edit’ and entering the correct destination', 'كيف أدخل وجهتي أو أغيرها', 'ستحتاج إلى إدخال وجهتك قبل تأكيد حجزك. يمكنك القيام بذلك عن طريق: إدخال العنوان في حقل \"الوجهة\" أعلى الشاشة. يمكنك أيضًا تغيير وجهتك أثناء رحلتك عن طريق: النقر على \"تعديل\" وإدخال الوجهة الصحيحة', 1, '2021-03-01 10:09:21', '2023-06-19 11:47:33'),
(9, 2, 'how to track your ride?', 'Once your booking is confirmed, you’ll be able to track your ride and see the following details on your app in real time: Your driver’s ETA and current location. The driver’s route to your pick-up address. The entire route of your ride.', 'كيفية تتبع رحلتك', 'بمجرد تأكيد حجزك ، ستتمكن من تتبع رحلتك والاطلاع على التفاصيل التالية على تطبيقك في الوقت الفعلي: الوقت المقدر للسائق والموقع الحالي. طريق السائق إلى عنوان سيارتك. المسار الكامل لرحلتك.', 1, '2021-03-01 10:10:06', '2023-06-19 11:47:51'),
(10, 2, 'how to rate our ride?', 'Ratings enable us to ensure both our riders and drivers are having a great experience using Taxi2Door. You’ll always be prompted to rate your driver after you take a ride with us. Once you reach your destination, a notification will appear that will prompt you to rate your driver. You’ll be able to rate your ride from 1 to 5 stars. Select certain fields about the ride and provide specific details.', 'كيف تقيم رحلتنا', 'تمكننا التقييمات من ضمان تمتع كل من ركابنا وسائقينا بتجربة رائعة باستخدام OlaTaxi2Door ستتم مطالبتك دائمًا بتقييم سائقك بعد أن تأخذ مشوارًا معنا. بمجرد وصولك إلى وجهتك ، سيظهر إشعار يطالبك بتقييم سائقك. ستتمكن من تقييم رحلتك من نجمة إلى 5 نجوم. حدد حقولًا معينة حول الرحلة وقدم تفاصيل محددة.', 1, '2021-03-01 10:10:54', '2025-02-01 15:49:10'),
(11, 1, 'What is cancellation fee?', 'In Taxi2Door we appreciate the partners’ time and, thus, we always compensate the time spent on the road to the passenger if the trip never took place. In that case, user can be charged with a volume of 40 USD, if: -you cancelled trip more than 5 minutes after you have accepted the request -you are late for more than 5 minutes after driver has arrived at the pickup location, and you didn’t contact the driver to let him know about your delay User doesn’t charged a cancellation fee, if: -you cancelled trip during first 5 minutes after making request -driver is late for more than 5 minutes (after ETA, which you’ve accepted while made request) Mention that if you are late, you can notify driver that you are late via call or sms.', 'ما هي رسوم الإلغاء؟', 'في Taxi2Door نقدر وقت الشركاء ، وبالتالي ، فإننا نعوض دائمًا الوقت الذي يقضيه الراكب على الطريق إذا لم تحدث الرحلة مطلقًا. في هذه الحالة ، يمكن تحميل المستخدم مبلغ 40 دولارًا أمريكيًا ، إذا: - ألغيت الرحلة بعد أكثر من 5 دقائق من قبولك للطلب - تأخرت لأكثر من 5 دقائق بعد وصول السائق إلى موقع الالتقاء ، و لم تتصل بالسائق لإخباره بالتأخير الذي أجريته ، لم يتقاضى المستخدم رسوم إلغاء ، إذا: - ألغيت الرحلة خلال أول 5 دقائق بعد تقديم الطلب - تأخر السائق لأكثر من 5 دقائق (بعد ETA ، والتي لقد قبلت أثناء تقديم الطلب) اذكر أنه إذا تأخرت ، يمكنك إخطار السائق بأنك تأخرت عن طريق الاتصال أو الرسائل القصيرة.', 1, '2021-05-15 09:16:22', '2025-02-01 15:49:25'),
(12, 1, 'How to change language settings of the app?', 'Taxi2Door  app automatically sets the language based on the language settings of your device, so in order to change the language of the application, you should change the language settings of your smartphone.', 'كيفية تغيير إعدادات لغة التطبيق؟', 'يضبط تطبيق Taxi2Door اللغة تلقائيًا بناءً على إعدادات اللغة بجهازك ، لذلك لتغيير لغة التطبيق ، يجب عليك تغيير إعدادات اللغة بهاتفك الذكي.', 1, '2021-05-15 09:17:47', '2025-02-01 15:49:38'),
(13, 1, 'Do you provide self drive cars?', 'Sorry, we do not provide self-drive cars. Our driver drives up to your doorstep with the vehicle and drives you around during your entire journey.', 'هل تقدمون سيارات ذاتية القيادة؟', 'عذرا ، نحن لا نقدم سيارات ذاتية القيادة. سائقنا يقود سيارتك حتى عتبة داركم بالسيارة ويقودك خلال رحلتك بأكملها.', 1, '2021-05-15 09:18:46', '2022-10-29 04:36:14'),
(14, 2, 'How to enter or change my destinations?', 'You will need to enter your destination before confirming your booking. You can do this by: Entering the address in the ‘destination’ field at the top of the screen. You can also change your destination during your ride by: Clicking ‘Edit’ and entering the correct destination', 'كيف أدخل وجهتي أو أغيرها', 'ستحتاج إلى إدخال وجهتك قبل تأكيد حجزك. يمكنك القيام بذلك عن طريق: إدخال العنوان في حقل \"الوجهة\" أعلى الشاشة. يمكنك أيضًا تغيير وجهتك أثناء رحلتك عن طريق: النقر على \"تعديل\" وإدخال الوجهة الصحيحة', 1, '2021-05-15 09:20:07', '2021-05-18 07:53:23'),
(15, 2, 'How to track your ride?', 'Once your booking is confirmed, you’ll be able to track your ride and see the following details on your app in real time: Your driver’s ETA and current location. The driver’s route to your pick-up address. The entire route of your ride.', 'كيفية تتبع رحلتك', 'بمجرد تأكيد حجزك ، ستتمكن من تتبع رحلتك والاطلاع على التفاصيل التالية على تطبيقك في الوقت الفعلي: الوقت المقدر للسائق والموقع الحالي. طريق السائق إلى عنوان سيارتك. المسار الكامل لرحلتك.', 1, '2021-05-15 09:21:11', '2021-05-18 07:53:33'),
(16, 2, 'How to rate our ride?', 'Ratings enable us to ensure both our riders and drivers are having a great experience using Ola. You’ll always be prompted to rate your driver after you take a ride with us. Once you reach your destination, a notification will appear that will prompt you to rate your driver. You’ll be able to rate your ride from 1 to 5 stars. Select certain fields about the ride and provide specific details.', 'كيف تقيم رحلتنا', 'تمكننا التقييمات من ضمان تمتع كل من ركابنا وسائقينا بتجربة رائعة باستخدام Ola. ستتم مطالبتك دائمًا بتقييم سائقك بعد أن تأخذ مشوارًا معنا. بمجرد وصولك إلى وجهتك ، سيظهر إشعار يطالبك بتقييم سائقك. ستتمكن من تقييم رحلتك من نجمة إلى 5 نجوم. حدد حقولًا معينة حول الرحلة وقدم تفاصيل محددة.', 1, '2021-05-15 09:22:35', '2021-05-18 07:53:44'),
(17, 1, 'What if my cab is canceled?', 'Our operators are monitoring all flights. If there is long time delay we recommend that you let us know.', NULL, NULL, 1, '2023-01-10 13:46:02', '2023-01-10 13:46:02'),
(18, 2, 'How to change language settings of the app?', 'Taxi2Door app automatically sets the language based on the language settings of your device, so in order to change the language of the application, you should change the language settings of your smartphone.', NULL, NULL, 1, '2023-01-10 13:47:10', '2025-02-01 15:49:55'),
(19, 2, 'What if the cab breaks down during the journey?', 'All our taxi\'s are regularly inspected along over 30 different points. However, breakdowns cannot be anticipated and do happen. In those cases, we expediently arrange a backup cab to ensure that your travel plans continue uninterrupted and with the least possible delay.', NULL, NULL, 1, '2023-01-10 13:48:01', '2023-01-10 13:57:01'),
(20, 2, 'How to change language settings of the app?', 'Taxi2Door app automatically sets the language based on the language settings of your device, so in order to change the language of the application, you should change the language settings of your smartphone.', NULL, NULL, 1, '2023-01-10 13:53:38', '2025-02-01 15:50:07'),
(21, 2, 'What if the cab breaks down during the journey?', 'All our taxi\'s are regularly inspected along over 30 different points. However, breakdowns cannot be anticipated and do happen. In those cases, we expediently arrange a backup cab to ensure that your travel plans continue uninterrupted and with the least possible delay.', NULL, NULL, 1, '2023-01-10 13:54:27', '2023-01-10 13:54:27'),
(22, 2, 'Do you provide an English-speaking driver?', 'We do try our best to provide a English speaking driver if the request is received on your booking under the additional requests section ahead of time. This is generally subject to availability of a English-speaking driver. If you are not a resident of the region, we suggest that you install Google Translate on your phone. Using the apps voice transcription features, you can speak in your native language and the app would translate it into spoken words of the language of your choice.', NULL, NULL, 1, '2023-01-10 13:55:40', '2023-01-10 13:55:40'),
(23, 2, 'How can I get a bill/receipt for my trip?', 'Invoices are automatically generated and sent to you by email for every trip that you complete with us.', NULL, NULL, 1, '2023-01-10 13:56:12', '2023-01-10 13:56:12'),
(24, 2, 'Are you comfortable driving long distances?', 'Driving a cab can involve long distances, especially if you work in an area with high demand. Employers ask this question to make sure you’re physically and mentally prepared for the job.', 'هل أنت مرتاح للقيادة لمسافات طويلة؟', 'يمكن أن تنطوي قيادة الكابينة على مسافات طويلة ، خاصة إذا كنت تعمل في منطقة ذات طلب مرتفع. يطرح أصحاب العمل هذا السؤال للتأكد من أنك مستعد جسديًا وعقليًا للوظيفة.', 1, '2023-01-26 17:20:32', '2023-01-26 17:20:32'),
(25, 2, 'Do Provide an example of a time when you went above and beyond for a passenger?', 'In addition to taking the alternate route, I also provided the passenger with information about local attractions and restaurants they could visit if they had more time. This made the ride much more enjoyable and gave the passenger some ideas for future trips.', 'هل تقدم مثالاً على الوقت الذي ذهبت فيه إلى أبعد الحدود للراكب؟', 'بالإضافة إلى اتخاذ المسار البديل ، فقد قدمت أيضًا للركاب معلومات حول مناطق الجذب والمطاعم المحلية التي يمكنهم زيارتها إذا كان لديهم المزيد من الوقت. جعل هذا الركوب أكثر إمتاعًا وأعطى الركاب بعض الأفكار للرحلات المستقبلية.', 1, '2023-01-26 17:23:35', '2023-01-26 17:23:35'),
(26, 2, 'How well can you communicate with people from different cultural backgrounds?', 'As a cab driver, you may have to communicate with people from different cultural backgrounds. Employers ask this question to make sure you can do so effectively and respectfully. In your answer, explain that you are willing to learn about the cultures of others.', 'إلى أي مدى يمكنك التواصل مع أشخاص من خلفيات ثقافية مختلفة؟', 'بصفتك سائق سيارة أجرة ، قد تضطر إلى التواصل مع أشخاص من خلفيات ثقافية مختلفة. يطرح أرباب العمل هذا السؤال للتأكد من أنه يمكنك القيام بذلك بشكل فعال ومحترم. اشرح في إجابتك أنك على استعداد للتعرف على ثقافات الآخرين.', 1, '2023-01-26 17:26:40', '2023-01-26 17:26:40'),
(27, 2, 'Do you have a valid driver’s license and vehicle registration?', 'Yes, I do have a valid driver’s license and vehicle registration. I have been driving professionally for the past five years and have a clean driving record. During this time, I have developed an extensive knowledge of the local roads and traffic patterns. I am also familiar with all relevant laws and regulations regarding cab drivers in my area.', 'هل لديك رخصة قيادة سارية المفعول وتسجيل مركبة؟', 'نعم ، لدي رخصة قيادة سارية المفعول وتسجيل مركبة. لقد كنت أقود السيارة باحتراف على مدى السنوات الخمس الماضية ولدي سجل قيادة نظيف. خلال هذا الوقت ، طورت معرفة واسعة بالطرق المحلية وأنماط حركة المرور. أنا أيضًا على دراية بجميع القوانين واللوائح ذات الصلة فيما يتعلق بسائقي سيارات الأجرة في منطقتي.', 1, '2023-01-26 17:28:46', '2023-01-26 17:28:46'),
(28, 2, 'Describe your process for cleaning your vehicle after each shift?', 'My process for cleaning my vehicle after each shift is thorough and efficient. I start by vacuuming the interior of the car, paying special attention to any spills or messes that may have occurred during the shift. Then, I use a damp cloth with mild soap and water to wipe down all surfaces, including the dashboard, windows, and door handles.', 'صف عمليتك لتنظيف سيارتك بعد كل وردية؟', 'عمليتي لتنظيف سيارتي بعد كل وردية شاملة وفعالة. أبدأ بتنظيف الجزء الداخلي من السيارة ، مع إيلاء اهتمام خاص لأي انسكابات أو عبث قد حدث أثناء التحول. بعد ذلك ، أستخدم قطعة قماش مبللة بالماء والصابون المعتدل لمسح جميع الأسطح ، بما في ذلك لوحة القيادة والنوافذ ومقابض الأبواب.', 1, '2023-01-26 17:30:10', '2023-01-26 17:30:10'),
(29, 1, 'How do you ask a taxi driver?', 'When you call up the taxi company, you can ask to book a taxi at a certain time by saying “May I book a taxi at (time)?” or if you would like one right away', 'كيف تسأل سائق تاكسي؟', 'عند الاتصال بشركة سيارات الأجرة ، يمكنك طلب حجز سيارة أجرة في وقت معين بقول \"هل يمكنني حجز سيارة أجرة في (وقت)؟\" أو إذا كنت ترغب في الحصول على واحدة على الفور', 1, '2023-01-26 18:01:44', '2023-01-26 18:01:44'),
(30, 1, 'What makes a good taxi service?', 'Taxi refers to for-hire automobile travel supplied by private companies. Taxi service is an important Transportation Option that meets a variety of needs, including Basic Mobility in emergencies, general transportation for non-drivers, and mobility for Tourists and visitors.', 'ما الذي يجعل خدمة سيارات الأجرة جيدة؟', 'يشير مصطلح تاكسي إلى السفر بالسيارات للإيجار الذي توفره الشركات الخاصة. تعد خدمة سيارات الأجرة أحد خيارات النقل المهمة التي تلبي مجموعة متنوعة من الاحتياجات ، بما في ذلك التنقل الأساسي في حالات الطوارئ ، والنقل العام لغير السائقين ، والتنقل للسياح والزوار.', 1, '2023-01-26 18:06:12', '2023-01-26 18:06:12'),
(31, 1, 'When will I receive Driver & Cab details?', 'We try to allocate the cab and driver as soon as possible. Please check your reservation confirmation email. In there you find a \"Live booking updates URL\". As soon as your cab and driver are allocated, the details become visible there. In any case, the details are made available to you well ahead of your time of travel', 'متى سأتلقى تفاصيل السائق والكابينة؟', 'نحاول تخصيص الكابينة والسائق في أسرع وقت ممكن. يرجى التحقق من البريد الإلكتروني لتأكيد الحجز الخاص بك. هناك تجد \"عنوان URL لتحديثات الحجز الحية\". بمجرد تخصيص الكابينة والسائق الخاصين بك ، تصبح التفاصيل مرئية هناك. على أي حال ، يتم توفير التفاصيل لك قبل وقت السفر بوقت كاف', 1, '2023-01-26 18:08:10', '2023-01-26 18:08:10'),
(32, 1, 'Does the driver have GPS to track the route?', 'Most of our drivers do use GPS to track the route but it is not implemented compulsorily. But customers can track their route through Google Map as we use that to track locations. Moreover, we have 24*7 customer service over web chat & call, customers can contact us for any doubts they have.', 'هل لدى السائق نظام تحديد المواقع العالمي (GPS) لتتبع المسار؟', 'يستخدم معظم السائقين لدينا نظام تحديد المواقع العالمي (GPS) لتتبع المسار ولكن لا يتم تنفيذه بشكل إلزامي. لكن يمكن للعملاء تتبع مسارهم من خلال خريطة Google حيث نستخدم ذلك لتتبع المواقع. علاوة على ذلك ، لدينا خدمة عملاء على مدار الساعة طوال أيام الأسبوع عبر الدردشة والمكالمات عبر الإنترنت ، ويمكن للعملاء الاتصال بنا لأي شكوك لديهم.', 1, '2023-01-26 18:09:13', '2023-01-26 18:09:13'),
(33, 1, 'What car categories do you provide?', 'Compact - includes models like Indica and Indigo\r\nSedan cars - includes models like Etios, D?zire\r\nFamily cars/SUV - includes models like Xylo, Tavera\r\nFamily Lux/SUV - Innovas\r\nAdditional services like tempo traveller or buses can be arranged upon request, simply call our customer service help line. In many cases, additional requests for a car with carrier will cost extra.', 'ما هي فئات السيارات التي تقدمها؟', 'مدمج - يتضمن طرازات مثل Indica و Indigo\r\nسيارات السيدان - تشمل موديلات مثل Etios و D؟ zire\r\nسيارات عائلية / سيارات الدفع الرباعي - تشمل موديلات مثل Xylo و Tavera\r\nFamily Lux / SUV - Innovas\r\nيمكن ترتيب خدمات إضافية مثل مسافر الإيقاع أو الحافلات عند الطلب ، ما عليك سوى الاتصال بخط مساعدة خدمة العملاء. في كثير من الحالات ، ستكلف الطلبات الإضافية لسيارة مع شركة نقل تكلفة إضافية.', 1, '2023-01-26 18:10:38', '2023-01-26 18:10:38'),
(34, 1, 'Can I book cab by calling customer support?', 'Of course you can do that. Prices for items (products or services) that are ordered with assistance from a team member may be priced slightly higher than the prices on self-service platforms (website or mobile apps). These support facility charges are included in your order price to cover the costs of the support facilities & personnel involved in enabling such orders. Upon cancellation of such (assisted) orders, applicable support facility charges shall not be refunded. These costs are already incurred by us as part of providing the support facilities and hence these charges shall be added to the cancellation charges applicable to your order upon its cancellation.', 'هل يمكنني حجز سيارة أجرة عن طريق الاتصال بدعم العملاء؟', 'بالطبع يمكنك فعل ذلك. قد تكون أسعار العناصر (المنتجات أو الخدمات) التي يتم طلبها بمساعدة أحد أعضاء الفريق أعلى قليلاً من الأسعار على منصات الخدمة الذاتية (موقع الويب أو تطبيقات الأجهزة المحمولة). يتم تضمين رسوم تسهيلات الدعم هذه في سعر الطلب الخاص بك لتغطية تكاليف مرافق الدعم والموظفين المشاركين في تمكين مثل هذه الطلبات. عند إلغاء هذه الطلبات (المساعدة) ، لن يتم رد رسوم مرفق الدعم المعمول بها. لقد تكبدنا هذه التكاليف بالفعل كجزء من توفير تسهيلات الدعم ، ومن ثم تضاف هذه الرسوم إلى رسوم الإلغاء المطبقة على طلبك عند إلغائه.', 1, '2023-01-26 18:12:21', '2023-01-26 18:12:21'),
(35, 4, 'ouss test question', 'ouss test Answer', 'سيبل', 'فييبسي', 1, '2024-10-10 02:47:11', '2025-12-29 11:25:27');

-- --------------------------------------------------------

--
-- Table structure for table `fare_management`
--

CREATE TABLE `fare_management` (
  `id` int(11) NOT NULL,
  `vehicle_type` int(11) NOT NULL DEFAULT 0,
  `fare_type` float NOT NULL,
  `base_fare` float NOT NULL,
  `price_per_km` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `feature_settings`
--

CREATE TABLE `feature_settings` (
  `id` int(11) NOT NULL,
  `enable_sms` int(2) NOT NULL,
  `enable_mail` int(2) NOT NULL,
  `enable_referral_module` int(2) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `group_name` varchar(250) NOT NULL,
  `group_description` text DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `policy_id` int(11) DEFAULT NULL,
  `corporate_customer_id` int(11) DEFAULT NULL,
  `group_name_ar` varchar(250) DEFAULT NULL,
  `group_description_ar` text DEFAULT NULL,
  `status` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `group_name`, `group_description`, `parent_id`, `policy_id`, `corporate_customer_id`, `group_name_ar`, `group_description_ar`, `status`, `created_at`, `updated_at`) VALUES
(2, 'test', 'menpani', NULL, NULL, NULL, NULL, NULL, 1, '2025-10-17 08:43:37', '2025-10-17 08:43:37'),
(3, 'Corporate B', 'Corporate B', NULL, NULL, NULL, NULL, NULL, 1, '2025-10-22 13:25:49', '2025-10-22 13:25:49'),
(4, 'Corporate C', 'Corporate C', NULL, NULL, NULL, NULL, NULL, 1, '2025-10-24 18:14:04', '2025-10-24 18:14:04'),
(5, 'Corporate D', 'Corporate D', NULL, NULL, NULL, NULL, NULL, 1, '2025-10-24 18:15:11', '2025-10-24 18:15:11'),
(6, 'Corporate G', 'Corporate G', NULL, NULL, NULL, NULL, NULL, 1, '2025-10-25 11:54:40', '2025-10-25 11:54:40'),
(7, 'Corporate H', 'Corporate H', NULL, NULL, NULL, NULL, NULL, 1, '2025-11-03 12:37:30', '2025-11-03 12:37:30'),
(8, 'Senior Management', 'people in senior management', NULL, NULL, NULL, NULL, NULL, 1, '2025-12-17 16:21:30', '2025-12-17 16:21:30'),
(9, 'huhj', 'njjhjh', NULL, NULL, NULL, NULL, NULL, 1, '2025-12-22 12:40:02', '2025-12-22 12:40:02'),
(10, 'Corporate S', 'Corporate S', NULL, 1, NULL, NULL, NULL, 1, '2025-12-29 18:31:41', '2025-12-29 18:31:41'),
(11, 'Corporate E', 'Corporate E', 1, 2, NULL, NULL, NULL, 1, '2025-12-29 18:34:59', '2025-12-29 18:38:25'),
(12, 'Corporate U', 'Corporate U', 1, 2, NULL, NULL, NULL, 1, '2025-12-29 18:39:54', '2025-12-29 18:45:49'),
(13, 'corporate J', 'corporate J', 17, 8, 17, NULL, NULL, 1, '2025-12-30 12:08:37', '2025-12-30 15:46:25'),
(14, 'Corporate A', NULL, NULL, NULL, 17, NULL, NULL, 1, '2025-12-30 13:33:18', '2025-12-30 13:33:18'),
(15, 'abcd', NULL, NULL, 1, 1, NULL, NULL, 1, '2025-12-30 15:18:56', '2025-12-30 15:18:56'),
(17, 'Group 5', 'Group 5', 18, 1, 13, NULL, 'fsdf', 1, '2025-12-30 15:20:55', '2025-12-30 15:46:03'),
(18, 'jhj', NULL, 0, 2, 1, NULL, NULL, 1, '2025-12-30 15:24:12', '2025-12-30 15:24:12'),
(19, 'Admin', 'Admin', 12, 12, 19, NULL, NULL, 1, '2025-12-30 16:55:45', '2025-12-31 13:34:26'),
(21, 'Admin', NULL, NULL, 12, 12, NULL, NULL, 1, '2025-12-30 18:38:15', '2025-12-31 18:18:59'),
(22, 'General', 'General', NULL, 12, 12, NULL, NULL, 1, '2025-12-31 13:34:55', '2025-12-31 13:34:55'),
(23, 'General Group', 'General Group', NULL, 12, 12, NULL, NULL, 1, '2025-12-31 13:35:22', '2025-12-31 13:35:22'),
(24, 'Group 9', 'Group 9', NULL, 12, 12, NULL, NULL, 1, '2025-12-31 13:46:35', '2025-12-31 13:46:35'),
(25, 'Group 10', 'Group 10', NULL, 12, 12, NULL, NULL, 1, '2025-12-31 14:00:05', '2025-12-31 14:00:05'),
(26, 'Group 11', 'Group 11', 13, 12, 12, NULL, NULL, 1, '2025-12-31 14:02:02', '2025-12-31 14:02:02'),
(27, 'Group 12', 'Group 12', 17, 12, 12, NULL, NULL, 1, '2025-12-31 14:03:58', '2025-12-31 14:03:58');

-- --------------------------------------------------------

--
-- Table structure for table `gth_histories`
--

CREATE TABLE `gth_histories` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `driver_id` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `how_it_works`
--

CREATE TABLE `how_it_works` (
  `id` int(11) NOT NULL,
  `title` varchar(250) NOT NULL,
  `description` text NOT NULL,
  `icon` varchar(250) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `how_it_works`
--

INSERT INTO `how_it_works` (`id`, `title`, `description`, `icon`, `created_at`, `updated_at`) VALUES
(1, 'Book a Ride', 'Enter your pickup and drop-off locations in the app or website', 'image/d2a563572c92eba8874b4044cc6b95cd.png', '2025-10-14 16:39:27', '2025-10-14 16:39:27'),
(2, 'Choose Your Ride', 'Select from various vehicle options based on your needs and budget', 'image/a26107781017f8e4a498cd15da95f1a1.png', '2025-10-14 16:40:10', '2025-10-14 16:40:10'),
(3, 'Track Driver', 'Watch your driver approach in real-time on the', 'image/994374d98040c057181d192bc12c50a8.png', '2025-10-14 16:40:33', '2025-10-14 16:40:33'),
(4, 'Enjoy Your Ride', 'Sit back, relax, and enjoy a comfortable journey to your destination', 'image/4b058005d302440e2b41687abc261e74.png', '2025-10-14 16:41:01', '2025-10-14 16:41:01'),
(5, 'Pay & Rate', 'Pay securely and rate your experience to help us improve', 'image/7f76d923d0cef54174d5529da9a7d053.png', '2025-10-14 16:41:28', '2025-10-14 16:41:28');

-- --------------------------------------------------------

--
-- Table structure for table `instant_offers`
--

CREATE TABLE `instant_offers` (
  `id` int(11) NOT NULL,
  `discount_type` int(11) NOT NULL DEFAULT 1,
  `discount` varchar(10) NOT NULL,
  `offer_name` varchar(150) NOT NULL,
  `offer_description` text NOT NULL,
  `offer_name_ar` varchar(150) DEFAULT NULL,
  `offer_description_ar` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lucky_offers`
--

CREATE TABLE `lucky_offers` (
  `id` int(11) NOT NULL,
  `offer_name` varchar(250) NOT NULL,
  `offer_description` text DEFAULT NULL,
  `offer_name_ar` varchar(150) DEFAULT NULL,
  `offer_description_ar` text DEFAULT NULL,
  `image` varchar(500) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mail_contents`
--

CREATE TABLE `mail_contents` (
  `id` int(11) NOT NULL,
  `code` varchar(250) NOT NULL,
  `title` varchar(250) NOT NULL,
  `content` text NOT NULL,
  `title_ar` varchar(250) DEFAULT NULL,
  `content_ar` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `map_settings`
--

CREATE TABLE `map_settings` (
  `id` int(11) NOT NULL,
  `tiles` int(11) NOT NULL,
  `routing` int(11) NOT NULL,
  `places` int(11) NOT NULL,
  `geo_code` int(11) NOT NULL,
  `reverse_geo_code` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `map_settings`
--

INSERT INTO `map_settings` (`id`, `tiles`, `routing`, `places`, `geo_code`, `reverse_geo_code`, `created_at`, `updated_at`) VALUES
(1, 2, 2, 2, 2, 2, '2025-06-11 10:38:58', '2026-02-05 07:53:04');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `code` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` varchar(500) NOT NULL,
  `message_ar` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `missed_trip_requests`
--

CREATE TABLE `missed_trip_requests` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `zone` int(11) NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `weight` float NOT NULL DEFAULT 0.25,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `missed_trip_requests`
--

INSERT INTO `missed_trip_requests` (`id`, `customer_id`, `zone`, `latitude`, `longitude`, `weight`, `created_at`, `updated_at`) VALUES
(1, 3, 99, 9.910285, 78.089391666667, 0.25, '2025-10-13 16:38:35', '2025-10-13 16:38:35'),
(2, 3, 99, 9.910285, 78.089391666667, 0.25, '2025-10-13 16:38:46', '2025-10-13 16:38:46'),
(3, 3, 99, 9.910285, 78.089391666667, 0.25, '2025-10-13 16:39:06', '2025-10-13 16:39:06'),
(4, 46, 2, 9.93778705995, 78.130375853908, 0.25, '2025-10-14 15:50:24', '2025-10-14 15:50:24'),
(5, 1, 3, 9.90082, 78.08831, 0.25, '2025-10-14 15:53:30', '2025-10-14 15:53:30'),
(6, 2, 99, 4.8721833333334, 7.0703883333333, 0.25, '2025-10-17 03:22:28', '2025-10-17 03:22:28'),
(7, 2, 99, 4.8721833333334, 7.0703883333333, 0.25, '2025-10-17 03:22:51', '2025-10-17 03:22:51'),
(8, 2, 99, 4.8497753563959, 7.0612591324531, 0.25, '2025-10-17 03:23:19', '2025-10-17 03:23:19'),
(9, 2, 99, 4.8345960134578, 7.0680843250221, 0.25, '2025-10-17 03:41:57', '2025-10-17 03:41:57'),
(10, 2, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-17 18:05:09', '2025-10-17 18:05:09'),
(11, 6, 99, 4.9231885419529, 6.9569320243983, 0.25, '2025-10-18 14:41:05', '2025-10-18 14:41:05'),
(12, 6, 99, 4.9721416666667, 6.9839016666666, 0.25, '2025-10-18 14:43:14', '2025-10-18 14:43:14'),
(13, 6, 99, 4.9721416666667, 6.9839016666666, 0.25, '2025-10-18 14:43:22', '2025-10-18 14:43:22'),
(14, 5, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-22 10:17:47', '2025-10-22 10:17:47'),
(15, 5, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-22 10:35:48', '2025-10-22 10:35:48'),
(16, 11, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-22 11:23:37', '2025-10-22 11:23:37'),
(17, 11, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-22 11:24:08', '2025-10-22 11:24:08'),
(18, 11, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-22 11:26:11', '2025-10-22 11:26:11'),
(19, 11, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-22 11:26:56', '2025-10-22 11:26:56'),
(20, 12, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-22 11:27:07', '2025-10-22 11:27:07'),
(21, 11, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-22 11:30:13', '2025-10-22 11:30:13'),
(22, 12, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-22 11:35:07', '2025-10-22 11:35:07'),
(23, 12, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-22 11:38:35', '2025-10-22 11:38:35'),
(24, 13, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-22 11:39:14', '2025-10-22 11:39:14'),
(25, 13, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-22 11:40:45', '2025-10-22 11:40:45'),
(26, 14, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-22 11:41:36', '2025-10-22 11:41:36'),
(27, 13, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-22 11:42:16', '2025-10-22 11:42:16'),
(28, 14, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-22 11:42:16', '2025-10-22 11:42:16'),
(29, 13, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-22 11:46:40', '2025-10-22 11:46:40'),
(30, 14, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-22 14:03:13', '2025-10-22 14:03:13'),
(31, 14, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-22 14:58:14', '2025-10-22 14:58:14'),
(32, 6, 99, 4.8719252332283, 7.0709941860517, 0.25, '2025-10-22 15:00:27', '2025-10-22 15:00:27'),
(33, 6, 99, 4.8719252332283, 7.0709941860517, 0.25, '2025-10-22 15:00:43', '2025-10-22 15:00:43'),
(34, 19, 99, -1.2469436431007, 36.679278746339, 0.25, '2025-10-22 15:04:58', '2025-10-22 15:04:58'),
(35, 19, 99, -1.2469436431007, 36.679278746339, 0.25, '2025-10-22 15:12:47', '2025-10-22 15:12:47'),
(36, 14, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-22 16:04:33', '2025-10-22 16:04:33'),
(37, 14, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-22 18:28:15', '2025-10-22 18:28:15'),
(38, 16, 3, 9.9103683333334, 78.089603333333, 0.25, '2025-10-23 16:01:22', '2025-10-23 16:01:22'),
(39, 5, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-23 17:03:15', '2025-10-23 17:03:15'),
(40, 1, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-23 17:09:50', '2025-10-23 17:09:50'),
(41, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-23 17:45:21', '2025-10-23 17:45:21'),
(42, 2, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-23 17:45:54', '2025-10-23 17:45:54'),
(43, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-23 17:50:29', '2025-10-23 17:50:29'),
(44, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-23 17:53:29', '2025-10-23 17:53:29'),
(45, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-23 17:56:37', '2025-10-23 17:56:37'),
(46, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-23 18:36:32', '2025-10-23 18:36:32'),
(47, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-23 18:39:25', '2025-10-23 18:39:25'),
(48, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-23 18:46:29', '2025-10-23 18:46:29'),
(49, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-23 18:46:41', '2025-10-23 18:46:41'),
(50, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-23 18:46:58', '2025-10-23 18:46:58'),
(51, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-23 18:47:08', '2025-10-23 18:47:08'),
(52, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-23 18:47:27', '2025-10-23 18:47:27'),
(53, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-23 18:47:39', '2025-10-23 18:47:39'),
(54, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-23 18:47:59', '2025-10-23 18:47:59'),
(55, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-23 18:48:20', '2025-10-23 18:48:20'),
(56, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-23 18:49:01', '2025-10-23 18:49:01'),
(57, 2, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-23 18:58:13', '2025-10-23 18:58:13'),
(58, 2, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-23 18:58:46', '2025-10-23 18:58:46'),
(59, 2, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-23 19:00:25', '2025-10-23 19:00:25'),
(60, 2, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-23 19:01:17', '2025-10-23 19:01:17'),
(61, 2, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-23 19:04:07', '2025-10-23 19:04:07'),
(62, 2, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-23 19:04:25', '2025-10-23 19:04:25'),
(63, 2, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-23 19:04:37', '2025-10-23 19:04:37'),
(64, 2, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-23 19:06:06', '2025-10-23 19:06:06'),
(65, 2, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-23 19:06:34', '2025-10-23 19:06:34'),
(66, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-23 19:07:33', '2025-10-23 19:07:33'),
(67, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-23 19:08:28', '2025-10-23 19:08:28'),
(68, 2, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-23 19:16:12', '2025-10-23 19:16:12'),
(69, 0, 3, 9.9278523, 78.0906824, 0.25, '2025-10-23 19:31:33', '2025-10-23 19:31:33'),
(70, 0, 3, 9.9278523, 78.0906824, 0.25, '2025-10-23 19:34:33', '2025-10-23 19:34:33'),
(71, 22, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-24 09:39:16', '2025-10-24 09:39:16'),
(72, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-24 09:50:21', '2025-10-24 09:50:21'),
(73, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-24 09:51:03', '2025-10-24 09:51:03'),
(74, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-24 09:57:22', '2025-10-24 09:57:22'),
(75, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-24 09:59:30', '2025-10-24 09:59:30'),
(76, 18, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-24 09:59:44', '2025-10-24 09:59:44'),
(77, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-24 10:06:42', '2025-10-24 10:06:42'),
(78, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-24 10:12:52', '2025-10-24 10:12:52'),
(79, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-24 10:17:04', '2025-10-24 10:17:04'),
(80, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-24 10:24:32', '2025-10-24 10:24:32'),
(81, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-24 10:27:19', '2025-10-24 10:27:19'),
(82, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-24 10:39:38', '2025-10-24 10:39:38'),
(83, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-24 10:43:26', '2025-10-24 10:43:26'),
(84, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-24 10:57:05', '2025-10-24 10:57:05'),
(85, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-24 11:01:55', '2025-10-24 11:01:55'),
(86, 17, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-24 11:37:30', '2025-10-24 11:37:30'),
(87, 0, 3, 9.9278523, 78.0906824, 0.25, '2025-10-24 13:00:40', '2025-10-24 13:00:40'),
(88, 0, 3, 9.9278523, 78.0906824, 0.25, '2025-10-24 13:01:28', '2025-10-24 13:01:28'),
(89, 0, 3, 9.9019373043018, 78.092992325408, 0.25, '2025-10-24 13:35:17', '2025-10-24 13:35:17'),
(90, 0, 3, 9.9221591, 78.0801581, 0.25, '2025-10-24 14:09:47', '2025-10-24 14:09:47'),
(91, 0, 3, 9.91781745, 78.075001393904, 0.25, '2025-10-24 14:10:17', '2025-10-24 14:10:17'),
(92, 0, 3, 9.9221591, 78.0801581, 0.25, '2025-10-24 16:15:47', '2025-10-24 16:15:47'),
(93, 21, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-24 16:27:03', '2025-10-24 16:27:03'),
(94, 21, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-24 16:34:11', '2025-10-24 16:34:11'),
(95, 21, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-24 16:34:56', '2025-10-24 16:34:56'),
(96, 0, 3, 9.9221591, 78.0801581, 0.25, '2025-10-24 16:48:11', '2025-10-24 16:48:11'),
(97, 0, 3, 9.9235292, 78.1022618, 0.25, '2025-10-24 17:59:47', '2025-10-24 17:59:47'),
(98, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-24 18:30:29', '2025-10-24 18:30:29'),
(99, 0, 3, 9.9235292, 78.1022618, 0.25, '2025-10-25 10:32:48', '2025-10-25 10:32:48'),
(100, 0, 3, 9.9235292, 78.1022618, 0.25, '2025-10-25 11:03:10', '2025-10-25 11:03:10'),
(101, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-25 13:19:20', '2025-10-25 13:19:20'),
(102, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-25 13:19:44', '2025-10-25 13:19:44'),
(103, 0, 3, 9.9235292, 78.1022618, 0.25, '2025-10-25 13:22:14', '2025-10-25 13:22:14'),
(104, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-25 13:23:48', '2025-10-25 13:23:48'),
(105, 0, 3, 9.91781745, 78.075001393904, 0.25, '2025-10-25 13:36:31', '2025-10-25 13:36:31'),
(106, 0, 3, 9.9235292, 78.1022618, 0.25, '2025-10-25 13:39:54', '2025-10-25 13:39:54'),
(107, 0, 3, 9.9159507, 78.111777, 0.25, '2025-10-25 13:40:58', '2025-10-25 13:40:58'),
(108, 19, 99, -1.19776296, 36.75551913, 0.25, '2025-10-25 17:28:35', '2025-10-25 17:28:35'),
(109, 16, 3, 9.9102183333333, 78.089403333333, 0.25, '2025-10-25 18:40:58', '2025-10-25 18:40:58'),
(110, 0, 3, 9.91781745, 78.075001393904, 0.25, '2025-10-27 10:24:25', '2025-10-27 10:24:25'),
(111, 16, 3, 9.9101866666667, 78.089405, 0.25, '2025-10-27 10:50:01', '2025-10-27 10:50:01'),
(112, 16, 3, 9.9101866666667, 78.089405, 0.25, '2025-10-27 10:50:40', '2025-10-27 10:50:40'),
(113, 16, 3, 9.9101866666667, 78.089405, 0.25, '2025-10-27 10:50:55', '2025-10-27 10:50:55'),
(114, 16, 3, 9.9101866666667, 78.089405, 0.25, '2025-10-27 10:51:34', '2025-10-27 10:51:34'),
(115, 16, 3, 9.9101866666667, 78.089405, 0.25, '2025-10-27 10:52:06', '2025-10-27 10:52:06'),
(116, 24, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-27 10:56:05', '2025-10-27 10:56:05'),
(117, 0, 3, 9.907395494117, 78.091039677244, 0.25, '2025-10-27 13:07:17', '2025-10-27 13:07:17'),
(118, 0, 3, 9.8284923745893, 77.982926727713, 0.25, '2025-10-27 13:14:34', '2025-10-27 13:14:34'),
(119, 0, 3, 9.9040980000026, 78.091640492061, 0.25, '2025-10-27 13:21:39', '2025-10-27 13:21:39'),
(120, 16, 3, 9.8325429, 77.9797135, 0.25, '2025-10-27 14:04:12', '2025-10-27 14:04:12'),
(121, 16, 3, 9.8325429, 77.9797135, 0.25, '2025-10-27 14:04:27', '2025-10-27 14:04:27'),
(122, 20, 3, 9.910005, 78.089528333333, 0.25, '2025-10-27 14:05:20', '2025-10-27 14:05:20'),
(123, 20, 3, 9.910005, 78.089528333333, 0.25, '2025-10-27 14:05:56', '2025-10-27 14:05:56'),
(124, 0, 3, 9.91781745, 78.075001393904, 0.25, '2025-10-27 14:16:36', '2025-10-27 14:16:36'),
(125, 7, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-27 14:21:55', '2025-10-27 14:21:55'),
(126, 0, 3, 9.91781745, 78.075001393904, 0.25, '2025-10-27 14:35:38', '2025-10-27 14:35:38'),
(127, 16, 3, 9.8325429, 77.9797135, 0.25, '2025-10-27 14:37:13', '2025-10-27 14:37:13'),
(128, 20, 3, 9.9101933333333, 78.08938, 0.25, '2025-10-27 14:38:26', '2025-10-27 14:38:26'),
(129, 20, 3, 9.9101933333333, 78.08938, 0.25, '2025-10-27 14:38:39', '2025-10-27 14:38:39'),
(130, 20, 3, 9.9101933333333, 78.08938, 0.25, '2025-10-27 14:39:41', '2025-10-27 14:39:41'),
(131, 20, 3, 9.9101933333333, 78.08938, 0.25, '2025-10-27 14:40:06', '2025-10-27 14:40:06'),
(132, 20, 3, 9.9101933333333, 78.08938, 0.25, '2025-10-27 14:40:58', '2025-10-27 14:40:58'),
(133, 20, 3, 9.9101933333333, 78.08938, 0.25, '2025-10-27 14:41:43', '2025-10-27 14:41:43'),
(134, 20, 3, 9.9101933333333, 78.08938, 0.25, '2025-10-27 14:42:00', '2025-10-27 14:42:00'),
(135, 20, 3, 9.9101933333333, 78.08938, 0.25, '2025-10-27 14:42:15', '2025-10-27 14:42:15'),
(136, 20, 3, 9.9101933333333, 78.08938, 0.25, '2025-10-27 14:42:48', '2025-10-27 14:42:48'),
(137, 20, 3, 9.9190233577081, 78.090031199984, 0.25, '2025-10-27 14:43:04', '2025-10-27 14:43:04'),
(138, 20, 3, 9.9102216666667, 78.089358333333, 0.25, '2025-10-27 14:45:04', '2025-10-27 14:45:04'),
(139, 7, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-27 14:45:21', '2025-10-27 14:45:21'),
(140, 16, 3, 9.8325429, 77.9797135, 0.25, '2025-10-27 14:48:03', '2025-10-27 14:48:03'),
(141, 16, 3, 9.8325429, 77.9797135, 0.25, '2025-10-27 15:03:45', '2025-10-27 15:03:45'),
(142, 20, 3, 9.9099283333333, 78.089646666667, 0.25, '2025-10-27 15:33:53', '2025-10-27 15:33:53'),
(143, 20, 3, 9.9099283333333, 78.089646666667, 0.25, '2025-10-27 15:34:30', '2025-10-27 15:34:30'),
(144, 20, 3, 9.9099283333333, 78.089646666667, 0.25, '2025-10-27 15:34:37', '2025-10-27 15:34:37'),
(145, 20, 3, 9.9099283333333, 78.089646666667, 0.25, '2025-10-27 15:35:58', '2025-10-27 15:35:58'),
(146, 20, 3, 9.9099283333333, 78.089646666667, 0.25, '2025-10-27 15:36:11', '2025-10-27 15:36:11'),
(147, 20, 3, 9.9101233333333, 78.089393333333, 0.25, '2025-10-27 15:36:45', '2025-10-27 15:36:45'),
(148, 28, 3, 9.910135, 78.089335, 0.25, '2025-10-27 15:38:03', '2025-10-27 15:38:03'),
(149, 7, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-10-27 15:38:18', '2025-10-27 15:38:18'),
(150, 28, 3, 9.910135, 78.089335, 0.25, '2025-10-27 15:38:38', '2025-10-27 15:38:38'),
(151, 0, 3, 9.91781745, 78.075001393904, 0.25, '2025-10-27 16:14:58', '2025-10-27 16:14:58'),
(152, 0, 3, 9.91781745, 78.075001393904, 0.25, '2025-10-27 16:18:26', '2025-10-27 16:18:26'),
(153, 0, 3, 9.9062117820945, 78.10520174084, 0.25, '2025-10-27 16:20:08', '2025-10-27 16:20:08'),
(154, 0, 3, 9.91781745, 78.075001393904, 0.25, '2025-10-27 16:20:40', '2025-10-27 16:20:40'),
(155, 0, 3, 9.91781745, 78.075001393904, 0.25, '2025-10-27 16:20:54', '2025-10-27 16:20:54'),
(156, 0, 3, 9.91781745, 78.075001393904, 0.25, '2025-10-27 16:21:26', '2025-10-27 16:21:26'),
(157, 0, 3, 9.91781745, 78.075001393904, 0.25, '2025-10-27 16:21:43', '2025-10-27 16:21:43'),
(158, 19, 99, -1.3032015372489, 36.821153871415, 0.25, '2025-11-18 13:31:55', '2025-11-18 13:31:55'),
(159, 115, 21, 9.9102440377811, 78.089585863212, 0.25, '2025-11-21 13:42:29', '2025-11-21 13:42:29'),
(160, 115, 21, 9.9102440377811, 78.089585863212, 0.25, '2025-11-21 13:42:45', '2025-11-21 13:42:45'),
(161, 115, 21, 9.9102440377811, 78.089585863212, 0.25, '2025-11-21 13:43:16', '2025-11-21 13:43:16'),
(162, 115, 21, 9.9102440377811, 78.089585863212, 0.25, '2025-11-21 13:43:33', '2025-11-21 13:43:33'),
(163, 19, 99, 40.7128, -74.006, 0.25, '2025-12-05 19:57:43', '2025-12-05 19:57:43'),
(164, 19, 99, 40.7128, -74.006, 0.25, '2025-12-05 19:57:48', '2025-12-05 19:57:48'),
(165, 32, 99, -1.2505107938088, 36.659439671133, 0.25, '2025-12-08 10:08:42', '2025-12-08 10:08:42'),
(166, 0, 3, 9.91781745, 78.075001393904, 0.25, '2025-12-15 12:32:22', '2025-12-15 12:32:22'),
(167, 1, 3, 9.9102214, 78.0893963, 0.25, '2025-12-15 13:18:01', '2025-12-15 13:18:01'),
(168, 1, 3, 9.9102214, 78.0893963, 0.25, '2025-12-15 13:18:15', '2025-12-15 13:18:15'),
(169, 1, 3, 9.9102214, 78.0893963, 0.25, '2025-12-15 13:18:26', '2025-12-15 13:18:26'),
(170, 0, 3, 9.9030597, 78.1058265, 0.25, '2025-12-16 14:15:37', '2025-12-16 14:15:37'),
(171, 0, 3, 9.9030597, 78.1058265, 0.25, '2025-12-16 14:16:25', '2025-12-16 14:16:25'),
(172, 0, 3, 9.9030597, 78.1058265, 0.25, '2025-12-16 14:24:49', '2025-12-16 14:24:49'),
(173, 0, 3, 9.9030597, 78.1058265, 0.25, '2025-12-16 14:36:38', '2025-12-16 14:36:38'),
(174, 33, 99, -1.3207367, 36.8552375, 0.25, '2025-12-17 11:11:06', '2025-12-17 11:11:06'),
(175, 33, 99, -1.1927010403357, 36.754109115566, 0.25, '2025-12-17 14:09:44', '2025-12-17 14:09:44'),
(176, 33, 99, -1.1927010403357, 36.754109115566, 0.25, '2025-12-17 14:10:19', '2025-12-17 14:10:19'),
(177, 33, 99, -1.1927010403357, 36.754109115566, 0.25, '2025-12-17 14:11:00', '2025-12-17 14:11:00'),
(178, 33, 99, -1.1978729, 36.7554183, 0.25, '2025-12-17 15:19:30', '2025-12-17 15:19:30'),
(179, 0, 3, 9.9278523, 78.0906824, 0.25, '2025-12-19 12:04:21', '2025-12-19 12:04:21'),
(180, 0, 3, 9.91781745, 78.075001393904, 0.25, '2025-12-22 11:49:47', '2025-12-22 11:49:47'),
(181, 0, 3, 9.9102572, 78.0893839, 0.25, '2025-12-22 11:50:50', '2025-12-22 11:50:50'),
(182, 0, 3, 9.9235911, 78.109391, 0.25, '2025-12-22 11:58:30', '2025-12-22 11:58:30'),
(183, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-12-29 15:33:15', '2025-12-29 15:33:15'),
(184, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-12-29 18:18:24', '2025-12-29 18:18:24'),
(185, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-12-29 19:27:46', '2025-12-29 19:27:46'),
(186, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-12-29 19:36:19', '2025-12-29 19:36:19'),
(187, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-12-30 14:06:52', '2025-12-30 14:06:52'),
(188, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-12-30 14:59:01', '2025-12-30 14:59:01'),
(189, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2025-12-30 15:01:59', '2025-12-30 15:01:59'),
(190, 0, 3, 9.9229292, 78.0900451, 0.25, '2025-12-31 10:32:26', '2025-12-31 10:32:26'),
(191, 0, 3, 9.9256569, 78.0901, 0.25, '2025-12-31 12:54:00', '2025-12-31 12:54:00'),
(192, 0, 3, 9.9218553, 78.094419, 0.25, '2025-12-31 19:40:42', '2025-12-31 19:40:42'),
(193, 0, 3, 9.9059036, 78.0935472, 0.25, '2026-01-02 12:08:23', '2026-01-02 12:08:23'),
(194, 19, 99, 0.44495549999999, 33.1987027, 0.25, '2026-01-02 22:31:17', '2026-01-02 22:31:17'),
(195, 0, 99, -1.320923, 36.855114, 0.25, '2026-01-10 11:27:22', '2026-01-10 11:27:22'),
(196, 0, 99, -1.320923, 36.855114, 0.25, '2026-01-10 11:27:45', '2026-01-10 11:27:45'),
(197, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-01-28 13:53:12', '2026-01-28 13:53:12'),
(198, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-01-28 13:59:31', '2026-01-28 13:59:31'),
(199, 19, 99, -1.298889, 36.8370437, 0.25, '2026-01-29 23:04:02', '2026-01-29 23:04:02'),
(200, 1, 3, 9.9102447, 78.0893954, 0.25, '2026-02-02 15:40:43', '2026-02-02 15:40:43'),
(201, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 15:44:04', '2026-02-02 15:44:04'),
(202, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 15:45:06', '2026-02-02 15:45:06'),
(203, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 15:46:04', '2026-02-02 15:46:04'),
(204, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 15:47:07', '2026-02-02 15:47:07'),
(205, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 15:48:06', '2026-02-02 15:48:06'),
(206, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 15:49:05', '2026-02-02 15:49:05'),
(207, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 15:50:05', '2026-02-02 15:50:05'),
(208, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 15:51:05', '2026-02-02 15:51:05'),
(209, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 15:52:07', '2026-02-02 15:52:07'),
(210, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 15:53:04', '2026-02-02 15:53:04'),
(211, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 15:54:07', '2026-02-02 15:54:07'),
(212, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 15:55:06', '2026-02-02 15:55:06'),
(213, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 15:56:05', '2026-02-02 15:56:05'),
(214, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 15:57:05', '2026-02-02 15:57:05'),
(215, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 15:58:05', '2026-02-02 15:58:05'),
(216, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 15:59:04', '2026-02-02 15:59:04'),
(217, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:00:06', '2026-02-02 16:00:06'),
(218, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:01:05', '2026-02-02 16:01:05'),
(219, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:02:05', '2026-02-02 16:02:05'),
(220, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:03:04', '2026-02-02 16:03:04'),
(221, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:04:05', '2026-02-02 16:04:05'),
(222, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:04:08', '2026-02-02 16:04:08'),
(223, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:05:05', '2026-02-02 16:05:05'),
(224, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:05:07', '2026-02-02 16:05:07'),
(225, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:06:04', '2026-02-02 16:06:04'),
(226, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:06:06', '2026-02-02 16:06:06'),
(227, 1, 3, 9.9174973386011, 78.071543543305, 0.25, '2026-02-02 16:06:08', '2026-02-02 16:06:08'),
(228, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:07:06', '2026-02-02 16:07:06'),
(229, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:07:08', '2026-02-02 16:07:08'),
(230, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:08:05', '2026-02-02 16:08:05'),
(231, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:08:07', '2026-02-02 16:08:07'),
(232, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:09:05', '2026-02-02 16:09:05'),
(233, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:09:07', '2026-02-02 16:09:07'),
(234, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:10:05', '2026-02-02 16:10:05'),
(235, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:10:08', '2026-02-02 16:10:08'),
(236, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:11:05', '2026-02-02 16:11:05'),
(237, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:11:07', '2026-02-02 16:11:07'),
(238, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:12:06', '2026-02-02 16:12:06'),
(239, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:12:08', '2026-02-02 16:12:08'),
(240, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:13:05', '2026-02-02 16:13:05'),
(241, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:13:07', '2026-02-02 16:13:07'),
(242, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:14:06', '2026-02-02 16:14:06'),
(243, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:14:08', '2026-02-02 16:14:08'),
(244, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:15:05', '2026-02-02 16:15:05'),
(245, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:15:07', '2026-02-02 16:15:07'),
(246, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:16:04', '2026-02-02 16:16:04'),
(247, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:16:06', '2026-02-02 16:16:06'),
(248, 2, 2, 9.910459233035, 78.092642072544, 0.25, '2026-02-02 16:16:36', '2026-02-02 16:16:36'),
(249, 2, 2, 9.910459233035, 78.092642072544, 0.25, '2026-02-02 16:16:52', '2026-02-02 16:16:52'),
(250, 2, 2, 9.910459233035, 78.092642072544, 0.25, '2026-02-02 16:16:56', '2026-02-02 16:16:56'),
(251, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:17:03', '2026-02-02 16:17:03'),
(252, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:17:05', '2026-02-02 16:17:05'),
(253, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:18:05', '2026-02-02 16:18:05'),
(254, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:18:07', '2026-02-02 16:18:07'),
(255, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:19:04', '2026-02-02 16:19:04'),
(256, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:19:07', '2026-02-02 16:19:07'),
(257, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:20:03', '2026-02-02 16:20:03'),
(258, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:20:06', '2026-02-02 16:20:06'),
(259, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:21:04', '2026-02-02 16:21:04'),
(260, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:21:06', '2026-02-02 16:21:06'),
(261, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:22:05', '2026-02-02 16:22:05'),
(262, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:22:07', '2026-02-02 16:22:07'),
(263, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:23:06', '2026-02-02 16:23:06'),
(264, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:23:08', '2026-02-02 16:23:08'),
(265, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:24:06', '2026-02-02 16:24:06'),
(266, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:24:08', '2026-02-02 16:24:08'),
(267, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:25:04', '2026-02-02 16:25:04'),
(268, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:25:06', '2026-02-02 16:25:06'),
(269, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:26:05', '2026-02-02 16:26:05'),
(270, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:26:07', '2026-02-02 16:26:07'),
(271, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:27:05', '2026-02-02 16:27:05'),
(272, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:27:07', '2026-02-02 16:27:07'),
(273, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:28:06', '2026-02-02 16:28:06'),
(274, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:28:08', '2026-02-02 16:28:08'),
(275, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:29:05', '2026-02-02 16:29:05'),
(276, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:29:07', '2026-02-02 16:29:07'),
(277, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:30:07', '2026-02-02 16:30:07'),
(278, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:31:06', '2026-02-02 16:31:06'),
(279, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:32:08', '2026-02-02 16:32:08'),
(280, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:33:04', '2026-02-02 16:33:04'),
(281, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:34:05', '2026-02-02 16:34:05'),
(282, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:35:10', '2026-02-02 16:35:10'),
(283, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:36:04', '2026-02-02 16:36:04'),
(284, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:37:04', '2026-02-02 16:37:04'),
(285, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:38:07', '2026-02-02 16:38:07'),
(286, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:39:04', '2026-02-02 16:39:04'),
(287, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:40:09', '2026-02-02 16:40:09'),
(288, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:41:06', '2026-02-02 16:41:06'),
(289, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:42:04', '2026-02-02 16:42:04'),
(290, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:43:07', '2026-02-02 16:43:07'),
(291, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:44:08', '2026-02-02 16:44:08'),
(292, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:45:05', '2026-02-02 16:45:05'),
(293, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:46:04', '2026-02-02 16:46:04'),
(294, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:47:04', '2026-02-02 16:47:04'),
(295, 42, 3, 9.917817450000001, 78.07500139390376, 0.25, '2026-02-02 16:48:04', '2026-02-02 16:48:04'),
(296, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-02 17:11:11', '2026-02-02 17:11:11'),
(297, 2, 2, 9.910459233035, 78.092642072544, 0.25, '2026-02-04 14:33:10', '2026-02-04 14:33:10'),
(298, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-04 14:40:50', '2026-02-04 14:40:50'),
(299, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-04 14:41:00', '2026-02-04 14:41:00'),
(300, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-04 14:41:54', '2026-02-04 14:41:54'),
(301, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-04 14:42:25', '2026-02-04 14:42:25'),
(302, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-04 14:42:53', '2026-02-04 14:42:53'),
(303, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-04 14:43:06', '2026-02-04 14:43:06'),
(304, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-04 15:22:12', '2026-02-04 15:22:12'),
(305, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-04 15:22:21', '2026-02-04 15:22:21'),
(306, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-04 15:42:31', '2026-02-04 15:42:31'),
(307, 0, 3, 9.9256726, 78.1022617, 0.25, '2026-02-04 16:10:50', '2026-02-04 16:10:50'),
(308, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-04 16:13:11', '2026-02-04 16:13:11'),
(309, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-04 16:13:43', '2026-02-04 16:13:43'),
(310, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:20:06', '2026-02-04 17:20:06'),
(311, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:20:09', '2026-02-04 17:20:09'),
(312, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:21:04', '2026-02-04 17:21:04'),
(313, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:21:06', '2026-02-04 17:21:06'),
(314, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:22:05', '2026-02-04 17:22:05'),
(315, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:22:07', '2026-02-04 17:22:07'),
(316, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:23:05', '2026-02-04 17:23:05'),
(317, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:23:07', '2026-02-04 17:23:07'),
(318, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:24:06', '2026-02-04 17:24:06'),
(319, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:24:08', '2026-02-04 17:24:08'),
(320, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:25:04', '2026-02-04 17:25:04'),
(321, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:25:07', '2026-02-04 17:25:07'),
(322, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:26:05', '2026-02-04 17:26:05'),
(323, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:26:07', '2026-02-04 17:26:07'),
(324, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:27:04', '2026-02-04 17:27:04'),
(325, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:27:06', '2026-02-04 17:27:06'),
(326, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:28:04', '2026-02-04 17:28:04'),
(327, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:28:07', '2026-02-04 17:28:07'),
(328, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:29:06', '2026-02-04 17:29:06'),
(329, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:29:08', '2026-02-04 17:29:08'),
(330, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:30:07', '2026-02-04 17:30:07'),
(331, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:30:09', '2026-02-04 17:30:09'),
(332, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:31:05', '2026-02-04 17:31:05'),
(333, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:31:07', '2026-02-04 17:31:07'),
(334, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:32:04', '2026-02-04 17:32:04'),
(335, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:32:07', '2026-02-04 17:32:07'),
(336, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:33:05', '2026-02-04 17:33:05'),
(337, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:33:07', '2026-02-04 17:33:07'),
(338, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:34:05', '2026-02-04 17:34:05'),
(339, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:34:07', '2026-02-04 17:34:07'),
(340, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:35:06', '2026-02-04 17:35:06'),
(341, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:35:08', '2026-02-04 17:35:08'),
(342, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:36:06', '2026-02-04 17:36:06'),
(343, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:36:08', '2026-02-04 17:36:08'),
(344, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:37:07', '2026-02-04 17:37:07'),
(345, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:37:09', '2026-02-04 17:37:09'),
(346, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:38:08', '2026-02-04 17:38:08'),
(347, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:38:11', '2026-02-04 17:38:11'),
(348, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:39:07', '2026-02-04 17:39:07'),
(349, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:39:09', '2026-02-04 17:39:09'),
(350, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:40:09', '2026-02-04 17:40:09'),
(351, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:40:11', '2026-02-04 17:40:11'),
(352, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:41:09', '2026-02-04 17:41:09'),
(353, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:41:11', '2026-02-04 17:41:11'),
(354, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:42:07', '2026-02-04 17:42:07'),
(355, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:42:10', '2026-02-04 17:42:10'),
(356, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:43:09', '2026-02-04 17:43:09'),
(357, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:43:12', '2026-02-04 17:43:12'),
(358, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:44:08', '2026-02-04 17:44:08'),
(359, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:44:11', '2026-02-04 17:44:11'),
(360, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:45:10', '2026-02-04 17:45:10'),
(361, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:45:12', '2026-02-04 17:45:12'),
(362, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:46:05', '2026-02-04 17:46:05'),
(363, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:46:07', '2026-02-04 17:46:07'),
(364, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:47:15', '2026-02-04 17:47:15'),
(365, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:47:17', '2026-02-04 17:47:17'),
(366, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:48:07', '2026-02-04 17:48:07'),
(367, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:48:09', '2026-02-04 17:48:09'),
(368, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:49:06', '2026-02-04 17:49:06'),
(369, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:49:09', '2026-02-04 17:49:09'),
(370, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:50:10', '2026-02-04 17:50:10'),
(371, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:50:12', '2026-02-04 17:50:12'),
(372, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:51:05', '2026-02-04 17:51:05'),
(373, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:51:08', '2026-02-04 17:51:08'),
(374, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:52:10', '2026-02-04 17:52:10'),
(375, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:52:12', '2026-02-04 17:52:12'),
(376, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:53:07', '2026-02-04 17:53:07'),
(377, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:53:10', '2026-02-04 17:53:10'),
(378, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:54:06', '2026-02-04 17:54:06'),
(379, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:54:08', '2026-02-04 17:54:08'),
(380, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:55:11', '2026-02-04 17:55:11'),
(381, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:55:13', '2026-02-04 17:55:13'),
(382, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:56:12', '2026-02-04 17:56:12'),
(383, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:56:14', '2026-02-04 17:56:14'),
(384, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:57:05', '2026-02-04 17:57:05'),
(385, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:57:07', '2026-02-04 17:57:07'),
(386, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:58:07', '2026-02-04 17:58:07'),
(387, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:58:09', '2026-02-04 17:58:09'),
(388, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:59:06', '2026-02-04 17:59:06'),
(389, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 17:59:08', '2026-02-04 17:59:08'),
(390, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 18:00:07', '2026-02-04 18:00:07'),
(391, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 18:00:09', '2026-02-04 18:00:09'),
(392, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 18:01:06', '2026-02-04 18:01:06'),
(393, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 18:01:08', '2026-02-04 18:01:08'),
(394, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 18:02:07', '2026-02-04 18:02:07'),
(395, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 18:02:09', '2026-02-04 18:02:09'),
(396, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 18:03:05', '2026-02-04 18:03:05'),
(397, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 18:03:07', '2026-02-04 18:03:07'),
(398, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 18:04:07', '2026-02-04 18:04:07'),
(399, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 18:04:09', '2026-02-04 18:04:09'),
(400, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 18:05:17', '2026-02-04 18:05:17'),
(401, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 18:05:19', '2026-02-04 18:05:19'),
(402, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 18:06:11', '2026-02-04 18:06:11'),
(403, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-04 18:06:13', '2026-02-04 18:06:13'),
(404, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:10:09', '2026-02-04 18:10:09'),
(405, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:11:08', '2026-02-04 18:11:08'),
(406, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:12:06', '2026-02-04 18:12:06'),
(407, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:09:04', '2026-02-04 18:09:04'),
(408, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:10:05', '2026-02-04 18:10:05'),
(409, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:11:05', '2026-02-04 18:11:05'),
(410, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:12:04', '2026-02-04 18:12:04'),
(411, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:13:04', '2026-02-04 18:13:04'),
(412, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:14:04', '2026-02-04 18:14:04'),
(413, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:15:06', '2026-02-04 18:15:06'),
(414, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:16:06', '2026-02-04 18:16:06'),
(415, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:17:04', '2026-02-04 18:17:04'),
(416, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:18:06', '2026-02-04 18:18:06'),
(417, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:19:05', '2026-02-04 18:19:05'),
(418, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:20:04', '2026-02-04 18:20:04'),
(419, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:21:04', '2026-02-04 18:21:04'),
(420, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:22:05', '2026-02-04 18:22:05'),
(421, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:23:05', '2026-02-04 18:23:05'),
(422, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:24:05', '2026-02-04 18:24:05'),
(423, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:25:05', '2026-02-04 18:25:05'),
(424, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:26:06', '2026-02-04 18:26:06'),
(425, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:27:05', '2026-02-04 18:27:05'),
(426, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:28:04', '2026-02-04 18:28:04'),
(427, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:29:05', '2026-02-04 18:29:05'),
(428, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:30:22', '2026-02-04 18:30:22'),
(429, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:31:07', '2026-02-04 18:31:07'),
(430, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:32:04', '2026-02-04 18:32:04'),
(431, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:33:04', '2026-02-04 18:33:04'),
(432, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:34:05', '2026-02-04 18:34:05'),
(433, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:35:05', '2026-02-04 18:35:05'),
(434, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:36:04', '2026-02-04 18:36:04'),
(435, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:37:04', '2026-02-04 18:37:04'),
(436, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:38:05', '2026-02-04 18:38:05'),
(437, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:39:03', '2026-02-04 18:39:03'),
(438, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:40:09', '2026-02-04 18:40:09'),
(439, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:41:04', '2026-02-04 18:41:04'),
(440, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:42:04', '2026-02-04 18:42:04'),
(441, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:43:06', '2026-02-04 18:43:06'),
(442, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:44:04', '2026-02-04 18:44:04'),
(443, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:45:04', '2026-02-04 18:45:04'),
(444, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:46:05', '2026-02-04 18:46:05'),
(445, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:47:05', '2026-02-04 18:47:05'),
(446, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:48:05', '2026-02-04 18:48:05'),
(447, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:49:05', '2026-02-04 18:49:05'),
(448, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:50:08', '2026-02-04 18:50:08'),
(449, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:51:05', '2026-02-04 18:51:05'),
(450, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:52:05', '2026-02-04 18:52:05'),
(451, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:53:07', '2026-02-04 18:53:07'),
(452, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:54:04', '2026-02-04 18:54:04'),
(453, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 18:55:05', '2026-02-04 18:55:05'),
(454, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 22:29:04', '2026-02-04 22:29:04'),
(455, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 22:30:05', '2026-02-04 22:30:05'),
(456, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 22:31:04', '2026-02-04 22:31:04'),
(457, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 22:32:04', '2026-02-04 22:32:04'),
(458, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 22:33:04', '2026-02-04 22:33:04'),
(459, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 22:34:04', '2026-02-04 22:34:04'),
(460, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 22:35:03', '2026-02-04 22:35:03'),
(461, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 22:36:03', '2026-02-04 22:36:03'),
(462, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 22:37:04', '2026-02-04 22:37:04'),
(463, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 22:38:03', '2026-02-04 22:38:03'),
(464, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 22:39:03', '2026-02-04 22:39:03'),
(465, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 22:40:04', '2026-02-04 22:40:04'),
(466, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 22:41:03', '2026-02-04 22:41:03'),
(467, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 22:42:03', '2026-02-04 22:42:03'),
(468, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 22:43:04', '2026-02-04 22:43:04'),
(469, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 22:44:03', '2026-02-04 22:44:03'),
(470, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 22:45:03', '2026-02-04 22:45:03'),
(471, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 22:46:04', '2026-02-04 22:46:04'),
(472, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 22:47:03', '2026-02-04 22:47:03'),
(473, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 22:48:03', '2026-02-04 22:48:03'),
(474, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 22:49:04', '2026-02-04 22:49:04'),
(475, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 22:50:04', '2026-02-04 22:50:04'),
(476, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 22:51:04', '2026-02-04 22:51:04'),
(477, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 22:52:04', '2026-02-04 22:52:04'),
(478, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 22:53:03', '2026-02-04 22:53:03'),
(479, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 22:54:04', '2026-02-04 22:54:04'),
(480, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 22:55:04', '2026-02-04 22:55:04'),
(481, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 22:56:04', '2026-02-04 22:56:04'),
(482, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 22:57:03', '2026-02-04 22:57:03'),
(483, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 22:58:03', '2026-02-04 22:58:03'),
(484, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 22:59:04', '2026-02-04 22:59:04'),
(485, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 23:00:03', '2026-02-04 23:00:03'),
(486, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 23:01:03', '2026-02-04 23:01:03'),
(487, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 23:02:04', '2026-02-04 23:02:04'),
(488, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 23:03:04', '2026-02-04 23:03:04'),
(489, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 23:04:04', '2026-02-04 23:04:04'),
(490, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 23:05:04', '2026-02-04 23:05:04'),
(491, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 23:06:04', '2026-02-04 23:06:04'),
(492, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 23:07:03', '2026-02-04 23:07:03'),
(493, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 23:08:04', '2026-02-04 23:08:04'),
(494, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 23:09:03', '2026-02-04 23:09:03'),
(495, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 23:10:04', '2026-02-04 23:10:04'),
(496, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 23:11:03', '2026-02-04 23:11:03'),
(497, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 23:12:04', '2026-02-04 23:12:04'),
(498, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 23:13:04', '2026-02-04 23:13:04'),
(499, 1, 3, 9.9102957, 78.0893835, 0.25, '2026-02-04 23:14:04', '2026-02-04 23:14:04'),
(500, 48, 3, 9.9102145, 78.0893829, 0.25, '2026-02-05 06:35:07', '2026-02-05 06:35:07'),
(501, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 08:05:45', '2026-02-05 08:05:45'),
(502, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 08:05:53', '2026-02-05 08:05:53'),
(503, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 08:05:54', '2026-02-05 08:05:54'),
(504, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 08:06:05', '2026-02-05 08:06:05'),
(505, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 08:18:10', '2026-02-05 08:18:10'),
(506, 48, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 09:01:35', '2026-02-05 09:01:35'),
(507, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 09:51:04', '2026-02-05 09:51:04'),
(508, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 09:52:05', '2026-02-05 09:52:05'),
(509, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 09:53:04', '2026-02-05 09:53:04'),
(510, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 09:53:06', '2026-02-05 09:53:06'),
(511, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 09:54:04', '2026-02-05 09:54:04'),
(512, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 09:54:07', '2026-02-05 09:54:07'),
(513, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 09:55:05', '2026-02-05 09:55:05'),
(514, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 09:55:07', '2026-02-05 09:55:07'),
(515, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 09:56:04', '2026-02-05 09:56:04'),
(516, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 09:56:06', '2026-02-05 09:56:06'),
(517, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 09:57:04', '2026-02-05 09:57:04'),
(518, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 09:57:06', '2026-02-05 09:57:06'),
(519, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 09:58:05', '2026-02-05 09:58:05'),
(520, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 09:58:07', '2026-02-05 09:58:07'),
(521, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 09:59:07', '2026-02-05 09:59:07'),
(522, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:00:05', '2026-02-05 10:00:05'),
(523, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:01:06', '2026-02-05 10:01:06'),
(524, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:01:08', '2026-02-05 10:01:08'),
(525, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:02:05', '2026-02-05 10:02:05'),
(526, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:02:08', '2026-02-05 10:02:08'),
(527, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:03:06', '2026-02-05 10:03:06'),
(528, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:03:08', '2026-02-05 10:03:08'),
(529, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:04:06', '2026-02-05 10:04:06'),
(530, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:04:08', '2026-02-05 10:04:08'),
(531, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:05:09', '2026-02-05 10:05:09'),
(532, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:05:11', '2026-02-05 10:05:11'),
(533, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:05:14', '2026-02-05 10:05:14'),
(534, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:06:04', '2026-02-05 10:06:04'),
(535, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:06:07', '2026-02-05 10:06:07'),
(536, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:06:09', '2026-02-05 10:06:09');
INSERT INTO `missed_trip_requests` (`id`, `customer_id`, `zone`, `latitude`, `longitude`, `weight`, `created_at`, `updated_at`) VALUES
(537, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:07:04', '2026-02-05 10:07:04'),
(538, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:07:07', '2026-02-05 10:07:07'),
(539, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:07:09', '2026-02-05 10:07:09'),
(540, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:08:05', '2026-02-05 10:08:05'),
(541, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:08:07', '2026-02-05 10:08:07'),
(542, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:08:09', '2026-02-05 10:08:09'),
(543, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:09:06', '2026-02-05 10:09:06'),
(544, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:09:09', '2026-02-05 10:09:09'),
(545, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:09:11', '2026-02-05 10:09:11'),
(546, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:09:16', '2026-02-05 10:09:16'),
(547, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:10:12', '2026-02-05 10:10:12'),
(548, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:10:14', '2026-02-05 10:10:14'),
(549, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:10:17', '2026-02-05 10:10:17'),
(550, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:10:19', '2026-02-05 10:10:19'),
(551, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:11:04', '2026-02-05 10:11:04'),
(552, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:11:06', '2026-02-05 10:11:06'),
(553, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:11:09', '2026-02-05 10:11:09'),
(554, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:11:11', '2026-02-05 10:11:11'),
(555, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:11:13', '2026-02-05 10:11:13'),
(556, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:12:06', '2026-02-05 10:12:06'),
(557, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:12:08', '2026-02-05 10:12:08'),
(558, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:12:10', '2026-02-05 10:12:10'),
(559, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:12:13', '2026-02-05 10:12:13'),
(560, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:12:15', '2026-02-05 10:12:15'),
(561, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:12:36', '2026-02-05 10:12:36'),
(562, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:12:38', '2026-02-05 10:12:38'),
(563, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:12:40', '2026-02-05 10:12:40'),
(564, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:12:42', '2026-02-05 10:12:42'),
(565, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:12:44', '2026-02-05 10:12:44'),
(566, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:12:47', '2026-02-05 10:12:47'),
(567, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:13:06', '2026-02-05 10:13:06'),
(568, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:13:09', '2026-02-05 10:13:09'),
(569, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:13:11', '2026-02-05 10:13:11'),
(570, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:13:13', '2026-02-05 10:13:13'),
(571, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:13:15', '2026-02-05 10:13:15'),
(572, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:13:18', '2026-02-05 10:13:18'),
(573, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:14:04', '2026-02-05 10:14:04'),
(574, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:14:07', '2026-02-05 10:14:07'),
(575, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:14:09', '2026-02-05 10:14:09'),
(576, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:14:11', '2026-02-05 10:14:11'),
(577, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:14:13', '2026-02-05 10:14:13'),
(578, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:14:16', '2026-02-05 10:14:16'),
(579, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:15:04', '2026-02-05 10:15:04'),
(580, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:15:06', '2026-02-05 10:15:06'),
(581, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:15:09', '2026-02-05 10:15:09'),
(582, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:15:11', '2026-02-05 10:15:11'),
(583, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:15:13', '2026-02-05 10:15:13'),
(584, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:15:15', '2026-02-05 10:15:15'),
(585, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:16:08', '2026-02-05 10:16:08'),
(586, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:16:10', '2026-02-05 10:16:10'),
(587, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:16:12', '2026-02-05 10:16:12'),
(588, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:16:15', '2026-02-05 10:16:15'),
(589, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:16:17', '2026-02-05 10:16:17'),
(590, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:17:04', '2026-02-05 10:17:04'),
(591, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:17:06', '2026-02-05 10:17:06'),
(592, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:17:08', '2026-02-05 10:17:08'),
(593, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:17:11', '2026-02-05 10:17:11'),
(594, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:17:13', '2026-02-05 10:17:13'),
(595, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:17:15', '2026-02-05 10:17:15'),
(596, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:18:04', '2026-02-05 10:18:04'),
(597, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:18:06', '2026-02-05 10:18:06'),
(598, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:18:09', '2026-02-05 10:18:09'),
(599, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:18:11', '2026-02-05 10:18:11'),
(600, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:18:14', '2026-02-05 10:18:14'),
(601, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:18:16', '2026-02-05 10:18:16'),
(602, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:19:06', '2026-02-05 10:19:06'),
(603, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:19:08', '2026-02-05 10:19:08'),
(604, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:19:10', '2026-02-05 10:19:10'),
(605, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:19:13', '2026-02-05 10:19:13'),
(606, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:19:15', '2026-02-05 10:19:15'),
(607, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:19:17', '2026-02-05 10:19:17'),
(608, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:20:09', '2026-02-05 10:20:09'),
(609, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:20:11', '2026-02-05 10:20:11'),
(610, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:20:14', '2026-02-05 10:20:14'),
(611, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:20:16', '2026-02-05 10:20:16'),
(612, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:20:18', '2026-02-05 10:20:18'),
(613, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:20:21', '2026-02-05 10:20:21'),
(614, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:20:23', '2026-02-05 10:20:23'),
(615, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:21:07', '2026-02-05 10:21:07'),
(616, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:21:10', '2026-02-05 10:21:10'),
(617, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:21:12', '2026-02-05 10:21:12'),
(618, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:21:15', '2026-02-05 10:21:15'),
(619, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:21:18', '2026-02-05 10:21:18'),
(620, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:21:20', '2026-02-05 10:21:20'),
(621, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:21:22', '2026-02-05 10:21:22'),
(622, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:22:06', '2026-02-05 10:22:06'),
(623, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:22:09', '2026-02-05 10:22:09'),
(624, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:22:11', '2026-02-05 10:22:11'),
(625, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:22:14', '2026-02-05 10:22:14'),
(626, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:22:16', '2026-02-05 10:22:16'),
(627, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:22:18', '2026-02-05 10:22:18'),
(628, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:22:21', '2026-02-05 10:22:21'),
(629, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:23:05', '2026-02-05 10:23:05'),
(630, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:23:08', '2026-02-05 10:23:08'),
(631, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:23:10', '2026-02-05 10:23:10'),
(632, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:23:11', '2026-02-05 10:23:11'),
(633, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:23:13', '2026-02-05 10:23:13'),
(634, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:23:13', '2026-02-05 10:23:13'),
(635, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:23:15', '2026-02-05 10:23:15'),
(636, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:23:16', '2026-02-05 10:23:16'),
(637, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:23:17', '2026-02-05 10:23:17'),
(638, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:23:18', '2026-02-05 10:23:18'),
(639, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:23:20', '2026-02-05 10:23:20'),
(640, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:23:22', '2026-02-05 10:23:22'),
(641, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:23:23', '2026-02-05 10:23:23'),
(642, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:23:25', '2026-02-05 10:23:25'),
(643, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:23:27', '2026-02-05 10:23:27'),
(644, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:24:07', '2026-02-05 10:24:07'),
(645, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:24:09', '2026-02-05 10:24:09'),
(646, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:24:11', '2026-02-05 10:24:11'),
(647, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:24:13', '2026-02-05 10:24:13'),
(648, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:24:16', '2026-02-05 10:24:16'),
(649, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:24:18', '2026-02-05 10:24:18'),
(650, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:24:20', '2026-02-05 10:24:20'),
(651, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:24:45', '2026-02-05 10:24:45'),
(652, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:24:47', '2026-02-05 10:24:47'),
(653, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:24:49', '2026-02-05 10:24:49'),
(654, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:24:52', '2026-02-05 10:24:52'),
(655, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:24:54', '2026-02-05 10:24:54'),
(656, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:24:56', '2026-02-05 10:24:56'),
(657, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:25:07', '2026-02-05 10:25:07'),
(658, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:25:09', '2026-02-05 10:25:09'),
(659, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:25:11', '2026-02-05 10:25:11'),
(660, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:25:14', '2026-02-05 10:25:14'),
(661, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:25:16', '2026-02-05 10:25:16'),
(662, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:25:18', '2026-02-05 10:25:18'),
(663, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:25:21', '2026-02-05 10:25:21'),
(664, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:25:36', '2026-02-05 10:25:36'),
(665, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:25:38', '2026-02-05 10:25:38'),
(666, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:25:40', '2026-02-05 10:25:40'),
(667, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:25:43', '2026-02-05 10:25:43'),
(668, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:25:45', '2026-02-05 10:25:45'),
(669, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:25:47', '2026-02-05 10:25:47'),
(670, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:25:50', '2026-02-05 10:25:50'),
(671, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:26:05', '2026-02-05 10:26:05'),
(672, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:26:08', '2026-02-05 10:26:08'),
(673, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:26:10', '2026-02-05 10:26:10'),
(674, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:26:13', '2026-02-05 10:26:13'),
(675, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:26:15', '2026-02-05 10:26:15'),
(676, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:26:18', '2026-02-05 10:26:18'),
(677, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:26:20', '2026-02-05 10:26:20'),
(678, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:26:33', '2026-02-05 10:26:33'),
(679, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:26:35', '2026-02-05 10:26:35'),
(680, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:26:37', '2026-02-05 10:26:37'),
(681, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:26:40', '2026-02-05 10:26:40'),
(682, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:26:42', '2026-02-05 10:26:42'),
(683, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:26:44', '2026-02-05 10:26:44'),
(684, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:26:47', '2026-02-05 10:26:47'),
(685, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:27:06', '2026-02-05 10:27:06'),
(686, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:27:07', '2026-02-05 10:27:07'),
(687, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:27:08', '2026-02-05 10:27:08'),
(688, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:27:10', '2026-02-05 10:27:10'),
(689, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:27:11', '2026-02-05 10:27:11'),
(690, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:27:12', '2026-02-05 10:27:12'),
(691, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:27:13', '2026-02-05 10:27:13'),
(692, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:27:14', '2026-02-05 10:27:14'),
(693, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:27:16', '2026-02-05 10:27:16'),
(694, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:27:17', '2026-02-05 10:27:17'),
(695, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:27:18', '2026-02-05 10:27:18'),
(696, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:27:19', '2026-02-05 10:27:19'),
(697, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:27:20', '2026-02-05 10:27:20'),
(698, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:27:21', '2026-02-05 10:27:21'),
(699, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:28:06', '2026-02-05 10:28:06'),
(700, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:28:08', '2026-02-05 10:28:08'),
(701, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:28:11', '2026-02-05 10:28:11'),
(702, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:28:13', '2026-02-05 10:28:13'),
(703, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:28:15', '2026-02-05 10:28:15'),
(704, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:28:18', '2026-02-05 10:28:18'),
(705, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:28:20', '2026-02-05 10:28:20'),
(706, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:28:25', '2026-02-05 10:28:25'),
(707, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:29:04', '2026-02-05 10:29:04'),
(708, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:29:07', '2026-02-05 10:29:07'),
(709, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:29:09', '2026-02-05 10:29:09'),
(710, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:29:12', '2026-02-05 10:29:12'),
(711, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:29:13', '2026-02-05 10:29:13'),
(712, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:29:16', '2026-02-05 10:29:16'),
(713, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:29:18', '2026-02-05 10:29:18'),
(714, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:29:23', '2026-02-05 10:29:23'),
(715, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:29:23', '2026-02-05 10:29:23'),
(716, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:29:25', '2026-02-05 10:29:25'),
(717, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:29:26', '2026-02-05 10:29:26'),
(718, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:29:28', '2026-02-05 10:29:28'),
(719, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:29:30', '2026-02-05 10:29:30'),
(720, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:29:33', '2026-02-05 10:29:33'),
(721, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:29:35', '2026-02-05 10:29:35'),
(722, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:29:37', '2026-02-05 10:29:37'),
(723, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:29:39', '2026-02-05 10:29:39'),
(724, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:29:44', '2026-02-05 10:29:44'),
(725, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:29:58', '2026-02-05 10:29:58'),
(726, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:30:00', '2026-02-05 10:30:00'),
(727, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:30:03', '2026-02-05 10:30:03'),
(728, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:30:05', '2026-02-05 10:30:05'),
(729, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:30:06', '2026-02-05 10:30:06'),
(730, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:30:08', '2026-02-05 10:30:08'),
(731, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:30:08', '2026-02-05 10:30:08'),
(732, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:30:10', '2026-02-05 10:30:10'),
(733, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:30:10', '2026-02-05 10:30:10'),
(734, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:30:12', '2026-02-05 10:30:12'),
(735, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:30:13', '2026-02-05 10:30:13'),
(736, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:30:15', '2026-02-05 10:30:15'),
(737, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:30:15', '2026-02-05 10:30:15'),
(738, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:30:17', '2026-02-05 10:30:17'),
(739, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:30:17', '2026-02-05 10:30:17'),
(740, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:30:19', '2026-02-05 10:30:19'),
(741, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:30:20', '2026-02-05 10:30:20'),
(742, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:30:22', '2026-02-05 10:30:22'),
(743, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:30:24', '2026-02-05 10:30:24'),
(744, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:30:27', '2026-02-05 10:30:27'),
(745, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:31:03', '2026-02-05 10:31:03'),
(746, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:31:06', '2026-02-05 10:31:06'),
(747, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:31:08', '2026-02-05 10:31:08'),
(748, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:31:11', '2026-02-05 10:31:11'),
(749, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:31:13', '2026-02-05 10:31:13'),
(750, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:31:15', '2026-02-05 10:31:15'),
(751, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:31:15', '2026-02-05 10:31:15'),
(752, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:31:17', '2026-02-05 10:31:17'),
(753, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:31:17', '2026-02-05 10:31:17'),
(754, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:31:19', '2026-02-05 10:31:19'),
(755, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:31:19', '2026-02-05 10:31:19'),
(756, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:31:22', '2026-02-05 10:31:22'),
(757, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:31:22', '2026-02-05 10:31:22'),
(758, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:31:24', '2026-02-05 10:31:24'),
(759, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:31:24', '2026-02-05 10:31:24'),
(760, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:31:26', '2026-02-05 10:31:26'),
(761, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:31:29', '2026-02-05 10:31:29'),
(762, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:31:31', '2026-02-05 10:31:31'),
(763, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:31:33', '2026-02-05 10:31:33'),
(764, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:31:36', '2026-02-05 10:31:36'),
(765, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:31:44', '2026-02-05 10:31:44'),
(766, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:31:46', '2026-02-05 10:31:46'),
(767, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:31:49', '2026-02-05 10:31:49'),
(768, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:31:51', '2026-02-05 10:31:51'),
(769, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:31:53', '2026-02-05 10:31:53'),
(770, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:31:55', '2026-02-05 10:31:55'),
(771, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:31:58', '2026-02-05 10:31:58'),
(772, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:32:00', '2026-02-05 10:32:00'),
(773, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:32:02', '2026-02-05 10:32:02'),
(774, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:32:05', '2026-02-05 10:32:05'),
(775, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:32:06', '2026-02-05 10:32:06'),
(776, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:32:09', '2026-02-05 10:32:09'),
(777, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:32:11', '2026-02-05 10:32:11'),
(778, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:32:13', '2026-02-05 10:32:13'),
(779, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:32:16', '2026-02-05 10:32:16'),
(780, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:32:18', '2026-02-05 10:32:18'),
(781, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:32:21', '2026-02-05 10:32:21'),
(782, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:32:21', '2026-02-05 10:32:21'),
(783, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:32:23', '2026-02-05 10:32:23'),
(784, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:32:23', '2026-02-05 10:32:23'),
(785, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:32:26', '2026-02-05 10:32:26'),
(786, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:32:26', '2026-02-05 10:32:26'),
(787, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:32:28', '2026-02-05 10:32:28'),
(788, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:32:28', '2026-02-05 10:32:28'),
(789, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:32:30', '2026-02-05 10:32:30'),
(790, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:32:32', '2026-02-05 10:32:32'),
(791, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:32:34', '2026-02-05 10:32:34'),
(792, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:32:37', '2026-02-05 10:32:37'),
(793, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:32:39', '2026-02-05 10:32:39'),
(794, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:32:41', '2026-02-05 10:32:41'),
(795, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:33:04', '2026-02-05 10:33:04'),
(796, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:33:06', '2026-02-05 10:33:06'),
(797, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:33:09', '2026-02-05 10:33:09'),
(798, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:33:11', '2026-02-05 10:33:11'),
(799, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:33:14', '2026-02-05 10:33:14'),
(800, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:33:16', '2026-02-05 10:33:16'),
(801, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:33:18', '2026-02-05 10:33:18'),
(802, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:33:20', '2026-02-05 10:33:20'),
(803, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:33:23', '2026-02-05 10:33:23'),
(804, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:33:25', '2026-02-05 10:33:25'),
(805, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:34:06', '2026-02-05 10:34:06'),
(806, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:34:08', '2026-02-05 10:34:08'),
(807, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:34:11', '2026-02-05 10:34:11'),
(808, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:34:13', '2026-02-05 10:34:13'),
(809, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:34:15', '2026-02-05 10:34:15'),
(810, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:34:17', '2026-02-05 10:34:17'),
(811, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:34:20', '2026-02-05 10:34:20'),
(812, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:34:22', '2026-02-05 10:34:22'),
(813, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:34:24', '2026-02-05 10:34:24'),
(814, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:34:27', '2026-02-05 10:34:27'),
(815, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:35:05', '2026-02-05 10:35:05'),
(816, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:35:08', '2026-02-05 10:35:08'),
(817, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:35:10', '2026-02-05 10:35:10'),
(818, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:35:12', '2026-02-05 10:35:12'),
(819, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:35:15', '2026-02-05 10:35:15'),
(820, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:35:17', '2026-02-05 10:35:17'),
(821, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:35:20', '2026-02-05 10:35:20'),
(822, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:35:22', '2026-02-05 10:35:22'),
(823, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:35:24', '2026-02-05 10:35:24'),
(824, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:35:27', '2026-02-05 10:35:27'),
(825, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:36:05', '2026-02-05 10:36:05'),
(826, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:36:07', '2026-02-05 10:36:07'),
(827, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:36:09', '2026-02-05 10:36:09'),
(828, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:36:12', '2026-02-05 10:36:12'),
(829, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:36:14', '2026-02-05 10:36:14'),
(830, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:36:16', '2026-02-05 10:36:16'),
(831, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:36:19', '2026-02-05 10:36:19'),
(832, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:36:21', '2026-02-05 10:36:21'),
(833, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:36:26', '2026-02-05 10:36:26'),
(834, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:36:29', '2026-02-05 10:36:29'),
(835, 0, 3, 9.9160561, 78.0900425, 0.25, '2026-02-05 10:37:06', '2026-02-05 10:37:06'),
(836, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:37:08', '2026-02-05 10:37:08'),
(837, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:37:11', '2026-02-05 10:37:11'),
(838, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:37:13', '2026-02-05 10:37:13'),
(839, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:37:15', '2026-02-05 10:37:15'),
(840, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:37:17', '2026-02-05 10:37:17'),
(841, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:37:20', '2026-02-05 10:37:20'),
(842, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:37:21', '2026-02-05 10:37:21'),
(843, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:37:24', '2026-02-05 10:37:24'),
(844, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:37:26', '2026-02-05 10:37:26'),
(845, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:38:04', '2026-02-05 10:38:04'),
(846, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:38:06', '2026-02-05 10:38:06'),
(847, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:38:09', '2026-02-05 10:38:09'),
(848, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:38:11', '2026-02-05 10:38:11'),
(849, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:38:13', '2026-02-05 10:38:13'),
(850, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:38:15', '2026-02-05 10:38:15'),
(851, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:38:18', '2026-02-05 10:38:18'),
(852, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:38:20', '2026-02-05 10:38:20'),
(853, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:38:23', '2026-02-05 10:38:23'),
(854, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:39:06', '2026-02-05 10:39:06'),
(855, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:39:08', '2026-02-05 10:39:08'),
(856, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:39:11', '2026-02-05 10:39:11'),
(857, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:39:14', '2026-02-05 10:39:14'),
(858, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:39:16', '2026-02-05 10:39:16'),
(859, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:39:19', '2026-02-05 10:39:19'),
(860, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:39:21', '2026-02-05 10:39:21'),
(861, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:39:23', '2026-02-05 10:39:23'),
(862, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:39:26', '2026-02-05 10:39:26'),
(863, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:40:06', '2026-02-05 10:40:06'),
(864, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:40:08', '2026-02-05 10:40:08'),
(865, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:40:10', '2026-02-05 10:40:10'),
(866, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:40:13', '2026-02-05 10:40:13'),
(867, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:40:15', '2026-02-05 10:40:15'),
(868, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:40:17', '2026-02-05 10:40:17'),
(869, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:40:20', '2026-02-05 10:40:20'),
(870, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:40:22', '2026-02-05 10:40:22'),
(871, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:41:05', '2026-02-05 10:41:05'),
(872, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:41:07', '2026-02-05 10:41:07'),
(873, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:41:09', '2026-02-05 10:41:09'),
(874, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:41:12', '2026-02-05 10:41:12'),
(875, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:41:14', '2026-02-05 10:41:14'),
(876, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:41:16', '2026-02-05 10:41:16'),
(877, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:41:19', '2026-02-05 10:41:19'),
(878, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:41:21', '2026-02-05 10:41:21'),
(879, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:42:05', '2026-02-05 10:42:05'),
(880, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:42:07', '2026-02-05 10:42:07'),
(881, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:42:10', '2026-02-05 10:42:10'),
(882, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:42:13', '2026-02-05 10:42:13'),
(883, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:42:15', '2026-02-05 10:42:15'),
(884, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:42:17', '2026-02-05 10:42:17'),
(885, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:42:20', '2026-02-05 10:42:20'),
(886, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:42:22', '2026-02-05 10:42:22'),
(887, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:43:06', '2026-02-05 10:43:06'),
(888, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:43:08', '2026-02-05 10:43:08'),
(889, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:43:11', '2026-02-05 10:43:11'),
(890, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:43:13', '2026-02-05 10:43:13'),
(891, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:43:15', '2026-02-05 10:43:15'),
(892, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:43:17', '2026-02-05 10:43:17'),
(893, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:43:20', '2026-02-05 10:43:20'),
(894, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:43:22', '2026-02-05 10:43:22'),
(895, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:44:05', '2026-02-05 10:44:05'),
(896, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:44:07', '2026-02-05 10:44:07'),
(897, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:44:10', '2026-02-05 10:44:10'),
(898, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:44:12', '2026-02-05 10:44:12'),
(899, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:44:15', '2026-02-05 10:44:15'),
(900, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:44:17', '2026-02-05 10:44:17'),
(901, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:44:19', '2026-02-05 10:44:19'),
(902, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:44:22', '2026-02-05 10:44:22'),
(903, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:45:05', '2026-02-05 10:45:05'),
(904, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:45:07', '2026-02-05 10:45:07'),
(905, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:45:10', '2026-02-05 10:45:10'),
(906, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:45:12', '2026-02-05 10:45:12'),
(907, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:45:14', '2026-02-05 10:45:14'),
(908, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:45:16', '2026-02-05 10:45:16'),
(909, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:45:19', '2026-02-05 10:45:19'),
(910, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:45:22', '2026-02-05 10:45:22'),
(911, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 10:45:24', '2026-02-05 10:45:24'),
(912, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:46:05', '2026-02-05 10:46:05'),
(913, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:46:07', '2026-02-05 10:46:07'),
(914, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:46:10', '2026-02-05 10:46:10'),
(915, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:46:12', '2026-02-05 10:46:12'),
(916, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:46:14', '2026-02-05 10:46:14'),
(917, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:46:17', '2026-02-05 10:46:17'),
(918, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:46:19', '2026-02-05 10:46:19'),
(919, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:46:21', '2026-02-05 10:46:21'),
(920, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 10:46:23', '2026-02-05 10:46:23'),
(921, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:47:05', '2026-02-05 10:47:05'),
(922, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:47:07', '2026-02-05 10:47:07'),
(923, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:47:09', '2026-02-05 10:47:09'),
(924, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:47:12', '2026-02-05 10:47:12'),
(925, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:47:14', '2026-02-05 10:47:14'),
(926, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:47:16', '2026-02-05 10:47:16'),
(927, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:47:19', '2026-02-05 10:47:19'),
(928, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:47:21', '2026-02-05 10:47:21'),
(929, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 10:47:24', '2026-02-05 10:47:24'),
(930, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:48:04', '2026-02-05 10:48:04'),
(931, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:48:06', '2026-02-05 10:48:06'),
(932, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:48:08', '2026-02-05 10:48:08'),
(933, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:48:11', '2026-02-05 10:48:11'),
(934, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:48:13', '2026-02-05 10:48:13'),
(935, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:48:15', '2026-02-05 10:48:15'),
(936, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:48:18', '2026-02-05 10:48:18'),
(937, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:48:20', '2026-02-05 10:48:20'),
(938, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 10:48:22', '2026-02-05 10:48:22'),
(939, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:49:04', '2026-02-05 10:49:04'),
(940, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:49:07', '2026-02-05 10:49:07'),
(941, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:49:09', '2026-02-05 10:49:09'),
(942, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:49:12', '2026-02-05 10:49:12'),
(943, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:49:14', '2026-02-05 10:49:14'),
(944, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:49:16', '2026-02-05 10:49:16'),
(945, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:49:19', '2026-02-05 10:49:19'),
(946, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:49:21', '2026-02-05 10:49:21'),
(947, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 10:49:23', '2026-02-05 10:49:23'),
(948, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:49:25', '2026-02-05 10:49:25'),
(949, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:50:07', '2026-02-05 10:50:07'),
(950, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:50:09', '2026-02-05 10:50:09'),
(951, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:50:11', '2026-02-05 10:50:11'),
(952, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:50:14', '2026-02-05 10:50:14'),
(953, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:50:16', '2026-02-05 10:50:16'),
(954, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:50:18', '2026-02-05 10:50:18'),
(955, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:50:21', '2026-02-05 10:50:21'),
(956, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:50:23', '2026-02-05 10:50:23'),
(957, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 10:50:25', '2026-02-05 10:50:25'),
(958, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:50:28', '2026-02-05 10:50:28'),
(959, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:50:30', '2026-02-05 10:50:30'),
(960, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:51:05', '2026-02-05 10:51:05'),
(961, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:51:07', '2026-02-05 10:51:07'),
(962, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:51:09', '2026-02-05 10:51:09'),
(963, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:51:12', '2026-02-05 10:51:12'),
(964, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:51:14', '2026-02-05 10:51:14'),
(965, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:51:16', '2026-02-05 10:51:16'),
(966, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:51:19', '2026-02-05 10:51:19'),
(967, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:51:21', '2026-02-05 10:51:21'),
(968, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 10:51:23', '2026-02-05 10:51:23'),
(969, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:51:26', '2026-02-05 10:51:26'),
(970, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:51:28', '2026-02-05 10:51:28'),
(971, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:52:04', '2026-02-05 10:52:04'),
(972, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:52:06', '2026-02-05 10:52:06'),
(973, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:52:09', '2026-02-05 10:52:09'),
(974, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:52:11', '2026-02-05 10:52:11'),
(975, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:52:13', '2026-02-05 10:52:13'),
(976, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:52:16', '2026-02-05 10:52:16'),
(977, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:52:18', '2026-02-05 10:52:18'),
(978, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 10:52:20', '2026-02-05 10:52:20'),
(979, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:52:23', '2026-02-05 10:52:23'),
(980, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:52:25', '2026-02-05 10:52:25'),
(981, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:53:03', '2026-02-05 10:53:03'),
(982, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:53:06', '2026-02-05 10:53:06'),
(983, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:53:08', '2026-02-05 10:53:08'),
(984, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:53:11', '2026-02-05 10:53:11'),
(985, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:53:13', '2026-02-05 10:53:13'),
(986, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:53:16', '2026-02-05 10:53:16'),
(987, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:53:18', '2026-02-05 10:53:18'),
(988, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 10:53:20', '2026-02-05 10:53:20'),
(989, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:53:22', '2026-02-05 10:53:22'),
(990, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:53:25', '2026-02-05 10:53:25'),
(991, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:54:04', '2026-02-05 10:54:04'),
(992, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:54:06', '2026-02-05 10:54:06'),
(993, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:54:08', '2026-02-05 10:54:08'),
(994, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:54:11', '2026-02-05 10:54:11'),
(995, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:54:13', '2026-02-05 10:54:13'),
(996, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:54:15', '2026-02-05 10:54:15'),
(997, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:54:17', '2026-02-05 10:54:17'),
(998, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 10:54:20', '2026-02-05 10:54:20'),
(999, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:54:22', '2026-02-05 10:54:22'),
(1000, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:54:24', '2026-02-05 10:54:24'),
(1001, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:55:05', '2026-02-05 10:55:05'),
(1002, 48, 3, 9.9101333333333, 78.089385, 0.25, '2026-02-05 10:55:07', '2026-02-05 10:55:07'),
(1003, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:55:09', '2026-02-05 10:55:09'),
(1004, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:55:12', '2026-02-05 10:55:12'),
(1005, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:55:14', '2026-02-05 10:55:14'),
(1006, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:55:16', '2026-02-05 10:55:16'),
(1007, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:55:19', '2026-02-05 10:55:19'),
(1008, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 10:55:20', '2026-02-05 10:55:20'),
(1009, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:55:23', '2026-02-05 10:55:23'),
(1010, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:55:25', '2026-02-05 10:55:25'),
(1011, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:56:04', '2026-02-05 10:56:04'),
(1012, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:56:06', '2026-02-05 10:56:06'),
(1013, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:56:08', '2026-02-05 10:56:08'),
(1014, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:56:11', '2026-02-05 10:56:11'),
(1015, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:56:13', '2026-02-05 10:56:13'),
(1016, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 10:56:15', '2026-02-05 10:56:15'),
(1017, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:56:18', '2026-02-05 10:56:18'),
(1018, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:56:20', '2026-02-05 10:56:20'),
(1019, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:57:09', '2026-02-05 10:57:09'),
(1020, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:57:11', '2026-02-05 10:57:11'),
(1021, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:57:16', '2026-02-05 10:57:16'),
(1022, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 10:57:18', '2026-02-05 10:57:18'),
(1023, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:57:24', '2026-02-05 10:57:24'),
(1024, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 10:57:33', '2026-02-05 10:57:33'),
(1025, 1, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:58:05', '2026-02-05 10:58:05'),
(1026, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:58:08', '2026-02-05 10:58:08'),
(1027, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:58:10', '2026-02-05 10:58:10'),
(1028, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:58:12', '2026-02-05 10:58:12'),
(1029, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:58:15', '2026-02-05 10:58:15'),
(1030, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 10:58:17', '2026-02-05 10:58:17'),
(1031, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:58:19', '2026-02-05 10:58:19'),
(1032, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:58:21', '2026-02-05 10:58:21'),
(1033, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 10:58:26', '2026-02-05 10:58:26'),
(1034, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 10:59:04', '2026-02-05 10:59:04'),
(1035, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 10:59:06', '2026-02-05 10:59:06'),
(1036, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:59:09', '2026-02-05 10:59:09'),
(1037, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:59:11', '2026-02-05 10:59:11'),
(1038, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 10:59:14', '2026-02-05 10:59:14'),
(1039, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:59:16', '2026-02-05 10:59:16'),
(1040, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 10:59:18', '2026-02-05 10:59:18'),
(1041, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:00:06', '2026-02-05 11:00:06'),
(1042, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 11:00:08', '2026-02-05 11:00:08'),
(1043, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:00:11', '2026-02-05 11:00:11'),
(1044, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:00:14', '2026-02-05 11:00:14'),
(1045, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 11:00:16', '2026-02-05 11:00:16'),
(1046, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:00:18', '2026-02-05 11:00:18'),
(1047, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:00:20', '2026-02-05 11:00:20'),
(1048, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:01:04', '2026-02-05 11:01:04'),
(1049, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 11:01:06', '2026-02-05 11:01:06'),
(1050, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:01:09', '2026-02-05 11:01:09'),
(1051, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:01:11', '2026-02-05 11:01:11'),
(1052, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 11:01:13', '2026-02-05 11:01:13'),
(1053, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:01:16', '2026-02-05 11:01:16'),
(1054, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:01:18', '2026-02-05 11:01:18'),
(1055, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 11:02:07', '2026-02-05 11:02:07'),
(1056, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:02:10', '2026-02-05 11:02:10'),
(1057, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 11:02:14', '2026-02-05 11:02:14'),
(1058, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:02:17', '2026-02-05 11:02:17'),
(1059, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:03:05', '2026-02-05 11:03:05'),
(1060, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 11:03:07', '2026-02-05 11:03:07'),
(1061, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:03:09', '2026-02-05 11:03:09'),
(1062, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:03:12', '2026-02-05 11:03:12'),
(1063, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 11:03:14', '2026-02-05 11:03:14'),
(1064, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:03:16', '2026-02-05 11:03:16'),
(1065, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:03:18', '2026-02-05 11:03:18'),
(1066, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:04:06', '2026-02-05 11:04:06'),
(1067, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 11:04:08', '2026-02-05 11:04:08'),
(1068, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:04:11', '2026-02-05 11:04:11'),
(1069, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:04:13', '2026-02-05 11:04:13'),
(1070, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 11:04:15', '2026-02-05 11:04:15'),
(1071, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:04:18', '2026-02-05 11:04:18'),
(1072, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:04:20', '2026-02-05 11:04:20'),
(1073, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:04:22', '2026-02-05 11:04:22'),
(1074, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:05:06', '2026-02-05 11:05:06'),
(1075, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 11:05:08', '2026-02-05 11:05:08'),
(1076, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:05:11', '2026-02-05 11:05:11'),
(1077, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:05:13', '2026-02-05 11:05:13'),
(1078, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 11:05:16', '2026-02-05 11:05:16'),
(1079, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:05:18', '2026-02-05 11:05:18');
INSERT INTO `missed_trip_requests` (`id`, `customer_id`, `zone`, `latitude`, `longitude`, `weight`, `created_at`, `updated_at`) VALUES
(1080, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:05:20', '2026-02-05 11:05:20'),
(1081, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:05:23', '2026-02-05 11:05:23'),
(1082, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:05:25', '2026-02-05 11:05:25'),
(1083, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:06:04', '2026-02-05 11:06:04'),
(1084, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 11:06:06', '2026-02-05 11:06:06'),
(1085, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:06:09', '2026-02-05 11:06:09'),
(1086, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:06:11', '2026-02-05 11:06:11'),
(1087, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 11:06:13', '2026-02-05 11:06:13'),
(1088, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:06:15', '2026-02-05 11:06:15'),
(1089, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:06:18', '2026-02-05 11:06:18'),
(1090, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:06:20', '2026-02-05 11:06:20'),
(1091, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:06:22', '2026-02-05 11:06:22'),
(1092, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:07:04', '2026-02-05 11:07:04'),
(1093, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 11:07:06', '2026-02-05 11:07:06'),
(1094, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:07:09', '2026-02-05 11:07:09'),
(1095, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:07:11', '2026-02-05 11:07:11'),
(1096, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:07:16', '2026-02-05 11:07:16'),
(1097, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:07:18', '2026-02-05 11:07:18'),
(1098, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:07:23', '2026-02-05 11:07:23'),
(1099, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:08:05', '2026-02-05 11:08:05'),
(1100, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:08:10', '2026-02-05 11:08:10'),
(1101, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:08:12', '2026-02-05 11:08:12'),
(1102, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 11:08:14', '2026-02-05 11:08:14'),
(1103, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:08:16', '2026-02-05 11:08:16'),
(1104, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:08:19', '2026-02-05 11:08:19'),
(1105, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:08:21', '2026-02-05 11:08:21'),
(1106, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:09:07', '2026-02-05 11:09:07'),
(1107, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 11:09:09', '2026-02-05 11:09:09'),
(1108, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:09:12', '2026-02-05 11:09:12'),
(1109, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:09:14', '2026-02-05 11:09:14'),
(1110, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 11:09:17', '2026-02-05 11:09:17'),
(1111, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:09:19', '2026-02-05 11:09:19'),
(1112, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:09:21', '2026-02-05 11:09:21'),
(1113, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:09:23', '2026-02-05 11:09:23'),
(1114, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:09:26', '2026-02-05 11:09:26'),
(1115, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 11:10:05', '2026-02-05 11:10:05'),
(1116, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:10:07', '2026-02-05 11:10:07'),
(1117, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:10:10', '2026-02-05 11:10:10'),
(1118, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 11:10:12', '2026-02-05 11:10:12'),
(1119, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:10:14', '2026-02-05 11:10:14'),
(1120, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:10:17', '2026-02-05 11:10:17'),
(1121, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:10:19', '2026-02-05 11:10:19'),
(1122, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:10:21', '2026-02-05 11:10:21'),
(1123, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 11:11:05', '2026-02-05 11:11:05'),
(1124, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:11:07', '2026-02-05 11:11:07'),
(1125, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:11:10', '2026-02-05 11:11:10'),
(1126, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 11:11:12', '2026-02-05 11:11:12'),
(1127, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:11:14', '2026-02-05 11:11:14'),
(1128, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:11:17', '2026-02-05 11:11:17'),
(1129, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:11:20', '2026-02-05 11:11:20'),
(1130, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:11:22', '2026-02-05 11:11:22'),
(1131, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 11:12:04', '2026-02-05 11:12:04'),
(1132, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:12:07', '2026-02-05 11:12:07'),
(1133, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:12:09', '2026-02-05 11:12:09'),
(1134, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 11:12:11', '2026-02-05 11:12:11'),
(1135, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:12:13', '2026-02-05 11:12:13'),
(1136, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:12:16', '2026-02-05 11:12:16'),
(1137, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:12:18', '2026-02-05 11:12:18'),
(1138, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:12:20', '2026-02-05 11:12:20'),
(1139, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 11:13:05', '2026-02-05 11:13:05'),
(1140, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:13:07', '2026-02-05 11:13:07'),
(1141, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:13:09', '2026-02-05 11:13:09'),
(1142, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 11:13:12', '2026-02-05 11:13:12'),
(1143, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:13:13', '2026-02-05 11:13:13'),
(1144, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:13:16', '2026-02-05 11:13:16'),
(1145, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:13:18', '2026-02-05 11:13:18'),
(1146, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:13:20', '2026-02-05 11:13:20'),
(1147, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:13:23', '2026-02-05 11:13:23'),
(1148, 40, 3, 9.916056099999999, 78.0900425, 0.25, '2026-02-05 11:14:05', '2026-02-05 11:14:05'),
(1149, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:14:07', '2026-02-05 11:14:07'),
(1150, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:14:09', '2026-02-05 11:14:09'),
(1151, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 11:14:12', '2026-02-05 11:14:12'),
(1152, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:14:14', '2026-02-05 11:14:14'),
(1153, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:14:16', '2026-02-05 11:14:16'),
(1154, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:14:19', '2026-02-05 11:14:19'),
(1155, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:14:21', '2026-02-05 11:14:21'),
(1156, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:14:23', '2026-02-05 11:14:23'),
(1157, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 11:15:04', '2026-02-05 11:15:04'),
(1158, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:15:06', '2026-02-05 11:15:06'),
(1159, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:15:08', '2026-02-05 11:15:08'),
(1160, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:15:10', '2026-02-05 11:15:10'),
(1161, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:15:13', '2026-02-05 11:15:13'),
(1162, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:15:15', '2026-02-05 11:15:15'),
(1163, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 11:16:07', '2026-02-05 11:16:07'),
(1164, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:16:09', '2026-02-05 11:16:09'),
(1165, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:16:11', '2026-02-05 11:16:11'),
(1166, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:16:13', '2026-02-05 11:16:13'),
(1167, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:16:15', '2026-02-05 11:16:15'),
(1168, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:16:18', '2026-02-05 11:16:18'),
(1169, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 11:17:04', '2026-02-05 11:17:04'),
(1170, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:17:06', '2026-02-05 11:17:06'),
(1171, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:17:09', '2026-02-05 11:17:09'),
(1172, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:17:11', '2026-02-05 11:17:11'),
(1173, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:17:14', '2026-02-05 11:17:14'),
(1174, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:17:16', '2026-02-05 11:17:16'),
(1175, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 11:18:04', '2026-02-05 11:18:04'),
(1176, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:18:06', '2026-02-05 11:18:06'),
(1177, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:18:09', '2026-02-05 11:18:09'),
(1178, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:18:11', '2026-02-05 11:18:11'),
(1179, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:18:13', '2026-02-05 11:18:13'),
(1180, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:18:16', '2026-02-05 11:18:16'),
(1181, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 11:19:03', '2026-02-05 11:19:03'),
(1182, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:19:06', '2026-02-05 11:19:06'),
(1183, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:19:08', '2026-02-05 11:19:08'),
(1184, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:19:10', '2026-02-05 11:19:10'),
(1185, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:19:12', '2026-02-05 11:19:12'),
(1186, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:19:15', '2026-02-05 11:19:15'),
(1187, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 11:20:04', '2026-02-05 11:20:04'),
(1188, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:20:06', '2026-02-05 11:20:06'),
(1189, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:20:09', '2026-02-05 11:20:09'),
(1190, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:20:11', '2026-02-05 11:20:11'),
(1191, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:20:13', '2026-02-05 11:20:13'),
(1192, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:20:15', '2026-02-05 11:20:15'),
(1193, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 11:21:04', '2026-02-05 11:21:04'),
(1194, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:21:06', '2026-02-05 11:21:06'),
(1195, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:21:08', '2026-02-05 11:21:08'),
(1196, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:21:11', '2026-02-05 11:21:11'),
(1197, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:21:13', '2026-02-05 11:21:13'),
(1198, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:21:15', '2026-02-05 11:21:15'),
(1199, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 11:22:05', '2026-02-05 11:22:05'),
(1200, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:22:07', '2026-02-05 11:22:07'),
(1201, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:22:09', '2026-02-05 11:22:09'),
(1202, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:22:12', '2026-02-05 11:22:12'),
(1203, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:22:14', '2026-02-05 11:22:14'),
(1204, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:22:16', '2026-02-05 11:22:16'),
(1205, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 11:23:06', '2026-02-05 11:23:06'),
(1206, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:23:08', '2026-02-05 11:23:08'),
(1207, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:23:10', '2026-02-05 11:23:10'),
(1208, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:23:13', '2026-02-05 11:23:13'),
(1209, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:23:15', '2026-02-05 11:23:15'),
(1210, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:23:17', '2026-02-05 11:23:17'),
(1211, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 11:24:04', '2026-02-05 11:24:04'),
(1212, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:24:06', '2026-02-05 11:24:06'),
(1213, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:24:08', '2026-02-05 11:24:08'),
(1214, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:24:11', '2026-02-05 11:24:11'),
(1215, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:24:13', '2026-02-05 11:24:13'),
(1216, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:24:15', '2026-02-05 11:24:15'),
(1217, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 11:25:10', '2026-02-05 11:25:10'),
(1218, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:25:12', '2026-02-05 11:25:12'),
(1219, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:25:14', '2026-02-05 11:25:14'),
(1220, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:25:17', '2026-02-05 11:25:17'),
(1221, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:25:18', '2026-02-05 11:25:18'),
(1222, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:25:21', '2026-02-05 11:25:21'),
(1223, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 11:26:04', '2026-02-05 11:26:04'),
(1224, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:26:06', '2026-02-05 11:26:06'),
(1225, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:26:09', '2026-02-05 11:26:09'),
(1226, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:26:11', '2026-02-05 11:26:11'),
(1227, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:26:13', '2026-02-05 11:26:13'),
(1228, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:26:16', '2026-02-05 11:26:16'),
(1229, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 11:27:04', '2026-02-05 11:27:04'),
(1230, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:27:06', '2026-02-05 11:27:06'),
(1231, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:27:08', '2026-02-05 11:27:08'),
(1232, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:27:11', '2026-02-05 11:27:11'),
(1233, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:27:13', '2026-02-05 11:27:13'),
(1234, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:27:15', '2026-02-05 11:27:15'),
(1235, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 11:28:04', '2026-02-05 11:28:04'),
(1236, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:28:07', '2026-02-05 11:28:07'),
(1237, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:28:09', '2026-02-05 11:28:09'),
(1238, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:28:11', '2026-02-05 11:28:11'),
(1239, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:28:13', '2026-02-05 11:28:13'),
(1240, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:28:16', '2026-02-05 11:28:16'),
(1241, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 11:29:06', '2026-02-05 11:29:06'),
(1242, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:29:09', '2026-02-05 11:29:09'),
(1243, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:29:11', '2026-02-05 11:29:11'),
(1244, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:29:13', '2026-02-05 11:29:13'),
(1245, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:29:16', '2026-02-05 11:29:16'),
(1246, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:29:18', '2026-02-05 11:29:18'),
(1247, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 11:30:04', '2026-02-05 11:30:04'),
(1248, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:30:07', '2026-02-05 11:30:07'),
(1249, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:30:09', '2026-02-05 11:30:09'),
(1250, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:30:11', '2026-02-05 11:30:11'),
(1251, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:30:13', '2026-02-05 11:30:13'),
(1252, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:30:16', '2026-02-05 11:30:16'),
(1253, 2, 3, 9.9108247699274, 78.094178505573, 0.25, '2026-02-05 11:31:04', '2026-02-05 11:31:04'),
(1254, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:31:06', '2026-02-05 11:31:06'),
(1255, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:31:08', '2026-02-05 11:31:08'),
(1256, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:31:10', '2026-02-05 11:31:10'),
(1257, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:31:12', '2026-02-05 11:31:12'),
(1258, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:31:15', '2026-02-05 11:31:15'),
(1259, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:32:05', '2026-02-05 11:32:05'),
(1260, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:32:07', '2026-02-05 11:32:07'),
(1261, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:32:09', '2026-02-05 11:32:09'),
(1262, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:32:12', '2026-02-05 11:32:12'),
(1263, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:32:14', '2026-02-05 11:32:14'),
(1264, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:33:04', '2026-02-05 11:33:04'),
(1265, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:33:06', '2026-02-05 11:33:06'),
(1266, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:33:08', '2026-02-05 11:33:08'),
(1267, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:33:11', '2026-02-05 11:33:11'),
(1268, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:33:13', '2026-02-05 11:33:13'),
(1269, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:34:04', '2026-02-05 11:34:04'),
(1270, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:34:06', '2026-02-05 11:34:06'),
(1271, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:34:08', '2026-02-05 11:34:08'),
(1272, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:34:10', '2026-02-05 11:34:10'),
(1273, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:34:12', '2026-02-05 11:34:12'),
(1274, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:35:04', '2026-02-05 11:35:04'),
(1275, 0, 3, 9.9123520712251, 78.091811972638, 0.25, '2026-02-05 11:35:06', '2026-02-05 11:35:06'),
(1276, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:35:09', '2026-02-05 11:35:09'),
(1277, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:35:11', '2026-02-05 11:35:11'),
(1278, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:35:13', '2026-02-05 11:35:13'),
(1279, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:36:05', '2026-02-05 11:36:05'),
(1280, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:36:07', '2026-02-05 11:36:07'),
(1281, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:36:09', '2026-02-05 11:36:09'),
(1282, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:37:04', '2026-02-05 11:37:04'),
(1283, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:37:06', '2026-02-05 11:37:06'),
(1284, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:37:09', '2026-02-05 11:37:09'),
(1285, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:38:04', '2026-02-05 11:38:04'),
(1286, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:38:06', '2026-02-05 11:38:06'),
(1287, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:38:09', '2026-02-05 11:38:09'),
(1288, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:39:04', '2026-02-05 11:39:04'),
(1289, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:39:07', '2026-02-05 11:39:07'),
(1290, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:39:09', '2026-02-05 11:39:09'),
(1291, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:40:06', '2026-02-05 11:40:06'),
(1292, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:40:08', '2026-02-05 11:40:08'),
(1293, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:40:11', '2026-02-05 11:40:11'),
(1294, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:41:04', '2026-02-05 11:41:04'),
(1295, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:41:06', '2026-02-05 11:41:06'),
(1296, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:41:08', '2026-02-05 11:41:08'),
(1297, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:42:04', '2026-02-05 11:42:04'),
(1298, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:42:07', '2026-02-05 11:42:07'),
(1299, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:42:09', '2026-02-05 11:42:09'),
(1300, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:43:04', '2026-02-05 11:43:04'),
(1301, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:43:06', '2026-02-05 11:43:06'),
(1302, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:43:08', '2026-02-05 11:43:08'),
(1303, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:44:04', '2026-02-05 11:44:04'),
(1304, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:44:06', '2026-02-05 11:44:06'),
(1305, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:44:08', '2026-02-05 11:44:08'),
(1306, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:45:05', '2026-02-05 11:45:05'),
(1307, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:45:07', '2026-02-05 11:45:07'),
(1308, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:45:09', '2026-02-05 11:45:09'),
(1309, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:46:05', '2026-02-05 11:46:05'),
(1310, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:46:08', '2026-02-05 11:46:08'),
(1311, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:46:10', '2026-02-05 11:46:10'),
(1312, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:47:05', '2026-02-05 11:47:05'),
(1313, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:47:07', '2026-02-05 11:47:07'),
(1314, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:47:09', '2026-02-05 11:47:09'),
(1315, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:48:04', '2026-02-05 11:48:04'),
(1316, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:48:06', '2026-02-05 11:48:06'),
(1317, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:48:09', '2026-02-05 11:48:09'),
(1318, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:49:08', '2026-02-05 11:49:08'),
(1319, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:49:10', '2026-02-05 11:49:10'),
(1320, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:50:07', '2026-02-05 11:50:07'),
(1321, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:50:09', '2026-02-05 11:50:09'),
(1322, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:50:11', '2026-02-05 11:50:11'),
(1323, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:51:08', '2026-02-05 11:51:08'),
(1324, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:51:11', '2026-02-05 11:51:11'),
(1325, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:52:04', '2026-02-05 11:52:04'),
(1326, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:52:06', '2026-02-05 11:52:06'),
(1327, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:53:03', '2026-02-05 11:53:03'),
(1328, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:54:05', '2026-02-05 11:54:05'),
(1329, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:55:06', '2026-02-05 11:55:06'),
(1330, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 11:55:08', '2026-02-05 11:55:08'),
(1331, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:56:05', '2026-02-05 11:56:05'),
(1332, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 11:56:07', '2026-02-05 11:56:07'),
(1333, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 11:56:09', '2026-02-05 11:56:09'),
(1334, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:57:05', '2026-02-05 11:57:05'),
(1335, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 11:57:07', '2026-02-05 11:57:07'),
(1336, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 11:57:10', '2026-02-05 11:57:10'),
(1337, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 11:58:04', '2026-02-05 11:58:04'),
(1338, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 11:58:07', '2026-02-05 11:58:07'),
(1339, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 11:58:09', '2026-02-05 11:58:09'),
(1340, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 11:59:05', '2026-02-05 11:59:05'),
(1341, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 11:59:07', '2026-02-05 11:59:07'),
(1342, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 12:00:06', '2026-02-05 12:00:06'),
(1343, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 12:00:08', '2026-02-05 12:00:08'),
(1344, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 12:01:04', '2026-02-05 12:01:04'),
(1345, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 12:01:07', '2026-02-05 12:01:07'),
(1346, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 12:02:04', '2026-02-05 12:02:04'),
(1347, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 12:02:05', '2026-02-05 12:02:05'),
(1348, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 12:02:06', '2026-02-05 12:02:06'),
(1349, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 12:02:07', '2026-02-05 12:02:07'),
(1350, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 12:03:05', '2026-02-05 12:03:05'),
(1351, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 12:03:07', '2026-02-05 12:03:07'),
(1352, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 12:04:05', '2026-02-05 12:04:05'),
(1353, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 12:04:07', '2026-02-05 12:04:07'),
(1354, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 12:05:06', '2026-02-05 12:05:06'),
(1355, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 12:05:08', '2026-02-05 12:05:08'),
(1356, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 12:06:04', '2026-02-05 12:06:04'),
(1357, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 12:06:06', '2026-02-05 12:06:06'),
(1358, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 12:07:05', '2026-02-05 12:07:05'),
(1359, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 12:07:08', '2026-02-05 12:07:08'),
(1360, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:07:10', '2026-02-05 12:07:10'),
(1361, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 12:08:05', '2026-02-05 12:08:05'),
(1362, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 12:08:07', '2026-02-05 12:08:07'),
(1363, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:08:09', '2026-02-05 12:08:09'),
(1364, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 12:09:04', '2026-02-05 12:09:04'),
(1365, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 12:09:06', '2026-02-05 12:09:06'),
(1366, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:09:08', '2026-02-05 12:09:08'),
(1367, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 12:10:06', '2026-02-05 12:10:06'),
(1368, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 12:10:08', '2026-02-05 12:10:08'),
(1369, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:10:11', '2026-02-05 12:10:11'),
(1370, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 12:11:04', '2026-02-05 12:11:04'),
(1371, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 12:11:06', '2026-02-05 12:11:06'),
(1372, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:11:08', '2026-02-05 12:11:08'),
(1373, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 12:12:04', '2026-02-05 12:12:04'),
(1374, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 12:12:06', '2026-02-05 12:12:06'),
(1375, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:12:09', '2026-02-05 12:12:09'),
(1376, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 12:13:04', '2026-02-05 12:13:04'),
(1377, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 12:13:06', '2026-02-05 12:13:06'),
(1378, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:13:08', '2026-02-05 12:13:08'),
(1379, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 12:14:05', '2026-02-05 12:14:05'),
(1380, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 12:14:07', '2026-02-05 12:14:07'),
(1381, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:14:10', '2026-02-05 12:14:10'),
(1382, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 12:15:04', '2026-02-05 12:15:04'),
(1383, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 12:15:06', '2026-02-05 12:15:06'),
(1384, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:15:08', '2026-02-05 12:15:08'),
(1385, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 12:16:04', '2026-02-05 12:16:04'),
(1386, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 12:16:06', '2026-02-05 12:16:06'),
(1387, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:16:08', '2026-02-05 12:16:08'),
(1388, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 12:17:04', '2026-02-05 12:17:04'),
(1389, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 12:17:06', '2026-02-05 12:17:06'),
(1390, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:17:09', '2026-02-05 12:17:09'),
(1391, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 12:18:07', '2026-02-05 12:18:07'),
(1392, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 12:18:09', '2026-02-05 12:18:09'),
(1393, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:18:12', '2026-02-05 12:18:12'),
(1394, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 12:19:05', '2026-02-05 12:19:05'),
(1395, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 12:19:07', '2026-02-05 12:19:07'),
(1396, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:19:09', '2026-02-05 12:19:09'),
(1397, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 12:20:04', '2026-02-05 12:20:04'),
(1398, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 12:20:06', '2026-02-05 12:20:06'),
(1399, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:20:09', '2026-02-05 12:20:09'),
(1400, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 12:21:05', '2026-02-05 12:21:05'),
(1401, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 12:21:07', '2026-02-05 12:21:07'),
(1402, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:21:09', '2026-02-05 12:21:09'),
(1403, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 12:22:04', '2026-02-05 12:22:04'),
(1404, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 12:22:07', '2026-02-05 12:22:07'),
(1405, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:22:09', '2026-02-05 12:22:09'),
(1406, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 12:23:05', '2026-02-05 12:23:05'),
(1407, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 12:23:07', '2026-02-05 12:23:07'),
(1408, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:23:09', '2026-02-05 12:23:09'),
(1409, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 12:24:06', '2026-02-05 12:24:06'),
(1410, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 12:24:08', '2026-02-05 12:24:08'),
(1411, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:24:10', '2026-02-05 12:24:10'),
(1412, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 12:25:05', '2026-02-05 12:25:05'),
(1413, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 12:25:08', '2026-02-05 12:25:08'),
(1414, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:25:10', '2026-02-05 12:25:10'),
(1415, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 12:26:05', '2026-02-05 12:26:05'),
(1416, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 12:26:07', '2026-02-05 12:26:07'),
(1417, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:26:10', '2026-02-05 12:26:10'),
(1418, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 12:27:04', '2026-02-05 12:27:04'),
(1419, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 12:27:06', '2026-02-05 12:27:06'),
(1420, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:27:08', '2026-02-05 12:27:08'),
(1421, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 12:28:06', '2026-02-05 12:28:06'),
(1422, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 12:28:08', '2026-02-05 12:28:08'),
(1423, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:28:10', '2026-02-05 12:28:10'),
(1424, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 12:29:04', '2026-02-05 12:29:04'),
(1425, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 12:29:06', '2026-02-05 12:29:06'),
(1426, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:29:08', '2026-02-05 12:29:08'),
(1427, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 12:30:06', '2026-02-05 12:30:06'),
(1428, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 12:30:08', '2026-02-05 12:30:08'),
(1429, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:30:10', '2026-02-05 12:30:10'),
(1430, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 12:31:07', '2026-02-05 12:31:07'),
(1431, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 12:31:10', '2026-02-05 12:31:10'),
(1432, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:31:12', '2026-02-05 12:31:12'),
(1433, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 12:32:05', '2026-02-05 12:32:05'),
(1434, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 12:32:07', '2026-02-05 12:32:07'),
(1435, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:32:10', '2026-02-05 12:32:10'),
(1436, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 12:33:04', '2026-02-05 12:33:04'),
(1437, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 12:33:06', '2026-02-05 12:33:06'),
(1438, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:33:09', '2026-02-05 12:33:09'),
(1439, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 12:34:04', '2026-02-05 12:34:04'),
(1440, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 12:34:06', '2026-02-05 12:34:06'),
(1441, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:34:09', '2026-02-05 12:34:09'),
(1442, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 12:35:06', '2026-02-05 12:35:06'),
(1443, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 12:35:08', '2026-02-05 12:35:08'),
(1444, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:35:11', '2026-02-05 12:35:11'),
(1445, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 12:36:04', '2026-02-05 12:36:04'),
(1446, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 12:36:06', '2026-02-05 12:36:06'),
(1447, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:36:08', '2026-02-05 12:36:08'),
(1448, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 12:37:05', '2026-02-05 12:37:05'),
(1449, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 12:37:07', '2026-02-05 12:37:07'),
(1450, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:37:09', '2026-02-05 12:37:09'),
(1451, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 12:38:07', '2026-02-05 12:38:07'),
(1452, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 12:38:09', '2026-02-05 12:38:09'),
(1453, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:38:11', '2026-02-05 12:38:11'),
(1454, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 12:39:03', '2026-02-05 12:39:03'),
(1455, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 12:39:05', '2026-02-05 12:39:05'),
(1456, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:39:08', '2026-02-05 12:39:08'),
(1457, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 12:40:04', '2026-02-05 12:40:04'),
(1458, 1, 3, 9.9027966181208, 78.089789170772, 0.25, '2026-02-05 12:40:06', '2026-02-05 12:40:06'),
(1459, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:40:09', '2026-02-05 12:40:09'),
(1460, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:41:05', '2026-02-05 12:41:05'),
(1461, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:42:05', '2026-02-05 12:42:05'),
(1462, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:43:04', '2026-02-05 12:43:04'),
(1463, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:44:06', '2026-02-05 12:44:06'),
(1464, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:45:03', '2026-02-05 12:45:03'),
(1465, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:46:04', '2026-02-05 12:46:04'),
(1466, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:47:04', '2026-02-05 12:47:04'),
(1467, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:48:04', '2026-02-05 12:48:04'),
(1468, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:49:05', '2026-02-05 12:49:05'),
(1469, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:50:05', '2026-02-05 12:50:05'),
(1470, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:51:05', '2026-02-05 12:51:05'),
(1471, 1, 3, 9.8300308366252, 77.993694841862, 0.25, '2026-02-05 12:52:05', '2026-02-05 12:52:05'),
(1472, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:00:09', '2026-02-05 13:00:09'),
(1473, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:00:11', '2026-02-05 13:00:11'),
(1474, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:01:05', '2026-02-05 13:01:05'),
(1475, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:01:08', '2026-02-05 13:01:08'),
(1476, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:02:06', '2026-02-05 13:02:06'),
(1477, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:02:08', '2026-02-05 13:02:08'),
(1478, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:03:05', '2026-02-05 13:03:05'),
(1479, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:03:07', '2026-02-05 13:03:07'),
(1480, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:04:04', '2026-02-05 13:04:04'),
(1481, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:04:06', '2026-02-05 13:04:06'),
(1482, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:05:04', '2026-02-05 13:05:04'),
(1483, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:05:06', '2026-02-05 13:05:06'),
(1484, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:06:05', '2026-02-05 13:06:05'),
(1485, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:06:07', '2026-02-05 13:06:07'),
(1486, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:07:05', '2026-02-05 13:07:05'),
(1487, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:07:07', '2026-02-05 13:07:07'),
(1488, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:08:05', '2026-02-05 13:08:05'),
(1489, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:08:07', '2026-02-05 13:08:07'),
(1490, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:09:04', '2026-02-05 13:09:04'),
(1491, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:09:06', '2026-02-05 13:09:06'),
(1492, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:10:05', '2026-02-05 13:10:05'),
(1493, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:10:07', '2026-02-05 13:10:07'),
(1494, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:10:09', '2026-02-05 13:10:09'),
(1495, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:11:04', '2026-02-05 13:11:04'),
(1496, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:11:06', '2026-02-05 13:11:06'),
(1497, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:11:08', '2026-02-05 13:11:08'),
(1498, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:12:04', '2026-02-05 13:12:04'),
(1499, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:12:06', '2026-02-05 13:12:06'),
(1500, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:12:09', '2026-02-05 13:12:09'),
(1501, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:13:04', '2026-02-05 13:13:04'),
(1502, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:13:06', '2026-02-05 13:13:06'),
(1503, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:13:08', '2026-02-05 13:13:08'),
(1504, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:14:04', '2026-02-05 13:14:04'),
(1505, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:14:06', '2026-02-05 13:14:06'),
(1506, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:14:09', '2026-02-05 13:14:09'),
(1507, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:15:05', '2026-02-05 13:15:05'),
(1508, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:15:07', '2026-02-05 13:15:07'),
(1509, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:15:09', '2026-02-05 13:15:09'),
(1510, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:16:04', '2026-02-05 13:16:04'),
(1511, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:16:06', '2026-02-05 13:16:06'),
(1512, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:16:09', '2026-02-05 13:16:09'),
(1513, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:17:07', '2026-02-05 13:17:07'),
(1514, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:17:09', '2026-02-05 13:17:09'),
(1515, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:17:12', '2026-02-05 13:17:12'),
(1516, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:18:04', '2026-02-05 13:18:04'),
(1517, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:18:06', '2026-02-05 13:18:06'),
(1518, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:18:09', '2026-02-05 13:18:09'),
(1519, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:19:04', '2026-02-05 13:19:04'),
(1520, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:19:06', '2026-02-05 13:19:06'),
(1521, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:19:09', '2026-02-05 13:19:09'),
(1522, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:20:06', '2026-02-05 13:20:06'),
(1523, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:20:08', '2026-02-05 13:20:08'),
(1524, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:20:11', '2026-02-05 13:20:11'),
(1525, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:21:05', '2026-02-05 13:21:05'),
(1526, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:21:07', '2026-02-05 13:21:07'),
(1527, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:21:10', '2026-02-05 13:21:10'),
(1528, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:22:04', '2026-02-05 13:22:04'),
(1529, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:22:07', '2026-02-05 13:22:07'),
(1530, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:22:09', '2026-02-05 13:22:09'),
(1531, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:23:04', '2026-02-05 13:23:04'),
(1532, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:23:06', '2026-02-05 13:23:06'),
(1533, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:23:09', '2026-02-05 13:23:09'),
(1534, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:24:04', '2026-02-05 13:24:04'),
(1535, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:24:06', '2026-02-05 13:24:06'),
(1536, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:24:08', '2026-02-05 13:24:08'),
(1537, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:25:04', '2026-02-05 13:25:04'),
(1538, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:25:07', '2026-02-05 13:25:07'),
(1539, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:25:09', '2026-02-05 13:25:09'),
(1540, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:26:05', '2026-02-05 13:26:05'),
(1541, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:26:07', '2026-02-05 13:26:07'),
(1542, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:26:09', '2026-02-05 13:26:09'),
(1543, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:27:06', '2026-02-05 13:27:06'),
(1544, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:27:08', '2026-02-05 13:27:08'),
(1545, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:27:11', '2026-02-05 13:27:11'),
(1546, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:28:06', '2026-02-05 13:28:06'),
(1547, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:28:08', '2026-02-05 13:28:08'),
(1548, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:28:11', '2026-02-05 13:28:11'),
(1549, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:29:04', '2026-02-05 13:29:04'),
(1550, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:29:06', '2026-02-05 13:29:06'),
(1551, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:29:09', '2026-02-05 13:29:09'),
(1552, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:30:05', '2026-02-05 13:30:05'),
(1553, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:30:07', '2026-02-05 13:30:07'),
(1554, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:30:10', '2026-02-05 13:30:10'),
(1555, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:31:04', '2026-02-05 13:31:04'),
(1556, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:31:06', '2026-02-05 13:31:06'),
(1557, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:31:08', '2026-02-05 13:31:08'),
(1558, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:32:04', '2026-02-05 13:32:04'),
(1559, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:32:06', '2026-02-05 13:32:06'),
(1560, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:32:09', '2026-02-05 13:32:09'),
(1561, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:33:04', '2026-02-05 13:33:04'),
(1562, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:33:06', '2026-02-05 13:33:06'),
(1563, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:33:08', '2026-02-05 13:33:08'),
(1564, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:34:04', '2026-02-05 13:34:04'),
(1565, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:34:06', '2026-02-05 13:34:06'),
(1566, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:34:09', '2026-02-05 13:34:09'),
(1567, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:35:04', '2026-02-05 13:35:04'),
(1568, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:35:07', '2026-02-05 13:35:07'),
(1569, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:35:09', '2026-02-05 13:35:09'),
(1570, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:36:08', '2026-02-05 13:36:08'),
(1571, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:36:10', '2026-02-05 13:36:10'),
(1572, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:36:12', '2026-02-05 13:36:12'),
(1573, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:37:04', '2026-02-05 13:37:04'),
(1574, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:37:06', '2026-02-05 13:37:06'),
(1575, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:37:09', '2026-02-05 13:37:09'),
(1576, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:38:05', '2026-02-05 13:38:05'),
(1577, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:38:07', '2026-02-05 13:38:07'),
(1578, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:38:10', '2026-02-05 13:38:10'),
(1579, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:39:04', '2026-02-05 13:39:04'),
(1580, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:39:06', '2026-02-05 13:39:06'),
(1581, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:39:09', '2026-02-05 13:39:09'),
(1582, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:40:06', '2026-02-05 13:40:06'),
(1583, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:40:08', '2026-02-05 13:40:08'),
(1584, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:40:11', '2026-02-05 13:40:11'),
(1585, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:41:04', '2026-02-05 13:41:04'),
(1586, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:41:06', '2026-02-05 13:41:06'),
(1587, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:41:08', '2026-02-05 13:41:08'),
(1588, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:42:04', '2026-02-05 13:42:04'),
(1589, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:42:06', '2026-02-05 13:42:06'),
(1590, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:42:09', '2026-02-05 13:42:09'),
(1591, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:43:04', '2026-02-05 13:43:04'),
(1592, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:43:06', '2026-02-05 13:43:06'),
(1593, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:43:09', '2026-02-05 13:43:09'),
(1594, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:44:07', '2026-02-05 13:44:07'),
(1595, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:44:10', '2026-02-05 13:44:10'),
(1596, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:44:12', '2026-02-05 13:44:12'),
(1597, 48, 3, 9.9101233333333, 78.089348333333, 0.25, '2026-02-05 13:45:08', '2026-02-05 13:45:08'),
(1598, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:45:10', '2026-02-05 13:45:10'),
(1599, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:45:13', '2026-02-05 13:45:13'),
(1600, 0, 3, 9.9182407, 78.0751774, 0.25, '2026-02-05 13:46:04', '2026-02-05 13:46:04'),
(1601, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:46:06', '2026-02-05 13:46:06'),
(1602, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:47:04', '2026-02-05 13:47:04'),
(1603, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:48:03', '2026-02-05 13:48:03'),
(1604, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:49:04', '2026-02-05 13:49:04'),
(1605, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:50:05', '2026-02-05 13:50:05'),
(1606, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:51:04', '2026-02-05 13:51:04'),
(1607, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:52:05', '2026-02-05 13:52:05'),
(1608, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:53:04', '2026-02-05 13:53:04'),
(1609, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:53:06', '2026-02-05 13:53:06'),
(1610, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:54:04', '2026-02-05 13:54:04'),
(1611, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:54:06', '2026-02-05 13:54:06'),
(1612, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:55:06', '2026-02-05 13:55:06'),
(1613, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:55:08', '2026-02-05 13:55:08');
INSERT INTO `missed_trip_requests` (`id`, `customer_id`, `zone`, `latitude`, `longitude`, `weight`, `created_at`, `updated_at`) VALUES
(1614, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:56:03', '2026-02-05 13:56:03'),
(1615, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:56:06', '2026-02-05 13:56:06'),
(1616, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:57:04', '2026-02-05 13:57:04'),
(1617, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:58:04', '2026-02-05 13:58:04'),
(1618, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 13:59:04', '2026-02-05 13:59:04'),
(1619, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:00:07', '2026-02-05 14:00:07'),
(1620, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:01:05', '2026-02-05 14:01:05'),
(1621, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:02:05', '2026-02-05 14:02:05'),
(1622, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:03:04', '2026-02-05 14:03:04'),
(1623, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:04:05', '2026-02-05 14:04:05'),
(1624, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:05:06', '2026-02-05 14:05:06'),
(1625, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:06:04', '2026-02-05 14:06:04'),
(1626, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:07:05', '2026-02-05 14:07:05'),
(1627, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:08:05', '2026-02-05 14:08:05'),
(1628, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:09:05', '2026-02-05 14:09:05'),
(1629, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:10:06', '2026-02-05 14:10:06'),
(1630, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:11:05', '2026-02-05 14:11:05'),
(1631, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:12:04', '2026-02-05 14:12:04'),
(1632, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:13:04', '2026-02-05 14:13:04'),
(1633, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:14:04', '2026-02-05 14:14:04'),
(1634, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:15:04', '2026-02-05 14:15:04'),
(1635, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:16:04', '2026-02-05 14:16:04'),
(1636, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:17:04', '2026-02-05 14:17:04'),
(1637, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:18:03', '2026-02-05 14:18:03'),
(1638, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:19:05', '2026-02-05 14:19:05'),
(1639, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:20:05', '2026-02-05 14:20:05'),
(1640, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:21:04', '2026-02-05 14:21:04'),
(1641, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:22:04', '2026-02-05 14:22:04'),
(1642, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:23:05', '2026-02-05 14:23:05'),
(1643, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 14:23:08', '2026-02-05 14:23:08'),
(1644, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:24:07', '2026-02-05 14:24:07'),
(1645, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 14:24:09', '2026-02-05 14:24:09'),
(1646, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:25:04', '2026-02-05 14:25:04'),
(1647, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 14:25:07', '2026-02-05 14:25:07'),
(1648, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:26:04', '2026-02-05 14:26:04'),
(1649, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 14:26:06', '2026-02-05 14:26:06'),
(1650, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:27:04', '2026-02-05 14:27:04'),
(1651, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 14:27:06', '2026-02-05 14:27:06'),
(1652, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:28:05', '2026-02-05 14:28:05'),
(1653, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 14:28:07', '2026-02-05 14:28:07'),
(1654, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:29:04', '2026-02-05 14:29:04'),
(1655, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 14:29:06', '2026-02-05 14:29:06'),
(1656, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:30:05', '2026-02-05 14:30:05'),
(1657, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 14:30:07', '2026-02-05 14:30:07'),
(1658, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:31:04', '2026-02-05 14:31:04'),
(1659, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 14:31:06', '2026-02-05 14:31:06'),
(1660, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:32:05', '2026-02-05 14:32:05'),
(1661, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 14:32:07', '2026-02-05 14:32:07'),
(1662, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:33:06', '2026-02-05 14:33:06'),
(1663, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 14:33:07', '2026-02-05 14:33:07'),
(1664, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:34:04', '2026-02-05 14:34:04'),
(1665, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 14:34:06', '2026-02-05 14:34:06'),
(1666, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:35:05', '2026-02-05 14:35:05'),
(1667, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 14:35:07', '2026-02-05 14:35:07'),
(1668, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:36:05', '2026-02-05 14:36:05'),
(1669, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 14:36:07', '2026-02-05 14:36:07'),
(1670, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:37:06', '2026-02-05 14:37:06'),
(1671, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 14:37:08', '2026-02-05 14:37:08'),
(1672, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:38:04', '2026-02-05 14:38:04'),
(1673, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 14:38:06', '2026-02-05 14:38:06'),
(1674, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:39:06', '2026-02-05 14:39:06'),
(1675, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 14:39:08', '2026-02-05 14:39:08'),
(1676, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 14:40:05', '2026-02-05 14:40:05'),
(1677, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 14:41:04', '2026-02-05 14:41:04'),
(1678, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 14:42:04', '2026-02-05 14:42:04'),
(1679, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 14:43:05', '2026-02-05 14:43:05'),
(1680, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 14:44:04', '2026-02-05 14:44:04'),
(1681, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:44:07', '2026-02-05 14:44:07'),
(1682, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 14:45:04', '2026-02-05 14:45:04'),
(1683, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:45:06', '2026-02-05 14:45:06'),
(1684, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 14:46:03', '2026-02-05 14:46:03'),
(1685, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:46:05', '2026-02-05 14:46:05'),
(1686, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 14:47:04', '2026-02-05 14:47:04'),
(1687, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:47:06', '2026-02-05 14:47:06'),
(1688, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 14:48:04', '2026-02-05 14:48:04'),
(1689, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:48:07', '2026-02-05 14:48:07'),
(1690, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 14:49:05', '2026-02-05 14:49:05'),
(1691, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:49:07', '2026-02-05 14:49:07'),
(1692, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 14:50:05', '2026-02-05 14:50:05'),
(1693, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:50:07', '2026-02-05 14:50:07'),
(1694, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 14:51:04', '2026-02-05 14:51:04'),
(1695, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:51:06', '2026-02-05 14:51:06'),
(1696, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 14:52:04', '2026-02-05 14:52:04'),
(1697, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:52:06', '2026-02-05 14:52:06'),
(1698, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 14:53:03', '2026-02-05 14:53:03'),
(1699, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:53:05', '2026-02-05 14:53:05'),
(1700, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 14:54:05', '2026-02-05 14:54:05'),
(1701, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:54:07', '2026-02-05 14:54:07'),
(1702, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 14:55:04', '2026-02-05 14:55:04'),
(1703, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:55:06', '2026-02-05 14:55:06'),
(1704, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 14:56:04', '2026-02-05 14:56:04'),
(1705, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:56:06', '2026-02-05 14:56:06'),
(1706, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 14:57:04', '2026-02-05 14:57:04'),
(1707, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:57:07', '2026-02-05 14:57:07'),
(1708, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 14:58:04', '2026-02-05 14:58:04'),
(1709, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:58:06', '2026-02-05 14:58:06'),
(1710, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 14:59:04', '2026-02-05 14:59:04'),
(1711, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 14:59:06', '2026-02-05 14:59:06'),
(1712, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 14:59:09', '2026-02-05 14:59:09'),
(1713, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 15:00:04', '2026-02-05 15:00:04'),
(1714, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 15:00:06', '2026-02-05 15:00:06'),
(1715, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:00:09', '2026-02-05 15:00:09'),
(1716, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 15:01:04', '2026-02-05 15:01:04'),
(1717, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 15:01:06', '2026-02-05 15:01:06'),
(1718, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:01:09', '2026-02-05 15:01:09'),
(1719, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 15:02:06', '2026-02-05 15:02:06'),
(1720, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 15:02:08', '2026-02-05 15:02:08'),
(1721, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:02:10', '2026-02-05 15:02:10'),
(1722, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 15:03:04', '2026-02-05 15:03:04'),
(1723, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 15:03:07', '2026-02-05 15:03:07'),
(1724, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:03:09', '2026-02-05 15:03:09'),
(1725, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 15:04:04', '2026-02-05 15:04:04'),
(1726, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 15:04:06', '2026-02-05 15:04:06'),
(1727, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:04:08', '2026-02-05 15:04:08'),
(1728, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 15:05:04', '2026-02-05 15:05:04'),
(1729, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 15:05:06', '2026-02-05 15:05:06'),
(1730, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:05:09', '2026-02-05 15:05:09'),
(1731, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 15:06:04', '2026-02-05 15:06:04'),
(1732, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 15:06:06', '2026-02-05 15:06:06'),
(1733, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:06:09', '2026-02-05 15:06:09'),
(1734, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 15:07:04', '2026-02-05 15:07:04'),
(1735, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 15:07:06', '2026-02-05 15:07:06'),
(1736, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:07:08', '2026-02-05 15:07:08'),
(1737, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 15:08:04', '2026-02-05 15:08:04'),
(1738, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 15:08:06', '2026-02-05 15:08:06'),
(1739, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:08:09', '2026-02-05 15:08:09'),
(1740, 40, 3, 9.9102241890996, 78.08938767761, 0.25, '2026-02-05 15:09:04', '2026-02-05 15:09:04'),
(1741, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 15:09:07', '2026-02-05 15:09:07'),
(1742, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:09:09', '2026-02-05 15:09:09'),
(1743, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 15:10:04', '2026-02-05 15:10:04'),
(1744, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:10:06', '2026-02-05 15:10:06'),
(1745, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 15:11:04', '2026-02-05 15:11:04'),
(1746, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:11:06', '2026-02-05 15:11:06'),
(1747, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 15:12:04', '2026-02-05 15:12:04'),
(1748, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:12:06', '2026-02-05 15:12:06'),
(1749, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 15:13:04', '2026-02-05 15:13:04'),
(1750, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:13:06', '2026-02-05 15:13:06'),
(1751, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 15:14:04', '2026-02-05 15:14:04'),
(1752, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:14:06', '2026-02-05 15:14:06'),
(1753, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 15:15:04', '2026-02-05 15:15:04'),
(1754, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:15:07', '2026-02-05 15:15:07'),
(1755, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 15:16:04', '2026-02-05 15:16:04'),
(1756, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:16:06', '2026-02-05 15:16:06'),
(1757, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 15:17:03', '2026-02-05 15:17:03'),
(1758, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:17:05', '2026-02-05 15:17:05'),
(1759, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 15:18:04', '2026-02-05 15:18:04'),
(1760, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:18:06', '2026-02-05 15:18:06'),
(1761, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 15:19:04', '2026-02-05 15:19:04'),
(1762, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:19:06', '2026-02-05 15:19:06'),
(1763, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 15:20:04', '2026-02-05 15:20:04'),
(1764, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:20:07', '2026-02-05 15:20:07'),
(1765, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 15:21:04', '2026-02-05 15:21:04'),
(1766, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:21:06', '2026-02-05 15:21:06'),
(1767, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 15:22:04', '2026-02-05 15:22:04'),
(1768, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:22:06', '2026-02-05 15:22:06'),
(1769, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 15:23:07', '2026-02-05 15:23:07'),
(1770, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:23:09', '2026-02-05 15:23:09'),
(1771, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 15:24:05', '2026-02-05 15:24:05'),
(1772, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:24:07', '2026-02-05 15:24:07'),
(1773, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 15:25:04', '2026-02-05 15:25:04'),
(1774, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:25:06', '2026-02-05 15:25:06'),
(1775, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 15:26:04', '2026-02-05 15:26:04'),
(1776, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:26:06', '2026-02-05 15:26:06'),
(1777, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 15:27:04', '2026-02-05 15:27:04'),
(1778, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:27:06', '2026-02-05 15:27:06'),
(1779, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 15:28:04', '2026-02-05 15:28:04'),
(1780, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:28:06', '2026-02-05 15:28:06'),
(1781, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 15:29:04', '2026-02-05 15:29:04'),
(1782, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:29:06', '2026-02-05 15:29:06'),
(1783, 0, 3, 9.9285502, 78.0994099, 0.25, '2026-02-05 15:30:06', '2026-02-05 15:30:06'),
(1784, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:30:08', '2026-02-05 15:30:08'),
(1785, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:31:04', '2026-02-05 15:31:04'),
(1786, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:32:05', '2026-02-05 15:32:05'),
(1787, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:33:05', '2026-02-05 15:33:05'),
(1788, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:34:04', '2026-02-05 15:34:04'),
(1789, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:35:04', '2026-02-05 15:35:04'),
(1790, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:36:04', '2026-02-05 15:36:04'),
(1791, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:37:04', '2026-02-05 15:37:04'),
(1792, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:38:05', '2026-02-05 15:38:05'),
(1793, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:39:04', '2026-02-05 15:39:04'),
(1794, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:40:07', '2026-02-05 15:40:07'),
(1795, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:41:04', '2026-02-05 15:41:04'),
(1796, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:42:04', '2026-02-05 15:42:04'),
(1797, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:43:04', '2026-02-05 15:43:04'),
(1798, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:44:04', '2026-02-05 15:44:04'),
(1799, 40, 3, 9.9101743178222, 78.089386336505, 0.25, '2026-02-05 15:45:04', '2026-02-05 15:45:04'),
(1800, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 15:51:05', '2026-02-05 15:51:05'),
(1801, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 15:52:04', '2026-02-05 15:52:04'),
(1802, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 15:53:05', '2026-02-05 15:53:05'),
(1803, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 15:54:04', '2026-02-05 15:54:04'),
(1804, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 15:55:04', '2026-02-05 15:55:04'),
(1805, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 15:56:04', '2026-02-05 15:56:04'),
(1806, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 15:57:04', '2026-02-05 15:57:04'),
(1807, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 15:58:04', '2026-02-05 15:58:04'),
(1808, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 15:59:04', '2026-02-05 15:59:04'),
(1809, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 16:00:05', '2026-02-05 16:00:05'),
(1810, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 16:01:04', '2026-02-05 16:01:04'),
(1811, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 16:02:05', '2026-02-05 16:02:05'),
(1812, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 16:03:04', '2026-02-05 16:03:04'),
(1813, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 16:04:03', '2026-02-05 16:04:03'),
(1814, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 16:05:04', '2026-02-05 16:05:04'),
(1815, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 16:06:04', '2026-02-05 16:06:04'),
(1816, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 16:07:04', '2026-02-05 16:07:04'),
(1817, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 16:08:03', '2026-02-05 16:08:03'),
(1818, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 16:09:04', '2026-02-05 16:09:04'),
(1819, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 16:10:04', '2026-02-05 16:10:04'),
(1820, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 16:11:04', '2026-02-05 16:11:04'),
(1821, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 16:12:03', '2026-02-05 16:12:03'),
(1822, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 16:13:04', '2026-02-05 16:13:04'),
(1823, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 16:14:03', '2026-02-05 16:14:03'),
(1824, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 16:15:04', '2026-02-05 16:15:04'),
(1825, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 16:16:04', '2026-02-05 16:16:04'),
(1826, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 16:17:04', '2026-02-05 16:17:04'),
(1827, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 16:18:04', '2026-02-05 16:18:04'),
(1828, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 16:19:05', '2026-02-05 16:19:05'),
(1829, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 16:20:04', '2026-02-05 16:20:04'),
(1830, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 16:21:04', '2026-02-05 16:21:04'),
(1831, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 16:22:04', '2026-02-05 16:22:04'),
(1832, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 16:23:04', '2026-02-05 16:23:04'),
(1833, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 16:24:03', '2026-02-05 16:24:03'),
(1834, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 16:25:05', '2026-02-05 16:25:05'),
(1835, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 16:26:04', '2026-02-05 16:26:04'),
(1836, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 16:27:04', '2026-02-05 16:27:04'),
(1837, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 16:28:04', '2026-02-05 16:28:04'),
(1838, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 16:29:04', '2026-02-05 16:29:04'),
(1839, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 16:30:04', '2026-02-05 16:30:04'),
(1840, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 16:31:03', '2026-02-05 16:31:03'),
(1841, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 16:32:04', '2026-02-05 16:32:04'),
(1842, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 16:33:04', '2026-02-05 16:33:04'),
(1843, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 16:34:04', '2026-02-05 16:34:04'),
(1844, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 16:35:04', '2026-02-05 16:35:04'),
(1845, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 16:36:04', '2026-02-05 16:36:04'),
(1846, 1, 3, 9.9100889950546, 78.091061878949, 0.25, '2026-02-05 16:37:04', '2026-02-05 16:37:04'),
(1847, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 18:50:06', '2026-02-05 18:50:06'),
(1848, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 18:51:05', '2026-02-05 18:51:05'),
(1849, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 18:52:04', '2026-02-05 18:52:04'),
(1850, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 18:53:04', '2026-02-05 18:53:04'),
(1851, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 18:54:08', '2026-02-05 18:54:08'),
(1852, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 18:55:05', '2026-02-05 18:55:05'),
(1853, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 18:56:04', '2026-02-05 18:56:04'),
(1854, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 18:57:03', '2026-02-05 18:57:03'),
(1855, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 18:58:04', '2026-02-05 18:58:04'),
(1856, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 18:59:04', '2026-02-05 18:59:04'),
(1857, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 19:00:09', '2026-02-05 19:00:09'),
(1858, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 19:01:04', '2026-02-05 19:01:04'),
(1859, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 19:02:04', '2026-02-05 19:02:04'),
(1860, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 19:03:04', '2026-02-05 19:03:04'),
(1861, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 19:04:04', '2026-02-05 19:04:04'),
(1862, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 19:05:04', '2026-02-05 19:05:04'),
(1863, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 19:06:04', '2026-02-05 19:06:04'),
(1864, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 19:07:05', '2026-02-05 19:07:05'),
(1865, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 19:08:04', '2026-02-05 19:08:04'),
(1866, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 19:09:05', '2026-02-05 19:09:05'),
(1867, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 19:10:06', '2026-02-05 19:10:06'),
(1868, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 19:11:04', '2026-02-05 19:11:04'),
(1869, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 19:12:05', '2026-02-05 19:12:05'),
(1870, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 19:13:05', '2026-02-05 19:13:05'),
(1871, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 19:14:04', '2026-02-05 19:14:04'),
(1872, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 19:15:05', '2026-02-05 19:15:05'),
(1873, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 19:16:07', '2026-02-05 19:16:07'),
(1874, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 19:17:04', '2026-02-05 19:17:04'),
(1875, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 19:18:04', '2026-02-05 19:18:04'),
(1876, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 19:19:06', '2026-02-05 19:19:06'),
(1877, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 19:20:06', '2026-02-05 19:20:06'),
(1878, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 19:21:04', '2026-02-05 19:21:04'),
(1879, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 19:22:04', '2026-02-05 19:22:04'),
(1880, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 19:23:04', '2026-02-05 19:23:04'),
(1881, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 19:24:04', '2026-02-05 19:24:04'),
(1882, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 19:25:04', '2026-02-05 19:25:04'),
(1883, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 19:26:06', '2026-02-05 19:26:06'),
(1884, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 19:27:04', '2026-02-05 19:27:04'),
(1885, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 19:28:04', '2026-02-05 19:28:04'),
(1886, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 19:29:04', '2026-02-05 19:29:04'),
(1887, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 19:30:05', '2026-02-05 19:30:05'),
(1888, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 19:31:04', '2026-02-05 19:31:04'),
(1889, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 19:32:04', '2026-02-05 19:32:04'),
(1890, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 19:33:05', '2026-02-05 19:33:05'),
(1891, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 19:34:04', '2026-02-05 19:34:04'),
(1892, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 19:35:05', '2026-02-05 19:35:05'),
(1893, 1, 3, 9.9101978054634, 78.089465964586, 0.25, '2026-02-05 19:36:05', '2026-02-05 19:36:05'),
(1894, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:20:05', '2026-02-06 17:20:05'),
(1895, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:20:07', '2026-02-06 17:20:07'),
(1896, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:21:05', '2026-02-06 17:21:05'),
(1897, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:21:07', '2026-02-06 17:21:07'),
(1898, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:22:04', '2026-02-06 17:22:04'),
(1899, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:22:07', '2026-02-06 17:22:07'),
(1900, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:23:05', '2026-02-06 17:23:05'),
(1901, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:23:07', '2026-02-06 17:23:07'),
(1902, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:24:03', '2026-02-06 17:24:03'),
(1903, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:24:05', '2026-02-06 17:24:05'),
(1904, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:25:05', '2026-02-06 17:25:05'),
(1905, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:25:07', '2026-02-06 17:25:07'),
(1906, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:26:05', '2026-02-06 17:26:05'),
(1907, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:26:07', '2026-02-06 17:26:07'),
(1908, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:27:03', '2026-02-06 17:27:03'),
(1909, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:27:05', '2026-02-06 17:27:05'),
(1910, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:28:05', '2026-02-06 17:28:05'),
(1911, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:28:07', '2026-02-06 17:28:07'),
(1912, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:29:06', '2026-02-06 17:29:06'),
(1913, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:29:08', '2026-02-06 17:29:08'),
(1914, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:30:09', '2026-02-06 17:30:09'),
(1915, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:30:12', '2026-02-06 17:30:12'),
(1916, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:31:06', '2026-02-06 17:31:06'),
(1917, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:31:08', '2026-02-06 17:31:08'),
(1918, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:32:05', '2026-02-06 17:32:05'),
(1919, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:32:07', '2026-02-06 17:32:07'),
(1920, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:33:06', '2026-02-06 17:33:06'),
(1921, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:33:08', '2026-02-06 17:33:08'),
(1922, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:34:05', '2026-02-06 17:34:05'),
(1923, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:34:07', '2026-02-06 17:34:07'),
(1924, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:35:04', '2026-02-06 17:35:04'),
(1925, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:35:06', '2026-02-06 17:35:06'),
(1926, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:36:04', '2026-02-06 17:36:04'),
(1927, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:36:06', '2026-02-06 17:36:06'),
(1928, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:37:04', '2026-02-06 17:37:04'),
(1929, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:37:06', '2026-02-06 17:37:06'),
(1930, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:38:05', '2026-02-06 17:38:05'),
(1931, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:38:07', '2026-02-06 17:38:07'),
(1932, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:39:05', '2026-02-06 17:39:05'),
(1933, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:39:07', '2026-02-06 17:39:07'),
(1934, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:40:04', '2026-02-06 17:40:04'),
(1935, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:40:06', '2026-02-06 17:40:06'),
(1936, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:41:04', '2026-02-06 17:41:04'),
(1937, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:41:06', '2026-02-06 17:41:06'),
(1938, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:42:04', '2026-02-06 17:42:04'),
(1939, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:42:07', '2026-02-06 17:42:07'),
(1940, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:43:06', '2026-02-06 17:43:06'),
(1941, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:43:08', '2026-02-06 17:43:08'),
(1942, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:44:04', '2026-02-06 17:44:04'),
(1943, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:44:06', '2026-02-06 17:44:06'),
(1944, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:45:05', '2026-02-06 17:45:05'),
(1945, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:45:07', '2026-02-06 17:45:07'),
(1946, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:46:04', '2026-02-06 17:46:04'),
(1947, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:46:07', '2026-02-06 17:46:07'),
(1948, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:47:04', '2026-02-06 17:47:04'),
(1949, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:47:06', '2026-02-06 17:47:06'),
(1950, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:48:05', '2026-02-06 17:48:05'),
(1951, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:48:07', '2026-02-06 17:48:07'),
(1952, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:49:04', '2026-02-06 17:49:04'),
(1953, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:49:06', '2026-02-06 17:49:06'),
(1954, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:50:12', '2026-02-06 17:50:12'),
(1955, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:50:14', '2026-02-06 17:50:14'),
(1956, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:51:04', '2026-02-06 17:51:04'),
(1957, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:51:06', '2026-02-06 17:51:06'),
(1958, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:52:05', '2026-02-06 17:52:05'),
(1959, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:52:07', '2026-02-06 17:52:07'),
(1960, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:53:04', '2026-02-06 17:53:04'),
(1961, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:53:06', '2026-02-06 17:53:06'),
(1962, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:54:05', '2026-02-06 17:54:05'),
(1963, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:54:07', '2026-02-06 17:54:07'),
(1964, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:55:05', '2026-02-06 17:55:05'),
(1965, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:55:07', '2026-02-06 17:55:07'),
(1966, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:56:07', '2026-02-06 17:56:07'),
(1967, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:56:09', '2026-02-06 17:56:09'),
(1968, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:57:05', '2026-02-06 17:57:05'),
(1969, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:57:07', '2026-02-06 17:57:07'),
(1970, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:58:04', '2026-02-06 17:58:04'),
(1971, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:58:06', '2026-02-06 17:58:06'),
(1972, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:59:04', '2026-02-06 17:59:04'),
(1973, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 17:59:06', '2026-02-06 17:59:06'),
(1974, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 18:00:04', '2026-02-06 18:00:04'),
(1975, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 18:00:06', '2026-02-06 18:00:06'),
(1976, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 18:01:05', '2026-02-06 18:01:05'),
(1977, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 18:01:07', '2026-02-06 18:01:07'),
(1978, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 18:02:05', '2026-02-06 18:02:05'),
(1979, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 18:02:07', '2026-02-06 18:02:07'),
(1980, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 18:03:04', '2026-02-06 18:03:04'),
(1981, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 18:03:06', '2026-02-06 18:03:06'),
(1982, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 18:04:04', '2026-02-06 18:04:04'),
(1983, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 18:04:06', '2026-02-06 18:04:06'),
(1984, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 18:05:04', '2026-02-06 18:05:04'),
(1985, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 18:05:06', '2026-02-06 18:05:06'),
(1986, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 18:06:05', '2026-02-06 18:06:05'),
(1987, 1, 3, 9.91781745, 78.075001393904, 0.25, '2026-02-06 18:06:07', '2026-02-06 18:06:07');

-- --------------------------------------------------------

--
-- Table structure for table `mpesa_transactions`
--

CREATE TABLE `mpesa_transactions` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL DEFAULT 0,
  `payment_id` varchar(250) NOT NULL,
  `payment_ref` text DEFAULT NULL,
  `phone_with_code` text DEFAULT NULL,
  `payment_statement_id` varchar(250) DEFAULT '0',
  `payment_status` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `mpesa_transactions`
--

INSERT INTO `mpesa_transactions` (`id`, `customer_id`, `payment_id`, `payment_ref`, `phone_with_code`, `payment_statement_id`, `payment_status`, `created_at`, `updated_at`) VALUES
(1, 0, 'ws_CO_27012026125518140795531783', '{\"MerchantRequestID\":\"92fa-4d55-9ed5-e8329ac116ed9314\",\"CheckoutRequestID\":\"ws_CO_27012026125518140795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', NULL, '0', 0, '2026-01-27 15:25:18', '2026-01-27 15:25:27'),
(2, 2, 'ws_CO_27012026130039514795531783', '{\"MerchantRequestID\":\"9d78-4ce5-915b-8902d186b90911736\",\"CheckoutRequestID\":\"ws_CO_27012026130039514795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', NULL, '0', 1, '2026-01-27 15:30:39', '2026-01-27 15:30:48'),
(3, 2, 'ws_CO_27012026130108740795531783', '{\"MerchantRequestID\":\"4528-405d-bbed-3361b10cfd8e14084\",\"CheckoutRequestID\":\"ws_CO_27012026130108740795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', NULL, '0', 0, '2026-01-27 15:31:09', '2026-01-27 15:31:19'),
(4, 2, 'ws_CO_27012026130118196795531783', '{\"MerchantRequestID\":\"9d78-4ce5-915b-8902d186b90911745\",\"CheckoutRequestID\":\"ws_CO_27012026130118196795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', NULL, '0', 0, '2026-01-27 15:31:18', '2026-01-27 15:31:26'),
(5, 2, 'ws_CO_27012026130233719795531783', '{\"MerchantRequestID\":\"9d78-4ce5-915b-8902d186b90911771\",\"CheckoutRequestID\":\"ws_CO_27012026130233719795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', NULL, '0', 1, '2026-01-27 15:32:34', '2026-01-27 15:32:42'),
(6, 2, 'ws_CO_30012026121024382795531783', '{\"MerchantRequestID\":\"2e05-4f5f-8219-3dbd446de6fd660\",\"CheckoutRequestID\":\"ws_CO_30012026121024382795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', NULL, '0', 0, '2026-01-30 14:40:24', '2026-01-30 14:40:34'),
(7, 2, 'ws_CO_30012026122104639795531783', '{\"MerchantRequestID\":\"9449-45f0-8481-579f1416eb8217920\",\"CheckoutRequestID\":\"ws_CO_30012026122104639795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', NULL, '0', 0, '2026-01-30 14:51:05', '2026-01-30 14:51:18'),
(8, 2, 'ws_CO_30012026122108632795531783', '{\"MerchantRequestID\":\"efff-4bd5-8899-0a1c21d0fc34272\",\"CheckoutRequestID\":\"ws_CO_30012026122108632795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', NULL, '0', 0, '2026-01-30 14:51:09', '2026-01-30 14:51:16'),
(9, 2, 'ws_CO_30012026122154125795531783', '{\"MerchantRequestID\":\"9449-45f0-8481-579f1416eb8217934\",\"CheckoutRequestID\":\"ws_CO_30012026122154125795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', NULL, '0', 0, '2026-01-30 14:51:54', '2026-01-30 14:52:00'),
(10, 2, 'ws_CO_30012026123636378795531783', '{\"MerchantRequestID\":\"2e05-4f5f-8219-3dbd446de6fd931\",\"CheckoutRequestID\":\"ws_CO_30012026123636378795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', NULL, '0', 0, '2026-01-30 15:06:36', '2026-01-30 15:06:47'),
(11, 2, 'ws_CO_30012026124748013795531783', '{\"MerchantRequestID\":\"2415-4993-b68d-8e354cba2e802909\",\"CheckoutRequestID\":\"ws_CO_30012026124748013795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', NULL, '0', 0, '2026-01-30 15:17:48', '2026-01-30 15:18:17'),
(12, 2, 'ws_CO_30012026124833448795531783', '{\"MerchantRequestID\":\"2e05-4f5f-8219-3dbd446de6fd1045\",\"CheckoutRequestID\":\"ws_CO_30012026124833448795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', NULL, '0', 0, '2026-01-30 15:18:33', '2026-01-30 15:18:36'),
(13, 0, 'ws_CO_30012026125217432708374149', '{\"MerchantRequestID\":\"efff-4bd5-8899-0a1c21d0fc34587\",\"CheckoutRequestID\":\"ws_CO_30012026125217432708374149\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', NULL, '0', 0, '2026-01-30 15:22:17', '2026-01-30 15:22:36'),
(14, 2, 'ws_CO_30012026135146971795531783', '{\"MerchantRequestID\":\"2415-4993-b68d-8e354cba2e803624\",\"CheckoutRequestID\":\"ws_CO_30012026135146971795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', NULL, '0', 0, '2026-01-30 16:21:47', '2026-01-30 16:22:14'),
(15, 2, 'ws_CO_30012026135323125795531783', '{\"MerchantRequestID\":\"9449-45f0-8481-579f1416eb8218914\",\"CheckoutRequestID\":\"ws_CO_30012026135323125795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', NULL, '0', 0, '2026-01-30 16:23:23', '2026-01-30 16:23:27'),
(16, 2, 'ws_CO_30012026135336677795531783', '{\"MerchantRequestID\":\"2415-4993-b68d-8e354cba2e803655\",\"CheckoutRequestID\":\"ws_CO_30012026135336677795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', NULL, '0', 0, '2026-01-30 16:23:37', '2026-01-30 16:23:39'),
(17, 2, 'ws_CO_30012026135352960795531783', '{\"MerchantRequestID\":\"2e05-4f5f-8219-3dbd446de6fd1613\",\"CheckoutRequestID\":\"ws_CO_30012026135352960795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', NULL, '0', 0, '2026-01-30 16:23:53', '2026-01-30 16:24:21'),
(18, 2, 'ws_CO_30012026135508057795531783', '{\"MerchantRequestID\":\"efff-4bd5-8899-0a1c21d0fc341116\",\"CheckoutRequestID\":\"ws_CO_30012026135508057795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', NULL, '0', 0, '2026-01-30 16:25:08', '2026-01-30 16:25:14'),
(19, 2, 'ws_CO_30012026140150686795531783', '{\"MerchantRequestID\":\"efff-4bd5-8899-0a1c21d0fc341203\",\"CheckoutRequestID\":\"ws_CO_30012026140150686795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', NULL, '0', 0, '2026-01-30 16:31:51', '2026-01-30 16:31:59'),
(20, 19, 'ws_CO_30012026140404484795531783', '{\"MerchantRequestID\":\"efff-4bd5-8899-0a1c21d0fc341238\",\"CheckoutRequestID\":\"ws_CO_30012026140404484795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', NULL, '0', 0, '2026-01-30 16:34:04', '2026-01-30 16:34:29'),
(21, 2, 'ws_CO_30012026140415737795531783', '{\"MerchantRequestID\":\"9449-45f0-8481-579f1416eb8219024\",\"CheckoutRequestID\":\"ws_CO_30012026140415737795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', NULL, '0', 0, '2026-01-30 16:34:16', '2026-01-30 16:34:16'),
(22, 2, 'ws_CO_30012026154738073795531783', '{\"MerchantRequestID\":\"bf47-4a79-a5e6-6bd68fe3b14e168\",\"CheckoutRequestID\":\"ws_CO_30012026154738073795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', '+254795531783', NULL, 0, '2026-01-30 18:17:38', '2026-01-30 18:18:07'),
(23, 2, 'ws_CO_30012026155029532795531783', '{\"MerchantRequestID\":\"2415-4993-b68d-8e354cba2e804959\",\"CheckoutRequestID\":\"ws_CO_30012026155029532795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', '+254795531783', NULL, 0, '2026-01-30 18:20:29', '2026-01-30 18:20:57'),
(24, 2, 'ws_CO_30012026155412340795531783', '{\"MerchantRequestID\":\"bf47-4a79-a5e6-6bd68fe3b14e243\",\"CheckoutRequestID\":\"ws_CO_30012026155412340795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', '+254795531783', NULL, 1, '2026-01-30 18:24:12', '2026-01-31 10:49:44'),
(25, 2, 'ws_CO_30012026160528427795531783', '{\"MerchantRequestID\":\"bf47-4a79-a5e6-6bd68fe3b14e391\",\"CheckoutRequestID\":\"ws_CO_30012026160528427795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', '+254795531783', NULL, 0, '2026-01-30 18:35:28', '2026-01-30 18:35:35'),
(26, 2, 'ws_CO_30012026160955161795531783', '{\"MerchantRequestID\":\"bf47-4a79-a5e6-6bd68fe3b14e435\",\"CheckoutRequestID\":\"ws_CO_30012026160955161795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', '+254795531783', NULL, 0, '2026-01-30 18:39:55', '2026-01-30 18:40:22'),
(27, 2, 'ws_CO_30012026161346045795531783', '{\"MerchantRequestID\":\"2e05-4f5f-8219-3dbd446de6fd2853\",\"CheckoutRequestID\":\"ws_CO_30012026161346045795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', '+254795531783', '35', 0, '2026-01-30 18:43:46', '2026-01-30 18:43:56'),
(28, 2, 'ws_CO_30012026161829438795531783', '{\"MerchantRequestID\":\"2415-4993-b68d-8e354cba2e805302\",\"CheckoutRequestID\":\"ws_CO_30012026161829438795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', '+254795531783', '35', 1, '2026-01-30 18:48:29', '2026-01-30 18:54:29'),
(29, 2, 'ws_CO_30012026161923895795531783', '{\"MerchantRequestID\":\"2e05-4f5f-8219-3dbd446de6fd2874\",\"CheckoutRequestID\":\"ws_CO_30012026161923895795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', '+254795531783', '35', 0, '2026-01-30 18:49:24', '2026-01-30 18:49:29'),
(30, 2, 'ws_CO_30012026162743911795531783', '{\"MerchantRequestID\":\"bf47-4a79-a5e6-6bd68fe3b14e622\",\"CheckoutRequestID\":\"ws_CO_30012026162743911795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', '+254795531783', '34', 1, '2026-01-30 18:57:44', '2026-01-30 19:01:25'),
(31, 2, 'ws_CO_30012026212928807795531783', '{\"MerchantRequestID\":\"2e05-4f5f-8219-3dbd446de6fd5540\",\"CheckoutRequestID\":\"ws_CO_30012026212928807795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', '+254795531783', '35', 0, '2026-01-30 23:59:34', '2026-01-31 00:00:00'),
(32, 2, 'ws_CO_30012026215625730795531783', '{\"MerchantRequestID\":\"efff-4bd5-8899-0a1c21d0fc345318\",\"CheckoutRequestID\":\"ws_CO_30012026215625730795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', '+254795531783', '35', 0, '2026-01-31 00:26:26', '2026-01-31 00:26:42'),
(33, 2, 'ws_CO_30012026215822578795531783', '{\"MerchantRequestID\":\"2e05-4f5f-8219-3dbd446de6fd5796\",\"CheckoutRequestID\":\"ws_CO_30012026215822578795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', '+254795531783', '35', 1, '2026-01-31 00:28:22', '2026-01-31 00:28:36'),
(34, 2, 'ws_CO_30012026220000574795531783', '{\"MerchantRequestID\":\"2e05-4f5f-8219-3dbd446de6fd5802\",\"CheckoutRequestID\":\"ws_CO_30012026220000574795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', '+254795531783', '35', 0, '2026-01-31 00:30:05', '2026-01-31 00:30:33'),
(35, 2, 'ws_CO_30012026221755078795531783', '{\"MerchantRequestID\":\"2e05-4f5f-8219-3dbd446de6fd5946\",\"CheckoutRequestID\":\"ws_CO_30012026221755078795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', '+254795531783', '34', 0, '2026-01-31 00:47:55', '2026-01-31 00:48:22'),
(36, 2, 'ws_CO_31012026094918874795531783', '{\"MerchantRequestID\":\"bf47-4a79-a5e6-6bd68fe3b14e9834\",\"CheckoutRequestID\":\"ws_CO_31012026094918874795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', '+254795531783', '35', 0, '2026-01-31 12:19:19', '2026-01-31 12:19:32'),
(37, 2, 'ws_CO_31012026095109935795531783', '{\"MerchantRequestID\":\"3aed-4728-8c19-388c8e8230261715\",\"CheckoutRequestID\":\"ws_CO_31012026095109935795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', '+254795531783', '35', 0, '2026-01-31 12:21:10', '2026-01-31 12:21:19'),
(38, 2, 'ws_CO_31012026095836094795531783', '{\"MerchantRequestID\":\"3aed-4728-8c19-388c8e8230261759\",\"CheckoutRequestID\":\"ws_CO_31012026095836094795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', '+254795531783', '100', 0, '2026-01-31 12:28:36', '2026-01-31 12:28:55'),
(39, 2, 'ws_CO_31012026100359838795531783', '{\"MerchantRequestID\":\"3aed-4728-8c19-388c8e8230261838\",\"CheckoutRequestID\":\"ws_CO_31012026100359838795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', '+254795531783', '0', 1, '2026-01-31 12:34:00', '2026-01-31 12:43:56'),
(40, 2, 'ws_CO_31012026102422493795531783', '{\"MerchantRequestID\":\"bf47-4a79-a5e6-6bd68fe3b14e10174\",\"CheckoutRequestID\":\"ws_CO_31012026102422493795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', '+254795531783', '0', 1, '2026-01-31 12:54:23', '2026-01-31 12:54:55'),
(41, 2, 'ws_CO_31012026102956912795531783', '{\"MerchantRequestID\":\"3324-4c93-8afd-03559bef40f621\",\"CheckoutRequestID\":\"ws_CO_31012026102956912795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', '+254795531783', '0', 1, '2026-01-31 12:59:57', '2026-01-31 13:00:27'),
(42, 2, 'ws_CO_31012026103137307795531783', '{\"MerchantRequestID\":\"3aed-4728-8c19-388c8e8230262132\",\"CheckoutRequestID\":\"ws_CO_31012026103137307795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', '+254795531783', '35', 0, '2026-01-31 13:01:37', '2026-01-31 13:01:39'),
(43, 2, 'ws_CO_31012026103232938795531783', '{\"MerchantRequestID\":\"3324-4c93-8afd-03559bef40f648\",\"CheckoutRequestID\":\"ws_CO_31012026103232938795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', '+254795531783', '200', 0, '2026-01-31 13:02:33', '2026-01-31 13:02:44'),
(44, 2, 'ws_CO_31012026103526431795531783', '{\"MerchantRequestID\":\"3324-4c93-8afd-03559bef40f679\",\"CheckoutRequestID\":\"ws_CO_31012026103526431795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', '+254795531783', '0', 0, '2026-01-31 13:05:26', '2026-01-31 13:05:37'),
(45, 2, 'ws_CO_31012026103642160795531783', '{\"MerchantRequestID\":\"bf47-4a79-a5e6-6bd68fe3b14e10313\",\"CheckoutRequestID\":\"ws_CO_31012026103642160795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', '+254795531783', '954', 0, '2026-01-31 13:06:42', '2026-01-31 13:07:10'),
(46, 2, 'ws_CO_31012026104039817795531783', '{\"MerchantRequestID\":\"efff-4bd5-8899-0a1c21d0fc3411687\",\"CheckoutRequestID\":\"ws_CO_31012026104039817795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', '+254795531783', '55', 0, '2026-01-31 13:10:40', '2026-01-31 13:10:53'),
(47, 2, 'ws_CO_31012026104100571795531783', '{\"MerchantRequestID\":\"bf47-4a79-a5e6-6bd68fe3b14e10332\",\"CheckoutRequestID\":\"ws_CO_31012026104100571795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', '+254795531783', '555652', 0, '2026-01-31 13:11:00', '2026-01-31 13:11:20'),
(48, 2, 'ws_CO_31012026104404090795531783', '{\"MerchantRequestID\":\"3324-4c93-8afd-03559bef40f6164\",\"CheckoutRequestID\":\"ws_CO_31012026104404090795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', '+254795531783', 'undefined', 0, '2026-01-31 13:14:04', '2026-01-31 13:14:14'),
(49, 2, 'ws_CO_31012026104415866795531783', '{\"MerchantRequestID\":\"3aed-4728-8c19-388c8e8230262225\",\"CheckoutRequestID\":\"ws_CO_31012026104415866795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', '+254795531783', 'undefined', 0, '2026-01-31 13:14:16', '2026-01-31 13:14:23'),
(50, 2, 'ws_CO_31012026104449618795531783', '{\"MerchantRequestID\":\"efff-4bd5-8899-0a1c21d0fc3411733\",\"CheckoutRequestID\":\"ws_CO_31012026104449618795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', '+254795531783', 'undefined', 0, '2026-01-31 13:14:50', '2026-01-31 13:14:55'),
(51, 2, 'ws_CO_31012026104506004795531783', '{\"MerchantRequestID\":\"efff-4bd5-8899-0a1c21d0fc3411737\",\"CheckoutRequestID\":\"ws_CO_31012026104506004795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', '+254795531783', '0', 0, '2026-01-31 13:15:06', '2026-01-31 13:15:11'),
(52, 2, 'ws_CO_31012026104526462795531783', '{\"MerchantRequestID\":\"efff-4bd5-8899-0a1c21d0fc3411742\",\"CheckoutRequestID\":\"ws_CO_31012026104526462795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', '+254795531783', '22', 0, '2026-01-31 13:15:26', '2026-01-31 13:15:31'),
(53, 2, 'ws_CO_31012026104757822795531783', '{\"MerchantRequestID\":\"3aed-4728-8c19-388c8e8230262273\",\"CheckoutRequestID\":\"ws_CO_31012026104757822795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', '+254795531783', '6444', 0, '2026-01-31 13:17:58', '2026-01-31 13:18:03'),
(54, 2, 'ws_CO_31012026104953247795531783', '{\"MerchantRequestID\":\"bf47-4a79-a5e6-6bd68fe3b14e10407\",\"CheckoutRequestID\":\"ws_CO_31012026104953247795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', '+254795531783', '644', 0, '2026-01-31 13:19:53', '2026-01-31 13:20:04'),
(55, 2, 'ws_CO_31012026105013422795531783', '{\"MerchantRequestID\":\"bf47-4a79-a5e6-6bd68fe3b14e10410\",\"CheckoutRequestID\":\"ws_CO_31012026105013422795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', '+254795531783', '6444', 0, '2026-01-31 13:20:13', '2026-01-31 13:20:28'),
(56, 2, 'ws_CO_31012026105020631795531783', '{\"MerchantRequestID\":\"3324-4c93-8afd-03559bef40f6219\",\"CheckoutRequestID\":\"ws_CO_31012026105020631795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', '+254795531783', '81185', 0, '2026-01-31 13:20:21', '2026-01-31 13:20:23'),
(57, 2, 'ws_CO_31012026105331145795531783', '{\"MerchantRequestID\":\"3aed-4728-8c19-388c8e8230262304\",\"CheckoutRequestID\":\"ws_CO_31012026105331145795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', '+254795531783', '6444', 0, '2026-01-31 13:23:31', '2026-01-31 13:23:36'),
(58, 2, 'ws_CO_31012026105913341795531783', '{\"MerchantRequestID\":\"efff-4bd5-8899-0a1c21d0fc3411861\",\"CheckoutRequestID\":\"ws_CO_31012026105913341795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', '+254795531783', '552', 0, '2026-01-31 13:29:14', '2026-01-31 13:29:24'),
(59, 2, 'ws_CO_31012026112201151795531783', '{\"MerchantRequestID\":\"bf47-4a79-a5e6-6bd68fe3b14e10669\",\"CheckoutRequestID\":\"ws_CO_31012026112201151795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', '+254795531783', '542', 0, '2026-01-31 13:52:01', '2026-01-31 13:52:08'),
(60, 2, 'ws_CO_31012026120417347795531783', '{\"MerchantRequestID\":\"3aed-4728-8c19-388c8e8230262888\",\"CheckoutRequestID\":\"ws_CO_31012026120417347795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', '+254795531783', '1', 0, '2026-01-31 14:34:18', '2026-01-31 14:34:36'),
(61, 2, 'ws_CO_04022026073545538795531783', '{\"MerchantRequestID\":\"439b-4dc4-8421-10d4a000bef13370\",\"CheckoutRequestID\":\"ws_CO_04022026073545538795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', '+254795531783', '82', 1, '2026-02-04 10:05:46', '2026-02-04 10:11:03'),
(62, 2, 'ws_CO_04022026082327605795531783', '{\"MerchantRequestID\":\"a66d-403e-a321-0161751af1607017\",\"CheckoutRequestID\":\"ws_CO_04022026082327605795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', '+254795531783', '82', 1, '2026-02-04 10:53:28', '2026-02-04 10:53:28'),
(63, 2, 'ws_CO_04022026104820759795531783', '{\"MerchantRequestID\":\"439b-4dc4-8421-10d4a000bef15064\",\"CheckoutRequestID\":\"ws_CO_04022026104820759795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', '+254795531783', '82', 0, '2026-02-04 13:18:21', '2026-02-04 13:18:36'),
(64, 2, 'ws_CO_04022026104859882795531783', '{\"MerchantRequestID\":\"a66d-403e-a321-0161751af1608285\",\"CheckoutRequestID\":\"ws_CO_04022026104859882795531783\",\"ResponseCode\":\"0\",\"ResponseDescription\":\"Success. Request accepted for processing\",\"CustomerMessage\":\"Success. Request accepted for processing\"}', '+254795531783', '35', 0, '2026-02-04 13:19:00', '2026-02-04 13:19:27');

-- --------------------------------------------------------

--
-- Table structure for table `notification_messages`
--

CREATE TABLE `notification_messages` (
  `id` int(11) NOT NULL,
  `type` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(250) NOT NULL,
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title_ar` varchar(250) DEFAULT NULL,
  `message_ar` text DEFAULT NULL,
  `image` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notification_messages`
--

INSERT INTO `notification_messages` (`id`, `type`, `title`, `message`, `title_ar`, `message_ar`, `image`, `status`, `created_at`, `updated_at`) VALUES
(1, '1', 'Flash Sale! Save 30% on Your Next Ride!', 'Book a ride now and use code FLASH30 to get 30% off. Limited time only!', 'Flash Sale! Save 30% on Your Next Ride!', 'Book a ride now and use code FLASH30 to get 30% off. Limited time only!', 'image/580f337e2fc3d9d60d2a636c434791fd.png', 1, '2024-11-13 12:31:20', '2024-11-13 12:31:20'),
(2, '1', 'Happy Hour Savings: 50% Off!', 'Book between 2-5 PM to enjoy half off your ride. Use code HAPPY50 at checkout!', 'Happy Hour Savings: 50% Off!', 'Book between 2-5 PM to enjoy half off your ride. Use code HAPPY50 at checkout!', 'image/b5901ba77e1f7157ef31779aae782247.png', 1, '2024-11-13 12:31:48', '2024-11-13 12:31:48'),
(3, '1', 'Save on Your Morning Commute!', 'Start your day with a 10% discount on morning rides. Use code MORNING10 before 9 AM.', 'Save on Your Morning Commute!', 'Start your day with a 10% discount on morning rides. Use code MORNING10 before 9 AM.', 'image/debec73462baf376bd9269bf7b54a19d.png', 1, '2024-11-13 12:32:16', '2024-11-13 12:32:16'),
(4, '1', 'Welcome! Enjoy 50% Off Your First Ride\"', 'Book your first ride and get 50% off with code FIRST50. We’re excited to take you places!', 'Welcome! Enjoy 50% Off Your First Ride\"', 'Book your first ride and get 50% off with code FIRST50. We’re excited to take you places!', 'image/cd40545b1cb1e8e82c7914a29921f3cb.png', 1, '2024-11-13 12:32:37', '2024-11-13 12:32:37'),
(5, '1', 'Group Ride Savings – 30% Off!', 'Travel with family or friends and get 30% off. Use code GROUP30 for shared savings!', 'خصم 30% على الرحلات الجماعية!', 'سافر مع عائلتك أو أصدقائك واحصل على خصم ٣٠٪. استخدم الرمز GROUP30 لتوفير مشترك!', 'image/d529942dae9d7923efe2c31e899b48a4.png', 1, '2024-11-13 12:33:04', '2025-09-01 03:45:42'),
(6, '2', 'Ready to Drive?', 'You\'re online but haven\'t received a request yet. Stay active and increase your chances for a ride!', 'هل أنت مستعد للقيادة؟', 'أنت متصل ولكن لم تتلق طلبًا بعد. كن نشيطًا وزد فرصك في الركوب!', 'image/8e12f91508aa6aa45ef3e166a6183235.png', 1, '2024-11-13 12:33:33', '2025-02-01 15:58:24'),
(7, '2', 'High Demand Nearby!', 'Passengers are looking for rides in your area. Go online to increase your chances of a ride and higher earnings!', 'ارتفاع الطلب في مكان قريب!', 'يبحث الركاب عن رحلات في منطقتك. اتصل بالإنترنت لزيادة فرصك في الحصول على رحلة وأرباح أعلى!', 'image/0f92c1a315919ab5143416c4721208f4.png', 1, '2024-11-13 12:33:57', '2025-02-01 15:58:45'),
(8, '2', 'Safety Tip of the Day', 'Remember to follow safe driving practices to ensure a comfortable and secure ride for you and your passengers.', 'نصيحة السلامة لهذا اليوم', 'تذكر أن تتبع ممارسات القيادة الآمنة لضمان رحلة مريحة وآمنة لك وللركاب.', 'image/f653144d53aeb9796f2721a393e56124.png', 1, '2024-11-13 12:34:23', '2025-02-01 15:59:01'),
(9, '2', 'Traffic Alert!', 'Expect delays ahead. Adjust your route to ensure timely pickup and drop-off.', 'تنبيه حركة المرور!', 'توقع التأخير في المستقبل. اضبط مسارك لضمان الالتقاط والتوصيل في الوقت المناسب.', 'image/48160e54be96d1dbe20449b88d414456.png', 1, '2024-11-13 12:34:48', '2025-02-01 15:59:19'),
(10, '2', 'Vehicle Maintenance Reminder', 'It’s time for a check-up! Keep your vehicle in good condition for a smoother ride experience.', 'تذكير صيانة المركبات', 'حان وقت الفحص! حافظ على سيارتك في حالة جيدة لتجربة قيادة أكثر سلاسة.', 'image/a80cdbc9b144c31196f42649f0c5cc7a.png', 1, '2024-11-13 12:35:12', '2025-02-01 15:59:42');

-- --------------------------------------------------------

--
-- Table structure for table `offer_types`
--

CREATE TABLE `offer_types` (
  `id` int(11) NOT NULL,
  `type` varchar(250) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `operators`
--

CREATE TABLE `operators` (
  `id` int(11) NOT NULL,
  `operator_name` varchar(300) NOT NULL,
  `phone_number` varchar(300) NOT NULL,
  `phone_with_code` varchar(300) NOT NULL,
  `email` varchar(300) NOT NULL,
  `password` varchar(300) DEFAULT NULL,
  `profile_picture` varchar(300) NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `operators`
--

INSERT INTO `operators` (`id`, `operator_name`, `phone_number`, `phone_with_code`, `email`, `password`, `profile_picture`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Elliot Alderson', '6384628998', '+916384628998', 'elliot@gmail.com', '$2y$12$04Y1YX3xqNI12UkNsMcGBuiypBxE0icjXBL1ptiauDckf//.AtfNi', 'image/ffb02728c466360748d7e64c21834054.png', 1, '2025-07-30 21:02:34', '2025-07-30 21:02:50');

-- --------------------------------------------------------

--
-- Table structure for table `operator_vehicles`
--

CREATE TABLE `operator_vehicles` (
  `id` int(11) NOT NULL,
  `operator_id` int(11) NOT NULL,
  `vehicle_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `operator_vehicles`
--

INSERT INTO `operator_vehicles` (`id`, `operator_id`, `vehicle_id`, `created_at`, `updated_at`) VALUES
(1, 1, 205, '2025-07-30 21:05:37', '2025-07-30 21:05:37'),
(2, 1, 153, '2025-07-30 21:06:08', '2025-07-30 21:06:08'),
(3, 1, 137, '2025-07-30 21:06:48', '2025-07-30 21:06:48'),
(4, 1, 19, '2025-07-30 21:07:16', '2025-07-30 21:07:29');

-- --------------------------------------------------------

--
-- Table structure for table `our_services`
--

CREATE TABLE `our_services` (
  `id` int(11) NOT NULL,
  `title` varchar(250) NOT NULL,
  `description` text NOT NULL,
  `icon` varchar(250) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `our_services`
--

INSERT INTO `our_services` (`id`, `title`, `description`, `icon`, `created_at`, `updated_at`) VALUES
(1, 'View and Select Trip', 'Browse available trips, choose your desired one, select a vehicle, and confirm the booking', 'icons/e89c8e42dabc9a0a62b726bd7cd0aa52.png', '2024-12-27 11:17:34', '2025-01-17 12:01:58'),
(2, 'Request and Connect', 'Request a ride, and the app connects you with a nearby driver for quick and efficient transport', 'icons/39a28fb7df2bc9a484a5a511bae5620d.png', '2025-01-06 11:02:16', '2025-01-17 11:53:36'),
(3, 'Driver Acceptance', 'Drivers receive ride requests and decide whether to accept or decline, ensuring the right match for the ride', 'icons/cf54991bb5b6bd27b3125746303bf5c3.png', '2025-01-07 12:20:52', '2025-01-17 11:56:00'),
(4, 'Track Trip Status', 'Drivers update the trip status, keeping passengers informed about the ride progress for a seamless experience', 'icons/cfd64097aaaf77550ad8498666c25991.png', '2025-01-09 12:30:02', '2025-01-17 11:57:42'),
(5, 'Ride History & Receipts', 'Access past rides, receipts, and manage your travel easily.', 'icons/3e2a8abb0060eb2dd5fac79e22e00822.png', '2025-10-15 12:33:49', '2025-10-15 12:33:49'),
(6, 'Real-Time Ride Tracking', 'Monitor your ride in real-time and know exactly where your driver is at all times.', 'icons/745d0a99493b2ef535cf3eb5eb7e3eb2.png', '2025-10-15 12:35:10', '2025-10-15 12:35:10');

-- --------------------------------------------------------

--
-- Table structure for table `outstation_fare_management`
--

CREATE TABLE `outstation_fare_management` (
  `id` int(11) NOT NULL,
  `vehicle_type` int(11) NOT NULL DEFAULT 0,
  `trip_sub_type_id` int(11) NOT NULL,
  `base_fare` varchar(250) NOT NULL,
  `price_per_km` varchar(250) NOT NULL,
  `driver_allowance` varchar(250) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `outstation_fare_management`
--

INSERT INTO `outstation_fare_management` (`id`, `vehicle_type`, `trip_sub_type_id`, `base_fare`, `price_per_km`, `driver_allowance`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '50', '11', '100', 1, '2023-10-26 14:49:14', '2024-11-12 18:28:54'),
(2, 2, 1, '3250', '13', '450', 1, '2023-10-26 14:49:39', '2024-12-15 18:52:27'),
(3, 3, 1, '50', '12', '100', 1, '2023-10-26 14:49:57', '2024-11-12 18:29:05'),
(5, 1, 2, '100', '20', '100', 1, '2023-10-26 14:51:42', '2025-02-11 11:56:08'),
(6, 2, 2, '100', '21', '100', 1, '2023-10-26 14:52:00', '2025-02-11 11:56:14'),
(7, 3, 2, '100', '22', '100', 1, '2023-10-26 14:52:25', '2025-02-11 11:56:19');

-- --------------------------------------------------------

--
-- Table structure for table `packages`
--

CREATE TABLE `packages` (
  `id` int(11) NOT NULL,
  `package_name` varchar(250) NOT NULL,
  `package_name_ar` varchar(150) DEFAULT NULL,
  `hours` varchar(250) NOT NULL,
  `kilometers` varchar(250) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `packages`
--

INSERT INTO `packages` (`id`, `package_name`, `package_name_ar`, `hours`, `kilometers`, `created_at`, `updated_at`) VALUES
(1, 'Minimum', 'Minimum', '1', '5', '2022-12-18 11:16:00', '2022-12-18 11:16:00'),
(2, 'Normal', 'Normal', '2', '1', '2022-12-18 11:16:23', '2024-12-29 03:45:06'),
(3, 'Moderate', 'Moderate', '3', '15', '2022-12-18 11:16:39', '2022-12-18 11:16:39'),
(4, 'Maximum', 'Maximum', '4', '20', '2022-12-18 11:16:58', '2022-12-18 11:17:06'),
(5, 'six hours', 'six hours', '6', '25', '2023-01-23 18:41:13', '2023-01-23 18:41:13'),
(6, 'seven hours', 'seven hours', '7', '70', '2023-01-23 18:41:56', '2025-05-13 18:28:22'),
(7, 'eight hours', 'eight hours', '8', '35', '2023-01-23 18:42:45', '2023-01-23 18:42:45'),
(8, 'Nine hours', 'Nine hours', '9', '40', '2023-01-23 18:43:13', '2023-01-23 18:43:13'),
(9, 'Ten hours', 'Ten hours', '10', '45', '2023-01-23 18:43:43', '2025-05-02 12:05:00');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(191) NOT NULL,
  `token` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment_histories`
--

CREATE TABLE `payment_histories` (
  `id` int(11) NOT NULL,
  `trip_id` int(11) NOT NULL,
  `mode` varchar(100) NOT NULL,
  `amount` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payment_histories`
--

INSERT INTO `payment_histories` (`id`, `trip_id`, `mode`, `amount`, `created_at`, `updated_at`) VALUES
(1, 1, 'Cash', '75.5', '2024-11-12 18:55:08', '2024-11-12 18:55:08'),
(2, 1, 'Cash', '71.5', '2024-11-12 19:03:47', '2024-11-12 19:03:47'),
(3, 3, 'Cash', '65.5', '2024-11-12 19:14:51', '2024-11-12 19:14:51'),
(4, 4, 'Cash', '70.5', '2024-11-12 19:27:33', '2024-11-12 19:27:33'),
(5, 7, 'Cash', '162.2', '2024-11-13 06:46:50', '2024-11-13 06:46:50'),
(6, 8, 'Cash', '186', '2024-11-13 11:48:28', '2024-11-13 11:48:28'),
(7, 9, 'Cash', '186.8', '2024-11-13 15:22:37', '2024-11-13 15:22:37'),
(8, 10, 'Cash', '221', '2024-11-13 15:55:48', '2024-11-13 15:55:48'),
(9, 11, 'Cash', '430', '2024-11-16 00:06:31', '2024-11-16 00:06:31'),
(10, 12, 'Cash', '294.00', '2024-11-16 05:14:49', '2024-11-16 05:14:49'),
(11, 14, 'Cash', '580.8', '2024-11-17 13:54:48', '2024-11-17 13:54:48'),
(12, 14, 'Cash', '580.8', '2024-11-17 13:54:48', '2024-11-17 13:54:48'),
(13, 14, 'Cash', '580.8', '2024-11-17 13:54:48', '2024-11-17 13:54:48'),
(14, 14, 'Cash', '580.8', '2024-11-17 13:54:48', '2024-11-17 13:54:48'),
(15, 14, 'Cash', '590.8', '2024-11-17 13:54:49', '2024-11-17 13:54:49'),
(16, 14, 'Cash', '600.8', '2024-11-17 13:54:53', '2024-11-17 13:54:53'),
(17, 14, 'Cash', '600.8', '2024-11-17 13:54:53', '2024-11-17 13:54:53'),
(18, 14, 'Cash', '600.8', '2024-11-17 13:54:53', '2024-11-17 13:54:53'),
(19, 14, 'Cash', '600.8', '2024-11-17 13:54:53', '2024-11-17 13:54:53'),
(20, 14, 'Cash', '610.8', '2024-11-17 13:54:54', '2024-11-17 13:54:54'),
(21, 14, 'Cash', '620.8', '2024-11-17 13:54:58', '2024-11-17 13:54:58'),
(22, 14, 'Cash', '620.8', '2024-11-17 13:54:58', '2024-11-17 13:54:58'),
(23, 14, 'Cash', '620.8', '2024-11-17 13:54:58', '2024-11-17 13:54:58'),
(24, 14, 'Cash', '620.8', '2024-11-17 13:54:58', '2024-11-17 13:54:58'),
(25, 14, 'Cash', '630.8', '2024-11-17 13:54:59', '2024-11-17 13:54:59'),
(26, 14, 'Cash', '640.8', '2024-11-17 13:55:03', '2024-11-17 13:55:03'),
(27, 14, 'Cash', '640.8', '2024-11-17 13:55:03', '2024-11-17 13:55:03'),
(28, 14, 'Cash', '640.8', '2024-11-17 13:55:03', '2024-11-17 13:55:03'),
(29, 14, 'Cash', '640.8', '2024-11-17 13:55:03', '2024-11-17 13:55:03'),
(30, 14, 'Cash', '650.8', '2024-11-17 13:55:05', '2024-11-17 13:55:05'),
(31, 14, 'Cash', '660.8', '2024-11-17 13:55:08', '2024-11-17 13:55:08'),
(32, 14, 'Cash', '660.8', '2024-11-17 13:55:08', '2024-11-17 13:55:08'),
(33, 14, 'Cash', '660.8', '2024-11-17 13:55:08', '2024-11-17 13:55:08'),
(34, 14, 'Cash', '660.8', '2024-11-17 13:55:08', '2024-11-17 13:55:08'),
(35, 14, 'Cash', '670.8', '2024-11-17 13:55:10', '2024-11-17 13:55:10'),
(36, 14, 'Cash', '680.8', '2024-11-17 13:55:13', '2024-11-17 13:55:13'),
(37, 14, 'Cash', '690.8', '2024-11-17 13:55:13', '2024-11-17 13:55:13'),
(38, 14, 'Cash', '700.8', '2024-11-17 13:55:13', '2024-11-17 13:55:13'),
(39, 14, 'Cash', '700.8', '2024-11-17 13:55:14', '2024-11-17 13:55:14'),
(40, 15, 'Cash', '142', '2024-11-17 15:53:20', '2024-11-17 15:53:20'),
(41, 16, 'Cash', '313', '2024-11-17 21:01:20', '2024-11-17 21:01:20'),
(42, 19, 'Cash', '220', '2024-11-20 10:29:02', '2024-11-20 10:29:02'),
(43, 18, 'Cash', '345', '2024-11-20 10:33:45', '2024-11-20 10:33:45'),
(44, 20, 'Cash', '89', '2024-11-21 14:35:11', '2024-11-21 14:35:11'),
(45, 21, 'Cash', '76', '2024-11-21 16:56:07', '2024-11-21 16:56:07'),
(46, 23, 'Cash', '198.44', '2024-11-21 17:08:12', '2024-11-21 17:08:12'),
(47, 24, 'Cash', '175.56', '2024-11-21 18:04:20', '2024-11-21 18:04:20'),
(48, 25, 'Cash', '763.5', '2024-11-22 10:57:17', '2024-11-22 10:57:17'),
(49, 27, 'Cash', '68.75', '2024-11-22 12:44:15', '2024-11-22 12:44:15'),
(50, 29, 'Cash', '159.50', '2024-11-22 13:18:46', '2024-11-22 13:18:46'),
(51, 31, 'Cash', '70.95', '2024-11-22 16:08:19', '2024-11-22 16:08:19'),
(52, 33, 'Cash', '133.98', '2024-11-22 20:54:25', '2024-11-22 20:54:25'),
(53, 34, 'Cash', '382.80', '2024-11-22 20:57:18', '2024-11-22 20:57:18'),
(54, 35, 'Cash', '245.5', '2024-11-22 21:02:03', '2024-11-22 21:02:03'),
(55, 41, 'Cash', '318.12', '2024-11-23 01:25:06', '2024-11-23 01:25:06'),
(56, 42, 'Cash', '208.12', '2024-11-23 01:46:31', '2024-11-23 01:46:31'),
(57, 42, 'Cash', '208.12', '2024-11-23 01:46:31', '2024-11-23 01:46:31'),
(58, 43, 'Cash', '129.69', '2024-11-23 13:14:09', '2024-11-23 13:14:09'),
(59, 44, 'Cash', '129.69', '2024-11-23 13:16:11', '2024-11-23 13:16:11'),
(60, 26, 'Cash', '803.5', '2024-11-23 23:06:11', '2024-11-23 23:06:11'),
(61, 46, 'Cash', '125.4', '2024-11-25 13:48:09', '2024-11-25 13:48:09'),
(62, 47, 'Cash', '141.9', '2024-11-25 13:57:54', '2024-11-25 13:57:54'),
(63, 51, 'Cash', '225.5', '2024-11-25 16:12:16', '2024-11-25 16:12:16'),
(64, 50, 'Cash', '330', '2024-11-25 16:12:48', '2024-11-25 16:12:48'),
(65, 52, 'Cash', '136.84', '2024-11-25 16:20:14', '2024-11-25 16:20:14'),
(66, 54, 'Cash', '225.5', '2024-11-25 16:25:01', '2024-11-25 16:25:01'),
(67, 53, 'Cash', '319', '2024-11-25 16:25:25', '2024-11-25 16:25:25'),
(68, 55, 'Cash', '1100.00', '2024-11-26 15:11:10', '2024-11-26 15:11:10'),
(69, 58, 'Cash', '232.1', '2024-11-26 21:31:15', '2024-11-26 21:31:15'),
(70, 59, 'Cash', '156.2', '2024-11-26 21:38:04', '2024-11-26 21:38:04'),
(71, 61, 'Cash', '139.7', '2024-12-05 17:49:55', '2024-12-05 17:49:55'),
(72, 62, 'Cash', '139.7', '2024-12-05 17:54:55', '2024-12-05 17:54:55'),
(73, 65, 'Cash', '113.18', '2024-12-05 21:03:11', '2024-12-05 21:03:11'),
(74, 66, 'Cash', '94.60', '2024-12-05 21:05:20', '2024-12-05 21:05:20'),
(75, 67, 'Cash', '103.18', '2024-12-06 07:40:47', '2024-12-06 07:40:47'),
(76, 68, 'Cash', '105.16', '2024-12-06 09:24:20', '2024-12-06 09:24:20'),
(77, 70, 'Cash', '94.6', '2024-12-06 17:28:15', '2024-12-06 17:28:15'),
(78, 71, 'Cash', '304.92', '2024-12-06 17:45:05', '2024-12-06 17:45:05'),
(79, 71, 'Cash', '304.92', '2024-12-06 17:45:05', '2024-12-06 17:45:05'),
(80, 73, 'Cash', '113.18', '2024-12-12 13:44:54', '2024-12-12 13:44:54'),
(81, 74, 'Cash', '119.67', '2024-12-15 10:28:40', '2024-12-15 10:28:40'),
(82, 76, 'Cash', '143', '2024-12-21 12:25:12', '2024-12-21 12:25:12'),
(83, 77, 'Cash', '141.9', '2024-12-21 19:08:36', '2024-12-21 19:08:36'),
(84, 78, 'Cash', '176', '2024-12-23 14:55:41', '2024-12-23 14:55:41'),
(85, 79, 'Cash', '141.9', '2024-12-27 12:03:17', '2024-12-27 12:03:17'),
(86, 80, 'Cash', '160.6', '2024-12-27 12:25:41', '2024-12-27 12:25:41'),
(87, 81, 'Cash', '156.86', '2024-12-27 21:22:50', '2024-12-27 21:22:50'),
(88, 82, 'Cash', '178.31', '2024-12-27 21:40:49', '2024-12-27 21:40:49'),
(89, 84, 'Cash', '121', '2024-12-28 19:28:07', '2024-12-28 19:28:07'),
(90, 86, 'Cash', '320.1', '2024-12-28 19:48:56', '2024-12-28 19:48:56'),
(91, 87, 'Cash', '294.9', '2024-12-29 00:04:05', '2024-12-29 00:04:05'),
(92, 88, 'Cash', '129.8', '2024-12-29 00:09:59', '2024-12-29 00:09:59'),
(93, 89, 'Cash', '165', '2024-12-29 00:14:11', '2024-12-29 00:14:11'),
(94, 94, 'Cash', '1051.68', '2024-12-29 15:15:23', '2024-12-29 15:15:23'),
(95, 94, 'Cash', '1051.68', '2024-12-29 15:15:23', '2024-12-29 15:15:23'),
(96, 94, 'Cash', '1051.68', '2024-12-29 15:15:23', '2024-12-29 15:15:23'),
(97, 95, 'Cash', '1081.4', '2024-12-29 17:34:35', '2024-12-29 17:34:35'),
(98, 96, 'Cash', '1103.36', '2024-12-29 17:41:14', '2024-12-29 17:41:14'),
(99, 97, 'Cash', '1119.01', '2024-12-29 17:43:39', '2024-12-29 17:43:39'),
(100, 98, 'Cash', '1065.02', '2024-12-29 17:46:26', '2024-12-29 17:46:26'),
(101, 99, 'Cash', '1069.22', '2024-12-29 17:50:14', '2024-12-29 17:50:14'),
(102, 100, 'Cash', '13.65', '2024-12-29 17:52:15', '2024-12-29 17:52:15'),
(103, 101, 'Cash', '1054.2', '2024-12-29 17:54:28', '2024-12-29 17:54:28'),
(104, 103, 'Cash', '1115.75', '2024-12-30 00:06:53', '2024-12-30 00:06:53'),
(105, 105, 'Cash', '1051.05', '2024-12-30 00:27:15', '2024-12-30 00:27:15'),
(106, 106, 'Cash', '1105.25', '2024-12-30 00:29:25', '2024-12-30 00:29:25'),
(107, 106, 'Cash', '1105.25', '2024-12-30 00:29:25', '2024-12-30 00:29:25'),
(108, 106, 'Cash', '1155.25', '2024-12-30 00:29:27', '2024-12-30 00:29:27'),
(109, 106, 'Cash', '1155.25', '2024-12-30 00:29:27', '2024-12-30 00:29:27'),
(110, 106, 'Cash', '1205.25', '2024-12-30 00:29:27', '2024-12-30 00:29:27'),
(111, 109, 'Cash', '1058.09', '2024-12-30 01:17:49', '2024-12-30 01:17:49'),
(112, 110, 'Cash', '1055.78', '2024-12-30 01:22:58', '2024-12-30 01:22:58'),
(113, 110, 'Cash', '1055.78', '2024-12-30 01:22:58', '2024-12-30 01:22:58'),
(114, 114, 'Cash', '1066.17', '2024-12-30 23:22:00', '2024-12-30 23:22:00'),
(115, 118, 'Cash', '1104.62', '2024-12-31 08:17:52', '2024-12-31 08:17:52'),
(116, 119, 'Cash', '1103.99', '2024-12-31 08:26:48', '2024-12-31 08:26:48'),
(117, 121, 'Cash', '13.65', '2024-12-31 16:28:08', '2024-12-31 16:28:08'),
(118, 123, 'Cash', '1008', '2024-12-31 16:37:28', '2024-12-31 16:37:28'),
(119, 122, 'Cash', '934.5', '2024-12-31 16:37:58', '2024-12-31 16:37:58'),
(120, 124, 'Cash', '1068.06', '2024-12-31 16:40:24', '2024-12-31 16:40:24'),
(121, 126, 'Cash', '1008', '2024-12-31 16:45:12', '2024-12-31 16:45:12'),
(122, 125, 'Cash', '1055.25', '2024-12-31 16:45:45', '2024-12-31 16:45:45'),
(123, 127, 'Cash', '27825', '2024-12-31 16:56:55', '2024-12-31 16:56:55'),
(124, 128, 'Cash', '27825', '2024-12-31 17:01:13', '2024-12-31 17:01:13'),
(125, 129, 'Cash', '27720', '2024-12-31 17:01:40', '2024-12-31 17:01:40'),
(126, 132, 'Cash', '27877.5', '2024-12-31 20:53:00', '2024-12-31 20:53:00'),
(127, 131, 'Cash', '27825', '2024-12-31 20:53:27', '2024-12-31 20:53:27'),
(128, 133, 'Cash', '3373.65', '2025-01-01 07:56:29', '2025-01-01 07:56:29'),
(129, 134, 'Cash', '182.49', '2025-01-01 08:20:07', '2025-01-01 08:20:07'),
(130, 136, 'Cash', '1057.88', '2025-01-02 20:23:50', '2025-01-02 20:23:50'),
(131, 137, 'Cash', '181.13', '2025-01-03 16:11:27', '2025-01-03 16:11:27'),
(132, 138, 'Cash', '115.61', '2025-01-03 16:35:14', '2025-01-03 16:35:14'),
(133, 139, 'Cash', '175.67', '2025-01-03 16:45:35', '2025-01-03 16:45:35'),
(134, 141, 'Cash', '542.12', '2025-01-03 23:38:05', '2025-01-03 23:38:05'),
(135, 142, 'Cash', '160.65', '2025-01-06 09:20:54', '2025-01-06 09:20:54'),
(136, 143, 'Cash', '136.08', '2025-01-06 09:55:18', '2025-01-06 09:55:18'),
(137, 151, 'Wallet', '22.89', '2025-01-14 12:03:33', '2025-01-14 12:03:33'),
(138, 152, 'Cash', '3989.5', '2025-01-16 08:30:16', '2025-01-16 08:30:16'),
(139, 154, 'Cash', '530.46', '2025-01-17 17:27:57', '2025-01-17 17:27:57'),
(140, 155, 'Wallet', '77.11', '2025-01-27 15:39:05', '2025-01-27 15:39:05'),
(141, 155, 'Cash', '15.29', '2025-01-27 15:39:05', '2025-01-27 15:39:05'),
(142, 156, 'Wallet', '200', '2025-01-27 16:21:29', '2025-01-27 16:21:29'),
(143, 156, 'Cash', '327.52', '2025-01-27 16:21:29', '2025-01-27 16:21:29'),
(144, 157, 'Cash', '528.57', '2025-01-27 16:23:16', '2025-01-27 16:23:16'),
(145, 159, 'Cash', '527.52', '2025-01-30 14:58:33', '2025-01-30 14:58:33'),
(146, 161, 'Cash', '3234', '2025-01-31 18:12:45', '2025-01-31 18:12:45'),
(147, 162, 'Cash', '3262.4', '2025-01-31 18:35:34', '2025-01-31 18:35:34'),
(148, 162, 'Cash', '3262.4', '2025-01-31 18:35:34', '2025-01-31 18:35:34'),
(149, 160, 'Wallet', '17', '2025-02-01 15:33:50', '2025-02-01 15:33:50'),
(150, 160, 'Cash', '3279.5', '2025-02-01 15:33:50', '2025-02-01 15:33:50'),
(151, 163, 'Cash', '3254', '2025-02-04 14:51:07', '2025-02-04 14:51:07'),
(152, 165, 'Cash', '590.21', '2025-02-04 22:25:44', '2025-02-04 22:25:44'),
(153, 166, 'Cash', '631.05', '2025-02-04 22:30:01', '2025-02-04 22:30:01'),
(154, 168, 'Cash', '3223', '2025-02-05 13:54:48', '2025-02-05 13:54:48'),
(155, 169, 'Cash', '3218.8', '2025-02-05 14:02:21', '2025-02-05 14:02:21'),
(156, 170, 'Cash', '3202.5', '2025-02-06 10:12:18', '2025-02-06 10:12:18'),
(157, 172, 'Cash', '3447.7', '2025-02-08 18:34:43', '2025-02-08 18:34:43'),
(158, 173, 'Cash', '3264.45', '2025-02-11 11:37:02', '2025-02-11 11:37:02'),
(159, 174, 'Cash', '2123.1', '2025-02-11 11:59:23', '2025-02-11 11:59:23'),
(160, 175, 'Cash', '2123.1', '2025-02-11 12:00:28', '2025-02-11 12:00:28'),
(161, 177, 'Cash', '3270.75', '2025-02-11 12:18:08', '2025-02-11 12:18:08'),
(162, 179, 'Cash', '3182.55', '2025-02-11 12:33:26', '2025-02-11 12:33:26'),
(163, 183, 'Cash', '528.57', '2025-02-14 17:21:53', '2025-02-14 17:21:53'),
(164, 186, 'Cash', '527.52', '2025-02-18 16:48:12', '2025-02-18 16:48:12'),
(165, 185, 'Cash', '3208.8', '2025-02-18 18:10:09', '2025-02-18 18:10:09'),
(166, 187, 'Cash', '529.94', '2025-02-18 18:22:50', '2025-02-18 18:22:50'),
(167, 188, 'Cash', '3195.15', '2025-02-18 18:59:58', '2025-02-18 18:59:58'),
(168, 182, 'Cash', '528.47', '2025-02-18 19:19:07', '2025-02-18 19:19:07'),
(169, 189, 'Cash', '3192', '2025-02-18 19:33:01', '2025-02-18 19:33:01'),
(170, 190, 'Cash', '3207.75', '2025-02-18 19:52:57', '2025-02-18 19:52:57'),
(171, 192, 'Cash', '528.36', '2025-02-20 14:18:53', '2025-02-20 14:18:53'),
(172, 193, 'Wallet', '100', '2025-02-20 16:23:07', '2025-02-20 16:23:07'),
(173, 193, 'Cash', '430.46', '2025-02-20 16:23:07', '2025-02-20 16:23:07'),
(174, 194, 'Cash', '531.72', '2025-02-20 16:46:46', '2025-02-20 16:46:46'),
(175, 195, 'Cash', '536.97', '2025-02-21 01:54:51', '2025-02-21 01:54:51'),
(176, 196, 'Cash', '3188.35', '2025-02-24 18:14:19', '2025-02-24 18:14:19'),
(177, 197, 'Cash', '15.75', '2025-02-24 18:17:38', '2025-02-24 18:17:38'),
(178, 198, 'Cash', '558.60', '2025-02-26 00:09:37', '2025-02-26 00:09:37'),
(179, 199, 'Cash', '2533.7', '2025-03-02 10:43:35', '2025-03-02 10:43:35'),
(180, 203, 'Cash', '103.32', '2025-03-06 10:48:35', '2025-03-06 10:48:35'),
(181, 204, 'Cash', '101.96', '2025-03-06 10:58:20', '2025-03-06 10:58:20'),
(182, 205, 'Cash', '104.69', '2025-03-06 10:59:38', '2025-03-06 10:59:38'),
(183, 206, 'Cash', '100.59', '2025-03-06 11:39:45', '2025-03-06 11:39:45'),
(184, 207, 'Cash', '103.32', '2025-03-06 11:46:48', '2025-03-06 11:46:48'),
(185, 209, 'Cash', '3214.1', '2025-03-07 17:30:38', '2025-03-07 17:30:38'),
(186, 210, 'Cash', '3178.35', '2025-03-07 17:35:15', '2025-03-07 17:35:15'),
(187, 211, 'Cash', '153.3', '2025-03-07 17:39:47', '2025-03-07 17:39:47'),
(188, 212, 'Cash', '206.85', '2025-03-10 10:41:42', '2025-03-10 10:41:42'),
(189, 214, 'Cash', '100.83', '2025-03-16 03:38:20', '2025-03-16 03:38:20'),
(190, 215, 'Cash', '45.05', '2025-03-16 09:57:46', '2025-03-16 09:57:46'),
(191, 216, 'Cash', '178.5', '2025-03-17 00:38:57', '2025-03-17 00:38:57'),
(192, 217, 'Cash', '105.11', '2025-03-19 02:28:20', '2025-03-19 02:28:20'),
(193, 218, 'Cash', '149.1', '2025-03-19 11:10:30', '2025-03-19 11:10:30'),
(194, 222, 'Cash', '84.21', '2025-03-21 10:52:09', '2025-03-21 10:52:09'),
(195, 224, 'Cash', '83.69', '2025-03-24 14:54:55', '2025-03-24 14:54:55'),
(196, 225, 'Cash', '245.86', '2025-03-24 22:43:26', '2025-03-24 22:43:26'),
(197, 226, 'Cash', '84.21', '2025-04-05 18:12:09', '2025-04-05 18:12:09'),
(198, 227, 'Cash', '83.58', '2025-04-12 18:20:47', '2025-04-12 18:20:47'),
(199, 230, 'Cash', '17.39', '2025-05-10 19:14:20', '2025-05-10 19:14:20'),
(200, 231, 'Cash', '91.5', '2025-05-14 17:24:35', '2025-05-14 17:24:35'),
(201, 232, 'Cash', '4593.3', '2025-05-19 15:02:08', '2025-05-19 15:02:08'),
(202, 238, 'Cash', '15.56', '2025-06-05 14:06:22', '2025-06-05 14:06:22'),
(203, 255, 'Cash', '390.40', '2025-07-07 14:21:44', '2025-07-07 14:21:44'),
(204, 257, 'Cash', '148.66', '2025-07-09 18:50:27', '2025-07-09 18:50:27'),
(205, 259, 'Cash', '384.18', '2025-07-09 19:51:44', '2025-07-09 19:51:44'),
(206, 274, 'Cash', '120.29', '2025-07-26 03:06:52', '2025-07-26 03:06:52'),
(207, 294, 'Cash', '762.74', '2025-08-03 16:40:50', '2025-08-03 16:40:50'),
(208, 236, 'Cash', '170.92', '2025-08-05 22:20:58', '2025-08-05 22:20:58'),
(209, 297, 'Cash', '204.29', '2025-08-07 11:29:18', '2025-08-07 11:29:18'),
(210, 300, 'Cash', '148.29', '2025-08-08 12:51:34', '2025-08-08 12:51:34'),
(211, 307, 'Cash', '15.51', '2025-08-09 12:52:58', '2025-08-09 12:52:58'),
(212, 308, 'Cash', '133.13', '2025-08-09 23:27:12', '2025-08-09 23:27:12'),
(213, 322, 'Cash', '17.75', '2025-08-12 16:28:15', '2025-08-12 16:28:15'),
(214, 326, 'Wallet', '241', '2025-08-14 03:47:28', '2025-08-14 03:47:28'),
(215, 326, 'Cash', '556.03', '2025-08-14 03:47:28', '2025-08-14 03:47:28'),
(216, 327, 'Cash', '680.27', '2025-08-14 05:54:05', '2025-08-14 05:54:05'),
(217, 345, 'Wallet', '1', '2025-08-16 01:04:27', '2025-08-16 01:04:27'),
(218, 345, 'Cash', '539.83', '2025-08-16 01:04:27', '2025-08-16 01:04:27'),
(219, 391, 'Wallet', '5', '2025-09-01 04:01:28', '2025-09-01 04:01:28'),
(220, 391, 'Cash', '328.91', '2025-09-01 04:01:28', '2025-09-01 04:01:28'),
(221, 393, 'Cash', '69.66', '2025-09-01 11:35:41', '2025-09-01 11:35:41'),
(222, 400, 'Cash', '410.9', '2025-09-02 04:24:24', '2025-09-02 04:24:24'),
(223, 408, 'Cash', '335.32', '2025-09-16 02:59:05', '2025-09-16 02:59:05'),
(224, 411, 'Cash', '155.98', '2025-09-17 15:50:19', '2025-09-17 15:50:19'),
(225, 412, 'Cash', '166.23', '2025-09-20 15:04:18', '2025-09-20 15:04:18'),
(226, 413, 'Cash', '334.95', '2025-09-24 21:54:05', '2025-09-24 21:54:05'),
(227, 414, 'Cash', '31.73', '2025-09-26 15:15:47', '2025-09-26 15:15:47'),
(228, 415, 'Cash', '266.44', '2025-10-03 01:00:52', '2025-10-03 01:00:52'),
(229, 4, 'Cash', '65.03', '2025-10-14 15:29:12', '2025-10-14 15:29:12'),
(230, 6, 'Cash', '21.53', '2025-10-17 15:15:48', '2025-10-17 15:15:48'),
(231, 8, 'Cash', '19.43', '2025-10-22 14:53:06', '2025-10-22 14:53:06'),
(232, 15, 'Cash', '16.48', '2025-10-23 16:03:18', '2025-10-23 16:03:18'),
(233, 31, 'Cash', '28.16', '2025-10-26 00:51:41', '2025-10-26 00:51:41'),
(234, 33, 'Cash', '18.15', '2025-10-27 11:01:35', '2025-10-27 11:01:35'),
(235, 36, 'Cash', '29.76', '2025-10-27 13:49:34', '2025-10-27 13:49:34'),
(236, 40, 'Cash', '25.24', '2025-10-27 14:05:57', '2025-10-27 14:05:57'),
(237, 44, 'Cash', '24.83', '2025-10-27 14:27:34', '2025-10-27 14:27:34'),
(238, 50, 'Cash', '15.8', '2025-10-27 15:01:42', '2025-10-27 15:01:42'),
(239, 52, 'Cash', '18.42', '2025-10-27 15:06:03', '2025-10-27 15:06:03'),
(240, 63, 'Cash', '29.26', '2025-10-28 11:38:02', '2025-10-28 11:38:02'),
(241, 67, 'Cash', '16.58', '2025-10-28 12:52:18', '2025-10-28 12:52:18'),
(242, 74, 'Cash', '309.39', '2025-12-08 10:15:22', '2025-12-08 10:15:22'),
(243, 75, 'Cash', '337.21', '2025-12-08 10:48:53', '2025-12-08 10:48:53'),
(244, 76, 'Cash', '18', '2025-12-15 12:44:40', '2025-12-15 12:44:40'),
(245, 77, 'Cash', '18.54', '2025-12-15 13:20:35', '2025-12-15 13:20:35'),
(246, 82, 'Cash', '43.22', '2025-12-16 19:26:48', '2025-12-16 19:26:48'),
(247, 84, 'Cash', '18.67', '2025-12-17 13:56:44', '2025-12-17 13:56:44'),
(248, 87, 'Cash', '174.57', '2025-12-17 15:28:13', '2025-12-17 15:28:13'),
(249, 88, 'Cash', '18.76', '2025-12-17 15:50:03', '2025-12-17 15:50:03'),
(250, 89, 'Cash', '174.57', '2025-12-17 17:24:15', '2025-12-17 17:24:15'),
(251, 92, 'Cash', '27.43', '2025-12-17 17:33:42', '2025-12-17 17:33:42'),
(252, 93, 'Cash', '21.39', '2025-12-19 10:57:20', '2025-12-19 10:57:20'),
(253, 94, 'Cash', '33.05', '2025-12-19 12:43:14', '2025-12-19 12:43:14'),
(254, 96, 'Cash', '16.95', '2025-12-22 12:10:37', '2025-12-22 12:10:37'),
(255, 97, 'Cash', '21.91', '2025-12-29 13:01:41', '2025-12-29 13:01:41'),
(256, 100, 'Cash', '16.76', '2025-12-29 15:03:39', '2025-12-29 15:03:39'),
(257, 103, 'Cash', '13.71', '2025-12-31 12:55:40', '2025-12-31 12:55:40'),
(258, 114, 'Cash', '17.49', '2026-01-01 14:09:59', '2026-01-01 14:09:59'),
(259, 117, 'Cash', '17.49', '2026-01-02 12:13:38', '2026-01-02 12:13:38'),
(260, 123, 'Cash', '14.21', '2026-01-30 12:30:22', '2026-01-30 12:30:22'),
(261, 127, 'Wallet', '19.52', '2026-02-04 15:55:55', '2026-02-04 15:55:55'),
(262, 130, 'Cash', '13.73', '2026-02-05 06:25:40', '2026-02-05 06:25:40'),
(263, 136, 'Wallet', '19.22', '2026-02-05 08:06:42', '2026-02-05 08:06:42'),
(264, 139, 'Wallet', '19.22', '2026-02-05 08:39:18', '2026-02-05 08:39:18'),
(265, 139, 'Wallet', '19.22', '2026-02-05 09:05:55', '2026-02-05 09:05:55'),
(266, 145, 'Cash', '12.20', '2026-02-05 10:54:05', '2026-02-05 10:54:05'),
(267, 145, 'Cash', '12.20', '2026-02-05 10:54:11', '2026-02-05 10:54:11'),
(268, 147, 'Wallet', '12.20', '2026-02-05 11:43:18', '2026-02-05 11:43:18'),
(269, 147, 'Wallet', '16.47', '2026-02-05 11:45:12', '2026-02-05 11:45:12'),
(270, 147, 'Wallet', '16.47', '2026-02-05 11:47:53', '2026-02-05 11:47:53'),
(271, 126, 'Cash', '715.23', '2026-02-05 11:48:12', '2026-02-05 11:48:12'),
(272, 148, 'Wallet', '16.47', '2026-02-05 11:49:44', '2026-02-05 11:49:44');

-- --------------------------------------------------------

--
-- Table structure for table `payment_methods`
--

CREATE TABLE `payment_methods` (
  `id` int(11) NOT NULL,
  `payment` varchar(250) NOT NULL,
  `payment_ar` varchar(250) DEFAULT NULL,
  `payment_type` int(11) NOT NULL,
  `icon` varchar(250) NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payment_methods`
--

INSERT INTO `payment_methods` (`id`, `payment`, `payment_ar`, `payment_type`, `icon`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Cash', 'نقدي', 1, 'image/0136fc6692d6bdcfd628e16e17035137.png', 1, '2021-05-18 07:30:05', '2025-01-27 12:51:01'),
(2, 'Wallet', 'محفظة', 2, 'image/2a040c36e2c180bd2c1f60e908d0fe68.png', 1, '2021-05-18 07:32:05', '2025-04-28 11:40:32'),
(3, 'Cash/Wallet', 'النقدية / المحفظة', 1, 'image/1fc37179a37818e72b6070e8b4eaec15.png', 1, '2021-05-18 07:33:10', '2025-01-27 12:51:29'),
(6, 'PayPal', 'PayPal', 2, 'image/b7caa9a0f14c875967739e7b573a1789.png', 1, '2023-03-18 18:32:44', '2025-01-30 15:05:35'),
(7, 'FlutterWave', 'FlutterWave', 2, 'image/ab73fac8900b89e9d897139d92fc392a.png', 1, '2023-03-18 18:33:14', '2025-01-30 15:04:35'),
(37, 'Stripe', 'Stripe', 2, 'image/acc2c26c5b185612f902f73671e430d8.png', 1, '2023-05-03 10:20:35', '2025-08-04 12:48:12'),
(38, 'PayStack', 'PayStack', 2, 'image/bb5ae3f2cc9ea76d4b512edb70e39f8c.png', 1, '2023-07-03 18:37:57', '2025-09-02 10:24:23'),
(39, 'Sedad', NULL, 1, 'image/8bd2f7f4e7173ec1d5e0bd970e017123.png', 2, '2024-06-20 01:17:02', '2024-09-17 10:59:04'),
(40, 'RazorPay', 'RazorPay', 2, 'image/082126f8c5e3bb4309f1aed8ce2d4d06.png', 1, '2025-06-26 13:23:41', '2025-08-03 16:52:14');

-- --------------------------------------------------------

--
-- Table structure for table `payment_statements`
--

CREATE TABLE `payment_statements` (
  `id` int(11) NOT NULL,
  `corporate_customer_id` int(11) NOT NULL,
  `payment_period` date NOT NULL,
  `sub_total` varchar(250) NOT NULL,
  `tax` varchar(250) NOT NULL,
  `total` varchar(250) NOT NULL,
  `service_fee` varchar(250) DEFAULT '0',
  `status` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment_statements`
--

INSERT INTO `payment_statements` (`id`, `corporate_customer_id`, `payment_period`, `sub_total`, `tax`, `total`, `service_fee`, `status`, `created_at`, `updated_at`) VALUES
(3, 1, '2025-10-01', '0', '0', '0', '0', 0, '2025-10-28 12:22:23', '2025-10-28 12:22:23'),
(4, 2, '2025-10-01', '158.97', '34.99', '193.96', '0', 0, '2025-10-28 12:22:23', '2025-10-28 12:22:23'),
(5, 3, '2025-10-01', '0', '0', '0', '0', 0, '2025-10-28 12:22:23', '2025-10-28 12:22:23'),
(6, 4, '2025-10-01', '0', '0', '0', '0', 0, '2025-10-28 12:22:23', '2025-10-28 12:22:23'),
(7, 5, '2025-10-01', '0', '0', '0', '0', 0, '2025-10-28 12:22:23', '2025-10-28 12:22:23'),
(8, 6, '2025-10-01', '0', '0', '0', '0', 0, '2025-10-28 12:22:23', '2025-10-28 12:22:23'),
(9, 7, '2025-10-01', '0', '0', '0', '0', 0, '2025-10-28 12:22:23', '2025-10-28 12:22:23'),
(10, 8, '2025-10-01', '0', '0', '0', '0', 0, '2025-10-28 12:22:23', '2025-10-28 12:22:23'),
(11, 9, '2025-10-01', '10', '2.2', '12.2', '0', 0, '2025-10-28 12:22:23', '2025-10-28 12:22:23'),
(12, 1, '2025-09-01', '0', '0', '0', '0', 0, '2025-10-28 12:22:23', '2025-10-28 12:22:23'),
(13, 2, '2025-09-01', '0', '0', '0', '0', 0, '2025-10-28 12:22:23', '2025-10-28 12:22:23'),
(14, 3, '2025-09-01', '0', '0', '0', '0', 0, '2025-10-28 12:22:23', '2025-10-28 12:22:23'),
(15, 4, '2025-09-01', '0', '0', '0', '0', 0, '2025-10-28 12:22:23', '2025-10-28 12:22:23'),
(16, 5, '2025-09-01', '0', '0', '0', '0', 0, '2025-10-28 12:22:23', '2025-10-28 12:22:23'),
(17, 6, '2025-09-01', '0', '0', '0', '0', 0, '2025-10-28 12:22:23', '2025-10-28 12:22:23'),
(18, 7, '2025-09-01', '0', '0', '0', '0', 0, '2025-10-28 12:22:23', '2025-10-28 12:22:23'),
(19, 8, '2025-09-01', '0', '0', '0', '0', 0, '2025-10-28 12:22:23', '2025-10-28 12:22:23'),
(20, 9, '2025-09-01', '0', '0', '0', '0', 0, '2025-10-28 12:22:23', '2025-10-28 12:22:23'),
(21, 10, '2025-09-01', '0', '0', '0', '0', 0, '2025-10-28 12:22:23', '2025-10-28 12:22:23'),
(22, 11, '2025-09-01', '0', '0', '0', '0', 2, '2025-10-28 12:22:23', '2025-10-28 12:22:23'),
(23, 12, '2025-09-01', '0', '0', '0', '0', 0, '2025-10-28 15:22:12', '2025-10-28 15:22:12'),
(24, 13, '2025-09-01', '0', '0', '0', '0', 0, '2025-10-28 12:22:23', '2025-10-28 12:22:23'),
(25, 10, '2025-10-01', '180.13', '39.66', '219.79', '0', 0, '2025-10-28 12:22:23', '2025-10-28 12:22:23'),
(26, 11, '2025-10-01', '0', '0', '0', '0', 0, '2025-10-28 12:22:23', '2025-10-28 12:22:23'),
(27, 12, '2025-10-01', '190.03', '41.84', '231.87', '0', 0, '2025-10-28 15:22:12', '2025-10-28 15:22:12'),
(28, 13, '2025-10-01', '0', '0', '0', '0', 0, '2025-10-28 12:22:23', '2025-10-28 12:22:23'),
(29, 14, '2025-09-01', '0', '0', '0', '0', 0, '2025-10-28 13:37:22', '2025-10-28 13:37:22'),
(30, 14, '2025-10-01', '0', '0', '0', '0', 0, '2025-10-28 13:37:22', '2025-10-28 13:37:22'),
(31, 15, '2025-10-01', '0', '0', '0', '0', 0, '2025-11-03 13:26:08', '2025-11-03 13:26:08'),
(32, 15, '2025-11-01', '24.39', '5.37', '29.76', '0', 0, '2025-11-03 13:26:08', '2025-11-03 13:26:08'),
(33, 12, '2025-11-01', '0', '0', '0', '0', 0, '2025-12-25 13:00:23', '2025-12-25 13:00:23'),
(34, 12, '2025-12-01', '61.91', '13.62', '85.53', '10', 0, '2026-01-31 10:45:55', '2026-01-31 10:45:55'),
(35, 12, '2026-01-01', '91.33', '20.08', '121.41', '10', 2, '2026-02-05 12:51:18', '2026-02-05 12:51:18'),
(36, 1, '2025-12-01', '0', '0', '10', '10', 0, '2026-01-31 00:29:08', '2026-01-31 00:29:08'),
(37, 1, '2026-01-01', '12.63', '2.78', '25.41', '10', 0, '2026-02-04 13:13:00', '2026-02-04 13:13:00'),
(38, 2, '2025-12-01', '0', '0', '10', '10', 0, '2026-01-31 00:29:08', '2026-01-31 00:29:08'),
(39, 2, '2026-01-01', '0', '0', '10', '10', 0, '2026-02-04 13:13:00', '2026-02-04 13:13:00'),
(40, 3, '2025-12-01', '0', '0', '10', '10', 0, '2026-01-31 00:29:08', '2026-01-31 00:29:08'),
(41, 3, '2026-01-01', '0', '0', '10', '10', 0, '2026-02-04 13:13:00', '2026-02-04 13:13:00'),
(42, 4, '2025-12-01', '0', '0', '10', '10', 0, '2026-01-31 00:29:08', '2026-01-31 00:29:08'),
(43, 4, '2026-01-01', '0', '0', '10', '10', 0, '2026-02-04 13:13:00', '2026-02-04 13:13:00'),
(44, 5, '2025-12-01', '0', '0', '10', '10', 0, '2026-01-31 00:29:08', '2026-01-31 00:29:08'),
(45, 5, '2026-01-01', '0', '0', '10', '10', 0, '2026-02-04 13:13:00', '2026-02-04 13:13:00'),
(46, 6, '2025-12-01', '0', '0', '10', '10', 0, '2026-01-31 00:29:08', '2026-01-31 00:29:08'),
(47, 6, '2026-01-01', '0', '0', '10', '10', 0, '2026-02-04 13:13:00', '2026-02-04 13:13:00'),
(48, 7, '2025-12-01', '0', '0', '10', '10', 0, '2026-01-31 00:29:08', '2026-01-31 00:29:08'),
(49, 7, '2026-01-01', '0', '0', '10', '10', 0, '2026-02-04 13:13:00', '2026-02-04 13:13:00'),
(50, 8, '2025-12-01', '0', '0', '10', '10', 0, '2026-01-31 00:29:08', '2026-01-31 00:29:08'),
(51, 8, '2026-01-01', '0', '0', '10', '10', 0, '2026-02-04 13:13:00', '2026-02-04 13:13:00'),
(52, 9, '2025-12-01', '0', '0', '10', '10', 0, '2026-01-31 00:29:08', '2026-01-31 00:29:08'),
(53, 9, '2026-01-01', '0', '0', '10', '10', 0, '2026-02-04 13:13:00', '2026-02-04 13:13:00'),
(54, 10, '2025-12-01', '0', '0', '10', '10', 0, '2026-01-31 00:29:08', '2026-01-31 00:29:08'),
(55, 10, '2026-01-01', '0', '0', '10', '10', 0, '2026-02-04 13:13:00', '2026-02-04 13:13:00'),
(56, 11, '2025-12-01', '0', '0', '10', '10', 0, '2026-01-31 00:29:08', '2026-01-31 00:29:08'),
(57, 11, '2026-01-01', '0', '0', '10', '10', 0, '2026-02-04 13:13:00', '2026-02-04 13:13:00'),
(58, 13, '2025-12-01', '0', '0', '10', '10', 0, '2026-01-31 00:29:08', '2026-01-31 00:29:08'),
(59, 13, '2026-01-01', '0', '0', '10', '10', 0, '2026-02-04 13:13:00', '2026-02-04 13:13:00'),
(60, 14, '2025-12-01', '0', '0', '10', '10', 0, '2026-01-31 00:29:08', '2026-01-31 00:29:08'),
(61, 14, '2026-01-01', '0', '0', '10', '10', 0, '2026-02-04 13:13:01', '2026-02-04 13:13:01'),
(62, 15, '2025-12-01', '11.24', '2.47', '23.71', '10', 0, '2026-01-31 00:29:08', '2026-01-31 00:29:08'),
(63, 15, '2026-01-01', '0', '0', '10', '10', 0, '2026-02-04 13:13:01', '2026-02-04 13:13:01'),
(64, 16, '2025-12-01', '0', '0', '10', '10', 0, '2026-01-31 00:29:08', '2026-01-31 00:29:08'),
(65, 16, '2026-01-01', '0', '0', '10', '10', 0, '2026-02-04 13:13:01', '2026-02-04 13:13:01'),
(66, 17, '2025-12-01', '0', '0', '10', '10', 0, '2026-01-31 00:29:08', '2026-01-31 00:29:08'),
(67, 17, '2026-01-01', '0', '0', '10', '10', 0, '2026-02-04 13:13:01', '2026-02-04 13:13:01'),
(68, 18, '2025-12-01', '0', '0', '10', '10', 0, '2026-01-31 00:29:08', '2026-01-31 00:29:08'),
(69, 18, '2026-01-01', '0', '0', '10', '10', 0, '2026-02-04 13:13:01', '2026-02-04 13:13:01'),
(70, 19, '2025-12-01', '0', '0', '10', '10', 0, '2026-01-31 00:29:08', '2026-01-31 00:29:08'),
(71, 19, '2026-01-01', '0', '0', '10', '10', 0, '2026-02-04 13:13:01', '2026-02-04 13:13:01'),
(72, 20, '2025-12-01', '0', '0', '10', '10', 0, '2026-01-31 00:29:08', '2026-01-31 00:29:08'),
(73, 20, '2026-01-01', '0', '0', '10', '10', 0, '2026-02-04 13:13:01', '2026-02-04 13:13:01'),
(74, 21, '2025-12-01', '0', '0', '10', '10', 0, '2026-01-31 00:29:08', '2026-01-31 00:29:08'),
(75, 21, '2026-01-01', '0', '0', '10', '10', 0, '2026-02-04 13:13:01', '2026-02-04 13:13:01'),
(76, 22, '2025-12-01', '0', '0', '10', '10', 0, '2026-01-31 00:29:08', '2026-01-31 00:29:08'),
(77, 22, '2026-01-01', '0', '0', '10', '10', 0, '2026-02-04 13:13:01', '2026-02-04 13:13:01'),
(78, 23, '2025-12-01', '0', '0', '10', '10', 0, '2026-01-31 00:29:08', '2026-01-31 00:29:08'),
(79, 23, '2026-01-01', '0', '0', '10', '10', 0, '2026-02-04 13:13:01', '2026-02-04 13:13:01'),
(80, 24, '2025-12-01', '0', '0', '10', '10', 0, '2026-01-31 00:29:08', '2026-01-31 00:29:08'),
(81, 24, '2026-01-01', '0', '0', '10', '10', 0, '2026-02-04 13:13:01', '2026-02-04 13:13:01'),
(82, 12, '2026-02-01', '0', '0', '10', '10', 2, '2026-02-05 12:51:18', '2026-02-05 12:51:18'),
(83, 1, '2026-02-01', '0', '0', '10', '10', 0, '2026-02-04 13:13:00', '2026-02-04 13:13:00'),
(84, 2, '2026-02-01', '0', '0', '10', '10', 0, '2026-02-04 13:13:00', '2026-02-04 13:13:00'),
(85, 3, '2026-02-01', '0', '0', '10', '10', 0, '2026-02-04 13:13:00', '2026-02-04 13:13:00'),
(86, 4, '2026-02-01', '0', '0', '10', '10', 0, '2026-02-04 13:13:00', '2026-02-04 13:13:00'),
(87, 5, '2026-02-01', '0', '0', '10', '10', 0, '2026-02-04 13:13:00', '2026-02-04 13:13:00'),
(88, 6, '2026-02-01', '0', '0', '10', '10', 0, '2026-02-04 13:13:00', '2026-02-04 13:13:00'),
(89, 7, '2026-02-01', '0', '0', '10', '10', 0, '2026-02-04 13:13:00', '2026-02-04 13:13:00'),
(90, 8, '2026-02-01', '0', '0', '10', '10', 0, '2026-02-04 13:13:00', '2026-02-04 13:13:00'),
(91, 9, '2026-02-01', '0', '0', '10', '10', 0, '2026-02-04 13:13:00', '2026-02-04 13:13:00'),
(92, 10, '2026-02-01', '0', '0', '10', '10', 0, '2026-02-04 13:13:00', '2026-02-04 13:13:00'),
(93, 11, '2026-02-01', '0', '0', '10', '10', 0, '2026-02-04 13:13:00', '2026-02-04 13:13:00'),
(94, 13, '2026-02-01', '0', '0', '10', '10', 0, '2026-02-04 13:13:01', '2026-02-04 13:13:01'),
(95, 14, '2026-02-01', '0', '0', '10', '10', 0, '2026-02-04 13:13:01', '2026-02-04 13:13:01'),
(96, 15, '2026-02-01', '0', '0', '10', '10', 0, '2026-02-04 13:13:01', '2026-02-04 13:13:01'),
(97, 16, '2026-02-01', '0', '0', '10', '10', 0, '2026-02-04 13:13:01', '2026-02-04 13:13:01'),
(98, 17, '2026-02-01', '0', '0', '10', '10', 0, '2026-02-04 13:13:01', '2026-02-04 13:13:01'),
(99, 18, '2026-02-01', '0', '0', '10', '10', 0, '2026-02-04 13:13:01', '2026-02-04 13:13:01'),
(100, 19, '2026-02-01', '0', '0', '10', '10', 0, '2026-02-04 13:13:01', '2026-02-04 13:13:01'),
(101, 20, '2026-02-01', '0', '0', '10', '10', 0, '2026-02-04 13:13:01', '2026-02-04 13:13:01'),
(102, 21, '2026-02-01', '0', '0', '10', '10', 0, '2026-02-04 13:13:01', '2026-02-04 13:13:01'),
(103, 22, '2026-02-01', '0', '0', '10', '10', 0, '2026-02-04 13:13:01', '2026-02-04 13:13:01'),
(104, 23, '2026-02-01', '0', '0', '10', '10', 0, '2026-02-04 13:13:01', '2026-02-04 13:13:01'),
(105, 24, '2026-02-01', '0', '0', '10', '10', 0, '2026-02-04 13:13:01', '2026-02-04 13:13:01');

-- --------------------------------------------------------

--
-- Table structure for table `payment_types`
--

CREATE TABLE `payment_types` (
  `id` int(11) NOT NULL,
  `payment_type` varchar(250) NOT NULL,
  `payment_type_ar` varchar(150) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payment_types`
--

INSERT INTO `payment_types` (`id`, `payment_type`, `payment_type_ar`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Offline', 'غير متصل على الانترنت', 1, '2021-03-01 10:17:25', '2021-03-06 07:34:21'),
(2, 'Online', 'متصل', 1, '2021-03-01 10:18:28', '2021-03-06 07:34:40');

-- --------------------------------------------------------

--
-- Table structure for table `paypal_settings`
--

CREATE TABLE `paypal_settings` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `policies`
--

CREATE TABLE `policies` (
  `id` int(11) NOT NULL,
  `corporate_customer_id` int(11) NOT NULL,
  `title` varchar(250) NOT NULL,
  `short_description` text NOT NULL,
  `long_description` text NOT NULL,
  `title_ar` varchar(250) DEFAULT NULL,
  `short_description_ar` text DEFAULT NULL,
  `long_description_ar` text DEFAULT NULL,
  `status` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `policies`
--

INSERT INTO `policies` (`id`, `corporate_customer_id`, `title`, `short_description`, `long_description`, `title_ar`, `short_description_ar`, `long_description_ar`, `status`, `created_at`, `updated_at`) VALUES
(2, 1, 'Personal Use Policy', 'Rules and restrictions for personal ride usage', 'the', 'Personal Use Policy', 'Personal Use Policy', 'Personal Use Policy', 1, '2025-10-22 06:32:43', '2025-12-31 14:10:34'),
(3, 1, 'Personal Use Policy', 'Rules and restrictions for personal ride usage', 'The Personal Use Policy defines the terms and conditions under which company vehicles and transportation services may be used for personal purposes. This includes eligibility criteria, usage limitations, insurance coverage details, and liability considerations. Employees must obtain proper authorization before using any company resources for personal transportation needs.', NULL, NULL, NULL, 1, '2025-10-22 07:12:23', '2025-10-22 07:17:13'),
(4, 1, 'Information', 'We collect information you provide to us in connection with our Services, such as when you create or update your account, log into your account, request or reserve transportation, contact our customer service, or otherwise communicate with us via telephone, our websites, mobile applications or otherwise. This information includes your name, telephone number, email address, mailing address, photographs or other text or images you use, e.g., for your profile, the types of Services you request (collectively, “Personal Information”), as well as transaction details, billing and payment information, and other information you use or provide to us in using the Services. If you do not wish to provide any Personal Information, you may simply decline to use our Services.', 'We collect information you provide to us in connection with our Services, such as when you create or update your account, log into your account, request or reserve transportation, contact our customer service, or otherwise communicate with us via telephone, our websites, mobile applications or otherwise. This information includes your name, telephone number, email address, mailing address, photographs or other text or images you use, e.g., for your profile, the types of Services you request (collectively, “Personal Information”), as well as transaction details, billing and payment information, and other information you use or provide to us in using the Services. If you do not wish to provide any Personal Information, you may simply decline to use our Services.', NULL, NULL, NULL, 1, '2025-10-22 13:13:54', '2025-10-22 13:13:54'),
(5, 2, 'personal Use policy', 'Rules and restrictions for personal ride usage', 'Rules and restrictions for personal ride usage', NULL, NULL, NULL, 1, '2025-10-22 13:27:45', '2025-10-22 13:27:45'),
(6, 2, 'information', 'Information', 'Information', NULL, NULL, NULL, 1, '2025-10-24 18:17:23', '2025-10-24 18:17:23'),
(7, 10, 'Infromation', 'Infromation', 'Infromation', NULL, NULL, NULL, 1, '2025-10-27 12:41:23', '2025-10-27 12:41:23'),
(9, 15, 'Information', 'Information', 'Information', NULL, NULL, NULL, 1, '2025-11-03 12:41:06', '2025-11-03 12:41:06'),
(10, 15, 'Information', 'Information', 'Information', NULL, NULL, NULL, 1, '2025-11-03 12:41:05', '2025-11-03 12:41:05'),
(11, 17, 'Corporate Policy', 'Corporate Policy', 'Corporate Policy', NULL, NULL, NULL, 1, '2025-12-30 13:07:06', '2025-12-30 13:07:06'),
(12, 12, 'Corporate Policy', 'Corporate Policy', 'Corporate', 'Sera ya Biashara', 'Sera ya Biashara', 'Sera ya Biashara', 1, '2025-12-30 18:11:17', '2025-12-31 18:21:42'),
(13, 12, 'test', 'test1', 'testtt', NULL, NULL, NULL, 1, '2026-01-15 11:13:26', '2026-01-15 11:13:26');

-- --------------------------------------------------------

--
-- Table structure for table `privacy_policies`
--

CREATE TABLE `privacy_policies` (
  `id` int(11) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `title` varchar(250) NOT NULL,
  `description` text NOT NULL,
  `title_ar` varchar(250) DEFAULT NULL,
  `description_ar` text DEFAULT NULL,
  `status` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `user_type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `privacy_policies`
--

INSERT INTO `privacy_policies` (`id`, `slug`, `title`, `description`, `title_ar`, `description_ar`, `status`, `created_at`, `updated_at`, `user_type_id`) VALUES
(1, '', 'Information', 'We collect information you provide to us in connection with our Services, such as when you create or update your account, log into your account, request or reserve transportation, contact our customer service, or otherwise communicate with us via telephone, our websites, mobile applications or otherwise. This information includes your name, telephone number, email address, mailing address, photographs or other text or images you use, e.g., for your profile, the types of Services you request (collectively, “Personal Information”), as well as transaction details, billing and payment information, and other information you use or provide to us in using the Services. If you do not wish to provide any Personal Information, you may simply decline to use our Services.', 'معلومة', 'نقوم بجمع المعلومات التي تقدمها لنا فيما يتعلق بخدماتنا ، على سبيل المثال عندما تقوم بإنشاء أو تحديث حسابك ، أو تسجيل الدخول إلى حسابك ، أو طلب أو حجز وسيلة نقل ، أو الاتصال بخدمة العملاء لدينا ، أو التواصل معنا بطريقة أخرى عبر الهاتف ، أو مواقعنا الإلكترونية ، أو الهاتف المحمول. التطبيقات أو غير ذلك. تتضمن هذه المعلومات اسمك ورقم هاتفك وعنوان بريدك الإلكتروني وعنوانك البريدي والصور الفوتوغرافية أو النصوص أو الصور الأخرى التي تستخدمها ، على سبيل المثال ، لملفك الشخصي ، وأنواع الخدمات التي تطلبها (يُشار إليها إجمالاً باسم \"المعلومات الشخصية\") ، فضلاً عن تفاصيل المعاملة ومعلومات الفوترة والدفع والمعلومات الأخرى التي تستخدمها أو تزودنا بها في استخدام الخدمات. إذا كنت لا ترغب في تقديم أي معلومات شخصية ، يمكنك ببساطة رفض استخدام خدماتنا.', 1, '2021-03-01 10:45:16', '2021-03-06 07:49:50', 1),
(2, 'location', 'Location', 'In order for us to be able to provide your requested Services, you will need to grant us permission to obtain your geographic location from your device. Thereafter, you can disable this function in the settings of your device, understanding that you may not be able to avail yourself of our Services that require your location.', 'موقع', 'لكي نتمكن من تقديم الخدمات المطلوبة ، ستحتاج إلى منحنا إذنًا بالحصول على موقعك الجغرافي من جهازك. بعد ذلك ، يمكنك تعطيل هذه الوظيفة في إعدادات جهازك ، مع العلم أنك قد لا تتمكن من الاستفادة من خدماتنا التي تتطلب موقعك.', 1, '2021-03-01 11:02:19', '2022-05-20 05:08:44', 1),
(3, 'driver_notes', 'Driver notes', 'The personal data of those who order or receive trips or deliveries via partner websites or apps (such as when ordering from a restaurant or grocery store), or arranged by other account owners (collectively “Guest Users”) is used solely to provide such trips, deliveries, or other services requested through a third party, and for purposes of safety and security, customer support, research and development, enabling communication between users, and in connection with legal proceedings and requirements, each as described in “How we use personal data” below. Guest User data may be shared with third parties for these purposes. Such data may be associated with, and accessible by, the owner of that account. This specifically includes Guest Users who receive rides/deliveries ordered by owners of Uber Health, Uber Central, Uber Direct or Uber for Business accounts, or who receive rides or deliveries ordered by friends, family members or others. To submit questions, comments or complaints regarding Guest User data, or to submit requests regarding such data', 'ملاحظات السائق', 'تُستخدم البيانات الشخصية لأولئك الذين يطلبون أو يستقبلون الرحلات أو التوصيلات عبر مواقع الويب أو التطبيقات الشريكة (على سبيل المثال عند الطلب من مطعم أو متجر بقالة) ، أو يتم ترتيبها بواسطة مالكي حسابات آخرين (يشار إليهم جميعًا باسم \"المستخدمون الضيوف\") فقط لتوفير هذه الرحلات أو عمليات التسليم أو الخدمات الأخرى المطلوبة من خلال طرف ثالث ، ولأغراض السلامة والأمن ، ودعم العملاء ، والبحث والتطوير ، وتمكين الاتصال بين المستخدمين ، وفيما يتعلق بالإجراءات والمتطلبات القانونية ، كل على النحو الموضح في \"كيف نستخدم الشخصية البيانات \"أدناه. قد تتم مشاركة بيانات المستخدم الضيف مع جهات خارجية لهذه الأغراض. قد تكون هذه البيانات مرتبطة بمالك هذا الحساب ويمكن الوصول إليه من قبله. يشمل هذا تحديدًا المستخدمين الضيوف الذين يتلقون المشاوير / التوصيلات التي طلبها مالكو حسابات Uber Health أو Uber Central أو Uber Direct أو Uber for Business ، أو الذين يتلقون المشاوير أو التوصيلات التي طلبها الأصدقاء أو أفراد العائلة أو غيرهم. لتقديم أسئلة أو تعليقات أو شكاوى بخصوص بيانات المستخدم الضيف ، أو لتقديم طلبات بخصوص هذه البيانات', 1, '2021-03-01 12:43:33', '2022-05-20 05:08:57', 2),
(4, 'driver_data', 'Devices data', 'We collect data generated by rental devices, such as bicycles, scooters, or other light electric vehicles or devices, when they’re in use. This includes the date and time of use, and the location, route, and distance traveled. To the extent permitted by law, the location data collected from the rental device during the trip will be linked to the renter’s account, even if they have not enabled Uber to collect location data from their mobile device. In certain jurisdictions, and where permitted by law, users can record the audio of their trips through an in-app feature. Recordings are encrypted and stored on users’ devices, and are only shared with Uber if submitted to customer support by the users in connection with safety incidents.', 'بيانات الأجهزة', 'نجمع البيانات التي تم إنشاؤها بواسطة الأجهزة المستأجرة ، مثل الدراجات أو الدراجات البخارية أو غيرها من المركبات أو الأجهزة الكهربائية الخفيفة ، عندما تكون قيد الاستخدام. يتضمن ذلك تاريخ ووقت الاستخدام والموقع والطريق والمسافة المقطوعة. إلى الحد الذي يسمح به القانون ، سيتم ربط بيانات الموقع التي تم جمعها من الجهاز المستأجر أثناء الرحلة بحساب المستأجر ، حتى إذا لم يتم تمكين أوبر من جمع بيانات الموقع من أجهزتهم المحمولة. في بعض الولايات القضائية ، وحيثما يسمح القانون ، يمكن للمستخدمين تسجيل صوت رحلاتهم من خلال ميزة داخل التطبيق. يتم تشفير التسجيلات وتخزينها على أجهزة المستخدمين ، ولا تتم مشاركتها إلا مع Uber إذا تم إرسالها إلى دعم العملاء من قبل المستخدمين فيما يتعلق بحوادث السلامة.', 1, '2021-03-01 12:45:00', '2022-05-20 05:09:11', 2),
(5, 'information', 'Information', 'We collect information you provide to us in connection with our Services, such as when you create or update your account, log into your account, request or reserve transportation, contact our customer service, or otherwise communicate with us via telephone, our websites, mobile applications or otherwise. This information includes your name, telephone number, email address, mailing address, photographs or other text or images you use, e.g., for your profile, the types of Services you request (collectively, “Personal Information”), as well as transaction details, billing and payment information, and other information you use or provide to us in using the Services. If you do not wish to provide any Personal Information, you may simply decline to use our Services.', 'معلومة', 'نقوم بجمع المعلومات التي تقدمها لنا فيما يتعلق بخدماتنا ، على سبيل المثال عندما تقوم بإنشاء أو تحديث حسابك ، أو تسجيل الدخول إلى حسابك ، أو طلب أو حجز وسيلة نقل ، أو الاتصال بخدمة العملاء لدينا ، أو التواصل معنا بطريقة أخرى عبر الهاتف ، أو مواقعنا الإلكترونية ، أو الهاتف المحمول. التطبيقات أو غير ذلك. تتضمن هذه المعلومات اسمك ورقم هاتفك وعنوان بريدك الإلكتروني وعنوانك البريدي والصور الفوتوغرافية أو النصوص أو الصور الأخرى التي تستخدمها ، على سبيل المثال ، لملفك الشخصي ، وأنواع الخدمات التي تطلبها (يُشار إليها إجمالاً باسم \"المعلومات الشخصية\") ، فضلاً عن تفاصيل المعاملة ومعلومات الفوترة والدفع والمعلومات الأخرى التي تستخدمها أو تزودنا بها في استخدام الخدمات. إذا كنت لا ترغب في تقديم أي معلومات شخصية ، يمكنك ببساطة رفض استخدام خدماتنا.', 1, '2021-05-15 09:53:59', '2022-12-26 10:56:12', 1),
(6, 'location', 'Location', 'In order for us to be able to provide your requested Services, you will need to grant us permission to obtain your geographic location from your device. Thereafter, you can disable this function in the settings of your device, understanding that you may not be able to avail yourself of our Services that require your location.', 'موقع', 'لكي نتمكن من تقديم الخدمات المطلوبة ، ستحتاج إلى منحنا إذنًا بالحصول على موقعك الجغرافي من جهازك. بعد ذلك ، يمكنك تعطيل هذه الوظيفة في إعدادات جهازك ، مع العلم أنك قد لا تتمكن من الاستفادة من خدماتنا التي تتطلب موقعك.', 1, '2021-05-15 09:54:57', '2022-05-20 05:09:55', 1),
(7, 'driver_notes', 'Driver notes', 'The personal data of those who order or receive trips or deliveries via partner websites or apps (such as when ordering from a restaurant or grocery store), or arranged by other account owners (collectively “Guest Users”) is used solely to provide such trips, deliveries, or other services requested through a third party, and for purposes of safety and security, customer support, research and development, enabling communication between users, and in connection with legal proceedings and requirements, each as described in “How we use personal data” below. Guest User data may be shared with third parties for these purposes. Such data may be associated with, and accessible by, the owner of that account. This specifically includes Guest Users who receive rides/deliveries ordered by owners of Uber Health, Uber Central, Uber Direct or Uber for Business accounts, or who receive rides or deliveries ordered by friends, family members or others. To submit questions, comments or complaints regarding Guest User data, or to submit requests regarding such data', 'ملاحظات السائق', 'تُستخدم البيانات الشخصية لأولئك الذين يطلبون أو يستقبلون الرحلات أو التوصيلات عبر مواقع الويب أو التطبيقات الشريكة (على سبيل المثال عند الطلب من مطعم أو متجر بقالة) ، أو يتم ترتيبها بواسطة مالكي حسابات آخرين (يشار إليهم جميعًا باسم \"المستخدمون الضيوف\") فقط لتوفير هذه الرحلات أو عمليات التسليم أو الخدمات الأخرى المطلوبة من خلال طرف ثالث ، ولأغراض السلامة والأمن ، ودعم العملاء ، والبحث والتطوير ، وتمكين الاتصال بين المستخدمين ، وفيما يتعلق بالإجراءات والمتطلبات القانونية ، كل على النحو الموضح في \"كيف نستخدم الشخصية البيانات \"أدناه. قد تتم مشاركة بيانات المستخدم الضيف مع جهات خارجية لهذه الأغراض. قد تكون هذه البيانات مرتبطة بمالك هذا الحساب ويمكن الوصول إليه من قبله. يشمل هذا تحديدًا المستخدمين الضيوف الذين يتلقون المشاوير / التوصيلات التي طلبها مالكو حسابات Uber Health أو Uber Central أو Uber Direct أو Uber for Business ، أو الذين يتلقون المشاوير أو التوصيلات التي طلبها الأصدقاء أو أفراد العائلة أو غيرهم. لتقديم أسئلة أو تعليقات أو شكاوى بخصوص بيانات المستخدم الضيف ، أو لتقديم طلبات بخصوص هذه البيانات', 1, '2021-05-15 09:56:05', '2022-05-20 05:11:14', 2),
(8, 'devices_data', 'Devices data', 'We collect data generated by rental devices, such as bicycles, scooters, or other light electric vehicles or devices, when they’re in use. This includes the date and time of use, and the location, route, and distance traveled. To the extent permitted by law, the location data collected from the rental device during the trip will be linked to the renter’s account, even if they have not enabled Uber to collect location data from their mobile device. In certain jurisdictions, and where permitted by law, users can record the audio of their trips through an in-app feature. Recordings are encrypted and stored on users’ devices, and are only shared with Uber if submitted to customer support by the users in connection with safety incidents.', 'بيانات الأجهزة', 'نجمع البيانات التي تم إنشاؤها بواسطة الأجهزة المستأجرة ، مثل الدراجات أو الدراجات البخارية أو غيرها من المركبات أو الأجهزة الكهربائية الخفيفة ، عندما تكون قيد الاستخدام. يتضمن ذلك تاريخ ووقت الاستخدام والموقع والطريق والمسافة المقطوعة. إلى الحد الذي يسمح به القانون ، سيتم ربط بيانات الموقع التي تم جمعها من الجهاز المستأجر أثناء الرحلة بحساب المستأجر ، حتى إذا لم يتم تمكين أوبر من جمع بيانات الموقع من أجهزتهم المحمولة. في بعض الولايات القضائية ، وحيثما يسمح القانون ، يمكن للمستخدمين تسجيل صوت رحلاتهم من خلال ميزة داخل التطبيق. يتم تشفير التسجيلات وتخزينها على أجهزة المستخدمين ، ولا تتم مشاركتها إلا مع Uber إذا تم إرسالها إلى دعم العملاء من قبل المستخدمين فيما يتعلق بحوادث السلامة.', 1, '2021-05-15 09:57:05', '2022-05-20 05:11:43', 2),
(9, 'cancellation_policy', 'Cancellation Policies', 'The minimum night stay at your property. Simply click Edit on your base or seasonal rates and select the desired minimum stay\r\nThe changeover day (the day guests can arrive at your property). Either set it to the day of the week that suits you or keep it flexible. Click Edit on your base or seasonal rates, select Require changeover day and choose an option\r\nhe currency your listing is advertised in. Please note that this should be a currency that you can receive payouts in on PayPal or in your bank account\r\nPlease note: any changes you make will only apply to future bookings, not to an existing booking where the guest has paid the booking deposit. This is because you’ve already agreed on the contract - it keeps things secure for both you and your guest.\r\nFor all free listings and most annual listings using online booking, you’ll need to have a rental agreement attached to all quotes. This is to ensure that there are clear terms agreed between you and the guest should any disputes arise. Our standard rental agreement is the default contract automatically attached to your quotes. You can also upload your own one by going to Booking policies.\r\nFor all free listings and most annual listings using online booking, you’ll need to have a rental agreement attached to all quotes. This is to ensure that there are clear terms agreed between you and the guest should any disputes arise. Our standard rental agreement is the default contract automatically attached to your quotes. You can also upload your own one by going to Booking policies.', NULL, NULL, 1, '2022-05-20 06:47:32', '2022-05-20 08:41:20', 1),
(10, 'cancellation_policy', 'Cancellation Policies', 'The minimum night stay at your property. Simply click Edit on your base or seasonal rates and select the desired minimum stay\r\nThe changeover day (the day guests can arrive at your property). Either set it to the day of the week that suits you or keep it flexible. Click Edit on your base or seasonal rates, select Require changeover day and choose an option\r\nhe currency your listing is advertised in. Please note that this should be a currency that you can receive payouts in on PayPal or in your bank account\r\nPlease note: any changes you make will only apply to future bookings, not to an existing booking where the guest has paid the booking deposit. This is because you’ve already agreed on the contract - it keeps things secure for both you and your guest.\r\nFor all free listings and most annual listings using online booking, you’ll need to have a rental agreement attached to all quotes. This is to ensure that there are clear terms agreed between you and the guest should any disputes arise. Our standard rental agreement is the default contract automatically attached to your quotes. You can also upload your own one by going to Booking policies.\r\nFor all free listings and most annual listings using online booking, you’ll need to have a rental agreement attached to all quotes. This is to ensure that there are clear terms agreed between you and the guest should any disputes arise. Our standard rental agreement is the default contract automatically attached to your quotes. You can also upload your own one by going to Booking policies.', NULL, NULL, 1, '2022-05-20 07:14:51', '2022-05-20 08:39:28', 1),
(11, 'cancellation_policy', 'Cancellation Policy', 'The minimum night stay at your property. Simply click Edit on your base or seasonal rates and select the desired minimum stay\r\nThe changeover day (the day guests can arrive at your property). Either set it to the day of the week that suits you or keep it flexible. Click Edit on your base or seasonal rates, select Require changeover day and choose an option\r\nhe currency your listing is advertised in. Please note that this should be a currency that you can receive payouts in on PayPal or in your bank account\r\nPlease note: any changes you make will only apply to future bookings, not to an existing booking where the guest has paid the booking deposit. This is because you’ve already agreed on the contract - it keeps things secure for both you and your guest.\r\nFor all free listings and most annual listings using online booking, you’ll need to have a rental agreement attached to all quotes. This is to ensure that there are clear terms agreed between you and the guest should any disputes arise. Our standard rental agreement is the default contract automatically attached to your quotes. You can also upload your own one by going to Booking policies.\r\nFor all free listings and most annual listings using online booking, you’ll need to have a rental agreement attached to all quotes. This is to ensure that there are clear terms agreed between you and the guest should any disputes arise. Our standard rental agreement is the default contract automatically attached to your quotes. You can also upload your own one by going to Booking policies.', NULL, NULL, 1, '2022-12-02 05:58:22', '2022-12-02 05:58:38', 1);

-- --------------------------------------------------------

--
-- Table structure for table `promo_codes`
--

CREATE TABLE `promo_codes` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL DEFAULT 0,
  `corporate_customer_id` int(11) NOT NULL DEFAULT 0,
  `promo_name` varchar(250) NOT NULL,
  `promo_code` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `promo_name_ar` varchar(250) DEFAULT NULL,
  `promo_code_ar` varchar(150) DEFAULT NULL,
  `description_ar` text DEFAULT NULL,
  `promo_type` int(11) NOT NULL,
  `discount` double NOT NULL,
  `min_fare` double NOT NULL DEFAULT 0,
  `max_discount_value` double NOT NULL DEFAULT 0,
  `redemptions` int(11) NOT NULL DEFAULT 0,
  `status` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `promo_codes`
--

INSERT INTO `promo_codes` (`id`, `customer_id`, `corporate_customer_id`, `promo_name`, `promo_code`, `description`, `promo_name_ar`, `promo_code_ar`, `description_ar`, `promo_type`, `discount`, `min_fare`, `max_discount_value`, `redemptions`, `status`, `created_at`, `updated_at`) VALUES
(1, 0, 0, 'Welcome Discount', 'Welcome Discount', 'Get 50% off on your first ride with us. Book now and start saving!', 'Karibu Punguzo', 'Karibu Punguzo', 'Pata punguzo la 50% unaposafiri nasi mara ya kwanza. Weka nafasi sasa na uanze kuhifadhi!', 6, 50, 30, 50, 10, 1, '2024-11-13 12:35:58', '2026-01-01 13:22:23'),
(2, 0, 0, 'Loyalty Reward', 'LOYAL100', 'Enjoy 100 off after completing 10 rides as a thank-you for being a loyal customer.', 'Tuzo la Uaminifu', 'LOYAL100', 'Furahia punguzo la 100 baada ya kukamilisha safari 10 kama shukrani kwa kuwa mteja mwaminifu.', 5, 100, 10, 100, 10, 1, '2024-11-13 12:37:37', '2025-12-15 12:15:39'),
(3, 0, 0, 'Ride Savings', 'RIDE10', 'Get 10% off on any ride. Available to all users, one-time use.', 'Akiba ya Safari', 'RIDE10', 'Pata punguzo la 10% kwa usafiri wowote. Inapatikana kwa watumiaji wote, matumizi ya mara moja.', 6, 10, 10, 10, 10, 1, '2024-11-13 12:38:01', '2025-12-15 12:16:06'),
(4, 31, 1, 'enjoy free', '223231', 'enjoy new offer', 'استمتع مجانا', '223231', 'استمتع بالعرض الجديد', 6, 22, 10, 23, 10, 1, '2025-08-15 14:42:51', '2025-12-30 17:28:53');

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `id` int(11) NOT NULL,
  `trip_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `driver_id` int(11) NOT NULL,
  `rating` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `referral_settings`
--

CREATE TABLE `referral_settings` (
  `id` int(11) NOT NULL,
  `referral_message` text NOT NULL,
  `referral_message_ar` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `referral_settings`
--

INSERT INTO `referral_settings` (`id`, `referral_message`, `referral_message_ar`, `created_at`, `updated_at`) VALUES
(1, 'Hi, when your friends or relatives register with your referral code, you get referral amount added to your wallet.', NULL, '2022-12-18 10:50:12', '2022-12-18 10:50:12');

-- --------------------------------------------------------

--
-- Table structure for table `rental_fare_management`
--

CREATE TABLE `rental_fare_management` (
  `id` int(11) NOT NULL,
  `vehicle_type` int(11) NOT NULL DEFAULT 0,
  `package_id` int(11) NOT NULL DEFAULT 0,
  `price_per_km` double NOT NULL,
  `price_per_hour` double NOT NULL,
  `package_price` double NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rental_fare_management`
--

INSERT INTO `rental_fare_management` (`id`, `vehicle_type`, `package_id`, `price_per_km`, `price_per_hour`, `package_price`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 2, 2, 10, 1, '2023-10-26 14:46:59', '2024-11-12 18:24:56'),
(2, 1, 2, 3, 2, 10, 1, '2023-10-26 14:47:35', '2024-11-12 18:25:02'),
(3, 2, 1, 3, 5, 10, 1, '2023-10-26 14:47:56', '2024-11-12 18:25:08'),
(4, 3, 1, 3, 6, 12, 1, '2023-10-26 14:48:22', '2024-11-12 18:25:35'),
(5, 4, 1, 2, 5, 10, 1, '2023-10-26 14:48:39', '2024-11-12 18:25:40'),
(6, 1, 3, 2, 10, 50, 1, '2023-10-26 15:29:51', '2024-11-12 18:25:49'),
(7, 2, 2, 4, 5, 12, 1, '2023-10-26 15:30:32', '2024-11-12 18:25:53'),
(8, 3, 2, 5, 6, 22, 1, '2023-10-26 15:31:08', '2024-11-12 18:25:57'),
(9, 4, 2, 3, 5, 14, 1, '2023-10-26 15:31:50', '2024-11-12 18:26:02'),
(10, 1, 4, 7, 4, 25, 1, '2023-10-26 15:32:42', '2024-11-12 18:26:10'),
(11, 2, 5, 5, 6, 30, 1, '2023-10-26 15:34:32', '2024-11-12 18:26:29'),
(12, 3, 4, 5, 7, 20, 1, '2023-10-26 15:40:48', '2024-11-12 18:26:34'),
(13, 4, 4, 20, 4, 35, 1, '2023-10-26 15:41:50', '2024-11-12 18:26:38'),
(14, 1, 4, 3, 5, 20, 1, '2023-10-26 15:42:13', '2024-11-12 18:26:43'),
(15, 2, 3, 3, 11, 50, 1, '2023-10-27 13:07:57', '2024-11-12 18:26:48'),
(16, 3, 5, 4, 12, 50, 1, '2023-10-27 13:08:20', '2025-02-11 11:46:42'),
(17, 4, 3, 2, 9, 50, 1, '2023-10-27 13:09:03', '2024-11-12 18:26:58'),
(18, 1, 1, 10, 5, 50, 1, '2024-06-06 11:38:06', '2024-11-12 18:27:02'),
(19, 2, 2, 1000, 5000, 66, 1, '2024-06-09 00:02:52', '2024-12-29 02:51:52'),
(20, 1, 3, 20, 49, 20, 1, '2025-04-26 15:25:24', '2025-04-26 15:25:24');

-- --------------------------------------------------------

--
-- Table structure for table `scratch_card_settings`
--

CREATE TABLE `scratch_card_settings` (
  `id` int(11) NOT NULL,
  `coupon_type` int(11) NOT NULL DEFAULT 1,
  `lucky_offer` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shared_fare_management`
--

CREATE TABLE `shared_fare_management` (
  `id` int(11) NOT NULL,
  `vehicle_type` int(11) NOT NULL DEFAULT 1,
  `base_fare` varchar(250) NOT NULL,
  `price_per_km` varchar(250) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `shared_fare_management`
--

INSERT INTO `shared_fare_management` (`id`, `vehicle_type`, `base_fare`, `price_per_km`, `status`, `created_at`, `updated_at`) VALUES
(2, 1, '100', '50', 1, '2023-10-26 14:54:06', '2024-11-12 18:30:06'),
(3, 2, '100', '50', 1, '2023-10-26 14:54:30', '2024-11-12 18:30:11'),
(5, 3, '40', '10', 1, '2024-06-24 14:44:03', '2024-11-12 18:30:15'),
(6, 1, '40', '17', 1, '2024-06-24 21:26:23', '2025-08-19 20:53:35'),
(7, 2, '20', '10', 1, '2024-06-25 21:45:01', '2025-08-19 20:53:26'),
(8, 3, '50', '20', 1, '2024-10-25 13:04:55', '2025-08-19 20:53:15'),
(9, 9, '50', '10', 1, '2025-03-10 13:21:20', '2025-03-10 13:21:20');

-- --------------------------------------------------------

--
-- Table structure for table `shared_trip_settings`
--

CREATE TABLE `shared_trip_settings` (
  `id` int(11) NOT NULL,
  `pickup_radius` double NOT NULL,
  `drop_radius` double NOT NULL,
  `max_bookings` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `shared_trip_settings`
--

INSERT INTO `shared_trip_settings` (`id`, `pickup_radius`, `drop_radius`, `max_bookings`, `created_at`, `updated_at`) VALUES
(1, 2, 2, 3, '2022-12-29 10:20:52', '2024-06-26 11:46:26');

-- --------------------------------------------------------

--
-- Table structure for table `statuses`
--

CREATE TABLE `statuses` (
  `id` int(11) NOT NULL,
  `type` varchar(250) NOT NULL,
  `name` varchar(250) NOT NULL,
  `name_ar` varchar(250) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `statuses`
--

INSERT INTO `statuses` (`id`, `type`, `name`, `name_ar`, `created_at`, `updated_at`) VALUES
(1, 'general', 'Active', 'نشيط', '2020-04-04 00:00:00', '2021-03-06 08:23:29'),
(2, 'general', 'InActive', 'غير نشط', '2020-04-04 00:00:00', '2021-03-06 08:23:56'),
(3, 'enable_disable', 'Enable', 'يمكن', '2020-04-06 00:00:00', '2021-03-06 08:24:25'),
(4, 'enable_disable', 'Disable', 'تعطيل', '2020-04-06 00:00:00', '2021-03-06 08:24:53'),
(5, 'promo_type', 'Fixed', 'مثبت', '2020-02-20 08:05:49', '2021-03-06 08:25:34'),
(6, 'promo_type', 'Percentage', 'النسبة المئوية', '2020-02-20 08:44:49', '2021-03-06 08:26:08'),
(7, 'user_type', 'Customer', 'عميل', '2020-02-20 08:44:49', '2021-03-06 08:27:24'),
(8, 'user_type', 'Driver', 'سائق', '2020-02-20 08:44:49', '2021-03-06 08:27:53'),
(9, 'trip_status', 'Accepted', 'وافقت', '2020-10-03 18:54:54', '2021-03-06 08:28:24'),
(10, 'trip_status', 'Completed', 'مكتمل', '2020-10-03 18:54:54', '2021-03-06 08:28:42'),
(11, 'withdrawal', 'Pending', 'قيد الانتظار', '2020-10-03 23:37:18', '2021-03-06 08:29:25'),
(12, 'withdrawal', 'Completed', 'مكتمل', '2020-10-03 23:37:18', '2021-03-06 08:29:46'),
(13, 'withdrawal', 'Rejected', 'مرفوض', '2020-10-03 23:37:18', '2021-03-06 08:30:05'),
(14, 'verification_status', 'Waiting For Upload', 'في انتظار التحميل', '2021-03-08 06:03:00', '2021-03-09 15:15:13'),
(15, 'verification_status', 'Waiting for Approval', 'بانتظار الموافقة', '2021-03-08 06:04:19', '2021-03-09 15:15:50'),
(16, 'verification_status', 'Approved', 'وافق', '2021-03-08 06:07:50', '2021-03-09 15:16:20'),
(17, 'verification_status', 'Rejected', 'مرفوض', '2021-03-09 15:16:55', '2021-03-09 15:16:55'),
(18, 'vehicle_mode', 'Passenger Vehicle', 'سيارة ركاب', '2021-04-12 04:35:23', '2021-04-12 04:35:23'),
(19, 'vehicle_mode', 'Commercial Vehicle', 'مركبة تجارية', '2021-04-12 04:36:06', '2021-04-12 04:36:06'),
(21, 'customer_complaints', 'Initiated', 'بدأت', '2023-03-11 11:49:56', '2023-03-11 11:49:56'),
(22, 'customer_complaints', 'Resolved', 'تم الحل', '2023-03-11 11:50:35', '2023-03-11 11:50:35'),
(23, 'customer_complaints', 'Processing', 'يعالج', '2023-03-11 11:51:41', '2023-03-11 11:51:41');

-- --------------------------------------------------------

--
-- Table structure for table `stops`
--

CREATE TABLE `stops` (
  `id` int(11) NOT NULL,
  `trip_request_id` int(11) NOT NULL,
  `trip_id` int(11) NOT NULL DEFAULT 0,
  `address` varchar(250) NOT NULL,
  `latitude` varchar(100) NOT NULL,
  `longitude` varchar(100) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `stops`
--

INSERT INTO `stops` (`id`, `trip_request_id`, `trip_id`, `address`, `latitude`, `longitude`, `status`, `created_at`, `updated_at`) VALUES
(1, 5, 0, 'Periyar Bus Stand', '9.919', '78.119', 0, '2025-10-14 15:50:07', '2025-10-14 15:50:07');

-- --------------------------------------------------------

--
-- Table structure for table `subscriptions`
--

CREATE TABLE `subscriptions` (
  `id` int(11) NOT NULL,
  `sub_name` varchar(250) NOT NULL,
  `sub_image` varchar(250) NOT NULL,
  `sub_description` text NOT NULL,
  `amount` double NOT NULL DEFAULT 0,
  `free_bookings` int(11) NOT NULL DEFAULT 0,
  `validity` int(11) NOT NULL DEFAULT 0,
  `validity_label` varchar(250) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `subscriptions`
--

INSERT INTO `subscriptions` (`id`, `sub_name`, `sub_image`, `sub_description`, `amount`, `free_bookings`, `validity`, `validity_label`, `created_at`, `updated_at`) VALUES
(1, 'Platinum', 'subscriptions//961af00869aebbcfdc5d9fa4ec2a7b66.webp', 'Platinam subscription', 1000, 20, 60, '2 Months', '2022-12-18 11:41:07', '2022-12-18 11:41:07'),
(2, 'Gold', 'subscriptions//101c7281c288fa9f03233c67cd795b0c.png', 'Gold subscription', 500, 10, 30, '1 Month', '2022-12-18 11:41:50', '2022-12-18 11:41:50');

-- --------------------------------------------------------

--
-- Table structure for table `surge_fare_settings`
--

CREATE TABLE `surge_fare_settings` (
  `id` int(11) NOT NULL,
  `surge` float NOT NULL,
  `requests` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `surge_fare_settings`
--

INSERT INTO `surge_fare_settings` (`id`, `surge`, `requests`, `created_at`, `updated_at`) VALUES
(1, 1.5, 1, '2022-12-03 04:11:09', '2022-12-03 04:11:09'),
(2, 2, 2, '2022-12-03 04:11:23', '2022-12-03 04:11:23'),
(3, 2.5, 3, '2022-12-03 04:11:34', '2022-12-03 04:11:34'),
(4, 3, 4, '2022-12-03 04:11:42', '2022-12-03 04:11:42'),
(5, 3.5, 6, '2023-10-04 00:10:23', '2023-10-04 00:10:23');

-- --------------------------------------------------------

--
-- Table structure for table `surge_settings`
--

CREATE TABLE `surge_settings` (
  `id` int(11) NOT NULL,
  `searching_time` int(11) NOT NULL,
  `minimum_trips` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `surge_settings`
--

INSERT INTO `surge_settings` (`id`, `searching_time`, `minimum_trips`, `created_at`, `updated_at`) VALUES
(1, 30000000, 3, '2022-12-03 04:55:52', '2025-04-01 18:56:15');

-- --------------------------------------------------------

--
-- Table structure for table `tax_lists`
--

CREATE TABLE `tax_lists` (
  `id` int(11) NOT NULL,
  `tax_name` varchar(250) NOT NULL,
  `percent` double NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tax_lists`
--

INSERT INTO `tax_lists` (`id`, `tax_name`, `percent`, `status`, `created_at`, `updated_at`) VALUES
(4, 'تقديم خدمات التطبيق', 10, 1, '2025-04-26 22:30:24', '2025-04-26 23:09:03'),
(5, 'GST', 12, 1, '2025-05-05 20:11:12', '2025-05-05 20:11:12');

-- --------------------------------------------------------

--
-- Table structure for table `term_conditions`
--

CREATE TABLE `term_conditions` (
  `id` int(11) NOT NULL,
  `user_type_id` int(11) DEFAULT NULL,
  `title` varchar(250) NOT NULL,
  `title_ar` varchar(250) NOT NULL,
  `terms` text NOT NULL,
  `terms_ar` text NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `term_conditions`
--

INSERT INTO `term_conditions` (`id`, `user_type_id`, `title`, `title_ar`, `terms`, `terms_ar`, `status`, `created_at`, `updated_at`) VALUES
(1, NULL, 'About HydroMobility EV', 'حولHydroMobility EV', 'HydroMobility EV will use reasonable efforts to maintain a high-quality ride service. HydroMobility EV accepts no liability for issues arising from normal vehicle operations or for any specific requests made by the customer that are outside standard procedures. HydroMobility EV is not responsible for delays, changes, or issues resulting from traffic, weather, or other unforeseen circumstances during the ride. HydroMobility EV reserves the right to refuse service to any customer. HydroMobility EV does not guarantee the resolution of all concerns during the trip. HydroMobility EV is not responsible for loss of or damage to any personal belongings left in the vehicle, such as money, jewelry, or any other items. The customer agrees not to leave such items behind. Vehicle components, such as seat belts and doors, may behave unpredictably during normal use. Customers are notified that there is a possibility of such issues, and HydroMobility EV does not accept any liability for them.', 'ستبذل HydroMobility EV جهودًا معقولة للحفاظ على خدمة ركوب عالية الجودة. لا تتحمل HydroMobility EV أي مسؤولية عن المشكلات الناشئة عن التشغيل العادي للمركبة أو عن أي طلبات محددة يقدمها العميل خارج الإجراءات القياسية. لا تتحمل HydroMobility EV مسؤولية التأخيرات أو التغييرات أو المشكلات الناتجة عن حركة المرور أو الطقس أو الظروف غير المتوقعة الأخرى أثناء الرحلة. تحتفظ HydroMobility EV بالحق في رفض الخدمة لأي عميل. لا تضمن HydroMobility EV حل جميع المخاوف أثناء الرحلة. لا تتحمل HydroMobility EV مسؤولية فقدان أو تلف أي متعلقات شخصية تُترك في المركبة، مثل الأموال أو المجوهرات أو أي أغراض أخرى. يوافق العميل على عدم ترك مثل هذه العناصر خلفه. قد تتصرف مكونات المركبة، مثل أحزمة الأمان والأبواب، بشكل غير متوقع أثناء الاستخدام العادي. يتم إخطار العملاء بوجود احتمالية حدوث مثل هذه المشكلات، ولا تتحمل HydroMobility EV أي مسؤولية عنها.', 1, '2023-05-12 11:20:36', '2025-10-14 11:53:50');

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `avatar` varchar(250) NOT NULL,
  `comments` text NOT NULL,
  `role` varchar(250) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `testimonials`
--

INSERT INTO `testimonials` (`id`, `name`, `avatar`, `comments`, `role`, `created_at`, `updated_at`) VALUES
(1, 'Alex Johnson', 'avatar/7a5c180eeb9e91d337fdf90fb84baebe.png', 'Hydro-mobility  makes my airport commutes seamless. The rides are always on time, and the app is super user-friendly. It’s a game-changer for frequent flyers like me', 'Frequent Traveler', '2024-12-27 11:48:45', '2025-10-14 12:29:39'),
(2, 'Sarah Martinez', 'avatar/b7e496156f28f14372be5bafeacac418.png', 'Affordable and reliable! Hydromobility has become my go-to for getting to work. The drivers are polite, and the live tracking feature gives me peace of mind', 'Daily Commuter', '2025-01-13 05:34:47', '2025-10-14 12:30:03'),
(3, 'Jamal Singh', 'avatar/0cbd0cff1839e2560759710ea6ca7814.png', 'As someone who relies on punctual transportation, Hydromobility delivers every time. The customer support is excellent, and the booking process is effortless', 'Business Owner', '2025-01-13 05:36:31', '2025-10-14 12:30:18'),
(4, 'Emily Clarke', 'avatar/c3755843809b80dc8c24b307602fa3f3.png', 'Hydromobility is a lifesaver for school pickups and family outings. The app ensures we always get a safe and comfortable ride, even on busy days. I love this application', 'Parent', '2025-01-13 06:05:16', '2025-10-14 12:30:34'),
(5, 'Michael Lee', 'avatar/eaffae2159aeeab99667e9c0b69778b6.png', 'Exploring a new city is stress-free with Hydromobility. The transparent and convenient pricing and knowledgeable and polite drivers make it the perfect travel companion', 'Tourist', '2025-01-13 06:06:17', '2025-10-14 12:30:49');

-- --------------------------------------------------------

--
-- Table structure for table `tips`
--

CREATE TABLE `tips` (
  `id` int(11) NOT NULL,
  `tip` double NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tips`
--

INSERT INTO `tips` (`id`, `tip`, `created_at`, `updated_at`) VALUES
(1, 10, '2022-12-19 17:27:58', '2022-12-19 17:27:58'),
(2, 20, '2022-12-19 17:27:58', '2022-12-19 17:27:58'),
(3, 30, '2022-12-19 17:27:58', '2022-12-19 17:27:58'),
(4, 50, '2022-12-19 17:27:58', '2022-12-19 17:27:58');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `amount` double NOT NULL,
  `payment_method` int(11) NOT NULL,
  `type` varchar(250) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `trips`
--

CREATE TABLE `trips` (
  `id` int(11) NOT NULL,
  `trip_id` varchar(250) DEFAULT NULL,
  `customer_id` int(11) NOT NULL,
  `corporate_customer_id` int(11) DEFAULT 0,
  `trip_type` int(11) NOT NULL DEFAULT 0,
  `trip_sub_type` int(11) NOT NULL DEFAULT 0,
  `booking_type` int(11) NOT NULL DEFAULT 1,
  `package_id` int(11) NOT NULL DEFAULT 0,
  `driver_id` int(11) NOT NULL,
  `pickup_date` datetime NOT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `pickup_address` varchar(250) NOT NULL,
  `actual_pickup_address` text DEFAULT NULL,
  `actual_pickup_lat` varchar(100) DEFAULT NULL,
  `actual_pickup_lng` varchar(100) DEFAULT NULL,
  `pickup_lat` varchar(250) NOT NULL,
  `pickup_lng` varchar(250) NOT NULL,
  `drop_address` text DEFAULT NULL,
  `actual_drop_address` text DEFAULT NULL,
  `actual_drop_lat` varchar(100) NOT NULL DEFAULT '0',
  `actual_drop_lng` varchar(100) NOT NULL DEFAULT '0',
  `drop_lat` varchar(250) NOT NULL DEFAULT '0',
  `drop_lng` varchar(250) NOT NULL DEFAULT '0',
  `zone` int(11) NOT NULL,
  `distance` double NOT NULL DEFAULT 0,
  `vehicle_id` int(11) NOT NULL,
  `vehicle_type` int(11) NOT NULL DEFAULT 0,
  `payment_method` int(11) NOT NULL,
  `total` double NOT NULL,
  `collection_amount` double NOT NULL DEFAULT 0,
  `sub_total` double NOT NULL DEFAULT 0,
  `discount` double NOT NULL,
  `tax` double NOT NULL DEFAULT 0,
  `promo_code` int(11) NOT NULL,
  `tip` double NOT NULL DEFAULT 0,
  `otp` int(4) NOT NULL,
  `ratings` varchar(50) NOT NULL DEFAULT '0',
  `customer_rating` double NOT NULL DEFAULT 0,
  `static_map` varchar(250) DEFAULT NULL,
  `is_multiple_drops` int(11) NOT NULL DEFAULT 0,
  `is_subscription_trip` int(11) NOT NULL DEFAULT 0,
  `contact` varchar(100) DEFAULT NULL,
  `surge` double NOT NULL,
  `polyline` text DEFAULT NULL,
  `waypoints` text DEFAULT NULL,
  `status` int(11) NOT NULL,
  `agent_name` varchar(250) DEFAULT NULL,
  `agent_phone_number` varchar(250) DEFAULT NULL,
  `driver_note` text DEFAULT NULL,
  `customer_note` text DEFAULT NULL,
  `company_name` varchar(250) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `trips`
--

INSERT INTO `trips` (`id`, `trip_id`, `customer_id`, `corporate_customer_id`, `trip_type`, `trip_sub_type`, `booking_type`, `package_id`, `driver_id`, `pickup_date`, `start_time`, `end_time`, `pickup_address`, `actual_pickup_address`, `actual_pickup_lat`, `actual_pickup_lng`, `pickup_lat`, `pickup_lng`, `drop_address`, `actual_drop_address`, `actual_drop_lat`, `actual_drop_lng`, `drop_lat`, `drop_lng`, `zone`, `distance`, `vehicle_id`, `vehicle_type`, `payment_method`, `total`, `collection_amount`, `sub_total`, `discount`, `tax`, `promo_code`, `tip`, `otp`, `ratings`, `customer_rating`, `static_map`, `is_multiple_drops`, `is_subscription_trip`, `contact`, `surge`, `polyline`, `waypoints`, `status`, `agent_name`, `agent_phone_number`, `driver_note`, `customer_note`, `company_name`, `created_at`, `updated_at`) VALUES
(1, '000001', 1, 0, 1, 0, 1, 0, 1, '2025-10-06 11:45:35', '2025-10-06 11:46:25', '2025-10-06 11:46:31', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', 'Ellis Nagar, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9101917048387', '78.089482891715', '9.9101676512208', '78.089399771133', 'Capran Hall Higher Secondary School, Arappalayam Pradhna Salai, Arappalayam, Madurai, Madurai South, Madurai, Tamil Nadu, 625017, India', 'Ellis Nagar, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9101917048387', '78.089482891715', '9.9306477327897', '78.112629696608', 99, 0, 1, 1, 1, 19.76, 0, 16.2, 0, 3.56, 0, 0, 2571, '0', 0, '', 0, 0, 'null', 1, '', NULL, 6, NULL, NULL, NULL, NULL, NULL, '2025-10-06 06:15:40', '2026-01-27 15:19:24'),
(2, '000002', 3, 0, 1, 0, 1, 0, 3, '2025-10-14 10:44:41', '2025-10-14 10:45:42', '2025-10-14 10:45:47', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9102066666667', '78.089406666667', '9.9101883333334', '78.089391666667', 'Ponmeni, Madurai, Tamil Nadu', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9102066666667', '78.089406666667', '9.9278523', '78.0906824', 99, 0, 2, 1, 1, 16.59, 0, 13.6, 0, 2.99, 0, 0, 4576, '0', 0, '', 0, 0, 'null', 1, '', NULL, 5, NULL, NULL, NULL, NULL, NULL, '2025-10-14 05:14:46', '2025-10-14 10:45:56'),
(3, '000003', 3, 0, 2, 0, 1, 2, 3, '2025-10-14 10:46:56', '2025-10-14 10:47:48', '2025-10-14 10:47:52', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.910185', '78.0894', '9.9081604147585', '78.088807667545', NULL, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.910185', '78.0894', '0', '0', 99, 0, 2, 1, 1, 12.2, 0, 10, 0, 2.2, 0, 0, 8984, '0', 0, '', 0, 0, 'null', 1, '', NULL, 5, NULL, NULL, NULL, NULL, NULL, '2025-10-14 05:17:01', '2025-10-14 10:48:02'),
(4, '000004', 3, 0, 1, 0, 1, 0, 3, '2025-10-14 15:15:36', '2025-10-14 15:16:29', '2025-10-14 15:29:09', 'Natham, Dindigul, Tamil Nadu, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9101683333333', '78.089401666667', '10.106915221641', '78.212799671987', 'Ponmeni East Street, Madurai, Tamil Nadu', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.910225', '78.0894', '9.9242945722431', '78.090679061646', 99, 0.01, 2, 1, 1, 65.03, 65.03, 53.3, 0, 11.73, 0, 0, 8789, '0', 0, '', 0, 0, 'null', 1, 'qqn{@syr{MI?', NULL, 5, NULL, NULL, NULL, NULL, NULL, '2025-10-14 09:45:41', '2025-10-14 15:29:17'),
(5, '000005', 3, 0, 1, 0, 1, 0, 3, '2025-10-14 15:51:05', '2025-10-14 15:54:11', '2025-10-14 15:54:16', 'SS Colony, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9101666666667', '78.089371666667', '9.9190391901639', '78.09004119997', 'Ponmeni, Madurai, Tamil Nadu', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9101666666667', '78.089371666667', '9.9278523', '78.0906824', 3, 0, 2, 1, 1, 13.88, 0, 11.38, 0, 2.5, 0, 0, 1299, '0', 0, '', 0, 0, 'null', 1, '', NULL, 5, NULL, NULL, NULL, NULL, NULL, '2025-10-14 10:23:36', '2025-10-14 15:54:24'),
(6, '000006', 1, 0, 1, 0, 1, 0, 1, '2025-10-17 15:14:52', '2025-10-17 15:15:40', '2025-10-17 15:15:44', 'SS Colony, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.910190054073', '78.089410371579', '9.9123520712251', '78.091811972638', 'Madurai, Madurai South, Madurai, Tamil Nadu, 625002, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.910190054073', '78.089410371579', '9.9349080610953', '78.11977498383', 3, 0.02, 1, 1, 1, 21.53, 21.53, 17.65, 0, 3.88, 0, 0, 7842, '0', 0, '', 0, 0, 'null', 1, 'uqn{@syr{MP?Q?', NULL, 5, NULL, NULL, NULL, NULL, NULL, '2025-10-17 09:45:00', '2025-10-17 15:15:53'),
(7, '000007', 1, 0, 1, 0, 1, 0, 1, '2025-10-22 11:41:27', '2025-10-22 11:43:07', '2025-10-22 11:43:12', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9103096025609', '78.089516809954', '9.9101923736469', '78.089272790695', 'Madurai, Madurai North, Madurai, Tamil Nadu, 625007, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9103096025609', '78.089516809954', '9.949531101934', '78.137652917789', 3, 0, 1, 1, 1, 26.67, 0, 21.86, 0, 4.81, 0, 0, 5055, '0', 0, '', 0, 0, 'null', 1, '', NULL, 5, NULL, NULL, NULL, NULL, NULL, '2025-10-22 06:12:22', '2025-10-22 11:43:22'),
(8, '000008', 1, 0, 1, 0, 1, 2, 1, '2025-10-22 14:44:12', '2025-10-22 14:48:08', '2025-10-22 14:53:00', 'Ellis Nagar, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', 'Ellis Nagar, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9101940728561', '78.089506683035', '9.9102123767693', '78.089952076756', 'Arappalayam Pradhna Salai, Arappalayam, Madurai, Madurai South, Madurai, Tamil Nadu, 625017, India', 'Ellis Nagar, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9101852928424', '78.08947279386', '9.9295994166994', '78.113519774417', 3, 1.09, 1, 1, 1, 19.43, 19.43, 15.93, 0, 3.5, 0, 0, 2253, '2', 0, '', 0, 0, 'null', 1, 'msn{@q{r{Me@}JAg@UUcAAmA@@cKAbKlAAbA@TT@f@d@|J', NULL, 5, NULL, NULL, NULL, NULL, NULL, '2025-10-22 09:14:23', '2025-10-22 14:54:43'),
(9, '000009', 6, 0, 1, 0, 1, 0, 2, '2025-10-22 10:29:16', NULL, NULL, 'Obio/Akpor, Rivers, Nigeria', NULL, NULL, NULL, '4.8719252332283', '7.0709941860517', 'Eleme, Rivers', NULL, '0', '0', '4.7506524', '7.1474252121699', 99, 18.72, 3, 3, 1, 403.58, 0, 330.8, 0, 72.78, 0, 0, 1991, '0', 0, '', 0, 0, 'null', 1, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, '2025-10-22 09:30:55', '2025-10-22 15:03:08'),
(10, '000010', 2, 0, 1, 0, 1, 0, 3, '2025-10-08 14:30:00', NULL, NULL, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', NULL, NULL, NULL, '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', NULL, '0', '0', '9.9349080610953', '78.11977498383', 3, 3.9, 2, 1, 0, 18.15, 0, 14.88, 0, 3.27, 0, 0, 3503, '0', 0, '', 0, 0, NULL, 0, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, '2025-10-17 12:35:45', '2025-10-22 15:55:02'),
(11, '000011', 14, 2, 1, 0, 1, 0, 3, '2025-10-22 14:30:00', NULL, NULL, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', NULL, NULL, NULL, '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', NULL, '0', '0', '9.9349080610953', '78.11977498383', 3, 3.9, 2, 1, 0, 18.15, 0, 14.88, 0, 3.27, 0, 0, 3154, '0', 0, '', 0, 0, NULL, 0, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, '2025-10-22 10:25:21', '2025-10-22 16:04:47'),
(12, '000012', 14, 2, 1, 0, 1, 0, 3, '2025-10-22 14:30:00', NULL, NULL, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', NULL, NULL, NULL, '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', NULL, '0', '0', '9.9349080610953', '78.11977498383', 3, 3.9, 2, 1, 0, 18.15, 0, 14.88, 0, 3.27, 0, 0, 5940, '0', 0, '', 0, 0, NULL, 0, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, '2025-10-22 10:34:59', '2025-10-22 16:55:16'),
(13, '000013', 20, 2, 1, 0, 1, 0, 3, '2025-10-22 13:04:45', NULL, NULL, 'Ponmeni, Madurai, Tamil Nadu', NULL, NULL, NULL, '9.9278523', '78.0906824', 'Palanganatham, Madurai, Tamil Nadu', NULL, '0', '0', '9.9040093', '78.0962583', 3, 0, 2, 1, 0, 12.2, 0, 10, 0, 2.2, 0, 0, 6353, '0', 0, '', 0, 0, NULL, 0, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, '2025-10-22 13:04:47', '2025-10-23 10:14:47'),
(14, '000014', 21, 2, 1, 0, 1, 0, 3, '2025-10-23 05:00:33', '2025-10-23 10:31:39', '2025-10-23 10:31:56', 'Ponmeni, Madurai, Tamil Nadu', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.91013', '78.089358333333', '9.9278523', '78.0906824', 'Palanganatham, Madurai, Tamil Nadu', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.91013', '78.089358333333', '9.9040093', '78.0962583', 3, 0, 2, 1, 0, 12.2, 0, 10, 0, 2.2, 0, 0, 8932, '0', 0, '', 0, 0, NULL, 0, '', NULL, 5, NULL, NULL, NULL, NULL, NULL, '2025-10-23 05:00:35', '2025-10-23 10:32:24'),
(15, '000015', 16, 2, 1, 0, 1, 0, 3, '2025-10-23 15:59:59', '2025-10-23 16:03:11', '2025-10-23 16:03:14', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9101216666667', '78.0893', '9.9103683333334', '78.089603333333', 'Ponmeni, Madurai, Tamil Nadu', 'Ellis Nagar, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9100533333333', '78.089361666667', '9.9278523', '78.0906824', 3, 0.01, 2, 1, 1, 16.48, 16.48, 13.51, 0, 2.97, 0, 0, 1967, '0', 0, '', 0, 0, '9750236', 1, 'aqn{@cyr{MAO', NULL, 5, NULL, NULL, NULL, NULL, NULL, '2025-10-23 10:31:39', '2025-10-23 16:03:22'),
(16, '000016', 16, 2, 1, 0, 1, 0, 3, '2025-10-23 16:09:54', NULL, NULL, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', NULL, NULL, NULL, '9.9103683333333', '78.089603333333', 'Ponmeni, Madurai, Tamil Nadu', NULL, '0', '0', '9.9278523', '78.0906824', 3, 2.81, 2, 1, 1, 16.48, 0, 13.51, 0, 2.97, 0, 0, 7580, '0', 0, '', 0, 0, '97502336', 1, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, '2025-10-23 10:40:13', '2025-10-23 16:10:46'),
(17, '000017', 16, 2, 1, 0, 1, 0, 3, '2025-10-23 16:10:59', NULL, NULL, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', NULL, NULL, NULL, '9.9103683333334', '78.089603333333', 'Ponmeni, Madurai, Tamil Nadu', NULL, '0', '0', '9.9278523', '78.0906824', 3, 2.81, 2, 1, 1, 16.48, 0, 13.51, 0, 2.97, 0, 0, 9284, '0', 0, '', 0, 0, '82685', 1, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, '2025-10-23 10:41:16', '2025-10-23 16:11:44'),
(18, '000018', 16, 2, 1, 0, 1, 0, 3, '2025-10-23 16:20:16', '2025-10-23 16:24:18', '2025-10-23 16:24:21', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9102416666667', '78.089373333333', '9.9103683333334', '78.089603333333', 'Ponmeni, Madurai, Tamil Nadu', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9102416666667', '78.089373333333', '9.9278523', '78.0906824', 3, 0, 2, 1, 1, 16.48, 0, 13.51, 0, 2.97, 0, 0, 7886, '0', 0, '', 0, 0, '685569', 1, '', NULL, 5, NULL, NULL, NULL, NULL, NULL, '2025-10-23 10:51:02', '2025-10-23 16:24:29'),
(19, '000019', 18, 0, 1, 0, 1, 0, 5, '2025-10-08 14:30:00', NULL, NULL, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', NULL, NULL, NULL, '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', NULL, '0', '0', '9.9349080610953', '78.11977498383', 3, 3.9, 5, 1, 0, 18.15, 0, 14.88, 0, 3.27, 0, 0, 6764, '0', 0, '', 0, 0, NULL, 0, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, '2025-10-24 04:36:12', '2025-10-24 10:07:18'),
(20, '000020', 17, 0, 1, 0, 1, 0, 5, '2025-10-08 14:30:00', NULL, NULL, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', NULL, NULL, NULL, '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', NULL, '0', '0', '9.9349080610953', '78.11977498383', 3, 3.9, 5, 1, 0, 18.15, 0, 14.88, 0, 3.27, 0, 0, 9700, '0', 0, '', 0, 0, NULL, 0, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, '2025-10-24 06:07:57', '2025-10-24 11:38:15'),
(21, '000021', 21, 0, 1, 0, 1, 0, 5, '2025-10-08 14:30:00', NULL, NULL, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', NULL, NULL, NULL, '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', NULL, '0', '0', '9.9349080610953', '78.11977498383', 3, 3.9, 5, 1, 0, 18.15, 0, 14.88, 0, 3.27, 0, 0, 9439, '0', 0, '', 0, 0, NULL, 0, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, '2025-10-24 11:05:53', '2025-10-24 16:36:42'),
(22, '000022', 22, 0, 1, 0, 1, 0, 5, '2025-10-08 14:30:00', NULL, NULL, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', NULL, NULL, NULL, '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', NULL, '0', '0', '9.9349080610953', '78.11977498383', 3, 3.9, 5, 1, 0, 18.15, 0, 14.88, 0, 3.27, 0, 0, 7224, '0', 0, '', 0, 0, NULL, 0, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, '2025-10-24 12:52:06', '2025-10-24 18:23:06'),
(23, '000023', 0, 1, 1, 0, 1, 0, 1, '2025-10-08 14:30:00', NULL, NULL, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', NULL, NULL, NULL, '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', NULL, '0', '0', '9.9349080610953', '78.11977498383', 3, 3.9, 1, 1, 0, 18.15, 0, 14.88, 0, 3.27, 0, 0, 7888, '0', 0, '', 0, 0, NULL, 0, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, '2025-10-24 13:00:09', '2025-10-25 23:43:59'),
(24, '000024', 0, 1, 1, 0, 1, 0, 1, '2025-10-08 14:30:00', NULL, NULL, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', NULL, NULL, NULL, '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', NULL, '0', '0', '9.9349080610953', '78.11977498383', 3, 3.9, 1, 1, 0, 18.15, 0, 14.88, 0, 3.27, 0, 0, 8073, '0', 0, '', 0, 0, NULL, 0, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, '2025-10-24 13:00:09', '2025-10-25 23:44:10'),
(25, '000025', 0, 2, 1, 0, 1, 0, 1, '2025-10-25 05:00:04', NULL, NULL, 'Theosophical Society, Payaniyar Viduthi Salai, Kalavasal, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', NULL, NULL, NULL, '9.9235292', '78.1022618', 'Ponmeni, Madurai, Tamil Nadu', NULL, '0', '0', '9.9278523', '78.0906824', 3, 2.18, 1, 1, 0, 15.53, 0, 12.73, 0, 2.8, 0, 0, 9408, '0', 0, '', 0, 0, NULL, 0, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, '2025-10-25 05:00:07', '2025-10-25 23:44:42'),
(26, '000026', 0, 5, 1, 0, 1, 0, 1, '2025-10-25 05:38:52', NULL, NULL, 'Theosophical Society, Payaniyar Viduthi Salai, Kalavasal, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', NULL, NULL, NULL, '9.9235292', '78.1022618', 'Madakulam Kanmai, Madurai, Tamil Nadu', NULL, '0', '0', '9.91781745', '78.075001393904', 3, 9.03, 1, 1, 0, 25.97, 0, 21.29, 0, 4.68, 0, 0, 9743, '0', 0, '', 0, 0, NULL, 0, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, '2025-10-25 05:38:54', '2025-10-25 23:45:31'),
(27, '000027', 0, 4, 1, 0, 1, 0, 1, '2025-10-08 14:30:00', NULL, NULL, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', NULL, NULL, NULL, '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', NULL, '0', '0', '9.9349080610953', '78.11977498383', 3, 3.9, 1, 1, 0, 18.15, 0, 14.88, 0, 3.27, 0, 0, 8445, '0', 0, '', 0, 0, NULL, 0, NULL, NULL, 7, 'Riya', '+918776378493', NULL, NULL, NULL, '2025-10-25 07:53:32', '2025-10-25 23:45:40'),
(28, '000028', 0, 2, 1, 0, 1, 0, 1, '2025-10-25 08:10:39', NULL, NULL, 'Periyar Bus Stand Public Toilet, Madurai, Tamil Nadu', NULL, NULL, NULL, '9.9159507', '78.111777', 'Madakulam Kanmai, Madurai, Tamil Nadu', NULL, '0', '0', '9.91781745', '78.075001393904', 3, 10.62, 1, 1, 0, 28.4, 0, 23.28, 0, 5.12, 0, 0, 4410, '0', 0, '', 0, 0, NULL, 0, NULL, NULL, 7, NULL, '+919487347343', NULL, NULL, NULL, '2025-10-25 08:10:42', '2025-10-25 23:45:48'),
(29, '000029', 0, 2, 1, 0, 1, 0, 1, '2025-10-25 12:12:46', NULL, NULL, 'Madakulam Kanmai, Madurai, Tamil Nadu', NULL, NULL, NULL, '9.91781745', '78.075001393904', 'Ponmeni, Madurai, Tamil Nadu', NULL, '0', '0', '9.9278523', '78.0906824', 3, 11.51, 1, 1, 0, 29.76, 0, 24.39, 0, 5.37, 0, 0, 9662, '0', 0, '', 0, 0, NULL, 0, NULL, NULL, 7, NULL, '+2349982382323', NULL, NULL, NULL, '2025-10-25 12:12:48', '2025-10-25 23:45:56'),
(30, '000030', 16, NULL, 1, 0, 1, 0, 5, '2025-10-25 18:40:47', '2025-10-25 18:47:28', '2025-10-25 18:47:32', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.91017', '78.089388333333', '9.9102183333333', '78.089403333333', 'Ponmeni, Madurai, Tamil Nadu', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.91017', '78.089388333333', '9.9278523', '78.0906824', 3, 0, 5, 1, 1, 16.58, 0, 13.59, 0, 2.99, 0, 0, 5564, '0', 0, '', 0, 0, 'null', 1, '', NULL, 5, NULL, NULL, NULL, NULL, NULL, '2025-10-25 13:11:19', '2025-10-25 18:47:51'),
(31, '000031', 1, NULL, 1, 0, 1, 0, 1, '2025-10-26 00:29:25', '2025-10-26 00:51:06', '2025-10-26 00:51:37', 'Tirumangalam, Thirumangalam, Madurai, Tamil Nadu, 626706, India', 'Tirumangalam, Thirumangalam, Madurai, Tamil Nadu, 626706, India', '9.8325414115985', '77.979712815186', '9.8323021533113', '77.979531694855', 'Thirupparankundram, Madurai, Madurai South, Madurai, Tamil Nadu, 625005, India', 'Tirumangalam, Thirumangalam, Madurai, Tamil Nadu, 626706, India', '9.8326377679933', '77.979659410573', '9.8867855093479', '78.039703419794', 3, 0.05, 1, 1, 1, 28.16, 28.16, 23.08, 0, 5.08, 0, 0, 8454, '0', 0, '', 0, 0, 'null', 1, 'sk_{@mk}zMOj@i@O', NULL, 5, NULL, NULL, NULL, NULL, NULL, '2025-10-25 19:04:24', '2025-10-26 00:51:45'),
(32, '000032', 0, 2, 1, 0, 1, 0, 6, '2025-10-27 04:50:45', NULL, NULL, 'Madakulam Kanmai, Madurai, Tamil Nadu', NULL, NULL, NULL, '9.91781745', '78.075001393904', 'Ponmeni, Madurai, Tamil Nadu', NULL, '0', '0', '9.9278523', '78.0906824', 3, 11.51, 6, 1, 0, 29.76, 0, 24.39, 0, 5.37, 0, 0, 8553, '0', 0, '', 0, 0, NULL, 0, NULL, NULL, 5, NULL, '+919872232323', NULL, NULL, NULL, '2025-10-27 04:50:48', '2025-10-27 10:34:04'),
(33, '000033', 24, NULL, 1, 0, 1, 0, 1, '2025-10-08 14:30:00', '2025-10-27 11:01:24', '2025-10-27 11:01:30', '107, KK Nagar, Madurai, Tamil Nadu 625020, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9102533333333', '78.089295', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9101766666667', '78.08935', '9.9349080610953', '78.11977498383', 3, 0.01, 1, 1, 0, 18.15, 18.15, 14.88, 0, 3.27, 0, 0, 3745, '0', 0, '', 0, 0, NULL, 0, 'aqn{@eyr{MAM?B', NULL, 5, NULL, NULL, NULL, NULL, NULL, '2025-10-27 05:29:35', '2025-10-27 11:01:47'),
(34, '000034', 26, NULL, 1, 0, 1, 0, 1, '2025-10-27 11:16:50', '2025-10-27 11:20:37', '2025-10-27 11:20:48', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9102383333333', '78.089366666667', '9.9102083333333', '78.089323333333', 'Ponmeni, Madurai, Tamil Nadu', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9102383333333', '78.089366666667', '9.9278523', '78.0906824', 3, 0, 1, 1, 1, 16.58, 0, 13.59, 0, 2.99, 0, 0, 7328, '0', 0, '', 0, 0, 'null', 1, '', NULL, 5, NULL, NULL, NULL, NULL, NULL, '2025-10-27 05:46:56', '2025-10-27 11:21:03'),
(35, '000035', 20, NULL, 1, 0, 1, 0, 1, '2025-10-27 11:46:59', '2025-10-27 11:47:55', '2025-10-27 11:47:59', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9102066666667', '78.08929', '9.910145', '78.089363333333', 'Ponmeni, Madurai, Tamil Nadu', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9102066666667', '78.08929', '9.9278523', '78.0906824', 3, 0, 1, 1, 1, 16.59, 0, 13.6, 0, 2.99, 0, 0, 4692, '0', 0, '', 0, 0, 'null', 1, '', NULL, 5, NULL, NULL, NULL, NULL, NULL, '2025-10-27 06:17:17', '2025-10-27 11:48:09'),
(36, '000036', 0, 6, 1, 0, 1, 0, 6, '2025-10-27 08:15:47', '2025-10-27 13:51:10', '2025-10-27 13:49:31', 'Madakulam Kanmai, Madurai, Tamil Nadu', 'Tirumangalam, Thirumangalam, Madurai, Tamil Nadu, 626706, India', '9.8325429', '77.9797135', '9.91781745', '78.075001393904', 'Ponmeni, Madurai, Tamil Nadu', 'Tirumangalam, Thirumangalam, Madurai, Tamil Nadu, 626706, India', '9.8325429', '77.9797135', '9.9278523', '78.0906824', 3, 0.12, 6, 1, 0, 29.76, 29.76, 24.39, 0, 5.37, 0, 0, 5532, '0', 0, '', 0, 0, NULL, 0, 'sk_{@mk}zMv@HNo@On@w@I', NULL, 5, NULL, '+919723623623', NULL, NULL, NULL, '2025-10-27 08:15:49', '2025-10-27 13:53:14'),
(37, '000037', 2, 0, 1, 0, 1, 0, 3, '2025-10-08 14:30:00', NULL, NULL, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', NULL, NULL, NULL, '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', NULL, '0', '0', '9.9349080610953', '78.11977498383', 3, 3.9, 2, 1, 0, 18.15, 0, 14.88, 0, 3.27, 0, 0, 5446, '0', 0, '', 0, 0, NULL, 0, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, '2025-10-23 13:49:26', '2025-10-27 13:57:16'),
(38, '000038', 0, 6, 1, 0, 1, 0, 3, '2025-10-27 08:27:52', NULL, NULL, 'S S Colony, SS Colony, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', NULL, NULL, NULL, '9.9225697', '78.0994099', 'Madakulam Kanmai, Madurai, Tamil Nadu', NULL, '0', '0', '9.91781745', '78.075001393904', 3, 9, 2, 1, 0, 25.93, 0, 21.25, 0, 4.68, 0, 0, 7614, '0', 0, '', 0, 0, NULL, 0, NULL, NULL, 5, NULL, '+917466462462', NULL, NULL, NULL, '2025-10-27 08:27:54', '2025-10-27 14:21:38'),
(39, '000039', 0, 6, 1, 0, 1, 0, 3, '2025-10-27 08:31:48', NULL, NULL, 'S S Colony, SS Colony, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', NULL, NULL, NULL, '9.9225697', '78.0994099', 'Madakulam Kanmai, Madurai, Tamil Nadu', NULL, '0', '0', '9.91781745', '78.075001393904', 3, 9, 2, 1, 0, 25.93, 0, 21.25, 0, 4.68, 0, 0, 5210, '0', 0, '', 0, 0, NULL, 0, NULL, NULL, 5, NULL, '+918613216251', NULL, NULL, NULL, '2025-10-27 08:31:50', '2025-10-27 16:18:08'),
(40, '000040', 16, NULL, 1, 0, 1, 0, 6, '2025-10-27 14:03:18', '2025-10-27 14:05:50', '2025-10-27 14:05:54', 'Tirumangalam, Thirumangalam, Madurai, Tamil Nadu, 626706, India', 'Tirumangalam, Thirumangalam, Madurai, Tamil Nadu, 626706, India', '9.8325429', '77.9797135', '9.8325429', '77.9797135', 'Harveypatti, Thirupparankundram, Madurai, Madurai South, Madurai, Tamil Nadu, 625005, India', 'Tirumangalam, Thirumangalam, Madurai, Tamil Nadu, 626706, India', '9.8325429', '77.9797135', '9.8536605382983', '78.04754366255', 3, 0.12, 6, 1, 1, 25.24, 25.24, 20.69, 0, 4.55, 0, 0, 4368, '0', 0, '', 0, 0, 'null', 1, 'sk_{@mk}zMv@HNo@On@w@I', NULL, 5, NULL, NULL, NULL, NULL, NULL, '2025-10-27 08:34:54', '2025-10-27 14:06:06'),
(41, '000041', 0, 6, 1, 0, 1, 0, 1, '2025-10-27 08:40:03', NULL, NULL, 'Madakulam Kanmai, Madurai, Tamil Nadu', NULL, NULL, NULL, '9.91781745', '78.075001393904', 'Ponmeni, Madurai, Tamil Nadu', NULL, '0', '0', '9.9278523', '78.0906824', 3, 11.51, 1, 1, 0, 29.76, 0, 24.39, 0, 5.37, 0, 0, 3952, '0', 0, '', 0, 0, NULL, 0, NULL, NULL, 5, NULL, '+916723232323', NULL, NULL, NULL, '2025-10-27 08:40:06', '2025-10-27 14:21:01'),
(42, '000042', 16, NULL, 1, 0, 1, 0, 6, '2025-10-27 14:06:18', NULL, NULL, 'Tirumangalam, Thirumangalam, Madurai, Tamil Nadu, 626706, India', NULL, NULL, NULL, '9.8325429', '77.9797135', 'Kappalur, Thirumangalam, Madurai, Tamil Nadu, 625706, India', NULL, '0', '0', '9.8415068407554', '78.009345068347', 3, 4.01, 6, 1, 1, 18.31, 0, 15.01, 0, 3.3, 0, 0, 7901, '0', 0, '', 0, 0, 'null', 1, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL, '2025-10-27 08:45:49', '2025-10-27 14:21:22'),
(43, '000043', 0, 1, 1, 0, 1, 0, 5, '2025-10-27 08:52:01', NULL, NULL, 'Madakulam Kanmai, Madurai, Tamil Nadu', NULL, NULL, NULL, '9.91781745', '78.075001393904', 'Ponmeni, Madurai, Tamil Nadu', NULL, '0', '0', '9.9278523', '78.0906824', 3, 11.51, 5, 1, 0, 29.76, 0, 24.39, 0, 5.37, 0, 0, 9022, '0', 0, '', 0, 0, NULL, 0, NULL, NULL, 5, NULL, '+919237232323', NULL, NULL, NULL, '2025-10-27 08:52:05', '2025-10-27 14:31:30'),
(44, '000044', 16, NULL, 1, 0, 1, 0, 6, '2025-10-27 14:25:18', '2025-10-27 14:27:26', '2025-10-27 14:27:31', 'Tirumangalam, Thirumangalam, Madurai, Tamil Nadu, 626706, India', 'Tirumangalam, Thirumangalam, Madurai, Tamil Nadu, 626706, India', '9.8325432843066', '77.979558628082', '9.8325429', '77.9797135', 'Thirupparankundram, Madurai, Madurai South, Madurai, Tamil Nadu, 625005, India', 'Tirumangalam, Thirumangalam, Madurai, Tamil Nadu, 626706, India', '9.8325432843066', '77.979558628082', '9.8534673791845', '78.042191810237', 3, 0.13, 6, 1, 1, 24.83, 24.83, 20.35, 0, 4.48, 0, 0, 4426, '0', 0, '', 0, 0, 'null', 1, 'wk_{@_k}zMBMv@HNo@On@w@ICL', NULL, 5, NULL, NULL, NULL, NULL, NULL, '2025-10-27 08:56:04', '2025-10-27 14:27:39'),
(45, '000045', 0, 1, 1, 0, 1, 0, 5, '2025-10-27 09:06:36', NULL, NULL, 'Madakulam Kanmai, Madurai, Tamil Nadu', NULL, NULL, NULL, '9.91781745', '78.075001393904', 'Ponmeni, Madurai, Tamil Nadu', NULL, '0', '0', '9.9278523', '78.0906824', 3, 11.51, 5, 1, 1, 29.76, 0, 24.39, 0, 5.37, 0, 0, 3060, '0', 0, '', 0, 0, NULL, 0, NULL, NULL, 5, 'Radhi', '+919121261212', NULL, NULL, NULL, '2025-10-27 09:06:38', '2025-10-27 14:38:21'),
(46, '000046', 0, 1, 1, 0, 1, 0, 3, '2025-10-27 09:05:00', NULL, NULL, 'Madakulam Kanmai, Madurai, Tamil Nadu', NULL, NULL, NULL, '9.91781745', '78.075001393904', 'Ponmeni, Madurai, Tamil Nadu', NULL, '0', '0', '9.9278523', '78.0906824', 3, 11.51, 2, 1, 1, 29.76, 0, 24.39, 0, 5.37, 0, 0, 2232, '0', 0, '', 0, 0, NULL, 0, NULL, NULL, 5, NULL, '+919121781721', NULL, NULL, NULL, '2025-10-27 09:05:02', '2025-10-27 14:38:31'),
(47, '000047', 16, NULL, 1, 0, 1, 0, 1, '2025-10-27 14:36:37', NULL, NULL, 'Tirumangalam, Thirumangalam, Madurai, Tamil Nadu, 626706, India', NULL, NULL, NULL, '9.8325429', '77.9797135', 'Thirupparankundram, Madurai, Madurai South, Madurai, Tamil Nadu, 625005, India', NULL, '0', '0', '9.8857284160211', '78.04009266874', 3, 10.38, 1, 1, 1, 28.04, 0, 22.98, 0, 5.06, 0, 0, 7925, '0', 0, '', 0, 0, 'null', 1, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL, '2025-10-27 09:07:59', '2025-10-27 14:39:25'),
(48, '000048', 16, NULL, 1, 0, 1, 0, 1, '2025-10-27 14:40:17', NULL, NULL, 'Tirumangalam, Thirumangalam, Madurai, Tamil Nadu, 626706, India', NULL, NULL, NULL, '9.8325429', '77.9797135', 'Kappalur, Thirumangalam, Madurai, Tamil Nadu, 625706, India', NULL, '0', '0', '9.8449119178257', '78.006413419461', 3, 4.59, 1, 1, 1, 19.2, 0, 15.74, 0, 3.46, 0, 0, 6496, '0', 0, '', 0, 0, 'null', 1, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL, '2025-10-27 09:11:07', '2025-10-27 14:42:39'),
(49, '000049', 20, NULL, 1, 0, 1, 0, 6, '2025-10-27 14:47:20', '2025-10-27 14:48:30', '2025-10-27 14:48:36', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.910228', '78.0893926', '9.9102216666667', '78.089358333333', 'Ponmeni, Madurai, Tamil Nadu', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.910228', '78.0893926', '9.9278523', '78.0906824', 3, 0, 6, 1, 1, 16.58, 0, 13.59, 0, 2.99, 0, 0, 3924, '0', 0, '', 0, 0, 'null', 1, '', NULL, 5, NULL, NULL, NULL, NULL, NULL, '2025-10-27 09:17:25', '2025-10-27 14:49:04'),
(50, '000050', 16, NULL, 1, 0, 1, 0, 1, '2025-10-27 14:47:38', '2025-10-27 15:01:34', '2025-10-27 15:01:38', 'Tirumangalam, Thirumangalam, Madurai, Tamil Nadu, 626706, India', 'Tirumangalam, Thirumangalam, Madurai, Tamil Nadu, 626706, India', '9.8324294616488', '77.979542475638', '9.8325429', '77.9797135', 'Tirumangalam, Thirumangalam, Madurai, Tamil Nadu, 626706, India', 'Tirumangalam, Thirumangalam, Madurai, Tamil Nadu, 626706, India', '9.8324294616488', '77.979542475638', '9.8385967946632', '77.997049617169', 3, 0.56, 1, 1, 1, 15.8, 15.8, 12.95, 0, 2.85, 0, 0, 6148, '0', 0, '', 0, 0, 'null', 1, 'uk_{@ck}zM@Iv@HNo@^gE_@fEOn@w@IOj@u@Ua@vA`@wAt@TLa@', NULL, 5, NULL, NULL, NULL, NULL, NULL, '2025-10-27 09:18:22', '2025-10-27 15:01:48'),
(51, '000051', 0, 1, 1, 0, 1, 0, 6, '2025-10-27 09:29:05', NULL, NULL, 'Madakulam Kanmai, Madurai, Tamil Nadu', NULL, NULL, NULL, '9.91781745', '78.075001393904', 'Ponmeni, Madurai, Tamil Nadu', NULL, '0', '0', '9.9278523', '78.0906824', 3, 11.51, 6, 1, 1, 29.76, 0, 24.39, 0, 5.37, 0, 0, 5739, '0', 0, '', 0, 0, NULL, 0, NULL, NULL, 5, NULL, '+919282182781', NULL, NULL, NULL, '2025-10-27 09:29:07', '2025-10-27 15:11:27'),
(52, '000052', 16, NULL, 1, 0, 1, 0, 1, '2025-10-27 15:01:59', '2025-10-27 15:05:38', '2025-10-27 15:05:56', 'Tirumangalam, Thirumangalam, Madurai, Tamil Nadu, 626706, India', 'Tirumangalam, Thirumangalam, Madurai, Tamil Nadu, 626706, India', '9.8324934257042', '77.979659763512', '9.8325429', '77.9797135', 'Kappalur, Thirumangalam, Madurai, Tamil Nadu, 625706, India', 'Tirumangalam, Thirumangalam, Madurai, Tamil Nadu, 626706, India', '9.8324934257042', '77.979659763512', '9.8450892077637', '77.998575031203', 3, 0.12, 1, 1, 1, 18.42, 18.42, 15.1, 0, 3.32, 0, 0, 8170, '0', 0, '', 0, 0, 'null', 1, 'sk_{@mk}zMv@HNo@On@w@I', NULL, 5, NULL, NULL, NULL, NULL, NULL, '2025-10-27 09:34:55', '2025-10-27 15:06:08'),
(53, '000053', 0, 6, 1, 0, 1, 0, 6, '2025-10-27 09:59:17', NULL, NULL, 'Madakulam Kanmai, Madurai, Tamil Nadu', NULL, NULL, NULL, '9.91781745', '78.075001393904', 'Ponmeni, Madurai, Tamil Nadu', NULL, '0', '0', '9.9278523', '78.0906824', 3, 11.51, 6, 1, 1, 29.76, 0, 24.39, 0, 5.37, 0, 0, 6024, '0', 0, '', 0, 0, NULL, 0, NULL, NULL, 5, NULL, '+919236235232', NULL, NULL, NULL, '2025-10-27 09:59:19', '2025-10-27 15:30:50'),
(54, '000054', 0, 6, 1, 0, 1, 0, 6, '2025-10-27 10:33:28', NULL, NULL, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625004, India', NULL, NULL, NULL, '9.9054508221098', '78.081340809444', 'Ponmeni, Madurai, Tamil Nadu', NULL, '0', '0', '9.9278523', '78.0906824', 3, 4.54, 6, 1, 1, 19.13, 0, 15.68, 0, 3.45, 0, 0, 7663, '0', 0, '', 0, 0, NULL, 0, NULL, NULL, 5, NULL, '+918273263263', NULL, NULL, NULL, '2025-10-27 10:33:31', '2025-10-27 16:05:36'),
(55, '000055', 0, 6, 1, 0, 1, 0, 7, '2025-10-27 10:55:34', '2025-10-27 16:26:09', '2025-10-27 16:26:14', 'Madakulam Kanmai, Madurai, Tamil Nadu', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9101516666667', '78.089363333333', '9.91781745', '78.075001393904', 'Ponmeni, Madurai, Tamil Nadu', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9101516666667', '78.089363333333', '9.9278523', '78.0906824', 3, 0, 7, 1, 1, 29.76, 0, 24.39, 0, 5.37, 0, 0, 3200, '0', 0, '', 0, 0, NULL, 0, '', NULL, 5, NULL, '+918132326323', NULL, NULL, NULL, '2025-10-27 10:55:36', '2025-10-27 16:26:22'),
(56, '000056', 28, NULL, 1, 0, 1, 0, 7, '2025-10-27 17:18:18', '2025-10-27 17:19:38', '2025-10-27 17:19:42', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9101783333333', '78.089431666667', '9.9098338194121', '78.089791324915', 'Ponmeni, Madurai, Tamil Nadu', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9101783333333', '78.089431666667', '9.9278523', '78.0906824', 3, 0, 7, 1, 1, 16.57, 0, 13.58, 0, 2.99, 0, 0, 3501, '0', 0, '', 0, 0, 'null', 1, '', NULL, 5, NULL, NULL, NULL, NULL, NULL, '2025-10-27 11:48:32', '2025-10-27 17:19:51'),
(57, '000057', 28, NULL, 1, 0, 1, 0, 7, '2025-10-27 17:28:51', '2025-10-27 17:29:40', '2025-10-27 17:29:44', 'Ellis Nagar, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9101183333333', '78.089371666667', '9.9101633333334', '78.089516666667', 'Ponmeni, Madurai, Tamil Nadu', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9101183333333', '78.089371666667', '9.9278523', '78.0906824', 3, 0, 7, 1, 1, 16.59, 0, 13.6, 0, 2.99, 0, 0, 2683, '0', 0, '', 0, 0, 'null', 1, '', NULL, 5, NULL, NULL, NULL, NULL, NULL, '2025-10-27 11:58:59', '2025-10-27 17:32:00'),
(58, '000058', 0, 5, 1, 0, 1, 0, 7, '2025-10-27 12:02:48', '2025-10-27 17:33:35', '2025-10-27 17:33:39', 'Vadipatti, Tamil Nadu', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9102', '78.08936', '10.0790057', '78.03600140899', 'Madurai, Tamil Nadu', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9102', '78.08936', '9.833333', '77.833333', 3, 0, 7, 1, 0, 12.2, 0, 10, 0, 2.2, 0, 0, 1828, '0', 0, '', 0, 0, NULL, 0, '', NULL, 5, 'varshini', '+918220638053', NULL, NULL, NULL, '2025-10-27 12:02:51', '2025-10-27 17:34:45'),
(59, '000059', 0, 6, 1, 0, 1, 0, 7, '2025-10-27 12:27:58', '2025-10-27 17:58:39', '2025-10-27 17:58:50', 'Madakulam Kanmai, Madurai, Tamil Nadu', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9102266666667', '78.089365', '9.91781745', '78.075001393904', 'Ponmeni, Madurai, Tamil Nadu', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9102266666667', '78.089365', '9.9278523', '78.0906824', 3, 0, 7, 1, 1, 29.76, 0, 24.39, 0, 5.37, 0, 0, 2189, '0', 0, '', 0, 0, NULL, 0, '', NULL, 5, NULL, '+918372372362', NULL, NULL, NULL, '2025-10-27 12:28:01', '2025-10-27 17:58:58'),
(60, '000060', 0, 7, 1, 0, 1, 0, 1, '2025-10-28 05:23:59', '2025-10-28 10:54:36', '2025-10-28 10:54:40', 'Madakulam Kanmai, Madurai, Tamil Nadu', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9102233333333', '78.089336666667', '9.91781745', '78.075001393904', 'Ponmeni, Madurai, Tamil Nadu', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9102233333333', '78.089336666667', '9.9278523', '78.0906824', 3, 0, 1, 1, 1, 29.76, 0, 24.39, 0, 5.37, 0, 0, 3109, '0', 0, '', 0, 0, NULL, 0, '', NULL, 5, NULL, NULL, NULL, NULL, NULL, '2025-10-28 05:24:01', '2025-10-28 10:54:52'),
(61, '000061', 30, NULL, 1, 0, 1, 0, 1, '2025-10-28 10:58:12', '2025-10-28 10:59:01', '2025-10-28 10:59:05', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9102283333333', '78.089383333333', '9.9102283333333', '78.089383333333', 'Ponmeni, Madurai, Tamil Nadu', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9102283333333', '78.089383333333', '9.9278523', '78.0906824', 3, 0, 1, 1, 1, 16.58, 0, 13.59, 0, 2.99, 0, 0, 1854, '0', 0, '', 0, 0, 'null', 1, '', NULL, 5, NULL, NULL, NULL, NULL, NULL, '2025-10-28 05:28:28', '2025-10-28 11:00:21'),
(62, '000062', 0, 7, 1, 0, 1, 0, 1, '2025-10-28 05:47:52', '2025-10-28 11:18:34', '2025-10-28 11:18:38', 'Madakulam Kanmai, Madurai, Tamil Nadu', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9102466666667', '78.089415', '9.91781745', '78.075001393904', 'Ponmeni, Madurai, Tamil Nadu', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9102466666667', '78.089415', '9.9278523', '78.0906824', 3, 0, 1, 1, 1, 29.76, 0, 24.39, 0, 5.37, 0, 0, 6032, '0', 0, '', 0, 0, NULL, 0, '', NULL, 5, NULL, '+915216526121', NULL, NULL, NULL, '2025-10-28 05:47:54', '2025-10-28 11:18:51'),
(63, '000063', 0, 7, 1, 0, 1, 0, 1, '2025-10-28 06:07:25', '2025-10-28 11:37:55', '2025-10-28 11:37:59', 'Madakulam Kanmai, Madurai, Tamil Nadu', 'Ellis Nagar, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9101083333333', '78.089433333333', '9.91781745', '78.075001393904', 'Palanganatham, Madurai, Tamil Nadu', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9101783333333', '78.089375', '9.9040093', '78.0962583', 3, 0.01, 1, 1, 1, 29.26, 29.26, 23.98, 0, 5.28, 0, 0, 2224, '0', 0, '', 0, 0, NULL, 0, 'eqn{@syr{M@?O?', NULL, 5, NULL, '+919236262732', NULL, NULL, NULL, '2025-10-28 06:07:29', '2025-10-28 11:38:07'),
(64, '000064', 0, 7, 1, 0, 1, 0, 1, '2025-10-28 06:19:05', '2025-10-28 11:49:44', '2025-10-28 11:49:50', 'Railway Colony, SS Colony, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.91016', '78.089391666667', '9.9242006', '78.1072523', 'Ponmeni, Madurai, Tamil Nadu', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.91016', '78.089391666667', '9.9278523', '78.0906824', 3, 0, 1, 1, 1, 17.06, 0, 13.98, 0, 3.08, 0, 0, 4482, '0', 0, '', 0, 0, NULL, 0, '', NULL, 5, NULL, '+919525325323', NULL, NULL, NULL, '2025-10-28 06:19:09', '2025-10-28 11:49:58'),
(65, '000065', 0, 7, 1, 0, 1, 0, 1, '2025-10-28 06:51:28', '2025-10-28 12:21:57', '2025-10-28 12:22:01', 'Railway Colony, SS Colony, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9101916666667', '78.089435', '9.9242006', '78.1072523', 'Ponmeni, Madurai, Tamil Nadu', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9101916666667', '78.089435', '9.9278523', '78.0906824', 3, 0, 1, 1, 1, 17.06, 0, 13.98, 0, 3.08, 0, 0, 5974, '0', 0, '', 0, 0, NULL, 0, '', NULL, 5, NULL, '+918798236263', NULL, NULL, NULL, '2025-10-28 06:51:30', '2025-10-28 12:22:11'),
(66, '000066', 0, 7, 1, 0, 1, 0, 1, '2025-10-28 07:19:20', '2025-10-28 12:49:49', '2025-10-28 12:49:53', 'Vilachery Main Road, Vilachery, Thirupparankundram, Madurai, Madurai South, Madurai, Tamil Nadu, 625005, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.91019', '78.08942', '9.8979726', '78.0666083', 'Ponmeni, Madurai, Tamil Nadu', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.91019', '78.08942', '9.9278523', '78.0906824', 3, 0, 1, 1, 1, 20.19, 0, 16.55, 0, 3.64, 0, 0, 8062, '0', 0, '', 0, 0, NULL, 0, '', NULL, 5, NULL, '+91844322561', NULL, NULL, NULL, '2025-10-28 07:19:22', '2025-10-28 12:50:00'),
(67, '000067', 30, NULL, 1, 0, 1, 0, 1, '2025-10-28 12:51:05', '2025-10-28 12:52:10', '2025-10-28 12:52:15', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9100133333333', '78.089301666667', '9.9102154', '78.0893897', 'Ponmeni, Madurai, Tamil Nadu', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9101083333333', '78.089361666667', '9.9278523', '78.0906824', 3, 0.01, 1, 1, 1, 16.58, 16.58, 13.59, 0, 2.99, 0, 0, 3544, '0', 0, '', 0, 0, 'null', 1, 'aqn{@ayr{MAQ?B', NULL, 5, NULL, NULL, NULL, NULL, NULL, '2025-10-28 07:21:23', '2025-10-28 12:52:26'),
(68, '000068', 0, 7, 1, 0, 1, 0, 9, '2025-10-28 07:43:44', '2025-10-28 13:14:13', '2025-10-28 13:14:17', 'Madakulam Kanmai, Madurai, Tamil Nadu', 'Ellis Nagar, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9101533333333', '78.089456666667', '9.91781745', '78.075001393904', 'Ponmeni, Madurai, Tamil Nadu', 'Ellis Nagar, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9101533333333', '78.089456666667', '9.9278523', '78.0906824', 3, 0, 9, 1, 1, 29.76, 0, 24.39, 0, 5.37, 0, 0, 4704, '0', 0, '', 0, 0, NULL, 0, '', NULL, 5, NULL, '+918523232323', NULL, NULL, NULL, '2025-10-28 07:43:46', '2025-10-28 13:14:25'),
(69, '000069', 0, 7, 1, 0, 1, 0, 9, '2025-10-28 08:55:12', '2025-10-28 14:25:42', '2025-10-28 14:25:46', 'Madakulam Kanmai, Madurai, Tamil Nadu', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9101966666667', '78.089393333333', '9.91781745', '78.075001393904', 'Ponmeni, Madurai, Tamil Nadu', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9101966666667', '78.089393333333', '9.9278523', '78.0906824', 3, 0, 9, 1, 1, 29.76, 0, 24.39, 0, 5.37, 0, 0, 4975, '0', 0, '', 0, 0, NULL, 0, '', NULL, 5, NULL, '+919223435353', NULL, NULL, NULL, '2025-10-28 08:55:14', '2025-10-28 14:25:53'),
(70, '000070', 0, 7, 1, 0, 1, 0, 9, '2025-10-28 08:56:36', '2025-10-28 14:27:02', '2025-10-28 14:27:06', 'Madakulam Kanmai, Madurai, Tamil Nadu', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.910165', '78.089398333333', '9.91781745', '78.075001393904', 'Palanganatham, Madurai, Tamil Nadu', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.910165', '78.089398333333', '9.9040093', '78.0962583', 3, 0, 9, 1, 1, 29.26, 0, 23.98, 0, 5.28, 0, 0, 6993, '0', 0, '', 0, 0, NULL, 0, '', NULL, 5, NULL, '+918452532323', NULL, NULL, NULL, '2025-10-28 08:56:39', '2025-10-28 14:27:14'),
(71, '000071', 0, 8, 1, 0, 1, 0, 10, '2025-11-03 07:36:22', '2025-11-03 13:07:43', '2025-11-03 13:07:52', 'Madakulam Kanmai, Madurai, Tamil Nadu', 'Ellis Nagar, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9101633333333', '78.089475', '9.91781745', '78.075001393904', 'Ponmeni, Madurai, Tamil Nadu', 'Ellis Nagar, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9101633333333', '78.089475', '9.9278523', '78.0906824', 3, 0, 10, 1, 1, 29.76, 0, 24.39, 0, 5.37, 0, 0, 3463, '0', 0, '', 0, 0, NULL, 0, '', NULL, 5, NULL, '+2349898877878', NULL, NULL, NULL, '2025-11-03 07:36:25', '2025-11-03 13:08:01'),
(72, '000072', 31, NULL, 1, 0, 1, 0, 10, '2025-11-03 13:21:16', '2025-11-03 13:39:54', '2025-11-03 13:39:59', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9102133333333', '78.089393333333', '9.9102162', '78.0893865', 'Ponmeni, Madurai, Tamil Nadu', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9102133333333', '78.089393333333', '9.9278523', '78.0906824', 3, 0, 10, 1, 1, 16.58, 0, 13.59, 0, 2.99, 0, 0, 7997, '0', 0, '', 0, 0, 'null', 1, '', NULL, 5, NULL, NULL, NULL, NULL, NULL, '2025-11-03 07:51:53', '2025-11-03 13:40:09'),
(73, '000073', 0, 7, 1, 0, 1, 0, 1, '2025-12-05 09:18:04', '2025-12-05 14:48:36', '2025-12-05 14:48:40', 'S S Colony, SS Colony, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.91018', '78.089401666667', '9.9225697', '78.0994099', 'Ponmeni, Madurai, Tamil Nadu', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.91018', '78.089401666667', '9.9278523', '78.0906824', 3, 0, 1, 1, 1, 14.4, 0, 11.8, 0, 2.6, 0, 0, 9141, '0', 0, '', 0, 0, NULL, 0, '', NULL, 5, 'Yamuna', '+918277238728', NULL, NULL, NULL, '2025-12-05 09:18:07', '2025-12-05 14:48:49'),
(74, '000074', 32, NULL, 1, 0, 1, 0, 11, '2025-12-08 10:05:44', '2025-12-08 10:10:22', '2025-12-08 10:15:18', 'Thogoto, Karai ward, Kikuyu, Kiambu, Central Kenya, 00109, Kenya', 'Muguga, Mai A Ihii, Kikuyu, Kiambu, Central Kenya, 00109, Kenya', '-1.2583471', '36.6603757', '-1.2505107938088', '36.659439671133', 'Ruaka, Kiambu', 'Muguga, Mai A Ihii, Kikuyu, Kiambu, Central Kenya, 00109, Kenya', '-1.2583471', '36.6603757', '-1.205646', '36.7844571', 99, 0.2, 11, 2, 1, 309.39, 309.39, 253.6, 0, 55.79, 0, 0, 7881, '0', 0, '', 0, 0, 'null', 1, '~wtFcfw~EGLi@pAe@x@d@y@h@qAFM', NULL, 5, NULL, NULL, NULL, NULL, NULL, '2025-12-08 04:38:50', '2025-12-08 10:15:31'),
(75, '000075', 32, NULL, 1, 0, 1, 0, 11, '2025-12-08 10:37:07', '2025-12-08 10:41:47', '2025-12-08 10:48:49', 'Wairere Apartments, Southern Bypass, Muguga, Mai A Ihii, Kikuyu, Kiambu, Central Kenya, 00109, Kenya', 'Wairere Apartments, Southern Bypass, Muguga, Mai A Ihii, Kikuyu, Kiambu, Central Kenya, 00109, Kenya', '-1.2582712', '36.6602663', '-1.2582712', '36.6602663', 'Nairobi', 'Wairere Apartments, Southern Bypass, Muguga, Mai A Ihii, Kikuyu, Kiambu, Central Kenya, 00109, Kenya', '-1.2582712', '36.6602663', '-1.2832533', '36.8172449', 99, 0.17, 11, 2, 1, 337.21, 337.21, 276.4, 0, 60.81, 0, 0, 8735, '0', 0, '', 0, 0, 'null', 1, 'rwtFmew~Ee@hAe@x@d@y@d@iA', NULL, 5, NULL, NULL, NULL, NULL, NULL, '2025-12-08 05:08:16', '2025-12-08 10:49:20'),
(76, '000076', 1, NULL, 1, 0, 1, 0, 1, '2025-12-15 12:35:01', '2025-12-15 12:44:31', '2025-12-15 12:44:36', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9107599793573', '78.090340103208', '9.9102214', '78.0893963', 'Railway Colony, SS Colony, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9102794496619', '78.089257594186', '9.923722922681', '78.103958470396', 3, 0.13, 1, 1, 1, 18, 18, 14.75, 0, 3.25, 0, 0, 8319, '0', 0, '', 0, 0, 'null', 1, '{un{@e~r{MlArAu@Fb@t@', NULL, 5, NULL, NULL, NULL, NULL, NULL, '2025-12-15 07:05:50', '2025-12-15 12:44:45'),
(77, '000077', 1, NULL, 1, 0, 1, 2, 1, '2025-12-15 13:18:16', '2025-12-15 13:20:26', '2025-12-15 13:20:31', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9102696813522', '78.08941747839', '9.9102214', '78.0893963', 'Meenakshi Bazaar Road, Arappalayam, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9102696813522', '78.08941747839', '9.9244415379512', '78.113166778029', 3, 0.02, 1, 1, 1, 18.54, 18.54, 15.2, 0, 3.34, 0, 0, 5020, '0', 0, '', 0, 0, 'null', 1, 'ern{@syr{M`@?', NULL, 5, NULL, NULL, NULL, NULL, NULL, '2025-12-15 07:48:36', '2025-12-15 13:20:40'),
(78, '000078', 33, NULL, 1, 0, 1, 0, 12, '2025-12-16 17:36:00', NULL, NULL, 'Nairobi South ward, Starehe, Nairobi, 00507, Kenya', NULL, NULL, NULL, '-1.3203398541829', '36.856021094301', 'Ruaka, Kiambu', NULL, '0', '0', '-1.205646', '36.7844571', 99, 20.71, 12, 1, 1, 43.79, 0, 35.89, 0, 7.9, 0, 0, 6524, '0', 0, '', 0, 0, 'null', 1, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, '2025-12-16 13:37:35', '2025-12-16 19:11:57'),
(79, '000079', 33, NULL, 1, 0, 1, 0, 12, '2025-12-17 16:39:00', NULL, NULL, 'Nairobi South ward, Starehe, Nairobi, 00507, Kenya', NULL, NULL, NULL, '-1.3206913851218', '36.855272647606', 'Ruaka, Kiambu', NULL, '0', '0', '-1.205646', '36.7844571', 99, 20.68, 12, 1, 1, 43.74, 0, 35.85, 0, 7.89, 0, 0, 4689, '0', 0, '', 0, 0, 'null', 1, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, '2025-12-16 13:39:23', '2025-12-16 19:13:04'),
(80, '000080', 33, NULL, 1, 0, 1, 0, 12, '2025-12-16 19:10:31', NULL, NULL, 'Nairobi South ward, Starehe, Nairobi, 00507, Kenya', NULL, NULL, NULL, '-1.3206716666667', '36.855328333333', 'Ruaka, Kiambu', NULL, '0', '0', '-1.205646', '36.7844571', 99, 20.68, 12, 1, 1, 43.74, 0, 35.85, 0, 7.89, 0, 0, 9393, '0', 0, '', 0, 0, 'null', 1, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, '2025-12-16 13:41:12', '2025-12-16 19:14:16'),
(81, '000081', 33, NULL, 1, 0, 1, 0, 12, '2025-12-17 16:46:00', NULL, NULL, 'Nairobi South ward, Starehe, Nairobi, 00507, Kenya', NULL, NULL, NULL, '-1.3207878', '36.8552412', 'Ruaka, Kiambu', NULL, '0', '0', '-1.205646', '36.7844571', 99, 20.65, 12, 1, 1, 43.69, 0, 35.81, 0, 7.88, 0, 0, 1787, '0', 0, '', 0, 0, 'null', 1, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, '2025-12-16 13:47:16', '2025-12-16 19:19:57'),
(82, '000082', 33, NULL, 1, 0, 1, 0, 12, '2025-12-16 16:50:23', '2025-12-16 19:25:03', '2025-12-16 19:26:45', 'Nairobi South ward, Starehe, Nairobi, 00507, Kenya', 'Nairobi South ward, Starehe, Nairobi, 00507, Kenya', '-1.320785', '36.855258333333', '-1.3190366303203', '36.855035198892', 'Ruaka, Kiambu', 'Nairobi South ward, Starehe, Nairobi, 00507, Kenya', '-1.32071', '36.855175', '-1.205646', '36.7844571', 99, 0.03, 12, 1, 1, 43.22, 43.22, 35.43, 0, 7.79, 0, 0, 7784, '0', 0, '', 0, 0, 'null', 1, 'l}`Gif}_FVBBU', NULL, 5, NULL, NULL, NULL, NULL, NULL, '2025-12-16 13:53:27', '2025-12-16 19:53:40'),
(83, '000083', 33, NULL, 1, 0, 1, 0, 12, '2025-12-18 08:40:00', NULL, NULL, 'Nairobi South ward, Starehe, Nairobi, 00507, Kenya', NULL, NULL, NULL, '-1.3207367', '36.8552375', 'Ruaka, Kiambu', NULL, '0', '0', '-1.205646', '36.7844571', 99, 20.68, 12, 1, 1, 43.74, 0, 35.85, 0, 7.89, 0, 0, 8492, '0', 0, '', 0, 0, 'null', 1, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, '2025-12-17 05:40:47', '2025-12-17 13:42:56'),
(84, '000084', 33, NULL, 1, 0, 1, 0, 12, '2025-12-17 13:48:06', '2025-12-17 13:50:10', '2025-12-17 13:56:41', 'Ndenderu, Ndenderu ward, Kiambaa, Kiambu, Central Kenya, 43563, Kenya', 'Ndenderu, Ndenderu ward, Kiambaa, Kiambu, Central Kenya, 43563, Kenya', '-1.196355', '36.75668', '-1.1989122265176', '36.755140321257', 'Banana, Banana, Kiambu', 'Ndenderu, Ndenderu ward, Kiambaa, Kiambu, Central Kenya, 43563, Kenya', '-1.196195', '36.756918333333', '-1.1736827', '36.7575458', 99, 0.02, 12, 1, 1, 18.67, 18.67, 15.3, 0, 3.37, 0, 0, 9424, '2', 0, '', 0, 0, 'null', 1, '~thFc`j_FFg@', NULL, 5, NULL, NULL, NULL, NULL, NULL, '2025-12-17 08:18:38', '2025-12-17 14:02:44');
INSERT INTO `trips` (`id`, `trip_id`, `customer_id`, `corporate_customer_id`, `trip_type`, `trip_sub_type`, `booking_type`, `package_id`, `driver_id`, `pickup_date`, `start_time`, `end_time`, `pickup_address`, `actual_pickup_address`, `actual_pickup_lat`, `actual_pickup_lng`, `pickup_lat`, `pickup_lng`, `drop_address`, `actual_drop_address`, `actual_drop_lat`, `actual_drop_lng`, `drop_lat`, `drop_lng`, `zone`, `distance`, `vehicle_id`, `vehicle_type`, `payment_method`, `total`, `collection_amount`, `sub_total`, `discount`, `tax`, `promo_code`, `tip`, `otp`, `ratings`, `customer_rating`, `static_map`, `is_multiple_drops`, `is_subscription_trip`, `contact`, `surge`, `polyline`, `waypoints`, `status`, `agent_name`, `agent_phone_number`, `driver_note`, `customer_note`, `company_name`, `created_at`, `updated_at`) VALUES
(85, '000085', 33, NULL, 1, 0, 1, 0, 12, '2025-12-17 15:19:04', NULL, NULL, 'Ndenderu, Ndenderu ward, Kiambaa, Kiambu, Central Kenya, 43563, Kenya', NULL, NULL, NULL, '-1.1978729', '36.7554183', 'Banana Stop, Sagana, Kirinyaga', NULL, '0', '0', '-0.6191688', '37.2019802', 99, 106.47, 12, 1, 1, 174.57, 0, 143.09, 0, 31.48, 0, 0, 9167, '0', 0, '', 0, 0, 'null', 1, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, '2025-12-17 09:49:54', '2025-12-17 15:21:22'),
(86, '000086', 33, NULL, 1, 0, 1, 0, 12, '2025-12-17 15:19:04', NULL, NULL, 'Ndenderu, Ndenderu ward, Kiambaa, Kiambu, Central Kenya, 43563, Kenya', NULL, NULL, NULL, '-1.1978729', '36.7554183', 'Banana Stop, Sagana, Kirinyaga', NULL, '0', '0', '-0.6191688', '37.2019802', 99, 106.47, 12, 1, 1, 174.57, 0, 143.09, 0, 31.48, 0, 0, 5484, '0', 0, '', 0, 0, 'null', 1, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, '2025-12-17 09:52:43', '2025-12-17 15:24:52'),
(87, '000087', 33, NULL, 1, 0, 1, 0, 12, '2025-12-18 12:55:00', '2025-12-17 15:27:54', '2025-12-17 15:28:10', 'Ndenderu, Ndenderu ward, Kiambaa, Kiambu, Central Kenya, 43563, Kenya', 'Ndenderu, Ndenderu ward, Kiambaa, Kiambu, Central Kenya, 43563, Kenya', '-1.197795', '36.75547', '-1.1977747255125', '36.75545635342', 'Banana Stop, Sagana, Kirinyaga', 'Ndenderu, Ndenderu ward, Kiambaa, Kiambu, Central Kenya, 43563, Kenya', '-1.19764', '36.755535', '-0.6191688', '37.2019802', 99, 0.06, 12, 1, 1, 174.57, 174.57, 143.09, 0, 31.48, 0, 0, 9162, '0', 0, '', 0, 0, 'null', 1, 'z}hFuyi_FJFs@dA', NULL, 5, NULL, NULL, NULL, NULL, NULL, '2025-12-17 09:56:02', '2025-12-17 15:28:23'),
(88, '000088', 33, NULL, 1, 0, 1, 0, 12, '2025-12-17 15:48:16', '2025-12-17 15:49:38', '2025-12-17 15:49:59', 'Ndenderu, Ndenderu ward, Kiambaa, Kiambu, Central Kenya, 43563, Kenya', 'Ndenderu, Ndenderu ward, Kiambaa, Kiambu, Central Kenya, 43563, Kenya', '-1.1977716666667', '36.755598333333', '-1.1978705', '36.7554188', 'Shell Banana Bus stop, Muchatha ward, Kiambu', 'Ndenderu, Ndenderu ward, Kiambaa, Kiambu, Central Kenya, 43563, Kenya', '-1.197775', '36.755493333333', '-1.1758139', '36.7595065', 99, 0.01, 12, 1, 1, 18.76, 18.76, 15.38, 0, 3.38, 0, 0, 2601, '0', 0, '', 0, 0, 'null', 1, 'f~hFmyi_FQK', NULL, 5, NULL, NULL, NULL, NULL, NULL, '2025-12-17 10:18:46', '2025-12-17 15:50:12'),
(89, '000089', 33, NULL, 1, 0, 1, 0, 12, '2025-12-17 17:19:22', '2025-12-17 17:21:32', '2025-12-17 17:24:11', 'Ndenderu, Ndenderu ward, Kiambaa, Kiambu, Central Kenya, 43563, Kenya', 'Ndenderu, Ndenderu ward, Kiambaa, Kiambu, Central Kenya, 43563, Kenya', '-1.1977716666667', '36.755518333333', '-1.1978749', '36.7554109', 'Banana Stop, Sagana, Kirinyaga', 'Ndenderu, Ndenderu ward, Kiambaa, Kiambu, Central Kenya, 43563, Kenya', '-1.19784', '36.755503333333', '-0.6191688', '37.2019802', 99, 0.01, 12, 1, 1, 174.57, 174.57, 143.09, 0, 31.48, 0, 0, 2416, '0', 0, '', 0, 0, 'null', 1, 'r}hF{yi_FHF', NULL, 5, NULL, NULL, NULL, NULL, NULL, '2025-12-17 11:50:26', '2025-12-17 17:24:24'),
(90, '000090', 33, NULL, 1, 0, 1, 0, 12, '2025-12-17 17:25:10', NULL, NULL, 'Ndenderu, Ndenderu ward, Kiambaa, Kiambu, Central Kenya, 43563, Kenya', NULL, NULL, NULL, '-1.197871', '36.7554179', 'Banana Terminus, Banana, Kiambu', NULL, '0', '0', '-1.173875', '36.758608', 99, 4.18, 12, 1, 1, 18.58, 0, 15.23, 0, 3.35, 0, 0, 6586, '0', 0, '', 0, 0, 'null', 1, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, '2025-12-17 11:55:39', '2025-12-17 17:29:17'),
(91, '000091', 33, NULL, 1, 0, 1, 0, 12, '2025-12-17 17:29:32', '2025-12-17 17:30:58', '2025-12-17 17:31:11', 'Kimachia Road, Rwenu, Karura Kanyungu, Ndenderu ward, Kiambaa, Kiambu, Central Kenya, 23083, Kenya', 'Ndenderu, Ndenderu ward, Kiambaa, Kiambu, Central Kenya, 43563, Kenya', '-1.1978583333333', '36.755438333333', '-1.193775660017', '36.737756012887', 'Baobab Banks, Nairobi, Nairobi', 'Ndenderu, Ndenderu ward, Kiambaa, Kiambu, Central Kenya, 43563, Kenya', '-1.1978583333333', '36.755438333333', '-1.2199400625544', '36.831194611111', 99, 0, 12, 1, 1, 31.22, 0, 25.59, 0, 5.63, 0, 0, 8228, '0', 0, '', 0, 0, 'null', 1, '', NULL, 5, NULL, NULL, NULL, NULL, NULL, '2025-12-17 11:59:55', '2025-12-17 17:31:24'),
(92, '000092', 33, NULL, 1, 0, 1, 0, 12, '2025-12-17 17:32:05', '2025-12-17 17:33:31', '2025-12-17 17:33:39', 'Ndenderu, Ndenderu ward, Kiambaa, Kiambu, Central Kenya, 43563, Kenya', 'Ndenderu, Ndenderu ward, Kiambaa, Kiambu, Central Kenya, 43563, Kenya', '-1.1978466666667', '36.755456666667', '-1.1977916666667', '36.755476666667', 'Baobab Banks, Nairobi, Nairobi', 'Ndenderu, Ndenderu ward, Kiambaa, Kiambu, Central Kenya, 43563, Kenya', '-1.1978466666667', '36.755456666667', '-1.2199400625544', '36.831194611111', 99, 0.06, 12, 1, 1, 27.43, 27.43, 22.48, 0, 4.95, 0, 0, 9304, '0', 0, '', 0, 0, 'null', 1, 'r}hFqxi_F_@h@^i@', NULL, 5, NULL, NULL, NULL, NULL, NULL, '2025-12-17 12:02:26', '2025-12-17 17:33:51'),
(93, '000093', 33, NULL, 1, 0, 1, 0, 12, '2025-12-19 10:55:30', '2025-12-19 10:57:03', '2025-12-19 10:57:16', 'Nairobi South ward, Starehe, Nairobi, 00507, Kenya', 'Nairobi South ward, Starehe, Nairobi, 00507, Kenya', '-1.3207533333333', '36.855448333333', '-1.3223961', '36.8564778', 'South C, Nairobi, Nairobi', 'Nairobi South ward, Starehe, Nairobi, 00507, Kenya', '-1.320795', '36.855355', '-1.3188367', '36.8278221', 99, 0.01, 12, 1, 1, 21.39, 21.39, 17.53, 0, 3.86, 0, 0, 2711, '0', 0, '', 0, 0, 'null', 1, '|~`Ggi}_FDS', NULL, 5, NULL, NULL, NULL, NULL, NULL, '2025-12-19 05:26:12', '2025-12-19 10:57:28'),
(94, '000094', 1, NULL, 1, 0, 1, 0, 1, '2025-12-19 12:14:22', '2025-12-19 12:24:54', '2025-12-19 12:43:10', 'Ellis Nagar, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9102136937804', '78.08943638701', '9.9128283247817', '78.091878314857', 'Arappalayam, Madurai, Madurai South, Madurai, Tamil Nadu, 625016, India', 'Puravazhi Salai, Ellis Nagar, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', '9.9159477', '78.09488391', '9.931246947421', '78.107886938847', 3, 13.67, 1, 1, 1, 33.05, 33.05, 27.09, 0, 5.96, 0, 0, 6364, '5', 0, '', 0, 0, 'null', 1, 'msn{@q{r{Me@}JiDLkAJ}AAIBE@[y@k@c@j@b@Zx@DAHC|A@jAKNlGl@Ab@IZIBb@lArAKwBhA@[oGCiBEu@?i@C{@aFM{ABWqMKiAG_AQw@SOGJKFiFvA}H~BuIbCeCt@c@L{GhBiCf@qBFyBSeJiAwB[kFo@iAMcD_@qBWgA?mHq@iAMgAU_Cs@kBk@Jq@EX^Mt@VdAZbB^fEp@jE\\pA^pJfA~CXlFp@xFv@pD\\nBCnCe@dDgAtCs@rAa@h@OFVN`@@n@Pf@CZ|ALFJDpAb@JJD@V@jEnAFl@DpCDRF`@AtD@~BGj@b@Zx@DAHC|A@jAKNlGl@Ab@IZIBb@lArAKwBhA@[oGgAFiDLkAJ}AAIBE@[y@k@c@_CFuDAa@@SGqCEm@EoAGAkEAWKEc@KEqAGK}AMB[Qg@Ao@Oa@eCt@c@L{GhBiCf@qBFyBSeJiAwB[kFo@iAMcD_@qBWgA?mHq@iAMgAU_Cs@kBk@Jq@EX^Mt@VdAZbB^fEp@jE\\pA^pJfA~CXlFp@xFv@pD\\nBCnCe@dDgAtCs@rAa@h@OFVN`@@n@Pf@CZ|ALFJDpAb@JJD@V@jEnAFl@DpCDRF`@AtD@~BGj@b@Zx@DAHC|A@jAKNlGl@Ab@IZIBb@lArAe@}JfAGCiBEu@?i@C{@?UEuA@eA}EAcBDGyCGsCKiAG_AQw@SOGJKFiFvA}H~BiElA', NULL, 5, NULL, NULL, NULL, NULL, NULL, '2025-12-19 06:44:28', '2025-12-19 13:08:19'),
(95, '000095', 0, 7, 1, 0, 1, 0, 1, '2025-12-22 11:51:19', NULL, NULL, 'Madakulam Kanmai, Madurai, Tamil Nadu', NULL, NULL, NULL, '9.91781745', '78.075001393904', 'Ponmeni, Madurai, Tamil Nadu', NULL, '0', '0', '9.9278523', '78.0906824', 3, 11.51, 1, 1, 1, 29.76, 0, 24.39, 0, 5.37, 0, 0, 4199, '0', 0, '', 0, 0, NULL, 0, NULL, NULL, 7, 'ggd', '+919656656565', NULL, NULL, NULL, '2025-12-22 06:21:22', '2025-12-22 11:58:41'),
(96, '000096', 0, 7, 1, 0, 1, 0, 1, '2025-12-22 12:07:13', '2025-12-22 12:08:33', '2025-12-22 12:10:34', 'Railway Colony, Ellis Nagar, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9102083333333', '78.089365', '9.9235058841914', '78.109505538233', 'Ponmeni, Madurai, Tamil Nadu', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9102083333333', '78.089365', '9.9278523', '78.0906824', 3, 0.02, 1, 1, 1, 16.95, 16.95, 13.89, 0, 3.06, 0, 0, 5787, '0', 0, '', 0, 0, NULL, 0, 'yqn{@syr{MT?U?', NULL, 5, 'Bethal', '+254795531783', NULL, NULL, NULL, '2025-12-22 06:37:16', '2025-12-22 12:10:41'),
(97, '000097', 0, 7, 1, 0, 1, 0, 1, '2025-12-29 12:54:39', '2025-12-29 13:01:33', '2025-12-29 13:01:38', 'Pasumalai, Madurai, Madurai South, Madurai, Tamil Nadu, 625004, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9101833333333', '78.089433333333', '9.9004552', '78.0773056', 'Ponmeni, Madurai, Tamil Nadu', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9101833333333', '78.089433333333', '9.9278523', '78.0906824', 3, 0.01, 1, 1, 1, 21.91, 21.91, 17.96, 0, 3.95, 0, 0, 3351, '0', 0, '', 0, 0, NULL, 0, 'sqn{@syr{MN?', NULL, 8, 'Renu', '+919759923232', NULL, NULL, NULL, '2025-12-29 07:24:41', '2025-12-30 16:36:12'),
(98, '000098', 0, 2, 1, 0, 1, 0, 1, '2025-12-29 14:30:00', NULL, NULL, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', NULL, NULL, NULL, '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', NULL, '0', '0', '9.9349080610953', '78.11977498383', 3, 3.9, 1, 1, 0, 18.15, 0, 14.88, 0, 3.27, 0, 0, 1341, '0', 0, '', 0, 0, NULL, 0, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, '2025-12-29 08:19:14', '2025-12-29 13:49:49'),
(99, '000099', 0, 2, 1, 0, 1, 0, 1, '2025-12-29 14:30:00', NULL, NULL, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', NULL, NULL, NULL, '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', NULL, '0', '0', '9.9349080610953', '78.11977498383', 3, 3.9, 1, 1, 0, 18.15, 0, 14.88, 0, 3.27, 0, 0, 3998, '0', 0, '', 0, 0, NULL, 0, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, '2025-12-29 08:21:14', '2025-12-29 13:59:52'),
(100, '000100', 0, 7, 1, 0, 1, 0, 1, '2025-12-31 10:50:00', '2025-12-29 15:03:31', '2025-12-29 15:03:36', 'Railway Colony, SS Colony, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', 'Ellis Nagar, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9101316666667', '78.089463333333', '9.9224603', '78.1065393', 'Ponmeni, Madurai, Tamil Nadu', 'Ellis Nagar, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9101316666667', '78.089463333333', '9.9278523', '78.0906824', 3, 0.02, 1, 1, 1, 16.76, 16.76, 13.74, 0, 3.02, 0, 0, 8313, '0', 0, '', 0, 0, NULL, 0, 'cqn{@czr{M?N?O', NULL, 5, 'Renu', '+919823273823', NULL, NULL, NULL, '2025-12-29 09:30:33', '2025-12-29 15:03:44'),
(101, '000101', 0, 7, 1, 0, 1, 0, 1, '2025-12-30 16:38:34', NULL, NULL, 'Ponmeni, Madurai, Tamil Nadu', NULL, NULL, NULL, '9.9278523', '78.0906824', 'Palanganatham, Madurai, Tamil Nadu', NULL, '0', '0', '9.9040093', '78.0962583', 3, 3.34, 1, 1, 1, 17.3, 0, 14.18, 0, 3.12, 0, 0, 1336, '0', 0, '', 0, 0, NULL, 0, NULL, NULL, 8, 'Renu', '+919837238232', NULL, NULL, 'Menpani', '2025-12-30 11:08:36', '2025-12-30 16:38:53'),
(102, '000102', 0, 7, 1, 0, 1, 0, 1, '2025-12-31 11:10:59', '2025-12-31 11:15:16', '2025-12-31 11:15:20', 'S S Colony, SS Colony, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9101616666667', '78.089408333333', '9.9218553', '78.094419', 'Ponmeni, Madurai, Tamil Nadu, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9101616666667', '78.089408333333', '9.9256569', '78.0901', 3, 0, 1, 1, 1, 13.71, 0, 11.24, 0, 2.47, 0, 0, 8504, '0', 0, '', 0, 0, NULL, 0, '', NULL, 5, 'Renu', '+919343746334', NULL, NULL, 'Menpani', '2025-12-31 05:41:01', '2025-12-31 11:15:28'),
(103, '000103', 0, 7, 1, 0, 1, 0, 1, '2025-12-31 12:54:55', '2025-12-31 12:55:32', '2025-12-31 12:55:36', 'S S Colony, SS Colony, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9101416666667', '78.08936', '9.9218553', '78.094419', 'Ponmeni, Madurai, Tamil Nadu, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9101416666667', '78.08936', '9.9256569', '78.0901', 3, 0.01, 1, 1, 1, 13.71, 13.71, 11.24, 0, 2.47, 0, 0, 3517, '0', 0, '', 0, 0, NULL, 0, 'kqn{@syr{MF?G?', NULL, 5, 'Renu', '+919928323232', 'sasas', 'dsdsd', 'Menpani', '2025-12-31 07:24:58', '2025-12-31 12:55:45'),
(104, '000104', 0, 7, 1, 0, 1, 0, 1, '2025-12-31 12:58:42', NULL, NULL, 'S S Colony, SS Colony, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', NULL, NULL, NULL, '9.9218553', '78.094419', 'Ponmeni, Madurai, Tamil Nadu, India', NULL, '0', '0', '9.9256569', '78.0901', 3, 0.99, 1, 1, 1, 13.71, 0, 11.24, 0, 2.47, 0, 0, 3417, '0', 0, '', 0, 0, NULL, 0, NULL, NULL, 8, 'Teena', '+2549238232223', NULL, NULL, 'Menpani', '2025-12-31 07:28:44', '2025-12-31 12:59:24'),
(105, '000105', 0, 7, 1, 0, 1, 0, 1, '2025-12-31 13:13:56', NULL, NULL, 'Ponmeni, Madurai, Tamil Nadu, India', NULL, NULL, NULL, '9.9256569', '78.0901', 'W34V+8CV, Palangantham, Madurai, Tamil Nadu 625003, India', NULL, '0', '0', '9.9058623', '78.0935472', 3, 4.63, 1, 1, 1, 19.26, 0, 15.79, 0, 3.47, 0, 0, 2349, '0', 0, '', 0, 0, NULL, 0, NULL, NULL, 8, 'Haritha', '+2549334343434', NULL, NULL, 'Menpani', '2025-12-31 07:43:59', '2025-12-31 13:14:23'),
(106, '000106', 0, 7, 1, 0, 1, 0, 1, '2025-12-31 13:15:27', NULL, NULL, 'S S Colony, SS Colony, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', NULL, NULL, NULL, '9.9218553', '78.094419', 'Ponmeni, Madurai, Tamil Nadu, India', NULL, '0', '0', '9.9256569', '78.0901', 3, 0.99, 1, 1, 1, 13.71, 0, 11.24, 0, 2.47, 0, 0, 5541, '0', 0, '', 0, 0, NULL, 0, NULL, NULL, 8, 'Teena', '+919832323232', NULL, NULL, 'Menpani', '2025-12-31 07:45:30', '2025-12-31 13:15:47'),
(107, '000107', 0, 7, 1, 0, 1, 0, 1, '2025-12-31 13:51:10', NULL, NULL, 'S S Colony, SS Colony, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', NULL, NULL, NULL, '9.9218553', '78.094419', 'Ponmeni, Madurai, Tamil Nadu, India', NULL, '0', '0', '9.9256569', '78.0901', 3, 0.99, 1, 1, 1, 13.71, 0, 11.24, 0, 2.47, 0, 0, 4937, '0', 0, '', 0, 0, NULL, 0, NULL, NULL, 7, 'Sakthi', '+919378343434', NULL, NULL, 'Menpani', '2025-12-31 08:21:12', '2025-12-31 13:51:24'),
(108, '000108', 0, 7, 1, 0, 1, 0, 1, '2026-01-01 11:00:00', NULL, NULL, 'S S Colony, SS Colony, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', NULL, NULL, NULL, '9.9218553', '78.094419', 'Ponmeni Main Rd, Ponmeni, Madurai, Tamil Nadu 625016, India', NULL, '0', '0', '9.9229292', '78.0900451', 3, 1.63, 1, 1, 1, 14.69, 0, 12.04, 0, 2.65, 0, 0, 6498, '0', 0, '', 0, 0, NULL, 0, NULL, NULL, 8, 'Yashika', '+919389329323', NULL, NULL, 'Menpani', '2025-12-31 08:22:29', '2025-12-31 13:55:58'),
(109, '000109', 0, 7, 1, 0, 1, 0, 1, '2025-12-31 15:23:27', NULL, NULL, 'S S Colony, SS Colony, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', NULL, NULL, NULL, '9.9218553', '78.094419', 'Ponmeni, Madurai, Tamil Nadu, India', NULL, '0', '0', '9.9256569', '78.0901', 3, 0.99, 1, 1, 1, 13.71, 0, 11.24, 0, 2.47, 0, 0, 1064, '0', 0, '', 0, 0, NULL, 0, NULL, NULL, 7, 'Renu', '+919347324343', 'dfdfdf', 'dgdf', 'Menpani', '2025-12-31 09:53:29', '2025-12-31 15:27:06'),
(110, '000110', 0, 8, 1, 0, 1, 0, 1, '2025-12-31 15:27:12', NULL, NULL, 'S S Colony, SS Colony, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', NULL, NULL, NULL, '9.9218553', '78.094419', 'Ponmeni, Madurai, Tamil Nadu, India', NULL, '0', '0', '9.9256569', '78.0901', 3, 0.99, 1, 1, 1, 13.71, 0, 11.24, 0, 2.47, 0, 0, 1237, '0', 0, '', 0, 0, NULL, 0, NULL, NULL, 7, 'Renu', '+254453342123232', NULL, NULL, 'Menpani', '2025-12-31 09:57:14', '2025-12-31 15:33:33'),
(112, '000112', 0, 8, 1, 0, 1, 0, 1, '2025-12-31 15:45:46', NULL, NULL, 'S S Colony, SS Colony, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', NULL, NULL, NULL, '9.9218553', '78.094419', 'Palangantham, Tamil Nadu 625003, India', NULL, '0', '0', '9.9059036', '78.0935472', 3, 2.74, 1, 1, 1, 16.38, 0, 13.43, 0, 2.95, 0, 0, 3558, '0', 0, '', 0, 0, NULL, 0, NULL, NULL, 7, 'Renu', '+918372973232', NULL, NULL, 'MNC Tech', '2025-12-31 10:15:49', '2025-12-31 15:59:28'),
(113, '000113', 0, 8, 1, 0, 1, 0, 1, '2025-12-31 17:38:49', '2025-12-31 17:39:33', '2025-12-31 17:39:37', '46/1, Kannadasan Nagar Main Road Near Citi Union Bank, SS Colony branch, Bypass Rd, opp. Vivek Show Room, Somasundaram colony, Madurai, S S Colony, Tamil Nadu 625016, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9101833333333', '78.08942', '9.9218553', '78.094419', 'Ponmeni, Madurai, Tamil Nadu, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9101833333333', '78.08942', '9.9256569', '78.0901', 3, 0, 1, 1, 1, 6.86, 0, 11.24, 6.86, 2.47, 1, 0, 5586, '0', 0, '', 0, 0, NULL, 0, '', NULL, 4, 'Renu', '+919423424242', 'adadas', 'dada', 'MNC Tech', '2025-12-31 12:08:52', '2026-02-05 11:45:48'),
(114, '000114', 0, 7, 1, 0, 1, 0, 1, '2026-01-01 14:09:08', '2026-01-01 14:09:52', '2026-01-01 14:09:56', 'W34V+8CV, Palangantham, Madurai, Tamil Nadu 625003, India', 'Ellis Nagar, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.91018', '78.089483333333', '9.9058623', '78.0935472', 'Ponmeni, Madurai, Tamil Nadu, India', 'Ellis Nagar, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.91018', '78.089483333333', '9.9256569', '78.0901', 3, 0.02, 1, 1, 1, 17.49, 17.49, 14.34, 0, 3.15, 0, 0, 2888, '0', 0, '', 0, 0, NULL, 0, 'eqn{@izr{M@TO?', NULL, 5, NULL, '+2549242323232', 'asasa', 'ssasa', 'AFC Tech', '2026-01-01 08:39:10', '2026-01-01 14:10:06'),
(115, '000115', 0, 7, 1, 0, 1, 0, 1, '2026-01-01 18:10:54', NULL, NULL, 'W4F5+RJR, Madurai, Tamil Nadu 625016, India', NULL, NULL, NULL, '9.924959', '78.1086781', 'Ponmeni, Madurai, Tamil Nadu, India', NULL, '0', '0', '9.9256569', '78.0901', 3, 2.99, 1, 1, 1, 16.76, 0, 13.74, 0, 3.02, 1, 0, 4484, '0', 0, '', 0, 0, NULL, 0, NULL, NULL, 7, 'Renu', '+2549353434343', 'asas', 'sasa', 'AFC Tech', '2026-01-01 12:40:56', '2026-01-01 18:38:07'),
(116, '000116', 0, 7, 1, 0, 1, 0, 1, '2026-01-01 18:41:31', NULL, NULL, 'W4F5+RJR, Madurai, Tamil Nadu 625016, India', NULL, NULL, NULL, '9.924959', '78.1086781', 'Ponmeni, Madurai, Tamil Nadu, India', NULL, '0', '0', '9.9256569', '78.0901', 3, 2.99, 1, 1, 1, 16.76, 0, 13.74, 0, 3.02, 1, 0, 4036, '0', 0, '', 0, 0, NULL, 0, NULL, NULL, 7, 'Renu', '+2549455343433', 'asas', 'asass', 'AFC Tech', '2026-01-01 13:11:34', '2026-01-01 18:47:50'),
(117, '000117', 0, 7, 1, 0, 1, 0, 1, '2026-01-02 12:08:29', '2026-01-02 12:13:30', '2026-01-02 12:13:35', 'Palangantham, Tamil Nadu 625003, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9102883333333', '78.089346666667', '9.9059036', '78.0935472', 'Ponmeni, Madurai, Tamil Nadu, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9101883333333', '78.08933', '9.9256569', '78.0901', 3, 0.02, 1, 1, 1, 17.49, 17.49, 14.34, 0, 3.15, 0, 0, 9225, '0', 0, '', 0, 0, NULL, 0, 'irn{@syr{Md@?', NULL, 5, 'Teena', '+2549731721781', 'asasas', 'asas', 'AFC Tech', '2026-01-02 06:38:31', '2026-01-02 12:13:43'),
(118, '000118', 0, 7, 1, 0, 1, 0, 1, '2026-01-02 12:46:18', NULL, NULL, 'W4F5+RJR, Madurai, Tamil Nadu 625016, India', NULL, NULL, NULL, '9.924959', '78.1086781', 'Ponmeni, Madurai, Tamil Nadu, India', NULL, '0', '0', '9.9256569', '78.0901', 3, 2.99, 1, 1, 1, 16.76, 0, 13.74, 0, 3.02, 0, 0, 2155, '0', 0, '', 0, 0, NULL, 0, NULL, NULL, 7, 'Teena', '+2549161272711', 'asasas', 'sasasa', 'AFC Tech', '2026-01-02 07:16:21', '2026-01-02 13:06:21'),
(119, '000119', 0, 7, 1, 0, 1, 0, 1, '2026-01-03 06:30:00', '2026-01-02 13:10:52', '2026-01-02 13:10:57', 'W4F5+RJR, Madurai, Tamil Nadu 625016, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.91014', '78.089353333333', '9.924959', '78.1086781', 'Ponmeni Main Rd, Ponmeni, Madurai, Tamil Nadu 625016, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.91014', '78.089353333333', '9.9229292', '78.0900451', 3, 0, 1, 1, 1, 16.63, 0, 13.63, 0, 3, 0, 0, 1454, '0', 0, '', 0, 0, NULL, 0, '', NULL, 5, 'Teens', '+2549242232321', 'asasa', 'sasas', 'AFC Tech', '2026-01-02 07:36:51', '2026-01-02 13:11:04'),
(120, '000120', 0, 7, 1, 0, 1, 0, 1, '2026-01-02 18:15:06', '2026-01-02 18:15:35', '2026-01-02 18:15:58', 'Palangantham, Tamil Nadu 625003, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9102', '78.089366666667', '9.9059036', '78.0935472', 'Kalavasal, Madurai, Tamil Nadu 625016, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9102', '78.089366666667', '9.9302859', '78.0954996', 3, 0, 1, 1, 1, 17.67, 0, 14.48, 0, 3.19, 0, 0, 4909, '0', 0, '', 0, 0, NULL, 0, '', NULL, 5, NULL, '+919382323223', 'asas', 'aasas', 'AFC Tech', '2026-01-02 12:45:08', '2026-01-02 18:17:35'),
(121, '000121', 0, 7, 1, 0, 1, 0, 1, '2026-01-21 11:17:58', '2026-01-21 11:18:32', '2026-01-21 11:18:36', 'Ponmeni, Madurai, Tamil Nadu, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9101566666667', '78.089405', '9.9256569', '78.0901', 'Kalavasal, Madurai, Tamil Nadu 625016, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9101566666667', '78.089405', '9.9302859', '78.0954996', 3, 0, 1, 1, 1, 13.71, 0, 11.24, 0, 2.47, 0, 0, 8368, '0', 0, '', 0, 0, NULL, 0, '', NULL, 5, 'Rithika', '+2549823626733', 'sdsd', 'dsdsd', 'AFC Tech', '2026-01-21 05:48:01', '2026-01-21 11:18:44'),
(122, '000122', 0, 7, 1, 0, 1, 0, 1, '2026-01-28 14:13:28', '2026-01-28 14:14:07', '2026-01-28 14:14:11', 'Madakkulam, Tamil Nadu, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.91014', '78.089378333333', '9.9160561', '78.0900425', 'Ponmeni, Madurai, Tamil Nadu, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.91014', '78.089378333333', '9.9256569', '78.0901', 3, 0, 1, 1, 1, 14.21, 0, 11.65, 0, 2.56, 0, 0, 4584, '0', 0, '', 0, 0, NULL, 0, '', NULL, 5, 'rithika', '+2549744734343', 'asa', 'asas', 'AFC Tech', '2026-01-28 08:43:30', '2026-01-28 14:14:20'),
(123, '000123', 0, 7, 1, 0, 1, 0, 1, '2026-01-30 12:29:45', '2026-01-30 12:30:12', '2026-01-30 12:30:18', 'Madakkulam, Tamil Nadu, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.910265', '78.089428333333', '9.9160561', '78.0900425', 'Ponmeni, Madurai, Tamil Nadu, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9103066666667', '78.089346666667', '9.9256569', '78.0901', 3, 0.01, 1, 1, 1, 14.21, 14.21, 11.65, 0, 2.56, 0, 0, 6590, '0', 0, '', 0, 0, NULL, 0, 'cqn{@}yr{M?J', NULL, 5, 'Rithika', '+918362736236', 'asas', 'asas', 'AFC Tech', '2026-01-30 06:59:48', '2026-01-30 12:30:26'),
(124, '000124', 0, 9, 1, 0, 1, 0, 1, '2026-01-30 17:36:02', '2026-01-30 17:36:52', '2026-01-30 17:37:01', 'Madakulam Kanmai, Tamil Nadu', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.910265', '78.089411666667', '9.9182407', '78.0751774', 'Ponmeni, Madurai, Tamil Nadu, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.910265', '78.089411666667', '9.9256569', '78.0901', 3, 0, 1, 1, 1, 15.41, 0, 12.63, 0, 2.78, 0, 0, 1130, '0', 0, '', 0, 0, NULL, 0, '', NULL, 5, 'rithish', '+2549777266661', 'asas', 'ssas', 'TechAI Solutions pvt Ltd', '2026-01-30 12:06:06', '2026-01-30 17:37:14'),
(125, '000125', 1, NULL, 1, 0, 1, 0, 1, '2026-02-03 18:31:00', '2026-02-03 17:32:07', '2026-02-03 17:32:12', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9102168', '78.08947928', '9.9102493', '78.0894023', 'Railway Colony, SS Colony, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9102168', '78.08947928', '9.9236058349345', '78.105939739222', 3, 0, 1, 1, 1, 17.75, 0, 14.55, 0, 3.2, 0, 0, 5804, '0', 0, '', 0, 0, 'null', 1, '', NULL, 5, NULL, NULL, NULL, NULL, NULL, '2026-02-03 12:01:14', '2026-02-03 17:32:23'),
(126, '000126', 0, 7, 1, 0, 1, 0, 1, '2026-02-04 16:14:43', '2026-02-04 16:15:14', '2026-02-05 11:48:10', 'Madakkulam, Tamil Nadu, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9102216666667', '78.0894', '9.9160561', '78.0900425', 'Ponmeni, Madurai, Tamil Nadu, India', 'MG Road, Chennai', '13.0827', '80.2707', '9.9256569', '78.0901', 3, 461, 1, 1, 1, 715.23, 715.23, 586.25, 0, 128.98, 0, 0, 4307, '0', 0, '', 0, 0, NULL, 0, '', NULL, 4, 'Nagarani', '+916383575669', 'add', 'adad', 'AFC Tech', '2026-02-04 10:44:45', '2026-02-05 11:48:12'),
(127, '000127', 1, NULL, 1, 0, 1, 0, 1, '2026-02-04 13:57:11', '2026-02-04 13:58:34', '2026-02-04 15:55:53', 'Madakkulam, Madurai, Madurai South, Madurai, Tamil Nadu, 625004, India', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.91025361', '78.08938437', '9.9145277542082', '78.078795439086', 'Kalavasal, Madurai, Madurai South, Madurai, Tamil Nadu, 625016, India', 'madurai', '9.912913398110689', '78.11973299329425', '9.9306424528405', '78.103812448509', 3, 4.8, 1, 1, 2, 19.52, 0, 16, 0, 3.52, 0, 0, 1562, '0', 0, '', 0, 0, 'null', 1, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL, '2026-02-04 12:57:34', '2026-02-04 15:56:03'),
(128, '000128', 1, NULL, 1, 0, 2, 0, 1, '2026-02-04 22:59:00', NULL, NULL, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', NULL, NULL, NULL, '9.9102957', '78.0893835', 'Railway Grounds, Payaniyar Viduthi Salai, Kalavasal, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', NULL, '0', '0', '9.9266570803378', '78.103259002839', 3, 3.75, 1, 1, 1, 17.92, 0, 14.69, 0, 3.23, 0, 0, 1346, '0', 0, '', 0, 0, 'null', 1, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, '2026-02-04 16:59:35', '2026-02-05 05:51:10'),
(129, '000129', 48, NULL, 1, 0, 1, 0, 1, '2026-02-05 06:07:49', NULL, NULL, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', NULL, NULL, NULL, '9.9102181', '78.0893743', 'Madakulam Kanmai, Madurai, Tamil Nadu', NULL, '0', '0', '9.91781745', '78.075001393904', 3, 0, 1, 1, 1, 12.2, 0, 10, 0, 2.2, 0, 0, 1925, '0', 0, '', 0, 0, 'null', 1, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, '2026-02-05 05:08:24', '2026-02-05 06:08:52'),
(130, '000130', 48, NULL, 1, 0, 1, 0, 1, '2026-02-05 06:24:28', '2026-02-05 06:25:34', '2026-02-05 06:25:39', 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', 'Ellis Nagar, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9101083333333', '78.089423333333', '9.9102181', '78.0893743', 'Ponmeni, Madurai, Tamil Nadu', 'Ellis Nagar, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '9.9100083333333', '78.089431666667', '9.9278523', '78.0906824', 3, 1, 1, 1, 1, 13.73, 13.73, 11.25, 0, 2.48, 0, 0, 8452, '0', 0, '', 0, 0, 'null', 1, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL, '2026-02-05 05:24:43', '2026-02-05 06:27:16'),
(131, '000131', 48, NULL, 1, 0, 1, 0, 1, '2026-02-05 06:34:34', NULL, NULL, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', NULL, NULL, NULL, '9.9102145', '78.0893829', 'Ponmeni, Madurai, Tamil Nadu', NULL, '0', '0', '9.9278523', '78.0906824', 3, 0, 1, 1, 1, 12.2, 0, 10, 0, 2.2, 0, 0, 6841, '0', 0, '', 0, 0, 'null', 1, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, '2026-02-05 05:34:51', '2026-02-05 06:35:19'),
(132, '000132', 48, NULL, 1, 0, 1, 0, 1, '2026-02-05 06:43:21', NULL, NULL, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', NULL, NULL, NULL, '9.9102145', '78.0893829', 'Ponmeni, Madurai, Tamil Nadu', NULL, '0', '0', '9.9278523', '78.0906824', 3, 0, 1, 1, 1, 12.2, 0, 10, 0, 2.2, 0, 0, 9743, '0', 0, '', 0, 0, 'null', 1, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, '2026-02-05 05:55:27', '2026-02-05 06:56:06'),
(133, '000133', 48, NULL, 1, 0, 1, 0, 1, '2026-02-05 07:02:53', NULL, NULL, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', NULL, NULL, NULL, '9.9102159', '78.0893844', 'Ponmeni, Madurai, Tamil Nadu', NULL, '0', '0', '9.9278523', '78.0906824', 3, 0, 1, 1, 1, 12.2, 0, 10, 0, 2.2, 0, 0, 6840, '0', 0, '', 0, 0, 'null', 1, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, '2026-02-05 06:22:23', '2026-02-05 07:24:12'),
(134, '000134', 48, NULL, 1, 0, 1, 0, 1, '2026-02-05 07:24:14', NULL, NULL, 'Ponmeni, Madurai, Tamil Nadu', NULL, NULL, NULL, '9.9278523', '78.0906824', 'Palanganatham Bus Stand Rd, Madurai, Tamil Nadu', NULL, '0', '0', '9.9067777377098', '78.090952053858', 3, 0, 1, 1, 1, 12.2, 0, 10, 0, 2.2, 0, 0, 5034, '0', 0, '', 0, 0, 'null', 1, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, '2026-02-05 06:25:11', '2026-02-05 07:25:28'),
(135, '000135', 1, 0, 1, 0, 2, 0, 1, '2026-02-05 08:26:58', NULL, NULL, 'W38R+C2F, S.S.K.Nagar, Vanamamalai Nagar, Durai Samy Nagar, Madurai, Madakkulam, Tamil Nadu 625003, India', NULL, NULL, NULL, '9.916056099999999', '78.0900425', 'W4GC+CJC, North Lane, Simmakkal, Madurai Main, Madurai, Tamil Nadu 625001, India', NULL, '0', '0', '9.9260717', '78.1215208', 3, 4.6, 1, 1, 0, 19.22, 0, 15.75, 0, 3.47, 0, 0, 3053, '0', 0, '', 0, 0, NULL, 1, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, '2026-02-05 06:56:58', '2026-02-05 08:03:58'),
(136, '000136', 1, 0, 1, 0, 2, 0, 1, '2026-02-05 08:35:37', '2026-02-05 08:06:29', '2026-02-05 08:06:40', 'W38R+C2F, S.S.K.Nagar, Vanamamalai Nagar, Durai Samy Nagar, Madurai, Madakkulam, Tamil Nadu 625003, India', '14B, Maruthapadiyar Nagar, Madurai, Madakkulam, Tamil Nadu 625003, India', '9.91020368', '78.0894021', '9.916056099999999', '78.0900425', 'W4GC+CJC, North Lane, Simmakkal, Madurai Main, Madurai, Tamil Nadu 625001, India', '14B, Maruthapadiyar Nagar, Madurai, Madakkulam, Tamil Nadu 625003, India', '9.9102033333333', '78.089405', '9.9260717', '78.1215208', 3, 4.6, 1, 1, 2, 19.22, 0, 15.75, 0, 3.47, 0, 0, 6601, '0', 0, '', 0, 0, NULL, 1, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL, '2026-02-05 07:05:37', '2026-02-05 08:08:32'),
(137, '000137', 1, 0, 1, 0, 2, 0, 1, '2026-02-05 08:35:37', NULL, NULL, 'W38R+C2F, S.S.K.Nagar, Vanamamalai Nagar, Durai Samy Nagar, Madurai, Madakkulam, Tamil Nadu 625003, India', NULL, NULL, NULL, '9.916056099999999', '78.0900425', 'W4GC+CJC, North Lane, Simmakkal, Madurai Main, Madurai, Tamil Nadu 625001, India', NULL, '0', '0', '9.9260717', '78.1215208', 3, 4.6, 1, 1, 0, 19.22, 0, 15.75, 0, 3.47, 0, 0, 1227, '0', 0, '', 0, 0, NULL, 1, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, '2026-02-05 07:05:37', '2026-02-05 08:08:48'),
(138, '000138', 0, 7, 1, 0, 2, 0, 3, '2026-02-05 12:27:46', NULL, '2026-02-05 11:07:10', '42-1-13, Harvey Nagar 1st St, Pethaniapuram 2, Arappalayam, Madurai, Tamil Nadu 625016, India', NULL, NULL, NULL, '9.9285502', '78.0994099', 'Ponmeni, Madurai, Tamil Nadu, India', '22-A, Bypass Rd, Kalavasal, Navalar Nagar, S S Colony, Tamil Nadu 625016, India', '9.92753716', '78.09479588', '9.9256569', '78.0901', 3, 1.88, 2, 1, 1, 15.07, 0, 12.35, 0, 2.72, 0, 0, 5280, '0', 0, '', 0, 0, NULL, 0, NULL, NULL, 4, 'Rithika', '+916383575669', 'asas', 'aaa', 'AFC Tech', '2026-02-05 06:57:49', '2026-02-05 11:07:10'),
(139, '000139', 1, 0, 1, 0, 2, 0, 1, '2026-02-05 08:47:48', '2026-02-05 08:33:25', '2026-02-05 09:05:53', 'W38R+C2F, S.S.K.Nagar, Vanamamalai Nagar, Durai Samy Nagar, Madurai, Madakkulam, Tamil Nadu 625003, India', '4, Gangai St, rajangambeeram, Othakadai, Madakkulam, Tamil Nadu 625003, India', '9.91030211', '78.0891361', '9.916056099999999', '78.0900425', 'W4GC+CJC, North Lane, Simmakkal, Madurai Main, Madurai, Tamil Nadu 625001, India', '22-A, Bypass Rd, Kalavasal, Navalar Nagar, S S Colony, Tamil Nadu 625016, India', '9.92753716', '78.09479588', '9.9260717', '78.1215208', 3, 4.6, 1, 1, 2, 19.22, 0, 15.75, 0, 3.47, 0, 0, 4695, '0', 0, '', 0, 0, NULL, 1, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL, '2026-02-05 07:17:48', '2026-02-05 09:06:01'),
(140, '000140', 0, 7, 1, 0, 2, 0, 3, '2026-02-05 11:56:20', NULL, NULL, '42-1-13, Harvey Nagar 1st St, Pethaniapuram 2, Arappalayam, Madurai, Tamil Nadu 625016, India', NULL, NULL, NULL, '9.9285502', '78.0994099', 'Ponmeni, Madurai, Tamil Nadu, India', NULL, '0', '0', '9.9256569', '78.0901', 3, 1.69, 2, 1, 1, 14.77, 0, 12.11, 0, 2.66, 0, 0, 6258, '0', 0, '', 0, 0, NULL, 0, NULL, NULL, 4, 'Rithika', '+916383575669', 'asas', 'asas', 'AFC Tech', '2026-02-05 06:26:22', '2026-02-05 11:45:22'),
(141, '000141', 40, NULL, 1, 0, 1, 0, 1, '2026-02-05 09:12:41', NULL, NULL, '193/1 & 1934/3, Mullai Street, Madakulam Main Rd, Madurai, Madakkulam, Tamil Nadu 625003, India', NULL, NULL, NULL, '9.9102070148857', '78.089364878833', 'Ponmeni, Madurai, Tamil Nadu, India', NULL, '0', '0', '9.9256569', '78.0901', 3, 3.1, 1, 1, 1, 16.93, 0, 13.88, 0, 3.05, 0, 0, 6202, '0', 0, '', 0, 0, 'null', 1, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, '2026-02-05 08:12:56', '2026-02-05 09:13:33'),
(142, '000142', 0, 7, 1, 0, 1, 0, 1, '2026-02-05 09:35:49', NULL, NULL, '42-1-13, Harvey Nagar 1st St, Pethaniapuram 2, Arappalayam, Madurai, Tamil Nadu 625016, India', NULL, NULL, NULL, '9.9285502', '78.0994099', 'Ponmeni, Madurai, Tamil Nadu, India', NULL, '0', '0', '9.9256569', '78.0901', 3, 1.88, 1, 1, 1, 15.07, 0, 12.35, 0, 2.72, 0, 0, 5521, '0', 0, '', 0, 0, NULL, 0, NULL, NULL, 7, 'Rithika', '+916383575669', 'asas', 'asas', 'AFC Tech', '2026-02-05 08:35:51', '2026-02-05 09:58:36'),
(143, '000143', 48, NULL, 1, 0, 2, 0, 1, '2026-02-05 10:51:00', NULL, NULL, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', NULL, NULL, NULL, '9.9101333333333', '78.089385', 'Ponmeni, Madurai, Tamil Nadu', NULL, '0', '0', '9.9278523', '78.0906824', 3, 0, 1, 1, 1, 12.2, 0, 10, 0, 2.2, 0, 0, 9856, '0', 0, '', 0, 0, 'null', 1, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, '2026-02-05 05:11:41', '2026-02-05 10:24:27'),
(144, '000144', 40, NULL, 1, 0, 1, 0, 1, '2026-02-05 10:51:26', NULL, NULL, '193/1 & 1934/3, Mullai Street, Madakulam Main Rd, Madurai, Madakkulam, Tamil Nadu 625003, India', NULL, NULL, NULL, '9.9102136203527', '78.089382983744', 'Ponmeni, Madurai, Tamil Nadu, India', NULL, '0', '0', '9.9256569', '78.0901', 3, 3.1, 1, 1, 1, 16.93, 0, 13.88, 0, 3.05, 0, 0, 6367, '0', 0, '', 0, 0, 'null', 1, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, '2026-02-05 09:52:11', '2026-02-05 10:52:47'),
(145, '000145', 40, NULL, 1, 0, 1, 0, 1, '2026-02-05 10:53:07', '2026-02-05 10:53:59', '2026-02-05 10:54:10', '193/1 & 1934/3, Mullai Street, Madakulam Main Rd, Madurai, Madakkulam, Tamil Nadu 625003, India', '14B, Maruthapadiyar Nagar, Madurai, Madakkulam, Tamil Nadu 625003, India', '9.91017', '78.089355', '9.9102086662525', '78.0893920362', 'Ponmeni, Madurai, Tamil Nadu, India', '14B, Maruthapadiyar Nagar, Madurai, Madakkulam, Tamil Nadu 625003, India', '9.91017', '78.089355', '9.9256569', '78.0901', 3, 3.1, 1, 1, 1, 16.93, 0, 13.88, 0, 3.05, 0, 0, 5554, '0', 0, '', 0, 0, 'null', 1, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL, '2026-02-05 09:53:23', '2026-02-05 10:54:22'),
(146, '000146', 1, NULL, 1, 0, 1, 0, 8, '2026-02-05 11:01:37', NULL, NULL, '193/1 & 1934/3, Mullai Street, Madakulam Main Rd, Madurai, Madakkulam, Tamil Nadu 625003, India', NULL, NULL, NULL, '9.9102301722514', '78.089390527457', '81-59, 1st St, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', NULL, '0', '0', '9.9309969989156', '78.100327569991', 3, 4.1, 8, 1, 1, 18.46, 0, 15.13, 0, 3.33, 0, 0, 2744, '0', 0, '', 0, 0, 'null', 1, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, '2026-02-05 10:03:00', '2026-02-05 11:05:40'),
(147, '000147', 1, NULL, 1, 0, 1, 0, 8, '2026-02-05 11:32:15', '2026-02-05 11:43:10', '2026-02-05 11:47:51', '193/1 & 1934/3, Mullai Street, Madakulam Main Rd, Madurai, Madakkulam, Tamil Nadu 625003, India', '193/1 & 1934/3, Mullai Street, Madakulam Main Rd, Madurai, Madakkulam, Tamil Nadu 625003, India', '9.9102527542268', '78.089378401898', '9.9102103558663', '78.089392539114', 'W4C6+47F, Junction, Madurai, Tamil Nadu 625016, India', '22-A, Bypass Rd, Kalavasal, Navalar Nagar, S S Colony, Tamil Nadu 625016, India', '9.92753716', '78.09479588', '9.9204588219035', '78.110894132406', 3, 2.8, 8, 1, 2, 16.47, 0, 13.5, 0, 2.97, 0, 0, 1330, '0', 0, '', 0, 0, 'null', 1, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL, '2026-02-05 10:32:49', '2026-02-05 11:48:37'),
(148, '000148', 1, NULL, 1, 0, 1, 0, 8, '2026-02-05 11:48:45', '2026-02-05 11:49:27', '2026-02-05 11:49:43', '193/1 & 1934/3, Mullai Street, Madakulam Main Rd, Madurai, Madakkulam, Tamil Nadu 625003, India', '193/1 & 1934/3, Mullai Street, Madakulam Main Rd, Madurai, Madakkulam, Tamil Nadu 625003, India', '9.9101993488592', '78.089466294496', '9.910246717248', '78.089195357028', '4, 4th St, Bharathi Nagar, Poonthamalli Nagar, Madurai, Tamil Nadu 625018, India', '22-A, Bypass Rd, Kalavasal, Navalar Nagar, S S Colony, Tamil Nadu 625016, India', '9.92753716', '78.09479588', '9.9351031297739', '78.117852788419', 3, 2.8, 8, 1, 2, 16.47, 0, 13.5, 0, 2.97, 0, 0, 6115, '0', 0, '', 0, 0, 'null', 1, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL, '2026-02-05 10:48:56', '2026-02-05 11:49:52');

-- --------------------------------------------------------

--
-- Table structure for table `trip_cancellations`
--

CREATE TABLE `trip_cancellations` (
  `id` int(11) NOT NULL,
  `trip_id` int(11) NOT NULL,
  `reason_id` int(11) NOT NULL,
  `cancelled_by` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `trip_cancellations`
--

INSERT INTO `trip_cancellations` (`id`, `trip_id`, `reason_id`, `cancelled_by`, `created_at`, `updated_at`) VALUES
(1, 9, 11, 1, '2025-10-22 15:03:08', '2025-10-22 15:03:08'),
(2, 10, 6, 2, '2025-10-22 15:55:02', '2025-10-22 15:55:02'),
(3, 11, 6, 2, '2025-10-22 16:04:47', '2025-10-22 16:04:47'),
(4, 12, 6, 2, '2025-10-22 16:55:16', '2025-10-22 16:55:16'),
(5, 13, 6, 2, '2025-10-23 10:14:47', '2025-10-23 10:14:47'),
(6, 16, 6, 2, '2025-10-23 16:10:46', '2025-10-23 16:10:46'),
(7, 17, 6, 2, '2025-10-23 16:11:44', '2025-10-23 16:11:44'),
(8, 19, 5, 2, '2025-10-24 10:07:18', '2025-10-24 10:07:18'),
(9, 20, 6, 2, '2025-10-24 11:38:15', '2025-10-24 11:38:15'),
(10, 21, 9, 2, '2025-10-24 16:36:42', '2025-10-24 16:36:42'),
(11, 22, 7, 2, '2025-10-24 18:23:05', '2025-10-24 18:23:05'),
(12, 23, 9, 2, '2025-10-25 23:43:59', '2025-10-25 23:43:59'),
(13, 24, 8, 2, '2025-10-25 23:44:10', '2025-10-25 23:44:10'),
(14, 25, 5, 2, '2025-10-25 23:44:42', '2025-10-25 23:44:42'),
(15, 26, 9, 2, '2025-10-25 23:45:31', '2025-10-25 23:45:31'),
(16, 27, 6, 2, '2025-10-25 23:45:40', '2025-10-25 23:45:40'),
(17, 28, 9, 2, '2025-10-25 23:45:48', '2025-10-25 23:45:48'),
(18, 29, 9, 2, '2025-10-25 23:45:56', '2025-10-25 23:45:56'),
(19, 37, 6, 2, '2025-10-27 13:57:16', '2025-10-27 13:57:16'),
(20, 78, 9, 2, '2025-12-16 19:11:43', '2025-12-16 19:11:43'),
(21, 78, 9, 2, '2025-12-16 19:11:57', '2025-12-16 19:11:57'),
(22, 79, 9, 2, '2025-12-16 19:13:04', '2025-12-16 19:13:04'),
(23, 80, 9, 2, '2025-12-16 19:14:04', '2025-12-16 19:14:04'),
(24, 80, 8, 2, '2025-12-16 19:14:16', '2025-12-16 19:14:16'),
(25, 81, 8, 2, '2025-12-16 19:19:57', '2025-12-16 19:19:57'),
(26, 83, 9, 2, '2025-12-17 13:42:56', '2025-12-17 13:42:56'),
(27, 85, 9, 2, '2025-12-17 15:21:22', '2025-12-17 15:21:22'),
(28, 86, 9, 2, '2025-12-17 15:24:52', '2025-12-17 15:24:52'),
(29, 90, 7, 2, '2025-12-17 17:29:17', '2025-12-17 17:29:17'),
(30, 95, 5, 2, '2025-12-22 11:58:41', '2025-12-22 11:58:41'),
(31, 98, 6, 2, '2025-12-29 13:49:49', '2025-12-29 13:49:49'),
(32, 99, 7, 2, '2025-12-29 13:59:52', '2025-12-29 13:59:52'),
(33, 1, 1, 1, '2025-12-30 15:56:24', '2025-12-30 15:56:24'),
(34, 5, 1, 1, '2025-12-30 16:16:18', '2025-12-30 16:16:18'),
(35, 100, 1, 1, '2025-12-30 16:17:22', '2025-12-30 16:17:22'),
(36, 97, 1, 3, '2025-12-30 16:36:12', '2025-12-30 16:36:12'),
(37, 101, 1, 3, '2025-12-30 16:38:53', '2025-12-30 16:38:53'),
(38, 104, 1, 3, '2025-12-31 12:59:24', '2025-12-31 12:59:24'),
(39, 105, 1, 3, '2025-12-31 13:14:23', '2025-12-31 13:14:23'),
(40, 106, 1, 3, '2025-12-31 13:15:47', '2025-12-31 13:15:47'),
(41, 107, 8, 2, '2025-12-31 13:51:24', '2025-12-31 13:51:24'),
(42, 108, 1, 3, '2025-12-31 13:55:58', '2025-12-31 13:55:58'),
(43, 109, 7, 2, '2025-12-31 15:27:06', '2025-12-31 15:27:06'),
(44, 110, 7, 2, '2025-12-31 15:33:33', '2025-12-31 15:33:33'),
(45, 111, 8, 2, '2025-12-31 15:43:16', '2025-12-31 15:43:16'),
(46, 111, 7, 2, '2025-12-31 15:43:28', '2025-12-31 15:43:28'),
(47, 112, 8, 2, '2025-12-31 15:59:28', '2025-12-31 15:59:28'),
(48, 115, 7, 2, '2026-01-01 18:38:07', '2026-01-01 18:38:07'),
(49, 116, 7, 2, '2026-01-01 18:47:50', '2026-01-01 18:47:50'),
(50, 118, 7, 2, '2026-01-02 13:06:21', '2026-01-02 13:06:21'),
(51, 128, 6, 2, '2026-02-05 05:51:10', '2026-02-05 05:51:10'),
(52, 129, 6, 2, '2026-02-05 06:08:52', '2026-02-05 06:08:52'),
(53, 131, 8, 2, '2026-02-05 06:35:19', '2026-02-05 06:35:19'),
(54, 132, 6, 2, '2026-02-05 06:56:06', '2026-02-05 06:56:06'),
(55, 133, 6, 2, '2026-02-05 07:24:11', '2026-02-05 07:24:11'),
(56, 134, 7, 2, '2026-02-05 07:25:27', '2026-02-05 07:25:27'),
(57, 135, 7, 2, '2026-02-05 08:03:58', '2026-02-05 08:03:58'),
(58, 137, 8, 2, '2026-02-05 08:08:48', '2026-02-05 08:08:48'),
(59, 138, 7, 2, '2026-02-05 08:26:40', '2026-02-05 08:26:40'),
(60, 141, 7, 2, '2026-02-05 09:13:33', '2026-02-05 09:13:33'),
(61, 142, 9, 2, '2026-02-05 09:58:36', '2026-02-05 09:58:36'),
(62, 143, 7, 2, '2026-02-05 10:24:27', '2026-02-05 10:24:27'),
(63, 144, 7, 2, '2026-02-05 10:52:47', '2026-02-05 10:52:47'),
(64, 146, 4, 1, '2026-02-05 11:05:40', '2026-02-05 11:05:40');

-- --------------------------------------------------------

--
-- Table structure for table `trip_histories`
--

CREATE TABLE `trip_histories` (
  `id` int(11) NOT NULL,
  `trip_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `driver_id` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `trip_requests`
--

CREATE TABLE `trip_requests` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `corporate_customer_id` int(11) DEFAULT 0,
  `driver_id` int(11) NOT NULL DEFAULT 0,
  `package_id` int(11) NOT NULL DEFAULT 0,
  `distance` double NOT NULL DEFAULT 0,
  `vehicle_type` int(11) NOT NULL,
  `trip_type` int(11) NOT NULL DEFAULT 1,
  `trip_sub_type` int(11) NOT NULL DEFAULT 0,
  `booking_type` int(11) NOT NULL DEFAULT 1,
  `pickup_address` text NOT NULL,
  `pickup_date` datetime NOT NULL,
  `pickup_lat` varchar(250) NOT NULL,
  `pickup_lng` varchar(250) NOT NULL,
  `drop_address` text DEFAULT NULL,
  `drop_lat` varchar(250) NOT NULL DEFAULT '0',
  `drop_lng` varchar(250) NOT NULL DEFAULT '0',
  `surge` double NOT NULL DEFAULT 1,
  `zone` int(11) NOT NULL,
  `payment_method` int(11) NOT NULL DEFAULT 0,
  `total` double NOT NULL DEFAULT 0,
  `sub_total` double NOT NULL DEFAULT 0,
  `promo` int(11) NOT NULL,
  `discount` double NOT NULL DEFAULT 0,
  `tax` double NOT NULL DEFAULT 0,
  `static_map` varchar(250) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `is_multiple_drops` int(11) NOT NULL DEFAULT 0,
  `contact` varchar(100) DEFAULT NULL,
  `flag` int(11) NOT NULL DEFAULT 0,
  `agent_name` varchar(250) DEFAULT NULL,
  `agent_phone_number` varchar(250) DEFAULT NULL,
  `company_name` varchar(250) DEFAULT NULL,
  `driver_note` text DEFAULT NULL,
  `customer_note` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `trip_requests`
--

INSERT INTO `trip_requests` (`id`, `customer_id`, `corporate_customer_id`, `driver_id`, `package_id`, `distance`, `vehicle_type`, `trip_type`, `trip_sub_type`, `booking_type`, `pickup_address`, `pickup_date`, `pickup_lat`, `pickup_lng`, `drop_address`, `drop_lat`, `drop_lng`, `surge`, `zone`, `payment_method`, `total`, `sub_total`, `promo`, `discount`, `tax`, `static_map`, `status`, `is_multiple_drops`, `contact`, `flag`, `agent_name`, `agent_phone_number`, `company_name`, `driver_note`, `customer_note`, `created_at`, `updated_at`) VALUES
(1, 1, 0, 1, 0, 4.96, 1, 1, 0, 1, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '2025-10-06 11:45:35', '9.9101676512208', '78.089399771133', 'Capran Hall Higher Secondary School, Arappalayam Pradhna Salai, Arappalayam, Madurai, Madurai South, Madurai, Tamil Nadu, 625017, India', '9.9306477327897', '78.112629696608', 1, 99, 1, 19.76, 16.2, 0, 0, 3.56, '', 6, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-10-06 11:45:40', '2025-12-30 16:10:50'),
(2, 3, 0, 3, 0, 2.88, 1, 1, 0, 1, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '2025-10-14 10:44:41', '9.9101883333334', '78.089391666667', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 1, 99, 1, 16.59, 13.6, 0, 0, 2.99, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-10-14 10:44:46', '2025-10-14 10:45:05'),
(3, 3, 0, 3, 2, 0, 1, 2, 0, 1, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '2025-10-14 10:46:56', '9.9081604147585', '78.088807667545', NULL, '0', '0', 1, 99, 1, 12.2, 10, 0, 0, 2.2, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-10-14 10:47:01', '2025-10-14 10:47:19'),
(4, 3, 0, 3, 0, 34.64, 1, 1, 0, 1, 'Natham, Dindigul, Tamil Nadu, India', '2025-10-14 15:15:36', '10.106915221641', '78.212799671987', 'Ponmeni East Street, Madurai, Tamil Nadu', '9.9242945722431', '78.090679061646', 1, 99, 1, 65.03, 53.3, 0, 0, 11.73, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-10-14 15:15:41', '2025-10-14 15:15:52'),
(5, 46, 0, 3, 0, 14, 1, 1, 0, 1, 'Madurai Main Bus Stand', '2025-10-14 10:00:00', '9.93778705995', '78.130375853908', 'Madurai Airport', '9.9364343714017', '78.105656614573', 1, 2, 0, 33.55, 27.5, 0, 0, 6.05, '', 4, 1, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2025-10-14 15:50:06', '2025-10-14 15:50:22'),
(6, 1, 0, 3, 0, 0, 1, 1, 0, 1, 'palanganatham', '2025-10-20 00:00:00', '9.900820', '78.088310', 'avaniyapuram', '9.924840', '78.088249', 1, 3, 0, 12.2, 10, 0, 0, 2.2, '', 4, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2025-10-14 15:53:14', '2025-10-14 15:53:28'),
(7, 3, 0, 3, 0, 1.1, 1, 1, 0, 1, 'SS Colony, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', '2025-10-14 15:51:05', '9.9190391901639', '78.09004119997', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 1, 3, 1, 13.88, 11.38, 0, 0, 2.5, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-10-14 15:53:36', '2025-10-14 15:53:48'),
(8, 1, 0, 1, 0, 6.12, 1, 1, 0, 1, 'SS Colony, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', '2025-10-17 15:14:52', '9.9123520712251', '78.091811972638', 'Madurai, Madurai South, Madurai, Tamil Nadu, 625002, India', '9.9349080610953', '78.11977498383', 1, 3, 1, 21.53, 17.65, 0, 0, 3.88, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-10-17 15:15:00', '2025-10-17 15:15:09'),
(9, 2, 0, 3, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 3, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2025-10-17 18:05:45', '2025-10-22 15:54:48'),
(10, 5, 0, 1, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 4, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2025-10-17 18:44:35', '2025-10-27 17:22:10'),
(11, 5, 0, 1, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 4, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2025-10-22 10:35:32', '2025-10-22 10:35:46'),
(12, 11, 0, 1, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 4, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2025-10-22 11:25:55', '2025-10-22 11:26:54'),
(13, 12, 0, 1, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 4, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2025-10-22 11:26:51', '2025-10-22 11:27:05'),
(14, 11, 0, 1, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 4, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2025-10-22 11:29:58', '2025-10-22 11:30:11'),
(15, 12, 0, 1, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 6, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2025-10-22 11:34:09', '2025-12-30 16:22:51'),
(16, 12, 0, 1, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 4, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2025-10-22 11:38:20', '2025-10-22 11:38:34'),
(17, 13, 0, 1, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 4, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2025-10-22 11:39:00', '2025-10-22 11:39:13'),
(18, 13, 2, 1, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 4, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2025-10-22 11:40:31', '2025-10-22 11:42:14'),
(19, 14, 1, 1, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 4, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2025-10-22 11:41:21', '2025-10-22 11:42:14'),
(20, 1, 0, 1, 0, 9.49, 1, 1, 0, 1, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '2025-10-22 11:41:27', '9.9101923736469', '78.089272790695', 'Madurai, Madurai North, Madurai, Tamil Nadu, 625007, India', '9.949531101934', '78.137652917789', 1, 3, 1, 26.67, 21.86, 0, 0, 4.81, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-10-22 11:42:22', '2025-10-22 11:42:31'),
(21, 13, 2, 1, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 4, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2025-10-22 11:46:26', '2025-10-22 11:46:38'),
(22, 14, 1, 1, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-22 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 4, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2025-10-22 14:02:57', '2025-10-22 14:03:10'),
(23, 1, 0, 1, 2, 4.74, 1, 1, 0, 1, 'Ellis Nagar, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '2025-10-22 14:44:12', '9.9102123767693', '78.089952076756', 'Arappalayam Pradhna Salai, Arappalayam, Madurai, Madurai South, Madurai, Tamil Nadu, 625017, India', '9.9295994166994', '78.113519774417', 1, 3, 1, 19.43, 15.93, 0, 0, 3.5, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-10-22 14:44:23', '2025-10-22 14:44:57'),
(24, 6, 0, 2, 0, 18.72, 3, 1, 0, 1, 'Obio/Akpor, Rivers, Nigeria', '2025-10-22 10:29:16', '4.8719252332283', '7.0709941860517', 'Eleme, Rivers', '4.7506524', '7.1474252121699', 1, 99, 1, 403.58, 330.8, 0, 0, 72.78, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-10-22 15:00:55', '2025-10-22 15:01:14'),
(25, 14, 2, 3, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-22 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 3, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2025-10-22 15:55:21', '2025-10-22 15:55:27'),
(26, 14, 2, 3, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-22 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 3, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2025-10-22 16:04:59', '2025-10-22 16:05:04'),
(27, 14, 2, 3, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-22 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 4, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2025-10-22 18:27:58', '2025-10-22 18:28:13'),
(28, 20, 2, 3, 0, 0, 1, 1, 0, 1, 'Ponmeni, Madurai, Tamil Nadu', '2025-10-22 13:04:45', '9.9278523', '78.0906824', 'Palanganatham, Madurai, Tamil Nadu', '9.9040093', '78.0962583', 0, 3, 0, 12.2, 10, 0, 0, 2.2, '', 3, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2025-10-22 18:34:47', '2025-10-22 18:34:59'),
(29, 21, 2, 3, 0, 0, 1, 1, 0, 1, 'Ponmeni, Madurai, Tamil Nadu', '2025-10-23 05:00:33', '9.9278523', '78.0906824', 'Palanganatham, Madurai, Tamil Nadu', '9.9040093', '78.0962583', 0, 3, 0, 12.2, 10, 0, 0, 2.2, '', 3, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2025-10-23 10:30:35', '2025-10-23 10:30:44'),
(30, 16, 2, 3, 0, 2.81, 1, 1, 0, 1, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '2025-10-23 15:59:59', '9.9103683333334', '78.089603333333', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 1, 3, 1, 16.48, 13.51, 0, 0, 2.97, '', 4, 0, '97002336', 0, NULL, NULL, NULL, NULL, NULL, '2025-10-23 16:00:46', '2025-10-23 16:01:20'),
(31, 16, 2, 3, 0, 2.81, 1, 1, 0, 1, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '2025-10-23 15:59:59', '9.9103683333334', '78.089603333333', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 1, 3, 1, 16.48, 13.51, 0, 0, 2.97, '', 3, 0, '9750236', 1, NULL, NULL, NULL, NULL, NULL, '2025-10-23 16:01:39', '2025-10-23 16:01:46'),
(32, 16, 2, 3, 0, 2.81, 1, 1, 0, 1, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '2025-10-23 16:09:54', '9.9103683333333', '78.089603333333', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 1, 3, 1, 16.48, 13.51, 0, 0, 2.97, '', 3, 0, '97502336', 1, NULL, NULL, NULL, NULL, NULL, '2025-10-23 16:10:13', '2025-10-23 16:10:26'),
(33, 16, 2, 3, 0, 2.81, 1, 1, 0, 1, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '2025-10-23 16:10:59', '9.9103683333334', '78.089603333333', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 1, 3, 1, 16.48, 13.51, 0, 0, 2.97, '', 3, 0, '82685', 1, NULL, NULL, NULL, NULL, NULL, '2025-10-23 16:11:16', '2025-10-23 16:11:25'),
(34, 16, 2, 3, 0, 2.81, 1, 1, 0, 1, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '2025-10-23 16:20:16', '9.9103683333334', '78.089603333333', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 1, 3, 1, 16.48, 13.51, 0, 0, 2.97, '', 3, 0, '685569', 1, NULL, NULL, NULL, NULL, NULL, '2025-10-23 16:21:02', '2025-10-23 16:21:19'),
(35, 5, 0, 3, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 4, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2025-10-23 17:02:59', '2025-10-23 17:03:13'),
(36, 1, 1, 3, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 6, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2025-10-23 17:09:35', '2025-10-23 19:19:07'),
(37, 0, 1, 3, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 6, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2025-10-23 17:45:03', '2025-10-23 19:18:50'),
(45, 3, 2, 5, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 1, 18.15, 14.88, 2, 0, 3.27, '', 6, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2025-10-23 19:13:53', '2025-10-23 19:18:35'),
(46, 2, 0, 3, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 3, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2025-10-23 19:19:26', '2025-10-27 13:50:45'),
(47, 0, 2, 5, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 6, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2025-10-23 19:19:56', '2025-10-23 19:20:40'),
(48, 0, 2, 5, 0, 0, 1, 1, 0, 1, 'Ponmeni, Madurai, Tamil Nadu', '2025-10-23 13:52:15', '9.9278523', '78.0906824', 'Palanganatham, Madurai, Tamil Nadu', '9.9040093', '78.0962583', 0, 3, 0, 12.2, 10, 0, 0, 2.2, '', 6, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2025-10-23 19:22:17', '2025-10-23 19:22:51'),
(49, 0, 2, 5, 0, 0, 1, 1, 0, 1, 'Ponmeni, Madurai, Tamil Nadu', '2025-10-23 14:01:13', '9.9278523', '78.0906824', 'Palanganatham, Madurai, Tamil Nadu', '9.9040093', '78.0962583', 0, 3, 0, 12.2, 10, 0, 0, 2.2, '', 4, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2025-10-23 19:31:15', '2025-10-23 19:31:31'),
(50, 0, 2, 5, 0, 0, 1, 1, 0, 1, 'Ponmeni, Madurai, Tamil Nadu', '2025-10-23 14:04:14', '9.9278523', '78.0906824', 'Palanganatham Bus Stand Rd, Madurai, Tamil Nadu', '9.9067777377098', '78.090952053858', 0, 3, 0, 12.2, 10, 0, 0, 2.2, '', 4, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2025-10-23 19:34:16', '2025-10-23 19:34:31'),
(51, 22, 0, 5, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 4, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2025-10-24 09:38:51', '2025-10-24 09:39:15'),
(52, 0, 1, 5, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 6, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2025-10-24 09:44:04', '2025-10-24 10:05:36'),
(53, 18, 0, 5, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 3, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2025-10-24 10:06:12', '2025-10-24 10:06:19'),
(54, 0, 1, 5, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 6, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2025-10-24 10:07:29', '2025-10-24 10:09:07'),
(55, 0, 1, 5, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 6, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2025-10-24 10:12:34', '2025-10-24 10:13:06'),
(56, 0, 2, 5, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 4, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2025-10-24 10:16:46', '2025-10-24 10:17:02'),
(57, 0, 2, 5, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 4, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2025-10-24 10:24:16', '2025-10-24 10:24:30'),
(58, 0, 2, 5, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 4, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2025-10-24 10:27:02', '2025-10-24 10:27:17'),
(59, 0, 2, 5, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 4, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2025-10-24 10:39:21', '2025-10-24 10:39:37'),
(60, 0, 2, 5, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 6, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2025-10-24 10:43:11', '2025-10-24 10:43:40'),
(61, 0, 2, 0, 0, 0, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 0, 0, 0, 0, 0, NULL, 1, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2025-10-24 10:56:47', '2025-10-24 10:56:47'),
(62, 0, 2, 5, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 6, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2025-10-24 10:56:47', '2025-10-24 10:57:29'),
(63, 0, 2, 0, 0, 0, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 0, 0, 0, 0, 0, NULL, 1, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2025-10-24 11:01:37', '2025-10-24 11:01:37'),
(64, 0, 2, 5, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 4, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2025-10-24 11:01:37', '2025-10-24 11:01:53'),
(65, 17, 0, 5, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 6, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2025-10-24 11:37:13', '2025-10-24 11:37:47'),
(66, 17, 0, 5, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 3, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2025-10-24 11:37:57', '2025-10-24 11:38:06'),
(67, 0, 2, 5, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 6, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2025-10-24 11:38:31', '2025-10-24 11:39:38'),
(68, 0, 2, 5, 0, 7.55, 1, 1, 0, 1, 'Ponmeni, Madurai, Tamil Nadu', '2025-10-24 07:30:19', '9.9278523', '78.0906824', 'Madakulam Kanmai, Madurai, Tamil Nadu', '9.91781745', '78.075001393904', 1, 3, 0, 23.72, 19.44, 0, 0, 4.28, '', 4, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2025-10-24 13:00:22', '2025-10-24 13:00:38'),
(69, 0, 2, 5, 0, 3.2, 1, 1, 0, 1, 'Ponmeni, Madurai, Tamil Nadu', '2025-10-24 07:31:09', '9.9278523', '78.0906824', 'Palanganatham Bus Stand Rd, Madurai, Tamil Nadu', '9.9067777377098', '78.090952053858', 1, 3, 0, 17.08, 14, 0, 0, 3.08, '', 4, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2025-10-24 13:01:11', '2025-10-24 13:01:26'),
(70, 0, 2, 5, 0, 3.34, 1, 1, 0, 1, 'Ponmeni, Madurai, Tamil Nadu', '2025-10-24 07:33:00', '9.9278523', '78.0906824', 'Palanganatham, Madurai, Tamil Nadu', '9.9040093', '78.0962583', 1, 3, 0, 17.3, 14.18, 0, 0, 3.12, '', 6, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2025-10-24 13:03:03', '2025-10-24 16:03:01'),
(71, 0, 2, 5, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 6, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2025-10-24 16:04:39', '2025-10-24 16:05:20'),
(72, 0, 1, 5, 0, 8.51, 1, 1, 0, 1, 'Ponmeni, Virattippathu, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', '2025-10-24 10:45:19', '9.9221591', '78.0801581', 'Madakulam Kanmai, Madurai, Tamil Nadu', '9.91781745', '78.075001393904', 0, 3, 0, 25.18, 20.64, 0, 0, 4.54, '', 6, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2025-10-24 16:15:24', '2025-10-24 16:16:16'),
(73, 0, 1, 5, 0, 8.51, 1, 1, 0, 1, 'Ponmeni, Virattippathu, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', '2025-10-24 10:47:15', '9.9221591', '78.0801581', 'Madakulam Kanmai, Madurai, Tamil Nadu', '9.91781745', '78.075001393904', 0, 3, 0, 25.18, 20.64, 0, 0, 4.54, '', 6, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2025-10-24 16:17:18', '2025-10-24 16:18:10'),
(74, 0, 1, 5, 0, 8.51, 1, 1, 0, 1, 'Ponmeni, Virattippathu, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', '2025-10-24 10:48:52', '9.9221591', '78.0801581', 'Madakulam Kanmai, Madurai, Tamil Nadu', '9.91781745', '78.075001393904', 0, 3, 0, 25.18, 20.64, 0, 0, 4.54, '', 6, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2025-10-24 16:18:55', '2025-10-24 16:27:45'),
(75, 21, 0, 5, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 6, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2025-10-24 16:28:19', '2025-10-24 16:33:05'),
(76, 21, 0, 5, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 6, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2025-10-24 16:29:27', '2025-10-24 16:33:15'),
(77, 21, 0, 5, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 6, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2025-10-24 16:30:06', '2025-10-24 16:33:24'),
(78, 0, 1, 5, 0, 8.51, 1, 1, 0, 1, 'Ponmeni, Virattippathu, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', '2025-10-24 11:03:59', '9.9221591', '78.0801581', 'Madakulam Kanmai, Madurai, Tamil Nadu', '9.91781745', '78.075001393904', 0, 3, 0, 25.18, 20.64, 0, 0, 4.54, '', 6, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2025-10-24 16:34:05', '2025-10-24 16:35:23'),
(79, 21, 0, 5, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 3, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2025-10-24 16:35:53', '2025-10-24 16:36:21'),
(80, 0, 1, 5, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 6, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2025-10-24 16:37:08', '2025-10-24 16:39:14'),
(81, 0, 1, 5, 0, 8.51, 1, 1, 0, 1, 'Ponmeni, Virattippathu, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', '2025-10-24 11:16:55', '9.9221591', '78.0801581', 'Madakulam Kanmai, Madurai, Tamil Nadu', '9.91781745', '78.075001393904', 0, 3, 0, 25.18, 20.64, 0, 0, 4.54, '', 6, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2025-10-24 16:46:59', '2025-10-24 16:48:35'),
(82, 0, 1, 5, 0, 8.51, 1, 1, 0, 1, 'Ponmeni, Virattippathu, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', '2025-10-24 11:25:04', '9.9221591', '78.0801581', 'Madakulam Kanmai, Madurai, Tamil Nadu', '9.91781745', '78.075001393904', 0, 3, 0, 25.18, 20.64, 0, 0, 4.54, '', 6, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2025-10-24 16:55:08', '2025-10-24 17:03:40'),
(83, 0, 1, 5, 0, 8.51, 1, 1, 0, 1, 'Ponmeni, Virattippathu, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', '2025-10-24 11:35:15', '9.9221591', '78.0801581', 'Madakulam Kanmai, Madurai, Tamil Nadu', '9.91781745', '78.075001393904', 0, 3, 0, 25.18, 20.64, 0, 0, 4.54, '', 6, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2025-10-24 17:05:17', '2025-10-24 18:15:49'),
(84, 0, 1, 5, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 6, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2025-10-24 18:16:46', '2025-10-24 18:18:20'),
(85, 22, 0, 5, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 3, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2025-10-24 18:22:06', '2025-10-27 17:14:37'),
(86, 0, 1, 5, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 3, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2025-10-24 18:30:09', '2025-10-24 18:30:54'),
(87, 0, 2, 5, 0, 2.18, 1, 1, 0, 1, 'Theosophical Society, Payaniyar Viduthi Salai, Kalavasal, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', '2025-10-25 05:00:04', '9.9235292', '78.1022618', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 0, 3, 0, 15.53, 12.73, 0, 0, 2.8, '', 6, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2025-10-25 10:30:07', '2025-10-25 11:07:23'),
(88, 0, 5, 5, 0, 9.03, 1, 1, 0, 1, 'Theosophical Society, Payaniyar Viduthi Salai, Kalavasal, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', '2025-10-25 05:38:52', '9.9235292', '78.1022618', 'Madakulam Kanmai, Madurai, Tamil Nadu', '9.91781745', '78.075001393904', 0, 3, 0, 25.97, 21.29, 0, 0, 4.68, '', 6, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2025-10-25 11:08:54', '2025-10-25 13:22:42'),
(89, 0, 4, 5, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 3, 0, NULL, 0, 'Riya', '+918776378493', NULL, NULL, NULL, '2025-10-25 13:23:32', '2025-10-25 13:24:25'),
(90, 0, 2, 5, 0, 11.51, 1, 1, 0, 1, 'Madakulam Kanmai, Madurai, Tamil Nadu', '2025-10-25 08:06:11', '9.91781745', '78.075001393904', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 0, 3, 0, 29.76, 24.39, 0, 0, 5.37, '', 4, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2025-10-25 13:36:14', '2025-10-25 13:36:29'),
(91, 0, 2, 5, 0, 9.03, 1, 1, 0, 1, 'Theosophical Society, Payaniyar Viduthi Salai, Kalavasal, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', '2025-10-25 08:09:35', '9.9235292', '78.1022618', 'Madakulam Kanmai, Madurai, Tamil Nadu', '9.91781745', '78.075001393904', 0, 3, 0, 25.97, 21.29, 0, 0, 4.68, '', 4, 0, NULL, 0, 'Yamuna', '+919442443232', NULL, NULL, NULL, '2025-10-25 13:39:37', '2025-10-25 13:39:52'),
(92, 0, 2, 5, 0, 10.62, 1, 1, 0, 1, 'Periyar Bus Stand Public Toilet, Madurai, Tamil Nadu', '2025-10-25 08:10:39', '9.9159507', '78.111777', 'Madakulam Kanmai, Madurai, Tamil Nadu', '9.91781745', '78.075001393904', 0, 3, 0, 28.4, 23.28, 0, 0, 5.12, '', 6, 0, NULL, 0, NULL, '+919487347343', NULL, NULL, NULL, '2025-10-25 13:40:42', '2025-10-25 18:41:10'),
(93, 0, 2, 5, 0, 11.51, 1, 1, 0, 1, 'Madakulam Kanmai, Madurai, Tamil Nadu', '2025-10-25 12:12:46', '9.91781745', '78.075001393904', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 0, 3, 0, 29.76, 24.39, 0, 0, 5.37, '', 6, 0, NULL, 1, NULL, '+2349982382323', NULL, NULL, NULL, '2025-10-25 17:42:48', '2025-10-25 18:41:04'),
(94, 16, NULL, 5, 0, 2.87, 1, 1, 0, 1, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '2025-10-25 18:40:47', '9.9102183333333', '78.089403333333', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 1, 3, 1, 16.58, 13.59, 0, 0, 2.99, '', 6, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-10-25 18:41:19', '2025-10-27 10:57:48'),
(95, 1, NULL, 1, 0, 10.46, 1, 1, 0, 1, 'Tirumangalam, Thirumangalam, Madurai, Tamil Nadu, 626706, India', '2025-10-26 00:29:25', '9.8323021533113', '77.979531694855', 'Thirupparankundram, Madurai, Madurai South, Madurai, Tamil Nadu, 625005, India', '9.8867855093479', '78.039703419794', 1, 3, 1, 28.16, 23.08, 0, 0, 5.08, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-10-26 00:34:24', '2025-10-26 00:34:38'),
(96, 0, 2, 5, 0, 11.51, 1, 1, 0, 1, 'Madakulam Kanmai, Madurai, Tamil Nadu', '2025-10-27 04:50:45', '9.91781745', '78.075001393904', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 0, 3, 0, 29.76, 24.39, 0, 0, 5.37, '', 3, 0, NULL, 1, NULL, '+919872232323', NULL, NULL, NULL, '2025-10-27 10:20:48', '2025-10-27 10:57:43'),
(97, 24, NULL, 1, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 3, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2025-10-27 10:59:35', '2025-10-27 10:59:52'),
(98, 7, NULL, 5, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 4, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2025-10-27 11:06:17', '2025-10-27 14:21:53'),
(99, 26, NULL, 1, 0, 2.87, 1, 1, 0, 1, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '2025-10-27 11:16:50', '9.9102083333333', '78.089323333333', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 1, 3, 1, 16.58, 13.59, 0, 0, 2.99, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-10-27 11:16:56', '2025-10-27 11:17:15'),
(100, 20, NULL, 1, 0, 2.88, 1, 1, 0, 1, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '2025-10-27 11:46:59', '9.910145', '78.089363333333', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 1, 3, 1, 16.59, 13.6, 0, 0, 2.99, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-10-27 11:47:17', '2025-10-27 13:49:40'),
(101, 0, 2, 1, 0, 9.4, 1, 1, 0, 1, 'Palanganatham Bus Stand Rd, Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '2025-10-27 07:36:57', '9.907395494117', '78.091039677244', 'Madakulam Kanmai, Madurai, Tamil Nadu', '9.91781745', '78.075001393904', 0, 3, 0, 26.54, 21.75, 0, 0, 4.79, '', 4, 0, NULL, 1, NULL, '+919232636266', NULL, NULL, NULL, '2025-10-27 13:06:59', '2025-10-27 14:01:31'),
(102, 0, 4, 6, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-10-08 14:30:00', '9.8269535011879', '77.985737953289', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 1, 0, NULL, 1, 'Riya', '+918776378493', NULL, NULL, NULL, '2025-10-27 13:24:53', '2025-10-27 13:44:00'),
(103, 0, 4, 6, 0, 3.9, 1, 1, 0, 1, 'TMM', '2025-10-08 14:30:00', '9.8269535011879', '77.985737953289', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 1, 0, NULL, 1, 'Riya', '+918776378493', NULL, NULL, NULL, '2025-10-27 13:29:10', '2025-10-27 17:28:38'),
(104, 0, 6, 6, 0, 11.51, 1, 1, 0, 1, 'Madakulam Kanmai, Madurai, Tamil Nadu', '2025-10-27 08:15:47', '9.91781745', '78.075001393904', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 0, 3, 0, 29.76, 24.39, 0, 0, 5.37, '', 3, 0, NULL, 1, NULL, '+919723623623', NULL, NULL, NULL, '2025-10-27 13:45:49', '2025-10-27 13:49:50'),
(105, 0, 6, 3, 0, 9, 1, 1, 0, 1, 'S S Colony, SS Colony, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', '2025-10-27 08:27:52', '9.9225697', '78.0994099', 'Madakulam Kanmai, Madurai, Tamil Nadu', '9.91781745', '78.075001393904', 0, 3, 0, 25.93, 21.25, 0, 0, 4.68, '', 3, 0, NULL, 1, NULL, '+917466462462', NULL, NULL, NULL, '2025-10-27 13:57:54', '2025-10-27 13:58:10'),
(106, 0, 6, 6, 0, 9, 1, 1, 0, 1, 'S S Colony, SS Colony, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', '2025-10-27 08:31:48', '9.9225697', '78.0994099', 'Madakulam Kanmai, Madurai, Tamil Nadu', '9.91781745', '78.075001393904', 0, 3, 0, 25.93, 21.25, 0, 0, 4.68, '', 3, 0, NULL, 1, NULL, '+918613216251', NULL, NULL, NULL, '2025-10-27 14:01:50', '2025-10-27 14:04:16'),
(107, 16, NULL, 6, 0, 8.55, 1, 1, 0, 1, 'Tirumangalam, Thirumangalam, Madurai, Tamil Nadu, 626706, India', '2025-10-27 14:03:18', '9.8325429', '77.9797135', 'Harveypatti, Thirupparankundram, Madurai, Madurai South, Madurai, Tamil Nadu, 625005, India', '9.8536605382983', '78.04754366255', 1, 3, 1, 25.24, 20.69, 0, 0, 4.55, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-10-27 14:04:54', '2025-10-27 14:05:03'),
(108, 0, 6, 1, 0, 11.51, 1, 1, 0, 1, 'Madakulam Kanmai, Madurai, Tamil Nadu', '2025-10-27 08:40:03', '9.91781745', '78.075001393904', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 0, 3, 0, 29.76, 24.39, 0, 0, 5.37, '', 3, 0, NULL, 1, NULL, '+916723232323', NULL, NULL, NULL, '2025-10-27 14:10:06', '2025-10-27 14:10:17'),
(109, 16, NULL, 6, 0, 4.01, 1, 1, 0, 1, 'Tirumangalam, Thirumangalam, Madurai, Tamil Nadu, 626706, India', '2025-10-27 14:06:18', '9.8325429', '77.9797135', 'Kappalur, Thirumangalam, Madurai, Tamil Nadu, 625706, India', '9.8415068407554', '78.009345068347', 1, 3, 1, 18.31, 15.01, 0, 0, 3.3, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-10-27 14:15:49', '2025-10-27 14:16:00'),
(110, 0, 1, 5, 0, 11.51, 1, 1, 0, 1, 'Madakulam Kanmai, Madurai, Tamil Nadu', '2025-10-27 08:52:01', '9.91781745', '78.075001393904', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 0, 3, 0, 29.76, 24.39, 0, 0, 5.37, '', 3, 0, NULL, 1, NULL, '+919237232323', NULL, NULL, NULL, '2025-10-27 14:22:05', '2025-10-27 14:22:11'),
(111, 16, NULL, 5, 0, 8.28, 1, 1, 0, 1, 'Tirumangalam, Thirumangalam, Madurai, Tamil Nadu, 626706, India', '2025-10-27 14:25:18', '9.8325429', '77.9797135', 'Thirupparankundram, Madurai, Madurai South, Madurai, Tamil Nadu, 625005, India', '9.8534673791845', '78.042191810237', 1, 3, 1, 24.83, 20.35, 0, 0, 4.48, '', 6, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-10-27 14:25:29', '2025-10-27 14:25:42'),
(112, 16, NULL, 5, 0, 8.28, 1, 1, 0, 1, 'Tirumangalam, Thirumangalam, Madurai, Tamil Nadu, 626706, India', '2025-10-27 14:25:18', '9.8325429', '77.9797135', 'Thirupparankundram, Madurai, Madurai South, Madurai, Tamil Nadu, 625005, India', '9.8534673791845', '78.042191810237', 1, 3, 1, 24.83, 20.35, 0, 0, 4.48, '', 6, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-10-27 14:25:46', '2025-10-27 14:25:55'),
(113, 16, NULL, 6, 0, 8.28, 1, 1, 0, 1, 'Tirumangalam, Thirumangalam, Madurai, Tamil Nadu, 626706, India', '2025-10-27 14:25:18', '9.8325429', '77.9797135', 'Thirupparankundram, Madurai, Madurai South, Madurai, Tamil Nadu, 625005, India', '9.8534673791845', '78.042191810237', 1, 3, 1, 24.83, 20.35, 0, 0, 4.48, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-10-27 14:26:04', '2025-10-27 14:26:13'),
(114, 0, 1, 6, 0, 11.51, 1, 1, 0, 1, 'Madakulam Kanmai, Madurai, Tamil Nadu', '2025-10-27 09:05:00', '9.91781745', '78.075001393904', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 0, 3, 1, 29.76, 24.39, 0, 0, 5.37, '', 3, 0, NULL, 0, NULL, '+919121781721', NULL, NULL, NULL, '2025-10-27 14:35:02', '2025-10-27 14:37:21'),
(115, 0, 1, 5, 0, 11.51, 1, 1, 0, 1, 'Madakulam Kanmai, Madurai, Tamil Nadu', '2025-10-27 09:06:36', '9.91781745', '78.075001393904', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 0, 3, 1, 29.76, 24.39, 0, 0, 5.37, '', 3, 0, NULL, 1, 'Radhi', '+919121261212', NULL, NULL, NULL, '2025-10-27 14:36:38', '2025-10-27 14:36:45'),
(116, 16, NULL, 1, 0, 10.38, 1, 1, 0, 1, 'Tirumangalam, Thirumangalam, Madurai, Tamil Nadu, 626706, India', '2025-10-27 14:36:37', '9.8325429', '77.9797135', 'Thirupparankundram, Madurai, Madurai South, Madurai, Tamil Nadu, 625005, India', '9.8857284160211', '78.04009266874', 1, 3, 1, 28.04, 22.98, 0, 0, 5.06, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-10-27 14:37:59', '2025-10-27 14:38:08'),
(117, 20, NULL, 1, 0, 2.87, 1, 1, 0, 1, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '2025-10-27 14:39:32', '9.9101933333333', '78.08938', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 1, 3, 1, 16.58, 13.59, 0, 0, 2.99, '', 4, 0, 'null', 0, NULL, NULL, NULL, NULL, NULL, '2025-10-27 14:39:52', '2025-10-27 14:40:04'),
(118, 20, NULL, 1, 0, 2.87, 1, 1, 0, 1, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '2025-10-27 14:39:32', '9.9101933333333', '78.08938', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 1, 3, 1, 16.58, 13.59, 0, 0, 2.99, '', 4, 0, 'null', 0, NULL, NULL, NULL, NULL, NULL, '2025-10-27 14:40:48', '2025-10-27 14:40:56'),
(119, 16, NULL, 1, 0, 4.59, 1, 1, 0, 1, 'Tirumangalam, Thirumangalam, Madurai, Tamil Nadu, 626706, India', '2025-10-27 14:40:17', '9.8325429', '77.9797135', 'Kappalur, Thirumangalam, Madurai, Tamil Nadu, 625706, India', '9.8449119178257', '78.006413419461', 1, 3, 1, 19.2, 15.74, 0, 0, 3.46, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-10-27 14:41:07', '2025-10-27 14:41:15'),
(120, 20, NULL, 6, 0, 2.87, 1, 1, 0, 1, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '2025-10-27 14:47:20', '9.9102216666667', '78.089358333333', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 1, 3, 1, 16.58, 13.59, 0, 0, 2.99, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-10-27 14:47:25', '2025-10-27 14:47:40'),
(121, 16, NULL, 1, 0, 2.36, 1, 1, 0, 1, 'Tirumangalam, Thirumangalam, Madurai, Tamil Nadu, 626706, India', '2025-10-27 14:47:38', '9.8325429', '77.9797135', 'Tirumangalam, Thirumangalam, Madurai, Tamil Nadu, 626706, India', '9.8385967946632', '77.997049617169', 1, 3, 1, 15.8, 12.95, 0, 0, 2.85, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-10-27 14:48:22', '2025-10-27 14:48:28'),
(122, 0, 1, 6, 0, 11.51, 1, 1, 0, 1, 'Madakulam Kanmai, Madurai, Tamil Nadu', '2025-10-27 09:29:05', '9.91781745', '78.075001393904', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 0, 3, 1, 29.76, 24.39, 0, 0, 5.37, '', 3, 0, NULL, 1, NULL, '+919282182781', NULL, NULL, NULL, '2025-10-27 14:59:07', '2025-10-27 14:59:19'),
(123, 16, NULL, 6, 0, 4.08, 1, 1, 0, 1, 'Tirumangalam, Thirumangalam, Madurai, Tamil Nadu, 626706, India', '2025-10-27 15:01:59', '9.8325429', '77.9797135', 'Kappalur, Thirumangalam, Madurai, Tamil Nadu, 625706, India', '9.8450892077637', '77.998575031203', 1, 3, 1, 18.42, 15.1, 0, 0, 3.32, '', 4, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-10-27 15:03:08', '2025-10-27 17:14:45'),
(124, 16, NULL, 1, 0, 4.08, 1, 1, 0, 1, 'Tirumangalam, Thirumangalam, Madurai, Tamil Nadu, 626706, India', '2025-10-27 15:01:59', '9.8325429', '77.9797135', 'Kappalur, Thirumangalam, Madurai, Tamil Nadu, 625706, India', '9.8450892077637', '77.998575031203', 1, 3, 1, 18.42, 15.1, 0, 0, 3.32, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-10-27 15:04:55', '2025-10-27 15:05:03'),
(125, 0, 6, 1, 0, 11.51, 1, 1, 0, 1, 'Madakulam Kanmai, Madurai, Tamil Nadu', '2025-10-27 09:59:17', '9.91781745', '78.075001393904', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 0, 3, 1, 29.76, 24.39, 0, 0, 5.37, '', 3, 0, NULL, 0, NULL, '+919236235232', NULL, NULL, NULL, '2025-10-27 15:29:19', '2025-10-27 15:29:34'),
(126, 0, 6, 1, 0, 4.54, 1, 1, 0, 1, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625004, India', '2025-10-27 10:33:28', '9.9054508221098', '78.081340809444', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 0, 3, 1, 19.13, 15.68, 0, 0, 3.45, '', 3, 0, NULL, 1, NULL, '+918273263263', NULL, NULL, NULL, '2025-10-27 16:03:31', '2025-10-27 21:32:27'),
(127, 0, 6, 7, 0, 11.51, 1, 1, 0, 1, 'Madakulam Kanmai, Madurai, Tamil Nadu', '2025-10-27 10:55:34', '9.91781745', '78.075001393904', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 0, 3, 1, 29.76, 24.39, 0, 0, 5.37, '', 3, 0, NULL, 1, NULL, '+918132326323', NULL, NULL, NULL, '2025-10-27 16:25:36', '2025-10-27 17:21:30'),
(128, 28, NULL, 7, 0, 2.86, 1, 1, 0, 1, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '2025-10-27 17:18:18', '9.9098338194121', '78.089791324915', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 1, 3, 1, 16.57, 13.58, 0, 0, 2.99, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-10-27 17:18:32', '2025-10-27 17:18:54'),
(129, 28, NULL, 7, 0, 2.88, 1, 1, 0, 1, 'Ellis Nagar, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '2025-10-27 17:28:51', '9.9101633333334', '78.089516666667', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 1, 3, 1, 16.59, 13.6, 0, 0, 2.99, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-10-27 17:28:59', '2025-10-27 17:29:17'),
(130, 0, 5, 7, 0, 0, 1, 1, 0, 1, 'Vadipatti, Tamil Nadu', '2025-10-27 12:02:48', '10.0790057', '78.03600140899', 'Madurai, Tamil Nadu', '9.833333', '77.833333', 0, 3, 0, 12.2, 10, 0, 0, 2.2, '', 3, 0, NULL, 1, 'varshini', '+918220638053', NULL, NULL, NULL, '2025-10-27 17:32:51', '2025-10-27 17:33:00'),
(131, 0, 6, 7, 0, 11.51, 1, 1, 0, 1, 'Madakulam Kanmai, Madurai, Tamil Nadu', '2025-10-27 12:27:58', '9.91781745', '78.075001393904', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 0, 3, 1, 29.76, 24.39, 0, 0, 5.37, '', 3, 0, NULL, 1, NULL, '+918372372362', NULL, NULL, NULL, '2025-10-27 17:58:01', '2025-10-27 17:58:18'),
(132, 0, 7, 1, 0, 11.51, 1, 1, 0, 1, 'Madakulam Kanmai, Madurai, Tamil Nadu', '2025-10-28 05:23:59', '9.91781745', '78.075001393904', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 0, 3, 1, 29.76, 24.39, 0, 0, 5.37, '', 3, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2025-10-28 10:54:01', '2025-10-28 10:54:12'),
(133, 30, NULL, 1, 0, 2.87, 1, 1, 0, 1, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '2025-10-28 10:58:12', '9.9102283333333', '78.089383333333', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 1, 3, 1, 16.58, 13.59, 0, 0, 2.99, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-10-28 10:58:28', '2025-10-28 10:58:37'),
(134, 0, 7, 1, 0, 11.51, 1, 1, 0, 1, 'Madakulam Kanmai, Madurai, Tamil Nadu', '2025-10-28 05:47:52', '9.91781745', '78.075001393904', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 0, 3, 1, 29.76, 24.39, 0, 0, 5.37, '', 3, 0, NULL, 1, NULL, '+915216526121', NULL, NULL, NULL, '2025-10-28 11:17:54', '2025-10-28 11:18:12'),
(135, 0, 7, 1, 0, 11.18, 1, 1, 0, 1, 'Madakulam Kanmai, Madurai, Tamil Nadu', '2025-10-28 06:07:25', '9.91781745', '78.075001393904', 'Palanganatham, Madurai, Tamil Nadu', '9.9040093', '78.0962583', 0, 3, 1, 29.26, 23.98, 0, 0, 5.28, '', 3, 0, NULL, 1, NULL, '+919236262732', NULL, NULL, NULL, '2025-10-28 11:37:29', '2025-10-28 11:37:36'),
(136, 0, 7, 1, 0, 3.18, 1, 1, 0, 1, 'Railway Colony, SS Colony, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', '2025-10-28 06:19:05', '9.9242006', '78.1072523', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 0, 3, 1, 17.06, 13.98, 0, 0, 3.08, '', 3, 0, NULL, 1, NULL, '+919525325323', NULL, NULL, NULL, '2025-10-28 11:49:09', '2025-10-28 11:49:23'),
(137, 0, 7, 1, 0, 3.18, 1, 1, 0, 1, 'Railway Colony, SS Colony, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', '2025-10-28 06:51:28', '9.9242006', '78.1072523', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 0, 3, 1, 17.06, 13.98, 0, 0, 3.08, '', 3, 0, NULL, 1, NULL, '+918798236263', NULL, NULL, NULL, '2025-10-28 12:21:30', '2025-10-28 12:21:40');
INSERT INTO `trip_requests` (`id`, `customer_id`, `corporate_customer_id`, `driver_id`, `package_id`, `distance`, `vehicle_type`, `trip_type`, `trip_sub_type`, `booking_type`, `pickup_address`, `pickup_date`, `pickup_lat`, `pickup_lng`, `drop_address`, `drop_lat`, `drop_lng`, `surge`, `zone`, `payment_method`, `total`, `sub_total`, `promo`, `discount`, `tax`, `static_map`, `status`, `is_multiple_drops`, `contact`, `flag`, `agent_name`, `agent_phone_number`, `company_name`, `driver_note`, `customer_note`, `created_at`, `updated_at`) VALUES
(138, 0, 7, 1, 0, 5.24, 1, 1, 0, 1, 'Vilachery Main Road, Vilachery, Thirupparankundram, Madurai, Madurai South, Madurai, Tamil Nadu, 625005, India', '2025-10-28 07:19:20', '9.8979726', '78.0666083', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 0, 3, 1, 20.19, 16.55, 0, 0, 3.64, '', 3, 0, NULL, 1, NULL, '+91844322561', NULL, NULL, NULL, '2025-10-28 12:49:22', '2025-10-28 12:49:29'),
(139, 30, NULL, 1, 0, 2.87, 1, 1, 0, 1, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '2025-10-28 12:51:05', '9.9102154', '78.0893897', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 1, 3, 1, 16.58, 13.59, 0, 0, 2.99, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-10-28 12:51:23', '2025-10-28 12:51:31'),
(140, 0, 7, 9, 0, 11.51, 1, 1, 0, 1, 'Madakulam Kanmai, Madurai, Tamil Nadu', '2025-10-28 07:43:44', '9.91781745', '78.075001393904', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 0, 3, 1, 29.76, 24.39, 0, 0, 5.37, '', 3, 0, NULL, 1, NULL, '+918523232323', NULL, NULL, NULL, '2025-10-28 13:13:46', '2025-10-28 13:13:52'),
(141, 0, 7, 9, 0, 11.51, 1, 1, 0, 1, 'Madakulam Kanmai, Madurai, Tamil Nadu', '2025-10-28 08:55:12', '9.91781745', '78.075001393904', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 0, 3, 1, 29.76, 24.39, 0, 0, 5.37, '', 3, 0, NULL, 1, NULL, '+919223435353', NULL, NULL, NULL, '2025-10-28 14:25:14', '2025-10-28 14:25:20'),
(142, 0, 7, 9, 0, 11.18, 1, 1, 0, 1, 'Madakulam Kanmai, Madurai, Tamil Nadu', '2025-10-28 08:56:36', '9.91781745', '78.075001393904', 'Palanganatham, Madurai, Tamil Nadu', '9.9040093', '78.0962583', 0, 3, 1, 29.26, 23.98, 0, 0, 5.28, '', 3, 0, NULL, 1, NULL, '+918452532323', NULL, NULL, NULL, '2025-10-28 14:26:39', '2025-10-28 14:26:47'),
(143, 0, 8, 10, 0, 11.51, 1, 1, 0, 1, 'Madakulam Kanmai, Madurai, Tamil Nadu', '2025-11-03 07:36:22', '9.91781745', '78.075001393904', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 0, 3, 1, 29.76, 24.39, 0, 0, 5.37, '', 3, 0, NULL, 1, NULL, '+2349898877878', NULL, NULL, NULL, '2025-11-03 13:06:25', '2025-11-03 13:06:52'),
(144, 31, NULL, 10, 0, 2.87, 1, 1, 0, 1, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '2025-11-03 13:21:16', '9.9102162', '78.0893865', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 1, 3, 1, 16.58, 13.59, 0, 0, 2.99, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-11-03 13:21:53', '2025-11-03 13:22:08'),
(145, 0, 7, 10, 0, 1.44, 1, 1, 0, 1, 'S S Colony, SS Colony, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', '2025-12-05 05:33:53', '9.9225697', '78.0994099', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 0, 3, 1, 14.4, 11.8, 0, 0, 2.6, '', 1, 0, NULL, 0, 'sasas', '+919224243434', NULL, NULL, NULL, '2025-12-05 11:03:56', '2025-12-05 11:03:56'),
(146, 0, 7, 1, 0, 1.44, 1, 1, 0, 1, 'S S Colony, SS Colony, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', '2025-12-05 09:18:04', '9.9225697', '78.0994099', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 0, 3, 1, 14.4, 11.8, 0, 0, 2.6, '', 3, 0, NULL, 1, 'Yamuna', '+918277238728', NULL, NULL, NULL, '2025-12-05 14:48:07', '2025-12-05 14:48:17'),
(147, 32, NULL, 11, 0, 20.36, 2, 1, 0, 1, 'Thogoto, Karai ward, Kikuyu, Kiambu, Central Kenya, 00109, Kenya', '2025-12-08 10:05:44', '-1.2505107938088', '36.659439671133', 'Ruaka, Kiambu', '-1.205646', '36.7844571', 1, 99, 1, 309.39, 253.6, 0, 0, 55.79, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-12-08 10:08:50', '2025-12-08 10:09:08'),
(148, 32, NULL, 11, 0, 22.64, 2, 1, 0, 1, 'Wairere Apartments, Southern Bypass, Muguga, Mai A Ihii, Kikuyu, Kiambu, Central Kenya, 00109, Kenya', '2025-12-08 10:37:07', '-1.2582712', '36.6602663', 'Nairobi', '-1.2832533', '36.8172449', 1, 99, 1, 337.21, 276.4, 0, 0, 60.81, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-12-08 10:38:16', '2025-12-08 10:38:36'),
(149, 0, 7, 1, 0, 11.51, 1, 1, 0, 1, 'Madakulam Kanmai, Madurai, Tamil Nadu', '2025-12-12 10:43:06', '9.91781745', '78.075001393904', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 0, 3, 1, 29.76, 24.39, 0, 0, 5.37, '', 4, 0, NULL, 0, 'Rithish', '+919750023377', NULL, NULL, NULL, '2025-12-12 16:13:09', '2025-12-15 12:32:20'),
(150, 1, NULL, 1, 0, 3.8, 1, 1, 0, 1, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '2025-12-15 12:35:01', '9.9102214', '78.0893963', 'Railway Colony, SS Colony, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', '9.923722922681', '78.103958470396', 1, 3, 1, 18, 14.75, 0, 0, 3.25, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-12-15 12:35:50', '2025-12-15 12:35:57'),
(151, 1, NULL, 1, 2, 4.16, 1, 1, 0, 1, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '2025-12-15 13:18:16', '9.9102214', '78.0893963', 'Meenakshi Bazaar Road, Arappalayam, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', '9.9244415379512', '78.113166778029', 1, 3, 1, 18.54, 15.2, 0, 0, 3.34, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-12-15 13:18:36', '2025-12-15 13:18:43'),
(152, 0, 7, 1, 0, 3.34, 1, 1, 0, 1, 'Ponmeni, Madurai, Tamil Nadu', '2025-12-16 08:43:19', '9.9278523', '78.0906824', 'Palanganatham, Madurai, Tamil Nadu', '9.9040093', '78.0962583', 0, 3, 1, 17.3, 14.18, 0, 0, 3.12, '', 4, 0, NULL, 0, 'Rithish', '+919723232327', NULL, NULL, NULL, '2025-12-16 14:13:23', '2025-12-19 12:04:19'),
(153, 33, NULL, 12, 0, 20.71, 1, 1, 0, 1, 'Nairobi South ward, Starehe, Nairobi, 00507, Kenya', '2025-12-16 17:36:00', '-1.3203398541829', '36.856021094301', 'Ruaka, Kiambu', '-1.205646', '36.7844571', 1, 99, 1, 43.79, 35.89, 0, 0, 7.9, '', 6, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-12-16 19:07:35', '2025-12-16 19:08:49'),
(154, 33, NULL, 12, 0, 20.68, 1, 1, 0, 1, 'Nairobi South ward, Starehe, Nairobi, 00507, Kenya', '2025-12-17 16:39:00', '-1.3206913851218', '36.855272647606', 'Ruaka, Kiambu', '-1.205646', '36.7844571', 1, 99, 1, 43.74, 35.85, 0, 0, 7.89, '', 6, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-12-16 19:09:23', '2025-12-16 19:10:30'),
(155, 33, NULL, 12, 0, 20.68, 1, 1, 0, 1, 'Nairobi South ward, Starehe, Nairobi, 00507, Kenya', '2025-12-16 19:10:31', '-1.3206716666667', '36.855328333333', 'Ruaka, Kiambu', '-1.205646', '36.7844571', 1, 99, 1, 43.74, 35.85, 0, 0, 7.89, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-12-16 19:11:12', '2025-12-16 19:11:31'),
(156, 33, NULL, 12, 0, 20.65, 1, 1, 0, 1, 'Nairobi South ward, Starehe, Nairobi, 00507, Kenya', '2025-12-17 16:46:00', '-1.3207878', '36.8552412', 'Ruaka, Kiambu', '-1.205646', '36.7844571', 1, 99, 1, 43.69, 35.81, 0, 0, 7.88, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-12-16 19:17:16', '2025-12-16 19:17:33'),
(157, 33, NULL, 12, 0, 20.34, 1, 1, 0, 1, 'Nairobi South ward, Starehe, Nairobi, 00507, Kenya', '2025-12-16 16:50:23', '-1.3190366303203', '36.855035198892', 'Ruaka, Kiambu', '-1.205646', '36.7844571', 1, 99, 1, 43.22, 35.43, 0, 0, 7.79, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-12-16 19:23:27', '2025-12-16 19:23:44'),
(158, 33, NULL, 12, 0, 20.68, 1, 1, 0, 1, 'Nairobi South ward, Starehe, Nairobi, 00507, Kenya', '2025-12-18 08:40:00', '-1.3207367', '36.8552375', 'Ruaka, Kiambu', '-1.205646', '36.7844571', 1, 99, 1, 43.74, 35.85, 0, 0, 7.89, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-12-17 11:10:47', '2025-12-17 11:11:33'),
(159, 33, NULL, 12, 0, 4.24, 1, 1, 0, 1, 'Ndenderu, Ndenderu ward, Kiambaa, Kiambu, Central Kenya, 43563, Kenya', '2025-12-17 13:48:06', '-1.1989122265176', '36.755140321257', 'Banana, Banana, Kiambu', '-1.1736827', '36.7575458', 1, 99, 1, 18.67, 15.3, 0, 0, 3.37, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-12-17 13:48:38', '2025-12-17 13:48:55'),
(160, 33, NULL, 12, 0, 107.38, 1, 1, 0, 1, 'Karuri ward, Kiambaa, Kiambu, Central Kenya, 43563, Kenya', '2025-12-17 14:02:42', '-1.1927010403357', '36.754109115566', 'Banana Stop, Sagana, Kirinyaga', '-0.6191688', '37.2019802', 1, 99, 1, 175.96, 144.23, 0, 0, 31.73, '', 4, 0, 'null', 0, NULL, NULL, NULL, NULL, NULL, '2025-12-17 14:09:26', '2025-12-17 14:10:17'),
(161, 33, NULL, 12, 0, 106.47, 1, 1, 0, 1, 'Ndenderu, Ndenderu ward, Kiambaa, Kiambu, Central Kenya, 43563, Kenya', '2025-12-17 15:19:04', '-1.1978729', '36.7554183', 'Banana Stop, Sagana, Kirinyaga', '-0.6191688', '37.2019802', 1, 99, 1, 174.57, 143.09, 0, 0, 31.48, '', 6, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-12-17 15:19:54', '2025-12-17 15:22:12'),
(162, 33, NULL, 12, 0, 106.47, 1, 1, 0, 1, 'Ndenderu, Ndenderu ward, Kiambaa, Kiambu, Central Kenya, 43563, Kenya', '2025-12-17 15:19:04', '-1.1978729', '36.7554183', 'Banana Stop, Sagana, Kirinyaga', '-0.6191688', '37.2019802', 1, 99, 1, 174.57, 143.09, 0, 0, 31.48, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-12-17 15:22:43', '2025-12-17 15:22:57'),
(163, 33, NULL, 12, 0, 106.47, 1, 1, 0, 1, 'Ndenderu, Ndenderu ward, Kiambaa, Kiambu, Central Kenya, 43563, Kenya', '2025-12-18 12:55:00', '-1.1977747255125', '36.75545635342', 'Banana Stop, Sagana, Kirinyaga', '-0.6191688', '37.2019802', 1, 99, 1, 174.57, 143.09, 0, 0, 31.48, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-12-17 15:26:02', '2025-12-17 15:26:25'),
(164, 33, NULL, 12, 0, 4.3, 1, 1, 0, 1, 'Ndenderu, Ndenderu ward, Kiambaa, Kiambu, Central Kenya, 43563, Kenya', '2025-12-17 15:48:16', '-1.1978705', '36.7554188', 'Shell Banana Bus stop, Muchatha ward, Kiambu', '-1.1758139', '36.7595065', 1, 99, 1, 18.76, 15.38, 0, 0, 3.38, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-12-17 15:48:46', '2025-12-17 15:48:57'),
(165, 33, NULL, 12, 0, 106.47, 1, 1, 0, 1, 'Ndenderu, Ndenderu ward, Kiambaa, Kiambu, Central Kenya, 43563, Kenya', '2025-12-17 17:19:22', '-1.1978749', '36.7554109', 'Banana Stop, Sagana, Kirinyaga', '-0.6191688', '37.2019802', 1, 99, 1, 174.57, 143.09, 0, 0, 31.48, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-12-17 17:20:26', '2025-12-17 17:20:39'),
(166, 33, NULL, 12, 0, 4.18, 1, 1, 0, 1, 'Ndenderu, Ndenderu ward, Kiambaa, Kiambu, Central Kenya, 43563, Kenya', '2025-12-17 17:25:10', '-1.197871', '36.7554179', 'Banana Terminus, Banana, Kiambu', '-1.173875', '36.758608', 1, 99, 1, 18.58, 15.23, 0, 0, 3.35, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-12-17 17:25:39', '2025-12-17 17:25:53'),
(167, 33, NULL, 12, 0, 12.47, 1, 1, 0, 1, 'Kimachia Road, Rwenu, Karura Kanyungu, Ndenderu ward, Kiambaa, Kiambu, Central Kenya, 23083, Kenya', '2025-12-17 17:29:32', '-1.193775660017', '36.737756012887', 'Baobab Banks, Nairobi, Nairobi', '-1.2199400625544', '36.831194611111', 1, 99, 1, 31.22, 25.59, 0, 0, 5.63, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-12-17 17:29:55', '2025-12-17 17:30:16'),
(168, 33, NULL, 12, 0, 9.98, 1, 1, 0, 1, 'Ndenderu, Ndenderu ward, Kiambaa, Kiambu, Central Kenya, 43563, Kenya', '2025-12-17 17:32:05', '-1.1977916666667', '36.755476666667', 'Baobab Banks, Nairobi, Nairobi', '-1.2199400625544', '36.831194611111', 1, 99, 1, 27.43, 22.48, 0, 0, 4.95, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-12-17 17:32:26', '2025-12-17 17:32:41'),
(169, 33, NULL, 12, 0, 6.02, 1, 1, 0, 1, 'Nairobi South ward, Starehe, Nairobi, 00507, Kenya', '2025-12-19 10:55:30', '-1.3223961', '36.8564778', 'South C, Nairobi, Nairobi', '-1.3188367', '36.8278221', 1, 99, 1, 21.39, 17.53, 0, 0, 3.86, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-12-19 10:56:12', '2025-12-19 10:56:24'),
(170, 1, NULL, 1, 0, 3.91, 1, 1, 0, 1, 'Ellis Nagar, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', '2025-12-19 12:14:22', '9.9128283247817', '78.091878314857', 'Arappalayam, Madurai, Madurai South, Madurai, Tamil Nadu, 625016, India', '9.931246947421', '78.107886938847', 1, 3, 1, 18.17, 14.89, 0, 0, 3.28, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2025-12-19 12:14:28', '2025-12-19 12:14:36'),
(171, 0, 7, 1, 0, 2.87, 1, 1, 0, 1, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '2025-12-19 15:12:23', '9.9102572', '78.0893839', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 0, 3, 1, 16.58, 13.59, 0, 0, 2.99, '', 4, 0, NULL, 0, NULL, '+25497566315136', NULL, NULL, NULL, '2025-12-19 15:12:27', '2025-12-22 11:50:48'),
(172, 0, 7, 1, 0, 11.51, 1, 1, 0, 1, 'Madakulam Kanmai, Madurai, Tamil Nadu', '2025-12-22 11:51:19', '9.91781745', '78.075001393904', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 0, 3, 1, 29.76, 24.39, 0, 0, 5.37, '', 3, 0, NULL, 1, 'ggd', '+919656656565', NULL, NULL, NULL, '2025-12-22 11:51:22', '2025-12-22 11:51:37'),
(173, 0, 7, 1, 0, 3.11, 1, 1, 0, 1, 'Railway Colony, Ellis Nagar, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', '2025-12-22 12:07:13', '9.9235058841914', '78.109505538233', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 0, 3, 1, 16.95, 13.89, 0, 0, 3.06, '', 3, 0, NULL, 1, 'Bethal', '+254795531783', NULL, NULL, NULL, '2025-12-22 12:07:16', '2025-12-22 12:07:34'),
(174, 0, 7, 1, 0, 6.37, 1, 1, 0, 1, 'Pasumalai, Madurai, Madurai South, Madurai, Tamil Nadu, 625004, India', '2025-12-29 12:54:39', '9.9004552', '78.0773056', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 0, 3, 1, 21.91, 17.96, 0, 0, 3.95, '', 3, 0, NULL, 1, 'Renu', '+919759923232', NULL, NULL, NULL, '2025-12-29 12:54:41', '2025-12-29 12:57:50'),
(175, 0, 2, 1, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-12-29 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 3, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2025-12-29 13:49:14', '2025-12-29 13:49:26'),
(176, 0, 2, 1, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-12-29 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 3, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2025-12-29 13:51:14', '2025-12-29 13:51:29'),
(177, 0, 7, 1, 0, 2.99, 1, 1, 0, 1, 'Railway Colony, SS Colony, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', '2025-12-31 10:50:00', '9.9224603', '78.1065393', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 0, 3, 1, 16.76, 13.74, 0, 0, 3.02, '', 3, 0, NULL, 1, 'Renu', '+919823273823', NULL, NULL, NULL, '2025-12-29 15:00:33', '2025-12-29 15:00:42'),
(178, 0, 2, 1, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-12-29 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 9.08, 14.88, 1, 9.08, 3.27, '', 4, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2025-12-29 15:32:58', '2025-12-29 15:33:13'),
(179, 0, 2, 1, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-12-29 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 9.08, 14.88, 1, 9.08, 3.27, '', 4, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2025-12-29 18:18:07', '2025-12-29 18:18:23'),
(180, 0, 2, 1, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-12-29 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, IndiaHnm', '9.9349080610953', '78.11977498383', 0, 3, 0, 9.08, 14.88, 1, 9.08, 3.27, '', 4, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2025-12-29 19:36:04', '2025-12-29 19:36:17'),
(181, 0, 2, 1, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-12-30 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 9.08, 14.88, 1, 9.08, 3.27, '', 4, 0, NULL, 0, NULL, NULL, 'Hnm tech', NULL, NULL, '2025-12-30 14:58:43', '2025-12-30 14:58:59'),
(182, 0, 2, 1, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-12-30 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 9.08, 14.88, 1, 9.08, 3.27, '', 4, 0, NULL, 0, NULL, NULL, 'Hnm tech', NULL, 'good', '2025-12-30 15:01:43', '2025-12-30 15:01:57'),
(183, 0, 7, 1, 0, 3.34, 1, 1, 0, 1, 'Ponmeni, Madurai, Tamil Nadu', '2025-12-30 16:38:34', '9.9278523', '78.0906824', 'Palanganatham, Madurai, Tamil Nadu', '9.9040093', '78.0962583', 0, 3, 1, 17.3, 14.18, 0, 0, 3.12, '', 3, 0, NULL, 1, 'Renu', '+919837238232', 'Menpani', NULL, NULL, '2025-12-30 16:38:36', '2025-12-30 16:38:43'),
(184, 0, 7, 1, 0, 1.76, 1, 1, 0, 1, 'Ponmeni Main Rd, Ponmeni, Madurai, Tamil Nadu 625016, India', '2025-12-31 10:32:06', '9.9229292', '78.0900451', 'Madakulam Kanmai, Tamil Nadu', '9.9182407', '78.0751774', 0, 3, 1, 14.88, 12.2, 0, 0, 2.68, '', 4, 0, NULL, 0, NULL, '+919387323232', 'Menpani', NULL, NULL, '2025-12-31 10:32:09', '2025-12-31 10:32:24'),
(185, 0, 7, 1, 0, 0.99, 1, 1, 0, 1, 'S S Colony, SS Colony, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', '2025-12-31 11:10:59', '9.9218553', '78.094419', 'Ponmeni, Madurai, Tamil Nadu, India', '9.9256569', '78.0901', 0, 3, 1, 13.71, 11.24, 0, 0, 2.47, '', 3, 0, NULL, 1, 'Renu', '+919343746334', 'Menpani', NULL, NULL, '2025-12-31 11:11:01', '2025-12-31 11:11:11'),
(186, 0, 7, 1, 0, 2.13, 1, 1, 0, 1, 'Ponmeni, Madurai, Tamil Nadu, India', '2025-12-31 12:53:40', '9.9256569', '78.0901', 'Madakulam Kanmai, Tamil Nadu', '9.9182407', '78.0751774', 0, 3, 1, 15.45, 12.66, 0, 0, 2.79, '', 4, 0, NULL, 0, 'Renu', '+916344232323', 'Menpani', 'asasas', 'ajjas', '2025-12-31 12:53:42', '2025-12-31 12:53:58'),
(187, 0, 7, 1, 0, 0.99, 1, 1, 0, 1, 'S S Colony, SS Colony, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', '2025-12-31 12:54:55', '9.9218553', '78.094419', 'Ponmeni, Madurai, Tamil Nadu, India', '9.9256569', '78.0901', 0, 3, 1, 13.71, 11.24, 0, 0, 2.47, '', 3, 0, NULL, 1, 'Renu', '+919928323232', 'Menpani', 'sasas', 'dsdsd', '2025-12-31 12:54:58', '2025-12-31 12:55:05'),
(188, 0, 7, 1, 0, 0.99, 1, 1, 0, 1, 'S S Colony, SS Colony, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', '2025-12-31 12:58:42', '9.9218553', '78.094419', 'Ponmeni, Madurai, Tamil Nadu, India', '9.9256569', '78.0901', 0, 3, 1, 13.71, 11.24, 0, 0, 2.47, '', 3, 0, NULL, 1, 'Teena', '+2549238232223', 'Menpani', NULL, NULL, '2025-12-31 12:58:44', '2025-12-31 12:58:50'),
(189, 0, 7, 1, 0, 4.63, 1, 1, 0, 1, 'Ponmeni, Madurai, Tamil Nadu, India', '2025-12-31 13:13:56', '9.9256569', '78.0901', 'W34V+8CV, Palangantham, Madurai, Tamil Nadu 625003, India', '9.9058623', '78.0935472', 0, 3, 1, 19.26, 15.79, 0, 0, 3.47, '', 3, 0, NULL, 1, 'Haritha', '+2549334343434', 'Menpani', NULL, NULL, '2025-12-31 13:13:59', '2025-12-31 13:14:07'),
(190, 0, 7, 1, 0, 0.99, 1, 1, 0, 1, 'S S Colony, SS Colony, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', '2025-12-31 13:15:27', '9.9218553', '78.094419', 'Ponmeni, Madurai, Tamil Nadu, India', '9.9256569', '78.0901', 0, 3, 1, 13.71, 11.24, 0, 0, 2.47, '', 3, 0, NULL, 1, 'Teena', '+919832323232', 'Menpani', NULL, NULL, '2025-12-31 13:15:30', '2025-12-31 13:15:37'),
(191, 0, 7, 1, 0, 0.99, 1, 1, 0, 1, 'S S Colony, SS Colony, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', '2025-12-31 13:51:10', '9.9218553', '78.094419', 'Ponmeni, Madurai, Tamil Nadu, India', '9.9256569', '78.0901', 0, 3, 1, 13.71, 11.24, 0, 0, 2.47, '', 3, 0, NULL, 1, 'Sakthi', '+919378343434', 'Menpani', NULL, NULL, '2025-12-31 13:51:12', '2025-12-31 13:51:18'),
(192, 0, 7, 1, 0, 1.63, 1, 1, 0, 1, 'S S Colony, SS Colony, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', '2026-01-01 11:00:00', '9.9218553', '78.094419', 'Ponmeni Main Rd, Ponmeni, Madurai, Tamil Nadu 625016, India', '9.9229292', '78.0900451', 0, 3, 1, 14.69, 12.04, 0, 0, 2.65, '', 3, 0, NULL, 1, 'Yashika', '+919389329323', 'Menpani', NULL, NULL, '2025-12-31 13:52:29', '2025-12-31 13:52:38'),
(193, 0, 7, 1, 0, 0.99, 1, 1, 0, 1, 'S S Colony, SS Colony, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', '2025-12-31 15:23:27', '9.9218553', '78.094419', 'Ponmeni, Madurai, Tamil Nadu, India', '9.9256569', '78.0901', 0, 3, 1, 13.71, 11.24, 0, 0, 2.47, '', 3, 0, NULL, 1, 'Renu', '+919347324343', 'Menpani', 'dfdfdf', 'dgdf', '2025-12-31 15:23:29', '2025-12-31 15:23:40'),
(194, 0, 8, 1, 0, 0.99, 1, 1, 0, 1, 'S S Colony, SS Colony, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', '2025-12-31 15:27:12', '9.9218553', '78.094419', 'Ponmeni, Madurai, Tamil Nadu, India', '9.9256569', '78.0901', 0, 3, 1, 13.71, 11.24, 0, 0, 2.47, '', 3, 0, NULL, 1, 'Renu', '+254453342123232', 'Menpani', NULL, NULL, '2025-12-31 15:27:14', '2025-12-31 15:27:19'),
(195, 0, 8, 1, 0, 0.99, 1, 1, 0, 1, 'S S Colony, SS Colony, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', '2025-12-31 15:33:48', '9.9218553', '78.094419', 'Ponmeni, Madurai, Tamil Nadu, India', '9.9256569', '78.0901', 0, 3, 1, 13.71, 11.24, 0, 0, 2.47, '', 3, 0, NULL, 1, 'Renu', '+919827382323', 'Menpani', NULL, NULL, '2025-12-31 15:33:50', '2025-12-31 15:33:55'),
(196, 0, 8, 1, 0, 2.74, 1, 1, 0, 1, 'S S Colony, SS Colony, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', '2025-12-31 15:45:46', '9.9218553', '78.094419', 'Palangantham, Tamil Nadu 625003, India', '9.9059036', '78.0935472', 0, 3, 1, 16.38, 13.43, 0, 0, 2.95, '', 3, 0, NULL, 1, 'Renu', '+918372973232', 'MNC Tech', NULL, NULL, '2025-12-31 15:45:49', '2025-12-31 15:45:54'),
(197, 0, 8, 1, 0, 0.99, 1, 1, 0, 1, '46/1, Kannadasan Nagar Main Road Near Citi Union Bank, SS Colony branch, Bypass Rd, opp. Vivek Show Room, Somasundaram colony, Madurai, S S Colony, Tamil Nadu 625016, India', '2025-12-31 17:38:49', '9.9218553', '78.094419', 'Ponmeni, Madurai, Tamil Nadu, India', '9.9256569', '78.0901', 0, 3, 1, 6.86, 11.24, 1, 6.86, 2.47, '', 3, 0, NULL, 1, 'Renu', '+919423424242', 'MNC Tech', 'adadas', 'dada', '2025-12-31 17:38:52', '2025-12-31 17:39:07'),
(198, 0, 8, 1, 0, 0.99, 1, 1, 0, 1, '46/1, Kannadasan Nagar Main Road Near Citi Union Bank, SS Colony branch, Bypass Rd, opp. Vivek Show Room, Somasundaram colony, Madurai, S S Colony, Tamil Nadu 625016, India', '2025-12-31 19:40:21', '9.9218553', '78.094419', 'Ponmeni, Madurai, Tamil Nadu, India', '9.9256569', '78.0901', 0, 3, 1, 6.86, 11.24, 1, 6.86, 2.47, '', 4, 0, NULL, 0, NULL, '+254523524224242', 'MNC Tech', NULL, NULL, '2025-12-31 19:40:24', '2025-12-31 19:40:41'),
(199, 0, 7, 1, 0, 3.47, 1, 1, 0, 1, 'W34V+8CV, Palangantham, Madurai, Tamil Nadu 625003, India', '2026-01-01 14:09:08', '9.9058623', '78.0935472', 'Ponmeni, Madurai, Tamil Nadu, India', '9.9256569', '78.0901', 0, 3, 1, 17.49, 14.34, 1, 0, 3.15, '', 3, 0, NULL, 1, NULL, '+2549242323232', 'AFC Tech', 'asasa', 'ssasa', '2026-01-01 14:09:10', '2026-01-01 14:09:21'),
(200, 0, 7, 1, 0, 2.99, 1, 1, 0, 1, 'W4F5+RJR, Madurai, Tamil Nadu 625016, India', '2026-01-01 18:10:54', '9.924959', '78.1086781', 'Ponmeni, Madurai, Tamil Nadu, India', '9.9256569', '78.0901', 0, 3, 1, 16.76, 13.74, 1, 0, 3.02, '', 3, 0, NULL, 1, 'Renu', '+2549353434343', 'AFC Tech', 'asas', 'sasa', '2026-01-01 18:10:56', '2026-01-01 18:11:02'),
(201, 0, 7, 1, 0, 2.99, 1, 1, 0, 1, 'W4F5+RJR, Madurai, Tamil Nadu 625016, India', '2026-01-01 18:41:31', '9.924959', '78.1086781', 'Ponmeni, Madurai, Tamil Nadu, India', '9.9256569', '78.0901', 0, 3, 1, 16.76, 13.74, 1, 0, 3.02, '', 3, 0, NULL, 1, 'Renu', '+2549455343433', 'AFC Tech', 'asas', 'asass', '2026-01-01 18:41:34', '2026-01-01 18:41:39'),
(202, 0, 7, 1, 0, 3.47, 1, 1, 0, 1, 'Palangantham, Tamil Nadu 625003, India', '2026-01-02 12:08:29', '9.9059036', '78.0935472', 'Ponmeni, Madurai, Tamil Nadu, India', '9.9256569', '78.0901', 0, 3, 1, 17.49, 14.34, 0, 0, 3.15, '', 3, 0, NULL, 1, 'Teena', '+2549731721781', 'AFC Tech', 'asasas', 'asas', '2026-01-02 12:08:31', '2026-01-02 12:08:49'),
(203, 0, 7, 1, 0, 2.99, 1, 1, 0, 1, 'W4F5+RJR, Madurai, Tamil Nadu 625016, India', '2026-01-02 12:46:18', '9.924959', '78.1086781', 'Ponmeni, Madurai, Tamil Nadu, India', '9.9256569', '78.0901', 0, 3, 1, 16.76, 13.74, 0, 0, 3.02, '', 3, 0, NULL, 1, 'Teena', '+2549161272711', 'AFC Tech', 'asasas', 'sasasa', '2026-01-02 12:46:21', '2026-01-02 12:46:31'),
(204, 0, 7, 1, 0, 2.9, 1, 1, 0, 1, 'W4F5+RJR, Madurai, Tamil Nadu 625016, India', '2026-01-03 06:30:00', '9.924959', '78.1086781', 'Ponmeni Main Rd, Ponmeni, Madurai, Tamil Nadu 625016, India', '9.9229292', '78.0900451', 0, 3, 1, 16.63, 13.63, 0, 0, 3, '', 3, 0, NULL, 1, 'Teens', '+2549242232321', 'AFC Tech', 'asasa', 'sasas', '2026-01-02 13:06:51', '2026-01-02 13:06:58'),
(205, 0, 7, 1, 0, 3.58, 1, 1, 0, 1, 'Palangantham, Tamil Nadu 625003, India', '2026-01-02 18:15:06', '9.9059036', '78.0935472', 'Kalavasal, Madurai, Tamil Nadu 625016, India', '9.9302859', '78.0954996', 0, 3, 1, 17.67, 14.48, 0, 0, 3.19, '', 3, 0, NULL, 1, NULL, '+919382323223', 'AFC Tech', 'asas', 'aasas', '2026-01-02 18:15:08', '2026-01-02 18:15:15'),
(206, 0, 7, 12, 0, 0.8, 1, 1, 0, 1, 'MVH3+MRC, Likoni Rd, Nairobi, Kenya', '2026-01-10 08:55:56', '-1.320923', '36.855137', 'MVJ3+52W, Nairobi, Kenya', '-1.3199806676903', '36.852371692657', 0, 99, 1, 13.42, 11, 0, 0, 2.42, '', 1, 0, NULL, 1, 'meya', '+254767543249', 'AFC Tech', NULL, NULL, '2026-01-10 11:26:01', '2026-01-28 14:01:38'),
(207, 0, 7, 1, 0, 0.99, 1, 1, 0, 1, 'Ponmeni, Madurai, Tamil Nadu, India', '2026-01-21 11:17:58', '9.9256569', '78.0901', 'Kalavasal, Madurai, Tamil Nadu 625016, India', '9.9302859', '78.0954996', 0, 3, 1, 13.71, 11.24, 0, 0, 2.47, '', 3, 0, NULL, 1, 'Rithika', '+2549823626733', 'AFC Tech', 'sdsd', 'dsdsd', '2026-01-21 11:18:01', '2026-01-28 14:01:34'),
(208, 0, 7, 1, 0, 1.32, 1, 1, 0, 1, 'Madakkulam, Tamil Nadu, India', '2026-01-28 13:54:35', '9.9160561', '78.0900425', 'Ponmeni, Madurai, Tamil Nadu, India', '9.9256569', '78.0901', 0, 3, 1, 14.21, 11.65, 0, 0, 2.56, '', 4, 0, NULL, 1, 'Rithika', '+919787237237', 'AFC Tech', 'ada', 'adad', '2026-01-28 13:54:38', '2026-01-28 14:01:28'),
(209, 0, 7, 1, 0, 1.32, 1, 1, 0, 1, 'Madakkulam, Tamil Nadu, India', '2026-01-28 14:13:28', '9.9160561', '78.0900425', 'Ponmeni, Madurai, Tamil Nadu, India', '9.9256569', '78.0901', 0, 3, 1, 14.21, 11.65, 0, 0, 2.56, '', 3, 0, NULL, 1, 'rithika', '+2549744734343', 'AFC Tech', 'asa', 'asas', '2026-01-28 14:13:30', '2026-01-28 14:13:36'),
(210, 0, 7, 1, 0, 1.32, 1, 1, 0, 1, 'Madakkulam, Tamil Nadu, India', '2026-01-30 12:29:45', '9.9160561', '78.0900425', 'Ponmeni, Madurai, Tamil Nadu, India', '9.9256569', '78.0901', 0, 3, 1, 14.21, 11.65, 0, 0, 2.56, '', 3, 0, NULL, 1, 'Rithika', '+918362736236', 'AFC Tech', 'asas', 'asas', '2026-01-30 12:29:48', '2026-01-30 12:29:53'),
(211, 0, 9, 1, 0, 2.1, 1, 1, 0, 1, 'Madakulam Kanmai, Tamil Nadu', '2026-01-30 17:36:02', '9.9182407', '78.0751774', 'Ponmeni, Madurai, Tamil Nadu, India', '9.9256569', '78.0901', 0, 3, 1, 15.41, 12.63, 0, 0, 2.78, '', 3, 0, NULL, 1, 'rithish', '+2549777266661', 'TechAI Solutions pvt Ltd', 'asas', 'ssas', '2026-01-30 17:36:06', '2026-01-30 17:36:24'),
(212, 1, NULL, 1, 0, 4.52, 1, 1, 0, 1, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '2026-02-02 15:50:00', '9.9102447', '78.0893954', 'Arappalayam, Madurai, Madurai South, Madurai, Tamil Nadu, 625016, India', '9.9274400726471', '78.113639255354', 1, 3, 1, 19.09, 15.65, 0, 0, 3.44, '', 4, 0, 'null', 0, NULL, NULL, NULL, NULL, NULL, '2026-02-02 15:40:33', '2026-02-02 15:40:42'),
(213, 1, NULL, 1, 0, 4.52, 1, 1, 0, 1, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '2026-02-02 16:40:00', '9.9102447', '78.0893954', 'Arappalayam, Madurai, Madurai South, Madurai, Tamil Nadu, 625016, India', '9.9274400726471', '78.113639255354', 1, 3, 1, 19.09, 15.65, 0, 0, 3.44, '', 6, 0, 'null', 0, NULL, NULL, NULL, NULL, NULL, '2026-02-02 15:40:57', '2026-02-02 15:41:01'),
(214, 42, 0, 1, 0, 0, 1, 1, 0, 2, '', '2026-02-02 16:13:10', '9.917817450000001', '78.07500139390376', '', '9.9242815', '78.1210165', 1, 3, 0, 12.2, 10, 0, 0, 2.2, '', 5, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2026-02-02 15:43:10', '2026-02-02 16:30:05'),
(215, 42, 0, 1, 0, 0, 1, 1, 0, 2, '', '2026-02-02 16:32:27', '9.917817450000001', '78.07500139390376', '', '9.9242815', '78.1210165', 1, 3, 0, 12.2, 10, 0, 0, 2.2, '', 5, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2026-02-02 16:02:27', '2026-02-02 16:49:05'),
(216, 1, NULL, 1, 0, 13.7, 1, 1, 0, 1, 'Madakkulam, Achampathu, Madurai, Madurai South, Madurai, Tamil Nadu, 625004, India', '2026-02-02 18:04:00', '9.9174973386011', '78.071543543305', 'Arappalayam, Madurai, Madurai South, Madurai, Tamil Nadu, 625016, India', '9.9262230753444', '78.110486862933', 1, 3, 1, 33.1, 27.13, 0, 0, 5.97, '', 6, 0, 'null', 0, NULL, NULL, NULL, NULL, NULL, '2026-02-02 16:04:33', '2026-02-02 16:04:39'),
(217, 1, NULL, 1, 0, 13.7, 1, 1, 0, 1, 'Madakkulam, Achampathu, Madurai, Madurai South, Madurai, Tamil Nadu, 625004, India', '2026-02-02 18:04:00', '9.9174973386011', '78.071543543305', 'Arappalayam, Madurai, Madurai South, Madurai, Tamil Nadu, 625016, India', '9.9262230753444', '78.110486862933', 1, 3, 1, 33.1, 27.13, 0, 0, 5.97, '', 6, 0, 'null', 0, NULL, NULL, NULL, NULL, NULL, '2026-02-02 16:05:31', '2026-02-02 16:05:42'),
(218, 1, NULL, 1, 0, 13.7, 1, 1, 0, 1, 'Madakkulam, Achampathu, Madurai, Madurai South, Madurai, Tamil Nadu, 625004, India', '2026-02-04 16:05:00', '9.9174973386011', '78.071543543305', 'Arappalayam, Madurai, Madurai South, Madurai, Tamil Nadu, 625016, India', '9.9262230753444', '78.110486862933', 1, 3, 1, 33.1, 27.13, 0, 0, 5.97, '', 6, 0, 'null', 0, NULL, NULL, NULL, NULL, NULL, '2026-02-02 16:05:52', '2026-02-02 16:06:06'),
(219, 0, 2, 1, 0, 3.9, 1, 1, 0, 1, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-12-29 14:30:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, IndiaHnm', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 1, 0, 3.27, '', 4, 0, NULL, 0, NULL, NULL, 'Hnm tech', NULL, NULL, '2026-02-02 17:10:54', '2026-02-02 17:11:10'),
(220, 1, NULL, 1, 0, 3.97, 1, 1, 0, 1, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '2026-02-03 22:25:00', '9.9102493', '78.0894023', 'Railway Colony, SS Colony, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', '9.9250149275293', '78.103564095797', 1, 3, 1, 18.25, 14.96, 0, 0, 3.29, '', 6, 0, 'null', 0, NULL, NULL, NULL, NULL, NULL, '2026-02-03 17:25:56', '2026-02-03 17:26:02'),
(221, 1, NULL, 1, 0, 3.64, 1, 1, 0, 1, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '2026-02-03 18:31:00', '9.9102493', '78.0894023', 'Railway Colony, SS Colony, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', '9.9236058349345', '78.105939739222', 1, 3, 1, 17.75, 14.55, 0, 0, 3.2, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2026-02-03 17:31:14', '2026-02-03 17:31:29'),
(222, 1, NULL, 1, 0, 5.18, 1, 1, 0, 1, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '2026-02-03 20:52:00', '9.9102493', '78.0894023', 'Simmakkal, Madurai Main, Madurai, Tamil Nadu, India', '9.9260717', '78.1215208', 1, 3, 1, 20.11, 16.48, 0, 0, 3.63, '', 6, 0, 'null', 0, NULL, NULL, NULL, NULL, NULL, '2026-02-03 17:52:24', '2026-02-03 17:52:29'),
(223, 2, NULL, 1, 0, 3.62, 1, 1, 0, 1, 'Menpani technology', '2026-02-02 20:10:14', '9.9108247699274', '78.094178505573', 'Menpani technology', '9.9288749622274', '78.113432510467', 0, 3, 1, 17.73, 14.53, 0, 0, 3.2, '', 4, 0, 'null', 0, NULL, NULL, NULL, NULL, NULL, '2026-02-04 14:42:17', '2026-02-04 14:42:23'),
(224, 2, NULL, 1, 0, 3.62, 1, 1, 0, 1, 'Menpani technology', '2026-02-04 18:10:14', '9.9108247699274', '78.094178505573', 'Menpani technology', '9.9288749622274', '78.113432510467', 0, 3, 1, 17.73, 14.53, 0, 0, 3.2, '', 4, 0, 'null', 0, NULL, NULL, NULL, NULL, NULL, '2026-02-04 14:42:42', '2026-02-04 14:42:50'),
(225, 2, NULL, 1, 0, 3.62, 1, 1, 0, 1, 'Menpani technology', '2026-02-05 20:10:14', '9.9108247699274', '78.094178505573', 'Menpani technology', '9.9288749622274', '78.113432510467', 0, 3, 1, 17.73, 14.53, 0, 0, 3.2, '', 4, 0, 'null', 0, NULL, NULL, NULL, NULL, NULL, '2026-02-04 14:42:59', '2026-02-04 14:43:04'),
(226, 2, NULL, 1, 0, 3.62, 1, 1, 0, 1, 'Menpani technology', '2026-02-04 15:50:14', '9.9108247699274', '78.094178505573', 'Menpani technology', '9.9288749622274', '78.113432510467', 0, 3, 1, 17.73, 14.53, 0, 0, 3.2, '', 4, 0, 'null', 0, NULL, NULL, NULL, NULL, NULL, '2026-02-04 15:41:55', '2026-02-04 15:42:29'),
(227, 0, 7, 1, 0, 3.43, 1, 1, 0, 1, 'W4G2+7W Madurai, Tamil Nadu, India', '2026-02-04 16:10:32', '9.9256726', '78.1022617', 'Ponmeni, Madurai, Tamil Nadu, India', '9.9256569', '78.0901', 0, 3, 1, 17.43, 14.29, 0, 0, 3.14, '', 4, 0, NULL, 0, 'Nagarani', '+916383575669', 'AFC Tech', 'sdsd', 'asdd', '2026-02-04 16:10:35', '2026-02-04 16:10:48'),
(228, 0, 7, 1, 0, 2.1, 1, 1, 0, 1, 'Madakulam Kanmai, Tamil Nadu', '2026-02-04 16:12:52', '9.9182407', '78.0751774', 'Ponmeni, Madurai, Tamil Nadu, India', '9.9256569', '78.0901', 0, 3, 1, 15.41, 12.63, 0, 0, 2.78, '', 4, 0, NULL, 0, 'Nagarani', '+916383575669', 'AFC Tech', 'asas', 'ass', '2026-02-04 16:12:55', '2026-02-04 16:13:41'),
(229, 0, 7, 1, 0, 1.32, 1, 1, 0, 1, 'Madakkulam, Tamil Nadu, India', '2026-02-04 16:14:43', '9.9160561', '78.0900425', 'Ponmeni, Madurai, Tamil Nadu, India', '9.9256569', '78.0901', 0, 3, 1, 14.21, 11.65, 0, 0, 2.56, '', 3, 0, NULL, 1, 'Nagarani', '+916383575669', 'AFC Tech', 'add', 'adad', '2026-02-04 16:14:45', '2026-02-04 16:14:50'),
(230, 1, NULL, 1, 0, 16.28, 1, 1, 0, 2, 'Madakulam Kanmai, Madurai, Tamil Nadu', '2026-02-03 13:45:00', '9.91781745', '78.075001393904', 'சிம்மக்கல் பஸ் ஸ்டாப், Madurai, Tamil Nadu', '9.9242815', '78.1210165', 1, 3, 1, 37.03, 30.35, 0, 0, 6.68, '', 5, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2026-02-04 16:28:30', '2026-02-04 16:29:02'),
(231, 1, NULL, 1, 0, 16.28, 1, 5, 0, 2, 'Madakulam Kanmai, Madurai, Tamil Nadu', '2026-02-03 13:45:00', '9.91781745', '78.075001393904', 'சிம்மக்கல் பஸ் ஸ்டாப், Madurai, Tamil Nadu', '9.9242815', '78.1210165', 1, 3, 1, 1115.08, 914, 0, 0, 201.08, '', 5, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2026-02-04 16:33:51', '2026-02-04 16:34:04'),
(232, 1, NULL, 1, 0, 16.28, 1, 5, 0, 2, 'Madakulam Kanmai, Madurai, Tamil Nadu', '2026-02-04 17:50:14', '9.91781745', '78.075001393904', 'சிம்மக்கல் பஸ் ஸ்டாப், Madurai, Tamil Nadu', '9.9242815', '78.1210165', 1, 3, 1, 1115.08, 914, 0, 0, 201.08, '', 5, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2026-02-04 16:34:47', '2026-02-04 18:07:05'),
(233, 1, NULL, 1, 0, 16.28, 1, 2, 0, 2, 'Madakulam Kanmai, Madurai, Tamil Nadu', '2026-02-04 17:50:14', '9.91781745', '78.075001393904', 'சிம்மக்கல் பஸ் ஸ்டாப், Madurai, Tamil Nadu', '9.9242815', '78.1210165', 1, 3, 1, 0, 0, 0, 0, 0, '', 5, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2026-02-04 16:40:08', '2026-02-04 18:07:05'),
(234, 1, NULL, 1, 0, 16.28, 1, 2, 0, 2, 'Madakulam Kanmai, Madurai, Tamil Nadu', '2026-02-06 17:50:14', '9.91781745', '78.075001393904', 'சிம்மக்கல் பஸ் ஸ்டாப், Madurai, Tamil Nadu', '9.9242815', '78.1210165', 1, 3, 1, 0, 0, 0, 0, 0, '', 5, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2026-02-04 16:40:38', '2026-02-06 18:07:02'),
(235, 1, NULL, 1, 0, 16.28, 1, 1, 0, 2, 'Madakulam Kanmai, Madurai, Tamil Nadu', '2026-02-06 17:50:14', '9.91781745', '78.075001393904', 'சிம்மக்கல் பஸ் ஸ்டாப், Madurai, Tamil Nadu', '9.9242815', '78.1210165', 1, 3, 1, 37.03, 30.35, 0, 0, 6.68, '', 5, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2026-02-04 16:41:37', '2026-02-06 18:07:02'),
(236, 1, NULL, 1, 0, 3.75, 1, 1, 0, 2, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '2026-02-04 22:59:00', '9.9102957', '78.0893835', 'Railway Grounds, Payaniyar Viduthi Salai, Kalavasal, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', '9.9266570803378', '78.103259002839', 1, 3, 1, 17.92, 14.69, 0, 0, 3.23, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2026-02-04 17:59:35', '2026-02-05 05:51:00'),
(237, 1, NULL, 1, 0, 3.75, 1, 1, 0, 2, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '2026-02-04 18:40:00', '9.9102957', '78.0893835', 'Railway Grounds, Payaniyar Viduthi Salai, Kalavasal, Madurai, Madurai South, Madurai, Tamil Nadu, 625010, India', '9.9266570803378', '78.103259002839', 1, 3, 1, 17.92, 14.69, 0, 0, 3.23, '', 5, 0, 'null', 0, NULL, NULL, NULL, NULL, NULL, '2026-02-04 18:02:28', '2026-02-04 18:56:02'),
(238, 1, NULL, 1, 0, 0, 1, 1, 0, 1, 'Madakkulam, Madurai, Madurai South, Madurai, Tamil Nadu, 625004, India', '2026-02-04 13:57:11', '9.9145277542082', '78.078795439086', 'Kalavasal, Madurai, Madurai South, Madurai, Tamil Nadu, 625016, India', '9.9306424528405', '78.103812448509', 1, 3, 1, 12.2, 10, 0, 0, 2.2, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2026-02-04 13:57:34', '2026-02-04 13:57:52'),
(239, 0, 7, 1, 0, 2.07, 1, 1, 0, 2, 'Madakkulam, Tamil Nadu, India', '2026-02-05 10:21:56', '9.9160561', '78.0900425', 'Ponmeni, Madurai, Tamil Nadu, India', '9.9256569', '78.0901', 0, 3, 1, 15.36, 12.59, 0, 0, 2.77, '', 5, 0, NULL, 1, 'Rithika', '+916383575669', 'AFC Tech', 'sdsd', 'sdsds', '2026-02-05 05:51:58', '2026-02-05 10:38:02'),
(240, 0, 7, 1, 0, 1.88, 1, 1, 0, 2, '42-1-13, Harvey Nagar 1st St, Pethaniapuram 2, Arappalayam, Madurai, Tamil Nadu 625016, India', '2026-02-05 10:23:55', '9.9285502', '78.0994099', 'Ponmeni, Madurai, Tamil Nadu, India', '9.9256569', '78.0901', 0, 3, 1, 15.07, 12.35, 0, 0, 2.72, '', 5, 0, NULL, 1, 'Rithika', '+919213242424', 'AFC Tech', 'adada', 'aadad', '2026-02-05 05:53:57', '2026-02-05 10:40:04'),
(241, 0, 7, 1, 0, 1.88, 1, 1, 0, 2, '42-1-13, Harvey Nagar 1st St, Pethaniapuram 2, Arappalayam, Madurai, Tamil Nadu 625016, India', '2026-02-05 10:36:01', '9.9285502', '78.0994099', 'Ponmeni, Madurai, Tamil Nadu, India', '9.9256569', '78.0901', 0, 3, 1, 15.07, 12.35, 0, 0, 2.72, '', 5, 0, NULL, 0, 'Rithika', '+919453453522', 'AFC Tech', 'ada', 'asdad', '2026-02-05 06:06:04', '2026-02-05 10:52:02'),
(242, 1, NULL, 8, 0, 0, 1, 1, 0, 2, '8, Madurai Rd, Jawahar Nagar, Tirumangalam, Tamil Nadu 625706, India', '2026-02-05 12:37:00', '9.8300308366252', '77.993694841862', 'V2MJ+92G, PO, Madurai, Tamil Nadu 625006, India', '9.8837950156762', '78.030147235841', 1, 3, 1, 12.2, 10, 0, 0, 2.2, '', 5, 0, 'null', 0, NULL, NULL, NULL, NULL, NULL, '2026-02-05 06:07:54', '2026-02-05 12:53:03'),
(243, 48, NULL, 1, 0, 0, 1, 1, 0, 1, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '2026-02-05 06:07:49', '9.9102181', '78.0893743', 'Madakulam Kanmai, Madurai, Tamil Nadu', '9.91781745', '78.075001393904', 1, 3, 1, 12.2, 10, 0, 0, 2.2, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2026-02-05 06:08:24', '2026-02-05 06:08:33'),
(244, 48, NULL, 1, 0, 0, 1, 1, 0, 2, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '2026-02-05 10:39:25', '9.9101333333333', '78.089385', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 1, 3, 1, 12.2, 10, 0, 0, 2.2, '', 5, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2026-02-05 06:09:36', '2026-02-05 10:56:02'),
(245, 48, NULL, 1, 0, 0, 1, 1, 0, 2, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '2026-02-05 10:39:25', '9.9101333333333', '78.089385', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 1, 3, 1, 12.2, 10, 0, 0, 2.2, '', 5, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2026-02-05 06:10:07', '2026-02-05 10:56:02'),
(246, 48, NULL, 1, 0, 0, 1, 1, 0, 2, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '2026-02-05 10:51:00', '9.9101333333333', '78.089385', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 1, 3, 1, 12.2, 10, 0, 0, 2.2, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2026-02-05 06:11:41', '2026-02-05 10:23:31'),
(247, 0, 7, 8, 0, 1.88, 1, 1, 0, 2, '42-1-13, Harvey Nagar 1st St, Pethaniapuram 2, Arappalayam, Madurai, Tamil Nadu 625016, India', '2026-02-05 10:53:49', '9.9285502', '78.0994099', 'Ponmeni, Madurai, Tamil Nadu, India', '9.9256569', '78.0901', 0, 3, 1, 15.07, 12.35, 0, 0, 2.72, '', 5, 0, NULL, 1, 'Teena', '+916383575669', 'AFC Tech', 'asasa', 'aasasa', '2026-02-05 06:23:51', '2026-02-05 11:10:03'),
(248, 48, NULL, 1, 0, 0, 1, 1, 0, 1, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '2026-02-05 06:24:28', '9.9102181', '78.0893743', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 1, 3, 1, 12.2, 10, 0, 0, 2.2, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2026-02-05 06:24:43', '2026-02-05 06:24:53'),
(249, 0, 2, 1, 0, 3.9, 1, 1, 0, 2, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2025-12-29 20:00:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 5, 0, NULL, 0, NULL, NULL, 'Hnm tech', 'test', 'test', '2026-02-05 06:28:18', '2026-02-05 06:29:02'),
(250, 0, 2, 8, 0, 3.9, 1, 1, 0, 2, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2026-02-05 10:59:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 5, 0, NULL, 1, NULL, NULL, 'Hnm tech', 'test', 'test', '2026-02-05 06:29:15', '2026-02-05 11:15:02'),
(251, 0, 2, 8, 0, 3.9, 1, 1, 0, 2, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2026-02-05 10:59:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 5, 0, NULL, 1, NULL, NULL, 'Hnm tech', 'test', 'test', '2026-02-05 06:30:43', '2026-02-05 11:15:02'),
(252, 0, 2, 8, 0, 3.9, 1, 1, 0, 2, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2026-02-05 11:20:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 5, 0, NULL, 1, NULL, NULL, 'Hnm tech', 'test', 'test', '2026-02-05 06:33:08', '2026-02-05 11:36:03'),
(253, 48, NULL, 1, 0, 0, 1, 1, 0, 1, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '2026-02-05 06:34:34', '9.9102145', '78.0893829', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 1, 3, 1, 12.2, 10, 0, 0, 2.2, '', 3, 0, 'null', 0, NULL, NULL, NULL, NULL, NULL, '2026-02-05 06:34:51', '2026-02-05 06:35:07'),
(254, 0, 2, 8, 0, 3.9, 1, 1, 0, 2, '107, KK Nagar, Madurai, Tamil Nadu 625020, India', '2026-02-05 11:20:00', '9.9123520712251', '78.091811972638', '48-3-20A, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9349080610953', '78.11977498383', 0, 3, 0, 18.15, 14.88, 0, 0, 3.27, '', 5, 0, NULL, 1, NULL, NULL, 'Hnm tech', 'test', 'test', '2026-02-05 06:37:18', '2026-02-05 11:36:03'),
(255, 2, NULL, 8, 0, 3.62, 1, 2, 0, 2, 'Menpani technology', '2026-02-05 11:15:14', '9.9108247699274', '78.094178505573', 'Menpani technology', '9.9288749622274', '78.113432510467', 0, 3, 1, 0, 0, 0, 0, 0, '', 5, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2026-02-05 06:42:47', '2026-02-05 11:32:03'),
(256, 48, NULL, 1, 0, 0, 1, 1, 0, 1, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '2026-02-05 06:43:21', '9.9102145', '78.0893829', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 1, 3, 1, 12.2, 10, 0, 0, 2.2, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2026-02-05 06:55:27', '2026-02-05 06:55:37'),
(257, 0, 7, 1, 0, 1.88, 1, 1, 0, 2, '42-1-13, Harvey Nagar 1st St, Pethaniapuram 2, Arappalayam, Madurai, Tamil Nadu 625016, India', '2026-02-05 11:34:55', '9.9285502', '78.0994099', 'Ponmeni, Madurai, Tamil Nadu, India', '9.9256569', '78.0901', 0, 3, 1, 15.07, 12.35, 0, 0, 2.72, '', 5, 0, NULL, 1, 'Karthick', '+25498236232323', 'AFC Tech', 'dad', 'sddaa', '2026-02-05 07:04:58', '2026-02-05 11:51:04'),
(258, 0, 7, 8, 0, 1.88, 1, 1, 0, 2, '42-1-13, Harvey Nagar 1st St, Pethaniapuram 2, Arappalayam, Madurai, Tamil Nadu 625016, India', '2026-02-05 11:36:15', '9.9285502', '78.0994099', 'Ponmeni, Madurai, Tamil Nadu, India', '9.9256569', '78.0901', 0, 3, 1, 15.07, 12.35, 0, 0, 2.72, '', 5, 0, NULL, 1, 'Karthick', '+916383575669', 'AFC Tech', 'dad', 'sddaa', '2026-02-05 07:06:18', '2026-02-05 11:53:01'),
(259, 0, 7, 8, 0, 1.88, 1, 1, 0, 2, '42-1-13, Harvey Nagar 1st St, Pethaniapuram 2, Arappalayam, Madurai, Tamil Nadu 625016, India', '2026-02-05 11:42:43', '9.9285502', '78.0994099', 'Ponmeni, Madurai, Tamil Nadu, India', '9.9256569', '78.0901', 0, 3, 1, 15.07, 12.35, 0, 0, 2.72, '', 5, 0, NULL, 1, 'Nagarani', '+916383575669', 'AFC Tech', 'asas', 'asasa', '2026-02-05 07:12:46', '2026-02-05 11:59:03'),
(260, 48, NULL, 1, 0, 0, 1, 1, 0, 1, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '2026-02-05 07:02:53', '9.9102159', '78.0893844', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 1, 3, 1, 12.2, 10, 0, 0, 2.2, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2026-02-05 07:22:23', '2026-02-05 07:22:35'),
(261, 48, NULL, 1, 0, 0, 1, 1, 0, 1, 'Ponmeni, Madurai, Tamil Nadu', '2026-02-05 07:24:14', '9.9278523', '78.0906824', 'Palanganatham Bus Stand Rd, Madurai, Tamil Nadu', '9.9067777377098', '78.090952053858', 1, 3, 1, 12.2, 10, 0, 0, 2.2, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2026-02-05 07:25:11', '2026-02-05 07:25:20'),
(262, 0, 7, 1, 0, 1.69, 1, 1, 0, 2, '42-1-13, Harvey Nagar 1st St, Pethaniapuram 2, Arappalayam, Madurai, Tamil Nadu 625016, India', '2026-02-05 11:56:20', '9.9285502', '78.0994099', 'Ponmeni, Madurai, Tamil Nadu, India', '9.9256569', '78.0901', 0, 3, 1, 14.77, 12.11, 0, 0, 2.66, '', 3, 0, NULL, 0, 'Rithika', '+916383575669', 'AFC Tech', 'asas', 'asas', '2026-02-05 07:26:22', '2026-02-05 08:33:11'),
(263, 48, NULL, 8, 0, 3.3, 1, 1, 0, 2, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '2026-02-05 12:24:31', '9.9101233333333', '78.089348333333', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 1, 3, 1, 17.24, 14.13, 0, 0, 3.11, '', 5, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2026-02-05 07:54:45', '2026-02-05 12:41:03'),
(264, 1, NULL, 8, 0, 6, 1, 1, 0, 2, 'W33Q+5RH, Thiruvalluvar 3rd main Rd, Thiruvalluvar Nagar, Pykara, Madurai, Tamil Nadu 625004, India', '2026-02-05 12:24:47', '9.9027966181208', '78.089789170772', '13/7, Main, Madurai Main, Madurai, Poondhotam, Tamil Nadu 625001, India', '9.9302960500328', '78.116500619799', 1, 3, 1, 21.35, 17.5, 0, 0, 3.85, '', 5, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2026-02-05 07:55:35', '2026-02-05 12:41:03'),
(265, 1, 0, 1, 0, 4.6, 1, 1, 0, 2, 'W38R+C2F, S.S.K.Nagar, Vanamamalai Nagar, Durai Samy Nagar, Madurai, Madakkulam, Tamil Nadu 625003, India', '2026-02-05 08:26:58', '9.916056099999999', '78.0900425', 'W4GC+CJC, North Lane, Simmakkal, Madurai Main, Madurai, Tamil Nadu 625001, India', '9.9260717', '78.1215208', 1, 3, 0, 19.22, 15.75, 0, 0, 3.47, '', 3, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2026-02-05 07:56:58', '2026-02-05 07:57:10'),
(266, 0, 7, 0, 0, 1.88, 1, 1, 0, 2, '42-1-13, Harvey Nagar 1st St, Pethaniapuram 2, Arappalayam, Madurai, Tamil Nadu 625016, India', '2026-02-05 12:27:46', '9.9285502', '78.0994099', 'Ponmeni, Madurai, Tamil Nadu, India', '9.9256569', '78.0901', 0, 3, 1, 15.07, 12.35, 0, 0, 2.72, '', 3, 0, NULL, 0, 'Rithika', '+916383575669', 'AFC Tech', 'asas', 'aaa', '2026-02-05 07:57:49', '2026-02-05 08:11:33'),
(267, 1, 0, 1, 0, 4.6, 1, 1, 0, 2, 'W38R+C2F, S.S.K.Nagar, Vanamamalai Nagar, Durai Samy Nagar, Madurai, Madakkulam, Tamil Nadu 625003, India', '2026-02-05 08:35:37', '9.916056099999999', '78.0900425', 'W4GC+CJC, North Lane, Simmakkal, Madurai Main, Madurai, Tamil Nadu 625001, India', '9.9260717', '78.1215208', 1, 3, 0, 19.22, 15.75, 0, 0, 3.47, '', 3, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2026-02-05 08:05:37', '2026-02-05 08:06:16'),
(268, 1, 0, 1, 0, 4.6, 1, 1, 0, 2, 'W38R+C2F, S.S.K.Nagar, Vanamamalai Nagar, Durai Samy Nagar, Madurai, Madakkulam, Tamil Nadu 625003, India', '2026-02-05 08:47:48', '9.916056099999999', '78.0900425', 'W4GC+CJC, North Lane, Simmakkal, Madurai Main, Madurai, Tamil Nadu 625001, India', '9.9260717', '78.1215208', 1, 3, 0, 19.22, 15.75, 0, 0, 3.47, '', 3, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2026-02-05 08:17:48', '2026-02-05 08:18:11'),
(269, 48, NULL, 8, 0, 3.3, 1, 1, 0, 2, 'Palanganatham, Madurai, Madurai South, Madurai, Tamil Nadu, 625003, India', '2026-02-05 13:30:00', '9.9101233333333', '78.089348333333', 'Ponmeni, Madurai, Tamil Nadu', '9.9278523', '78.0906824', 1, 3, 1, 17.24, 14.13, 0, 0, 3.11, '', 5, 0, 'null', 0, NULL, NULL, NULL, NULL, NULL, '2026-02-05 08:25:45', '2026-02-05 13:46:02');
INSERT INTO `trip_requests` (`id`, `customer_id`, `corporate_customer_id`, `driver_id`, `package_id`, `distance`, `vehicle_type`, `trip_type`, `trip_sub_type`, `booking_type`, `pickup_address`, `pickup_date`, `pickup_lat`, `pickup_lng`, `drop_address`, `drop_lat`, `drop_lng`, `surge`, `zone`, `payment_method`, `total`, `sub_total`, `promo`, `discount`, `tax`, `static_map`, `status`, `is_multiple_drops`, `contact`, `flag`, `agent_name`, `agent_phone_number`, `company_name`, `driver_note`, `customer_note`, `created_at`, `updated_at`) VALUES
(270, 0, 7, 0, 0, 7.19, 1, 1, 0, 2, 'Madakulam Kanmai, Tamil Nadu', '2026-02-05 13:30:08', '9.9182407', '78.0751774', 'Simmakkal, Madurai Main, Madurai, Tamil Nadu, India', '9.9260717', '78.1215208', 0, 3, 1, 23.17, 18.99, 0, 0, 4.18, '', 5, 0, NULL, 0, NULL, '+916383575669', 'AFC Tech', 'asas', 'asas', '2026-02-05 09:00:11', '2026-02-05 13:47:02'),
(271, 0, 7, 1, 0, 1.88, 1, 1, 0, 2, '42-1-13, Harvey Nagar 1st St, Pethaniapuram 2, Arappalayam, Madurai, Tamil Nadu 625016, India', '2026-02-05 13:40:41', '9.9285502', '78.0994099', 'Ponmeni, Madurai, Tamil Nadu, India', '9.9256569', '78.0901', 0, 3, 1, 15.07, 12.35, 0, 0, 2.72, '', 5, 0, NULL, 0, 'rithika', '+916383575669', 'AFC Tech', 'asas', 'asas', '2026-02-05 09:10:44', '2026-02-05 13:57:01'),
(272, 40, NULL, 1, 0, 3.1, 1, 1, 0, 1, '193/1 & 1934/3, Mullai Street, Madakulam Main Rd, Madurai, Madakkulam, Tamil Nadu 625003, India', '2026-02-05 09:12:41', '9.9102070148857', '78.089364878833', 'Ponmeni, Madurai, Tamil Nadu, India', '9.9256569', '78.0901', 1, 3, 1, 16.93, 13.88, 0, 0, 3.05, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2026-02-05 09:12:56', '2026-02-05 09:13:13'),
(273, 0, 7, 1, 0, 1.88, 1, 1, 0, 1, '42-1-13, Harvey Nagar 1st St, Pethaniapuram 2, Arappalayam, Madurai, Tamil Nadu 625016, India', '2026-02-05 09:35:49', '9.9285502', '78.0994099', 'Ponmeni, Madurai, Tamil Nadu, India', '9.9256569', '78.0901', 0, 3, 1, 15.07, 12.35, 0, 0, 2.72, '', 3, 0, NULL, 1, 'Rithika', '+916383575669', 'AFC Tech', 'asas', 'asas', '2026-02-05 09:35:51', '2026-02-05 09:36:02'),
(274, 0, 7, 0, 0, 1.88, 1, 1, 0, 2, '42-1-13, Harvey Nagar 1st St, Pethaniapuram 2, Arappalayam, Madurai, Tamil Nadu 625016, India', '2026-02-05 14:24:00', '9.9285502', '78.0994099', 'Ponmeni, Madurai, Tamil Nadu, India', '9.9256569', '78.0901', 0, 3, 1, 15.07, 12.35, 0, 0, 2.72, '', 5, 0, NULL, 0, 'Rithika', '+916383575669', 'AFC Tech', 'asas', 'asas', '2026-02-05 09:54:02', '2026-02-05 14:40:03'),
(275, 1, 0, 8, 0, 4.6, 1, 1, 0, 2, 'W38R+C2F, S.S.K.Nagar, Vanamamalai Nagar, Durai Samy Nagar, Madurai, Madakkulam, Tamil Nadu 625003, India', '2026-02-05 10:42:22', '9.916056099999999', '78.0900425', 'W4GC+CJC, North Lane, Simmakkal, Madurai Main, Madurai, Tamil Nadu 625001, India', '9.9260717', '78.1215208', 1, 3, 0, 19.22, 15.75, 0, 0, 3.47, '', 5, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2026-02-05 10:12:22', '2026-02-05 10:59:02'),
(276, 40, NULL, 1, 0, 5.8, 1, 1, 0, 2, '193/1 & 1934/3, Mullai Street, Madakulam Main Rd, Madurai, Madakkulam, Tamil Nadu 625003, India', '2026-02-05 09:14:13', '9.9102241890996', '78.08938767761', 'W4J4+3VG, 2nd St, Melaponnagaram, Arappalayam, Madurai, Tamil Nadu 625016, India', '9.9303697495326', '78.107265103608', 1, 3, 1, 21.05, 17.25, 0, 0, 3.8, '', 5, 0, 'null', 0, NULL, NULL, NULL, NULL, NULL, '2026-02-05 10:22:57', '2026-02-05 10:23:03'),
(277, 40, NULL, 1, 0, 3.5, 1, 1, 0, 2, '193/1 & 1934/3, Mullai Street, Madakulam Main Rd, Madurai, Madakkulam, Tamil Nadu 625003, India', '2026-02-05 14:53:54', '9.9102241890996', '78.08938767761', '2A, Harvey Nagar 1st St, near Devaki Scan, Arasaradi, Arappalayam, Madurai, Harvey Nagar, Tamil Nadu 625016, India', '9.9286129622293', '78.098237626255', 1, 3, 1, 17.54, 14.38, 0, 0, 3.16, '', 5, 0, 'null', 0, NULL, NULL, NULL, NULL, NULL, '2026-02-05 10:26:09', '2026-02-05 15:10:02'),
(278, 40, 0, 8, 0, 2.1, 1, 1, 0, 2, 'W38R+C2F, S.S.K.Nagar, Vanamamalai Nagar, Durai Samy Nagar, Madurai, Madakkulam, Tamil Nadu 625003, India', '2026-02-05 10:58:21', '9.916056099999999', '78.0900425', 'W3GR+727, Ponmeni, Madurai, Tamil Nadu 625016, India', '9.9256569', '78.09009999999999', 1, 3, 0, 15.41, 12.63, 0, 0, 2.78, '', 5, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2026-02-05 10:28:21', '2026-02-05 11:15:02'),
(279, 0, 7, 1, 0, 1.88, 1, 1, 0, 2, '42-1-13, Harvey Nagar 1st St, Pethaniapuram 2, Arappalayam, Madurai, Tamil Nadu 625016, India', '2026-02-05 15:14:46', '9.9285502', '78.0994099', 'Ponmeni, Madurai, Tamil Nadu, India', '9.9256569', '78.0901', 0, 3, 1, 15.07, 12.35, 0, 0, 2.72, '', 5, 0, NULL, 0, 'Teena', '+916383575669', 'AFC Tech', 'hghgh', 'gfgfg', '2026-02-05 10:44:49', '2026-02-05 15:31:02'),
(280, 40, NULL, 1, 0, 3.1, 1, 1, 0, 1, '193/1 & 1934/3, Mullai Street, Madakulam Main Rd, Madurai, Madakkulam, Tamil Nadu 625003, India', '2026-02-05 10:51:26', '9.9102136203527', '78.089382983744', 'Ponmeni, Madurai, Tamil Nadu, India', '9.9256569', '78.0901', 1, 3, 1, 16.93, 13.88, 0, 0, 3.05, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2026-02-05 10:52:11', '2026-02-05 10:52:24'),
(281, 40, NULL, 1, 0, 3.1, 1, 1, 0, 1, '193/1 & 1934/3, Mullai Street, Madakulam Main Rd, Madurai, Madakkulam, Tamil Nadu 625003, India', '2026-02-05 10:53:07', '9.9102086662525', '78.0893920362', 'Ponmeni, Madurai, Tamil Nadu, India', '9.9256569', '78.0901', 1, 3, 1, 16.93, 13.88, 0, 0, 3.05, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2026-02-05 10:53:23', '2026-02-05 10:53:32'),
(282, 40, NULL, 8, 0, 3.1, 1, 1, 0, 1, '193/1, Mullai street, Madakulam Main Rd, Marudhu Pandiar Nagar, Madurai, Madakkulam, Tamil Nadu 625003, India', '2026-02-05 10:56:48', '9.9101743178222', '78.089386336505', 'Ponmeni, Madurai, Tamil Nadu, India', '9.9256569', '78.0901', 1, 3, 1, 16.93, 13.88, 0, 0, 3.05, '', 4, 0, 'null', 0, NULL, NULL, NULL, NULL, NULL, '2026-02-05 10:57:26', '2026-02-05 10:57:31'),
(283, 40, NULL, 0, 0, 3.1, 1, 1, 0, 2, '193/1, Mullai street, Madakulam Main Rd, Marudhu Pandiar Nagar, Madurai, Madakkulam, Tamil Nadu 625003, India', '2026-02-05 15:29:19', '9.9101743178222', '78.089386336505', 'Ponmeni, Madurai, Tamil Nadu, India', '9.9256569', '78.0901', 1, 3, 1, 16.93, 13.88, 0, 0, 3.05, '', 5, 0, 'null', 0, NULL, NULL, NULL, NULL, NULL, '2026-02-05 10:59:38', '2026-02-05 15:46:02'),
(284, 1, NULL, 8, 0, 4.1, 1, 1, 0, 1, '193/1 & 1934/3, Mullai Street, Madakulam Main Rd, Madurai, Madakkulam, Tamil Nadu 625003, India', '2026-02-05 11:01:37', '9.9102301722514', '78.089390527457', '81-59, 1st St, Pethaniapuram 2, Arappalayam, Harvey Nagar, Madurai, Tamil Nadu 625016, India', '9.9309969989156', '78.100327569991', 1, 3, 1, 18.46, 15.13, 0, 0, 3.33, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2026-02-05 11:03:00', '2026-02-05 11:03:07'),
(285, 1, NULL, 8, 0, 3.8, 1, 1, 0, 1, '193/1 & 1934/3, Mullai Street, Madakulam Main Rd, Madurai, Madakkulam, Tamil Nadu 625003, India', '2026-02-05 11:32:15', '9.9102103558663', '78.089392539114', 'W4C6+47F, Junction, Madurai, Tamil Nadu 625016, India', '9.9204588219035', '78.110894132406', 1, 3, 1, 18, 14.75, 0, 0, 3.25, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2026-02-05 11:32:49', '2026-02-05 11:32:56'),
(286, 1, NULL, 8, 0, 7.1, 1, 1, 0, 1, '193/1 & 1934/3, Mullai Street, Madakulam Main Rd, Madurai, Madakkulam, Tamil Nadu 625003, India', '2026-02-05 11:48:45', '9.910246717248', '78.089195357028', '4, 4th St, Bharathi Nagar, Poonthamalli Nagar, Madurai, Tamil Nadu 625018, India', '9.9351031297739', '78.117852788419', 1, 3, 1, 23.03, 18.88, 0, 0, 4.15, '', 3, 0, 'null', 1, NULL, NULL, NULL, NULL, NULL, '2026-02-05 11:48:56', '2026-02-05 11:49:06'),
(287, 1, NULL, 8, 0, 3.7, 1, 1, 0, 2, '193/1 & 1934/3, Mullai Street, Madakulam Main Rd, Madurai, Madakkulam, Tamil Nadu 625003, India', '2026-02-05 19:21:00', '9.9101978054634', '78.089465964586', 'W4C5+V2W, Madurai, Tamil Nadu 625016, India', '9.9224753302181', '78.10768218711', 1, 3, 1, 17.85, 14.63, 0, 0, 3.22, '', 5, 0, 'null', 0, NULL, NULL, NULL, NULL, NULL, '2026-02-05 11:51:20', '2026-02-05 19:37:03'),
(288, 1, NULL, 8, 0, 4.5, 1, 1, 0, 2, '4A, Marudhu Pandiar Nagar, Madurai, Madakkulam, Tamil Nadu 625003, India', '2026-02-05 16:21:24', '9.9100889950546', '78.091061878949', 'Tirumangalam, Madurai Main, Madurai, Tamil Nadu 625001, India', '9.9198844239925', '78.119291123003', 1, 3, 1, 19.07, 15.63, 0, 0, 3.44, '', 5, 0, 'null', 0, NULL, NULL, NULL, NULL, NULL, '2026-02-05 12:01:29', '2026-02-05 16:38:03');

-- --------------------------------------------------------

--
-- Table structure for table `trip_request_statuses`
--

CREATE TABLE `trip_request_statuses` (
  `id` int(11) NOT NULL,
  `status` varchar(100) NOT NULL DEFAULT '1',
  `status_ar` varchar(150) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `trip_request_statuses`
--

INSERT INTO `trip_request_statuses` (`id`, `status`, `status_ar`, `created_at`, `updated_at`) VALUES
(1, 'Booking Placed', 'تم وضع الحجز', '2021-02-26 09:55:55', '2021-03-06 08:32:50'),
(2, 'Ride Later', 'اركب لاحقًا', '2021-02-26 09:55:55', '2021-03-06 08:33:12'),
(3, 'Accepted', 'وافقت', '2021-02-26 09:55:55', '2021-03-06 08:33:31'),
(4, 'Not Picked', 'غير منتقى', '2021-02-26 09:55:55', '2021-03-06 08:33:49'),
(5, 'Timeout', 'نفذ الوقت', '2021-02-26 09:55:55', '2021-03-06 08:34:05'),
(6, 'Cancelled by customer', 'ألغى العميل', '2021-02-26 09:55:55', '2021-03-06 08:34:05');

-- --------------------------------------------------------

--
-- Table structure for table `trip_settings`
--

CREATE TABLE `trip_settings` (
  `id` int(11) NOT NULL,
  `admin_commission` double NOT NULL DEFAULT 20,
  `service_fee` double DEFAULT 0,
  `maximum_searching_time` int(11) DEFAULT NULL,
  `booking_searching_radius` double NOT NULL,
  `gth_searching_radius` double NOT NULL DEFAULT 5,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `trip_settings`
--

INSERT INTO `trip_settings` (`id`, `admin_commission`, `service_fee`, `maximum_searching_time`, `booking_searching_radius`, `gth_searching_radius`, `created_at`, `updated_at`) VALUES
(1, 15, 10, 30, 50, 5, '2021-01-06 07:46:51', '2026-01-30 19:04:14');

-- --------------------------------------------------------

--
-- Table structure for table `trip_sub_types`
--

CREATE TABLE `trip_sub_types` (
  `id` int(11) NOT NULL,
  `trip_type` int(11) NOT NULL,
  `trip_sub_type` varchar(100) NOT NULL,
  `trip_sub_type_ar` varchar(100) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `trip_sub_types`
--

INSERT INTO `trip_sub_types` (`id`, `trip_type`, `trip_sub_type`, `trip_sub_type_ar`, `created_at`, `updated_at`) VALUES
(1, 3, 'Rounded Trip', 'Rounded Trip', '2024-11-12 18:27:55', '2024-11-12 18:27:55'),
(2, 3, 'One Way Trip', 'One Way Trip', '2024-11-12 18:28:17', '2024-11-12 18:28:17'),
(3, 4, 'Rounded Trip', 'Rounded Trip', '2024-11-12 18:28:27', '2024-11-12 18:28:27'),
(4, 4, 'One Way Trip', 'One Way Trip', '2024-11-12 18:28:38', '2024-11-12 18:28:38');

-- --------------------------------------------------------

--
-- Table structure for table `trip_types`
--

CREATE TABLE `trip_types` (
  `id` int(11) NOT NULL,
  `active_icon` varchar(250) NOT NULL,
  `Inactive_icon` varchar(250) NOT NULL,
  `name` varchar(250) NOT NULL,
  `vehicle_mode` int(11) NOT NULL,
  `name_ar` varchar(150) DEFAULT NULL,
  `sort` int(11) NOT NULL DEFAULT 0,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `trip_types`
--

INSERT INTO `trip_types` (`id`, `active_icon`, `Inactive_icon`, `name`, `vehicle_mode`, `name_ar`, `sort`, `status`, `created_at`, `updated_at`) VALUES
(1, 'trip_types//daily.png', 'trip_types//Daily In.png', 'Ride Hailing', 18, 'Panda Hailing', 0, 1, '2024-11-12 18:18:58', '2025-12-15 12:10:47'),
(2, 'trip_types//Rental-Ac.webp', 'trip_types//Rental In.png', 'Lease', 18, 'Kukodisha', 0, 1, '2024-11-12 18:19:31', '2025-12-15 12:11:00'),
(3, 'trip_types//Outstation-Ac.webp', 'trip_types//Outstation In.png', 'Intercounty', 18, 'Intercounty', 0, 1, '2024-11-12 18:20:04', '2025-12-15 12:11:17'),
(4, 'trip_types//image comm.png', 'trip_types//Commercial In 1b.png', 'Delivery', 19, 'Uwasilishaji', 0, 1, '2024-11-12 18:21:00', '2025-12-15 12:11:29'),
(5, 'trip_types//Shared-Ac.webp', 'trip_types//Shared In.png', 'Shared', 18, 'Imeshirikiwa', 0, 1, '2024-11-12 18:22:16', '2025-12-15 12:11:46');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_types`
--

CREATE TABLE `user_types` (
  `id` int(11) NOT NULL,
  `type_name` varchar(250) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_types`
--

INSERT INTO `user_types` (`id`, `type_name`, `created_at`, `updated_at`) VALUES
(1, 'Customer', '2021-03-01 09:58:53', '2021-03-01 09:58:53'),
(2, 'Driver', '2021-03-01 09:59:15', '2021-03-01 09:59:15'),
(4, 'Corporate Customer', '2025-12-29 11:23:11', '2025-12-29 11:23:11');

-- --------------------------------------------------------

--
-- Table structure for table `vehicle_categories`
--

CREATE TABLE `vehicle_categories` (
  `id` int(11) NOT NULL,
  `vehicle_type` varchar(250) NOT NULL,
  `vehicle_mode` int(11) NOT NULL,
  `base_fare` double NOT NULL DEFAULT 0,
  `price_per_km` double NOT NULL DEFAULT 0,
  `active_icon` varchar(250) NOT NULL,
  `inactive_icon` varchar(250) DEFAULT NULL,
  `description` text NOT NULL,
  `vehicle_type_ar` varchar(150) DEFAULT NULL,
  `description_ar` text DEFAULT NULL,
  `vehicle_slug` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `vehicle_categories`
--

INSERT INTO `vehicle_categories` (`id`, `vehicle_type`, `vehicle_mode`, `base_fare`, `price_per_km`, `active_icon`, `inactive_icon`, `description`, `vehicle_type_ar`, `description_ar`, `vehicle_slug`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Hydro EV Bikes/Parcel', 18, 0, 0, 'vehicle_categories//7ec6008e629e2944e401b772b45cd7b2.webp', 'vehicle_categories//df4bb2e07c8885d3b72243d5ec8f335b.webp', 'A hatchback offers a compact design with a versatile cargo area, making it ideal for city driving and versatile use. Its sporty look and efficient fuel economy blend practicality with style.', 'Hydro EV Bikes/Parcel', 'Hatchback hutoa muundo wa kompakt na eneo la kubeba mizigo, na kuifanya kuwa bora kwa uendeshaji wa jiji na matumizi anuwai. Mwonekano wake wa kimichezo na uchumi bora wa mafuta huchanganya utendakazi na mtindo.', 1, 1, '2024-11-12 18:10:53', '2026-02-03 18:12:21'),
(2, 'Hydro EV TukTuk', 18, 0, 0, 'vehicle_categories//1a39a82089ef70943b1d57f1b859acbe.webp', 'vehicle_categories//26359f46d645291f8015c4e309935644.webp', 'The sedan is a stylish and comfortable car designed for those who value elegance and practicality. With its spacious interior and smooth ride, it provides ample room for passengers and luggage, making it ideal for both daily commutes and long journeys.', 'Hydro EV TukTuk', 'Sedan ni gari la maridadi na la starehe iliyoundwa kwa wale wanaothamini uzuri na vitendo. Pamoja na mambo ya ndani ya wasaa na safari laini, hutoa nafasi ya kutosha kwa abiria na mizigo, na kuifanya kuwa bora kwa safari za kila siku na safari ndefu.', 2, 1, '2024-11-12 18:11:33', '2026-02-03 18:10:43'),
(3, 'Hydro EV Basic', 18, 0, 0, 'vehicle_categories//7e695cddbd9807c2767a4f05c37b000a.webp', 'vehicle_categories//26d831d985fe77ec7cc3b8b9540e9d54.webp', 'The term \'SUV\' is car industry jargon that\'s an acronym for Sports Utility Vehicle. It refers to a type of car that sits high off the ground and which often has four-wheel drive and rugged styling.', 'Hydro EV Basic', 'Neno \'SUV\' ni jargon ya tasnia ya magari ambayo ni kifupi cha Gari la Huduma za Michezo. Inarejelea aina ya gari ambalo huketi juu kutoka ardhini na ambalo mara nyingi huwa na kiendeshi cha magurudumu manne na mitindo mikali.', 2, 1, '2024-11-12 18:12:35', '2026-02-03 18:11:02'),
(11, 'Hydro EV Comfort', 18, 0, 0, 'vehicle_categories//2cc889166ddec294bdf751f9d27e6c95.webp', 'vehicle_categories//1ffa9349596d471b5a8338efb0f34b15.webp', 'heavy vehicle', 'Hydro EV Comfort', 'heavy vehicle', 5, 1, '2025-06-27 12:30:42', '2026-02-03 18:16:51'),
(12, 'Hydro EV SUV', 18, 0, 0, 'vehicle_categories//88f8ea084593bfb595aba4d9ecbcf4f6.webp', 'vehicle_categories//057f5eafc26989052abf5399c37ddf73.webp', 'Hydro EV SUV', 'Hydro EV SUV', 'Hydro EV SUV', 2, 1, '2026-02-03 18:17:26', '2026-02-03 18:17:26'),
(13, 'Hydro EV Lease', 18, 0, 0, 'vehicle_categories//817a810dd7b43118b6b73d33413868ef.webp', 'vehicle_categories//29e93745387efbfaf5b1f265238736a6.webp', 'Hydro EV Lease', 'Hydro EV Lease', 'Hydro EV Lease', 2, 1, '2026-02-03 18:17:55', '2026-02-03 18:17:55');

-- --------------------------------------------------------

--
-- Table structure for table `vehicle_slugs`
--

CREATE TABLE `vehicle_slugs` (
  `id` int(11) NOT NULL,
  `slug` varchar(250) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `vehicle_slugs`
--

INSERT INTO `vehicle_slugs` (`id`, `slug`, `created_at`, `updated_at`) VALUES
(1, 'bike', '2023-03-11 12:55:36', '2023-03-11 12:55:36'),
(2, 'car', '2023-03-11 12:55:52', '2023-03-11 12:55:52'),
(3, 'auto', '2023-03-11 12:56:05', '2023-03-11 12:56:05'),
(4, 'van', '2023-10-26 16:01:01', '2023-10-26 16:03:55'),
(5, 'truck', '2024-02-09 03:20:24', '2024-02-09 03:20:24');

-- --------------------------------------------------------

--
-- Table structure for table `website_settings`
--

CREATE TABLE `website_settings` (
  `id` int(11) NOT NULL,
  `title` varchar(250) NOT NULL,
  `description` text NOT NULL,
  `banner_image` varchar(250) NOT NULL,
  `playstore_link` varchar(250) NOT NULL,
  `appstore_link` varchar(250) NOT NULL,
  `store_image` varchar(250) NOT NULL,
  `store_title` varchar(250) NOT NULL,
  `store_description` text NOT NULL,
  `contact_link` varchar(250) NOT NULL,
  `website_color` varchar(250) NOT NULL,
  `facebook_link` varchar(250) NOT NULL,
  `twitter_link` varchar(250) NOT NULL,
  `linkedin_link` varchar(250) NOT NULL,
  `skype_link` varchar(250) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `website_settings`
--

INSERT INTO `website_settings` (`id`, `title`, `description`, `banner_image`, `playstore_link`, `appstore_link`, `store_image`, `store_title`, `store_description`, `contact_link`, `website_color`, `facebook_link`, `twitter_link`, `linkedin_link`, `skype_link`, `created_at`, `updated_at`) VALUES
(1, 'On Demand Ride Hailing Application Hydromobility EV', 'Book a ride in seconds and get to your destination safely and comfortably. Available 24/7 across the city.', 'banner_image/efcd83faae9838413a21aecbbb30f253.png', 'https://menpanitech.com/', 'https://menpanitech.com/', 'store_image/87130ce12cfa8c7e43edec55d8c016f0.png', 'Hydromobility EV', 'Hydromobility EV is an user-friendly mobile application designed to revolutionize the way people access transportation services', 'https://wa.me/+21624978684', '#1EC51D', 'https://menpanitech.com/', 'https://menpanitech.com/', 'https://menpanitech.com/', 'https://menpanitech.com/', '2024-12-27 11:31:25', '2025-10-15 13:39:17');

-- --------------------------------------------------------

--
-- Table structure for table `zones`
--

CREATE TABLE `zones` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `name_ar` varchar(250) NOT NULL,
  `polygon` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `zones`
--

INSERT INTO `zones` (`id`, `name`, `name_ar`, `polygon`, `created_at`, `updated_at`) VALUES
(1, 'Chennai', 'تشيناي', '12.700076,80.160223;12.919877,79.918418;13.323006,80.160223;13.279133,80.340552;12.700076,80.160223', '2025-10-13 16:34:13', '2025-10-13 16:36:32'),
(3, 'Madurai', 'Madurai', '10.081263,77.733207;9.710351,77.720930;9.716402,78.557855;10.314880,78.441217;10.081263,77.733207', '2025-10-14 15:52:03', '2025-10-14 18:07:10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_menu`
--
ALTER TABLE `admin_menu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admin_operation_log`
--
ALTER TABLE `admin_operation_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_operation_log_user_id_index` (`user_id`);

--
-- Indexes for table `admin_permissions`
--
ALTER TABLE `admin_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admin_permissions_name_unique` (`name`),
  ADD UNIQUE KEY `admin_permissions_slug_unique` (`slug`);

--
-- Indexes for table `admin_roles`
--
ALTER TABLE `admin_roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admin_roles_name_unique` (`name`),
  ADD UNIQUE KEY `admin_roles_slug_unique` (`slug`);

--
-- Indexes for table `admin_role_menu`
--
ALTER TABLE `admin_role_menu`
  ADD KEY `admin_role_menu_role_id_menu_id_index` (`role_id`,`menu_id`);

--
-- Indexes for table `admin_role_permissions`
--
ALTER TABLE `admin_role_permissions`
  ADD KEY `admin_role_permissions_role_id_permission_id_index` (`role_id`,`permission_id`);

--
-- Indexes for table `admin_role_users`
--
ALTER TABLE `admin_role_users`
  ADD KEY `admin_role_users_role_id_user_id_index` (`role_id`,`user_id`);

--
-- Indexes for table `admin_users`
--
ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admin_users_username_unique` (`username`);

--
-- Indexes for table `admin_user_permissions`
--
ALTER TABLE `admin_user_permissions`
  ADD KEY `admin_user_permissions_user_id_permission_id_index` (`user_id`,`permission_id`);

--
-- Indexes for table `app_details`
--
ALTER TABLE `app_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `app_settings`
--
ALTER TABLE `app_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `app_versions`
--
ALTER TABLE `app_versions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `booking_statuses`
--
ALTER TABLE `booking_statuses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cancellation_reasons`
--
ALTER TABLE `cancellation_reasons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cancellation_settings`
--
ALTER TABLE `cancellation_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `complaints`
--
ALTER TABLE `complaints`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `complaint_categories`
--
ALTER TABLE `complaint_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `complaint_sub_categories`
--
ALTER TABLE `complaint_sub_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact_settings`
--
ALTER TABLE `contact_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `corporate_agents`
--
ALTER TABLE `corporate_agents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `corporate_customers`
--
ALTER TABLE `corporate_customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `corporate_customer_requests`
--
ALTER TABLE `corporate_customer_requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `corporate_tutorials`
--
ALTER TABLE `corporate_tutorials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_chat_messages`
--
ALTER TABLE `customer_chat_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_favourites`
--
ALTER TABLE `customer_favourites`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_offers`
--
ALTER TABLE `customer_offers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_promo_histories`
--
ALTER TABLE `customer_promo_histories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_sos_contacts`
--
ALTER TABLE `customer_sos_contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_subscription_histories`
--
ALTER TABLE `customer_subscription_histories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_wallet_histories`
--
ALTER TABLE `customer_wallet_histories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `daily_fare_management`
--
ALTER TABLE `daily_fare_management`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `delivery_fare_management`
--
ALTER TABLE `delivery_fare_management`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dispatch_trips`
--
ALTER TABLE `dispatch_trips`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `drivers`
--
ALTER TABLE `drivers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `driver_bank_kyc_details`
--
ALTER TABLE `driver_bank_kyc_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `driver_checkins`
--
ALTER TABLE `driver_checkins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `driver_commissions`
--
ALTER TABLE `driver_commissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `driver_earnings`
--
ALTER TABLE `driver_earnings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `driver_hiring_fare_management`
--
ALTER TABLE `driver_hiring_fare_management`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `driver_hiring_requests`
--
ALTER TABLE `driver_hiring_requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `driver_hiring_statuses`
--
ALTER TABLE `driver_hiring_statuses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `driver_queries`
--
ALTER TABLE `driver_queries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `driver_recharges`
--
ALTER TABLE `driver_recharges`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `driver_tips`
--
ALTER TABLE `driver_tips`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `driver_trip_requests`
--
ALTER TABLE `driver_trip_requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `driver_tutorials`
--
ALTER TABLE `driver_tutorials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `driver_vehicles`
--
ALTER TABLE `driver_vehicles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `driver_wallet_histories`
--
ALTER TABLE `driver_wallet_histories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `driver_withdrawals`
--
ALTER TABLE `driver_withdrawals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `faqs`
--
ALTER TABLE `faqs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fare_management`
--
ALTER TABLE `fare_management`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feature_settings`
--
ALTER TABLE `feature_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gth_histories`
--
ALTER TABLE `gth_histories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `how_it_works`
--
ALTER TABLE `how_it_works`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `instant_offers`
--
ALTER TABLE `instant_offers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `lucky_offers`
--
ALTER TABLE `lucky_offers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mail_contents`
--
ALTER TABLE `mail_contents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `map_settings`
--
ALTER TABLE `map_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `missed_trip_requests`
--
ALTER TABLE `missed_trip_requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mpesa_transactions`
--
ALTER TABLE `mpesa_transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notification_messages`
--
ALTER TABLE `notification_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `offer_types`
--
ALTER TABLE `offer_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `operators`
--
ALTER TABLE `operators`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `operator_vehicles`
--
ALTER TABLE `operator_vehicles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `our_services`
--
ALTER TABLE `our_services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `outstation_fare_management`
--
ALTER TABLE `outstation_fare_management`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `packages`
--
ALTER TABLE `packages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `payment_histories`
--
ALTER TABLE `payment_histories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment_methods`
--
ALTER TABLE `payment_methods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment_statements`
--
ALTER TABLE `payment_statements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment_types`
--
ALTER TABLE `payment_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `policies`
--
ALTER TABLE `policies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `privacy_policies`
--
ALTER TABLE `privacy_policies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `promo_codes`
--
ALTER TABLE `promo_codes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `referral_settings`
--
ALTER TABLE `referral_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rental_fare_management`
--
ALTER TABLE `rental_fare_management`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `scratch_card_settings`
--
ALTER TABLE `scratch_card_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shared_fare_management`
--
ALTER TABLE `shared_fare_management`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shared_trip_settings`
--
ALTER TABLE `shared_trip_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `statuses`
--
ALTER TABLE `statuses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stops`
--
ALTER TABLE `stops`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `surge_fare_settings`
--
ALTER TABLE `surge_fare_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `surge_settings`
--
ALTER TABLE `surge_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tax_lists`
--
ALTER TABLE `tax_lists`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `term_conditions`
--
ALTER TABLE `term_conditions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tips`
--
ALTER TABLE `tips`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trips`
--
ALTER TABLE `trips`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trip_cancellations`
--
ALTER TABLE `trip_cancellations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trip_requests`
--
ALTER TABLE `trip_requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trip_request_statuses`
--
ALTER TABLE `trip_request_statuses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trip_settings`
--
ALTER TABLE `trip_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trip_sub_types`
--
ALTER TABLE `trip_sub_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trip_types`
--
ALTER TABLE `trip_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `user_types`
--
ALTER TABLE `user_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vehicle_categories`
--
ALTER TABLE `vehicle_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vehicle_slugs`
--
ALTER TABLE `vehicle_slugs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `website_settings`
--
ALTER TABLE `website_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zones`
--
ALTER TABLE `zones`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_menu`
--
ALTER TABLE `admin_menu`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=121;

--
-- AUTO_INCREMENT for table `admin_operation_log`
--
ALTER TABLE `admin_operation_log`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `admin_permissions`
--
ALTER TABLE `admin_permissions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `admin_roles`
--
ALTER TABLE `admin_roles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `admin_users`
--
ALTER TABLE `admin_users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `app_details`
--
ALTER TABLE `app_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `app_settings`
--
ALTER TABLE `app_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `app_versions`
--
ALTER TABLE `app_versions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `booking_statuses`
--
ALTER TABLE `booking_statuses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `cancellation_reasons`
--
ALTER TABLE `cancellation_reasons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `cancellation_settings`
--
ALTER TABLE `cancellation_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `complaints`
--
ALTER TABLE `complaints`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `complaint_categories`
--
ALTER TABLE `complaint_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `complaint_sub_categories`
--
ALTER TABLE `complaint_sub_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `contact_settings`
--
ALTER TABLE `contact_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `corporate_agents`
--
ALTER TABLE `corporate_agents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `corporate_customers`
--
ALTER TABLE `corporate_customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `corporate_customer_requests`
--
ALTER TABLE `corporate_customer_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `corporate_tutorials`
--
ALTER TABLE `corporate_tutorials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `customer_chat_messages`
--
ALTER TABLE `customer_chat_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `customer_favourites`
--
ALTER TABLE `customer_favourites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer_offers`
--
ALTER TABLE `customer_offers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer_promo_histories`
--
ALTER TABLE `customer_promo_histories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer_sos_contacts`
--
ALTER TABLE `customer_sos_contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `customer_subscription_histories`
--
ALTER TABLE `customer_subscription_histories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer_wallet_histories`
--
ALTER TABLE `customer_wallet_histories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `daily_fare_management`
--
ALTER TABLE `daily_fare_management`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `delivery_fare_management`
--
ALTER TABLE `delivery_fare_management`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `dispatch_trips`
--
ALTER TABLE `dispatch_trips`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `drivers`
--
ALTER TABLE `drivers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `driver_bank_kyc_details`
--
ALTER TABLE `driver_bank_kyc_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `driver_checkins`
--
ALTER TABLE `driver_checkins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `driver_commissions`
--
ALTER TABLE `driver_commissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `driver_earnings`
--
ALTER TABLE `driver_earnings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT for table `driver_hiring_fare_management`
--
ALTER TABLE `driver_hiring_fare_management`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `driver_hiring_requests`
--
ALTER TABLE `driver_hiring_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `driver_hiring_statuses`
--
ALTER TABLE `driver_hiring_statuses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `driver_queries`
--
ALTER TABLE `driver_queries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `driver_recharges`
--
ALTER TABLE `driver_recharges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `driver_tips`
--
ALTER TABLE `driver_tips`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `driver_trip_requests`
--
ALTER TABLE `driver_trip_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=283;

--
-- AUTO_INCREMENT for table `driver_tutorials`
--
ALTER TABLE `driver_tutorials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `driver_vehicles`
--
ALTER TABLE `driver_vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `driver_wallet_histories`
--
ALTER TABLE `driver_wallet_histories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT for table `driver_withdrawals`
--
ALTER TABLE `driver_withdrawals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `faqs`
--
ALTER TABLE `faqs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `fare_management`
--
ALTER TABLE `fare_management`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `feature_settings`
--
ALTER TABLE `feature_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `gth_histories`
--
ALTER TABLE `gth_histories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `how_it_works`
--
ALTER TABLE `how_it_works`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `instant_offers`
--
ALTER TABLE `instant_offers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lucky_offers`
--
ALTER TABLE `lucky_offers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mail_contents`
--
ALTER TABLE `mail_contents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `map_settings`
--
ALTER TABLE `map_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `missed_trip_requests`
--
ALTER TABLE `missed_trip_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1988;

--
-- AUTO_INCREMENT for table `mpesa_transactions`
--
ALTER TABLE `mpesa_transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `notification_messages`
--
ALTER TABLE `notification_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `offer_types`
--
ALTER TABLE `offer_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `operators`
--
ALTER TABLE `operators`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `operator_vehicles`
--
ALTER TABLE `operator_vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `our_services`
--
ALTER TABLE `our_services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `outstation_fare_management`
--
ALTER TABLE `outstation_fare_management`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `packages`
--
ALTER TABLE `packages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `payment_histories`
--
ALTER TABLE `payment_histories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=273;

--
-- AUTO_INCREMENT for table `payment_methods`
--
ALTER TABLE `payment_methods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `payment_statements`
--
ALTER TABLE `payment_statements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT for table `payment_types`
--
ALTER TABLE `payment_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `policies`
--
ALTER TABLE `policies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `privacy_policies`
--
ALTER TABLE `privacy_policies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `promo_codes`
--
ALTER TABLE `promo_codes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `ratings`
--
ALTER TABLE `ratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `referral_settings`
--
ALTER TABLE `referral_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `rental_fare_management`
--
ALTER TABLE `rental_fare_management`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `scratch_card_settings`
--
ALTER TABLE `scratch_card_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shared_fare_management`
--
ALTER TABLE `shared_fare_management`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `shared_trip_settings`
--
ALTER TABLE `shared_trip_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `statuses`
--
ALTER TABLE `statuses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `stops`
--
ALTER TABLE `stops`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `subscriptions`
--
ALTER TABLE `subscriptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `surge_fare_settings`
--
ALTER TABLE `surge_fare_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `surge_settings`
--
ALTER TABLE `surge_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tax_lists`
--
ALTER TABLE `tax_lists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `term_conditions`
--
ALTER TABLE `term_conditions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tips`
--
ALTER TABLE `tips`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `trips`
--
ALTER TABLE `trips`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=149;

--
-- AUTO_INCREMENT for table `trip_cancellations`
--
ALTER TABLE `trip_cancellations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `trip_requests`
--
ALTER TABLE `trip_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=289;

--
-- AUTO_INCREMENT for table `trip_request_statuses`
--
ALTER TABLE `trip_request_statuses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `trip_settings`
--
ALTER TABLE `trip_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `trip_sub_types`
--
ALTER TABLE `trip_sub_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `trip_types`
--
ALTER TABLE `trip_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user_types`
--
ALTER TABLE `user_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `vehicle_categories`
--
ALTER TABLE `vehicle_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `vehicle_slugs`
--
ALTER TABLE `vehicle_slugs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `website_settings`
--
ALTER TABLE `website_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `zones`
--
ALTER TABLE `zones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
