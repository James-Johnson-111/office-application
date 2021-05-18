const mysql = require('mysql');
const SQLconfig = require('./sql-config');
const SQLdb = require('mssql');

const db = SQLdb.connect( SQLconfig, ( err ) => {

    if ( err  ) console.log( err );

    let request = new SQLdb.Request();
    let query = "SELECT * from users";

    request.query( query, ( err, rslt ) => {

        if ( err ) console.log( err );

        console.log( rslt );

        SQLdb.close();

    } )

} )

// const db = mysql.createConnection( 
//     {
//         host: 'localhost',
//         user: 'root',
//         password: '',
//         database: 'office-database'
//     }
//     // {
//     //     host: 'remotemysql.com',
//     //     user: '8tttXb5VZx',
//     //     password: 'I7W2CAugk4',
//     //     database: '8tttXb5VZx'
//     // }
// );

module.exports = db;