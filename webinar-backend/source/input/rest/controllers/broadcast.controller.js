const express = require('express')
const router = express.Router
const validate = require('../middlewares/validate.middleware')
const addEventDto = require('../dtos/addEvent.dto')
// const updateWebinarDto = require('../dtos/updateWebinar.dto')

class BroadcastController {
    constructor(
        getEventsByBroadcastIdUseCase,
        getBroadcastByUrlUseCase,
        deleteEventLogUseCase,
        updateEventLogUseCase,
        addEventLogUseCase,
        importDataUseCase,
        authMiddleware,
    ) {
        this.path = '/broadcast'
        this.router = router()

        this.getEventsByBroadcastIdUseCase = getEventsByBroadcastIdUseCase
        this.getBroadcastByUrlUseCase = getBroadcastByUrlUseCase
        this.deleteEventLogUseCase = deleteEventLogUseCase
        this.updateEventLogUseCase = updateEventLogUseCase
        this.addEventLogUseCase = addEventLogUseCase
        this.addEventLogUseCase = addEventLogUseCase
        this.importDataUseCase = importDataUseCase

        this.authMiddleware = authMiddleware
    }

    initializeRoutes() {
        this.router.post(
            '/',
            this.authMiddleware,
            validate(addEventDto, 'body'), this.addEventLog.bind(this), //  validate(createWebinarDto, 'body')
        )
        this.router.get('/getEvents', this.getEventsByBroadcastId.bind(this))
        this.router.get('/getBroadcastByCustomUrl', this.getBroadcastByCustomUrl.bind(this))
        this.router.post('/createAutowebinar', this.createAutowebinar.bind(this))
        this.router.post('/updateAutowebinar', this.updateAutowebinar.bind(this))
        this.router.post('/mutiple', this.deleteMutipleEvent.bind(this))
        this.router.post('/updateBroadcastId', this.updateBroadcastId.bind(this))
        this.router.post('/import', this.importData.bind(this))
        this.router.post('/move', this.moveSelectedEvent.bind(this))
        this.router.post('/all', this.deleteAll.bind(this))
        this.router.delete(
            '/:eventLogId',
            this.authMiddleware,
            this.deleteEventRow.bind(this),
        )
    }

    async getEventsByBroadcastId(req, res, next) {
        try {
            const events = await this.getEventsByBroadcastIdUseCase.getEventsByBroadcastId(req.query.broadcastId)
            return res.status(200).send(events)
        } catch(err) {
            next(err)
        }
    }
    
    async getBroadcastByCustomUrl(req, res, next) {
        try {
            const broadcast = await this.getBroadcastByUrlUseCase.getBroadcastByUrl(req.query.url)
            return res.status(200).send(broadcast)
        } catch(err) {
            next(err)
        }
    }

    async deleteEventRow(req, res, next) {
        try {
            const affectedRow = await this.deleteEventLogUseCase.deleteEventLog(false, req.params.eventLogId)
            return res.status(200).send({
                deletedRow: affectedRow
            })
        } catch(err) {
            next(err)
        }
    }

    async createAutowebinar(req, res, next) {
        const webinarId = req.body.webinarId
        const duration = req.body.duration
        const playTime = req.body.playTime
        try {
            const data = await this.getEventsByBroadcastIdUseCase.createAutowebinar(webinarId, duration, playTime)
            return res.status(200).send({
                data: data
            })
        } catch(err) {
            next(err)
        }
    }

    async updateAutowebinar(req, res, next) {
        const webinarId = req.body.webinarId
        const url = req.body.url
        const duration = req.body.duration
        const playTime = req.body.playTime
        try {
            const data = await this.getEventsByBroadcastIdUseCase.updateAutowebinar(webinarId, url, duration, playTime)
            return res.status(200).send({
                data: data
            })
        } catch(err) {
            next(err)
        }
    }

    async deleteMutipleEvent(req, res, next) {
        const strIds = req.body.toString()
        try {
            const affectedRow = await this.deleteEventLogUseCase.deleteEventLog(true, strIds)
            return res.status(200).send({
                deletedRow: affectedRow
            })
        } catch(err) {
            next(err)
        }
    }

    async importData(req, res, next) {
        try {
            const nImportData = await this.importDataUseCase.importData(req.body)
            const events = await this.getEventsByBroadcastIdUseCase.getEventsByBroadcastId(req.body.broadcastId)
            return res.status(200).send(events)
        } catch(err) {
            next(err)
        }
    }

    async moveSelectedEvent(req, res, next) {
        try {
            const affectedRow = await this.updateEventLogUseCase.moveSelectedEvent(req.body)
            const events = await this.getEventsByBroadcastIdUseCase.getEventsByBroadcastId(req.body.broadcastId)
            return res.status(200).send(events)
        } catch(err) {
            next(err)
        }
    }

    async deleteAll(req, res, next) {
        const broadcastId = req.body.broadcastId
        try {
            const affectedRow = await this.deleteEventLogUseCase.deleteAll(broadcastId)
            return res.status(200).send({
                deletedRow: affectedRow
            })
        } catch(err) {
            next(err)
        }
    }

    async addEventLog(req, res, next) {
        try {
            let data = req.body
            const isUpdate = data.isUpdate
            delete data.isUpdate
            if (isUpdate === true) {
                const affectedRow = await this.deleteEventLogUseCase.deleteEventLog(false, data.logId)
            }
            const insertId = await this.addEventLogUseCase.addEventLog(data)
            const events = await this.getEventsByBroadcastIdUseCase.getEventsByBroadcastId(data.broadcastId)
            return res.status(200).send(events)
        } catch(err) {
            next(err)
        }
    }

    async updateBroadcastId(req, res, next) {
        const broadcastId = req.body.broadcastId
        try {
            const result = await this.deleteEventLogUseCase.updateBroadcastId(broadcastId)
            return res.status(200).send({
                result: result
            })
        } catch(err) {
            next(err)
        }
    }    
}

module.exports = BroadcastController