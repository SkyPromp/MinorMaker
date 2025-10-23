-- Create the database
CREATE DATABASE IF NOT EXISTS vertical_garden_db;

-- Use the database
USE vertical_garden_db;

-- Table 'plants'
CREATE TABLE IF NOT EXISTS plants (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    moisture FLOAT NOT NULL,
    digital FLOAT NOT NULL
);

CREATE USER 'garden_admin'@'%' IDENTIFIED BY 'garden123';
GRANT ALL ON vertical_garden_db.* TO 'garden_admin'@'%';
