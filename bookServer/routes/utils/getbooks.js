const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
require("dotenv").config();

function getBooks(req,res,next) {

    res.type("application/json");

    const connection = mysql.createConnection({
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : process.env.DB_DATABASE
    });

    connection.query("SELECT DISTINCT SL.School_Library_id,B.ISBN,B.Title, GROUP_CONCAT(DISTINCT Category) AS Book_Category,CONCAT(BA.Firstname,' ',BA.Lastname) AS Author,SL.School_Name, B.Publisher, B.Page_Number, B.Copies FROM Book_Categories" +
        " INNER JOIN Books B ON Book_Categories.ISBN = B.ISBN"  +
        " INNER JOIN School_Library SL ON B.School_Library_id = SL.School_Library_id" +
        " INNER JOIN Book_Authors BA ON B.ISBN = BA.ISBN" +
        " GROUP BY SL.School_Library_id,B.ISBN, B.Title, CONCAT(BA.Firstname,' ',BA.Lastname),SL.School_Name, B.Publisher, B.Page_Number, B.Copies",
    function(error,results,fields) {
        if (error) {
            console.error(error);
            res.status(500).json(
                {
                    "info" : "something broke"
                }
            );
        } else {
            if (results.length === 0) {
                res.status(400).json(
                    {
                        "info" : "no books found"
                    }
                );
            } else {
                res.status(200).json(
                    {
                        "books" : results
                    }
                );
            }
        }
    })
    connection.end();

}

router.get("/api/getbooks", getBooks);
module.exports=router;