const moment = require('moment')
const crypto = require('crypto');

moment.defaultFormat = 'YYYY-MM-DD HH:mm:ss'

exports.currentTime = (format) => {
    return moment().format(format)
}

exports.delay = async (ms = 1_000) => {
    return new Promise(r => setTimeout(r, ms));
}

exports.getRandomSymbols = (length = 10) => {
    return crypto.randomBytes(length).toString('hex');
}
