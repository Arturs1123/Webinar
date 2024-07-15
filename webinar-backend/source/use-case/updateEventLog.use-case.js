class UpdateEventLogUseCase {
    constructor(
        broadcastRepository,
    ) {
        this.broadcastRepository = broadcastRepository
    }

    async moveSelectedEvent(data){
        return await this.broadcastRepository.moveSelectedEvent(data)
    }
}

module.exports = UpdateEventLogUseCase
