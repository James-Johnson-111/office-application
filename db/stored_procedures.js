const express = require('express');
const router = express.Router();
const db = require('./connection');

db.query(
    "DELIMITER // \n" +
    "CREATE PROCEDURE getusers() \n" +
    "BEGIN \n" +
    "SELECT * FROM users; \n" +
    "END // \n" +
    "DELIMITER ;"
    ,
    ( err, rslt ) => {

        if( err )
        {

            console.log( err );

        }else
        {

            console.log( "All Stored Procedures are created successfully" );

        }

    }
)

module.exports = router;