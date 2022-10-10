// require express for using it
const express = require("express");
const app = express();
const path = require('path');
const engine = require('ejs-blocks');
const bodyParser = require('body-parser');

const db = require('./database');



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


app.get('/Invoice', function(req, res) {
    
    let key = Date.now();

    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let  day = date.getDate();
    let curr_date = month + "/" + day + "/" + year;
    
    const readQuery = `
            SELECT * FROM Customer;
    `;

    db.query(readQuery, function(err, result) {
        if (err) throw err;
        else {
            obj = { print: result, key, curr_date };
            res.render("invoiceEntry", obj);
        }
    });
});

app.get('/Invoice/:number', function(req, res) {
    const { number } = req.params;
    res.render('invoice', { number });
});


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
    });
})

app.post('/save', function(req, res) {

    const name = req.body.name;
    const contact = req.body.contact;

    const insertQuery = `
            INSERT INTO Customer(name, phone) VALUES("${name}", "${contact}");
    `;

    db.query(insertQuery, function(err, rows, fields) {
        if (!!err) {
            console.log("error", err);
        } else {
            console.log("Record inserted");
            res.redirect('/Customers');
        }
    });

});


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
            console.log('Error', err);
        } else {
            console.log("record deleted");
            return res.redirect('/Customers');
        }
    });
});


app.post('/saveOrder', function(req, res) {
    const keyVal = req.body.keyVal;
    console.log(keyVal);
    const name = req.body.name;
    const unitPrice = parseFloat(req.body.unitPrice);
    const quantity = parseFloat(req.body.quantity);

    const sql = `INSERT INTO OrderTable(keyVal, prodName, unitPrice, quantity) VALUES (${keyVal}, "${name}", ${unitPrice}, ${quantity})`;

    db.query(sql, function(err, rows, fields) {
        if (!!err) {
            console.log("error", err);
        } else {
            const number = { keyVal, name, unitPrice, quantity };
            res.render('invoice', { number });
        }
    });
});

app.post('/saveInvoice', function(req, res) {
    const date_invoice = `${req.body.date}`;
    const keyVal = req.body.keyVal;
    console.log(keyVal);
    let sql = `INSERT INTO Invoice(invoiceDate, keyVal, customerName) Values("${date_invoice}", "${keyVal}", "later");`;
    
    db.query(sql, function(err, rows, fields) {
        if (!!err) {
            console.log("error", err);
        } else {
            res.redirect('/');
        }
    });

})

// bind and listen the connections on the specified host and port
app.listen(port, () => {
    console.log(`listening on port ${port}!!`)
});