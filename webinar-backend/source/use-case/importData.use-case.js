class ImportDataUseCase {
    constructor(
        broadcastRepository,
    ) {
        this.broadcastRepository = broadcastRepository
    }
    async importData(data){
        return await this.broadcastRepository.importData(data)
    }
}

module.exports = ImportDataUseCase
