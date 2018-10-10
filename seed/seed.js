const mongoose = require('mongoose');
const { Topic, Article, Comment, User } = require('../models');
const {formatArticleData, createRef, formatCommentData} = require('../utils');

const seedDB = ({articleData, commentData, topicData, userData}) => {
    return mongoose.connection.dropDatabase()
    .then(() => {
        console.log(topicData)
        const topicInsertions = Topic.insertMany(topicData);
        const userInsertions = User.insertMany(userData);
        return Promise.all([topicInsertions, userInsertions])
    })
    .then(([topicDocs, userDocs]) => {
        const userRef = createRef(userData, userDocs, 'username');
        const formattedArticleData = formatArticleData(articleData, userRef);
        const articleInsertions = Article.insertMany(formattedArticleData);
        return Promise.all([topicDocs, userDocs, userRef, articleInsertions])
    })
    .then(([topicDocs, userDocs, userRef, articleDocs]) => {
        const articleRef = createRef(articleData, articleDocs, 'title');
        const formattedCommentData = formatCommentData(commentData, userRef, articleRef)
        return Comment.insertMany(formattedCommentData);
    })
    .then((commentDocs) => {
        console.log(commentDocs)
    })
    .catch(console.error);
}


module.exports = seedDB;