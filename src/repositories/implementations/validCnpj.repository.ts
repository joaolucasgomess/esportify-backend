import { CnpjValid, cnpjValid } from "../../db/schema";
import { db } from "../../db";
import { eq } from "drizzle-orm";
import { IValidCnpjRepository } from "../interfaces/validCnpj.repository.interface";

export default class ValidCnpjRepository implements IValidCnpjRepository {
	validCnpjByCnpj = async (cnpj: string): Promise<CnpjValid> => {
		const [response] = await db
			.select()
			.from(cnpjValid)
			.where(eq(cnpjValid.cnpj, cnpj));
		return response;
	};
}
