class UpdateWebinarUseCase {
    constructor(
        webinarRepository,
    ) {
        this.webinarRepository = webinarRepository
    }

    async updateWebinar(webinarData, isAutowebinar){
        if (webinarData.dateStart) {
            webinarData.dateStart = webinarData.dateStart.replace('T', ' ')
        }
        return await this.webinarRepository.updateWebinar(webinarData, isAutowebinar)
    }
}

module.exports = UpdateWebinarUseCase
