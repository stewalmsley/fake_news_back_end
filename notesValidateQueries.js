

// const validateQuery = (queries, ...validQueries) => {
//     return validQueries.reduce((acc, validQuery) => {
//         if (queries[validQuery]) acc[validQuery] = queries[validQueries];
//         return acc;
//     }, {})
// }

// exports.getActors = (req, res, next) => {
//     const validQueries = validateQuery(req.query, 'gender')
//     Actor.find(validQueries)
//     .then(actors => {
//         res.status(200).send({ actors })
//     })
// }