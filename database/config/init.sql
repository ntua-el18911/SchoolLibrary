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
DROP TRIGGER IF EXISTS registration_status_student;
DROP TRIGGER IF EXISTS add_total_book;
DROP TRIGGER IF EXISTS book_return;


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
    User_id VARCHAR(100)  PRIMARY KEY ,
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
    Registration_Status VARCHAR(100),
    User_Role VARCHAR(255) NOT NULL,
    Reg_Username VARCHAR(255) UNIQUE NOT NULL,
    Reg_Password VARCHAR(255) UNIQUE NOT NULL,
    Reg_Email VARCHAR(255) NOT NULL,

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

CREATE TABLE Book_System_Live (
    Book_System_Live_id VARCHAR(50) PRIMARY KEY,
    School_Library_id VARCHAR(50) NOT NULL,
    ISBN VARCHAR(255) NOT NULL,
    User_id VARCHAR(100) NOT NULL,
    Admin_id VARCHAR(100) NOT NULL,
    Late_Days INT NOT NULL,
    Rent_Active bool NOT NULL,


    FOREIGN KEY (School_Library_id) REFERENCES School_Library(School_Library_id),
    FOREIGN KEY (ISBN) REFERENCES Books(ISBN),
    FOREIGN KEY (User_id) REFERENCES Users(User_id),
    FOREIGN KEY (Admin_id) REFERENCES School_Library_Admins(Admin_id),

    Start_Date DATE DEFAULT (CURRENT_DATE),
    End_Date DATE DEFAULT (DATE_ADD(CURRENT_DATE, INTERVAL 15 DAY))
);

CREATE TABLE Reservations (
    Reservations_id VARCHAR(255) NOT NULL,
    School_Library_id VARCHAR(50) NOT NULL,
    User_id VARCHAR(250) NOT NULL,
    ISBN VARCHAR(255) NOT NULL,
    Reservation_Date DATE NOT NULL,
    Reservation_status VARCHAR(255) NOT NULL,

    FOREIGN KEY (ISBN) REFERENCES Books(ISBN),
    FOREIGN KEY (School_Library_id) REFERENCES School_Library(School_Library_id),
    FOREIGN KEY (User_id) REFERENCES Users(User_id)
);

-- Create Indexes

CREATE INDEX Book_System_Live_ISBN_INDEX ON Book_System_Live(ISBN);
CREATE INDEX Reviews_INDEX ON Reviews(ISBN,User_id);
CREATE INDEX Book_Authors_INDEX ON Book_Authors(ISBN);
CREATE INDEX Book_Categories_INDEX ON Book_Categories(ISBN);
CREATE INDEX Books_INDEX ON Books(ISBN,School_Library_id);
CREATE INDEX Registrations_INDEX ON Registrations(School_Library_id);
CREATE INDEX Credentials_INDEX ON Credentials(Cr_Username,Cr_Password);
CREATE INDEX Users_INDEX ON Users(Available_Borrows,Total_Books_Borrowed);

-- Create Triggers

CREATE TRIGGER registration_status_student AFTER UPDATE ON Registrations FOR EACH ROW
    BEGIN
        IF (NEW.Registration_Status = 'approved') AND (OLD.User_Role = 'student')
            THEN
                INSERT INTO Users VALUES (
                                          OLD.Academic_id,
                                          OLD.School_Library_id,
                                          OLD.Firstname,
                                          OLD.Lastname,
                                          OLD.Age,
                                          OLD.User_Role,
                                          '2',
                                          '0',
                                          '1',
                                          OLD.Academic_id);
                INSERT INTO Credentials(USER_ID, CR_USERNAME, CR_PASSWORD) VALUES (OLD.Academic_id, OLD.Reg_Username, OLD.Reg_Password);
                INSERT INTO Users_Email VALUES (OLD.Reg_Email, OLD.Academic_id);
        end if;

        IF (NEW.Registration_Status = 'approved') AND (OLD.User_Role = 'instructor')
            THEN
                INSERT INTO Users VALUES (
                                          OLD.Academic_id,
                                          OLD.School_Library_id,
                                          OLD.Firstname,
                                          OLD.Lastname,
                                          OLD.Age,
                                          OLD.User_Role,
                                          '1',
                                          '0',
                                          '1',
                                          OLD.Academic_id);
                INSERT INTO Credentials(USER_ID, CR_USERNAME, CR_PASSWORD) VALUES (OLD.Academic_id, OLD.Reg_Username, OLD.Reg_Password);
                INSERT INTO Users_Email VALUES (OLD.Reg_Email, OLD.Academic_id);
        end if;
END;

CREATE TRIGGER add_total_book AFTER INSERT ON Book_System_Live FOR EACH ROW
        BEGIN
            IF (NEW.Rent_Active = '1')
            THEN
                UPDATE Users
                    SET Total_Books_Borrowed = Total_Books_Borrowed + 1 WHERE User_id = NEW.User_id;
                UPDATE Users
                    SET Available_Borrows = Available_Borrows - 1 WHERE User_id = NEW.User_id;
                UPDATE Books SET Copies = Copies - 1 WHERE Books.ISBN = NEW.ISBN;
            END IF;
        END;

CREATE TRIGGER book_return AFTER UPDATE ON Book_System_Live FOR EACH ROW
        BEGIN
            if (NEW.Rent_Active = '0')
            THEN
                UPDATE Users SET Available_Borrows = Available_Borrows + 1 WHERE User_id = NEW.User_id;
                UPDATE Books SET Copies = Copies + 1 WHERE Books.ISBN = NEW.ISBN;
            END IF;
        END;

-- Create Events

CREATE EVENT IF NOT EXISTS book_delay
    ON SCHEDULE EVERY 1 MINUTE
    DO
    BEGIN
       UPDATE Book_System_Live
           SET Late_Days = Late_Days + 1 WHERE End_Date < CURRENT_DATE AND Rent_Active = 1;
    END;

CREATE EVENT IF NOT EXISTS clear_reservations
    ON SCHEDULE EVERY 1 MINUTE
    DO
    BEGIN
        DELETE FROM Reservations WHERE Reservation_status = '0';
    END;

CREATE EVENT IF NOT EXISTS auto_cancel_reservations
    ON SCHEDULE EVERY 1 MINUTE
    DO
    BEGIN
        UPDATE Reservations
            SET Reservation_status = 0 WHERE Reservation_Date < CURRENT_DATE;
    END;

CREATE EVENT IF NOT EXISTS clear_rejected_registrations
    ON SCHEDULE EVERY 1 MINUTE
    DO
    BEGIN
        DELETE FROM Registrations WHERE Registration_Status = 'rejected' OR Registration_Status = 'approved';
    END;

