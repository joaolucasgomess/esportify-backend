import { IPlayerRepository } from "../repositories/interfaces/player.repository.interface";
import { CustomError } from "../utils/CustomError";
import { Client } from "../db/schema";

export class PlayerService {
	private playerRepository: IPlayerRepository;

	constructor(playerRepository: IPlayerRepository) {
		this.playerRepository = playerRepository;
	}

	getPlayer = async (id: string): Promise<Client | undefined> => {
		try {
			return await this.playerRepository.selectPlayerById(id);
		} catch (err: any) {
			throw new CustomError(err.message, err.statusCode);
		}
	};

	async getPlayerById(id: string): Promise<Client | undefined> {
		try {
			if (!id) {
				throw new CustomError("id required.", 422);
			}

			return await this.playerRepository.selectPlayerById(id);
		} catch (err: any) {
			throw new CustomError(err.message, err.statusCode);
		}
	}
}
