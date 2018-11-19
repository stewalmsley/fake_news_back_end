const { User, Comment, Article } = require("../models");
const { addCommentCountToMany } = require("../utils/commentcount.js");

exports.sendAllUsers = (request, response, next) => {
  User.find()
    .then(users => {
      response.status(200).send({ users });
    })
    .catch(next);
};

exports.sendUser = (request, response, next) => {
  let user = {};
  let articles = [];
  let comments = [];
  User.findOne(request.params)
    .lean()
    .then(returnedUser => {
      if (!returnedUser)
        return Promise.reject({ status: 404, msg: "UserName not found" });
      user = returnedUser;
      return Promise.all([
        Comment.find({ created_by: user._id }).lean(),
        Article.find({ created_by: user._id }).lean()
      ]);
    })
    .then(([userComments, userArticles]) => {
      comments = userComments;
      return addCommentCountToMany(userArticles, articles)
    })
    .then(articlesWithCommentCounts => response.status(200).send({ user, comments, articlesWithCommentCounts }))
    .catch(next);
};
