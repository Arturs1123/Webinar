const express = require('express')
const router = express.Router

class AuthController {
    constructor(
        registerUserUseCase,
        loginUserUseCase,
        checkUserTokenUseCase,
    ) {
        this.path = '/auth'
        this.router = router()
        this.registerUserUseCase = registerUserUseCase
        this.loginUserUseCase = loginUserUseCase
        this.checkUserTokenUseCase = checkUserTokenUseCase
    }

    initializeRoutes() {
        this.router.post('/registration', this.registration.bind(this))
        this.router.post('/login', this.login.bind(this))
        this.router.post('/check-user-token', this.checkUserToken.bind(this))
    }

    async registration(req, res, next) {
        try {
            const insertId = await this.registerUserUseCase.registration(req.body)

            return res.status(201).send({
                id: insertId
            })
        } catch(err) {
            next(err)
        }
    }

    async login(req, res, next) {
        try {
            const token = await this.loginUserUseCase.login(req.body)

            return res.status(201).send({
                token: token
            })
        } catch(err) {
            console.log(err)
            next(err)
        }
    }

    async checkUserToken(req, res, next) {
        try {
            const userData = await this.checkUserTokenUseCase.checkUserToken(req.body.token)

            return res.status(201).send(userData)
        } catch(err) {
            next(err)
        }
    }
}

module.exports = AuthController
