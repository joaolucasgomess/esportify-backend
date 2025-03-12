import { Router } from 'express';
import { sportsComplexRouter } from './sportsComplex.router';
import { adminRouter } from './admin.router';
import { playerRouter } from './player.router';
import { courtRouter } from './court.router';
import { validCnpjRouter } from './validCnpj.router';
import { slotsRouter } from './slots.route';
import { bookingRouter } from './booking.router';
import { userRouter } from './user.router';

export const router = Router();

router.use('/sportsComplex/', sportsComplexRouter);
router.use('/admin/', adminRouter);
router.use('/player/', playerRouter);
router.use('/court/', courtRouter);
router.use('/validCnpj/', validCnpjRouter);
router.use("/slots/", slotsRouter);
router.use("/booking/", bookingRouter);
router.use("/user/", userRouter);