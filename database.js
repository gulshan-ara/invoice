const mysql = require('mysql');
const con = mysql.createConnection({
  host: 'localhost', // Replace with your host name
  user: 'root',      // Replace with your database username
  password: 'AnaN%%2016##', // Replace with your database password
  database: 'invoice_project' // // Replace with your database Name
}); 
 
// con.connect(function(err) {
//   if (err) throw err;
//   console.log(`Database is connected successfully !`);
// });
module.exports = con;