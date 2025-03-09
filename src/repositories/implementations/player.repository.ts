import { IPlayerRepository } from '../interfaces/player.repository.interface';
import { Client, clients } from '../../db/schema';
import { db } from '../../db';
import { eq } from 'drizzle-orm';

export default class PlayerRepository implements IPlayerRepository {

    selectPlayerById = async(id: string): Promise<Client | undefined> => {
        const [response] = await db.select().from(clients).where(eq(clients.id, id));
        return response;
    }    
}