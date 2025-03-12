import { Request, Response } from 'express';
import { CourtService } from '../services/court.service';

export class CourtController {  
    constructor(private courtService: CourtService){}

    addCourt = async(req: Request, res: Response): Promise<void> => {
        try{
            const { name, sportsComplexId } = req.body;
            const newCourt = await this.courtService.addCourt({ name, sportsComplexId });
            res.status(201).send({ newCourt });
        }catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message});
        }
    }

    getCourts = async(req: Request, res: Response): Promise<void> => {
        try{
            const querys = req.query as { name: string };
            const courts = await this.courtService.getCourts(querys, req.authenticatedUser.sportsComplexId);
            res.status(200).send({ courts });
        }catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message});
        }
    }

    getCourtById = async(req: Request, res: Response): Promise<void> => {
        try{
            const { courtId } = req.params;
            const court = await this.courtService.getCourtById(courtId, req.authenticatedUser.sportsComplexId);
            res.status(200).send({ court });
        }catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message});
        }
    }
}