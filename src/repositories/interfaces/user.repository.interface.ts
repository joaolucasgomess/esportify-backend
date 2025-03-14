import { User, NewUser } from "../../db/schema";

export interface IUserRepository {
	selectUserByEmail(email: string): Promise<User | undefined>;
	insertUser(newUser: NewUser): Promise<User>;
	selectUserById(id: string): Promise<User | undefined>;
}
