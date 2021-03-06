const { Comment }  = require('../models')

exports.addCommentCountToOne = (article, id) => {
    if (!article) return Promise.reject({ status: 404, msg: `${id} not found`})
        return Promise.all([article, Comment.count({belongs_to: id})]);
}

exports.addCommentCountToMany = (articles, placeHolder) => {
    placeHolder = [...articles];
    const commentCountsByArticle = articles.map(article => {
        return Comment.count({belongs_to: article._id}).lean()
    })
    return Promise.all(commentCountsByArticle)
    .then((commentCounts) => {
        const articlesWithCommentCounts = placeHolder.map((article, index) => {
            let commentCount = commentCounts[index];
            return {...article, commentCount}
        })
        return Promise.all(articlesWithCommentCounts)
    })
}

exports.addAuthorsAndTopics = (articles) => {
    const authors = []
    const topics = []
    for (let i = 0; i < articles.length; i++) {
        const authorIndex = authors.findIndex(author => author._id == articles[i].created_by._id)
        if (authorIndex === -1) authors.push({...articles[i].created_by, articleCount: 1, commentCount: articles[i].commentCount, votes: articles[i].votes})
        else {
            authors[authorIndex].articleCount ++
            authors[authorIndex].commentCount += articles[i].commentCount
            authors[authorIndex].votes += articles[i].votes;
        }
        const topicIndex = topics.findIndex(topic => topic.slug == articles[i].belongs_to)
        if (topicIndex === -1) topics.push({ slug: articles[i].belongs_to, articleCount: 1, commentCount: articles[i].commentCount, votes: articles[i].votes})
        else {
            topics[topicIndex].articleCount ++
            topics[topicIndex].commentCount += articles[i].commentCount
            topics[topicIndex].votes += articles[i].votes;
        }
    }
    return {authors, topics}
    }
