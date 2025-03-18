import { CnpjValid } from "../../db/schema";

export interface IValidCnpjRepository {
    selectCnpjByCnpj(cnpj: string): Promise<CnpjValid>;
    updateCnpjValid(id: string, cnpjValid: Partial<CnpjValid>): Promise<CnpjValid>;
}
