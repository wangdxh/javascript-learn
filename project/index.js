const express = require("express");
const bodyParser = require("body-parser");
const user = require("./router/user.js");
const login = require("./router/login.js");
const aidetect = require("./router/aidetect")
var app = express();

app.use(express.static(__dirname + "/static"));

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(login.passport.initialize());

app.use('/aidetect', aidetect)

app.use("/login", login.router);

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


app.listen(8080, () => {
  console.log("express listen ok");
});
