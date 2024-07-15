class GhosteUseCase {
    constructor(
        userRepository
    ) {
        this.userRepository = userRepository
    }

    async getGhosteByName({
        name,
        webinarId,
    }) {
        return await this.userRepository.getGhosteByName({
            name,
            webinarId,
        })
    }

    async createGhoste({
        name,
        webinarId,
        translationId = null
    }) {
        return await this.userRepository.createGhoste({
            name,
            webinarId,
            translationId
        })
    }
}

module.exports = GhosteUseCase
