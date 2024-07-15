class LoadPhotoUseCase {
    constructor(storage) {
        this.storage = storage
    }

    async loadPhoto(photo) {
        return await this.storage.addTempFileFromFileObject(photo)
    }
}

module.exports = LoadPhotoUseCase
