class UserRepository {
    constructor(mysqlDriver, logger) {
        this.mysqlDriver = mysqlDriver
        this.logger = logger
    }

    async saveUserRegData(userRegData){
        const res = await this.mysqlDriver.execute(`
        INSERT INTO other_user
            (name, email, phone)
        VALUES 
            (?, ?, ?);
        `, [userRegData.name, userRegData.email, userRegData.phone])
        return res[0]?.insertId
    }

    async getUserByLogin(login) {
        
        const res = await this.mysqlDriver.execute(`
        SELECT *
        FROM neearby.users
        WHERE login = ?;
        `, [login])
        return res[0]?.[0]
    }

    async getOtherUserByLogin(login) {
        const res = await this.mysqlDriver.execute(`
        SELECT *
        FROM other_user
        WHERE email = ?;
        `, [login])
        
        return res[0]?.[0]
    }

    async changeHideDates(userId, value) {
        await this.mysqlDriver.execute(`
        UPDATE neearby.users
        SET hideDates = ?
        WHERE id = ?;
        `, [value, userId])
    }

    async getHideDates(userId) {
        const res = await this.mysqlDriver.execute(`
        SELECT hideDates
        FROM neearby.users
        WHERE id = ?;
        `, [userId])

        return res[0]?.[0]?.hideDates
    }

    async getGhosteByName({
        name,
        webinarId
    }) {
        const res = await this.mysqlDriver.execute(`
        SELECT *
        FROM ghoste
        WHERE name = ?
        AND webinarId = ?;
        `, [name, webinarId])

        return res[0]?.[0]
    }

    async createGhoste({
       name,
       webinarId,
       translationId = null
    }) {
        await this.mysqlDriver.execute(`
        INSERT INTO ghoste
            (name, webinarId, translationId)
        VALUES 
            (?, ?, ?);
        `, [name, webinarId, translationId])
    }

    async getModeratorList() {
        const res = await this.mysqlDriver.execute(`
            SELECT *
            FROM neearby.users
            WHERE role != ?;
        `, [3])
        var data = res[0];
        var result = [];
        for (let i = 0; i < data.length; i++) {
            result[i] = {
                "id" : 0,
                "text" : ''
            };
            result[i].id = data[i].id;
            result[i].text = data[i].name
        }
        console.log(result)
        return result;
    }
}

module.exports = UserRepository
