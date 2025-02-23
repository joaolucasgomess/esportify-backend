import ValidCnpjData from "../Data/ValidCnpjData";
import { CustomError } from "../Utils/CustomError";

export default class ValidCnpjBusiness{
  private validCnpjData: ValidCnpjData

  constructor(validCnpjRepository: ValidCnpjData){
    this.validCnpjData = validCnpjRepository
  }

  validCnpj = async(cnpj: string): Promise<boolean> => {
    try{
      if(cnpj.length != 14){
        throw new CustomError('Tamanho da string não representa um CNPJ.', 422)
      }
  
      const cnpjInNumber = Number(cnpj)
  
      if(Number.isNaN(cnpjInNumber)){
        throw new CustomError('CNPJ contem algum caracter que não é um número.', 400)
      }

      const cnpjValid = await this.validCnpjData.validCnpjByCnpj(cnpj)

      if(cnpjValid.status == "ATIVO" && cnpjValid.cadastrado == "NAO" ){
          return true
      }

      return false

    }catch(err: any){
      throw new CustomError(err.message, err.statusCode)
    }
  }
}