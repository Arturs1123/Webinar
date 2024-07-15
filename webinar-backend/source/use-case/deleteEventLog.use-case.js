class DeleteEventLogUseCase {
    constructor(
        broadcastRepository,
    ) {
        this.broadcastRepository = broadcastRepository
    }
    async deleteEventLog(isMutiple, eventLogId){
        let events
        if (isMutiple) {
            console.log('isMulti')
            events = await this.broadcastRepository.deleteMutipleEvent(eventLogId)
        } else { 
            events = await this.broadcastRepository.deleteEventLog(eventLogId)
        }
        if (!events) {
            throw new Error(JSON.stringify({
                status: 404,
                message: `Events with event.log_id ${eventLogId} not found`,
            }))
        }

        return events
    }
    async deleteAll(broadcastId){
        let affectedRow = await this.broadcastRepository.deleteAll(broadcastId)
        if (!affectedRow) {
            affectedRow = 0
            // throw new Error(JSON.stringify({
            //     status: 404,
            //     message: `Events with event.broadcastId ${broadcastId} not found`,
            // }))
        }

        return affectedRow
    }
    async updateBroadcastId(broadcastId){
        let affectedRow = await this.broadcastRepository.updateBroadcastId(broadcastId)
        if (!affectedRow) {
            affectedRow = 0
            // throw new Error(JSON.stringify({
            //     status: 404,
            //     message: `Events with event.broadcastId ${broadcastId} not found`,
            // }))
        }

        return affectedRow
    }
}

module.exports = DeleteEventLogUseCase
