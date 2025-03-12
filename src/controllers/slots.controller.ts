import { Request, Response } from 'express';
import { SlotsService } from '../services/slots.service';

export class SlotsController {
    constructor(private slotsService: SlotsService){}   

    addAvailableSlots = async(req: Request, res: Response): Promise<void> => {
        try{
            const token = req.headers.authorization as string;
            const { startTime, endTime, startDate, endDate, price, dayOfWeek, courtId } = req.body;
            await this.slotsService.addAvailableSlot(token, { startTime, endTime, startDate, endDate, price, dayOfWeek, courtId });
            res.status(201).send({ message: 'Horário adionado com sucesso!' });
        }catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message});
        }
    }

    deleteSlot = async (req: Request, res: Response): Promise<void> => {
        try{
            const token = req.headers.authorization as string;
            const { slotId } = req.params;
            await this.slotsService.deleteSlot(token, slotId);
            res.status(200).send({ message: "Horário deletado com sucesso." });
        }catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message});
        }
    }

    alterSlotStatus = async(req: Request, res: Response): Promise<void> => {
        try{
            const token = req.headers.authorization as string;
            const { slotId } = req.params;
            await this.slotsService.alterSlotStatus(token, slotId);
            res.status(200).send({ message: 'status do horário atualizado com sucesso' });
        }catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message });
        }
    }

    getSlotsByCourtId = async(req: Request, res: Response): Promise<void> => {
        try{
            const token = req.headers.authorization as string;
            const { courtId } = req.params;
            const slots = await this.slotsService.getSlotsByCourtId(token, courtId);
            res.status(200).send({ slots });
        }catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message});
        }
    }
}