import express from "express";
import { SlotsController } from "../controllers/slots.controller";
import { SlotsService } from "../services/slots.service";
import { SlotsRepository } from "../repositories/implementations/slots.repository";
import CourtRepository from "../repositories/implementations/court.repository";
import { AuthMiddleware } from "../middlewares/auth.middleware";

const slotsRepository = new SlotsRepository();
const courtRepository = new CourtRepository();
const slotsService = new SlotsService(slotsRepository, courtRepository);
const slotsController = new SlotsController(slotsService);

export const slotsRoutes = (authMiddleware: AuthMiddleware) => {
    const router = express.Router();

    router.post(
        "/add/",
        authMiddleware.authenticate,
        authMiddleware.authorize(["admin"]),
        slotsController.addAvailableSlots,
    );
    router.put(
        "/alterStatus/:id/",
        authMiddleware.authenticate,
        authMiddleware.authorize(["admin"]),
        slotsController.alterSlotStatus,
    );
    router.delete(
        "/:id/",
        authMiddleware.authenticate,
        authMiddleware.authorize(["admin"]),
        slotsController.deleteSlot,
    );
    router.get(
        "/searchForCourt/:courtId/",
        authMiddleware.authenticate,
        slotsController.getSlotsByCourtId,
    );

    return router;
};
