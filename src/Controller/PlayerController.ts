import { Request, Response } from 'express'
import { PlayerBusiness } from '../Business/PlayerBusiness'

export class PlayerController {
    constructor(private playerBusiness: PlayerBusiness){}

    singup = async (req: Request, res: Response) => {
        try{
            const { email, senha, nome, telefone } = req.body
            const token = await this.playerBusiness.singup({ email, senha, nome, telefone })
            res.status(201).send({ token })
        }catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message})
        }
    }

    login = async (req: Request, res: Response) => {
        try{
            const { email, senha } = req.body
            const token = await this.playerBusiness.login({ email, senha })
            res.status(200).send({ token })
        }catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message})
        }
    }

    getPlayer = async (req: Request, res: Response) => {
      try{
        const token = req.headers.authorization as string
        const player = await this.playerBusiness.getPlayer(token)
        res.status(200).send({ player })
      }catch(err: any){
        res.status(err.statusCode || 400).send({ error: err.message})
      }
    }
}