import { ISportsComplexData } from '../model/InterfaceSportsComplexData'
import { TypeCreateSportsComplex } from '../types/TypeCreateSportsComplex'
import { CustomError } from '../Utils/CustomError'
import { verifyFieldsToObject } from '../Utils/VerifyFieldsToObject' // TODO
import { ComplexoEsportivo } from '@prisma/client'
import { generatedId } from '../services/idGenerator'

export class SportsComplexBusiness {
    private sportsComplexData: ISportsComplexData

    constructor(sportsComplexRepository: ISportsComplexData){
        this.sportsComplexData = sportsComplexRepository
    }

    addSportsComplexBusiness = async(newSportsComplex: TypeCreateSportsComplex): Promise<ComplexoEsportivo> => {
        try{

            if(verifyFieldsToObject(newSportsComplex) === false){
                throw new CustomError('Campos inválidos', 422)
            }

            newSportsComplex.numero = Number(newSportsComplex.numero)

            const validCnpj = await this.sportsComplexData.selectValidCnpjByCnpj(newSportsComplex.cnpj)

            if(!validCnpj){
                throw new CustomError('Cnpj informado ainda não possui acesso ao nosso sistema', 403)
            }
            
            if(validCnpj.cadastrado == 'SIM'){
                throw new CustomError('Cnpj informado já cadastrado em nossa base', 422)
            }

            const id = generatedId()

            const sportsComplex = await this.sportsComplexData.insertSportsComplex(id, newSportsComplex)
            return sportsComplex
        }catch(err: any){
            throw new CustomError(err.message, err.statusCode)
        }
    }
}