const express = require('express')
const cors = require('cors')
const errorMiddleware = require('./middlewares/error.middleware')

class RestProvider {
    constructor(controllers) {
        this.provider = express()
        this.controllers = controllers
    }

    start() {
        this.provider.use(cors())
        this.provider.use(
            express.urlencoded({
                limit: '50mb',
                extended: true,
            }),
        )
        this.provider.use(
            express.json({
                limit: '50mb',
            }),
        )

        for (const controller of this.controllers) {
            controller.initializeRoutes()
            const fullPath = controller.path
            this.provider.use(fullPath, controller.router)
        }

        this.provider.use('/storage', express.static(
            `${process.cwd()}/storage`,
        ))

        this.provider.use(errorMiddleware)

        this.provider.listen(process.env.HTTP_PORT, () => {
            console.log(`Server started on port ${process.env.HTTP_PORT}`)
        })
    }
}

module.exports = RestProvider
