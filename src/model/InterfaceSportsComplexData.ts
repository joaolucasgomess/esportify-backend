import { TypeCreateSportsComplex } from '../types/TypeCreateSportsComplex'
import { ComplexoEsportivo } from '@prisma/client'

export interface ISportsComplexData {
    insertSportsComplex(id: string, newSportsComplex: TypeCreateSportsComplex): Promise<ComplexoEsportivo>
}