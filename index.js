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
    res.render('invoice');
});

app.get('/Customers', function(req, res) {
    db.query("select * from Customers", function(err, result) {
        if (err) throw err;
        else {
            obj = { print: result };
            res.render("customer", obj);
        }
    })
})

// bind and listen the connections on the specified host and port
app.listen(port, () => {
    console.log(`listening on port ${port}!!`)
});