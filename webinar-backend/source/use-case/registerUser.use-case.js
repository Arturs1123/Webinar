const jwt = require('jsonwebtoken')

class RegisterUserUseCase {
    constructor(
        userRepository,
        jwtSecret,
        crypt,
    ) {
        this.userRepository = userRepository
        this.jwtSecret = jwtSecret
        this.crypt = crypt
    }
    async registration(regData){
        const candidate = await this.userRepository.getUserByLogin(regData.name)

        if (candidate) {
            throw new Error(JSON.stringify({
                status: 400,
                message: `User with name: ${regData.name} already exist`,
            }))
        }

        const insertId = await this.userRepository.saveUserRegData({
            name: regData.name,
            email: regData.email,
            phone: regData.phone,
        })

        return insertId
    }

    _createToken(tokenData, jwtSecret) {
        return jwt.sign({
            login: tokenData.login,
        }, jwtSecret)
    }
}

module.exports = RegisterUserUseCase
