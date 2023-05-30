USE Library;

-- 3.1
    -- 3.1.1

    -- 3.1.2

    -- 3.1.3

    -- 3.1.4

    -- 3.1.5

    -- 3.1.6

    -- 3.1.7

-- 3.2

-- 3.2.1

SELECT 
    Books.ISBN,
    Books.Title,
    Book_Categories.Category,
    Book_Authors.Firstname,
    Book_Authors.Lastname,
    Books.Copies
FROM
    Books
INNER JOIN Book_Authors ON Books.ISBN = Book_Authors.ISBN
INNER JOIN Book_Categories on Books.ISBN = Book_Categories.ISBN;

-- 3.2.2

-- 3.2.3

SELECT 
    U.User_id, 
    U.Firstname, 
    U.Lastname, 
    BC.Category,
    AVG(Likert_Value) AS Review_AVG
FROM Reviews
    INNER JOIN Users U on Reviews.User_id = U.User_id
    INNER JOIN Books B on Reviews.ISBN = B.ISBN
    INNER JOIN Book_Categories BC on B.ISBN = BC.ISBN
        WHERE BC.Category = 'Fiction' AND U.User_id='USR-16635'
GROUP BY U.User_id, U.Firstname, U.Lastname, BC.Category;


-- 3.3

    -- 3.3.1

SELECT 
    BA.ISBN, 
    Title, 
    School_Library_id, 
    Publisher, 
    Page_Number, 
    Summary, 
    Copies, 
    BC.Category, 
    BA.Firstname, 
    BA.Lastname 
FROM Books
INNER JOIN Book_Categories BC on Books.ISBN = BC.ISBN
INNER JOIN Book_Authors BA on Books.ISBN = BA.ISBN
    WHERE BC.Category='Fiction' OR (BA.Firstname='Noah' AND BA.Lastname='Walker') OR Title='Uplift Echoes';

    -- 3.3.2

SELECT  
    U.Firstname,
    U.Lastname,
    Title,
    R.ISBN 
FROM 
    Books
INNER JOIN Reservations R on Books.ISBN = R.ISBN
INNER JOIN Users U on R.User_id = U.User_id 
    WHERE U.User_id = 'USR-69923';

