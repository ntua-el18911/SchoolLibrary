const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
require("dotenv").config();

function getSchools(req,res,next) {

    res.type("application/json");

    const connection = mysql.createConnection({
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : process.env.DB_DATABASE
    });

    connection.query("SELECT * FROM schools", function(error,results) {
        if (error) {
            console.error(error);
            res.status(500).json(
                {
                    "info" : "something broke"
                }
            );
        } else {
            res.status(200).json(
                {
                    "data" : results.map(_item => {
                        return {
                            "id" : _item.School_Library_id,
                            "name" : _item.School_Name
                        }
                    })
                }
            )
        }
    });
    connection.end();
}

router.get("/api/schools", getSchools);
module.exports = router;