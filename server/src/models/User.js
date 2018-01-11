'use strict';
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const userSchema = new  mongoose.Schema({

    email: { type: String, unique: true, required: true },
    password: String,
    username: { type: String, unique: true, lowercase: true },
    description: String,
    
}, { timestamps: true });
  
const User = mongoose.model('users', userSchema);

module.exports = User;