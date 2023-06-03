const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
require("dotenv").config();

function getReservation(req,res,next) {

    res.type("application/json");

    const connection = mysql.createConnection({
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : process.env.DB_DATABASE
    });

    const reservation_id = req.body.reservation_id;

    //TODO check body

    connection.query("DELETE FROM Reservations WHERE Reservations_id=?",[reservation_id], 
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
                    "info" : "success"
                }
            );
        }
    });

    connection.end();

}

router.delete("/api/cancelreservation", getReservation);
module.exports=router;