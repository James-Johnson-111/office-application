const express = require('express'), path = require('path');
const app = express();
const fileUpload = require('express-fileupload');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

// different express packages other things

app.use( cors() );
app.use( express.json() );
app.use( express.static( path.join( __dirname, 'public' ) ) );
app.use( fileUpload() );

// Following route for user authentication i.e login/logout
app.use( require('./Routes/Auth') );

// Following route is to set the candidate information/data
app.use( require('./Routes/SetCandidate') );

// Following route is to get  candidate information/data
app.use( require('./Routes/GetCandidate') );

// Following route is to set the candidate's examination/laboratories test's information/data
app.use( require('./Routes/Exams_Laboratories') );

// Following route is to store logs
app.use( require('./Routes/Logs') );

// Following route is to store and get tokens
app.use( require('./Routes/Tokens') );

// Following route is to set all routes for only admin
app.use( require('./Routes/Admin_Specific_Routes') );

// Following route is all about candidate reports
app.use( require('./Routes/Reports') );

// Here we provide access and allow origin to accept http-request

app.use(( req, res, next ) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();

});

// the following condition is for heroku app

if ( process.env.NODE_ENV == "production")
{ 
    app.use(express.static("client/build"));
}

// the following block of code is to define the port number which is dynamic

app.listen( PORT, () => {

    console.log(`Server run on localhost:${PORT}`);

} );