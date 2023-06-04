const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
require("dotenv").config();

function updateRegistration(req,res,next) {

    res.type("application/json");

    const connection = mysql.createConnection({
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : process.env.DB_DATABASE
    });

    const registration_status = req.body.registration_status;
    const id = req.body.id;
    //TODO check body

    connection.query("UPDATE Registrations SET Registration_Status=? WHERE Registration_id=?",
    [registration_status, id], 
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

router.put("/api/admin/updateregistration", updateRegistration);
module.exports=router;