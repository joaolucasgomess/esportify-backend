import express from 'express'
import { AdminController } from '../controllers/admin.controller'  
import { AdminService } from '../services/admin.service' 
import { AdminRepository } from '../repositories/implementations/admin.repository'
import { UserRepository } from '../repositories/implementations/user.repository'

export const adminRouter = express.Router();

const adminRepository = new AdminRepository();
const userRepository = new UserRepository();
const adminService = new AdminService(adminRepository, userRepository);
const adminController = new AdminController(adminService);

adminRouter.post('/singup/', adminController.addAdmin);
adminRouter.post('/login/', adminController.login);
adminRouter.get('/buscar-logado', adminController.getAdmin);