import { CnpjValid } from "../../db/schema";

export interface IValidCnpjRepository {
    validCnpjByCnpj(cnpj: string): Promise<CnpjValid>;
}
