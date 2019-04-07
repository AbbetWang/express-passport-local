const express = require('express')
const passport = require('passport')
const session = require("express-session")
import {checkUser} from './util/index'
const LocalStrategy = require('passport-local').Strategy
import * as bcrypt from 'bcrypt'
const app = express()

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD'
const someOtherPlaintextPassword = 'not_bacon'

passport.use('local',new LocalStrategy(
    (username, password, done) => {
        bcrypt.genSalt(saltRounds,(err,salt)=>{
            bcrypt.hash(password,salt,(err,hash)=>{
              //  console.log(hash)
                return done(null, {id:'1',username: username,password: hash});
            })
        })
    //     if(username == '23'){
    //    // console.log(username+ ':' + password)
    //       return done(null, {id:'1',username: username,password:password});
    //     }else{
    //         return done(err);
    //         //return done(null, false, { message: 'Incorrect username.' });
    //     }
      }
))
passport.serializeUser(function(user, done) {
  //  console.table(user)
    done(null, user);
})
  
passport.deserializeUser(function(user, done) {
     // console.log(user)
      done(null, user);
})
app.use(session({ secret: "cats" }));
app.use(passport.initialize())
app.use(passport.session())
app.get('/login',
passport.authenticate('local'),
(req,res)=>{
   // console.log(req.user.username)
  //  console.table(req.session)
    res.json({message: 'success'})
})
app.get('/',async (req,res)=>{

    const match = await checkUser(req.user,'1234')
    console.log(match)
    res.json({
        message: req.ip,
        user: req.user
    })
})
app.listen(3000,()=>{
    console.log(`this is running`)
})