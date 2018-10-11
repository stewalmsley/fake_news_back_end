const express = require('express');
const articleRouter = express.Router();
const { sendAllArticles, sendArticleByID, updateArticleVotes} = require('../controllers/articles.js')
const { sendCommentsByArticle, addCommentToArticle } = require('../controllers/comments.js')

articleRouter
.get('/', sendAllArticles);

articleRouter
.get('/:article_id', sendArticleByID)
.patch('/:article_id', updateArticleVotes);

articleRouter
.get('/:article_id/comments', sendCommentsByArticle)
.post('/:article_id/comments', addCommentToArticle)

module.exports = articleRouter;
