import { TypeCreateSportsComplex } from '../types/TypeCreateSportsComplex'
import { ComplexoEsportivo, CnpjValido } from '@prisma/client'

export interface ISportsComplexData {
    insertSportsComplex(id: string, newSportsComplex: TypeCreateSportsComplex): Promise<ComplexoEsportivo>
    selectValidCnpjByCnpj(cnpj: string): Promise<CnpjValido>
}