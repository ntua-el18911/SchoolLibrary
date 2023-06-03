const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
require("dotenv").config();

async function add_reservation(req,res,next) {
    
    res.type("application/json");

    const connection = await mysql.createConnection({
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : process.env.DB_DATABASE
    });

    const school_id = req.body.school_id;
    const user_id = req.body.user_id;
    const isbn = req.body.ISBN;
    const reservation_date = req.body.reservation_date;
    const reservation_status = 1;
    let reservation_id;

    //Check for missing values

    try {
        const [results,fields] = await connection.query('SELECT Reservations_id FROM Reservations');
        const [results_book_copies,fields_t] = await connection.query('SELECT Copies FROM Books WHERE ISBN=?',[isbn]);
        const [results_reservation_exists, fields_reservation_exists] = await connection.query("SELECT ISBN,User_id FROM Reservations WHERE ISBN=? AND User_id=?",[isbn,user_id]);
        const [reservation_ability, fields_reservation_ability] = await connection.query("SELECT Available_Borrows FROM Users WHERE User_id=?",[user_id]);
        
        if (reservation_ability.length !== 1 || reservation_ability[0] === 0) {
            req.response_code = 403;
            throw "unable to make reservation";
        }

        if (results_reservation_exists.length !== 0) {
            req.response_code = 406;
            throw "reservation exists";
        }

        const r_id = results.map( obj => {
            return obj.Registration_id;
        })
        
        if (results_book_copies.length === 0 || results_book_copies[0].Copies === 0) {
            req.response_code = 400;
            throw "book not available";
        } else {
            let random_resv_id = "RSV-" + random_numbers(5);
            while (r_id.includes(random_resv_id)) {
                random_resv_id = "RSV-" + random_numbers(5); 
            }
            reservation_id = random_resv_id;
    
            await connection.query("INSERT INTO Reservations VALUES (?,?,?,?,?,?);",
            [reservation_id, school_id, user_id, isbn, reservation_date, reservation_status]);
            req.response_code = 200;
        }
    } catch(error) {
        if (error !== "book not available" && error !== "reservation exists" && error !== "unable to make reservation") {
            console.error(error);
            req.response_code = 500;
        }
    }
    connection.end();
    next();
}

function reservation_response(req,res,next) {
    
    if (req.response_code === 400) {
        res.status(req.response_code).json(
            {
                "info" : "book is not available"
            }
        ); 
    } else if (req.response_code === 406) {
        res.status(406).json(
            {
                "info" : "reservation exists"
            }
        );
    } else if (req.response_code === 403) {
        res.status(403).json(
            {
                "info" : "unable to make reservation"
            }
        );
    }else if (req.response_code === 200) { 
        res.status(200).json(
            {
                "info" : "complete"
            }
        ); 
    } else{
        res.status(req.response_code).json(
            {
                "info" : "Something is broken"
            }
        ); 
    }
}

function random_numbers(x) {
    const rn = [];
    for (let i=0; i<x; i++) {
        rn.push(Math.floor(Math.random()*10))
    }
    return rn.join("")
}

router.post("/api/addreservation", add_reservation, reservation_response);
module.exports=router;