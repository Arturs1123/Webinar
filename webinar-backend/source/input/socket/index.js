const WebSocket = require('ws');

module.exports = class SocketServer {
    constructor(mysql, checkUserToken) {
        this._s = null
        this._port = 9000
        this.connections = new Map()
        this.blocked = []
        this.checkUserToken = checkUserToken
        this._mysql = mysql
        this._rooms = {} // _rooms[0] : live webinar, _rooms[1] : auto webinar
        // this._roomDatas = {} // _roomDatas[0: live, 1: live][room_id]{ playTime, users, winner }
        this._rooms[0] = {}
        this._rooms[1] = {}
        // this._roomDatas[0] = {}
        // this._roomDatas[1] = {}
        this.winner = 0
    }

    create() {
        this._s = new WebSocket.Server({port: this._port});

        this._s.on('connection', this.onConnect.bind(this));

        this.updateRoomInfo()        

        console.log(`SocketServer started on port ${this._port}`)
    }

    ping(connection) {
        connection.send(JSON.stringify({
            action: "ping"
        }));
    }

    onConnect(connection, req) {
        
        const ip = req.headers['x-forwarded-for'] || connection._socket.remoteAddress
        const address = ip + "_" + Math.random()
        this.connections.set(address, {
            connection,
            user: null,
            req,
        })
        this.ping(connection)

        connection.on('message', async (message) => {
            console.log("message", message)
            await this.command(address, JSON.parse(message))
        })

        connection.on('close', () => {
            this.connections.delete(address)

            console.log('???????????? ??????????');
        })
    }

    async updateRoomInfo() {
        setInterval(() => {
            for (const roomType in this._rooms) {
                for (const i in this._rooms[roomType]) {
                    const roomItem = this._rooms[roomType][i]
                    this.userUpdate(roomType, roomItem.length, i)
                    for (let i = 0; i < roomItem.length; i++) {
                        const address = roomItem[i]

                        if (this.connections.has(address)) {
                            const connect = this.connections.get(address)
                            
                            connect.connection.send(JSON.stringify({
                                action: "updateInfo",
                                data: {
                                    users: roomItem.length
                                }
                            }))

                            
                        } else {
                            roomItem.splice(i, 1);
                        }
                        
                    }
                }
            }
        }, 2_000)
    }

    async userUpdate(roomType, count, id) {
        const res = await this._mysql.execute(`
            UPDATE ${(roomType == 1) ? 'broadcast': 'webinar'} 
            SET userCount = ${count}
            WHERE id = ${id}
        `)
    }

    async command(address, command) {
        const isAutowebinar = command.data.isAutowebinar
        let connect = this.connections.get(address)

        if (command.action == "auth") {
            console.log("auth")
            connect.user = command.data
            this.winner ++
            if (!connect?.user?.type) {
                console.log('no type')
                return false
            }

            if (connect.user.type == 'token') {
                // connect.user.auth = await this.checkUserToken(connect.user.data)
                connect.user.auth = await this.checkUserToken(connect.user.authData)
                    .catch(e => {
                        return false
                    })

                console.log("auth", connect.user.auth)
            } else if (connect.user.type == 'ghoste') {
                    // this.winner = 1 + this.winner
                if (connect.user.login.includes('??????????')) {
                    connect.user.login = connect.user.login + this.winner
                }
                connect.user.auth = {
                    id: 0,
                    login: connect.user.login,
                    name: connect.user.login,
                    // nameGhoste: connect.user.data // connect.user.data "auth":{"id":4,"login":"admin"}
                }
            }
            connect.user.ip = connect.req.headers['x-forwarded-for'] || connect.connection._socket.remoteAddress

            connect.connection.send(JSON.stringify({
                action: "authed",
                data: {
                    users: this.winner
                }
            }))

            console.log(address, "auth")
            return
        }

        if (command.action == "join") {
            console.log("join==========>")
            console.log(connect.user)
            console.log(command)
            if (!connect.user) {
                return
            }
            console.log("room data =======>", this._rooms)
            console.log("command ===========>", command)
            if (this._rooms[isAutowebinar].hasOwnProperty(command.data.chat)) {
                if (!this._rooms[isAutowebinar][command.data.chat].includes(address)) {
                    this._rooms[isAutowebinar][command.data.chat].push(address)
                }
            } else {
                console.log("address==========>", [address])
                this._rooms[isAutowebinar][command.data.chat] = [address]
                if (isAutowebinar == 1) {
                    const broadcastId = command.data.chat
                    let res = null
                    let eventList = []
                    let timeList = []
                    const ct = Date.now()
                    try {
                        res = await this._mysql.execute(`
                            SELECT broadcastId, (${ct} + timeshift) as timestamp, username as login, message, 
                                    ${isAutowebinar} as isAutowebinar, 'ghoste' as type, 'eyJhbGciOiJI' as authData,
                                    'chat' as chat, 'mozilla/5.0 (windows nt 10.0; win64; x64)' as device,
                                    concat('{"id":9,"login":"', username, '"}') as auth, '::1' as ip 
                            FROM event_log 
                            WHERE broadcastId = ${broadcastId} and actionType = 'chat' 
                            ORDER BY timeshift 
                            `)
                    } catch (error) {
                        console.log(error)
                    }

                    console.log(res)

                    if (res !== null) {
                        const tempData = res[0]
                        let delay = 0
                        let beforTime = ct
                        for (let i = 0; i < tempData.length; i++) {
                            let temp = tempData[i];
                            // temp.timestamp = temp.timestamp + ct
                            temp.auth = JSON.parse(temp.auth)
                            // const data = {
                            //     ...connect.user,
                            //     device: command.data.device,
                            //     timestamp: command.data.timestamp,
                            // }
                            // user:  {
                            //     chat: '82',
                            //     device: 'mozilla/5.0 (windows nt 10.0; win64; x64) applewebkit/537.36 (khtml, like gecko) chrome/125.0.0.0 safari/537.36',
                            //     msg: '11111',
                            //     isAutowebinar: 0,
                            //     timestamp: '2024-06-03T06:02:45.100Z'
                            //   }
                            const data = {
                                action: "message",
                                data: {
                                    msg: temp.message,
                                    user: {
                                        type: 'token',
                                        authData: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFsZXhob3Rwcm9AZ21haWwuY29tIiwiaWF0IjoxNzE3MDA2Njk5fQ.P7T7r8sW8utIPDs8GcpuvjuoKO2f9OyirOkwsm8mEfg',
                                        login: temp.login,
                                        auth:{"id":8,"login":temp.login,"name": temp.login,"hideDates":"N"},
                                        chat: temp.broadcastId,
                                        device: 'device1', 
                                        isAutowebinar: isAutowebinar,
                                        timestamp: temp.timestamp, 
                                    }
                                }
                            }
                            delay = temp.timestamp - beforTime
                            beforTime = temp.timestamp
                            timeList.push(delay)
                            eventList.push(data)
                        }
                    }
                    // console.log(timeList)
                    // console.log(eventList)
                    const runTimer = (delay, idx) => {
                        return new Promise((resolve) => {
                            setTimeout(() => {
                                // broadcasting..
                                // console.log( 'running ', delay);
                                const userIPs = this.getRoomUsers(isAutowebinar, command.data.chat)
                                for (let i = 0; i < userIPs.length; i++) {
                                    // const address = this._rooms['1']['636'][0]
                                    const address = userIPs[i];
                                    const connectForSend = this.connections.get(address)
                                    connectForSend.connection.send(JSON.stringify(eventList[idx]))
                                }
                                resolve(true);
                            }, delay);
                        });
                    };
                    for ( var i = 0; i < timeList.length; i++ ) {
                        await runTimer(timeList[i], i);
                        // console.log( 'iterating', timeList[i]);
                    }                    
                }
            }

            if (this.connections.has(address)) {
                const connectForSend = this.connections.get(address)

                connectForSend.connection.send(JSON.stringify({
                    action: "startTime",
                    data: {
                        startTime: this._rooms[command.data.isAutowebinar][command.data.chat].startTime
                    }
                }))

            } else {
                this._rooms[isAutowebinar][command.data.chat].splice(i, 1);
            }

            console.log(address, "join " + command.data.chat)
            return
        }

        let webinarId = command.data.chat
        let broadcastId = null
        // let webinarAndBroadcast = command.data.chat.split('__')
        let webinarAndBroadcast = null

        // if (this._rooms.hasOwnProperty(command.data.chat) && command.data.chat.indexOf('__') > 0) {
            // webinarAndBroadcast = command.data.chat.split('__')
        // }

        // if (command.action == "setStartTime") {
        //     this._rooms[command.data.isAutowebinar][command.data.chat].startTime = command.data.startTime
        //     console.log('startTime: ', this._rooms[command.data.isAutowebinar][command.data.chat].startTime)
        // }
        // if (command.action == "getStartTime") {
            
        // }
        if (command.action == "send") {

            if (this._rooms[isAutowebinar].hasOwnProperty(command.data.chat)) {
                // if (command.data.chat.indexOf('__') > 0 && webinarAndBroadcast.length === 2) {
                    webinarId = command.data.chat // command.data.chat // webinarAndBroadcast[0]
                    broadcastId = command.data.chat // webinarAndBroadcast[1]
                    webinarAndBroadcast = null
                // }

                let res = await this._mysql.execute(`
                SELECT * FROM ban
                WHERE webinarId = ${webinarId}
                `)

                const bannedUsers = res[0]
                res = null

                if (!bannedUsers?.some((bu) => address.startsWith(bu.ip) && bu.device === command.data.device)) {
                    let res2 = await this._mysql.execute(`
                    SELECT * FROM ` + '`ignore` ' + `
                    WHERE webinarId = ${webinarId}
                    `)

                    const ignoredUsers = res2[0]
                    res2 = null

                    if (!ignoredUsers?.some((bu) => address.startsWith(bu.ip) && bu.device === command.data.device)) {
                        const data = {
                            ...connect.user,
                            device: command.data.device,
                            timestamp: command.data.timestamp,
                        }
                        for (let i = 0; i < this._rooms[command.data.isAutowebinar][command.data.chat].length; i++) {
                            const address = this._rooms[command.data.isAutowebinar][command.data.chat][i]

                            if (this.connections.has(address)) {
                                const connectForSend = this.connections.get(address)

                                connectForSend.connection.send(JSON.stringify({
                                    action: "message",
                                    data: {
                                        msg: command.data.msg,
                                        user: data
                                    }
                                }))

                                console.log("send", {
                                    action: "message",
                                    data: {
                                        msg: command.data.msg,
                                        user: connect.user
                                    }
                                })

                            } else {
                            //  this._rooms[command.data.chat].splice(i, 1);
                                this._rooms[isAutowebinar][command.data.chat].splice(i, 1);
                            }
                        }
                        
                        if (command.data.isAutowebinar == '0')
                            broadcastId = null
                        else webinarId = null
                        delete data.isAutowebinar

                        await this._mysql.execute(`
                            INSERT INTO chat (webinarId, msg, data, broadcastId)
                            VALUES ("${webinarId ?? 'NULL'}", "${command.data.msg}", '${JSON.stringify(data)}', ${broadcastId ?? 'NULL'})
                        `)
                    } else {
                        if (this.connections.has(address)) {
                            const connectForSend = this.connections.get(address)
                            const data = {
                                ...connect.user,
                                device: command.data.device,
                                timestamp: command.data.timestamp,
                            }

                            connectForSend.connection.send(JSON.stringify({
                                action: "message",
                                data: {
                                    msg: command.data.msg,
                                    user: data
                                }
                            }))
                        }
                    }
                } else {
                    if (this.connections.has(address)) {
                        const connectForSend = this.connections.get(address)
                        const data = {
                            ...connect.user,
                            device: command.data.device,
                            timestamp: command.data.timestamp,
                        }

                        connectForSend.connection.send(JSON.stringify({
                            action: "banUser",
                            data: {
                                msg: command.data.msg,
                                user: data
                            }
                        }))

                        console.log("ban", {
                            action: "banUser",
                            data: {
                                msg: command.data.msg,
                                user: connect.user
                            }
                        })
                    }
                }
            }
        }

        if (command.action == "addLink") {
            let flag = false
            const id = command.data.chat

            if (command.data.isAutowebinar == '0')
                flag = false
            else flag = true

            const webinar = await this._mysql.execute(`
            SELECT *
            FROM ${(flag) ? 'broadcast': 'webinar'}
            WHERE id = '${id}'
            `)

            const links = (webinar[0][0]['links']) ? JSON.parse(webinar[0][0]['links']) : []

            links.push({
                nameLink: command.data.name,
                msgLink: command.data.msg,
                colorLink: command.data.color,
            })

            await this._mysql.execute(`
                UPDATE ${(flag) ? 'broadcast': 'webinar'} 
                SET links ='${JSON.stringify(links)}'
                WHERE id = '${id}'
            `)
        }

        if (command.action == "sendLink") {
            const authUser = connect.user
            if (this._rooms[isAutowebinar].hasOwnProperty(command.data.chat)) {
                for (let i = 0; i < this._rooms[isAutowebinar][command.data.chat].length; i++) {
                    const address = this._rooms[isAutowebinar][command.data.chat][i]

                    if (this.connections.has(address)) {
                        const connect = this.connections.get(address)

                        connect.connection.send(JSON.stringify({
                            action: "message",
                            data: {
                                msg: command.data.msg,
                                user: {type: "link", name: command.data.name, color: command.data.color, ...authUser},
                            }
                        }))
                    } else {
                        this._rooms[isAutowebinar][command.data.chat].splice(i, 1);
                    }
                }
            }

            await this._mysql.execute(`
                    INSERT INTO chat (webinarId,msg,data) 
                    VALUES ("${
                        command.data.chat.replace('"', "'")}", "${command.data.msg
                    }", '${
                        JSON.stringify( {type: "link", name: command.data.name, color: command.data.color, ...authUser})
                    }')
            `)
        }

        if (command.action == "editLink") {
            const authUser = connect.user
            const webinar = await this._mysql.execute(`
                SELECT *
                FROM webinar
                WHERE id = '${command.data.chat.replace('"', "'")}'
                `)

            let links = (webinar[0][0]['links']) ? JSON.parse(webinar[0][0]['links']) : []

            for (const [idx, link] of links.entries()) {
                if (
                    link.nameLink === command.data.oldName
                    && link.msgLink === command.data.oldMsg
                    && link.colorLink === command.data.oldColor
                ) {
                    links.splice(
                        idx,
                        1,
                        {
                            nameLink: command.data.name,
                            msgLink: command.data.msg,
                            colorLink: command.data.color,
                        }
                    )
                }
            }

            await this._mysql.execute(`
                    UPDATE webinar 
                    SET links ='${JSON.stringify(links)}'
                    WHERE id = ${command.data.chat.replace('"', "'")}
            `)
            await this._mysql.execute(`
                    UPDATE chat 
                    SET msg = '${command.data.msg}' ,
                        data = '${JSON.stringify( {type: "link", name: command.data.name, color: command.data.color, ...authUser})}'  
                    WHERE webinarId = '${command.data.chat.replace('"', "'")}'
                    AND msg = '${command.data.oldMsg}'
                    AND data like '%"name":"${command.data.oldName}","color":"${command.data.oldColor}"%'
            `)

            if (this._rooms[isAutowebinar].hasOwnProperty(command.data.chat)) {
                for (let i = 0; i < this._rooms[isAutowebinar][command.data.chat].length; i++) {
                    const address = this._rooms[isAutowebinar][command.data.chat][i]

                    if (this.connections.has(address)) {
                        const connect = this.connections.get(address)

                        connect.connection.send(JSON.stringify({
                            action: "editLink",
                            data: {
                                msg: command.data.msg,
                                user: {type: "link", name: command.data.name, color: command.data.color},
                                oldMsg: command.data.oldMsg,
                                oldUser: {name: command.data.oldName, color: command.data.oldColor},
                            }
                        }))
                    } else {
                        this._rooms[isAutowebinar][command.data.chat].splice(i, 1);
                    }
                }
            }
        }

        if (command.action == "deleteLink" || command.action == "deleteLinkFromWebinar") {
            if (this._rooms[isAutowebinar].hasOwnProperty(command.data.chat)) {
                for (let i = 0; i < this._rooms[isAutowebinar][command.data.chat].length; i++) {
                    const address = this._rooms[isAutowebinar][command.data.chat][i]

                    if (this.connections.has(address)) {
                        const connect = this.connections.get(address)

                        connect.connection.send(JSON.stringify({
                            action: "deleteLink",
                            data: {
                                msg: command.data.msg,
                                user: {type: "link", name: command.data.name, color: command.data.color},
                            }
                        }))
                    } else {
                        this._rooms[isAutowebinar][command.data.chat].splice(i, 1);
                    }
                }
            }
             
            await this._mysql.execute(`
                    DELETE FROM chat 
                    WHERE webinarId = '${command.data.chat.replace('"', "'")}'
                    AND msg = '${command.data.msg}'
                    AND data like '%"name":"${command.data.name}","color":"${command.data.color}"%'
            `)

            if (command.action == "deleteLinkFromWebinar") {
                const webinar = await this._mysql.execute(`
                SELECT *
                FROM webinar
                WHERE id = '${command.data.chat.replace('"', "'")}'
                `)

                let links = (webinar[0][0]['links']) ? JSON.parse(webinar[0][0]['links']) : []

                for (const [idx, link] of links.entries()) {
                    if (
                        link.nameLink === command.data.name
                        && link.msgLink === command.data.msg
                        && link.colorLink === command.data.color
                    ) {
                        links.splice(idx, 1)
                    }
                }
                
                await this._mysql.execute(`
                    UPDATE webinar 
                    SET links ='${JSON.stringify(links)}'
                    WHERE id = ${command.data.chat.replace('"', "'")}
            `)
            }
        }

        if (command.action == "deleteMessages") {
            if (this._rooms[isAutowebinar].hasOwnProperty(command.data.chat)) {
                for (let i = 0; i < this._rooms[isAutowebinar][command.data.chat].length; i++) {
                    const address = this._rooms[isAutowebinar][command.data.chat][i]

                    if (this.connections.has(address)) {
                        const connect = this.connections.get(address)

                        connect.connection.send(JSON.stringify({
                            action: "deleteMessages",
                            data: {
                                messages: command.data.messages,
                            }
                        }))
                    } else {
                        this._rooms[isAutowebinar][command.data.chat].splice(i, 1);
                    }
                }
            }

            await this._mysql.execute(`
            DELETE FROM chat
            WHERE webinarId = ${command.data.chat}
                AND (${command.data.messages.map((m) => `(msg = '${m.msg}' AND data = '${JSON.stringify(m.user)}')`).join(' OR ')})
            `)
        }

        if (command.action == "deleteMessagesAndBanUser") {
            const { adminId, moderatorsIds } = await this._getAdminAndModeratorsIds(command.data.chat)

            const bannedUsers = Array.from(new Set(command.data.messages
                .filter((m) => m.user.auth?.id !== adminId && !moderatorsIds.includes(m.user.auth?.id))
                .map((m) => {
                    return m.user.ip + '___' + m.user.device
                }))
            ).map((u) => {
                const [ip, device] = u.split('___')
                return {
                    ip: ip,
                    device: device,
                }
            })

            if (this._rooms[isAutowebinar].hasOwnProperty(command.data.chat)) {
                for (let i = 0; i < this._rooms[isAutowebinar][command.data.chat].length; i++) {
                    const address = this._rooms[isAutowebinar][command.data.chat][i]

                    if (this.connections.has(address)) {
                        const connect = this.connections.get(address)

                        connect.connection.send(JSON.stringify({
                            action: "deleteMessagesAndBanUser",
                            data: {
                                bannedUsers: bannedUsers,
                            }
                        }))
                    } else {
                        this._rooms[isAutowebinar][command.data.chat].splice(i, 1);
                    }
                }
            }

            await this._mysql.execute(`
            DELETE FROM chat
            WHERE webinarId = ${command.data.chat}
                AND (${bannedUsers.map(
                        (u) => `(JSON_EXTRACT(data, "$.ip") = '${u.ip}' AND JSON_EXTRACT(data, "$.device") = '${u.device}')`
                    ).join(' OR ')})
            `)

            await this._mysql.execute(`
            INSERT INTO ban (webinarId, ip, device)
            VALUES ${bannedUsers.map((u) => {
                return `('${command.data.chat}', '${u.ip}', '${u.device}')`
            }).join(',\n')}
            `)
        }

        if (command.action == "banUser") {
            const { adminId, moderatorsIds } = await this._getAdminAndModeratorsIds(command.data.chat)

            const bannedUsers = Array.from(new Set(command.data.messages
                .filter((m) => m.user.auth?.id !== adminId && !moderatorsIds.includes(m.user.auth?.id))
                .map((m) => {
                    return m.user.ip + '___' + m.user.device
                }))
            ).map((u) => {
                const [ip, device] = u.split('___')
                return {
                    ip: ip,
                    device: device,
                }
            })

            console.log('This users will be banned', bannedUsers)

            await this._mysql.execute(`
            INSERT INTO ban (webinarId, ip, device)
            VALUES ${bannedUsers.map((u) => {
                return `('${command.data.chat}', '${u.ip}', '${u.device}')`
            }).join(',\n')}
            `)
        }

        if (command.action == "ignoreUser") {
            const { adminId, moderatorsIds } = await this._getAdminAndModeratorsIds(command.data.chat)

            const ignoredUsers = Array.from(new Set(command.data.messages
                .filter((m) => m.user.auth?.id !== adminId && !moderatorsIds.includes(m.user.auth?.id))
                .map((m) => {
                    return m.user.ip + '___' + m.user.device
                }))
            ).map((u) => {
                const [ip, device] = u.split('___')
                return {
                    ip: ip,
                    device: device,
                }
            })

            console.log('This users will be ignored', ignoredUsers)

            await this._mysql.execute(`
            INSERT INTO ` + '`ignore` ' + `(webinarId, ip, device)
            VALUES ${ignoredUsers.map((u) => {
                return `('${command.data.chat}', '${u.ip}', '${u.device}')`
            }).join(',\n')}
            `)
        }

        if (command.action == "chatBlock") {
            if (this._rooms[isAutowebinar].hasOwnProperty(command.data.chat)) {
                for (let i = 0; i < this._rooms[isAutowebinar][command.data.chat].length; i++) {
                    const address = this._rooms[isAutowebinar][command.data.chat][i]

                    if (this.connections.has(address)) {
                        const connect = this.connections.get(address)

                        connect.connection.send(JSON.stringify({
                            action: "chatBlock",
                            data: {}
                        }))
                    } else {
                        this._rooms[isAutowebinar][command.data.chat].splice(i, 1);
                    }
                }
            }

            await this._mysql.execute(`
               UPDATE webinar set blockedChat = 'Y' where id = '${command.data.chat}'
            `)
        }
        if (command.action == "chatUnBlock") {
            if (this._rooms[isAutowebinar].hasOwnProperty(command.data.chat)) {
                for (let i = 0; i < this._rooms[isAutowebinar][command.data.chat].length; i++) {
                    const address = this._rooms[isAutowebinar][command.data.chat][i]

                    if (this.connections.has(address)) {
                        const connect = this.connections.get(address)

                        connect.connection.send(JSON.stringify({
                            action: "chatUnBlock",
                            data: {}
                        }))
                    } else {
                        this._rooms[isAutowebinar][command.data.chat].splice(i, 1);
                    }
                }
            }

            await this._mysql.execute(`
               UPDATE webinar set blockedChat = 'N' where id = '${command.data.chat}'
            `)
        }

        if (command.action == "allowChatLinks") {
            if (this._rooms[isAutowebinar].hasOwnProperty(command.data.chat)) {
                for (let i = 0; i < this._rooms[isAutowebinar][command.data.chat].length; i++) {
                    const address = this._rooms[isAutowebinar][command.data.chat][i]

                    if (this.connections.has(address)) {
                        const connect = this.connections.get(address)

                        connect.connection.send(JSON.stringify({
                            action: "allowChatLinks",
                            data: {}
                        }))
                    } else {
                        this._rooms[isAutowebinar][command.data.chat].splice(i, 1);
                    }
                }
            }

            await this._mysql.execute(`
               UPDATE webinar set allowChatLinks = 'Y' where id = '${command.data.chat}'
            `)
        }

        if (command.action == "disallowChatLinks") {
            if (this._rooms[isAutowebinar].hasOwnProperty(command.data.chat)) {
                for (let i = 0; i < this._rooms[isAutowebinar][command.data.chat].length; i++) {
                    const address = this._rooms[isAutowebinar][command.data.chat][i]

                    if (this.connections.has(address)) {
                        const connect = this.connections.get(address)

                        connect.connection.send(JSON.stringify({
                            action: "disallowChatLinks",
                            data: {}
                        }))
                    } else {
                        this._rooms[isAutowebinar][command.data.chat].splice(i, 1);
                    }
                }
            }

            await this._mysql.execute(`
               UPDATE webinar set allowChatLinks = 'N' where id = '${command.data.chat}'
            `)
        }

        if (command.action == "clearChat") {
            if (this._rooms[isAutowebinar].hasOwnProperty(command.data.chat)) {
                for (let i = 0; i < this._rooms[isAutowebinar][command.data.chat].length; i++) {
                    const address = this._rooms[isAutowebinar][command.data.chat][i]

                    if (this.connections.has(address)) {
                        const connect = this.connections.get(address)

                        connect.connection.send(JSON.stringify({
                            action: "clearChat",
                            data: {}
                        }))
                    } else {
                        this._rooms[isAutowebinar][command.data.chat].splice(i, 1);
                    }
                }
            }

            await this._mysql.execute(`
                DELETE FROM chat
                WHERE webinarId = '${command.data.chat}'
                    AND JSON_EXTRACT(data, "$.type") != 'link'
            `)
        }

        if (command.action == "sendZakrepComment") {
            if (this._rooms[isAutowebinar].hasOwnProperty(command.data.chat)) {
                const data = {
                    ...connect.user,
                    device: command.data.device,
                    timestamp: command.data.timestamp,
                    priority: 1,
                }

                for (let i = 0; i < this._rooms[isAutowebinar][command.data.chat].length; i++) {
                    const address = this._rooms[isAutowebinar][command.data.chat][i]

                    if (this.connections.has(address)) {
                        const connectForSend = this.connections.get(address)

                        connectForSend.connection.send(JSON.stringify({
                            action: "message",
                            data: {
                                msg: command.data.msg,
                                user: data
                            }
                        }))
                    }
                }

                await this._mysql.execute(`
                INSERT INTO chat (webinarId,msg,data)
                VALUES ("${command.data.chat.replace('"', "'")}", "${command.data.msg}", '${JSON.stringify(data)}')
                `)
            }
        }

        if (command.action == "addAction") {
            for (let i = 0; i < this._rooms[isAutowebinar][command.data.chat].length; i++) {
                const address = this._rooms[isAutowebinar][command.data.chat][i]

                if (this.connections.has(address)) {
                    const connectForSend = this.connections.get(address)
                    const data = {
                        ...connect.user,
                        device: command.data.device,
                        timestamp: command.data.timestamp,
                    }

                    connectForSend.connection.send(JSON.stringify({
                        action: "addAction",
                        data: {
                            action: {
                                ...command.data.action,
                                username: connect.user.auth.login,
                                timestamp: Date.now(),
                            },
                            user: data
                        }
                    }))
                }
            }
        }

        if (command.action == "startStream") {
            console.log('playTime: ', this._rooms[isAutowebinar].hasOwnProperty(command.data.chat))
            console.log(this._rooms[isAutowebinar])
            if (this._rooms[isAutowebinar].hasOwnProperty(command.data.chat)) {
                for (let i = 0; i < this._rooms[isAutowebinar][command.data.chat].length; i++) {
                    const address = this._rooms[isAutowebinar][command.data.chat][i]
                    console.log(address)
                    if (this.connections.has(address)) {
                        const connect = this.connections.get(address)

                        connect.connection.send(JSON.stringify({
                            action: "startStream",
                            data: {
                                playTime: command.data.playTime,
                            }
                        }))

                    } else {
                        this._rooms[isAutowebinar][command.data.chat].splice(i, 1);
                    }
                }

                await this._mysql.execute(`
                   UPDATE webinar set status = '???????' where id = '${command.data.chat}'
                `)

                console.log('start stream', command.data.chat)
            }
        }

        if (command.action == "stopStream") {
            if (this._rooms[isAutowebinar].hasOwnProperty(command.data.chat)) {
                for (let i = 0; i < this._rooms[isAutowebinar][command.data.chat].length; i++) {
                    const address = this._rooms[isAutowebinar][command.data.chat][i]

                    if (this.connections.has(address)) {
                        const connect = this.connections.get(address)

                        connect.connection.send(JSON.stringify({
                            action: "stopStream"
                        }))

                    } else {
                        this._rooms[isAutowebinar][command.data.chat].splice(i, 1);
                    }
                }

                await this._mysql.execute(`
                   UPDATE webinar set status = '????????' where id = '${command.data.chat}'
                `)

                console.log('finish stream', command.data.chat)
            }
        }

        if (command.action == "showScreen") {
            for (let i = 0; i < this._rooms[isAutowebinar][command.data.chat].length; i++) {
                const address = this._rooms[isAutowebinar][command.data.chat][i]

                if (this.connections.has(address)) {
                    const connectForSend = this.connections.get(address)
                    connectForSend.connection.send(JSON.stringify({
                        action: "showScreen",
                        data: {
                            msg: command.data.message,
                            status: command.data.status,
                        }
                    }))
                }
            }
        }

        if (command.action == "pinMessage") {
            for (let i = 0; i < this._rooms[isAutowebinar][command.data.chat].length; i++) {
                const address = this._rooms[isAutowebinar][command.data.chat][i]

                if (this.connections.has(address)) {
                    const connectForSend = this.connections.get(address)
                    connectForSend.connection.send(JSON.stringify({
                        action: "pinMessage",
                        data: {
                            pinMessage: command.data.message
                        }
                    }))
                }
            }
        }

        if (command.action == "unpinMessage") {
            for (let i = 0; i < this._rooms[isAutowebinar][command.data.chat].length; i++) {
                const address = this._rooms[isAutowebinar][command.data.chat][i]

                if (this.connections.has(address)) {
                    const connectForSend = this.connections.get(address)
                    connectForSend.connection.send(JSON.stringify({
                        action: "unpinMessage",
                    }))
                }
            }
        }

        if (command.action == "sendHeart") {
            if (this._rooms[isAutowebinar].hasOwnProperty(command.data.chat)) {
                for (let i = 0; i < this._rooms[isAutowebinar][command.data.chat].length; i++) {
                    const address = this._rooms[isAutowebinar][command.data.chat][i]

                    if (this.connections.has(address)) {
                        const connect = this.connections.get(address)
                        connect.connection.send(JSON.stringify({
                            action: "sendHeart"
                        }))

                    } else {
                        this._rooms[isAutowebinar][command.data.chat].splice(i, 1);
                    }
                }
            }
        }
    }

    join(pretty, user) {

    }

    createRoom(pretty) {

    }

    sendToChat(pretty, user, msg) {

    }

    async _getAdminAndModeratorsIds(webinarId) {
        const [adminAndModerators] = await this._mysql.execute(`
            SELECT 
                w.userId as adminId, 
                m.userId as moderatorId
            FROM webinar AS w
            LEFT JOIN moderate AS m
                ON m.webinarId = w.id
            WHERE w.id = ?
            `, [webinarId])

        const adminId = adminAndModerators[0]?.adminId
        const moderatorsIds = adminAndModerators
            .map((row) => row.moderatorId)
            .filter((mi) => mi !== null)

        return {
            adminId,
            moderatorsIds,
        }
    }

    getRoomUsers(isAutowebinar, roomId) {
        return this._rooms[isAutowebinar][roomId]
    }
}
