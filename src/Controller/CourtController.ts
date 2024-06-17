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
            res.status(201).send({ message: 'Horário adionado com sucesso!' })
        }catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message})
        }
    }

    deleteTime = async (req: Request, res: Response): Promise<void> => {
        try{
            const token = req.headers.authorization as string
            const { id_horario_aluguel } = req.params
            const deleted_time = await this.courtBusiness.deleteTime(token, id_horario_aluguel)
            res.status(200).send({ HorarioDeletado: deleted_time })
        }catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message})
        }
    }

    rentCourt = async(req: Request, res: Response): Promise<void> => {
        try{
            const token = req.headers.authorization as string
            const { id_quadra, id_horario, data } = req.body
            const new_rent = await this.courtBusiness.rentCourt(token, { id_quadra, id_horario, data })
            res.status(201).send({ message: 'Quadra alugada com sucesso' })
        }catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message})
        }
    }

    getCourts = async(req: Request, res: Response): Promise<void> => {
        try{
            const token = req.headers.authorization as string
            const querys = req.query as {nome: string, locatario: string}
            console.log(querys)
            const courts = await this.courtBusiness.getCourts(token, querys)
            res.status(200).send({ courts })
        }catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message})
        }
    }

    getCourtById = async(req: Request, res: Response): Promise<void> => {
        try{
            const token = req.headers.authorization as string
            const { id_quadra } = req.params
            console.log(id_quadra)
            const courts = await this.courtBusiness.getCourtById(token, id_quadra)
            res.status(200).send({ courts })
        }catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message})
        }
    }

    getTimeByIdCourt = async(req: Request, res: Response): Promise<void> => {
        try{
            const token = req.headers.authorization as string
            const { id_quadra } = req.params
            const times = await this.courtBusiness.getTimeByIdCourt(token, id_quadra)
            res.status(200).send({ times })
        }catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message})
        }
    }
}