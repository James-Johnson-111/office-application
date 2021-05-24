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

// the following request is to store the data of candidate filled by a user from counter, into the database

router.post('/setcandidate', (req, res) => {
    const { filled } = req.body;
    let tokenDate = new Date();
    let date = tokenDate.getFullYear() + '-' + monthNames[tokenDate.getMonth()] + '-' + tokenDate.getDate();
    if( filled === 'notfilled' )
    {
        const { Name, Age, Nationality, Gander, MStatus, Profession, Passport, Insertor, ImageName, placeofissue, travellingto, token } = req.body;
        const Image = req.files.Image;
        let imagesNames = ImageName + '.png';

        let tokenDate = new Date();
        let date = tokenDate.getFullYear() + '-' + monthNames[tokenDate.getMonth()] + '-' + tokenDate.getDate();

        Image.mv('client/public/images/candidates/' + imagesNames, (err) => {

            if (err) {

                console.log(err);

            }

        });

        db.query(
            'INSERT INTO candidate_info(candidate_name,candidate_passport,candidate_age,candidate_nationality,candidate_gender,candidate_marital_status,candidate_profession, insert_by, insert_date, inserted_time, place_of_issue, travelling_to ) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)',
            [Name, Passport, Age, Nationality, Gander, MStatus, Profession, Insertor, date, fullTime, placeofissue, travellingto],
            (err, rslt) => {

                if (!err) {

                    db.query(
                        'SELECT candidate_id from candidate_info WHERE candidate_passport =' + Passport,
                        (err, rslt) => {

                            if (err) {

                                console.log(err);

                            } else {

                                db.query(
                                    "INSERT INTO candidate_images(candidate_id, candidate_image) VALUES(?,?); INSERT INTO candidate_tokens(candidate_id, token_no, token_status, token_date, token_time) VALUES (?,?,?,?,?); UPDATE tokens SET tokens.token_status = 'encountered' WHERE tokens.token = '" + token + "'; INSERT INTO logs(log_activity, logged_by, log_date, log_time) VALUES(?,?,?,?); INSERT INTO candidate_logs(candidate_id,candidate_name,candidate_passport,candidate_age,candidate_nationality,candidate_gender,candidate_marital_status,candidate_profession, log_date, log_time, place_of_issue, travelling_to, logged_by ) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)",
                                    [rslt[0].candidate_id, imagesNames, rslt[0].candidate_id, token, 'encountered', date, fullTime, 'candidate data inserted', Insertor, date, fullTime, rslt[0].candidate_id,Name,Passport,Age,Nationality,Gander,MStatus,Profession,date,fullTime,placeofissue,travellingto, Insertor],
                                    (err, rsltt) => {

                                        if (err) {

                                            console.log(err);

                                        } else {

                                            res.send("Data Inserted Successfully");

                                        }

                                    }
                                )

                            }

                        }
                    )

                } else {

                    console.log(err);

                }

            }
        );
    }else
    {

        const { id, Name, Age, Nationality, Gander, MStatus, Profession, Passport, Insertor, Editor, ImageName, placeofissue, travellingto, token, ImageNotImg } = req.body;
        if( ImageName.length == 9 )
        {
            const Image = req.files.Image;
            let imagesNames = ImageName + '.png';

            Image.mv('client/public/images/candidates/' + imagesNames, (err) => {

                if (err) {

                    console.log(err);

                }

            });

            db.query(
                "UPDATE candidate_info SET candidate_name = '" + Name + "', candidate_passport = '" + Passport + "', candidate_gender = '" + Gander + "', candidate_age = " + Age + ", candidate_nationality = '" + Nationality + "', candidate_marital_status = '" + MStatus + "', candidate_profession = '" + Profession + "', place_of_issue = '" + placeofissue + "', travelling_to = '" + travellingto + "', insert_by = '" + Insertor + "', insert_date = '" + date + "', inserted_time = '" + fullTime + "', edit_by = '" + Editor + "', edit_date = '" + date + "', edited_time = '" + fullTime + "' WHERE candidate_id = " + id + "; UPDATE tokens SET tokens.token_status = 'encountered' WHERE tokens.token = '" + token + "'; UPDATE candidate_tokens SET token_status = 'encountered' WHERE token_no = '" + token + "'; UPDATE candidate_images SET candidate_image = '" + imagesNames + "' WHERE candidate_id = '" + id + "'; INSERT INTO logs(log_activity, logged_by, log_date, log_time) VALUES(?,?,?,?)",
                ['candidate data updated', Insertor, date, fullTime],
                (err, rslt) => {

                    if (!err) {

                        res.send("Data Updated Successfully");

                    } else {

                        console.log(err);

                    }

                }
            );

        }else if( ImageName.endsWith('.png') )
        {

            db.query(
                "UPDATE candidate_info SET candidate_name = '" + Name + "', candidate_passport = '" + Passport + "', candidate_gender = '" + Gander + "', candidate_age = " + Age + ", candidate_nationality = '" + Nationality + "', candidate_marital_status = '" + MStatus + "', candidate_profession = '" + Profession + "', place_of_issue = '" + placeofissue + "', travelling_to = '" + travellingto + "', insert_by = '" + Insertor + "', insert_date = '" + date + "', inserted_time = '" + fullTime + "', edit_by = '" + Editor + "', edit_date = '" + date + "', edited_time = '" + fullTime + "' WHERE candidate_id = " + id + "; UPDATE tokens SET tokens.token_status = 'encountered' WHERE tokens.token = '" + token + "'; UPDATE candidate_tokens SET token_status = 'encountered' WHERE token_no = '" + token + "'; INSERT INTO logs(log_activity, logged_by, log_date, log_time) VALUES(?,?,?,?)",
                ['candidate data updated', Insertor, date, fullTime],
                (err, rslt) => {

                    if (!err) {

                        res.send("Data Updated Successfully");

                    } else {

                        console.log(err);

                    }

                }
            );

        }else
        {

            const Image = req.files.Image;
            let imagesNames = ImageName + '.png';

            Image.mv('client/public/images/candidates/' + imagesNames, (err) => {

                if (err) {

                    console.log(err);

                }

            });

            db.query(
                "UPDATE candidate_info SET candidate_name = '" + Name + "', candidate_passport = '" + Passport + "', candidate_gender = '" + Gander + "', candidate_age = '" + Age + "', candidate_nationality = '" + Nationality + "', candidate_marital_status = '" + MStatus + "', candidate_profession = '" + Profession + "', place_of_issue = '" + placeofissue + "', travelling_to = '" + travellingto + "', insert_by = '" + Insertor + "', insert_date = '" + date + "', inserted_time = '" + fullTime + "', edit_by = '" + Editor + "', edit_date = '" + date + "', edited_time = '" + fullTime + "' WHERE candidate_id = " + id + "; UPDATE tokens SET tokens.token_status = 'encountered' WHERE tokens.token = '" + token + "'; UPDATE candidate_tokens SET token_status = 'encountered' WHERE token_no = '" + token + "'; UPDATE candidate_images SET candidate_images.candidate_image = '" + imagesNames + "' WHERE candidate_images.candidate_id = '" + id + "'; INSERT INTO logs(log_activity, logged_by, log_date, log_time) VALUES(?,?,?,?)",
                [ 'candidate data updated', Insertor, date, fullTime ],
                (err, rslt) => {

                    if (!err) {

                        res.send("Data Updated Successfully");

                    } else {

                        console.log(err);

                    }

                }
            );

        }

    }

});

// the following request is to store the data filled by the candidate himself/herself, into the database

router.post('/databycandidate', (req, res) => {
    const { Name, Age, Nationality, Gander, MStatus, Profession, Passport, ImageName, placeofissue, travellingto, token } = req.body;
    const Image = req.files.Image;
    let imagesNames = ImageName + '.png';

    let tokenDate = new Date();
    let date = tokenDate.getFullYear() + '-' + monthNames[tokenDate.getMonth()] + '-' + tokenDate.getDate();

    Image.mv('client/public/images/candidates/' + imagesNames , ( err ) => {

        if(err) {

            console.log(err);

        }

    });
    
    db.query(
        'INSERT INTO candidate_info(candidate_name,candidate_passport,candidate_age,candidate_nationality,candidate_gender,candidate_marital_status,candidate_profession, insert_date, inserted_time, place_of_issue, travelling_to ) VALUES(?,?,?,?,?,?,?,?,?,?,?)',
        [Name,Passport,Age,Nationality,Gander,MStatus,Profession,date,fullTime,placeofissue,travellingto],
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
                                'INSERT INTO candidate_images(candidate_id, candidate_image) VALUES(?,?); INSERT INTO candidate_tokens(candidate_id, token_no, token_date, token_time) VALUES (?,?,?,?); INSERT INTO candidate_logs(candidate_id,candidate_name,candidate_passport,candidate_age,candidate_nationality,candidate_gender,candidate_marital_status,candidate_profession, log_date, log_time, place_of_issue, travelling_to, logged_by ) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)',
                                [ rslt[0].candidate_id, imagesNames, rslt[0].candidate_id, token, date, fullTime, rslt[0].candidate_id,Name,Passport,Age,Nationality,Gander,MStatus,Profession,date,fullTime,placeofissue,travellingto, 'candidate' ],
                                ( err, rsltt ) => {
    
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

            }else
            {

                console.log( err );

            }

        }
    );

});

module.exports = router;