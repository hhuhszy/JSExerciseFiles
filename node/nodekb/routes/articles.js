const express = require('express')
const router = express.Router()
//Import db model
const Article = require('../models/articles')
const User = require('../models/users')

const { check, validationResult } = require('express-validator/check')

//Add Article Route
router.get('/add', (req, res) => {
    res.render('addArticle', { 
        title: 'Add Articles',
        errors: undefined
    })
})

//Post articles Route
router.post('/add',
    [
        check('title').isLength({min:1}).trim().withMessage('Title is required'),
        // check('author').isLength({min:1}).trim().withMessage('Author is required'),
        check('body').isLength({min:1}).trim().withMessage('Body is required'),
    ], 
    (req, res) => {
        //express-validator,use mapped() to convert to json like data
        //whose key is check's field and value is msg
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            res.render('addArticle', {
                errors: errors.mapped(),
                title: 'Add Articles',
            })
        } else {
            //an instance of model is document,
            //we can create instance according to schema
            //Since it's connected to a db so we don't have
            //to pass param into the ctor
            let article = new Article()
            article.title = req.body.title
            article.author = req.user._id //only loggedin user can add article 
            article.body = req.body.body
            article.save((err) => {
                if (err) {
                    console.log(err)
                } else {
                    req.flash('success', 'added successfully')
                    res.redirect('/')
                }
            })
        }
    })

//Load Edit Article Form
router.get('/edit/:id', (req, res) => {
    Article.findById(req.params.id, (err, article) => {
            res.render('editArticle', {
                article: article,
                title: 'Edit Articles',
                errors:undefined,
            })
    })
})

//Submit edit articles Route
router.post('/edit/:id',
    [
        check('title').isLength({min:1}).trim().withMessage('Title is required'),
        // check('author').isLength({min:1}).trim().withMessage('Author is required'),
        check('body').isLength({min:1}).trim().withMessage('Body is required'),
    ],
    (req, res) => {
    //define an empty article object to get the data
    //from form submit
    let articleEdit = {}
    let errors = validationResult(req)

    if (!errors.isEmpty()) {
        Article.findById(req.params.id, (err, article) => {
            res.render('editArticle', {
                article: article,
                title: 'Edit Articles',
                errors:errors.mapped(),
            })
        })
    }
    else {
        articleEdit.title = req.body.title
        articleEdit.body = req.body.body

        let query = { _id: req.params.id }

        //Updata the db use static method update
        //rather than instance
        Article.updateOne(query, articleEdit, (err) => {
            if (err) {
                console.log(err)
            } else {
                req.flash('success','updated successfully')
                res.redirect('/')
            }
        })
    }

})

//Delete article
router.delete('/:id', (req, res) => {
    let query = { _id: req.params.id }
    Article.remove(query, (err) => { 
        if (err) {
            console.log(err)
        } else {
            res.send('Success')
        }
    })
})

//Get Single Article Route
router.get('/:id', (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        if (err) throw err
        User.findById(article.author,(err,user) => {
            if (err) throw err
            res.render('article', {
                article: article,
                author: user.username
            })
        })
    })
})

//export
module.exports = router