const mysql = require('mysql2/promise')

class Mysql {
    constructor(
        logger,
        config,
    ) {
        this._logger = logger

        this._database = config.database
        this._host = config.host
        this._port = config.port
        this._user = config.user
        this._password = config.password
        this._connectionLimit = 10

        this._connect = false
    }

    get connect() {
        return this._connect
    }

    async execute(query, preparedStatements = null) {
        let countConnResetErrors = 0
        let connection = await this._connect.getConnection()

        while (countConnResetErrors <= this._connectionLimit) {
            try {
                const result = await connection.execute(query, preparedStatements)
                this._connect.releaseConnection(connection)

                return result
            } catch (err) {
                if (err.code === 'ECONNRESET') {
                    connection.destroy()
                    connection = await this._connect.getConnection()

                    countConnResetErrors += 1
                    continue
                }
                break
            }
        }
    }

    async createConnect() {
        const sleep = (delay) =>
            new Promise((resolve) => setTimeout(resolve, delay));
        const timeout = 5 * 1000;

        while (true) {
            try {
                this._connect = mysql.createPool({
                    database: this._database,
                    host: this._host,
                    port: this._port,
                    user: this._user,
                    password: this._password,
                    waitForConnections: true,
                    connectionLimit: 10,
                    enableKeepAlive: true,
                });

                break;
            } catch (err) {
                if (
                    err.code === 'ECONNREFUSED' ||
                    err.code === 'ENOTFOUND' ||
                    err.code === 'ECONNRESET'
                ) {
                    this._logger.error(
                        `Lost connection to database ${this._host}:${this._port}. Trying reconnect.`,
                    );
                    await sleep(timeout);
                    continue;
                }

                this._logger.error({ err });
                throw err;
            }
        }

        this._logger.info(`Connected to BASE ${this._host}:${this._port}`);

        // const promise = new Promise((resolve, reject) => {
        //     this._connect = mysql.createPool({
        //         host: this.host,
        //         user: this.user,
        //         password: this.password,
        //         database: this.database
        //     }).promise()
        //
        //     this._connect.on('connect', () => {
        //         this._logger.info(`mysql created connect ${user}:${host}`)
        //         resolve()
        //     })
        //
        //     this._connect.on('disconnect', (err) => {
        //         this._logger.error(`${err}`)
        //         setTimeout(() => {
        //             this._logger.info(`Try reconnect - ${user}:${host}`)
        //             this.createConnect(this.host, this.user, this.password, this.database)
        //         }, 5000)
        //     })
        //
        //
        //     this._connect.on('error', (err) => {
        //         this._logger.error(`${err}`)
        //         setTimeout(() => {
        //             this._logger.info(`Try reconnect - ${user}:${host}`)
        //             this.createConnect(this.host, this.user, this.password, this.database)
        //         }, 5000)
        //     })
        // })
        //
        // await promise
    }
}

module.exports = Mysql
