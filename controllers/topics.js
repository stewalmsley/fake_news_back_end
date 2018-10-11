const { Topic, Article, Comment }  = require('../models')

exports.sendAllTopics = (request, response, next) => {
    Topic.find()
    .then(topics => {
        response.status(200).send({ topics })
    })
    .catch(next);
}

exports.sendArticlesByTopic = (request, response, next) => {
    Article.find({belongs_to: request.params.topic_slug}).lean()
    .then(articles => {
        const commentsByArticle = articles.map(article => {
            return Comment.find({belongs_to: article._id}).lean()
        })
        return Promise.all([articles, commentsByArticle])
    })
    .then(([articles, comments]) => {
        console.log(comments)
        if (!articles.length) {
            return Promise.reject({ status: 404, msg: `no articles found on ${request.params.topic_slug}`})
        }
        response.status(200).send({ articlesWithCommentCounts })
    })
    .catch(next);
}

exports.addArticleByTopic = (request, response, next) => {
    const belongs_to = request.params.topic_slug;
    const newArticle = request.body;
    newArticle.belongs_to = belongs_to;
    const article = new Article(newArticle);
    article.save()
    .then(article => {
        response.status(201).send({ article })
    })
    .catch(err => {
        if (err.name === 'ValidationError') {
            next({ status: 400, msg: err.message})
        
    } else next(err)
    })
}