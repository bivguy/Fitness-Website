const mongoose = require('mongoose');

//This is the schema for the profile
const profileSchema = new mongoose.Schema({
    displayname: String,
    username: String,
    email: String,
    zipcode: Number,
    headline: String,
    phone: String,
    dob: Date,
    avatar: String,
    following: [String],
});

//This is the schema for the user
const userSchema = new mongoose.Schema({
    username: String,
    salt: String,
    hash: String
});

//This is the schema for comments
const commentSchema = new mongoose.Schema({
    author: String,
    text: String,
    date: { type: Date, default: Date.now },
    cid: { type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId }
});

// This is the schema for articles
const articleSchema = new mongoose.Schema({
    // pid: { type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId },
    pid: mongoose.Schema.Types.ObjectId,
    author: String,
    text: String,
    title: String,
    image: String,
    date: { type: Date, default: Date.now },
    comments: [commentSchema]
});

// This is the schedma for the followed users

module.exports = {
    profileSchema: profileSchema,
    userSchema: userSchema,
    articleSchema: articleSchema,
    commentSchema: commentSchema
};