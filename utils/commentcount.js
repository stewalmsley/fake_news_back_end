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