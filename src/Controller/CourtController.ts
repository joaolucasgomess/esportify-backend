import { Request, Response } from 'express'
import { CourtBusiness } from '../Business/CourtBusiness'
export class CourtController {  
    constructor(private courtBusiness: CourtBusiness){}

    addCourt = async(req: Request, res: Response): Promise<void> => {
        try{
            const token = req.headers.authorization as string
            const { nome, id_complexo_esportivo } = req.body
            const new_court = await this.courtBusiness.addCourt(token, { nome, id_complexo_esportivo })
            res.status(201).send({ new_court })
        }catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message})
        }
    }

    addTime = async(req: Request, res: Response): Promise<void> => {
        try{
            const token = req.headers.authorization as string
            const { id_quadra, id_dia_semana, horario_inicial, horario_final, preco } = req.body
            const new_time = await this.courtBusiness.addTime(token, { id_quadra, id_dia_semana, horario_inicial, horario_final, preco })
            res.status(201).send({ new_time })
        }catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message})
        }
    }

    rentCourt = async(req: Request, res: Response): Promise<void> => {
        try{
            const token = req.headers.authorization as string
            const { id_quadra, id_horario, data } = req.body
            const new_rent = await this.courtBusiness.addTime(token, { id_quadra, id_horario, data })
            res.status(201).send({ new_rent })
        }catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message})
        }
    }
}