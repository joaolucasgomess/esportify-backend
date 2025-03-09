import { Router } from 'express';
import { sportsComplexRouter } from './sportsComplex.router';
import { adminRouter } from './admin.router';
import { playerRouter } from './player.router';
import { courtRouter } from './court.router';
import { validCnpjRouter } from './validCnpj.router';

export const router = Router();

router.use('/complexo-esportivo/', sportsComplexRouter);
router.use('/administrador/', adminRouter);
router.use('/jogador/', playerRouter);
router.use('/quadra/', courtRouter);
router.use('/valid-cnpj/', validCnpjRouter);