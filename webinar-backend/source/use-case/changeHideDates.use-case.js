class ChangeHideDatesUseCase {
    constructor(
        userRepository,
    ) {
        this.userRepository = userRepository
    }
    async changeHideDates(userId, value){
        await this.userRepository.changeHideDates(userId, value)
    }

    async getHideDates(userId) {
        return await this.userRepository.getHideDates(userId)
    }
}

module.exports = ChangeHideDatesUseCase
