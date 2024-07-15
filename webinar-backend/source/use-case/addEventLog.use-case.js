class addEventLogUseCase {
    constructor(
        broadcastRepository,
    ) {
        this.broadcastRepository = broadcastRepository
    }
    async addEventLog(data){
        const insertId = await this.broadcastRepository.addEventLog(data)
        if (!insertId) {
            throw new Error(JSON.stringify({
                status: 404,
                message: `Events with event_log data not found`,
            }))
        }

        return insertId
    }
}

module.exports = addEventLogUseCase
