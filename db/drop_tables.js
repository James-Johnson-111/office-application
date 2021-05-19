const express = require('express');
const router = express.Router();
const db = require('./connection');

db.query(
    "DROP TABLE candidate_images;" +
    "DROP TABLE candidate_tokens;" +
    "DROP TABLE users;" +
    "DROP TABLE candidate_logs;" +
    "DROP TABLE tokens;" +
    "DROP TABLE covid_status;" +
    "DROP TABLE mmr1_status;" +
    "DROP TABLE mmr2_status;" +
    "DROP TABLE polio_status;" +
    "DROP TABLE meningococcal_status;" +
    "DROP TABLE logs;" +
    "DROP TABLE medical_e_1;" +
    "DROP TABLE medical_e_2;" +
    "DROP TABLE laboratory_investigation;" +
    "DROP TABLE vaccination;" +
    "DROP TABLE candidate_info;"
    ,
    ( err, rslt ) => {

        if( err )
        {

            console.log( err );

        }else
        {

            console.log( "All tables are Droped successfully" );

        }

    }
)

module.exports = router;