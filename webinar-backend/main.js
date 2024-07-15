const mysql = require('mysql2/promise')
const Storage = require('./source/infastructure/fileStorage')
const dotenv = require('dotenv')
dotenv.config()

const Mysql = require("./source/infastructure/repository/driver/mysqlDriver")

const UserRepository = require("./source/infastructure/repository/user.repository")
const WebinarRepository = require("./source/infastructure/repository/webinar.repository")
const BroadcastRepository = require("./source/infastructure/repository/broadcast.repository")

const LoadPhotoUseCase = require("./source/use-case/loadPhoto.use-case")
const LoadPDFUseCase = require("./source/use-case/loadPDF.use-case")
const GetPhotoByNameUseCase = require("./source/use-case/getPhotoByName.use-case")
const RegisterUserUseCase = require("./source/use-case/registerUser.use-case")
const LoginUserUseCase = require("./source/use-case/loginUser.use-case")
const CheckUserTokenUseCase = require("./source/use-case/checkUserToken.use-case")
const CreateWebinarUseCase = require("./source/use-case/createWebinar.use-case");
const UpdateWebinarUseCase = require("./source/use-case/updateWebinar.use-case");
const GetWebinarsByUserUseCase = require("./source/use-case/getWebinarsByUser.use-case");
const GetWebinarByIdUseCase = require("./source/use-case/getWebinarById.use-case");
const GetWebinarByPrettyLinkUseCase = require("./source/use-case/getWebinarByPrettyLink.use-case");
const DeleteWebinarUseCase = require("./source/use-case/deleteWebinar.use-case");
const ChangeHideDatesUseCase = require("./source/use-case/changeHideDates.use-case");
const GhosteUseCase = require("./source/use-case/ghoste.use-case");

const GetEventsByBroadcastIdUseCase = require("./source/use-case/getEventsByBroadcastId.use-case");
const GetBroadcastByUrlUseCase = require('./source/use-case/getBroadcastByUrl.use-case');
const DeleteEventLogUseCase = require("./source/use-case/deleteEventLog.use-case");
const UpdateEventLogUseCase = require("./source/use-case/updateEventLog.use-case");
const AddEventLogUseCase = require("./source/use-case/addEventLog.use-case");
const ImportDataUseCase = require("./source/use-case/importData.use-case.js");

const FilesController = require("./source/input/rest/controllers/files.controller")
const AuthController = require("./source/input/rest/controllers/auth.controller")
const WebinarController = require("./source/input/rest/controllers/webinars.controller")
const BroadcastController = require("./source/input/rest/controllers/broadcast.controller")
const UserController = require("./source/input/rest/controllers/user.controller")

const BroadcastsIntervalTask = require("./source/tasks/broadcastsInterval.task")

const RestProvider = require("./source/input/rest/provider")
const Crypt = require("./source/utils/crypt/crypt");
const UserWebinarRepository = require("./source/infastructure/repository/userWebinar.repository");

(async () => {
    const jwtSecret = process.env.JWT_SECRET
    const CONFIG = require("./config/config")
    const helpers = require("./source/infastructure/helpers")
    const Logger = require("./source/infastructure/logger")
    const Storage = require("./source/infastructure/fileStorage")
    const Repository = require("./source/infastructure/repository")
    // const rest = require("./source/input/restApi")

    const logger = Logger.create(CONFIG.LOGGER, 'main', {time: helpers.currentTime})

    const fileStorage = await Storage(CONFIG.STORAGE, helpers.getRandomSymbols)

    // const repository = Repository(CONFIG.MYSQL, logger)

    const db = new Mysql(
        console,
        {
            host: process.env.MYSQL_HOST,
            port: 3306,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        },
    )
    await db.createConnect()

    const crypt = new Crypt()

    const userRepository = new UserRepository(db, console)
    const webinarRepository = new WebinarRepository(db, console)
    const userWebinarRepository = new UserWebinarRepository(db, console)
    const broadcastRepository = new BroadcastRepository(db, console)

    const loadPhotoUseCase = new LoadPhotoUseCase(fileStorage)
    const loadPDFUseCase = new LoadPDFUseCase(fileStorage)
    const getPhotoByNameUseCase = new GetPhotoByNameUseCase(fileStorage)
    const registerUserUseCase = new RegisterUserUseCase(userRepository, jwtSecret, crypt)
    const loginUserUseCase = new LoginUserUseCase(userRepository, jwtSecret, crypt)
    const checkUserTokenUseCase = new CheckUserTokenUseCase(userRepository, jwtSecret)
    const createWebinarUseCase = new CreateWebinarUseCase(
        webinarRepository,
        broadcastRepository,
        userWebinarRepository,
    )
    const updateWebinarUseCase = new UpdateWebinarUseCase(webinarRepository)
    const getWebinarsByUserUseCase = new GetWebinarsByUserUseCase(webinarRepository)
    const getWebinarByIdUseCase = new GetWebinarByIdUseCase(webinarRepository)
    const getWebinarByPrettyLinkUseCase = new GetWebinarByPrettyLinkUseCase(webinarRepository)
    const deleteWebinarUseCase = new DeleteWebinarUseCase(webinarRepository)
    
    const changeHideDatesUseCase = new ChangeHideDatesUseCase(userRepository)
    const ghosteUseCase = new GhosteUseCase(userRepository)
    
    const getEventsByBroadcastId = new GetEventsByBroadcastIdUseCase(broadcastRepository)
    const getBroadcastByCustomUrl = new GetBroadcastByUrlUseCase(broadcastRepository)
    const deleteEventLog = new DeleteEventLogUseCase(broadcastRepository)
    const updateEventLog = new UpdateEventLogUseCase(broadcastRepository)
    const addEventLog = new AddEventLogUseCase(broadcastRepository)
    const importData = new ImportDataUseCase(broadcastRepository)
    
    const authMiddlewareWrapper = require("./source/input/rest/middlewares/auth.middleware");
    const authMiddleware = await authMiddlewareWrapper(userRepository)

    const filesController = new FilesController(
        loadPhotoUseCase,
        loadPDFUseCase,
        getPhotoByNameUseCase,
        authMiddleware,
    )
    const authController = new AuthController(
        registerUserUseCase,
        loginUserUseCase,
        checkUserTokenUseCase,
    )
    const webinarController = new WebinarController(
        createWebinarUseCase,
        updateWebinarUseCase,
        getWebinarsByUserUseCase,
        getWebinarByIdUseCase,
        getWebinarByPrettyLinkUseCase,
        deleteWebinarUseCase,
        authMiddleware,
    )
    const broadcastController = new BroadcastController(
        getEventsByBroadcastId,
        getBroadcastByCustomUrl,
        deleteEventLog,
        updateEventLog,
        addEventLog,
        importData,
        authMiddleware,
    )
    const userController = new UserController(
        changeHideDatesUseCase,
        ghosteUseCase,
        authMiddleware,
    )

    const broadcastsIntervalTask = new BroadcastsIntervalTask(
        CONFIG.CRON.tasks.broadcastsInterval,
        console,
        webinarRepository,
        broadcastRepository,
    )

    const SocketServer = require("./source/input/socket")

    const socketServer = new SocketServer(db, checkUserTokenUseCase.checkUserToken.bind(checkUserTokenUseCase))

    const restProvider = new RestProvider([
        filesController,
        authController,
        webinarController,
        broadcastController,
        userController,
    ])

    restProvider.start()

    socketServer.create()
})()
