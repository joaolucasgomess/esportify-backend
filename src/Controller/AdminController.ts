import { Request, Response } from 'express'
import { AdminBusiness } from '../Business/AdminBusiness'

export class AdminController {
    constructor(private adminBusiness: AdminBusiness){}

    addAdmin = async (req: Request, res: Response) => {
        try{
            const { email, senha, nome, id_complexo_esportivo } = req.body
            const token = await this.adminBusiness.addAdmin({ email, senha, nome, id_complexo_esportivo })
            res.status(201).send({ token })
        }catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message })
        }
    }

    login = async (req: Request, res: Response) => {
        try{
            const { email, senha } = req.body
            const token = await this.adminBusiness.login({ email, senha })
            res.status(200).send({ token })
        }catch(err){
            res.status(err.statusCode || 400).send({ error: err.message })
        }
    }

    getAdmin = async (req: Request, res: Response) => {
      try{
        const token = req.headers.authorization as string
        const admin = await this.adminBusiness.getAdmin(token)
        res.status(200).send({ admin })
      }catch(err: any){
        res.status(err.statusCode || 400).send({ error: err.message})
      }
    }
}