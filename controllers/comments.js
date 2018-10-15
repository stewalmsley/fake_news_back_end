const { Comment, User }  = require('../models')

exports.sendCommentsByArticle = (request, response, next) => {
    Comment.find({ belongs_to : request.params.article_id }).populate('created_by').populate('belongs_to')
    .then(comments => {
        if (!comments.length) {
                return Promise.reject({ status: 404, msg: `comments for ${request.params.article_id} not found`})
            }
            response.status(200).send({ comments })
        })
        .catch(err => {
            if (err.name === 'CastError') next({status: 400, msg: 'Invalid Article ID'});
            else next(err);
    })
}

exports.addCommentToArticle = (request, response, next) => {
    User.findById(request.body.created_by)
    .then(user => {
        const belongs_to = request.params.article_id;
        const newComment = (({ body }) => ({ body }))(request.body);
        newComment.belongs_to = belongs_to;
        newComment.created_by = user;
        const comment = new Comment(newComment);
        comment.save()
        .then(comment => {
            response.status(201).send({ comment })
        })
        .catch(err => {
            if (err.name === 'BulkWriteError') {
                next({ status: 409, msg: 'Comment already exists'})
            }
            else if (err.name === 'ValidationError') next({status: 400, msg: err.message})
            else next(err);
        })
    })
}

exports.updateCommentVotes = (request, response, next) => {
    let increment = 0;
    if (request.query.vote === 'up') increment = 1 
    if (request.query.vote === 'down') increment = -1;
    Comment.findOneAndUpdate({_id: request.params.comment_id}, {$inc: {votes: increment} }, {new: true})
        .then(comment => {
            if (!comment) {
                return Promise.reject({ status: 404, msg: `${request.params.comment_id} not found`})
            }
            if (!increment) response.status(204).send({ comment })
            else response.status(200).send({ comment })
        })
    .catch(err => {
        if (err.name === 'CastError') next({status: 400, msg: 'Invalid Comment ID'});
        else next(err);
    })
}

exports.deleteComment = (request, response, next) => {
    Comment.findByIdAndRemove(request.params.comment_id)
    .then((comment) => {
        if (!comment) {
            return Promise.reject({ status: 404, msg: `${request.params.comment_id} not found`})
        }
        response.status(200).send('removed record')
    })
    .catch(err => {
        if (err.name === 'CastError') next({status: 400, msg: 'Invalid Comment ID'});
        else next(err);
    })
}