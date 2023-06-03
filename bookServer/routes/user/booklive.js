const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
require("dotenv").config();

function get_active_books(req,res,next) {

    res.type("application/json");

    const connection = mysql.createConnection({
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : process.env.DB_DATABASE
    });

    const user_id = req.body.user_id;

    //TODO check body

    connection.query("SELECT B.ISBN,B.Title,Start_Date,End_Date,Late_Days FROM Book_System_Live" +
    " INNER JOIN Books B on Book_System_Live.ISBN = B.ISBN" +
    " WHERE User_id=?",[user_id], 
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
                        "info" : "no active borrows found"
                    }
                );
            } else {
                res.status(200).json(
                    {
                        "book_activity" : results
                    }
                );
            }
        }
    });

    connection.end();
}

router.post("/api/booklive", get_active_books);
module.exports=router;