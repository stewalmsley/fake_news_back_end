exports.createRef = (data, docs, keyName) => {
   return data.reduce((refs, datum, i) => {
        refs[datum[keyName]] = docs[i]._id;
        return refs;
    }, {})
}

exports.formatArticleData = (articleData, userRef) => {
    return articleData.map(article => {
        const belongs_to = article.topic;
        const created_by = userRef[article.created_by];
        return {...article, belongs_to, created_by};
    })
}

exports.formatCommentData = (commentData, userRef, articleRef) => {
    return commentData.map(comment => {
        const created_by = userRef[comment.created_by];
        const belongs_to = articleRef[comment.belongs_to];
        return {...comment, belongs_to, created_by};
    })
}



