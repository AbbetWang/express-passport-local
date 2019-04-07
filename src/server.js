const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const app = express()

passport.use('local',new LocalStrategy(
    (username, password, done) => {
        if(username == '23'){
        console.log(username+ ':' + password)
          return done(null, {username: username,password:password});
        }else{
            return done(err);
            //return done(null, false, { message: 'Incorrect username.' });
        }
      }
))
passport.serializeUser(function(user, done) {
    console.table(user)
    done(null, user);
})
  
passport.deserializeUser(function(id, done) {
      console.log(id)
      done(err, id);
})
app.use(passport.initialize())
app.use(passport.session())
app.get('/login',
passport.authenticate('local'),
(req,res)=>{
    console.log(req.user.username)
    console.table(req.session)
    res.json({message: 'success'})
})
app.get('/',(req,res)=>{
    res.json({
        message: req.ip
    })
})
app.listen(3000,()=>{
    console.log(`this is running`)
})