const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const config = require('./config/database')

//Connect mongodb
//--------------------------------------------------------------------------------
mongoose.connect(config.uri, { useNewUrlParser: true })
const db = mongoose.connection
//check connect
db.once('open', () => {
    console.log('Mongodb Connected')
})
//check db error
db.on('error', (err) => {
    console.log(err)
})
//--------------------------------------------------------------------------------

//Initial App
const app = express()

//Import db model
const Artical = require('./models/articles')

//Load View Engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

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
    resave: false,//true:overwrite session even if it made no change,deprecated
    saveUninitialized: false,//false:useful for login session and comply with laws that requires permission before settin a cookie
}))//NOTE!!! IF YOU SET COOKIE:{} YOU MUST SET maxAge OR YOU COULD NOT USE THE FLASH MESSAGE
app.use(flash());
//set global var: message for flashing message
app.use((req, res, next) => {
    res.locals.messages = req.flash()
    next()
})
//passport config
require('./config/passport')(passport)
//passport middleware
app.use(passport.initialize());
app.use(passport.session());
//---------------------------------------------------------------------------------------

//set global var: user for control display log nav-bar
app.all('*',(req,res,next) => {
    res.locals.user = req.user || null //passprot添加的req.user,存放sessionid
    next()
})


//Home Route
app.get('/', (req, res) => {
    //use model
    Artical.find({}, (err, articals) => { //model的静态方法find
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

//route -------------------------------------------------------------------------
//route file MUST AFTER ADDING MIDDLEWARES
const articles = require('./routes/articles')
const users = require('./routes/users')
app.use('/articles',articles)
app.use('/users',users)
//route ------------------------------------------------------------------------- 

//Start Server
app.listen(3000, () => {
    console.log('Server started listening on port 3000...')
})