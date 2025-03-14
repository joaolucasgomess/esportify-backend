import { Request, Response } from "express";
import { AdminService } from "../services/admin.service";

export class AdminController {
	constructor(private adminService: AdminService) {}

	addAdmin = async (req: Request, res: Response): Promise<void> => {
		try {
			const { name, email, password, sportsComplexId } = req.body;
			const token = await this.adminService.addAdmin({
				name,
				email,
				password,
				sportsComplexId,
			});
			res.status(201).send({ token });
		} catch (err: any) {
			res.status(err.statusCode || 400).send({ error: err.message });
		}
	};

	getAdmin = async (req: Request, res: Response): Promise<void> => {
		try {
			const admin = await this.adminService.getAdmin(
				req.authenticatedUser.userId,
			);
			res.status(200).send({ admin });
		} catch (err: any) {
			res.status(err.statusCode || 400).send({ error: err.message });
		}
	};
}
