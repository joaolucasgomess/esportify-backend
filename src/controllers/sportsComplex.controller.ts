import { Request, Response } from "express";
import { SportsComplexService } from "../services/sportsComplex.service";

export class SportsComplexController {
	constructor(private sportsComplexService: SportsComplexService) {}

	addSportsComplex = async (req: Request, res: Response): Promise<void> => {
		try {
			const {
				cnpj,
				name,
				street,
				neighborhood,
				city,
				state,
				number,
				zipCode,
				complement,
			} = req.body;
			const newSportsComplex =
				await this.sportsComplexService.addSportsComplex({
					cnpj,
					name,
					street,
					neighborhood,
					city,
					state,
					number,
					zipCode,
					complement,
				});

			res.status(201).send({ newSportsComplex });
		} catch (err: any) {
			res.status(err.statusCode || 400).send({ error: err.message });
		}
	};
}
