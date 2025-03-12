import expres from 'express';
import { CourtController } from '../controllers/court.controller';
import { CourtService } from '../services/court.service';
import CourtRepository from '../repositories/implementations/court.repository';

export const courtRouter = expres.Router();

const courtRepository = new CourtRepository();
const courtService = new CourtService(courtRepository);
const courtController = new CourtController(courtService);

courtRouter.post('/add/', courtController.addCourt);
courtRouter.get('/', courtController.getCourts);
courtRouter.get('/:courtId', courtController.getCourtById);
