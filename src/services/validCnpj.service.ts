import ValidCnpjRepository from "../repositories/implementations/validCnpj.repository";
import { CustomError } from "../utils/CustomError";

export default class ValidCnpjService{
  private validCnpjRepository: ValidCnpjRepository;

  constructor(validCnpjRepository: ValidCnpjRepository){
    this.validCnpjRepository = validCnpjRepository;
  }

  validCnpj = async(cnpj: string): Promise<boolean> => {
    try{
      if(cnpj.length != 14){
        throw new CustomError('Tamanho da string não representa um CNPJ.', 422);
      }
  
      const cnpjInNumber = Number(cnpj);
  
      if(Number.isNaN(cnpjInNumber)){
        throw new CustomError('CNPJ contem algum caracter que não é um número.', 400);
      }

      const cnpjValid = await this.validCnpjRepository.validCnpjByCnpj(cnpj);

      if(cnpjValid.active && !cnpjValid.registered){
          return true;
      }

      return false;

    }catch(err: any){
      throw new CustomError(err.message, err.statusCode)
    }
  }
}