-- DDL initialize SchoolLibrary

DROP DATABASE IF EXISTS Library;

CREATE DATABASE Library;

use Library;

-- DROP tables if already exist

DROP TABLE IF EXISTS School_Library;
DROP TABLE IF EXISTS School_Phones;
DROP TABLE IF EXISTS School_Library_Email;
DROP TABLE IF EXISTS School_Library_Admins;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Users_Email;
DROP TABLE IF EXISTS Credentials;
DROP TABLE IF EXISTS Reviews;
DROP TABLE IF EXISTS Registrations;
DROP TABLE IF EXISTS Reservations;
DROP TABLE IF EXISTS Books;
DROP TABLE IF EXISTS Book_Categories;
DROP TABLE IF EXISTS Book_Authors;

-- DROP triggers if already exist

-- TODO

CREATE TABLE School_Library (
    School_Library_id VARCHAR(50) PRIMARY KEY,
    School_Name VARCHAR(150) UNIQUE,
    City VARCHAR(50) NOT NULL,
    Headmaster_Firstname VARCHAR(100) NOT NULL,
    Headmaster_Lastname VARCHAR(100) NOT NULL,
    Postal_Code INT NOT NULL,
    Street_Number INT NOT NULL,
    Street VARCHAR(200) NOT NULL
);

CREATE TABLE School_Phones (
    Phone VARCHAR(100) PRIMARY KEY,
    School_Library_id VARCHAR(50) NOT NULL,

    FOREIGN KEY (School_Library_id) REFERENCES School_Library(School_Library_id)
);

CREATE TABLE School_Library_Email (
    Email VARCHAR(255) PRIMARY KEY,
    School_Library_id VARCHAR(50) NOT NULL,

    FOREIGN KEY (School_Library_id) REFERENCES School_Library(School_Library_id)
);

CREATE TABLE School_Library_Admins (
    Admin_id VARCHAR(100) PRIMARY KEY,
    School_Library_id VARCHAR(50) NOT NULL,
    Firstname VARCHAR(255) NOT NULL,
    Lastname VARCHAR(255) NOT NULL,
    Cr_Admin_Username VARCHAR(255) UNIQUE NOT NULL,
    Cr_Admin_Password VARCHAR(255) NOT NULL,

    FOREIGN KEY (School_Library_id) REFERENCES School_Library(School_Library_id)
);

CREATE TABLE Users (
    User_id VARCHAR(100) PRIMARY KEY,
    School_Library_id VARCHAR(50) NOT NULL,
    Firstname VARCHAR(255) NOT NULL,
    Lastname VARCHAR(255) NOT NULL,
    Age INT NOT NULL,
    User_Role VARCHAR(100) NOT NULL,
    Available_Borrows INT NOT NULL,
    Total_Books_Borrowed INT NOT NULL,
    Account_Status BOOL DEFAULT 1,
    Academic_id VARCHAR(100) UNIQUE,

    FOREIGN KEY (School_Library_id) REFERENCES School_Library(School_Library_id)
);

CREATE TABLE Users_Email (
    Email VARCHAR(255) PRIMARY KEY,
    User_id VARCHAR(100) NOT NULL,

    FOREIGN KEY (User_id) REFERENCES Users(User_id)
);

CREATE TABLE Credentials (
    Creds_id VARCHAR(255) PRIMARY KEY,
    User_id VARCHAR(100) NOT NULL,
    Cr_Username VARCHAR(100) UNIQUE NOT NULL,
    Cr_Password VARCHAR(255) UNIQUE NOT NULL,

    FOREIGN KEY (User_id) REFERENCES Users(User_id)
);

CREATE TABLE Registrations (
    Registration_id VARCHAR(255) PRIMARY KEY,
    School_Library_id VARCHAR(50) NOT NULL,
    Firstname VARCHAR(255) NOT NULL,
    Lastname VARCHAR(255) NOT NULL,
    Age INT NOT NULL,
    Academic_id VARCHAR(255) NOT NULL,
    Registration_Status BOOL DEFAULT 0,
    User_Role VARCHAR(255) NOT NULL,
    Reg_Username VARCHAR(255) UNIQUE NOT NULL,
    Reg_Password VARCHAR(255) UNIQUE NOT NULL,

    FOREIGN KEY (School_Library_id) REFERENCES School_Library(School_Library_id)
);

CREATE TABLE Books (
    ISBN VARCHAR(255) PRIMARY KEY,
    School_Library_id VARCHAR(50) NOT NULL,
    Title VARCHAR(255) NOT NULL,
    Publisher VARCHAR(255) NOT NULL,
    Page_Number INT NOT NULL,
    Summary TEXT NOT NULL,
    Copies INT NOT NULL,

    FOREIGN KEY (School_Library_id) REFERENCES School_Library(School_Library_id)
);

CREATE TABLE Book_Categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ISBN VARCHAR(255) NOT NULL,
    Category VARCHAR(255),

    FOREIGN KEY (ISBN) REFERENCES Books(ISBN)
);

CREATE TABLE Book_Authors (
    id INT PRIMARY KEY AUTO_INCREMENT,
    Firstname VARCHAR(255) NOT NULL,
    Lastname VARCHAR(255) NOT NULL,
    ISBN VARCHAR(255) NOT NULL,

    FOREIGN KEY (ISBN) REFERENCES Books(ISBN)
);

CREATE TABLE Reviews (
    Review_id VARCHAR(255) PRIMARY KEY,
    User_id VARCHAR(100) NOT NULL,
    ISBN VARCHAR(255) NOT NULL,
    Likert_Value INT NOT NULL,
    Review_Text TEXT NOT NULL,
    Approve_Status BOOL DEFAULT 0,

    FOREIGN KEY (User_id) REFERENCES Users(User_id),
    FOREIGN KEY (ISBN) REFERENCES Books(ISBN)
);

CREATE TABLE Reservations (
    Reservations_id VARCHAR(50) PRIMARY KEY,
    School_Library_id VARCHAR(50) NOT NULL,
    ISBN VARCHAR(255) NOT NULL,
    User_id VARCHAR(100) NOT NULL,
    Admin_id VARCHAR(100) NOT NULL,
    Late_Days INT NOT NULL,

    FOREIGN KEY (School_Library_id) REFERENCES School_Library(School_Library_id),
    FOREIGN KEY (ISBN) REFERENCES Books(ISBN),
    FOREIGN KEY (User_id) REFERENCES Users(User_id),
    FOREIGN KEY (Admin_id) REFERENCES School_Library_Admins(Admin_id),

    Start_Date DATE DEFAULT (CURRENT_DATE),
    End_Date DATE
);
