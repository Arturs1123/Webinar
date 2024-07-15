class GetPhotoByNameUseCase {
    constructor(storage) {
        this.storage = storage
    }

    async getPhotoByFilename(filename) {
        return this.storage.getPath(filename)
    }

    async getAllPdf(filename) {
        return this.storage.getAllPdf(filename)
    }
}

module.exports = GetPhotoByNameUseCase
