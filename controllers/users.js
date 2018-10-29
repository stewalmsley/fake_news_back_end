const { User, Comment, Article }  = require('../models')

exports.sendUser = (request, response, next) => {
    User.findOne(request.params).lean()
    .then(user => {
        if (!user) return Promise.reject({ status : 404, msg: 'UserName not found'})
        return Promise.all([user, Comment.find({created_by: user._id}).lean(), Article.find({created_by: user._id}).lean()]);
    })
    .then(([user, comments, articles]) => {
        const articlesWithCommentCounts = articles.map(article => {
            const commentCount = comments.filter(comment => `${comment.belongs_to}` === `${article._id}`).length;
            return {...article, commentCount}
        })
        response.status(200).send({ user, comments, articlesWithCommentCounts });
    })
    .catch(next)
}




