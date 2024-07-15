const jwt = require('jsonwebtoken')

class CheckUserTokenUseCase {
    constructor(
        userRepository,
        jwtSecret,
    ) {
        this.userRepository = userRepository
        this.jwtSecret = jwtSecret
    }

    async checkUserToken(token) {
        if (!jwt.verify(token, this.jwtSecret)) {
            new Error(JSON.stringify({
                status: 400,
                message: `Invalid token`
            }))
        }

        const {login} = jwt.decode(token)
        const user = await this.userRepository.getUserByLogin(login)

        if (!user) {
            new Error(JSON.stringify({
                status: 404,
                message: `User with login ${loginData.login} not found`,
            }))
        }

        return {
            id: user.id,
            login: user.login,
            name: user.name,
            hideDates: user.hideDates,
        }
    }

    async checkGhost(login) {
        const user = await this.userRepository.getOtherUserByLogin(login)

        if (!user) {
            // new Error(JSON.stringify({
            //     status: 404,
            //     message: `User with login ${login} not found`,
            // }))
        }

        return {
            name: user.name,
        }
    }
}

module.exports = CheckUserTokenUseCase
