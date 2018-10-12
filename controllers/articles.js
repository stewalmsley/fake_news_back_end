const { Article, Comment }  = require('../models')

exports.sendAllArticles = (request, response, next) => {
    return Promise.all([Article.find().lean(), Comment.find().lean()])
    .then(([articles, comments]) => {
        const articlesWithCommentCounts = articles.map(article => {
            const commentCount = comments.filter(comment => comment.belongs_to.toString() === article._id.toString()).length;
            return {...article, commentCount}
        })
        response.status(200).send({ articlesWithCommentCounts })
    })
    .catch(next);
}

exports.sendArticleByID = (request, response, next) => {
    Article.findById(request.params.article_id).lean()
    .then(article => {
        if (!article) return Promise.reject({ status: 404, msg: `${request.params.article_id} not found`})
        return Promise.all([article, Comment.count({belongs_to: request.params.article_id})]);
    })
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
    let increment = 0;
    if (request.query.vote === 'up') increment = 1 
    if (request.query.vote === 'down') increment = -1;
    Article.findOneAndUpdate({_id: request.params.article_id}, {$inc: {votes: increment} }, {new: true})
    .then(article => {
        if (!article) return Promise.reject({ status: 404, msg: `${request.params.article_id} not found`})
        return Promise.all([article, Comment.count({belongs_to: request.params.article_id})]);
    })
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
