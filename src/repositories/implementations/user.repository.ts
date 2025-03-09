import { eq } from "drizzle-orm";
import { db } from "../../db";
import { User, NewUser, users } from "../../db/schema";
import { IUserRepository } from "../interfaces/user.repository.interface";

export class UserRepository implements IUserRepository{

  async selectUserByEmail (email: string): Promise<User | undefined> {
    const [response] = await db.select().from(users).where(eq(users.email, email));
    return response;
  }

  async insertUser(newUser: NewUser): Promise<User> {
    const [response] = await db.insert(users).values(newUser).returning();
    return response;
  }

  async selectUserById(id: string): Promise<User | undefined> {
    const [response] = await db.select().from(users).where(eq(users.id, id));
    return response;
  }
}