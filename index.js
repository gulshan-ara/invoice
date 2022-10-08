// require express for using it
const express = require("express");
const app = express();

// set the port
const port = 3000;

// bind the middleware
app.use((req, res) => {
    res.send(`<h1> Welcome to your express app! </h1>`);
});

// bind and listen the connections on the specified host and port
app.listen(port, () => {
    console.log(`listening on port ${port}!!`)
});