import express from 'express'
import { SportsComplexController } from '../Controller/SportsComplexController'
import { SportsComplexBusiness } from '../Business/SportsComplexBusiness'
import SportsComplexData from '../Data/SportsComplexData'
import ValidCnpjBusiness from '../Business/ValidCnpjBusiness'
import ValidCnpjData from '../Data/ValidCnpjData'

export const sportsComplexRouter = express.Router()

const sportsComplexData = new SportsComplexData()
const validCnpjData = new ValidCnpjData()
const validCnpjBusiness = new ValidCnpjBusiness(validCnpjData)
const sportsComplexBusiness = new SportsComplexBusiness(sportsComplexData, validCnpjBusiness)
const sportsComplexController = new SportsComplexController(sportsComplexBusiness)

sportsComplexRouter.post('/add/', sportsComplexController.addSportsComplex)