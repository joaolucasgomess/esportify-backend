import { Request, Response } from 'express'
import { AdminBusiness } from '../Business/AdminBusiness'

export class AdminController {
    constructor(private adminBusiness: AdminBusiness){}

    addAdmin = async (req: Request, res: Response): Promise<void> => {
        try{
            const { nomeUsuario, email, senha, idComplexoEsportivo } = req.body
            console.log(req.body)
            const token = await this.adminBusiness.addAdmin({ nomeUsuario, email, senha, idComplexoEsportivo })
            res.status(201).send({ token })
        }catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message })
        }
    }

    login = async (req: Request, res: Response): Promise<void> => {
        try{
            const { email, senha } = req.body
            const token = await this.adminBusiness.login({ email, senha })
            res.status(200).send({ token })
        }catch(err){
            res.status(err.statusCode || 400).send({ error: err.message })
        }
    }

    getAdmin = async (req: Request, res: Response): Promise<void> => {
      try{
        const token = req.headers.authorization as string
        const admin = await this.adminBusiness.getAdmin(token)
        res.status(200).send({ admin })
      }catch(err: any){
        res.status(err.statusCode || 400).send({ error: err.message})
      }
    }
}