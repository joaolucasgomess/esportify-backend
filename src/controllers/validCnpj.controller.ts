import { Request, Response } from 'express'
import ValidCnpjService from '../services/validCnpj.service';

export default class ValidCnpjController{
  constructor(private validCnpjService: ValidCnpjService){}

  validCnpj = async(req: Request, res: Response): Promise<void> => {
    try{
      const { cnpj } = req.params
      const isValid = await this.validCnpjService.validCnpj(cnpj)
      res.status(200).send({ isValid: isValid })
    }catch(err: any){
      res.status(err.statusCode || 400).send({ error: err.message})
    }
  }
}