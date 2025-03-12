import expres from 'express';
import { SlotsController } from '../controllers/slots.controller';
import { SlotsService } from '../services/slots.service';
import { SlotsRepository } from '../repositories/implementations/slots.repository';
import CourtRepository from '../repositories/implementations/court.repository';

export const slotsRouter = expres.Router();

const slotsRepository = new SlotsRepository();
const courtRepository = new CourtRepository();
const slotsService = new SlotsService(slotsRepository, courtRepository);
const slotsController = new SlotsController(slotsService);

slotsRouter.post("/add/", slotsController.addAvailableSlots);
slotsRouter.put("alterStatus/:id/", slotsController.alterSlotStatus);
slotsRouter.delete("/:id/", slotsController.deleteSlot);
slotsRouter.get("/searchForCourt/:courtId/", slotsController.getSlotsByCourtId);