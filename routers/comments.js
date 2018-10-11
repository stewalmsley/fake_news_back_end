const express = require('express');
const commentsRouter = express.Router();
const { updateCommentVotes, deleteComment } = require('../controllers/comments.js')

commentsRouter
.patch('/:comment_id', updateCommentVotes)
.delete('/:comment_id', deleteComment);



module.exports = commentsRouter;