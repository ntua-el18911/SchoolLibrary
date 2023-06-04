const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
require("dotenv").config();

function getLiveSystem(req,res,next) {

    res.type("application/json");

    const connection = mysql.createConnection({
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : process.env.DB_DATABASE
    });

    connection.query("SELECT Book_System_Live_id,B.ISBN,B.Title,SL.School_Name,U.Firstname AS User_Firstname," + 
    " U.Lastname AS User_Lastname,Academic_id,SLA.Firstname AS Admin_Firstname,SLA.Lastname AS Admin_Lastname," +
    " Late_Days, Start_Date, End_Date FROM Book_System_Live" +
    " INNER JOIN Books B on Book_System_Live.ISBN = B.ISBN" +
    " INNER JOIN Users U on Book_System_Live.User_id = U.User_id" +
    " INNER JOIN School_Library SL on B.School_Library_id = SL.School_Library_id" +
    " INNER JOIN School_Library_Admins SLA on Book_System_Live.Admin_id = SLA.Admin_id" +
    " WHERE Rent_Active=1", 
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
                        "info" : "no activity found"
                    }
                );
            } else {
                res.status(200).json(
                    {
                        "live_activity" : results
                    }
                );
            }
        }
    });

    connection.end();

}

router.get("/api/admin/getlivesystem", getLiveSystem);
module.exports=router;