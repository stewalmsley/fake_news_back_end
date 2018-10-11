const { Comment, User }  = require('../models')

exports.sendCommentsByArticle = (request, response, next) => {
    Comment.find({ belongs_to : request.params.article_id })
    .then(comments => {
        response.status(200).send({ comments });
    })
}

exports.addCommentToArticle = (request, response, next) => {
    User.findById(request.body.created_by)
    .then(user => {
        const belongs_to = request.params.article_id;
        const newComment = request.body;
        newComment.belongs_to = belongs_to;
        newComment.created_by = user;
        const comment = new Comment(newComment);
        comment.save((err, comment) => {
            if (err) return next(err);
            response.status(201).send({ comment })
        })
    })
}

exports.updateCommentVotes = (request, response, next) => {
    let increment = 0;
    if (request.query.vote === 'up') increment = 1 
    if (request.query.vote === 'down') increment = -1;
    Comment.findOneAndUpdate({_id: request.params.comment_id}, {$inc: {votes: increment} }, {new: true})
    .then(comment => {
        response.status(201).send({ comment })
    })
}

exports.deleteComment = (request, response, next) => {
    Comment.findByIdAndRemove(request.params.comment_id)
    .then(() => {
        response.status(201).send('removed record')
    })
}