const express = require('express')
const router = express.Router
const path = require('path')
const multer = require('multer')
const storage = multer.diskStorage(
    {
        destination: path.resolve(process.cwd(), 'storage'),
    }
)

class FilesController {
    constructor(
        loadPhotoUseCase,
        loadPDFUseCase,
        getPhotoByNameUseCase,
        authMiddleware,
    ) {
        this.path = '/files'
        this.router = router()

        this.loadPhotoUseCase = loadPhotoUseCase
        this.loadPDFUseCase = loadPDFUseCase
        this.getPhotoByNameUseCase = getPhotoByNameUseCase

        this.authMiddleware = authMiddleware
    }

    initializeRoutes() {
        this.router.all('/*')
        this.router.post(
            '/photo',
            multer({storage: storage}).single('photo'),
            this.loadPhoto.bind(this)
        )
        this.router.post(
            '/pdf',
            multer({storage: storage}).single('pdfFile'),
            this.loadPDF.bind(this)
        )
        this.router.get('/photo', this.getPhotoByFilename.bind(this))
        this.router.get('/pdf', this.getPdf.bind(this))
        this.router.get('/pdfList', this.getPdfList.bind(this))   
    }

    async loadPhoto(req, res, next) {
        try {
            const createdFile = await this.loadPhotoUseCase.loadPhoto(req.file)
            return res.status(201).send({
                filename: createdFile.name
            })
        } catch(err) {
            next(err)
        }
    }

    async loadPDF(req, res, next) {
        try {
            console.log(req.file)
            const createdFile = await this.loadPDFUseCase.loadPDF(req.file)
            return res.status(201).send({
                filename: createdFile.name
            })
        } catch(err) {
            next(err)
        }
    }

    async getPdfList(req, res, next) {
        try {
            const fileList = await this.loadPDFUseCase.getPdfList()
            return res.status(200).send(fileList)
        } catch(err) {
            next(err)
        }
    }

    async getPhotoByFilename(req, res, next) {
        try {
            let photo = await this.getPhotoByNameUseCase.getPhotoByFilename(req.query.filename)

            if (!photo) {
                let defaultPath = await this.getPhotoByNameUseCase.getPhotoByFilename("default.png")
                return res.status(200).sendFile(defaultPath)
            }
            return res.status(200).sendFile(photo)
        } catch(err) {
            next(err)
        }
    }

    async getPdf(req, res, next) {
        try {
            let pdf = await this.getPhotoByNameUseCase.getPhotoByFilename(req.query.filename)
            return res.status(200).sendFile(pdf)
        } catch(err) {
            next(err)
        }
    }
}

module.exports = FilesController
