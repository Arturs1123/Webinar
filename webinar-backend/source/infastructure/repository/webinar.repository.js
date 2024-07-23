class WebinarRepository {
    constructor(mysqlDriver, logger) {
        this.mysqlDriver = mysqlDriver
        this.logger = logger
    }

    async createWebinar(webinarData){
        if (webinarData.moderators && webinarData.moderators.length) {
            await this.insertNewModerators(webinarData.moderators, webinarData.id, 0)
        }
        delete webinarData.moderators

        const res = await this.mysqlDriver.execute(`
        INSERT INTO webinar
            (${Object.keys(webinarData).join(', ')})
        VALUES 
            (${Object.entries(webinarData)
                .map(([k, v]) => k.startsWith('date') ? `STR_TO_DATE(?, '%Y-%m-%d %H:%i')` : `?`)
                .join(', ')
            });
        `, Object.values(webinarData))

        return res[0]?.insertId
    }

    async updateWebinar(webinarData, isAutowebinar) {
        let tbl = ''
        if (isAutowebinar == '0') {
            tbl = 'webinar'
        } else {
            tbl = 'broadcast'
        }
        console.log(webinarData.moderators)
        if (webinarData.moderators && webinarData.moderators.length) {
            
            await this.insertNewModerators(webinarData.moderators, webinarData.id, isAutowebinar)
        }
        delete webinarData.moderators

        const deleteScreensavers = {
            screensaverPhoto: false,
            screensaverAudio: false,
            screensaverVideo: false,
        }

        const deleteScreensaversKeys = Object.keys(deleteScreensavers)

        for (const key of Object.keys(webinarData)) {
            if (deleteScreensaversKeys.includes(key) && webinarData[key]) {
                for (const deleteKey of deleteScreensaversKeys) {
                    if (deleteKey !== key) {
                        deleteScreensavers[deleteKey] = true
                    }
                }
                break;
            }
        }

        if (Object.values(deleteScreensavers).some((value) => value)) {
            await this.mysqlDriver.execute(`
            UPDATE ${tbl}
            SET ${deleteScreensaversKeys.map((deleteKey) => {
                    if (deleteScreensavers[deleteKey]) {
                        return `${deleteKey} = ''`
                    }
                }).filter((key) => key).join(', ')}
            WHERE id = ?;
            `, [webinarData.id])
        }

        await this.mysqlDriver.execute(`
        UPDATE ${tbl}
        SET ${Object.keys(webinarData)
            .filter((k) => k !== 'id')
            .map((k) => k.startsWith('date') ? `${k} = STR_TO_DATE(?, '%Y-%m-%d %H:%i')` : `${k} = ?`)
            .join(', ')
        }
        WHERE id = ?;
        `, [
            ...Object.values(webinarData)
                // .map((v) => v.includes('date') ? `STR_TO_DATE('${v}', '%Y-%d-%m %H:%i')` : v)
                .slice(1),
            webinarData.id
        ])
        const params = {
            id: webinarData.id,
            isAutowebinar: isAutowebinar
        }

        return await this.getWebinarById(params)
    }

    async getWebinarsByUserId(userId, filters) {
        const res = await this.mysqlDriver.execute(`
        SELECT *
        FROM webinar
        WHERE userId = ${userId}
        ${
            filters && Object.values(filters).some((value) => value) ? 
                `AND (${
                    Object.entries(filters)
                    .filter(([key, value]) => value)
                    .map(([key, value]) => `${key} LIKE '%${value}%'`)
                    .join(', OR ')})` : 
                ''
        }
        `)

        return res[0]
    }

    async getBroadcastsByUserId(userId, filters) {
        const res = await this.mysqlDriver.execute(`
        SELECT *
        FROM broadcast
        WHERE userId = ${userId}
        ${
            filters && Object.values(filters).some((value) => value) ? 
                `AND (${
                    Object.entries(filters)
                    .filter(([key, value]) => value)
                    .map(([key, value]) => `${key} LIKE '%${value}%'`)
                    .join(', OR ')})` : 
                ''
        }
        `)
        return res[0]
    }

    async getWebinarById(params) {
        const id = params.id
        let tbl = ''

        if (params.isAutowebinar == '0') {
            tbl = 'webinar'
        } else {
            tbl = 'broadcast'
        }
        const res = await this.mysqlDriver.execute(`
            SELECT *
            FROM ${tbl}
            WHERE id = ${id}
            `)
        return res[0]?.[0]
    }

    async getWebinarByUrl(webinarUrl) {
        try {
            const res = await this.mysqlDriver.execute(`
            SELECT *
            FROM webinar
            WHERE url = '${webinarUrl}'
            `)

            const res2 = await this.mysqlDriver.execute(`
            SELECT *
            FROM moderate
            WHERE webinarId = '${res[0]?.[0].id}'
            `)

            const res3 = await this.mysqlDriver.execute(`
            SELECT *
            FROM chat
            WHERE webinarId = '${res[0]?.[0].id}'
            `)

            const res4 = await this.mysqlDriver.execute(`
            SELECT *
            FROM ban
            WHERE webinarId = '${res[0]?.[0].id}'
            `)

            res[0][0]['moderators'] = res2[0].map(res => res.userId)
            res[0][0]['chat'] = res3[0]
            res[0][0]['links'] = (res[0][0]['links']) ? JSON.parse(res[0][0]['links']) : null
            res[0][0]['ban'] = res4[0]

            return res[0]?.[0]
        } catch (error) {
            return null
        }
    }

    async getBroadcastByUrl(broadcastUrl) {
        const res = await this.mysqlDriver.execute(`
        SELECT *
        FROM broadcast
        WHERE url = '${broadcastUrl}'
        `)

        // const res2 = await this.mysqlDriver.execute(`
        // SELECT *
        // FROM moderate
        // WHERE broadcastId = '${res[0]?.[0].id}'
        // `)

        // const res3 = await this.mysqlDriver.execute(`
        // SELECT logId as id, message as msg, data, username, timeshift, role 
        // FROM event_log
        // WHERE actionType = 'chat' and broadcastId = '${res[0]?.[0].id}'
        // `)
        const res3 = await this.mysqlDriver.execute(`
        SELECT *
        FROM chat
        WHERE broadcastId = '${res[0]?.[0].id}'
        `)

        // const res4 = await this.mysqlDriver.execute(`
        // SELECT *
        // FROM ban
        // WHERE webinarId = '${res[0]?.[0].id}'
        // `)

        res[0][0]['moderators'] = null // res2[0].map(res => res.userId)
        res[0][0]['chat'] = res3[0]
        res[0][0]['links'] = (res[0][0]['links']) ? JSON.parse(res[0][0]['links']) : null
        res[0][0]['ban'] = null // res4[0]

        return res[0]?.[0]
    }

    async getAllWebinars() {
        const res = await this.mysqlDriver.execute(`
        SELECT *
        FROM webinar
        `)

        return res[0]
    }

    async deleteWebinarById(params) {
        const id = params.id
        let tbl = ''

        if (params.isAutowebinar == '0') {
            tbl = 'webinar'
        } else {
            tbl = 'broadcast'
        }
        const res = await this.mysqlDriver.execute(`
        DELETE FROM ${tbl}
        WHERE id = ?
        `, [id])
        return res[0].affectedRows
    }

    async insertNewModerators(moderators, webinarId, isAutowebinar) {
        let res = null;
        if (!isAutowebinar) {
            res = await this.mysqlDriver.execute(`
                SELECT *
                FROM moderate
                WHERE webinarId = '${webinarId}'
            `)
        } else {
            res = await this.mysqlDriver.execute(`
                SELECT *
                FROM moderate
                WHERE broadcastId = '${webinarId}'
            `)
        }
        if (!res[0].length) {
            if (!isAutowebinar) {
                await this.mysqlDriver.execute(`
                    INSERT INTO moderate
                        (userId, webinarId)
                    VALUES
                        ${
                            moderators
                            .filter((moderator) => !Number.isNaN(Number(moderator))) // по телефонам и почтам после интеграции с основной базой нерби
                            .map((moderator) => `(${moderator}, ${webinarId})`).join(', ')
                        }
                `)
            } else {
                await this.mysqlDriver.execute(`
                    INSERT INTO moderate
                        (userId, broadcastId)
                    VALUES
                        ${
                            moderators
                            .filter((moderator) => !Number.isNaN(Number(moderator))) // по телефонам и почтам после интеграции с основной базой нерби
                            .map((moderator) => `(${moderator}, ${webinarId})`).join(', ')
                        }
                `)
            }
        } else {
            if (!isAutowebinar) {
                await this.mysqlDriver.execute(`
                    UPDATE moderate
                    SET userId = ${Number(moderators[0])}
                    WHERE webinarId = ${webinarId};
                `)
            } else {
                await this.mysqlDriver.execute(`
                    UPDATE moderate
                    SET userId = ${Number(moderators[0])}
                    WHERE broadcastId = ${webinarId};
                `)
            }
        }
        
    }

    async getModerator(params) {
        let res = null;
        if (!params.isAutowebinar) {
            res = await this.mysqlDriver.execute(`
                SELECT *
                FROM moderate
                WHERE webinarId = '${params.id}'
            `)
        } else {
            res = await this.mysqlDriver.execute(`
                SELECT *
                FROM moderate
                WHERE broadcastId = '${params.id}'
            `)
        }
        return res[0]
    }
}

module.exports = WebinarRepository
