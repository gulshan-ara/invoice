const mysql = require('mysql');
const con = mysql.createConnection({
    host: 'sql8.freemysqlhosting.net', // Replace with your host name
    user: 'sql8525517', // Replace with your database username
    password: 'eugYm2sZPV', // Replace with your database password
    database: 'sql8525517' // // Replace with your database Name
});

con.connect(function(err) {
    if (err) {
        console.log('error :' + err.message);
        throw err;
    };

    console.log(`Database is connected successfully !`);

    const create_customer = `
            CREATE TABLE if not exists Customer(
            loginId INT AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            phone CHAR(20) NOT NULL,
            PRIMARY KEY (loginId) 
    )`;

    const create_invoice = `
            CREATE TABLE if not exists Invoice(
            invoiceId INT AUTO_INCREMENT,
            customerName VARCHAR(255) NOT NULL,
            invoiceDate CHAR(20) NOT NULL,
            keyVal VARCHAR(255) NOT NULL,
            PRIMARY KEY (invoiceID) 
    )`;

    const create_order = `
        CREATE TABLE if not exists OrderTable (
        orderID INT AUTO_INCREMENT, 
        keyVal VARCHAR(255) NOT NULL,
        prodName VARCHAR(255) NOT NULL,
        unitPrice FLOAT(30) NOT NULL,
        quantity FLOAT(30) NOT NULL,
        PRIMARY KEY (orderID)
    );`

    con.query(create_customer, function(err, results, fields) {
        if (err) {
            console.log(err.message);
        }
    });

    con.query(create_invoice, function(err, results, fields) {
        if (err) {
            console.log(err.message);
        }
    });

    con.query(create_order, function(err, results, fields) {
        if (err) {
            console.log(err.message);
        }
    });
});

module.exports = con;
