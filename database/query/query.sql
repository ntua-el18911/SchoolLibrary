USE Library;

-- 3.1
    -- 3.1.1

SELECT SL.School_Name, Book_System_Live.Start_Date, COUNT(Book_System_Live.School_Library_id) AS School_Reservations
FROM Book_System_Live
INNER JOIN School_Library SL ON Book_System_Live.School_Library_id = SL.School_Library_id
WHERE MONTH(Book_System_Live.Start_Date) > 5 OR MONTH(Book_System_Live.Start_Date) = 5 OR YEAR(Book_System_Live.Start_Date) > 2024 OR YEAR(Book_System_Live.Start_Date) = 2024
GROUP BY SL.School_Name, Book_System_Live.Start_Date;
    
    -- 3.1.2

SELECT BA.Firstname AS Author_Firstname, BA.Lastname AS Author_Lastname, U.Firstname, U.Lastname,Category
FROM Book_Categories
INNER JOIN Book_Authors BA on Book_Categories.ISBN = BA.ISBN
INNER JOIN Book_System_Live R on BA.ISBN = R.ISBN
INNER JOIN Users U on R.User_id = U.User_id
WHERE Category = 'Romance' AND U.User_Role = 'instructor' AND YEAR(R.Start_Date) > 2022;    

    -- 3.1.3

SELECT Firstname, Lastname,User_Role,Age, Total_Books_Borrowed From Users
WHERE Age < 40 AND User_Role='instructor' ORDER BY Total_Books_Borrowed DESC LIMIT 5;

    -- 3.1.4

SELECT DISTINCT id,Firstname AS Author_Firstname, Lastname AS Author_Lastname, B.Title, Book_Authors.ISBN
FROM Book_Authors
INNER JOIN Books B on Book_Authors.ISBN = B.ISBN
WHERE Book_Authors.ISBN NOT IN (
    SELECT ISBN FROM Book_System_Live);

    -- 3.1.5

SELECT SLA.Firstname AS Admin_Firstname, SLA.Lastname AS Admin_Lastname,Book_System_Live.Admin_id, COUNT(Book_System_Live.Admin_id)
FROM Book_System_Live
INNER JOIN School_Library_Admins SLA on Book_System_Live.Admin_id = SLA.Admin_id
    WHERE YEAR(Book_System_Live.Start_Date) > 2022
    GROUP BY Book_System_Live.Admin_id
HAVING COUNT(Book_System_Live.Admin_id) > 4 AND COUNT(Book_System_Live.Admin_id) = (
    SELECT 
        COUNT(Book_System_Live.Admin_id) AS Occurrences
    FROM Book_System_Live
    GROUP BY Book_System_Live.Admin_id
    ORDER BY Occurrences DESC
    LIMIT 1
);

    -- 3.1.6

SELECT ISBN,Category_Tuples,COUNT(Category_Tuples) AS Occurrences FROM (
SELECT BC.ISBN, GROUP_CONCAT(DISTINCT BC.Category) AS Category_Tuples FROM Book_System_Live
INNER JOIN Book_Categories BC on Book_System_Live.ISBN = BC.ISBN
GROUP BY BC.ISBN) AS S
GROUP BY ISBN, Category_Tuples LIMIT 3;

    -- 3.1.7
    -- The max number of books for an author is 5.

SELECT Firstname,Lastname,COUNT(*) AS Number_Of_Books FROM Book_Authors
GROUP BY Firstname, Lastname
HAVING COUNT(*) < (SELECT MAX(Number_Of_Books)-2 FROM (
SELECT COUNT(*) AS Number_Of_Books FROM Book_Authors GROUP BY Firstname,Lastname)
AS S)
ORDER BY Number_Of_Books DESC;


-- 3.2

    -- 3.2.1

SELECT Books.ISBN,Books.Title,Book_Categories.Category,Book_Authors.Firstname AS Authors_Firstname,Book_Authors.Lastname AS Authors_Lastname,Books.Copies
FROM Books
INNER JOIN Book_Authors ON Books.ISBN = Book_Authors.ISBN
INNER JOIN Book_Categories on Books.ISBN = Book_Categories.ISBN
WHERE Book_Categories.Category='Romance' AND Book_Authors.Firstname='Sophia' AND Book_Authors.Lastname='Smith' AND Copies=10;

-- Could be OR, ambiguous question

    -- 3.2.2

SELECT B.ISBN,B.Title,Academic_id,U.Firstname,U.Lastname,Start_Date,End_Date,Late_Days FROM Book_System_Live
INNER JOIN Users U on Book_System_Live.User_id = U.User_id
INNER JOIN Books B on Book_System_Live.ISBN = B.ISBN
WHERE Late_Days > 0 AND Rent_Active=1;

    -- 3.2.3

SELECT U.User_id, U.Firstname, U.Lastname, BC.Category, AVG(Likert_Value) AS Review_AVG FROM Reviews
INNER JOIN Users U on Reviews.User_id = U.User_id
INNER JOIN Books B on Reviews.ISBN = B.ISBN
INNER JOIN Book_Categories BC on B.ISBN = BC.ISBN
WHERE BC.Category = 'Fiction'
GROUP BY U.User_id, U.Firstname, U.Lastname, BC.Category;


-- 3.3

    -- 3.3.1

SELECT BA.ISBN, Title, School_Library_id, Publisher, Page_Number, Summary, Copies, BC.Category, BA.Firstname AS Author_Firstname, BA.Lastname AS Author_Lastname
FROM Books
INNER JOIN Book_Categories BC on Books.ISBN = BC.ISBN
INNER JOIN Book_Authors BA on Books.ISBN = BA.ISBN
    WHERE BC.Category='Fiction' OR (BA.Firstname='Noah' AND BA.Lastname='Walker') OR Title='Uplift Echoes';

    -- 3.3.2

SELECT R.ISBN,Title,U.Firstname,U.Lastname FROM Books
INNER JOIN Book_System_Live R on Books.ISBN = R.ISBN
INNER JOIN Users U on R.User_id = U.User_id 
WHERE U.User_id = 'USR-63077';
