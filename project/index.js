const express = require("express");
const bodyParser = require("body-parser");
const user = require("./router/user.js");
const login = require("./router/login.js");
const routeu2f = require("./router/routeu2f")

var https = require('https');
var http = require('http');
var fs = require('fs');

var app = express();


app.use(express.static(__dirname + "/static"));

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(login.passport.initialize());

app.use("/login", login.router);
app.use("/u2f", routeu2f);

//before this line all route will not use jwt token
//after this line all route will use jwt token
app.use(
  login.passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/login"
  })
);


app.use("/user", user);
app.get("/", (req, res) => {
  console.log("in user:", req.user, req.isAuthenticated());
  res.send("this is main html");
});


//--------------------------------------------
var options = {
  key:fs.readFileSync('./keys/server.key'),
  cert:fs.readFileSync('./keys/server.crt')
}

var httpsServer = https.createServer(options,app);
var httpServer = http.createServer(app);

httpsServer.listen(4430, () => {
  console.log("443 listen ok");
});

httpServer.listen(80, () => {
  console.log("80 listen ok");
});