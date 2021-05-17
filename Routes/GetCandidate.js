const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const db = mysql.createConnection( 
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'office-database'
    }
    // {
    //     host: 'remotemysql.com',
    //     user: '8tttXb5VZx',
    //     password: 'I7W2CAugk4',
    //     database: '8tttXb5VZx'
    // }
)

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

// the following request is to get candidate data agains the given token

router.post( '/gettokendata', ( req, res ) => {

    const { token } = req.body;

    db.query(
        "SELECT candidate_info.*, users.*, candidate_images.candidate_image, candidate_tokens.token_no from candidate_info INNER JOIN candidate_images ON candidate_info.candidate_id = candidate_images.candidate_id INNER JOIN candidate_tokens ON candidate_info.candidate_id = candidate_tokens.candidate_id INNER JOIN users ON users.login_id = candidate_info.insert_by WHERE candidate_tokens.token_no = '" + token + "'",
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );

            }
            else
            {

                res.send(rslt);

            }

        }
    )

} )

// the following request is to get all candidate data according to the given date

router.post( '/getdatathroughdate', ( req, res ) => {

    const { date } = req.body;

    db.query(
        "SELECT candidate_info.*, users.*, candidate_images.candidate_image from candidate_info INNER JOIN candidate_images ON candidate_info.candidate_id = candidate_images.candidate_id INNER JOIN users ON candidate_info.insert_by = users.login_id WHERE insert_date LIKE '%" + date + "%'",
        (err, rslt) => {

            if (err) {

                console.log(err);

            } else {

                res.send( rslt );

            }
        }
    )

} )

// the following request is to get all candidate data according to the given time

router.post( '/getcandidatethroughtime', ( req, res ) => {

    const { time1, time2 } = req.body;

    db.query(
        "SELECT candidate_info.*, users.*, candidate_images.candidate_image from candidate_info INNER JOIN candidate_images ON candidate_info.candidate_id = candidate_images.candidate_id INNER JOIN users ON candidate_info.insert_by = users.login_id WHERE candidate_info.inserted_time between '" + time1 + "' AND '" + time2 + "'",
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );

            }else
            {

                // console.log(rslt);
                res.send( rslt );

            }

        }
    )

} )

module.exports = router;