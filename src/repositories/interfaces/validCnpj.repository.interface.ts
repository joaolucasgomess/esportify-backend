import { CnpjValid } from "../../db/schema";

export interface IValidCnpjRepository {
    selectCnpjByCnpj(cnpj: string): Promise<CnpjValid>;
}
