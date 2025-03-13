import express from 'express';
import { PlayerController } from '../controllers/player.controller';
import { PlayerService } from '../services/player.service';
import PlayerRepository from '../repositories/implementations/player.repository';
import { AuthMiddleware } from '../middlewares/auth.middleware';

const playerRepository = new PlayerRepository();
const playerBusiness = new PlayerService(playerRepository);
const playerController = new PlayerController(playerBusiness);

export const playerRoutes = (authMiddleware: AuthMiddleware) => {
    const router = express.Router();

    router.get('/searchForLoggedIn/', 
        authMiddleware.authenticate, 
        playerController.getPlayer
    );

    return router;
}
