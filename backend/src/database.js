const mongoose = require('mongoose');
const { profileSchema, userSchema , articleSchema, commentSchema } = require('./allSchemas');

const mongoURL = `mongodb+srv://bs81:mongoDB@cluster0.zub7vhf.mongodb.net/?retryWrites=true&w=majority`;

const User = mongoose.model("User", userSchema);
const Profile = mongoose.model("Profile", profileSchema);
const Article = mongoose.model("Article", articleSchema);
const Comment = mongoose.model("Comment", commentSchema);

(async () => await mongoose.connect(mongoURL))();

module.exports = {
    User: User,
    Profile: Profile,
    Article: Article,
    Comment: Comment
};