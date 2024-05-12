import { Request, Response } from 'express'
import { SportsComplexBusiness } from '../Business/SportsComplexBusiness'

export class SportsComplexController {
    constructor(private sportsComplexBusiness: SportsComplexBusiness){}

    addSportsComplex = async(req: Request, res: Response): Promise<void> => {
        try{
            const { cnpj, nome, rua, bairro, cidade, numero, cep } = req.body
            const new_sports_complex =  await this.sportsComplexBusiness.addSportsComplexBusiness({ cnpj, nome, rua, bairro, cidade, numero, cep })
            res.status(201).send({ new_sports_complex })
        }catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message})
        }
    }
}