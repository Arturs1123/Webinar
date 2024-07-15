module.exports = (dto, ctx) => {
    return (req, res, next) => {
        const validateObj = req[ctx]

        if (!validateObj) {
            throw new Error(`Context object is missing: ctx=${ctx}`)
        }

        const result = dto.validate(validateObj)
        if (result.error) {
            return next(new Error(JSON.stringify(
                {
                    status: 400,
                    message: result.error.details.at(0).message.replace(/"/g, "'"),
                }
            )))
        }

        if (result.value) {
            req[ctx] = {
                ...req[ctx],
                ...result.value
            }
        }

        next()
    }
}
