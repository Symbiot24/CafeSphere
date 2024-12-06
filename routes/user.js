const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user.js");
const Cafeowner = require("../models/cafeowner.js");
const wrapAsync = require("../utils/wrapAsync.js");

router.get("/signup", (req, res) => {
    res.render("pages/signup-user.ejs");
});

router.post("/signup", wrapAsync(async (req, res) => {
    try{
        if(req.body.option === "user"){
            let {email, contactNo, address, username, password} = req.body;
            let newUser = new User({email, contactNo, address, username});
            let registeredEntity = await User.register(newUser, password);
            req.flash("success", "Welcome to CafeSphere");
            res.redirect("/");
        }
        else if(req.body.option === "cafeowner"){
            let {email, contactNo, username, password} = req.body;
            let newCafeowner = new Cafeowner({email, contactNo, username});
            let registeredEntity = await Cafeowner.register(newCafeowner, password);
            req.flash("success", "Welcome to CafeSphere");
            res.redirect("/");
        }
       
    }
    catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
    
}));

router.get("/login", (req, res) => {
    res.render("pages/login-user.ejs");
});


router.post("/login/user", passport.authenticate("user-local", {failureRedirect: '/login', failureFlash: true}) ,async (req, res) => {
    console.log(req.user);
    req.flash("success", "Welcome back to Cafesphere");
    res.redirect("/");
});

router.post("/login/cafeowner", passport.authenticate("cafeowner-local", {failureRedirect: '/login', failureFlash: true}) ,async (req, res) => {
    console.log(req.user);
    req.flash("success", "Welcome back to Cafesphere");
    res.redirect("/");
   });

router.get("/logout", (req, res, next) => {
    req.logOut((err)=> {
        if(err){
            next(err);
        }
        req.flash("success", "you are logged out now");
        res.redirect("/");
    })
})   
   

module.exports = router;