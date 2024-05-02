import express from 'express'
import { AdminController } from '../Controller/AdminController'  
import { AdminBusiness } from '../Business/AdminBusiness' 
import AdminData from '../Data/AdminData'

export const adminRouter = express.Router()

const adminData = new AdminData()
const adminBusiness = new AdminBusiness(adminData)
const adminController = new AdminController(adminBusiness)

adminRouter.post('/singup/', adminController.addAdmin)