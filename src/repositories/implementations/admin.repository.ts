import { IAdminRepository } from '../interfaces/admin.respository.interface'
import { Admin, NewAdmin, admins } from '../../db/schema'
import { db } from '../../db'
import { eq } from 'drizzle-orm'

export class AdminRepository implements IAdminRepository {

    insertAdmin = async(newAdmin: NewAdmin): Promise<Admin> => {
        const [response] = await db.insert(admins).values(newAdmin).returning();
        return response;
    }

    selectAdminById = async(id: string): Promise<Admin | undefined> => {
        const [response] = await db.select().from(admins).where(eq(admins.id, id));
        return response;
    }
}