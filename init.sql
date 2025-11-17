-- Create the database
CREATE DATABASE IF NOT EXISTS ergos;

-- Use the database
USE ergos;

-- Table 'plants'
CREATE TABLE IF NOT EXISTS plants (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    moisture FLOAT NOT NULL,
    digital FLOAT NOT NULL
);

CREATE USER 'ergos_admin'@'%' IDENTIFIED BY 'ergos123';
GRANT ALL ON ergos.* TO 'ergos_admin'@'%';
