const { Article, Comment }  = require('../models')
const { addCommentCountToOne, addCommentCountToMany } = require('../utils/commentcount.js')

exports.sendAllArticles = (request, response, next) => {
    let articlesByTopic;
    Article.find().populate('created_by').lean()
    .then(articles => addCommentCountToMany(articles, articlesByTopic))
    .then(articlesWithCommentCounts => response.status(200).send({ articlesWithCommentCounts }))
    .catch(next);
}

exports.sendArticleByID = (request, response, next) => {
    const id = request.params.article_id
    Article.findById(id).populate('created_by').lean()
    .then((article) => addCommentCountToOne(article, id))
    .then(([article, commentCount]) => {
        const articleWithCommentCount = {...article, commentCount};
        response.status(200).send({ articleWithCommentCount })
    })
    .catch(err => {
        if (err.name === 'CastError') next({status: 400, msg: 'Invalid Article ID'});
        else next(err);
    })
}

exports.updateArticleVotes = (request, response, next) => {
    const id = request.params.article_id
    let increment = 0;
    if (request.query.vote === 'up') increment = 1 
    if (request.query.vote === 'down') increment = -1;
    Article.findOneAndUpdate({_id: id}, {$inc: {votes: increment} }, {new: true}).populate('created_by')
    .then(article => addCommentCountToOne(article, id))
    .then(([article, commentCount]) => {
        const articleWithCommentCount = {...article.toObject(), commentCount};
        if (!increment) response.status(204).send({ articleWithCommentCount })
        else response.status(200).send({ articleWithCommentCount })
    })
    .catch(err => {
        if (err.name === 'CastError') next({status: 400, msg: 'Invalid Article ID'});
        else next(err);
    })
}
