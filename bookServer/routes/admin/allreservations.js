const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
require("dotenv").config();

function getAllReservation(req,res,next) {

    res.type("application/json");

    const connection = mysql.createConnection({
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : process.env.DB_DATABASE
    });

    connection.query("SELECT Reservations.ISBN,Title,Reservation_Date AS Date,U.Firstname,U.Lastname FROM Reservations" + 
    " INNER JOIN Books B ON Reservations.ISBN = B.ISBN" +
    " INNER JOIN Users U ON Reservations.User_id = U.User_id"+
    " WHERE Reservation_status=1", 
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

router.get("/api/admin/reservations", getAllReservation);
module.exports=router;