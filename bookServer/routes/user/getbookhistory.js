const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
require("dotenv").config();

function getBookHistory(req,res,next) {

    res.type("application/json");

    const connection = mysql.createConnection({
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : process.env.DB_DATABASE
    });

    const user_id = req.body.user_id;

    //TODO check body

    connection.query("SELECT Books.ISBN,Title, U.Firstname,U.Lastname,R.Start_Date,R.End_Date FROM Books" +
    " INNER JOIN Book_System_Live R on Books.ISBN = R.ISBN" +
    " INNER JOIN Users U on R.User_id = U.User_id" +
    " WHERE U.User_id = ?",[user_id], 
    (error,results) => {
        if (error) {
            console.error(error);
            res.status(500).json(
                {
                    "info" : "something broke"
                }
            );
        } else {
            if (results.length === 0) {
                res.status(404).json(
                    {
                        "info" : "no history found"
                    }
                );
            } else {
                res.status(200).json(
                    {
                        "book_history" : results
                    }
                );
            }
        }
    });

    connection.end();

}

router.post("/api/bookhistory", getBookHistory);
module.exports=router;