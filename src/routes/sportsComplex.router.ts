import express from 'express';
import { SportsComplexController } from '../controllers/sportsComplex.controller';
import { SportsComplexService } from '../services/sportsComplex.service';
import SportsComplexRepository from '../repositories/implementations/sportsComplex.repository';
import ValidCnpjService from '../services/validCnpj.service';
import ValidCnpjRepository from '../repositories/implementations/validCnpj.repository';
import { AddressRepository } from '../repositories/implementations/address.repository';

export const sportsComplexRouter = express.Router();

const sportsComplexRepository = new SportsComplexRepository();
const validCnpjRepository = new ValidCnpjRepository();
const addressRepository = new AddressRepository();
const validCnpjBusiness = new ValidCnpjService(validCnpjRepository);
const sportsComplexService = new SportsComplexService(sportsComplexRepository, addressRepository, validCnpjBusiness);
const sportsComplexController = new SportsComplexController(sportsComplexService);

sportsComplexRouter.post('/add/', sportsComplexController.addSportsComplex);