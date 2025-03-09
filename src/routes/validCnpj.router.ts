import express from 'express';
import ValidCnpjController from '../controllers/validCnpj.controller'
import ValidCnpjService from '../services/validCnpj.service';
import ValidCnpjRepository from '../repositories/implementations/validCnpj.repository';

export const validCnpjRouter = express.Router();

const validCnpjRepository = new ValidCnpjRepository();
const validCnpjService = new ValidCnpjService(validCnpjRepository);
const validCnpjController = new ValidCnpjController(validCnpjService);

validCnpjRouter.get('/:cnpj', validCnpjController.validCnpj);