const crypt = require('bcryptjs')

class Crypt {
    constructor() {
        this.salt = crypt.genSaltSync(10)
    }

    hashSync(data) {
        return crypt.hashSync(data, this.salt)
    }

    compareSync(str, hash) {
        return crypt.compareSync(str, hash)
    }
}

module.exports = Crypt
