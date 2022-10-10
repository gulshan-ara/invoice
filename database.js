const mysql = require('mysql');
const con = mysql.createConnection({
    host: 'localhost', // Replace with your host name
    user: 'root', // Replace with your database username
    password: 'AnaN%%2016##', // Replace with your database password
    database: 'invoice_project' // // Replace with your database Name
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
            invoiceDate CHAR(11) NOT NULL,
            products JSON NOT NULL,
            PRIMARY KEY (invoiceID) 
    )`;

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
});
module.exports = con;