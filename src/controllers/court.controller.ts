import { Request, Response } from 'express';
import { CourtService } from '../services/court.service';

export class CourtController {  
    constructor(private courtService: CourtService){}

    addCourt = async(req: Request, res: Response): Promise<void> => {
        try{
            const token = req.headers.authorization as string;
            const { name, sportsComplexId } = req.body;
            const newCourt = await this.courtService.addCourt(token, { name, sportsComplexId });
            res.status(201).send({ newCourt });
        }catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message});
        }
    }

    getCourts = async(req: Request, res: Response): Promise<void> => {
        try{
            const token = req.headers.authorization as string;
            const querys = req.query as { name: string };
            const courts = await this.courtService.getCourts(token, querys);
            res.status(200).send({ courts });
        }catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message});
        }
    }

    getCourtById = async(req: Request, res: Response): Promise<void> => {
        try{
            const token = req.headers.authorization as string;
            const { courtId } = req.params;
            const court = await this.courtService.getCourtById(token, courtId);
            res.status(200).send({ court });
        }catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message});
        }
    }
}