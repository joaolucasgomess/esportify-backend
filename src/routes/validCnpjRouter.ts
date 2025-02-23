import express from 'express'
import ValidCnpjController from '../Controller/ValidCnpjController'
import ValidCnpjBusiness from '../Business/ValidCnpjBusiness'
import ValidCnpjData from '../Data/ValidCnpjData'

export const validCnpjRouter = express.Router()

const validCnpjData = new ValidCnpjData()
const validCnpjBusiness = new ValidCnpjBusiness(validCnpjData)
const validCnpjController = new ValidCnpjController(validCnpjBusiness)

validCnpjRouter.get('/:cnpj', validCnpjController.validCnpj)
