const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
require("dotenv").config();

async function sign_up(req,res,next) {
    
    res.type("application/json");

    const connection = await mysql.createConnection({
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : process.env.DB_DATABASE
    });

    const school_id = req.body.school_id;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const age = req.body.age;
    const academic_id = req.body.academic_id;
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const role = req.body.role;
    let registration_id;

    //Check for missing values

    try {
        const [results,fields] = await connection.query('SELECT * FROM registrations_username');
        const [results_t,fields_t] = await connection.query('SELECT * FROM credential_username WHERE Cr_Username=?',[username]);
        
        const rg_id = results.map( obj => {
            return obj.Registration_id;
        })
        
        const rg_username = results.map( obj => {
            return obj.Reg_Username;
        })
        
        if (rg_username.includes(username) || results_t.includes(username)) {
            req.response_code = 400;
            throw "user already exists";
        } else {
            let random_reg_id = "RG-" + random_numbers(5);
            while (rg_id.includes(random_reg_id)) {
                random_reg_id = "RG-" + random_numbers(5); 
            }
            registration_id = random_reg_id;
    
            await connection.query("INSERT INTO Registrations(Registration_id, School_Library_id,Firstname,Lastname,Age,Academic_id,User_Role, Reg_Username,Reg_Password,Reg_Email)" 
            + " VALUES (?,?,?,?,?,?,?,?,?,?)",
            [registration_id, school_id, firstname, lastname, age, academic_id, role, username, password, email])
            req.response_code = 200;
        }
    } catch(error) {
        if (error !== "user already exists") {
            console.error(error);
            req.response_code = 500;
        }
    }
    
    connection.end();
    next();
}

function sign_up_response(req,res,next) {
    
    if (req.response_code === 400) {
        res.status(req.response_code).json(
            {
                "info" : "username is not available"
            }
        ); 
    } else if (req.response_code === 200) { 
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

router.post("/api/signup", sign_up, sign_up_response);
module.exports=router;