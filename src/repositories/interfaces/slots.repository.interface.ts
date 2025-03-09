import { AvailableSlot, NewAvailableSlot } from "../../db/schema";

export interface ISlotsRepository{
    findCoflictedSlots(data: Omit<NewAvailableSlot,"id" | "price">): Promise<AvailableSlot | undefined>;
    insertAvailableSlot(newAvailableSlot: NewAvailableSlot): Promise<AvailableSlot>;
    selectSlotById(id: string): Promise<AvailableSlot | undefined>;
    updateSlot(id: string, slot: Partial<Omit<AvailableSlot, "id" | "createdAt" | "updatedAt" | "courtId">>): Promise<AvailableSlot>;
    selectSlotByIdCourt(courtId: string): Promise<AvailableSlot | undefined>;
}