import express from 'express'
import { PlayerController } from '../controllers/player.controller'
import { PlayerService } from '../services/player.service'
import PlayerRepository from '../repositories/implementations/player.repository'

export const playerRouter = express.Router()

const playerRepository = new PlayerRepository()
const playerBusiness = new PlayerService(playerRepository)
const playerController = new PlayerController(playerBusiness)

playerRouter.post('/singup/', playerController.singup)
playerRouter.post('/login/', playerController.login)
playerRouter.get('/buscar-logado', playerController.getPlayer)