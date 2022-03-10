const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// here is an array in which all month names are stored with whcich we can store month name into database

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// with the help of following block of code we can get the current time in am/pm

var fullTime = null;

setInterval( () => {

    const date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var fullTimes = hours + ':' + minutes + ' ' + ampm;
    fullTime = fullTimes.toString();

}, 1 * 1000 );

// the following request is to get all users data

router.post('/getcandidatereport', ( req, res ) => {

    const { ID } = req.body;

    db.query(
        "SELECT candidate_info.*, medical_e_1.*, medical_e_2.*, laboratory_investigation.*, polio_status.status as polio_status, polio_status.date as polio_date, covid_status.status as covid_status, covid_status.date as covid_date, meningococcal_status.status as menigococcal_status, meningococcal_status.date as meningococcal_date, mmr1_status.status as mmr1_status, mmr1_status.date as mmr1_date, mmr2_status.status as mmr2_status, mmr2_status.date as mmr2_date, candidate_images.candidate_image FROM candidate_info LEFT OUTER JOIN medical_e_1 ON candidate_info.candidate_id = medical_e_1.candidate_id LEFT OUTER JOIN medical_e_2 ON candidate_info.candidate_id = medical_e_2.candidate_id LEFT OUTER JOIN laboratory_investigation ON candidate_info.candidate_id = laboratory_investigation.candidate_id LEFT OUTER JOIN covid_status ON candidate_info.candidate_id = covid_status.candidate_id LEFT OUTER JOIN polio_status ON candidate_info.candidate_id = polio_status.candidate_id LEFT OUTER JOIN meningococcal_status ON candidate_info.candidate_id = meningococcal_status.candidate_id LEFT OUTER JOIN mmr1_status ON candidate_info.candidate_id = mmr1_status.candidate_id LEFT OUTER JOIN mmr2_status ON candidate_info.candidate_id = mmr2_status.candidate_id LEFT OUTER JOIN candidate_images ON candidate_info.candidate_id = candidate_images.candidate_id WHERE candidate_info.candidate_id = " + ID,
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );

            }else
            {

                res.send( rslt );

            }

        }
    )

} );

module.exports = router;