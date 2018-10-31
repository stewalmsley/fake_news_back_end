const express = require('express');
const articleRouter = express.Router();
const { sendAllArticles, sendArticleByID, updateArticleVotes, deleteArticle} = require('../controllers/articles.js')
const { sendCommentsByArticle, addCommentToArticle } = require('../controllers/comments.js')

articleRouter
.get('/', sendAllArticles);

articleRouter
.route('/:article_id')
.get(sendArticleByID)
.patch(updateArticleVotes)
.delete(deleteArticle);

articleRouter
.route('/:article_id/comments')
.get(sendCommentsByArticle)
.post(addCommentToArticle)

module.exports = articleRouter;
