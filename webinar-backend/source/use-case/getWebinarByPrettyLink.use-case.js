class GetWebinarByPrettyLinkUseCase {
    constructor(
        webinarRepository,
    ) {
        this.webinarRepository = webinarRepository
    }
    async getWebinarByPrettyLink(webinarPrettyLink) {
        const webinar = await this.webinarRepository.getWebinarByUrl(webinarPrettyLink)

        if (!webinar) {
            throw new Error(JSON.stringify({
                status: 404,
                message: `Webinar with pretty link ${webinarPrettyLink} not found`,
            }))
        }

        return webinar
    }
    async getBroadcastByPrettyLink(webinarPrettyLink) {
        const broadcast = await this.webinarRepository.getBroadcastByUrl(webinarPrettyLink)

        if (!broadcast) {
            throw new Error(JSON.stringify({
                status: 404,
                message: `Broadcast with pretty link ${webinarPrettyLink} not found`,
            }))
        }

        return broadcast
    }
}

module.exports = GetWebinarByPrettyLinkUseCase
