import { Router } from 'express';
import { sportsComplexRoutes } from './sportsComplex.router';
import { adminRoutes } from './admin.router';
import { playerRoutes } from './player.router';
import { courtRoutes } from './court.router';
import { validCnpjRouter } from './validCnpj.router';
import { slotsRoutes } from './slots.route';
import { bookingRoutes } from './booking.router';
import { userRoutes } from './user.router';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { UserRepository } from '../repositories/implementations/user.repository';
import { AdminRepository } from '../repositories/implementations/admin.repository';

export const router = Router();

const userRepository = new UserRepository();
const adminRepository = new AdminRepository();
const authMiddleware = new AuthMiddleware(userRepository, adminRepository);

router.use('/sportsComplex/', sportsComplexRoutes());
router.use('/admin/', adminRoutes(authMiddleware));
router.use('/player/', playerRoutes(authMiddleware));
router.use('/court/', courtRoutes(authMiddleware));
router.use('/validCnpj/', validCnpjRouter);
router.use("/slots/", slotsRoutes(authMiddleware));
router.use("/booking/", bookingRoutes(authMiddleware));
router.use("/user/", userRoutes());