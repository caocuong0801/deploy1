var express = require('express');
var app = express();
fs = require('fs');

var bodyParser = require('body-parser')
var files = []

app.use(express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));

var cookieParser = require('cookie-parser')
app.use(cookieParser)

var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
    // console.log("Cookies: ", req.cookies)
   console.log("Got a GET request for the homepage");
   res.send('Hello GET');
})

// This responds a POST request for the homepage
app.post('/', function (req, res) {
   console.log("Got a POST request for the homepage");
   res.send('Hello POST');
})

// This responds a DELETE request for the /del_user page.
app.delete('/del_user', function (req, res) {
   console.log("Got a DELETE request for /del_user");
   res.send('Hello DELETE');
})

// This responds a GET request for the /list_user page.
app.get('/list_user', function (req, res) {
   console.log("Got a GET request for /list_user");
   res.send('Page Listing');
})

// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get('/ab*cd', function(req, res) {   
   console.log("Got a GET request for /ab*cd");
   res.send('Page Pattern Match');
})

app.get('/index.html', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.get('/process_get', function (req, res) {
    var result = {
        first_name: req.query.first_name,
        last_name: req.query.last_name
    }
    console.log(`Reuslt = ${result}`)
    res.end(JSON.stringify(result))
})

app.post('/profile', upload.single('avatar'), function (req, res) {
    // console.log(req);
    files.push(req.file.filename)
    console.log(`name : ${req.file.filename}`)
    // var file = __dirname + '/' + req.file.filename;
    // fs.readFile(req.file.filename, function (err, data) {
    //     if (err) {
    //         console.log('read file error = ', err)
    //         res.end("Read file error")
    //     } else {
    //         fs.writeFile(file, data, function (err) {
    //             var result = {}
    //             if (err) {
    //                 console.log("write eror")
    //             } else {
    //                 result = {
    //                     message: 'File uploaded successfully',
    //                     filename: req.files.file.name
    //                 }
    //             }
    //             res.end(JSON.stringify(result))
    //         })
    //     }
    // })
    res.send(req.baseUrl + '/uploads/' + req.file.filename);
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})