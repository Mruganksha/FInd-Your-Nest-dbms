
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(30) DEFAULT 'Student',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS listings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  city VARCHAR(100),
  address VARCHAR(255),
  rent INT,
  available_rooms INT,
  gender_preference VARCHAR(50),
  amenities TEXT,
  images TEXT,
  owner_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS wishlist (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  listing_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY user_listing (user_id, listing_id)
);

INSERT IGNORE INTO users (id, name, email, password, role) VALUES
(1,'Alice Kumar','alice@example.com','password123','Student'),
(2,'Rohit Verma','rohit@example.com','password123','Owner');

INSERT IGNORE INTO listings (id, name, description, city, address, rent, available_rooms, gender_preference, amenities, images, owner_id) VALUES
(1,'Cozy PG near Station','Shared rooms, WiFi, Meals included','Pune','Near Shivaji Nagar',8000,6,'Male','["WiFi","Meals","Laundry"]','["/images/pg1-1.jpg"]',2),
(2,'Modern Hostel - Girls','Private rooms, AC, Study room','Pune','Koregaon Park',12000,3,'Female','["AC","Study Room","Parking"]','["/images/hostel1.jpg"]',2);

INSERT IGNORE INTO wishlist (user_id, listing_id) VALUES (1,1);