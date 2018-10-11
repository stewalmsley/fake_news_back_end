const { Topic, Article }  = require('../models')

exports.sendAllTopics = (request, response, next) => {
    Topic.find()
    .then(topics => {
        response.status(200).send({ topics })
    })
    .catch(err => {
        response.status(500).send({msg : "error"})
    })
}

exports.sendArticlesByTopic = (request, response, next) => {
    Article.find({belongs_to: request.params.topic_slug})
    .then(articles => {
        response.status(200).send({ articles })
    })
    .catch(err => {
        response.status(500).send({msg : "error"})
    })
}

exports.addArticleByTopic = (request, response, next) => {
    const belongs_to = request.params.topic_slug;
    const newArticle = request.body;
    newArticle.belongs_to = belongs_to;
    const article = new Article(newArticle);
    article.save((err, article) => {
        if (err) return next(err);
        response.status(201).send({ article })
    })
}