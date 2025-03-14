import express from "express";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/user.service";
import { UserRepository } from "../repositories/implementations/user.repository";
import { AdminRepository } from "../repositories/implementations/admin.repository";
import PlayerRepository from "../repositories/implementations/player.repository";
import SportsComplexRepository from "../repositories/implementations/sportsComplex.repository";

const userRepository = new UserRepository();
const adminRepository = new AdminRepository();
const playerRepository = new PlayerRepository();
const sportsComplexRepository = new SportsComplexRepository();
const userService = new UserService(
	userRepository,
	adminRepository,
	playerRepository,
	sportsComplexRepository,
);
const userController = new UserController(userService);

export const userRoutes = () => {
	const router = express.Router();

	router.post("/login/", userController.login);

	return router;
};
