const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
require("dotenv").config();

function getUser(req,res,next) {

    res.type("application/json");

    const connection = mysql.createConnection({
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : process.env.DB_DATABASE
    });


    const user_id = req.body.user_id;
    //TODO check body

    connection.query("SELECT User_id, Firstname, Lastname, User_Role AS Role, Available_Borrows AS Available, Total_Books_Borrowed AS Total FROM Users WHERE User_id=?",[user_id], 
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
                        "info" : "user not found"
                    }
                );
            } else {
                res.status(200).json(
                    {
                        "user" : results[0]
                    }
                );
            }
        }
    });

    connection.end();
}

router.post("/api/getuser", getUser);
module.exports=router;