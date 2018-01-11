'use strict';
const mongoose = require('mongoose');

const postSchema = new  mongoose.Schema({

    user_id: String,
    text: String,
    likes: [{type: String}],
    
}, { timestamps: true });
  
const Post = mongoose.model('posts', postSchema);

module.exports = Post;