import { ICourtRepository } from '../interfaces/court.repository.interface';
import { Court, courts, NewCourt } from '../../db/schema';
import { db } from '../../db';
import { eq, and } from 'drizzle-orm';

export default class CourtRepository implements ICourtRepository{

    insertCourt = async(newCourt: NewCourt): Promise<Court> => {
        const [response] = await db.insert(courts).values(newCourt).returning();
        return response;
    }

    selectCourtById = async (id: string): Promise<Court> => {
        const [response] = await db.select().from(courts).where(eq(courts.id, id));
        return response;
    }

    selectCourtByNameAndSportsComplexId = async(name: string, sportsComplexId: string): Promise<Court | undefined> => {
        const [response] = await db
            .select()
            .from(courts)
            .where(
                and(
                    eq(courts.name, name),
                    eq(courts.id, sportsComplexId)
                )
            );
        return response;
    }

    selectCourtBySportsComplexId = async(sportsComplexId: string): Promise<Court[]> => {
        return db.select().from(courts).where(eq(courts.sportsComplexId, sportsComplexId));
    }

    selectAllCourts = async(querys: { name: string }): Promise<Court[]> => {
        // TODO: implementar filtro certo depois
        return db.select().from(courts);
    }
}
