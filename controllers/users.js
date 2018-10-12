const { User, Comment, Article }  = require('../models')

exports.sendUser = (request, response, next) => {
    User.findOne(request.params).lean()
    .then(user => {
        if (!user) return Promise.reject({ status : 404, msg: 'UserName not found'})
        return Promise.all([user, Comment.find({created_by: user._id}), Article.find({created_by: user._id})]);
    })
    .then(([user, comments, articles]) => {
        response.status(200).send({ user, comments, articles });
    })
    .catch(next)
}




