const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
//Connect mongodb
mongoose.connect('mongodb://localhost:27017/nodekb',{useNewUrlParser:true})
let db = mongoose.connection

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
let ArticleModel = require('./models/articles')

//Add middleware
//parse application/x-wwx-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}))
//parse application/json
app.use(bodyParser.json())

//Set public folder
app.use(express.static(path.join(__dirname,'public')))

//Load View Engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

//Home Route
app.get('/', (req, res) => {
    //use model
    ArticleModel.find({}, (err, articals) => { //model的静态方法find
        if (err) {
            console.log(err)
        } else {
            res.render('index', {
                title: 'Hello guys I am from app.js',
                articles: articals,
            })
        }
    })

})

//Add Route
app.get('/articles/add', (req, res) => {
    res.render('addArticles', {
        title: 'Add Articles',
    })
})

//Submit articles
app.post('/articles/add',(req,res)=>{
    //an instance of model is document,
    //we can create instance according to schema
    //Since it's connected to a db so we don't have
    //to pass param into the ctor
    let articleModel = new ArticleModel()
    articleModel.title = req.body.title
    articleModel.author = req.body.author
    articleModel.body = req.body.body

    articleModel.save((err)=>{
        if (err) {
            console.log(err)
        } else {
            res.redirect('/')
        }
    })

})

//Start Server
app.listen(3000, () => {
    console.log('Server started listening on port 3000...')
})