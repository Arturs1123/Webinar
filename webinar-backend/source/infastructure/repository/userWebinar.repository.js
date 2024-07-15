class UserWebinarRepository {
    constructor(mysqlDriver, logger) {
        this.mysqlDriver = mysqlDriver
        this.logger = logger
    }

    async createUserWebinar(userWebinarData){
        await this.mysqlDriver.execute(`
        INSERT INTO moderate
            (userId, webinarId)
        VALUES 
            (?, ?);
        `, [userWebinarData.userId, userWebinarData.webinarId])
    }

    async getUserWebinarsByUserId(userId) {
        const res = await this.mysqlDriver.execute(`
        SELECT *
        FROM moderate
        WHERE userId = ?;
        `, [userId])

        return res[0]
    }

    async getUserWebinarsByWebinarId(webinarId) {
        const res = await this.mysqlDriver.execute(`
        SELECT *
        FROM moderate
        WHERE webinarId = ?;
        `, [webinarId])

        return res[0]
    }
}

module.exports = UserWebinarRepository
