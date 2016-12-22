/**
 * This implements some HTTP method/code, form and cookie examples.
 */

const express = require('express')
const app = express();
const http_status = require('http-status-codes');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const HOST = "localhost";
const PORT = 3000;

var COMMENTS_FILE = path.join(__dirname, 'server.js');

app.use(express.static('public'));
app.use(express.static('public/forms'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// --------------------------------
// HTTP route and return code examples.

// This responds to GET requests for a hello message.
app.get('/', function(req, res) {
    res.send("Hello, Express route!");
});

// This rejects access to this "lost" resource.
app.get('/lost', function(req, res) {
    res.sendStatus(http_status.NOT_FOUND);
});


/* Entries */

let peopleData = {
    '01': {firstName: 'John', lastName: 'Baker', startdate: new Date(1995, 1, 1)},
    '02': {firstName: 'Pringle', lastName: 'Can', startdate: new Date(2000, 4, 1)},
    '03': {firstName: 'High', lastName: 'Jumper', startdate: new Date(1946, 1, 1)},
    '04': {firstName: 'Dog', lastName: 'Fight', startdate: new Date(2015, 4, 1)}
}

app.get("/people", function(req, res) {
    var name = "";
    Object.keys(peopleData).forEach(function (key) {
        name += peopleData[key].lastName + ", " + peopleData[key].firstName + "<br>";
    });
    res.send( "Name (last, first): " + "<br><br>" + name);
})

app.get("/person/:id", function(req, res) {
    // var name = "";
    var id = "";
    id += req.params[Object.keys(req.params)[0]];
    // name += peopleData[id].lastName + ", " + peopleData[id].firstName + "<br>Start Date: " + peopleData[id].startdate;
    res.send( JSON.stringify(peopleData[id]) );
})

app.get("/person/:id/name", function(req, res) {
    var name = "";
    var id = "";
    id += req.params[Object.keys(req.params)[0]];
    name += peopleData[id].firstName + peopleData[id].lastName;
    res.send( name );
})

app.get("/person/:id/years", function(req, res) {
    var years = "";
    var id = "";
    id += req.params[Object.keys(req.params)[0]];
    years += (2016 - peopleData[id].startdate.getFullYear());
    res.send( years );
})

// --------------------------------
// HTTP form example

// Responds to form posts from the forms/index.html example.
// app.post('/forms', function(req, res) {
//     res.send('Hello, form POST!<br>Posted message: <code>'
// 	     + req.body.user_message + '</code>');
// });

// --------------------------------
// HTTP cookies examples

// This implements routes to list/create/delete cookies.
app.get("/cookies", function(req, res) {
    let cookieMessage = 'cookieName not set...';
    if (req.cookies.cookieName) {
        cookieMessage = "cookieName: " + req.cookies.cookieName;
    }
    res.send("Hello, cookies!<br> " + cookieMessage);
});
app.get("/cookies/set", function(req, res) {
    res.cookie("cookieName", "cookieValue")
    res.send("Cookie is set.");
});
app.get("/cookies/clear", function(req, res) {
    res.clearCookie("cookieName");
    res.send("Cookie is deleted.");
});

app.get("/addperson", function(req, res) {
    res.sendFile(__dirname + '/public/forms/addPerson.html')
});

app.post('/forms', function(req, res) {
    res.send('New Entry Created!<br>Info: <code>'
         + req.body.user_message + '</code>');
});

app.all('*', function (req, res) {
  res.status(http_status.NOT_FOUND);
  res.send("<br>Well there's your problem right there, it's a 404 'page not found' error!");
});

app.listen(PORT, HOST, () => {
    console.log("listening on " + HOST + ":" + PORT + "...");
});
