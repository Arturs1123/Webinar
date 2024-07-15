const path = require("path")

require("dotenv").config();

module.exports = {
    LOGGER: process.env.LOGGER,
    HTTP: {
        PORT: process.env.HTTP_PORT,
        HOST: process.env.HTTP_HOST,
    },
    MYSQL: {
        DATABASE: process.env.MYSQL_DATABASE,
        HOST: process.env.MYSQL_HOST,
        USER: process.env.MYSQL_USER,
        PASSWORD: process.env.MYSQL_PASSWORD
    },
    STORAGE: {
        FILE_NAME_LENGTH: Number(process.env.STORAGE_FILE_NAME_LENGTH),
        PATH: process.env.ABSOLUTE_PATH_TO_STORAGE,
    },
    CRON: {
        tasks: {
            broadcastsInterval: {
                expression: process.env.BROADCAST_INTERVAL_EXPRESSION,
                defaultExpression: '*/30 * * * * *',
                name: 'broadcastsInterval',
                startNow: false,
            },
        }
    },
}
