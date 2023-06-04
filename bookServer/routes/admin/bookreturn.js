const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
require("dotenv").config();

function bookReturn(req,res,next) {

    res.type("application/json");

    const connection = mysql.createConnection({
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : process.env.DB_DATABASE
    });

    const id = req.body.id;
    //TODO check body

    connection.query("UPDATE Book_System_Live SET Rent_Active=0 WHERE Book_System_Live_id=?",
    [id], 
    (error,results) => {
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
                    "status" : "done"
                }
            );
        }
    });

    connection.end();

}

router.put("/api/admin/bookreturn", bookReturn);
module.exports=router;