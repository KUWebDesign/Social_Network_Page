var express               =   require("express"),
    bodyParser            =   require("body-parser"),
    mongoose              =   require("mongoose"),
    passport              =   require("passport"),
    User                  =   require("./models/user"),
    LocalStrategy         =   require("passport-local"),
    passportLocalMongoose =   require("passport-local-mongoose");

mongoose.connect("mongodb://localhost/authUsers");

var app = express();

//Require express for user authentication
app.use(require("express-session")({
    secret: "Hello World!",
    resave: false,
    saveUninitialized: false
}));

app.use(bodyParser.urlencoded({extended: true}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("css"));
app.use(express.static("js"));
app.use(express.static("img"));


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//============
// ROUTES
//=============

app.get("/", function(req, res){
    res.render("index.ejs");
});

app.post("/", passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/"
}) ,function(req, res){
});

/* Start of authentication secret pages*/
app.get("/home", isLoggedIn, function(req, res){
    res.render("home.ejs");
});

//Handle user login
app.post("/home", function(req, res){
    req.body.username;
    req.body.fNameAC;
    req.body.lNameAC;
    req.body.password;
    User.register(new User({username: req.body.username, fNameAC: req.body.fNameAC, lNameAC: req.body.lNameAC}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("/");
        }
        
        passport.authenticate("local")(req, res, function(){
            res.redirect("/home");
        });  
    })
}); 

app.get("/profile", function(req, res){
    res.render("profile.ejs");
});
/* End of authentication secret pages */

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

//Hide secret page middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/");
}

app.get("*", function(req, res){
    res.render("notFound.ejs");
});


app.listen("8080", function(){
    console.log("Starting localhost:8080");
});