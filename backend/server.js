var express = require("express");
var db = require("./database.js")
var bodyParser = require('body-parser')


var app = express()

var urlencodedParser = bodyParser.urlencoded({ extended: false })


var HTTP_PORT = 8000 

app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

app.get("/all", (req, res, next) => {
    var sql = "select * from main"
    var params = []

    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error": err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.post("/add", urlencodedParser, (req, res, next) => {    
    res.header("Access-Control-Allow-Origin", "*");

    var errors=[]
    
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    
    var data = {
        name: req.body.name,
        email: req.body.email
    }
    
    var sql ='INSERT INTO main (name, email) VALUES (?,?)'
    var params =[data.name, data.email]

    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
        })
    });
})


app.use(function(req, res){
    res.status(404);
});
