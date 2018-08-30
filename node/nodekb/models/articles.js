const mongoose = require('mongoose')
//With Mongoose, everything is derived from a Schema.
//use the ctor to new a schema called Article
let articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    }
})
//create a model which is equivalent to 'document' in mongodb
let ArticleModel = module.exports = mongoose.model('ArticleModel', articleSchema,'articles')
