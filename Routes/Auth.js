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

router.get('/getuser', ( req, res ) => {

    db.query(
        'SELECT * FROM users',
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