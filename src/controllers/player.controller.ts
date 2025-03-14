import { Request, Response } from "express";
import { PlayerService } from "../services/player.service";

export class PlayerController {
    constructor(private playerService: PlayerService) {}

    getPlayer = async (req: Request, res: Response) => {
        try {
            const player = await this.playerService.getPlayer(
                req.authenticatedUser.userId,
            );
            res.status(200).send({ player });
        } catch (err: any) {
            res.status(err.statusCode || 400).send({ error: err.message });
        }
    };
}
