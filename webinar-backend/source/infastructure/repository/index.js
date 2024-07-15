// module.exports = async function (MysqlConfig, logger) {
//     const MysqlDriver = require("./driver/mysqlDriver")
//
//     const mysqlDriver = new MysqlDriver(logger)
//
//     await mysqlDriver.createConnect(
//         MysqlConfig.HOST,
//         MysqlConfig.USER,
//         MysqlConfig.PASSWORD,
//         MysqlConfig.DATABASE
//     )
//
//     const repository = new Map()
//
//     const UserRepository = require("./user.repository")
//
//     repository.set("UserRepository", new UserRepository(MysqlDriver, logger))
//
//     return repository
// }
