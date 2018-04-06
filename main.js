var express = require("express");
var app = express();

app.use(express.static("css"));
app.use(express.static("js"));
app.use(express.static("img"));

app.get("/", function(req, res){
    res.render("index.ejs");
});
app.get("/home", function(req, res){
	res.render("home.ejs");
})

app.listen("8080", function(){
    console.log("Starting localhost:8080");
});