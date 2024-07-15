const { isValidCron } = require('cron-validator')
const moment = require('moment')
const { Moment } = require('moment')
const { ToadScheduler, AsyncTask, CronJob } = require('toad-scheduler')

module.exports = class CronJobTask {
    constructor(cronConfig, logger) {
        this._isTaskRunning = false
        this._logger = logger

        if (
            isValidCron(cronConfig.expression, {
                seconds: true,
            })
        ) {
            this._cronExpression = cronConfig.expression
        } else if (
            cronConfig?.defaultExpression &&
            isValidCron(cronConfig.defaultExpression, {
                seconds: true,
            })
        ) {
            this._cronExpression = cronConfig.defaultExpression
        } else {
            throw new Error('Incorrect cron expression')
        }

        this._name = cronConfig.name
        this._scheduler = new ToadScheduler()
    }

    async init() {
        const task = new AsyncTask(
            this._name,
            async () => {
                if (!this._isTaskRunning) {
                    this._onStart()
                    await this.execute()
                    this._onComplete()
                }
            },
            (err) => {
                this._logger.error(err)
            },
        )

        this._cronJob = new CronJob(
            {
                cronExpression: this._cronExpression,
            },
            task,
            {
                preventOverrun: true,
            },
        )

        this._scheduler.addCronJob(this._cronJob)
    }

    start() {
        this._scheduler.startById(this._cronJob.id)
    }

    stop() {
        this._scheduler.stopById(this._cronJob.id)
    }

    _onStart() {
        this._lastStartTime = moment()
        this._logger.info(
            `Cron-task ${this._name} is running ${this._lastStartTime}`,
        )
        this._isTaskRunning = true
    }

    _onComplete() {
        const elapsedTime = moment
            .utc(moment().diff(this._lastStartTime))
            .format('HH:mm:ss')
        this._logger.info(
            `Cron-task ${this._name} completed. Elapsed time: ${elapsedTime}`,
        )
        this._isTaskRunning = false
    }
}
