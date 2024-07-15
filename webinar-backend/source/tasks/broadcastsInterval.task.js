const {all} = require("express/lib/application");
const moment = require("moment-timezone");
const CronJobTask = require("../infastructure/cron/task");

module.exports = class BroadcastsIntervalTask extends CronJobTask {
    constructor(
        cronConfig,
        logger,
        webinarRepository,
        broadcastRepository,
    ) {
        super(cronConfig, logger)

        this.webinarRepository = webinarRepository
        this.broadcastRepository = broadcastRepository
        this.playbackIntervals = {
            '1min': 60_000,
            '5min': 300_000,
            '10min': 600_000,
            '30min': 1_800_000,
            '1hour': 3_600_000,
            '6hour': 21_600_000,
            '12hour': 43_200_000,
            '24hour': 86_400_000,
        }

        if (cronConfig.startNow) {
            this._logger.info(`Init ${cronConfig.name} task`)
            this.init();
        }
    }

    async execute() {
        const allWebinars = await this.webinarRepository.getAllWebinars()

        if (allWebinars && Array.isArray(allWebinars) && allWebinars.length) {
            for (const webinar of allWebinars) {
                if (webinar.autowebinar) {
                    if (webinar.status === 'Включен') {
                        this._logger.info(`Found enabled autowebinar with name ${webinar.url}`)
                        const currentTimestamp = Number(moment().format('x'))

                        if (
                            webinar.lastTimeViewer !== null
                            && currentTimestamp - webinar.lastTimeViewer >= this.playbackIntervals['24hour'] * 5
                        ) {
                            await this.webinarRepository.updateWebinar({
                                id: webinar.id,
                                status: 'Выключен',
                            })
                            webinar.status = 'Выключен'

                        } else {
                            let broadcasts = await this.broadcastRepository.getBroadcastsByWebinarId(webinar.id)
                            for (const [idx, broadcast] of Object.entries(broadcasts)) {
                                const broadcastTimestamp = Number(moment(broadcast.dateStart).format('x'))

                                if (
                                    webinar.duration
                                    && currentTimestamp > (broadcastTimestamp + webinar.duration)
                                ) {
                                    this.broadcastRepository.deleteBroadcastById(broadcast.id)
                                    broadcasts[idx] = null
                                }
                            }

                            broadcasts = broadcasts.filter((broadcast) => broadcast !== null)

                            if (broadcasts.length) {
                                broadcasts.sort((a, b) => Number(moment(b.dateStart).format('x')) - Number(moment(a.dateStart).format('x')))

                                const timeStartLastBroadcast = Number(moment(broadcasts[0].dateStart).format('x'))

                                if (timeStartLastBroadcast > currentTimestamp) {
                                    continue
                                }

                                const elapsedTimeAfterStartLastBroadcast = currentTimestamp - timeStartLastBroadcast

                                if (this.playbackIntervals[broadcasts.playbackFrequency] - elapsedTimeAfterStartLastBroadcast >= 60_000) {
                                    continue
                                }
                            }
                            const timestampForNewBroadcast = Number(moment(webinar.dateStart).format('x'))
                                + Math.floor(
                                    (currentTimestamp - Number(moment(webinar.dateStart).format('x')))
                                    / this.playbackIntervals[webinar.playbackFrequency]
                                ) * this.playbackIntervals[webinar.playbackFrequency]
                                + this.playbackIntervals[webinar.playbackFrequency]

                            this._logger.info('Create new broadcast')
                            console.log(new Date(timestampForNewBroadcast))
                            const {
                                id,
                                autowebinar,
                                lastTimeViewer,
                                ...dataForNewBroadcast
                            } = webinar
                            const newBroadcast = await this.broadcastRepository.createBroadcast({
                                ...dataForNewBroadcast,
                                autowebinarId: webinar.id,
                                dateStart: moment(timestampForNewBroadcast)
                                    .tz('Europe/Moscow')
                                    .format('YYYY-MM-DD HH:mm')
                            })
                        }

                    }

                    if (webinar.status === 'Выключен') {
                        this.webinarRepository.deleteBroadcastsByWebinarId(webinar.id)
                    }
                } else {

                }
            }
        }
    }
}
