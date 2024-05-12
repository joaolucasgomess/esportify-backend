import express from 'express'
import { SportsComplexController } from '../Controller/SportsComplexController'
import { SportsComplexBusiness } from '../Business/SportsComplexBusiness'
import SportsComplexData from '../Data/SportsComplexData'

export const sportsComplexRouter = express.Router()

const sportsComplexData = new SportsComplexData()
const sportsComplexBusiness = new SportsComplexBusiness(sportsComplexData)
const sportsComplexController = new SportsComplexController(sportsComplexBusiness)

sportsComplexRouter.post('/add/', sportsComplexController.addSportsComplex)