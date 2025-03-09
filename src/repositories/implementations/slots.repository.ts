import { NewAvailableSlot, AvailableSlot, availableSlots } from "../../db/schema";
import { ISlotsRepository } from "../interfaces/slots.repository.interface";
import { db } from "../../db";
import { eq } from "drizzle-orm";

export class SlotsRepository implements ISlotsRepository{

    async findCoflictedSlots(data: Omit<NewAvailableSlot, "id" | "price">): Promise<AvailableSlot | undefined> {
        //TODO:
        // const [response] = await db
        //     .select()
        //     .from(availableSlots)
        //     .where(
        //         and(

        //         )
        //     );
    }

    async insertAvailableSlot(newAvailableSlot: NewAvailableSlot): Promise<AvailableSlot> {
        const [response] = await db.insert(availableSlots).values(newAvailableSlot).returning();
        return response;
    }

    async selectSlotById(id: string): Promise<AvailableSlot | undefined> {
        const [response] = await db.select().from(availableSlots).where(eq(availableSlots.id, id));
        return response;
    }

    async updateSlot(id: string, slot: Partial<Omit<AvailableSlot, "id" | "createdAt" | "updatedAt" | "courtId">>): Promise<AvailableSlot> {
        const [response] = await db.update(availableSlots).set(slot).where(eq(availableSlots.id, id)).returning();
        return response;
    }

    async selectSlotByIdCourt(courtId: string): Promise<AvailableSlot | undefined> {
        const [response] = await db.select().from(availableSlots).where(eq(availableSlots.courtId, courtId));
        return response;
    }
}