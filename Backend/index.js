const express = require("express");
const app = express();
var session = require("express-session");
const todoroute = require("./routes/todo");
const userroute = require("./routes/user");
const passport = require("passport");
const cors = require("cors");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("./schema/user");
const port = 5000;
app.use(express.json());
const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Todo");
}
app.use(
  session({
    secret: "My super duber secret key",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // Use email as the username field
    },
    User.authenticate()
  )
);
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(cors());
app.use(todoroute);
app.use("/user", userroute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
