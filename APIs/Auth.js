const express = require('express'), path = require('path');
const app = express();
const mysql = require('mysql');

const db = mysql.createConnection( 
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'office-database'
    }
)

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

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



app.post('/setcandidate', (req, res) => {
    const { Name, Age, Nationality, Gander, MStatus, Profession, Passport, Insertor, ImageName, placeofissue, travellingto, token } = req.body;
    const Image = req.files.Image;
    let imagesNames = ImageName + '.png';

    let tokenDate = new Date();
    let date = tokenDate.getFullYear() + '-' + monthNames[tokenDate.getMonth()] + '-' + tokenDate.getDate();

    Image.mv('images/' + imagesNames , ( err ) => {

        if(err) {

            console.log(err);

        }

    });
    
    db.query(
        'INSERT INTO candidate_info(candidate_name,candidate_passport,candidate_age,candidate_nationality,candidate_gender,candidate_marital_status,candidate_profession, insert_by, insert_date, inserted_time, place_of_issue, travelling_to ) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)',
        [Name,Passport,Age,Nationality,Gander,MStatus,Profession,Insertor,date,fullTime,placeofissue,travellingto],
        ( err, rslt ) => {

            if( !err )
            {

                db.query(
                    'SELECT candidate_id from candidate_info WHERE candidate_passport ='+ Passport,
                    ( err, rslt ) => {
    
                        if( err )
                        {
    
                            console.log( err );
    
                        }else
                        {
    
                            db.query(
                                'INSERT INTO candidate_images(candidate_id, candidate_image) VALUES(?,?)',
                                [ rslt[0].candidate_id, imagesNames ],
                                ( err, rsltt ) => {
    
                                    if( err )
                                    {
    
                                        console.log( err );
    
                                    }else
                                    {

                                        let tokenDate = new Date();
                                        let date = tokenDate.getFullYear() + '-' + monthNames[tokenDate.getMonth()] + '-' + tokenDate.getDate();
    
                                        db.query(
                                            'INSERT INTO candidate_tokens(candidate_id, token_no, token_date, token_time) VALUES (?,?,?,?)',
                                            [ rslt[0].candidate_id, token, date, fullTime ],
                                            ( err, rslt ) => {

                                                if( err )
                                                {

                                                    console.log( err );

                                                }else
                                                {

                                                    res.send('Data inserted successfully');

                                                }

                                            }
                                        )
    
                                    }
    
                                }
                            )
    
                        }
    
                    }
                )

            }else
            {

                console.log( err );

            }

        }
    );

});