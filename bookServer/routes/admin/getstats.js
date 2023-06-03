const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
require("dotenv").config();

function getReviewStats(req,res,next) {

    res.type("application/json");

    const connection = mysql.createConnection({
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : process.env.DB_DATABASE
    });

    connection.query("SELECT U.User_id,U.Firstname,U.Lastname,BC.Category,AVG(Likert_Value) AS Review_AVG FROM Reviews" + 
    " INNER JOIN Users U on Reviews.User_id = U.User_id" +
    " INNER JOIN Books B on Reviews.ISBN = B.ISBN" + 
    " INNER JOIN Book_Categories BC on B.ISBN = BC.ISBN" +
    " GROUP BY U.User_id, U.Firstname, U.Lastname, BC.Category", 
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
                        "info" : "no stats were found"
                    }
                );
            } else {
                res.status(200).json(
                    {
                        "review_stats" : results
                    }
                );
            }
        }
    });

    connection.end();

}

router.get("/api/admin/getreviewstats", getReviewStats);
module.exports=router;