import { CnpjValid, cnpjValid } from "../../db/schema";
import { db } from "../../db";
import { eq } from "drizzle-orm";
import { IValidCnpjRepository } from "../interfaces/validCnpj.repository.interface";

export default class ValidCnpjRepository implements IValidCnpjRepository {
    selectCnpjByCnpj = async (cnpj: string): Promise<CnpjValid> => {
        const [response] = await db
            .select()
            .from(cnpjValid)
            .where(eq(cnpjValid.cnpj, cnpj));

        return response;
    };

    async updateCnpjValid(
        id: string,
        toUpdatecnpjValid: Partial<CnpjValid>,
    ): Promise<CnpjValid> {
        const [response] = await db
            .update(cnpjValid)
            .set(toUpdatecnpjValid)
            .where(eq(cnpjValid.id, id))
            .returning();

        return response;
    }
}
