const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
require("dotenv").config();

function getAllDelays(req,res,next) {

    res.type("application/json");

    const connection = mysql.createConnection({
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : process.env.DB_DATABASE
    });

    connection.query("SELECT B.ISBN,B.Title,Academic_id,U.Firstname,U.Lastname,Start_Date,End_Date,Late_Days FROM Book_System_Live" +
    " INNER JOIN Users U on Book_System_Live.User_id = U.User_id" +
    " INNER JOIN Books B on Book_System_Live.ISBN = B.ISBN" +
    " WHERE Late_Days > 0 AND Rent_Active=1", 
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
                        "info" : "no delays found"
                    }
                );
            } else {
                res.status(200).json(
                    {
                        "delays" : results
                    }
                );
            }
        }
    });

    connection.end();

}

router.get("/api/admin/bookdelays", getAllDelays);
module.exports=router;