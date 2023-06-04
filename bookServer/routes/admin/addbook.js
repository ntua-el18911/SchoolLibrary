const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
require("dotenv").config();

async function addBook(req,res,next) {
    
    res.type("application/json");

    const connection = await mysql.createConnection({
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : process.env.DB_DATABASE
    });

    const school_id = req.body.school_id;
    const isbn = req.body.isbn;
    const user_id = req.body.user_id;
    const admin_id = req.body.admin_id;
    const late_days = 0;
    const rent_active= 1;
    let book_activation_id;

    //Check for missing values

    try {
        const [results,fields] = await connection.query('SELECT Book_System_Live_id FROM Book_System_Live');
       
        const current_books_id = results.map( obj => {
            return obj.Book_System_Live_id;
        })
        
        
        let random_book_id = "BSL-" + random_numbers(5);
            while (current_books_id.includes(random_book_id)) {
                random_book_id = "BSL-" + random_numbers(5); 
            }
            book_activation_id = random_book_id;
    
            await connection.query("INSERT INTO Book_System_Live(Book_System_Live_id,School_Library_id,ISBN,"+
            "User_id,Admin_id,Late_Days,Rent_Active) VALUES(?,?,?,?,?,?,?)",
            [book_activation_id,school_id,isbn,user_id,admin_id,late_days,rent_active]);
            req.response_code = 200;
    } catch(error) {
        console.log(error);
        req.response_code = 500;
    }
    
    connection.end();
    next();
}

function addBookResponse(req,res,next) {
    
    if (req.response_code === 200) { 
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

router.post("/api/admin/addbook", addBook, addBookResponse);
module.exports=router;