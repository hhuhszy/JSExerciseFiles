const mongoose = require('mongoose')
//With Mongoose, everything is derived from a Schema.
//use the ctor to new a schema called Article
let articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
    },
    author: {
        type: String,
        required: false,
    },
    body: {
        type: String,
        required: false,
    }
})
//create a model which is equivalent to 'document' in mongodb
let ArticleModel = module.exports = mongoose.model('ArticleModel', articleSchema,'articles')
