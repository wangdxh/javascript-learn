const express = require("express");
const bodyParser = require("body-parser");
const user = require("./router/user.js");
const login = require("./router/login.js");
const routeu2f = require("./router/routeu2f")

var https = require('https');
var http = require('http');
var fs = require('fs');

var app = express();


app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");//项目上线后改成页面的地址   
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");   
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");   
  next();
  });

app.use(express.static(__dirname + "/../my-vue-ca/dist"));
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

app.use("/user", user);

//before this line all route will not use jwt token
//after this line all route will use jwt token
app.use(
  login.passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/login"
  })
);


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
  console.log("4430 listen ok");
});

httpServer.listen(80, () => {
  console.log("80 listen ok");
});