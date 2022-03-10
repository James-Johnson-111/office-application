const mysql = require('mysql');
const SQLconfig = require('./sql-config');
const SQL = require('mssql');

// SQL.on( 'error', err => {

//     console.log( err.message );

// } )

// async function connecting()
// {

//     try
//     {

//         let pool = await SQL.connect( SQLconfig );
//         let result = await pool.request().query("SELECT * FROM users");
//         console.log( result );
//         SQL.close();

//     }catch ( err )
//     {

//         console.log( err );
//         SQL.close();

//     }

// }

// connecting();

// const db = new SQLdb.ConnectionPool( SQLconfig );
// let req = new SQLdb.Request( db );

// const get = () => {

//     db.connect( ( err ) => { 

//         req.query("SELECT * FROM users", ( err, recordset ) => {

//             if ( err )
//             {

//                 console.log( err );

//             }else
//             {

//                 console.log( recordset );

//             }
//             db.close();

//         } );

//     } )

// }

// get();


// ! OLD CONNECTION STRING 2021-06-18
// const db = mysql.createConnection( 
//     {
//         host: 'localhost',
//         user: 'root',
//         password: '',
//         database: 'office-database',
//         multipleStatements: true
//     }
//     // {
//     //     host: 'remotemysql.com',
//     //     user: '8tttXb5VZx',
//     //     password: 'I7W2CAugk4',
//     //     database: '8tttXb5VZx',
//     //     multipleStatements: true
//     // }
// );


const db = mysql.createPool( 
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'office-database',
        multipleStatements: true,
        supportBigNumbers: true,
        connectionLimit: 300
    }
    // {
    //     host: 'remotemysql.com',
    //     user: '8tttXb5VZx',
    //     password: 'I7W2CAugk4',
    //     database: '8tttXb5VZx',
    //     multipleStatements: true
    // }
);

setInterval(() => {
    console.log(`Database Open Connections ${ db._allConnections.length }`);
	console.log(`Acquiring Connections ${db._acquiringConnections.length}`);
	console.log(`Free Connections ${db._freeConnections.length}`);
	console.log(`Queue Connections ${db._connectionQueue.length}`);
}, 5000);

module.exports = db;