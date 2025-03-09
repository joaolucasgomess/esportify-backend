import { Request, Response } from 'express';
import { CourtService } from '../services/court.service';

export class CourtController {  
    constructor(private courtService: CourtService){}

    addCourt = async(req: Request, res: Response): Promise<void> => {
        try{
            const token = req.headers.authorization as string;
            const { name, sportsComplexId } = req.body;
            const new_court = await this.courtService.addCourt(token, { name, sportsComplexId });
            res.status(201).send({ new_court });
        }catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message});
        }
    }

    rentCourt = async(req: Request, res: Response): Promise<void> => {
        try{
            const token = req.headers.authorization as string
            const { id_quadra, id_horario, data } = req.body
            const new_rent = await this.courtService.rentCourt(token, { id_quadra, id_horario, data })
            res.status(201).send({ message: 'Quadra alugada com sucesso' })
        }catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message})
        }
    }

    getCourts = async(req: Request, res: Response): Promise<void> => {
        try{
            const token = req.headers.authorization as string
            const querys = req.query as {nome: string, locatario: string}
            const courts = await this.courtService.getCourts(token, querys)
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
            const courts = await this.courtService.getCourtById(token, id_quadra)
            res.status(200).send({ courts })
        }catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message})
        }
    }

    getRentByCourtId = async(req: Request, res: Response): Promise<void> => {
      try{
        const token = req.headers.authorization as string
        const { id_quadra } = req.params
        const rentTimes = await this.courtService.getRentByCourtId(token, id_quadra)
        res.status(200).send({ rentTimes })
      }catch(err: any){
        res.status(err.statusCode || 400).send({ error: err.message})
      }
    }
}