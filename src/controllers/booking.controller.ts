import { Request, Response } from 'express';
import { BookingService } from '../services/booking.service';

export class BookingController{
    constructor(private bookingService: BookingService){}

    addBooking = async(req: Request, res: Response): Promise<void> => {
        try{
            const token = req.headers.authorization as string;
            const { slotId, bookedDate } = req.body;
            await this.bookingService.addBooking(token, { slotId, bookedDate });
            res.status(201).send({ message: 'Quadra alugada com sucesso' });
        }catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message});
        }
    }

    getBookingsByCourtId = async(req: Request, res: Response): Promise<void> => {
        try{
          const token = req.headers.authorization as string;
          const { courtId } = req.params;
          const bookings = await this.bookingService.getBookingsByCourtId(token, courtId);
          res.status(200).send({ bookings });
        }catch(err: any){
          res.status(err.statusCode || 400).send({ error: err.message});
        }
      }
}