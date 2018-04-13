var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("css"));
app.use(express.static("js"));
app.use(express.static("img"));

app.get("/", function(req, res){
    res.render("index.ejs");
});

app.post("/home", function(req, res){
    let emailLogin = req.body.emailLogin;
    let passwordLogin = req.body.passwordLogin;
	res.render("home.ejs", {emailLogin: emailLogin, passwordLogin: passwordLogin});
});

app.get("/profile", function(req, res){
    res.render("profile.ejs");
});

app.get("*", function(req, res){
    res.render("notFound.ejs");
});


app.listen("8080", function(){
    console.log("Starting localhost:8080");
});