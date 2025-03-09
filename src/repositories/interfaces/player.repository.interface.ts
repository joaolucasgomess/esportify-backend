import { Client } from '../../db/schema';

export interface IPlayerRepository {
    selectPlayerById(id: string): Promise<Client | undefined>;
}