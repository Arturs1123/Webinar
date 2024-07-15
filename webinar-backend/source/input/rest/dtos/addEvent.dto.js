const Joi = require('joi')

module.exports = Joi.object({
    logId: Joi.number().allow(null),
    broadcastId: Joi.number().allow(null),
    actionType: Joi.string().allow('').allow(null),
    timeshift: Joi.number().positive().allow(0).allow(null),
    data: Joi.string().allow('').allow(null),
    username: Joi.string().allow('').allow(null),
    message: Joi.string().allow('').allow(null),
    role: Joi.string().allow('').allow(null),
    note: Joi.string().allow('').allow(null),
    isUpdate: Joi.boolean().allow(null),
}).label('AddEventDto')
