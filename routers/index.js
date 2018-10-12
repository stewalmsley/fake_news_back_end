const express = require('express');
const router = express.Router();
const topicsRouter = require('./topics.js');
const articleRouter = require('./articles.js');
const commentsRouter = require('./comments.js');
const usersRouter = require('./users.js');

router.get("/", (req, res) => res.render('homepage'));

router
.use('/topics', topicsRouter)

router
.use('/articles', articleRouter)

router
.use('/comments', commentsRouter)

router
.use('/users', usersRouter)

module.exports = router;