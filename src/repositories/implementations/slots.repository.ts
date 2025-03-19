import { NewAvailableSlot, AvailableSlot, availableSlots } from "../../db/schema";
import { ISlotsRepository } from "../interfaces/slots.repository.interface";
import { db } from "../../db";
import { eq, gte, lte, and, or, gt, lt, isNull } from "drizzle-orm";

export class SlotsRepository implements ISlotsRepository {
    async findCoflictedSlots(
        data: Omit<NewAvailableSlot, "id" | "price">,
    ): Promise<AvailableSlot | undefined> {
        const [response] = await db
            .select()
            .from(availableSlots)
            .where(
                and(
                    eq(availableSlots.courtId, data.courtId),
                    eq(availableSlots.dayOfWeek, data.dayOfWeek),
                    and(
                        lte(availableSlots.startDate, data.endDate),
                        gte(availableSlots.endDate, data.startDate),
                    ),
                    or(
                        and(
                            lte(availableSlots.startTime, data.endTime),
                            gt(availableSlots.endTime, data.startTime),
                        ),
                        and(
                            lt(availableSlots.startTime, data.endTime),
                            gte(availableSlots.endTime, data.startTime),
                        ),
                        and(
                            gte(availableSlots.startTime, data.startTime),
                            lte(availableSlots.endTime, data.endTime),
                        ),
                    ),
                ),
            );
        return response;
    }

    async insertAvailableSlot(
        newAvailableSlot: NewAvailableSlot,
    ): Promise<AvailableSlot> {
        const [response] = await db
            .insert(availableSlots)
            .values(newAvailableSlot)
            .returning();
        return response;
    }

    async selectSlotById(id: string): Promise<AvailableSlot | undefined> {
        const [response] = await db
            .select()
            .from(availableSlots)
            .where(and(eq(availableSlots.id, id), isNull(availableSlots.deleted)));

        return response;
    }

    async updateSlot(
        id: string,
        slot: Partial<Omit<AvailableSlot, "id" | "createdAt" | "updatedAt" | "courtId">>,
    ): Promise<AvailableSlot> {
        const [response] = await db
            .update(availableSlots)
            .set(slot)
            .where(eq(availableSlots.id, id))
            .returning();
        return response;
    }

    async selectSlotsByIdCourt(courtId: string): Promise<AvailableSlot[]> {
        return await db
            .select()
            .from(availableSlots)
            .where(
                and(eq(availableSlots.courtId, courtId), isNull(availableSlots.deleted)),
            );
    }
}
