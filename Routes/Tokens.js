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

// the following request is to get all tokens from the database

router.post( '/getalltokens', ( req, res ) => {

    const { counter } = req.body;

    let tokenDate = new Date();
    let date = tokenDate.getFullYear() + '-' + monthNames[tokenDate.getMonth()] + '-' + tokenDate.getDate();

    db.query(
        "SELECT * FROM tokens WHERE tokens.token_status = 'initialized' OR tokens.token_status = 'at counter with user " + counter + "' LIMIT 1",
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );

            }else
            {
                if( rslt[0] != undefined )
                {

                    db.query(
                        "UPDATE tokens SET tokens.token_status = 'at counter with user " + counter + "' WHERE tokens.token = '" + rslt[0].token + "'",
                        ( err, rslts ) => {
                
                            if( err )
                            {
                
                                console.log( err );
                
                            }else
                            {
                                
                                res.send(rslt[0]);
                
                            }
                
                        }
                    )
                }else
                {
                    res.send("No Record Found");
                }

            }

        }
    )

} )

// the following request is to get a particular token from the database

router.post( '/gettoken', ( req, res ) => {

    const { token }= req.body;

    db.query(
        "SELECT * FROM tokens WHERE token = '" + token + "'",
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );

            }else
            {

                res.send(rslt);

            }

        }
    )

} )

// the following request is to store token into database when user click on 'get token' button

router.post( '/storetoken', ( req, res ) => {

    const { token, time }= req.body;

    let tokenDate = new Date();
    let date = tokenDate.getFullYear() + '-' + monthNames[tokenDate.getMonth()] + '-' + tokenDate.getDate();

    db.query(
        "INSERT INTO tokens(token, token_status, token_time, token_date) VALUES(?,?,?,?)",
        [ token, 'initialized', time, date ],
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );

            }else
            {

                res.send("Success");

            }

        }
    )

} );

module.exports = router;