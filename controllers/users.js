const { User }  = require('../models')

exports.sendUser = (request, response, next) => {
    User.find({ username: request.params.username})
    .then(user => {
        if(!user.length) return Promise.reject({ status : 404, msg: 'UserName not found'} )
        response.status(200).send({ user });
    })
    .catch(next)
}