const express = require('express'), path = require('path');
const app = express();
const fileUpload = require('express-fileupload');
const cors = require('cors');
const mysql = require('mysql');

// const db = mysql.createConnection( 
//     {
//         host: 'remotemysql.com',
//         user: '8tttXb5VZx',
//         password: 'I7W2CAugk4',
//         database: '8tttXb5VZx'
//     }
// )


const db = mysql.createConnection( 
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'office-database'
    }
)

app.use( cors() );
app.use( express.json() );
app.use( express.static( path.join( __dirname, 'public' ) ) );
app.use( fileUpload() );

// app.get( '/', ( req, res ) => {

//     db.query(
//         'SELECT * FROM users',
//         ( err, rslt ) => {

//             if( err )
//             {

//                 console.log( err );

//             }else
//             {

//                 res.send( rslt );

//             }

//         }
//     )

// } );

app.get('/getimages', (req, res) => {
    res.send('./images/HaTra2364.png');
})

app.post('/setcandidate', (req, res) => {
    const { Name, Age, Nationality, Gander, MStatus, Profession, Passport, Insertor, Editor, ImageName, placeofissue, travellingto, token } = req.body;
    const Image = req.files.Image;
    let imagesNames = ImageName + '.png'

    // Image.mv('../client/public/images/' + imagesNames , ( err ) => {

    //     if(err) {

    //         console.log(err);

    //     }

    // });

    Image.mv('images/' + imagesNames , ( err ) => {

        if(err) {

            console.log(err);

        }

    });
    
    db.query(
        'INSERT INTO candidate_info(candidate_name,candidate_passport,candidate_age,candidate_nationality,candidate_gender,candidate_marital_status,candidate_profession,insert_by,edit_by, place_of_issue, travelling_to, token_no ) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)',
        [Name,Passport,Age,Nationality,Gander,MStatus,Profession,Insertor,Editor,placeofissue,travellingto,token],
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
                                ( err, rslt ) => {
    
                                    if( err )
                                    {
    
                                        console.log( err );
    
                                    }else
                                    {
    
                                        res.send("Image Uploaded");
    
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

app.post('/getcandidatereports', ( req, res ) => {

    db.query(
        "SELECT * FROM candidate_info WHERE candidate_id = " + req.body.CandidateID,
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

app.get('/getuser', ( req, res ) => {

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

app.post('/createuser', (req, res) => {
    const loginID = req.body.loginID;
    const loginPass = req.body.loginPass;
    const params = req.body.params;
    
    db.query(
        'INSERT INTO users(login_id,params,user_password) VALUES(?,?,?)',
        [loginID,params,loginPass],
        ( err, rslt ) => {

            if(err)
            {

                console.log( err );

            }else
            {

                res.send( "User Has Been Created" );

            }

        }
    );

});

app.listen( 8080, () => {

    console.log("Server Has Been Started");

} );