function errorMiddleware(
    err,
    req,
    res,
    next,
) {
    let errObj = null
    try {
        errObj = JSON.parse(err.message)
    } catch(parseErr) {
        console.log(parseErr)
        console.log(err)
    }

    const status = errObj?.status || 500;
    const message = errObj?.message || 'INTERNAL_SERVER_ERROR';

    return res.status(status).send({
        status,
        message,
    });
}

module.exports = errorMiddleware
