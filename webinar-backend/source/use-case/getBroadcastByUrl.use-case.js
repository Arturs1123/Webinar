class GetBroadcastByUrl {
    constructor(
        broadcastRepository,
    ) {
        this.broadcastRepository = broadcastRepository
    }

    async getBroadcastByUrl(url) {
        const broadcast = await this.broadcastRepository.getBroadcastByCustomUrl(url);
        return broadcast;
    }
}

module.exports = GetBroadcastByUrl
