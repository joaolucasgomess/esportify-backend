import expres from 'express';
import { BookingController } from '../controllers/booking.controller';
import { BookingService } from '../services/booking.service';
import { BookingRepository } from '../repositories/implementations/booking.repository';
import { SlotsRepository } from '../repositories/implementations/slots.repository';

export const bookingRouter = expres.Router();

const bookingRepository = new BookingRepository();
const slotsRepository = new SlotsRepository();
const bookingService = new BookingService(bookingRepository, slotsRepository);
const bookingController = new BookingController(bookingService);

bookingRouter.use("/add/", bookingController.addBooking);
bookingRouter.use("/searchByCourtId/:courtId", bookingController.getBookingsByCourtId);