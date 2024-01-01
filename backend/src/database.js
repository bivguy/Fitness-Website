const mongoose = require('mongoose');
const { profileSchema, userSchema , articleSchema, commentSchema } = require('./allSchemas');

const mongoURL = `process.env.MONGO`;

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
