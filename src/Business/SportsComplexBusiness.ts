import { ISportsComplexData } from '../model/InterfaceSportsComplexData'
import { TypeCreateSportsComplex } from '../types/TypeCreateSportsComplex'
import { CustomError } from '../Utils/CustomError'
import { verifyFieldsToObject } from '../Utils/VerifyFieldsToObject' // TODO
import { ComplexoEsportivo } from '@prisma/client'
import { generatedId } from '../services/idGenerator'
import ValidCnpjBusiness from './ValidCnpjBusiness'

export class SportsComplexBusiness {
    private sportsComplexData: ISportsComplexData
    private validCnpjBusiness: ValidCnpjBusiness

    constructor(sportsComplexRepository: ISportsComplexData, validCnpjBusiness: ValidCnpjBusiness){
        this.sportsComplexData = sportsComplexRepository
        this.validCnpjBusiness = validCnpjBusiness
    }

    addSportsComplexBusiness = async(newSportsComplex: TypeCreateSportsComplex): Promise<ComplexoEsportivo> => {
        try{
            
            // if(verifyFieldsToObject(newSportsComplex) === false){
            //     throw new CustomError('Campos inválidos', 422)
            // }

            newSportsComplex.numero = Number(newSportsComplex.numero)

            const validCnpj = await this.validCnpjBusiness.validCnpj(newSportsComplex.cnpj)

            if(!validCnpj){
                throw new CustomError('Cnpj informado ainda não possui acesso ao nosso sistema ou já esta cadastrado', 403)
            }

            const id = generatedId()

            const sportsComplex = await this.sportsComplexData.insertSportsComplex(id, newSportsComplex)
            return sportsComplex
        }catch(err: any){
            throw new CustomError(err.message, err.statusCode)
        }
    }
}