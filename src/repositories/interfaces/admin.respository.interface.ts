import { Admin, NewAdmin } from "../../db/schema";

export interface IAdminRepository {
	insertAdmin(newAdmin: NewAdmin): Promise<Admin>;
	selectAdminById(id: string): Promise<Admin | undefined>;
}
