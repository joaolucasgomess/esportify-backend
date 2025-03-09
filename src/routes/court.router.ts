import expres from 'express'
import { CourtController } from '../controllers/court.controller'
import { CourtService } from '../services/court.service'
import CourtRepository from '../repositories/implementations/court.repository'

export const courtRouter = expres.Router()

const courtRepository = new CourtRepository()
const courtService = new CourtService(courtRepository)
const courtController = new CourtController(courtService)

courtRouter.post('/adicionar-quadra/', courtController.addCourt)
courtRouter.post('/adicionar-horario/', courtController.addTime)
courtRouter.post('/alugar/', courtController.rentCourt)
courtRouter.delete('/deletar-horario/:id_horario_aluguel', courtController.deleteTime)
courtRouter.put('/alterar-status/:timeId', courtController.alterStatus)
courtRouter.get('/', courtController.getCourts)
courtRouter.get('/:id_quadra', courtController.getCourtById)
courtRouter.get('/horarios/:id_quadra', courtController.getTimeByIdCourt)
courtRouter.get('/alugueis/:id_quadra', courtController.getRentByCourtId)
