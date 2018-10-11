const { Topic, Article }  = require('../models')

exports.sendAllTopics = (request, response, next) => {
    Topic.find()
    .then(topics => {
        response.status(200).send({ topics })
    })
    .catch(next);
}

exports.sendArticlesByTopic = (request, response, next) => {
    Article.find({belongs_to: request.params.topic_slug})
    .then(articles => {
        if (!articles.length) {
            return Promise.reject({ status: 404, msg: `no articles found on ${request.params.topic_slug}`})
        }
        response.status(200).send({ articles })
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