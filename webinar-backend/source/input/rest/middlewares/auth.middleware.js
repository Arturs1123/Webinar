const jwt = require('jsonwebtoken')

const authMiddleware = async (userRepository) => {
    return async (req, res, next) => {
        if (req.headers?.authorization) {
            const secret = process.env.JWT_SECRET;
            try {
                const verificationResponse = jwt.verify(
                    req.headers.authorization,
                    secret,
                );
                const login = verificationResponse.login;
                const user = await userRepository.getUserByLogin(login);
                
                if (user) {
                    req.user = user;
                    next();
                } else {
                    next(
                        new Error(JSON.stringify({
                            status: 400,
                            message: 'Wrong authentication token',
                        }))
                    )
                }
            } catch (error) {
                next(
                    new Error(JSON.stringify({
                        status: 400,
                        message: 'Wrong authentication token',
                    }))
                )
            }
        } else {
            next(
                new Error(JSON.stringify({
                    status: 400,
                    message: 'Authentication token missing',
                }))
            )
        }
    }
}

module.exports = authMiddleware;
