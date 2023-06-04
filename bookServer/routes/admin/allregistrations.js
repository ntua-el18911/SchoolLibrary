const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
require("dotenv").config();

function getRegistrations(req,res,next) {

    res.type("application/json");

    const connection = mysql.createConnection({
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : process.env.DB_DATABASE
    });

    connection.query("SELECT Registration_id,Firstname,Lastname,Age,User_Role,Academic_id,Registration_Status FROM Registrations" + 
    " WHERE Registration_Status=?",["pending"], 
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
                        "info" : "no registrations found"
                    }
                );
            } else {
                res.status(200).json(
                    {
                        "registrations" : results
                    }
                );
            }
        }
    });

    connection.end();

}

router.get("/api/admin/registrations", getRegistrations);
module.exports=router;