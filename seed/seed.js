const mongoose = require('mongoose');
const { Topic, Article, Comment, User } = require('../models');
const {formatArticleData, createRef, formatCommentData} = require('../utils');

const seedDB = ({articleData, commentData, topicData, userData}) => {
    return mongoose.connection.dropDatabase()
    .then(() => {
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
        return Promise.all([topicDocs, articleDocs, userDocs, Comment.insertMany(formattedCommentData)]);
    })
    .then(([topicDocs, articleDocs, userDocs, commentDocs]) => {
        // console.log(topicDocs, articleDocs, userDocs, commentDocs)
        return [topicDocs[0], articleDocs[0], userDocs[0], commentDocs[0]];
    })
    .catch(console.error);
}


module.exports = seedDB;