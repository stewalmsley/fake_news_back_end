const { Article, Comment }  = require('../models')

exports.sendAllArticles = (request, response, next) => {
    Article.find()
    .then(articles => {
        response.status(200).send({ articles })
    })
    .catch(next);
}

exports.sendArticleByID = (request, response, next) => {
    Article.findById(request.params.article_id)
    .then(article => {
        if (!article) {
            return Promise.reject({ status: 404, msg: `${request.params.article_id} not found`})
    }
        return Promise.all([article, Comment.count({belongs_to: request.params.article_id})]);
    })
    .then(([article, commentCount]) => {
        response.status(200).send({ article, commentCount})
    })
    .catch(err => {
        if (err.name === 'CastError') next({status: 400, msg: 'Invalid Article ID'});
        else next(err);
    })
}

exports.updateArticleVotes = (request, response, next) => {
    let increment = 0;
    if (request.query.vote === 'up') increment = 1 
    if (request.query.vote === 'down') increment = -1;
    Article.findOneAndUpdate({_id: request.params.article_id}, {$inc: {votes: increment} }, {new: true})
    .then(article => {
        if (!article) {
            return Promise.reject({ status: 404, msg: `${request.params.article_id} not found`})
        }
        response.status(201).send({ article })
    })
    .catch(err => {
        if (err.name === 'CastError') next({status: 400, msg: 'Invalid Article ID'});
        else next(err);
    })
}
