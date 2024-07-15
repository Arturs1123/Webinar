const consoleLogger = require('./console.logger')
const pinoLogger = require('./pino.logger')

module.exports.create = (strategy, name, options) => {
    let logger
    switch (strategy) {
        case 'pino': logger = pinoLogger.create(name, options); break
        case 'console': logger = consoleLogger.create(name, options); break
        default: logger = pinoLogger.create(name, options); break
    }

    return logger
}
