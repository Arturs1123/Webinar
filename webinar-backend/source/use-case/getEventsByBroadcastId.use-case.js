class GetEventsByBroadcastIdUseCase {
    constructor(
        broadcastRepository,
    ) {
        this.broadcastRepository = broadcastRepository
    }
    async getEventsByBroadcastId(broadcastId){
        const events = await this.broadcastRepository.getEventsByBroadcastId(broadcastId)
        if (!events) {
            throw new Error(JSON.stringify({
                status: 404,
                message: `Events with broadcastId ${broadcastId} not found`,
            }))
        }

        return events
    }
    async createAutowebinar(webinarId, duration, playTime) {
        const data = await this.broadcastRepository.createAutowebinarByWebinarId(webinarId, duration, playTime)
        if (!data) {
            throw new Error(JSON.stringify({
                status: 404,
                message: `Broadcast with webinarId ${webinarId} not found`,
            }))
        }

        return data
    }
    async updateAutowebinar(webinarId, url, duration, playTime) {
        const data = await this.broadcastRepository.updateAutowebinarByUrl(webinarId, url, duration, playTime)
        if (!data) {
            throw new Error(JSON.stringify({
                status: 404,
                message: `Broadcast with webinarId ${url} not found`,
            }))
        }

        return data
    }
}

module.exports = GetEventsByBroadcastIdUseCase
