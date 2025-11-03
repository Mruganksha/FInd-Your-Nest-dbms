-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: dbmsproject
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking` (
  `booking_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `listing_id` int DEFAULT NULL,
  `check_in_date` date DEFAULT NULL,
  `check_out_date` date DEFAULT NULL,
  `status` enum('Pending','Confirmed','Cancelled') DEFAULT 'Pending',
  `timestamp` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`booking_id`),
  KEY `user_id` (`user_id`),
  KEY `listing_id` (`listing_id`),
  CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`listing_id`) REFERENCES `listing` (`listing_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
INSERT INTO `booking` VALUES (1,1,5,'2025-11-01','2026-04-30','Confirmed','2025-10-24 12:47:39'),(2,2,6,'2025-11-10','2026-05-01','Pending','2025-10-24 12:47:39');
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facility`
--

DROP TABLE IF EXISTS `facility`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `facility` (
  `facility_id` int NOT NULL AUTO_INCREMENT,
  `facility_name` varchar(50) NOT NULL,
  PRIMARY KEY (`facility_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facility`
--

LOCK TABLES `facility` WRITE;
/*!40000 ALTER TABLE `facility` DISABLE KEYS */;
INSERT INTO `facility` VALUES (1,'Wi-Fi'),(2,'Laundry'),(3,'Meals'),(4,'Attached Bathroom'),(5,'Parking');
/*!40000 ALTER TABLE `facility` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `listing`
--

DROP TABLE IF EXISTS `listing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listing` (
  `listing_id` int NOT NULL AUTO_INCREMENT,
  `owner_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(200) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `rent` decimal(10,2) DEFAULT NULL,
  `gender_preference` enum('Male','Female','Co-ed') DEFAULT NULL,
  `contact_number` varchar(15) DEFAULT NULL,
  `verified` tinyint(1) DEFAULT '0',
  `latitude` decimal(9,6) DEFAULT NULL,
  `longitude` decimal(9,6) DEFAULT NULL,
  `available_rooms` int DEFAULT '0',
  `added_on` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`listing_id`),
  KEY `owner_id` (`owner_id`),
  CONSTRAINT `listing_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listing`
--

LOCK TABLES `listing` WRITE;
/*!40000 ALTER TABLE `listing` DISABLE KEYS */;
INSERT INTO `listing` VALUES (5,3,'Sunny PG','123 MG Road','Pune',8000.00,'Female','9876543210',1,18.520400,73.856700,5,'2025-10-24 12:42:01'),(6,3,'Comfort Hostel','456 FC Road','Pune',6000.00,'Co-ed','9876543211',1,18.516700,73.856300,8,'2025-10-24 12:42:01'),
(3, 'GreenStay Ladies PG', '12 FC Road', 'Pune', 7000.00, 'Female', '9876500001', 1, 18.520300, 73.856800, 6),
(3, 'Metro Boys Hostel', '89 Andheri West', 'Mumbai', 8500.00, 'Male', '9876500002', 1, 19.113600, 72.869700, 10),
(3, 'Elite Co-Living Space', '44 Indiranagar', 'Bangalore', 9500.00, 'Co-ed', '9876500003', 1, 12.971600, 77.594600, 12),
(3, 'StudyHub PG', '201 Karol Bagh', 'Delhi', 6000.00, 'Male', '9876500004', 0, 28.651700, 77.222300, 8),
(3, 'Comfort Nest Girls Hostel', '55 Banjara Hills', 'Hyderabad', 7500.00, 'Female', '9876500005', 1, 17.385000, 78.486700, 5),
(3, 'Skyline PG', '9 T Nagar', 'Chennai', 5500.00, 'Co-ed', '9876500006', 0, 13.082700, 80.270700, 15),
(3, 'Peace Stay Boys PG', '77 Senapati Bapat Road', 'Pune', 5000.00, 'Male', '9876500007', 1, 18.520500, 73.855800, 4),
(3, 'Urban Stay Co-Living', '102 Bandra East', 'Mumbai', 6800.00, 'Co-ed', '9876500008', 1, 19.059500, 72.829500, 9),
(3, 'Heritage Girls PG', '31 MI Road', 'Jaipur', 6200.00, 'Female', '9876500009', 1, 26.912400, 75.787300, 7),
(3, 'TechNest PG', '88 Hinjewadi Phase 1', 'Pune', 9000.00, 'Co-ed', '9876500010', 1, 18.597200, 73.732600, 11),
(3, 'Student Stay PG', '14 Navrangpura', 'Ahmedabad', 5800.00, 'Co-ed', '9876500011', 1, 23.022500, 72.571400, 10),
(3, 'BrightNest Boys Hostel', '21 Salt Lake Sector 5', 'Kolkata', 6200.00, 'Male', '9876500012', 0, 22.572600, 88.363900, 7),
(3, 'SkyView Girls PG', '7 HSR Layout', 'Bangalore', 8200.00, 'Female', '9876500013', 1, 12.912100, 77.644600, 6),
(3, 'YouthConnect PG', '33 Connaught Place', 'Delhi', 7000.00, 'Co-ed', '9876500014', 1, 28.630400, 77.217700, 12),
(3, 'Campus Corner Hostel', '12 Camp Area', 'Pune', 6500.00, 'Male', '9876500015', 0, 18.520600, 73.857000, 9),
(3, 'Friendly Homes PG', '96 BTM Layout', 'Bangalore', 7800.00, 'Co-ed', '9876500016', 1, 12.916600, 77.610100, 11),
(3, 'CityComfort Girls Stay', '19 Charminar Street', 'Hyderabad', 7200.00, 'Female', '9876500017', 1, 17.361600, 78.474700, 8),
(3, 'Hostel Prime', '5 Civil Lines', 'Jaipur', 5600.00, 'Male', '9876500018', 0, 26.912300, 75.786900, 6),
(3, 'Metro CoLiving Hub', 'BTM 2nd Stage', 'Bangalore', 9800.00, 'Co-ed', '9876500019', 1, 12.915600, 77.609100, 15),
(3, 'Oxygen PG', 'Bhandarkar Road', 'Pune', 8900.00, 'Female', '9876500020', 1, 18.514900, 73.840200, 10);
/*!40000 ALTER TABLE `listing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `listing_facility`
--

DROP TABLE IF EXISTS `listing_facility`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listing_facility` (
  `listing_id` int NOT NULL,
  `facility_id` int NOT NULL,
  PRIMARY KEY (`listing_id`,`facility_id`),
  KEY `facility_id` (`facility_id`),
  CONSTRAINT `listing_facility_ibfk_1` FOREIGN KEY (`listing_id`) REFERENCES `listing` (`listing_id`),
  CONSTRAINT `listing_facility_ibfk_2` FOREIGN KEY (`facility_id`) REFERENCES `facility` (`facility_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listing_facility`
--

LOCK TABLES `listing_facility` WRITE;
/*!40000 ALTER TABLE `listing_facility` DISABLE KEYS */;
INSERT INTO `listing_facility` VALUES (5,1),(6,1),(5,2),(5,3),(6,4),(6,5);
/*!40000 ALTER TABLE `listing_facility` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `report_id` int NOT NULL AUTO_INCREMENT,
  `listing_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `reason` text,
  `report_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` enum('Pending','Resolved') DEFAULT 'Pending',
  PRIMARY KEY (`report_id`),
  KEY `listing_id` (`listing_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `report_ibfk_1` FOREIGN KEY (`listing_id`) REFERENCES `listing` (`listing_id`),
  CONSTRAINT `report_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
INSERT INTO `report` VALUES (1,5,2,'Incorrect rent information','2025-10-24 12:47:54','Pending');
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `listing_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `comment` text,
  `review_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`review_id`),
  KEY `listing_id` (`listing_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `review_ibfk_1` FOREIGN KEY (`listing_id`) REFERENCES `listing` (`listing_id`),
  CONSTRAINT `review_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `review_chk_1` CHECK (((`rating` >= 1) and (`rating` <= 5)))
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (7,5,1,5,'Very comfortable and safe!','2025-10-24 12:45:04'),(8,6,2,4,'Good facilities but a bit noisy.','2025-10-24 12:45:04');
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roommate_profile`
--

DROP TABLE IF EXISTS `roommate_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roommate_profile` (
  `profile_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `budget` decimal(10,2) DEFAULT NULL,
  `gender` enum('Male','Female','Other') DEFAULT NULL,
  `preferred_location` varchar(100) DEFAULT NULL,
  `college_name` varchar(100) DEFAULT NULL,
  `lifestyle_habits` text,
  `roommate_pref` text,
  PRIMARY KEY (`profile_id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `roommate_profile_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roommate_profile`
--

LOCK TABLES `roommate_profile` WRITE;
/*!40000 ALTER TABLE `roommate_profile` DISABLE KEYS */;
INSERT INTO `roommate_profile` VALUES (1,1,8000.00,'Female','Near MG Road','COEP','Quiet, Non-smoker','No pets'),(2,2,6000.00,'Male','Near FC Road','MIT','Sociable, Non-smoker','No restrictions');
/*!40000 ALTER TABLE `roommate_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `role` enum('Student','Owner') NOT NULL,
  `gender` enum('Male','Female','Other') DEFAULT NULL,
  `college_name` varchar(100) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Alice Johnson','alice@student.com','hashed_password_here',NULL,'Student','Female','COEP',NULL,'2025-10-24 12:41:49'),(2,'Bob Smith','bob@student.com','hashed_password_here',NULL,'Student','Male','MIT',NULL,'2025-10-24 12:41:49'),(3,'Charlie Owner','charlie@hostel.com','hashed_password_here',NULL,'Owner','Male','',NULL,'2025-10-24 12:41:49');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_preferences`
--

DROP TABLE IF EXISTS `user_preferences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_preferences` (
  `pref_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `preferred_city` varchar(50) DEFAULT NULL,
  `min_budget` decimal(10,2) DEFAULT NULL,
  `max_budget` decimal(10,2) DEFAULT NULL,
  `preferred_facilities` text,
  `preferred_gender` enum('Male','Female','Co-ed') DEFAULT NULL,
  PRIMARY KEY (`pref_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_preferences_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_preferences`
--

LOCK TABLES `user_preferences` WRITE;
/*!40000 ALTER TABLE `user_preferences` DISABLE KEYS */;
INSERT INTO `user_preferences` VALUES (1,1,'Pune',5000.00,9000.00,'Wi-Fi,Laundry,Meals','Female'),(2,2,'Pune',4000.00,7000.00,'Wi-Fi,Attached Bathroom','Co-ed');
/*!40000 ALTER TABLE `user_preferences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist` (
  `wishlist_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `listing_id` int DEFAULT NULL,
  `added_on` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`wishlist_id`),
  KEY `user_id` (`user_id`),
  KEY `listing_id` (`listing_id`),
  CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `wishlist_ibfk_2` FOREIGN KEY (`listing_id`) REFERENCES `listing` (`listing_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist`
--

LOCK TABLES `wishlist` WRITE;
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
INSERT INTO `wishlist` VALUES (1,1,5,'2025-10-24 12:47:30'),(2,2,6,'2025-10-24 12:47:30');
/*!40000 ALTER TABLE `wishlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-03 13:27:55
