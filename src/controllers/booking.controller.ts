import { Request, Response } from "express";
import { BookingService } from "../services/booking.service";

export class BookingController {
    constructor(private bookingService: BookingService) {}

    addBooking = async (req: Request, res: Response): Promise<void> => {
        try {
            const { slotId, bookedDate } = req.body;
            const userId = req.authenticatedUser.userId;
            await this.bookingService.addBooking({
                slotId,
                bookedDate,
                userId,
            });
            res.status(201).send({ message: "Quadra alugada com sucesso" });
        } catch (err: any) {
            res.status(err.statusCode || 400).send({ error: err.message });
        }
    };

    getBookingsByCourtId = async (req: Request, res: Response): Promise<void> => {
        try {
            const { courtId } = req.params;
            const bookings = await this.bookingService.getBookingsByCourtId(courtId);
            res.status(200).send({ bookings });
        } catch (err: any) {
            res.status(err.statusCode || 400).send({ error: err.message });
        }
    };
}
