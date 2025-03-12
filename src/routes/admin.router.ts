import express from 'express';
import { AdminController } from '../controllers/admin.controller';
import { AdminService } from '../services/admin.service';
import { AdminRepository } from '../repositories/implementations/admin.repository';
import { UserRepository } from '../repositories/implementations/user.repository';
import { AuthMiddleware } from '../middlewares/auth.middleware';

const adminRepository = new AdminRepository();
const userRepository = new UserRepository();
const adminService = new AdminService(adminRepository, userRepository);
const adminController = new AdminController(adminService);

export const adminRoutes = (authMiddleware: AuthMiddleware) => {

    const router = express.Router();

    router.post('/singup/', adminController.addAdmin);

    router.get('/searchForLoggedIn/', authMiddleware.authenticate, adminController.getAdmin);

    return router;
}