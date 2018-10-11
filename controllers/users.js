const { User }  = require('../models')

exports.sendUser = (request, response, next) => {
    User.find({ username: request.params.username})
    .then(user => {
        response.status(200).send({ user });
    })
}