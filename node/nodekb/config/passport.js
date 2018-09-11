const LocalStrategy = require('passport-local').Strategy
const User = require('../models/users')
const config = require('../config/database')
const bcrypt = require('bcryptjs')

//passport的middleware:passport.use()太长放在这里,逻辑上passport config放在这里也合适
module.exports = (passport) => {
    passport.use(new LocalStrategy((username, password, done) => {
        let query = { username: username }
        User.findOne(query)
            .then(user => {
                //check username
                if (!user) return done(null, false, { message: 'Incorrect username' })
                return user
            }).catch(err => { throw err })
            .then(user => {
                //check password
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (!isMatch) return done(null, false, { message: 'Incorrect password' })
                        return done(null, user)
                    }).catch(err => { throw err })
            })
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        User.findById(id)
            .then(user => {
                done(null, user)
            }).catch(err => { throw err })
    })
}