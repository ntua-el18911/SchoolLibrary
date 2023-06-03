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

    const user_id = req.body.user_id;

    //TODO check body

    connection.query("SELECT Reservations_id,Reservations.ISBN,Title,Reservation_Date AS Date FROM Reservations" + 
    " INNER JOIN Books B on Reservations.ISBN = B.ISBN" +
    " WHERE User_id = ? AND Reservation_status=1",[user_id], 
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
                        "info" : "no reservations were found"
                    }
                );
            } else {
                res.status(200).json(
                    {
                        "reservations" : results
                    }
                );
            }
        }
    });

    connection.end();

}

router.post("/api/reservations", getReservation);
module.exports=router;