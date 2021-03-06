const express = require('express');
const router = express.Router();
const topicsRouter = require('./topics.js');
const articleRouter = require('./articles.js');
const commentsRouter = require('./comments.js');
const usersRouter = require('./users.js');
router.use(express.static('public'))

router.get("/", (req, res) => res.sendFile('index.html'))

router
.use('/topics', topicsRouter)

router
.use('/articles', articleRouter)

router
.use('/comments', commentsRouter)

router
.use('/users', usersRouter)

module.exports = router;