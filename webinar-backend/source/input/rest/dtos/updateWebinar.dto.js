const Joi = require('joi')

module.exports = Joi.object({
    id: Joi.number().positive(),
    userId: Joi.number().positive().required(),
    title: Joi.string().max(140).required(),
    backgroundIn: Joi.string().allow(''),
    backgroundOut: Joi.string().allow(''),
    userName: Joi.string(),
    userDescription: Joi.string().allow('').allow(null),
    userAvatar: Joi.string().allow('').allow(null),
    userStatus: Joi.string().allow(''),
    redirectOut: Joi.string().regex(/^(http:\/\/|https:\/\/)/).allow(''),
    redirectLeave: Joi.string().regex(/^(http:\/\/|https:\/\/)/).allow(''),
    redirectLeaveEnteringPage: Joi.string().regex(/^(http:\/\/|https:\/\/)/).allow(''),
    buttonEnteringPage: Joi.string(),
    additionalLinkEnterRoom: Joi.string().regex(/^(http:\/\/|https:\/\/)/).allow(''),
    dateStart: Joi.string(),
    comment: Joi.string().allow(''),
    commentData: Joi.string().allow(''),
    url: Joi.string(),
    source: Joi.string().regex(/^https:\/\/(www.)*youtube.com/),
    status: Joi.valid(0, 1).default(0),
    isActive: Joi.valid(0, 1).default(1),
    banWords: Joi.string().allow(''),
    moderators: Joi.array().items(Joi.string(), Joi.number()),
    playback: Joi.valid('Y', 'N', '').allow(null),
    playbackFrequency: Joi.string().allow(''),
    backgroundImageStandard: Joi.string().allow('').allow(null),
    backgroundImageDesign: Joi.string().allow('').allow(null),
    backgroundImageInside: Joi.string().allow('').allow(null),
    viewersQuantityStart: Joi.number().positive().allow(0).allow(null),
    viewersQuantityMiddle: Joi.number().positive().allow(0).allow(null),
    viewersQuantityEnd: Joi.number().positive().allow(0).allow(null),
    links: Joi.string().allow('').allow(null),
    blockChatBeforeStart: Joi.valid('Y', 'N', '').allow(null),
    addLinkNotificationSound: Joi.valid('Y', 'N', '').allow(null),
    screensaverPhoto: Joi.string().allow('').allow(null),
    screensaverAudio: Joi.string().allow('').allow(null),
    screensaverVideo: Joi.string().allow('').allow(null),
    autowebinarId: Joi.valid(0, 1).allow(null),
    isAutowebinar: Joi.valid(0, 1).allow(null),
    dateCreated: Joi.string(),
    userCount: Joi.number().integer().default(0),
}).label('UpdateWebinarDto')
