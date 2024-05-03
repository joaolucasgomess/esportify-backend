import expres from 'express'
import { CourtController } from '../Controller/CourtController'
import { CourtBusiness } from '../Business/CourtBusiness'
import CourtData from '../Data/CourtData'

export const courtRouter = expres.Router()

const courtData = new CourtData()
const courtBusiness = new CourtBusiness(courtData)
const courtController = new CourtController(courtBusiness)

courtRouter.post('/adicionarQuadra/', courtController.addCourt)
courtRouter.post('/adicionarHorario/', courtController.addTime)
courtRouter.post('/alugar/:idQuadra', courtController.rentCourt)
courtRouter.get('/', courtController.getCourts)
courtRouter.get('/:id', courtController.getCourtById)
courtRouter.get('/horarios/:id', courtController.getTimeByIdCourt)
