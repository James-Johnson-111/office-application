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

// the following request is to store the data of first examination into the database

router.post( '/exam1', ( req, res ) => {

    const { logger, Token, height, weight, bmi, bp1, bp2, pulse, pr, unaidedDistantRtEye, unaidedDistantLtEye, aidedDistantRtEye, aidedDistantLtEye, unaidedNearRtEye, unaidedNearLtEye, aidedNearRtEye, aidedNearLtEye, colorVision, RightEar, LeftEar, Insertor }= req.body;

    let tokenDate = new Date();
    let date = tokenDate.getFullYear() + '-' + monthNames[tokenDate.getMonth()] + '-' + tokenDate.getDate();

    db.query(
        "SELECT candidate_id from candidate_tokens WHERE token_no = '" + Token + "'",
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );

            }else
            {

                db.query(
                    "INSERT INTO medical_e_1(candidate_id, height, weight, body_mass_index, blood_pressure, pulse, pr, unaided_distant_rt_eye, unaided_distant_lt_eye, aided_distant_rt_eye, aided_distant_lt_eye, unaided_near_rt_eye, unaided_near_lt_eye, aided_near_rt_eye, aided_near_lt_eye, color_vision, right_ear, left_ear, insert_by, insert_date, insert_time) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                    [rslt[0].candidate_id, height, weight, bmi, bp1 + " / " + bp2, pulse, pr, unaidedDistantRtEye, unaidedDistantLtEye, aidedDistantRtEye, aidedDistantLtEye, unaidedNearRtEye, unaidedNearLtEye, aidedNearRtEye, aidedNearLtEye, colorVision, RightEar, LeftEar, Insertor, date, fullTime],
                    (err, rslt) => {

                        if (err) {

                            console.log(err);

                        } else {

                            let tokenDate = new Date();
                            let date = tokenDate.getFullYear() + '-' + monthNames[tokenDate.getMonth()] + '-' + tokenDate.getDate();

                            db.query(
                                "INSERT INTO logs(log, logger, log_date, log_time) VALUES(?,?,?,?)",
                                ['Exam 1 data inserted', logger, date, fullTime],
                                (err, rslt) => {

                                    if (err) {
                                        console.log(err);
                                    } else {
                                        res.send("Medical Exam1 Success");
                                    }

                                }
                            )

                        }

                    }
                )

            }

        }
    )

} )

// the following request is to store the data of second examination into the database

router.post( '/medicalexamination2entry', ( req, res ) => {

    const { logger, Token, generalAppearance, cardioVascular, respiratory, ent, Abdomen, hernia, hydrocele, exremities, back, skin, cns, deformities, speech, behaviour, orientation, memory, concentration, mood, thoughts, others, inserter }= req.body;

    let tokenDate = new Date();
    let date = tokenDate.getFullYear() + '-' + monthNames[tokenDate.getMonth()] + '-' + tokenDate.getDate();

    db.query(
        "SELECT candidate_id from candidate_tokens WHERE token_no = '" + Token + "'",
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );

            }else
            {

                if( rslt[0].candidate_id != undefined )
                {

                    db.query(
                        "INSERT INTO medical_e_2(candidate_id, general_appearance, cardio_vascular, respiratory, ent, Abdomen, hernia, hydrocele, exremities, back, skin, cns, deformities, speech, behaviour, orientation, memory, concentration, mood, thoughts, others, insert_by, insert_date, insert_time) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                        [ rslt[0].candidate_id, generalAppearance, cardioVascular, respiratory, ent, Abdomen, hernia, hydrocele, exremities, back, skin, cns, deformities, speech, behaviour, orientation, memory, concentration, mood, thoughts, others, inserter, date, fullTime ],
                        ( err, rslt ) => {
                
                            if( err )
                            {
                
                                console.log( err );
                
                            }else
                            {
                
                                let tokenDate = new Date();
                                let date = tokenDate.getFullYear() + '-' + monthNames[tokenDate.getMonth()] + '-' + tokenDate.getDate();

                                db.query(
                                    "INSERT INTO logs(log, logger, log_date, log_time) VALUES(?,?,?,?)",
                                    ['Exam 2 data inserted', logger, date, fullTime],
                                    (err, rslt) => {

                                        if (err) {
                                            console.log(err);
                                        } else {
                                            res.send("Medical Exam2 Success");
                                        }

                                    }
                                )
                
                            }
                
                        }
                    )

                }else
                {

                    res.send( "Candidate Data Not Found" );

                }

            }

        }
    )

} )

// the following request is to store the data of laboratory tests

router.post('/laboratoryentry', ( req, res ) => {

    const { 
        logger,
        bloodGroup, 
        hemoglobin, 
        malaria, 
        microFilaria, 
        RBs, 
        lft, 
        creatinine, 
        hivIII, 
        HbsAg, 
        antiHcv, 
        vdrl, 
        tpha, 
        sugar, 
        albumin, 
        CovidPCR, 
        CovidAntibodies, 
        helminthes, 
        ova, 
        cyst, 
        others, 

        Polio,
        PolioDate,
        MMR1,
        MMR1Date,
        MMR2,
        MMR2Date,
        Meningococcal,
        MeningococcalDate,
        Covid,
        Inserter,
        CovidDate,
        Token
    } = req.body;

    let tokenDate = new Date();
    let date = tokenDate.getFullYear() + '-' + monthNames[tokenDate.getMonth()] + '-' + tokenDate.getDate();

    db.query(
        "SELECT candidate_id from candidate_tokens WHERE token_no = '" + Token + "'",
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );

            }
            else
            {

                if( rslt[0] != undefined )
                {

                    db.query(
                        "INSERT INTO polio_status(status, date, insert_by, insert_date, insert_time, candidate_id) VALUES (?,?,?,?,?,?)",
                        [Polio, PolioDate, Inserter, date, fullTime, rslt[0].candidate_id],
                        ( err, result ) => {
    
                            if( err )
                            {
    
                                console.log( err );
    
                            }else
                            {
    
                                db.query(
                                    "INSERT INTO mmr1_status(status, date, insert_by, insert_date, insert_time, candidate_id) VALUES (?,?,?,?,?,?)",
                                    [MMR1, MMR1Date, Inserter, date, fullTime, rslt[0].candidate_id],
                                    ( err, result ) => {
                
                                        if( err )
                                        {
                
                                            console.log( err );
                
                                        }else
                                        {
                
                                            db.query(
                                                "INSERT INTO mmr2_status(status, date, insert_by, insert_date, insert_time, candidate_id) VALUES (?,?,?,?,?,?)",
                                                [MMR2, MMR2Date, Inserter, date, fullTime, rslt[0].candidate_id],
                                                ( err, result ) => {
                            
                                                    if( err )
                                                    {
                            
                                                        console.log( err );
                            
                                                    }else
                                                    {
                            
                                                        db.query(
                                                            "INSERT INTO meningococcal_status(status, date, insert_by, insert_date, insert_time, candidate_id) VALUES (?,?,?,?,?,?)",
                                                            [Meningococcal, MeningococcalDate, Inserter, date, fullTime, rslt[0].candidate_id],
                                                            ( err, result ) => {
                                        
                                                                if( err )
                                                                {
                                        
                                                                    console.log( err );
                                        
                                                                }else
                                                                {
                                        
                                                                    db.query(
                                                                        "INSERT INTO covid_status(status, date, insert_by, insert_date, insert_time, candidate_id) VALUES (?,?,?,?,?,?)",
                                                                        [Covid, CovidDate, Inserter, date, fullTime, rslt[0].candidate_id],
                                                                        ( err, result ) => {
                                                    
                                                                            if( err )
                                                                            {
                                                    
                                                                                console.log( err );
                                                    
                                                                            }else
                                                                            {

                                                                                let ids = [];
                                                    
                                                                                db.query(
                                                                                    "SELECT id FROM polio_status WHERE candidate_id = " + rslt[0].candidate_id,
                                                                                    ( err, pid ) => {
                                                                
                                                                                        if( err )
                                                                                        {
                                                                
                                                                                            console.log( err );
                                                                
                                                                                        }else
                                                                                        {
                                                                
                                                                                            ids[0] = pid[0].id;
                                                                                            db.query(
                                                                                                "SELECT id FROM mmr1_status WHERE candidate_id = " + rslt[0].candidate_id,
                                                                                                ( err, m1id ) => {
                                                                            
                                                                                                    if( err )
                                                                                                    {
                                                                            
                                                                                                        console.log( err );
                                                                            
                                                                                                    }else
                                                                                                    {
                                                                            
                                                                                                        ids[1] = m1id[0].id;
                                                                                                        db.query(
                                                                                                            "SELECT id FROM mmr2_status WHERE candidate_id = " + rslt[0].candidate_id,
                                                                                                            ( err, m2id ) => {
                                                                                        
                                                                                                                if( err )
                                                                                                                {
                                                                                        
                                                                                                                    console.log( err );
                                                                                        
                                                                                                                }else
                                                                                                                {
                                                                                        
                                                                                                                    ids[2] = m2id[0].id;
                                                                                                                    db.query(
                                                                                                                        "SELECT id FROM meningococcal_status WHERE candidate_id = " + rslt[0].candidate_id,
                                                                                                                        ( err, megid ) => {
                                                                                                    
                                                                                                                            if( err )
                                                                                                                            {
                                                                                                    
                                                                                                                                console.log( err );
                                                                                                    
                                                                                                                            }else
                                                                                                                            {
                                                                                                    
                                                                                                                                ids[3] = megid[0].id;
                                                                                                                                db.query(
                                                                                                                                    "SELECT id FROM covid_status WHERE candidate_id = " + rslt[0].candidate_id,
                                                                                                                                    ( err, cvid ) => {
                                                                                                                
                                                                                                                                        if( err )
                                                                                                                                        {
                                                                                                                
                                                                                                                                            console.log( err );
                                                                                                                
                                                                                                                                        }else
                                                                                                                                        {
                                                                                                                
                                                                                                                                            ids[4] = cvid[0].id;
                                                                                                                                            db.query(
                                                                                                                                                "INSERT INTO vaccination(candidate_id, polio_status, mmr1_status, mmr2_status, meningococcal_status, covid_status, insert_by, insert_date, insert_time) VALUES(?,?,?,?,?,?,?,?,?)",
                                                                                                                                                [rslt[0].candidate_id, ids[0], ids[1], ids[2], ids[3], ids[4], Inserter, date, fullTime],
                                                                                                                                                ( err, result ) => {

                                                                                                                                                    if( err )
                                                                                                                                                    {

                                                                                                                                                        console.log( err );

                                                                                                                                                    }else
                                                                                                                                                    {

                                                                                                                                                        db.query(
                                                                                                                                                            "SELECT id FROM vaccination WHERE candidate_id = " + rslt[0].candidate_id,
                                                                                                                                                            ( err, result ) => {

                                                                                                                                                                if( err )
                                                                                                                                                                {

                                                                                                                                                                    console.log( err );

                                                                                                                                                                }else
                                                                                                                                                                {

                                                                                                                                                                    db.query(
                                                                                                                                                                        "INSERT INTO laboratory_investigation(candidate_id, blood_group, hemoglobin, malaria, micro_filaria, RBs, lft, creatinine, hivIII, HbsAg, antiHcv, vdrl, tpha, sugar, albumin, CovidPCR, CovidAntibodies, helminthes, ova, cyst, others, vaccination_id, insert_by, insert_date, insert_time) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                                                                                                                                                                        [rslt[0].candidate_id, bloodGroup, hemoglobin, malaria, microFilaria, RBs, lft, creatinine, hivIII, HbsAg, antiHcv, vdrl, tpha, sugar, albumin, CovidPCR, CovidAntibodies, helminthes, ova, cyst, others, result[0].id, Inserter, date, fullTime],
                                                                                                                                                                        ( err, result ) => {
                        
                                                                                                                                                                            if( err )
                                                                                                                                                                            {
                        
                                                                                                                                                                                console.log( err );
                        
                                                                                                                                                                            }else
                                                                                                                                                                            {

                                                                                                                                                                                db.query(
                                                                                                                                                                                    "INSERT INTO logs(log, logger, log_date, log_time) VALUES(?,?,?,?)",
                                                                                                                                                                                    ['Laboratory investigation data inserted', logger, date, fullTime],
                                                                                                                                                                                    (err, rslt) => {

                                                                                                                                                                                        if (err) {
                                                                                                                                                                                            console.log(err);
                                                                                                                                                                                        } else {
                                                                                                                                                                                            res.send('Data Inserted');
                                                                                                                                                                                        }

                                                                                                                                                                                    }
                                                                                                                                                                                )
                                                                                                                                                                                
                                                                                                                                                                            }
                        
                                                                                                                                                                        }
                                                                                                                                                                    )

                                                                                                                                                                }

                                                                                                                                                            }
                                                                                                                                                        )

                                                                                                                                                    }

                                                                                                                                                }
                                                                                                                                            )
                                                                                                                
                                                                                                                                        }
                                                                                                                
                                                                                                                                    }
                                                                                                                                )
                                                                                                    
                                                                                                                            }
                                                                                                    
                                                                                                                        }
                                                                                                                    )
                                                                                        
                                                                                                                }
                                                                                        
                                                                                                            }
                                                                                                        )
                                                                            
                                                                                                    }
                                                                            
                                                                                                }
                                                                                            )
                                                                
                                                                                        }
                                                                
                                                                                    }
                                                                                )
                                                    
                                                                            }
                                                    
                                                                        }
                                                                    )
                                        
                                                                }
                                        
                                                            }
                                                        )
                            
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

                    res.send( "Not Found" );

                }

            }

        }
    )

} )

module.exports = router;