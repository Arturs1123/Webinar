class DeleteWebinarUseCase {
    constructor(
        webinarRepository,
    ) {
        this.webinarRepository = webinarRepository
    }

    async deleteWebinarById(params){
        return await this.webinarRepository.deleteWebinarById(params)
    }
}

module.exports = DeleteWebinarUseCase
