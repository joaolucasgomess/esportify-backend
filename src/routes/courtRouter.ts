import expres from 'express'
import { CourtController } from '../Controller/CourtController'
import { CourtBusiness } from '../Business/CourtBusiness'
import CourtData from '../Data/CourtData'

export const courtRouter = expres.Router()

const courtData = new CourtData()
const courtBusiness = new CourtBusiness(courtData)
const courtController = new CourtController(courtBusiness)

courtRouter.post('/adicionar-quadra/', courtController.addCourt)
courtRouter.post('/adicionar-horario/', courtController.addTime)
courtRouter.post('/alugar/', courtController.rentCourt)
courtRouter.delete('/deletar-horario/:id_horario_aluguel', courtController.deleteTime)
courtRouter.get('/', courtController.getCourts)
courtRouter.get('/:id_quadra', courtController.getCourtById)
courtRouter.get('/horarios/:id_quadra', courtController.getTimeByIdCourt)
courtRouter.get('/alugueis/:id_quadra', courtController.getRentByCourtId)
