import express from 'express';
import { BookingController } from '../controllers/booking.controller';
import { BookingService } from '../services/booking.service';
import { BookingRepository } from '../repositories/implementations/booking.repository';
import { SlotsRepository } from '../repositories/implementations/slots.repository';
import { AuthMiddleware } from '../middlewares/auth.middleware';

const bookingRepository = new BookingRepository();
const slotsRepository = new SlotsRepository();
const bookingService = new BookingService(bookingRepository, slotsRepository);
const bookingController = new BookingController(bookingService);

export const bookingRoutes = (authMiddleware: AuthMiddleware) => {

    const router = express.Router();

    router.use("/add/", 
        authMiddleware.authenticate,
        authMiddleware.authorize(["player"]),
        bookingController.addBooking
    );
    router.use("/searchByCourtId/:courtId",
        authMiddleware.authenticate,
        authMiddleware.authorize(["admin"]),
        bookingController.getBookingsByCourtId
    );

    return router;
}
