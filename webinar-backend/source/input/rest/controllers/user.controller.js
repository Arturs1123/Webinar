const express = require('express')
const router = express.Router

class UserController {
    constructor(
        changeHideDatesUseCase,
        ghosteUseCase,
        authMiddleware,
    ) {
        this.path = '/users'
        this.router = router()
        this.changeHideDatesUseCase = changeHideDatesUseCase
        this.ghosteUseCase = ghosteUseCase
        this.authMiddleware = authMiddleware

    }

    initializeRoutes() {
        this.router.patch(
            '/:userId/change-hide-dates',
            this.authMiddleware,
            this.changeHideDates.bind(this),
        )
        this.router.get(
            '/:userId/hide-dates',
            this.authMiddleware,
            this.getHideDates.bind(this),
        )
        this.router.get(
            '/ghostes',
            this.getGhosteByName.bind(this)
        )
        this.router.post(
            '/ghostes',
            this.createGhoste.bind(this)
        )
        this.router.post(
            '/getModeratorList',
            this.getModeratorList.bind(this)
        )
    }

    async changeHideDates(req, res, next) {
        try {
            await this.changeHideDatesUseCase.changeHideDates(Number(req.params.userId), req.body.value)

            return res.status(201).end()
        } catch(err) {
            next(err)
        }
    }

    async getHideDates(req, res, next) {
        try {
            const hideDatesValue = await this.changeHideDatesUseCase.getHideDates(Number(req.params.userId))

            return res.status(200).send({
                hideDates: hideDatesValue,
            })
        } catch(err) {
            next(err)
        }
    }

    async getGhosteByName(req, res, next) {
        try {
            const ghoste = await this.ghosteUseCase.getGhosteByName({
                name: req.query.name,
                webinarId: Number(req.query.webinarId)
            })

            return res.status(200).send(ghoste)
        } catch(err) {
            next(err)
        }
    }

    async createGhoste(req, res, next) {
        try {
            await this.ghosteUseCase.createGhoste(req.body)

            return res.status(201).send()
        } catch(err) {
            next(err)
        }
    }

    async getModeratorList(req, res, next) {
        try {
            const result = await this.ghosteUseCase.getModeratorList()

            return res.status(200).send({
                data: result,
            })
        } catch(err) {
            next(err)
        }
    }
}

module.exports = UserController
