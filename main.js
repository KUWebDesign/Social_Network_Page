var express = require("express");
var app = express();

app.use(express.static("css"));


app.get("/", function(req, res){
    res.render("index.ejs");
});

app.listen("8080");