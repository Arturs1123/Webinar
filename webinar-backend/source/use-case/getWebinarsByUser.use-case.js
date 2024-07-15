class GetWebinarsByUserUseCase {
    constructor(
        webinarRepository,
    ) {
        this.webinarRepository = webinarRepository
    }

    async getWebinarsByUser(userId, filters){
        const chxWebinar = filters.chxWebinar
        const chxAutowebinar = filters.chxAutowebinar
        delete filters.chxWebinar
        delete filters.chxAutowebinar

        let allWebinars = []
        if (chxWebinar == 'true') {
            const webinars = await this.webinarRepository.getWebinarsByUserId(userId, filters)
            allWebinars.push(...webinars);
        }
        if (chxAutowebinar == 'true') {
            const broadcasts = await this.webinarRepository.getBroadcastsByUserId(userId, filters)
            allWebinars.push(...broadcasts);
        }    
        
        // if (!webinars.length) {
        //     throw new Error(JSON.stringify({
        //         status: 404,
        //         message: `Webinars with userId ${userId} not found`,
        //     }))
        // }

        return allWebinars
    }
}

module.exports = GetWebinarsByUserUseCase
