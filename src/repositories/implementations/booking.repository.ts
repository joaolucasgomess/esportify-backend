import { availableSlots, Booking, bookings, NewBooking } from "../../db/schema";
import { IBookingRepository } from "../interfaces/booking.repository.interface";
import { db } from "../../db";
import { eq, and, getTableColumns } from "drizzle-orm";

export class BookingRepository implements IBookingRepository {
    async findAlreadyBooking(
        slotId: string,
        bookedDate: string,
    ): Promise<Booking | undefined> {
        const [response] = await db
            .select()
            .from(bookings)
            .where(and(eq(bookings.slotId, slotId), eq(bookings.bookedDate, bookedDate)));
        return response;
    }

    async inserBooking(newBooking: NewBooking): Promise<Booking> {
        const [response] = await db.insert(bookings).values(newBooking).returning();
        return response;
    }

    async selectBookingsByIdCourt(courtId: string): Promise<Booking[]> {
        return await db
            .select({
                ...getTableColumns(bookings),
            })
            .from(bookings)
            .innerJoin(availableSlots, eq(availableSlots.courtId, courtId));
    }
}
