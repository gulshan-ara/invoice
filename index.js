// require express for using it
const express = require("express");
const app = express();
const path = require('path');
const engine = require('ejs-blocks');

// set the port
const port = 3000;

// tell app to use ejs 
app.set('view engine', 'ejs');
app.engine('ejs', engine);
app.set('views', path.join(__dirname, '/views'));

// bind the middleware
app.use(express.static(path.join(__dirname, 'public')));


// adding the view engine
app.get('/', (req, res) => {
    // rendering the ejs file
    res.render('home', { style: "css/home.css" });
});

// bind and listen the connections on the specified host and port
app.listen(port, () => {
    console.log(`listening on port ${port}!!`)
});