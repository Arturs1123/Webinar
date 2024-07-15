const express = require('express')
const router = express.Router
const validate = require('../middlewares/validate.middleware')
const createWebinarDto = require('../dtos/createWebinar.dto')
const updateWebinarDto = require('../dtos/updateWebinar.dto')

class WebinarsController {
    constructor(
        createWebinarUseCase,
        updateWebinarUseCase,
        getWebinarsByUserUseCase,
        getWebinarByIdUseCase,
        getWebinarByPrettyLinkUseCase,
        deleteWebinarUseCase,
        authMiddleware,
    ) {
        this.path = '/webinars'
        this.router = router()

        this.createWebinarUseCase = createWebinarUseCase
        this.updateWebinarUseCase = updateWebinarUseCase
        this.getWebinarsByUserUseCase = getWebinarsByUserUseCase
        this.getWebinarByIdUseCase = getWebinarByIdUseCase
        this.getWebinarByPrettyLinkUseCase = getWebinarByPrettyLinkUseCase
        this.deleteWebinarUseCase = deleteWebinarUseCase
        this.authMiddleware = authMiddleware
    }

    initializeRoutes() {
        this.router.post(
            '/',
            this.authMiddleware,
            validate(createWebinarDto, 'body'), this.createWebinar.bind(this),
        )
        this.router.patch(
            '/',
            this.authMiddleware,
            validate(updateWebinarDto, 'body'), this.updateWebinar.bind(this),
        )
        // this.router.delete(
        //     '/:webinarId',
        //     this.authMiddleware,
        //     this.deleteWebinar.bind(this),
        // )
        this.router.get('/', this.getWebinarsByUser.bind(this))
        this.router.get('/delete', this.deleteWebinar.bind(this))
        this.router.get('/prettyLink', this.getWebinarByPrettyLink.bind(this))
        this.router.get('/:webinarId', this.getWebinarById.bind(this))
    }

    async createWebinar(req, res, next) {
        try {
            const insertId = await this.createWebinarUseCase.createWebinar(req.body)

            return res.status(200).send({
                insertId: insertId
            })
        } catch(err) {
            next(err)
        }
    }

    async updateWebinar(req, res, next) {
        try {
            let data = req.body
            const isAutowebinar = data.isAutowebinar
            delete data.isAutowebinar
            const updatedWebinar = await this.updateWebinarUseCase.updateWebinar(req.body, isAutowebinar)

            return res.status(201).send(updatedWebinar)
        } catch(err) {
            console.log(err)
            next(err)
        }
    }

    async getWebinarsByUser(req, res, next) {
        try {
            const { userId, ...filters } = req.query
            const webinars = await this.getWebinarsByUserUseCase.getWebinarsByUser(userId, filters)

            return res.status(200).send(webinars)
        } catch(err) {
            next(err)
        }
    }

    async getWebinarById(req, res, next) {
        try {
            const webinar = await this.getWebinarByIdUseCase.getWebinarById(req.query)

            return res.status(200).send(webinar)
        } catch(err) {
            next(err)
        }
    }

    async getWebinarByPrettyLink(req, res, next) {
        try {
            const isAutowebinar = req.query.isAutowebinar
            let webinar = null
            if (isAutowebinar == '0') {
                webinar = await this.getWebinarByPrettyLinkUseCase.getWebinarByPrettyLink(req.query.prettyLink)
            } else {
                webinar = await this.getWebinarByPrettyLinkUseCase.getBroadcastByPrettyLink(req.query.prettyLink)
            }

            return res.status(200).send(webinar)
        } catch(err) {
            console.log(err)
            return res.status(200).send(null)
        }
    }

    async deleteWebinar(req, res, next) {
        console.log(req.query)
        try {
            const affectedRows = await this.deleteWebinarUseCase.deleteWebinarById(req.query)

            return res.status(200).send({
                deletedRows: affectedRows
            })
        } catch(err) {
            next(err)
        }
    }
}

module.exports = WebinarsController
