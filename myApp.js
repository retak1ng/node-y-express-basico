let express = require('express');
let app = express();
let bodyParser = require('body-parser');
require('dotenv').config()

app.use(bodyParser.urlencoded({extended: false}))

app.use(function(req, res, next) {
    let method = req.method;
    let path = req.path;
    let ip = req.ip;
    console.log( method + " " + path + " - " + ip );
    next();
});

console.log("Hello World");

app.get("/:word/echo", function(req, res) {
    let word = req.params.word;
    res.json({ echo: word });
})

app.get("/name", (req,res) => {
    let firstname = req.query.first;
    let lastname = req.query.last;
    res.json({ name: firstname +" "+ lastname })
})

app.post("/name", (req, res) => {
    res.json({ name: req.body.first +" "+ req.body.last })
})

app.get("/", function(req, res) {
    const absolutePath = __dirname + "/views/index.html"
    //res.send('Hello Express');
    res.sendFile(absolutePath);
    //res.json({"message": "Hello json"})
});

app.get("/json", function(req, res) {
    console.log(process.env.MESSAGE_STYLE)
    if ( process.env.MESSAGE_STYLE == "uppercase" ){
        res.json({"message": "HELLO JSON"})
    } else {
        res.json({"message": "Hello json"})
    }
});

app.get("/now", function(req, res, next) {
    req.time = new Date().toString();
    next();
}, function(req, res) {
    res.json({ time: req.time });
});

const absolutePath2 = __dirname + "/public"
app.use("/public", express.static(absolutePath2));






























 module.exports = app;
