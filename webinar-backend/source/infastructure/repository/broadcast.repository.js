module.exports = class BroadcastRepository {
    constructor(mysqlDriver, logger) {
        this.mysqlDriver = mysqlDriver
        this.logger = logger
    }

    async createAutowebinarByWebinarId(webinarId, duration, playTime) {

        const res = await this.mysqlDriver.execute(`
            SELECT * 
            FROM webinar 
            WHERE id = ${webinarId}
            `)
        console.log(res)
        let broadcastData = res[0][0]
        delete broadcastData.id 
        delete broadcastData.lastTimeViewer
        broadcastData.duration = duration
        const res1 = await this.mysqlDriver.execute(`
        INSERT INTO broadcast
            (${Object.keys(broadcastData).join(', ')})
        VALUES 
            (${Object.entries(broadcastData)
            .map(([k, v]) => k.startsWith('date') ? `STR_TO_DATE(?, '%Y-%m-%d %H:%i')` : `?`)
            .join(', ')
        })
        `, Object.values(broadcastData))
            console.log("insertData=========>", res1);
        const broadcastId = res1[0]?.insertId
        const resChat = await this.mysqlDriver.execute(`
        SELECT *
        FROM chat
        WHERE webinarId = '${webinarId}' 
        `)

        for (let i = 0; i < resChat[0].length; i++) {
            const row = resChat[0][i]
            const data = JSON.parse(row.data)
            if (row.msg.includes('http')) continue 

            let date1 = new Date(data.timestamp); 
            let date2 = new Date(playTime); 
            let timestamp = date1 - date2;
            const eventData = {  
                broadcastId: broadcastId,
                actionType: 'chat',
                timeshift: timestamp,
                data: '{}',
                username: data.auth.name,
                message: row.msg,
                role: 'guest',
                note: '',
            }
            this.addEventLog(eventData)
        }
        return true
    }

    async updateAutowebinarByUrl(webinarId, url, duration, playTime) {
        const deleteBroadCast = await this.mysqlDriver.execute(`
            DELETE FROM broadcast 
            WHERE url = ?
        `, [url])
        const res = await this.mysqlDriver.execute(`
            SELECT * 
            FROM webinar 
            WHERE id = ${webinarId}
            `)
        let broadcastData = res[0][0]
        delete broadcastData.id 
        delete broadcastData.lastTimeViewer
        broadcastData.duration = duration
        broadcastData.dateStart = playTime
        const res1 = await this.mysqlDriver.execute(`
        INSERT INTO broadcast
            (${Object.keys(broadcastData).join(', ')})
        VALUES 
            (${Object.entries(broadcastData)
            .map(([k, v]) => k.startsWith('date') ? `STR_TO_DATE(?, '%Y-%m-%d %H:%i')` : `?`)
            .join(', ')
        });
        `, Object.values(broadcastData))

        const broadcastId = res1[0]?.insertId
        const resChat = await this.mysqlDriver.execute(`
        SELECT *
        FROM chat
        WHERE webinarId = '${webinarId}' 
        `)

        for (let i = 0; i < resChat[0].length; i++) {
            const row = resChat[0][i]
            const data = JSON.parse(row.data)
            if (row.msg.includes('http')) continue 

            let date1 = new Date(data.timestamp); 
            let date2 = new Date(playTime); 
            let timestamp = date1 - date2;
            const eventData = {  
                broadcastId: broadcastId,
                actionType: 'chat',
                timeshift: timestamp,
                data: '{}',
                username: data.auth.name,
                message: row.msg,
                role: 'guest',
                note: '',
            }
            this.addEventLog(eventData)
        }
        return true
    }

    async createBroadcast(broadcastData){
        const res = await this.mysqlDriver.execute(`
        INSERT INTO broadcast
            (${Object.keys(broadcastData).join(', ')})
        VALUES 
            (${Object.entries(broadcastData)
            .map(([k, v]) => k.startsWith('date') ? `STR_TO_DATE(?, '%Y-%m-%d %H:%i')` : `?`)
            .join(', ')
        });
        `, Object.values(broadcastData))

        return res[0]?.insertId
    }

    async getBroadcastById(broadcastId) {
        const res = await this.mysqlDriver.execute(`
        SELECT *
        FROM broadcast
        WHERE id = ${broadcastId}
        `)

        return res[0]?.[0]
    }

    async getBroadcastByUrl(broadcastUrl) {
        const res = await this.mysqlDriver.execute(`
        SELECT *
        FROM broadcast
        WHERE url = '${broadcastUrl}'
        `)

        const broadcast = res[0][0]

        const res2 = await this.mysqlDriver.execute(`
        SELECT *
        FROM moderate
        WHERE webinarId = '${broadcast.autowebinarId}'
        `)

        const res3 = await this.mysqlDriver.execute(`
        SELECT *
        FROM chat
        WHERE webinarId = '${broadcast.autowebinarId}'
            AND broadcastId = '${broadcast.id}'
        `)

        const res4 = await this.mysqlDriver.execute(`
        SELECT *
        FROM ban
        WHERE webinarId = '${broadcast.autowebinarId}'
        `)

        broadcast['moderators'] = res2[0].map(res => res.userId)
        broadcast['chat'] = res3[0]
        broadcast['links'] = (broadcast['links']) ? JSON.parse(broadcast['links']) : null
        broadcast['ban'] = res4[0]

        return broadcast
    }

    async getBroadcastByCustomUrl(broadcastUrl) {
        const res = await this.mysqlDriver.execute(`
            SELECT *
            FROM broadcast
            WHERE url = '${broadcastUrl}'
        `)
        return res[0];
    }

    async getBroadcastsByWebinarId(webinarId, filters) {
        const res = await this.mysqlDriver.execute(`
        SELECT *
        FROM broadcast
        WHERE autowebinarId = ${webinarId}
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

    async deleteBroadcastById(broadcastId) {
        const res = await this.mysqlDriver.execute(`
            SELECT *
            FROM broadcast
            WHERE id = '${broadcastId}'
        `)

        const broadcast = res[0][0]

        const resDelete = await this.mysqlDriver.execute(`
        DELETE FROM broadcast
        WHERE id = ?
        `, [broadcastId])

        await this.mysqlDriver.execute(`
        DELETE FROM chat
        WHERE webinarId = '${broadcast.autowebinarId}'
            AND broadcastId = '${broadcast.id}'
        `)

        return resDelete[0].affectedRows
    }

    async deleteBroadcastsByWebinarId(webinarId) {
        const res = await this.mysqlDriver.execute(`
        DELETE FROM broadcast
        WHERE autowebinarId = ${webinarId}
        `)

        const res2 = await this.mysqlDriver.execute(`
        DELETE FROM chat
        WHERE webinarId = ${webinarId}
        AND broadcastId IS NOT NULL
        `)

        return res[0].affectedRows
    }

    async getEventsByBroadcastId(broadcastId) {
        let res = null
        try {
            res = await this.mysqlDriver.execute(`
                SELECT *
                FROM event_log
                WHERE broadcastId = ${broadcastId} 
                ORDER BY timeshift 
                `)
        } catch (error) {
            console.log(error)
        }
        if (res !== null) {
            return res[0]
        } else {
            return null
        }
    }

    async deleteEventLog(eventLogId) {
        const res = await this.mysqlDriver.execute(`
        DELETE FROM event_log
        WHERE logId = ${eventLogId}
        `)
        return res[0].affectedRows
    }

    async deleteMutipleEvent(strIds) {
        const res = await this.mysqlDriver.execute(`
        DELETE FROM event_log
        WHERE logId in ( ${strIds} )
        `)
        return res[0].affectedRows
    }

    async updateBroadcastId(broadcastId) {
        await this.mysqlDriver.execute(`
                UPDATE event_log
                    SET broadcastId = ${broadcastId}
                WHERE broadcastId = 0 
                `)
        return true            
    }

    async moveSelectedEvent(data) {
        const up = data.upTimeshift
        const strIds = data.arrCheckedLogId
        
        for (let i = 0; i < strIds.length; i++) {
            await this.mysqlDriver.execute(`
                UPDATE event_log
                SET timeshift = ${up}
                WHERE logId = ${strIds[i]}
                `)
        }

            
        // const val = data.diffTimeshift
        // const strDownIds = data.arrDownLogId.toString()

        // if (val !== 0 && strDownIds.length > 0) {
        //     await this.mysqlDriver.execute(`
        //         UPDATE event_log
        //         SET timeshift = timeshift + ${val} 
        //         WHERE logId in ( ${strDownIds} )
        //         `)
        // }

        return true
    }

    async deleteAll(broadcastId){
        const res = await this.mysqlDriver.execute(`
        DELETE FROM event_log
        WHERE broadcastId = ${broadcastId} 
        `)
        return res[0].affectedRows
    }

    async addEventLog(data) {
        const res = await this.mysqlDriver.execute(`
            INSERT INTO event_log
                (${Object.keys(data).join(', ')})
            VALUES 
                (${Object.entries(data).map(([k, v]) => k = `?`).join(', ')
                });
            `, Object.values(data))
        return res[0]?.insertId
    }

    async importData(data) {
        if (data.flagImport == 1)
            this.deleteAll(data.broadcastId)
        
        const arr = data.data
        let nImportData = 0
        let insertId = 0
        for (let i = 0; i < arr.length; i++) {
            let item = arr[i]
            item.broadcastId = data.broadcastId
            insertId = this.addEventLog(item)
            if (insertId > 0) nImportData++
        }
        return nImportData
    }
}
