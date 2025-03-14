import { Booking, NewBooking } from "../../db/schema";

export interface IBookingRepository {
	findAlreadyBooking(
		slotId: string,
		bookedDate: string,
	): Promise<Booking | undefined>;
	inserBooking(newBooking: NewBooking): Promise<Booking>;
	selectBookingsByIdCourt(courtId: string): Promise<Booking[]>;
}
