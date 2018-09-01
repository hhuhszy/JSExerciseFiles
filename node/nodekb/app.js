const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator/check')
const flash = require('connect-flash')
const session = require('express-session')

//Connect mongodb
mongoose.connect('mongodb://localhost:27017/nodekb', { useNewUrlParser: true })
const db = mongoose.connection

//check connect
db.once('open', () => {
    console.log('Mongodb Connected')
})
//check db error
db.on('error', (err) => {
    console.log(err)
})

//Initial App
const app = express()

//Import model
const ArticleModel = require('./models/articles')

//Add middleware
//---------------------------------------------------------------------------------------
//parse application/x-wwx-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//parse application/json
app.use(bodyParser.json())
//Set public folder
app.use(express.static(path.join(__dirname, 'public')))
//Express Session,connect-flash Middleware ! the order is important
app.use(session({
    secret: 'keyboard cat',//sign the sessionId cookie like PHP_SESSION
    resave: true,//true:overwrite session even if it made no change,deprecated
    saveUninitialized: true,//false:useful for login session and comply with laws that requires permission before settin a cookie
}))//NOTE!!! IF YOU SET COOKIE:{} YOU MUST SET maxAge OR YOU COULD NOT USE THE FLASH MESSAGE
app.use(flash());
//set flash
app.use((req, res, next) => {
    res.locals.messages = req.flash()
    next()
})
//---------------------------------------------------------------------------------------

//Load View Engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//Home Route
app.get('/', (req, res) => {
    //use model
    ArticleModel.find({}, (err, articals) => { //model的静态方法find
        if (err) {
            console.log(err)
        } else {
            res.render('index', {
                title: 'Article',
                articles: articals,
            })
        }
    })

})

//Get Single Article
app.get('/article/:id', (req, res) => {
    ArticleModel.findById(req.params.id, (err, article) => {
        if (err) {
            console.log(err)
        } else {
            res.render('article', {
                article: article
            })
        }
    })
})

//Add Article Route
app.get('/articles/add', (req, res) => {
    res.render('addArticle', {
        title: 'Add Articles',
    })
})

//Post articles Route
app.post('/articles/add',
    [
        check('title').isLength({min:1}).trim().withMessage('Title is required'),
        check('author').isLength({min:1}).trim().withMessage('Author is required'),
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
            let articleModel = new ArticleModel()
            articleModel.title = req.body.title
            articleModel.author = req.body.author
            articleModel.body = req.body.body
            articleModel.save((err) => {
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
app.get('/articles/edit/:id', (req, res) => {
    ArticleModel.findById(req.params.id, (err, article) => {
        res.render('editArticle', {
            article: article,
            title: 'Edit Articles'
        })
    })
})

//Submit edit articles Route
app.post('/articles/edit/:id', (req, res) => {
    //define an empty article object to get the data
    //from form submit
    let articleEdit = {}
    articleEdit.title = req.body.title
    articleEdit.author = req.body.author
    articleEdit.body = req.body.body

    let query = { _id: req.params.id }

    //Updata the db use static method update
    //rather than instance
    ArticleModel.update(query, articleEdit, (err) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/')
        }
    })
})

//Delete article
app.delete('/article/:id', (req, res) => {
    let query = { _id: req.params.id }
    ArticleModel.remove(query, (err) => {
        if (err) {
            console.log(err)
        } else {
            res.send('Success')
        }
    })
})

//Start Server
app.listen(3000, () => {
    console.log('Server started listening on port 3000...')
})