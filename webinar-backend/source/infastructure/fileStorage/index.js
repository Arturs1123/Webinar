module.exports = async function (STORAGE_CONFIG, getRandomSymbols) {
    const Storage = require("./storage")

    const storage = new Storage(STORAGE_CONFIG, getRandomSymbols)

    await storage.checkDir()

    return storage
}
