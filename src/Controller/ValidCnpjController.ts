import { Request, Response } from 'express'
import ValidCnpjBusiness from '../Business/ValidCnpjBusiness';

export default class ValidCnpjController{
  constructor(private validCnpjBusiness: ValidCnpjBusiness){}

  validCnpj = async(req: Request, res: Response): Promise<void> => {
    try{
      const { cnpj } = req.params
      const isValid = await this.validCnpjBusiness.validCnpj(cnpj)
      res.status(200).send({ isValid: isValid })
    }catch(err: any){
      res.status(err.statusCode || 400).send({ error: err.message})
    }
  }
}