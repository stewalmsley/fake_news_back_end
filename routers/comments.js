const express = require('express');
const commentsRouter = express.Router();
const { updateCommentVotes, deleteComment } = require('../controllers/comments.js')

commentsRouter
.route('/:comment_id')
.patch(updateCommentVotes)
.delete(deleteComment);



module.exports = commentsRouter;