// require express for using it
const express = require("express");
const app = express();
const path = require('path');
const engine = require('ejs-blocks');
const bodyParser = require('body-parser');

const db = require('./database');
const con = require("./database");


// set the port
const port = 3000;

// tell app to use ejs 
app.set('view engine', 'ejs');
app.engine('ejs', engine);
app.set('views', path.join(__dirname, '/views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function(req, res) {
    res.render('index');
});

app.get('/value', function(req, res) {
    res.render('value');
});

app.get('/Invoice', function(req, res) {
    const readQuery = `
            SELECT * FROM Customer;
    `;

    db.query(readQuery, function(err, result) {
        if (err) throw err;
        else {
            obj = { print: result };
            res.render("invoice", obj);
        }
    })
});

// app.get('/Customers', function(req, res){
//     res.render('customer');
// });

app.get('/Customers', function(req, res) {
    const readQuery = `
            SELECT * FROM Customer;
    `;

    db.query(readQuery, function(err, result) {
        if (err) throw err;
        else {
            obj = { print: result };
            res.render("customer", obj);
        }
    })
})

app.post('/save', function(req, res) {

    const name = req.body.name;
    const contact = req.body.contact;

    const insertQuery = `
            INSERT INTO Customer(name, phone) VALUES("${name}", "${contact}");
    `;

    db.query(insertQuery, function(err, rows, fields) {
        if (!!err) {
            console.log("error", +err);
        } else {
            console.log("Record inserted");
            res.redirect('/Customers');
        }
    });

});

let edit = 0;
app.get('/update', function(req, res) {
    const updateQuery = `SELECT * FROM Customer WHERE loginId = ${[req.query.id]};`;

    db.query(updateQuery, function(error, rows, result) {
        if (!!error) {
            console.log('edit Error' + error);
        } else {
            console.log('edit ok');
            obj = { print: rows };
            console.log(obj);
            res.render("updateCustomer", obj);
        }
    });
});


app.post('/updatesave', function(req, res) {
    const id = req.body.id;
    const name = req.body.name;
    const contact = req.body.contact;

    // res.send(`${name} and ${contact}`);

    // update statment
    let sql = `
        UPDATE Customer
        SET name = ?, phone = ?
        WHERE loginId = ?
    `;

    let data = [name, contact, id];

    // execute the UPDATE statement
    db.query(sql, data, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log('Rows affected:', results.affectedRows);
        res.redirect('/Customers');
    });

});

app.get('/delete', function(req, res) {
    const id = req.query.id;
    const del_query = `
            DELETE FROM Customer WHERE loginId="${id}";`

    db.query(del_query, function(err, rows, fields) {

        if (!!err) {
            console.log('Error', +err);
        } else {
            console.log("record deleted");
            return res.redirect('/Customers');
        }
    });
});

// bind and listen the connections on the specified host and port
app.listen(port, () => {
    console.log(`listening on port ${port}!!`)
});