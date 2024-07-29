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
        var state = 3
        var url = []
        let filter = []
        if (filters.url !== '' && filters.url.includes('/')) {
            url = filters.url.split('/')
            if (url[url.length - 2] === 'w') {
                state = 1
            } else if (url[url.length - 2] === 'a') {
                state = 2
            }
            filters.url = url[url.length - 1]
        } else {
            filters.url = ''
        }
        console.log(state)
        let allWebinars = []
        if (chxWebinar == 'true') {
            filter.title = filters.title
            if (state === 2) {
                filter.url = 'http:/'                
            } else {
                filter.url = filters.url
            }
            console.log(filter)
            const webinars = await this.webinarRepository.getWebinarsByUserId(userId, filter)
            allWebinars.push(...webinars);
        }
        if (chxAutowebinar == 'true') {
            filter.title = filters.title
            if (state === 1) {
                filter.url = 'http:/'                
            } else {
                filter.url = filters.url
            }
            const broadcasts = await this.webinarRepository.getBroadcastsByUserId(userId, filter)
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
