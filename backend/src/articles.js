const { User, Profile, Article, Comment} = require('./database');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');
const uploadImage = require('./image');



async function getArticles(req, res) {
  try {
    // If :id is specified, fetch the article by ID or username
    if (req.params.id) {
      let articles;
      // Check if :id is a number (post id) or a string (username)
      if (!isNaN(req.params.id)) {
        articles = await Article.findOne({ pid: req.params.id });
      } else {
        const user = await Profile.findOne({ username: req.params.id });

        if (!user) {
          return res.status(404).send({ error: 'User not found' });
        }

        articles = await Article.find({ author: req.params.id });
      }

      if (!articles) {
        return res.status(404).send({ error: 'Article not found' });
      }

      return res.send({ articles });
    }

    // If :id is not specified, fetch all articles in the current logged-in user's feed
    const loggedInUsername = req.username; 

    const loggedInUser = await Profile.findOne({ username: loggedInUsername });

    if (!loggedInUser) {
      return res.status(404).send({ error: 'User not found' });
    }

    const articles = await Article.find({
      $or: [
        { author: { $in: loggedInUser.following } },
        { author: loggedInUsername },
      ],
    });

    return res.send({ articles });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: 'Internal Server Error' });
  }
}

async function putArticles(req, res) {
    const pid = req.params.id;
    const { text, commentId } = req.body;
    const loggedInUsername = req.username;
    try {
        // Find the article with the specified id
        let articleToUpdate = await Article.findOne({ pid: pid });
        // If the article with the specified id is not found, return a 404 Not Found response
        if (!articleToUpdate) {
            return res.status(404).send({ error: 'Article not found' });
        }
        // If commentId is not supplied, update the article's text
        if (!commentId) {
            if (articleToUpdate.author !== loggedInUsername) {
                return res.status(403).send({ error: 'Forbidden: You do not own this article' });
            }
            articleToUpdate.text = text;
        } else if (commentId !== "-1") {
            // If commentId is supplied and it's not -1, update the specified comment
            let tempComment = articleToUpdate.comments.find((comment) => comment.cid.toString() == commentId);
            let commentToUpdate = await Comment.findOne({ cid: commentId });
            // If the comment with the specified id is not found, return a 404 Not Found response
            if (!commentToUpdate) {
                return res.status(404).send({ error: 'Comment not found' });
            }
            // Check if the user owns the comment
            if (commentToUpdate.author !== loggedInUsername) {
                // If the user does not own the comment
                return res.status(403).send({ error: 'Forbidden: You do not own this comment' });
            }
            // Update the text of the specified comment
            commentToUpdate.text = text;
            tempComment.text = text;
            // Save the updated comment
            await commentToUpdate.save();
            await articleToUpdate.save();
            return res.status(200).send({ articles: [articleToUpdate] });
        } else if (commentId === "-1") {
            // If commentId is -1, add a new comment to the article
            const newComment = new Comment({
                author: loggedInUsername,
                text: text,
                date: new Date(),
                cid: new mongoose.Types.ObjectId(),
            });
            // Save the new comment
            await newComment.save();
            // Add the new comment to the article's comments array
            articleToUpdate.comments.push(newComment);
        }
        // Save the updated article
        await articleToUpdate.save();
        // Return the updated article
        return res.status(200).send({ articles: [articleToUpdate] });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
}


async function postArticle(req, res) {
    try {
        // Extract the article details from the request body
        const text= req.body.text;
        const title = req.body.title;
        // Create a new Article document
        const newArticle = new Article({
            pid: new mongoose.Types.ObjectId(),
            author: req.username,
            text: text,
            title: title,
            date: new Date(),
            image: req.fileurl || '',
            comments: [] // comments start empty for a new article
        });
    

        await newArticle.save();
    
        // Respond with the created article
        return res.status(201).send({ articles: [newArticle] });
      } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Internal Server Error' });
      }
    }

module.exports = (app) => {
    app.get('/articles/:id?', getArticles);
    app.put('/articles/:id', putArticles);
    app.post('/article', uploadImage('image'), postArticle);
}