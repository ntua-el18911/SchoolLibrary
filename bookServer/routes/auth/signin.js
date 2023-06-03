/*
    Api Endpoint to sign Admin,Handler,Student and Instructor.

    * Extremely * simple authentication.
*/

const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
require("dotenv").config();

function sign_in(req,res,next) {


    res.type("application/json");

    const connection = mysql.createConnection({
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : process.env.DB_DATABASE
    });

    const username = req.body.username;
    const password = req.body.password;

    if (username === undefined || password === undefined) {
        res.status(400).json(
            {
                "info" : "fail",
                "reason" : "bad request"
            }
        );
    } else {
        connection.query('SELECT U.School_Library_id,U.User_id,U.Firstname, U.Lastname, U.Age, U.User_Role, U.Available_Borrows, U.Total_Books_Borrowed FROM Credentials' + 
        ' INNER JOIN Users U ON Credentials.User_id=U.User_id'+
        ' WHERE Cr_Username=? AND Cr_Password=?',
        [username,password], function (error, results, fields) {
            if (error) {
                console.error(error);
                next();
            } else {
                if(results.length === 1) {
                    req.person_info = results[0];
                    connection.end();
                    next();
                } else {
                    connection.query('SELECT School_Library_id,Admin_id,Firstname,Lastname FROM School_Library_Admins' +
                    ' WHERE Cr_Admin_Username=? AND Cr_Admin_Password=?',
                    [username,password], function (error,results,fields) {
                        if (error) {
                            console.error(error);
                            next();
                        } else {
                            if (results.length === 1) {
                                req.person_info = results[0];
                                next();
                            } else {
                                res.status(404).json(
                                    {
                                        "info" : "fail",
                                        "reason" : "User Not Found"
                                    }
                                ); 
                            }
                            connection.end();
                        }
                    }); 
                }
            }
        });
    }
}

function sign_in_response(req,res,next) {
    
    if (req.person_info === undefined) {
        next();
    } else {
        res.status(200).json(
            {
                "status" : "success",
                "user" : req.person_info
            }
        );
    }
}

function error_response(req,res,next) {
    res.status(500).json({"error" : "Something broke"});
}

router.post("/api/signin", sign_in, sign_in_response, error_response);
module.exports = router;