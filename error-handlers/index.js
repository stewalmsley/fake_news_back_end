exports.handle404 = ({status, msg}, req, res, next) => {
    if (status === 404) res.status(status).send({ msg });
    else (next({ status, msg }))
}

exports.handle400 = ({status, msg}, req, res, next) => {
    if (status === 400) res.status(status).send({ msg });
    else (next({ status, msg }))
}

exports.handle500 = (err, req, res, next) => {
    // do some error logging if it was for a real application
    console.error(err)
    res.status(500).send({ msg : 'internal server error' });
}