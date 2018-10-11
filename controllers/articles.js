const { Article }  = require('../models')

exports.sendAllArticles = (request, response, next) => {
    Article.find()
    .then(articles => {
        response.status(200).send({ articles })
    })
    .catch(err => {
        response.status(500).send({msg : "error"})
    })
}

exports.sendArticleByID = (request, response, next) => {
    Article.find({_id: request.params.article_id})
    .then(article => {
        response.status(200).send({ article });
    })
}

exports.updateArticleVotes = (request, response, next) => {
    let increment = 0;
    if (request.query.vote === 'up') increment = 1 
    if (request.query.vote === 'down') increment = -1;
    Article.findOneAndUpdate({_id: request.params.article_id}, {$inc: {votes: increment} }, {new: true})
    .then(article => {
        response.status(201).send({ article })
    })
}
