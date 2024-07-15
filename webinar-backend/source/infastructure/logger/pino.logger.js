const pino = require('pino')
const { wrapLogger, addContext } = require('pino-context')

module.exports.create = (name, options) => {
    const config = {
        stream: {
            dest: process.stdout,
            sync: true
        },
        base: {},
        timestamp: () => `,"time":"${options?.time() || new Date(Date.now()).toISOString()}"`,
        name,
        formatters: {
            level (label) {
                return { level: label }
            }
        }
    }

    if (process.env.NODE_ENV === 'development') {
        config.transport = {
            target: 'pino-pretty',
            options: {
                ignore: 'name',
                messageFormat: '{name}: {msg}',
                translateTime: 'SYS:standard'
            }
        }
    }

    const logger = wrapLogger(pino(config))

    logger.addContext = (context) => {
        for (const key in context) {
            addContext(key, context[key])
        }
    }

    return logger
}
