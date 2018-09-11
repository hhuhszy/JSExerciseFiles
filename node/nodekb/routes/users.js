const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
//Import db model
const User = require('../models/users')
const { check, validationResult } = require('express-validator/check')
const passport = require('passport')

//Register User Route
router.get('/register', (req, res) => {
    res.render('registerUser',{
        errors:undefined
    })
})

//Register post
router.post('/register',
    [
        check('name').isLength({min:1}).trim().withMessage('Name is required'),
        check('email').isLength({min:1}).trim().withMessage('Email is required'),
        check('email').isEmail().trim().withMessage('Email is invalid'),
        check('username').isLength({min:1}).trim().withMessage('Username is required'),
        check('username').trim().custom(value=>{
                return new Promise((resolve,reject) => {
                    User.findOne({username:value},(err,res) => {
                        if (err) reject(err)
                        if (res) reject('username already exists')
                        resolve('ok')
                    })
                })
        }),
        check('password').isLength({min:1}).trim().withMessage('Password is required'),
        check('password2').trim().custom((value,{req})=>{
            if(value!==req.body.password){
                throw new Error('Password does not match')
            } 
            return 1
        }),
    ], /**
     * custom()需要返回一个reject/抛出一个error或者返回一个value,也可以返回一个promise,然后awaited,
     * 最终还是要返回一个reject/error
     * 如果没有返回value,则会一直返回error,即使通过了check
     */
    (req,res)=>{
        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.render('registerUser',{
                errors:errors.mapped()
            })
        } else {
            let user = new User({
                name:req.body.name,
                email:req.body.email,
                username:req.body.username,
                password:req.body.password,
            })
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(user.password,salt,(err,hash)=>{
                    if (err) {
                       console.log(err)
                    }
                    user.password = hash
                    user.save().then(user=>{
                        req.flash('success','You are registered and can log in')
                        res.redirect('/users/login')
                    }).catch(err=>{console.log(err)})
                })
            })
        }
})

//login form
router.get('/login',(req,res)=>{
    res.render('login')
})

//login process
router.post('/login',(req,res,next) => {
        passport.authenticate('local', { 
            successRedirect: '/',
            failureRedirect: '/users/login',
            failureFlash: true ,
            successFlash: true, //doesn't work if we redirect the success page
        })(req,res,next)  //custom callback
    })

//logout
router.get('/logout',(req,res) => {
    req.logout() //same as logOut
    req.flash('success','You are logged out')
    res.redirect('/users/login')
})

//export
module.exports = router
