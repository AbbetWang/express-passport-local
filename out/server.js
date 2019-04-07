"use strict";

var express = require('express');

var passport = require('passport');

var session = require("express-session");

var checkUser = require('./util/index');

var LocalStrategy = require('passport-local').Strategy;

var bcrypt = require('bcrypt');

var app = express();
var saltRounds = 10;
var myPlaintextPassword = 's0/\/\P4$$w0rD';
var someOtherPlaintextPassword = 'not_bacon';
passport.use('local', new LocalStrategy(function (username, password, done) {
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
      console.log(hash);
      return done(null, {
        id: '1',
        username: username,
        password: hash
      });
    });
  });

  if (username == '23') {
    // console.log(username+ ':' + password)
    return done(null, {
      id: '1',
      username: username,
      password: password
    });
  } else {
    return done(err); //return done(null, false, { message: 'Incorrect username.' });
  }
}));
passport.serializeUser(function (user, done) {
  //  console.table(user)
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  console.log(user);
  done(null, user);
});
app.use(session({
  secret: "cats"
}));
app.use(passport.initialize());
app.use(passport.session());
app.get('/login', passport.authenticate('local'), function (req, res) {
  // console.log(req.user.username)
  //  console.table(req.session)
  res.json({
    message: 'success'
  });
});
app.get('/', function (req, res) {
  // const match = await checkUser(req.user,'1234')
  console.log(match);
  res.json({
    message: req.ip,
    user: req.user
  });
});
app.listen(3000, function () {
  console.log("this is running");
});