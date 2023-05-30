USE Library;

-- 3.2

-- 3.2.1

SELECT Books.ISBN,
       Books.Title,
       Book_Categories.Category,
       Book_Authors.Firstname,
       Book_Authors.Lastname,
       Books.Copies
    FROM
        Books
INNER JOIN
            Book_Authors ON Books.ISBN = Book_Authors.ISBN
INNER JOIN
            Book_Categories on Books.ISBN = Book_Categories.ISBN;

-- 3.2.2

