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
//we have the origin collection by handwrite to the db
//so we assign a collection to avoid the mongoose's autoname 
//in case of there's no collection
module.exports = mongoose.model('Article', articleSchema,'articles')
