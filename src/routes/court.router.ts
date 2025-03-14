import express from "express";
import { CourtController } from "../controllers/court.controller";
import { CourtService } from "../services/court.service";
import CourtRepository from "../repositories/implementations/court.repository";
import { AuthMiddleware } from "../middlewares/auth.middleware";

const courtRepository = new CourtRepository();
const courtService = new CourtService(courtRepository);
const courtController = new CourtController(courtService);

export const courtRoutes = (authMiddleware: AuthMiddleware) => {
    const router = express.Router();

    router.post(
        "/add/",
        authMiddleware.authenticate,
        authMiddleware.authorize(["admin"]),
        courtController.addCourt,
    );
    router.get(
        "/",
        authMiddleware.authenticate,
        authMiddleware.authorize(["player", "admin"]),
        courtController.getCourts,
    );
    router.get(
        "/:courtId",
        authMiddleware.authenticate,
        authMiddleware.authorize(["player", "admin"]),
        courtController.getCourtById,
    );

    return router;
};
