const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
require("dotenv").config();

function getAuthors(req,res,next) {

    res.type("application/json");

    const connection = mysql.createConnection({
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : process.env.DB_DATABASE
    });

    connection.query("SELECT CONCAT(Firstname,' ',Lastname) AS name FROM Book_Authors",
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
                        "info" : "no authors found"
                    }
                );
            } else {
                res.status(200).json(
                    {
                        "authors" : results
                    }
                );
            }
        }
    })
    connection.end();
}

router.get("/api/getauthors", getAuthors);
module.exports=router;