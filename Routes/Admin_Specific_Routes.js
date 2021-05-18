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

// the following request is to start process of the day & it will delete all tokens generated yesterday

router.post( '/startprocess', ( req, res ) => {

    const { logger } = req.body;
    db.query(
        "DELETE FROM tokens",
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );

            }
            else
            {
                let tokenDate = new Date();
                let date = tokenDate.getFullYear() + '-' + monthNames[tokenDate.getMonth()] + '-' + tokenDate.getDate();

                db.query(
                    "INSERT INTO logs(log_activity, logged_by, log_date, log_time) VALUES(?,?,?,?)",
                    [ 'Start the day process', logger, date, fullTime ],
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

            }

        }
    )

} )

// the following request is to create a new user ( For Admin Only )

router.post('/createuser', (req, res) => {
    const { LoginID, Password, Params, Role, ImageName, logger } = req.body;
    const Img = req.files.Image;
    let ImgWithExtension = ImageName + '.png';

    Img.mv('client/public/images/users/' + ImgWithExtension , ( err ) => {

        if(err) {

            console.log(err);

        }

    });
    
    db.query(
        'INSERT INTO users(login_id,params,user_password,user_role,user_image) VALUES(?,?,?,?,?)',
        [LoginID,Params,Password,Role,ImgWithExtension],
        ( err, rslt ) => {

            if(err)
            {

                console.log( err );

            }else
            {

                let tokenDate = new Date();
                let date = tokenDate.getFullYear() + '-' + monthNames[tokenDate.getMonth()] + '-' + tokenDate.getDate();

                db.query(
                    "INSERT INTO logs(log_activity, logged_by, log_date, log_time) VALUES(?,?,?,?)",
                    [ 'Create a new user ' + LoginID, logger, date, fullTime ],
                    ( err, rslt ) => {

                        if( err )
                        {
                            console.log( err );
                        }else
                        {
                            res.send( "User Has Been Created" );
                        }

                    }
                )

            }

        }
    );

});

module.exports = router;