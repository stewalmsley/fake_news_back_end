const express = require('express');
const topicsRouter = express.Router();
const { sendAllTopics, sendArticlesByTopic, addArticleByTopic} = require('../controllers/topics.js')

topicsRouter
.get('/', sendAllTopics);

topicsRouter
.get('/:topic_slug/articles', sendArticlesByTopic)
.post('/:topic_slug/articles', addArticleByTopic)

module.exports = topicsRouter;