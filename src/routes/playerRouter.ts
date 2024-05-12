import express from 'express'
import { PlayerController } from '../Controller/PlayerController'
import { PlayerBusiness } from '../Business/PlayerBusiness'
import PlayerData from '../Data/PlayerData'

export const playerRouter = express.Router()

const playerData = new PlayerData()
const playerBusiness = new PlayerBusiness(playerData)
const playerController = new PlayerController(playerBusiness)

playerRouter.post('/singup/', playerController.singup)
playerRouter.post('/login/', playerController.login)