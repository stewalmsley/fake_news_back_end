const express = require('express');
const topicsRouter = express.Router();
const { sendAllTopics, sendArticlesByTopic, addArticleByTopic} = require('../controllers/topics.js')

topicsRouter
.get('/', sendAllTopics);

topicsRouter
.route('/:topic_slug/articles')
.get(sendArticlesByTopic)
.post(addArticleByTopic)

module.exports = topicsRouter;