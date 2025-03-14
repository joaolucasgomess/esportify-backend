import { ISportsComplexRepository } from "../interfaces/sportsComplex.repository.interface";
import {
	NewSportsComplex,
	SportsComplex,
	sportsComplexes,
} from "../../db/schema";
import { db } from "../../db";
import { eq } from "drizzle-orm";

export default class SportsComplexRepository
	implements ISportsComplexRepository
{
	insertSportsComplex = async (
		newSportsComplex: NewSportsComplex,
	): Promise<SportsComplex> => {
		const [response] = await db
			.insert(sportsComplexes)
			.values(newSportsComplex)
			.returning();
		return response;
	};

	async selectSportsComplexById(
		id: string,
	): Promise<SportsComplex | undefined> {
		const [response] = await db
			.select()
			.from(sportsComplexes)
			.where(eq(sportsComplexes.id, id));
		return response;
	}
}
