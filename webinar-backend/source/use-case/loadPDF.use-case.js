class LoadPDFUseCase {
    constructor(storage) {
        this.storage = storage
    }

    async loadPDF(file) {
        return await this.storage.addTempFileFromFileObject(file)
    }

    async getPdfList() {
        return await this.storage.getPdfList()
    }
}

module.exports = LoadPDFUseCase
