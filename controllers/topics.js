const { Topic, Article, Comment }  = require('../models')
const { addCommentCountToMany } = require('../utils/commentcount.js')

exports.sendAllTopics = (request, response, next) => {
    Topic.find()
    .then(topics => {
        response.status(200).send({ topics })
    })
    .catch(next);
}

exports.sendArticlesByTopic = (request, response, next) => {
    let articlesByTopic;
    Article.find({belongs_to: request.params.topic_slug}).populate('created_by').lean()
    .then(articles => {
        if (!articles.length) {
            return Promise.reject({ status: 404, msg: `no articles found on ${request.params.topic_slug}`})
        }
        return addCommentCountToMany(articles, articlesByTopic)
    })
    .then(articlesWithCommentCounts => response.status(200).send({ articlesWithCommentCounts }))
    .catch(next);
}

exports.addArticleByTopic = (request, response, next) => {
    const belongs_to = request.params.topic_slug;
    const newArticle = (({ title, created_by, body }) => ({ title, created_by, body }))(request.body);
    newArticle.belongs_to = belongs_to;
    const article = new Article(newArticle)
    article.save()
    .then(article => {
        return Promise.all([article, Comment.count({belongs_to: request.params.article_id})]);
    })
    .then(([article, commentCount]) => {
        const articleWithCommentCount = {...article.toObject(), commentCount};
        response.status(201).send({ articleWithCommentCount })
    })
    .catch(err => {
        if (err.name === 'BulkWriteError') {
            next({ status: 409, msg: 'Article already exists'})
        }
        else if (err.name === 'ValidationError') {
            next({ status: 400, msg: err.message})
        } else next(err)
    })
}