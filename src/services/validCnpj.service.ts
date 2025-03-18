import { IValidCnpjRepository } from "../repositories/interfaces/validCnpj.repository.interface";
import { CustomError } from "../utils/CustomError";

export default class ValidCnpjService {
    private validCnpjRepository: IValidCnpjRepository;

    constructor(validCnpjRepository: IValidCnpjRepository) {
        this.validCnpjRepository = validCnpjRepository;
    }

    validCnpj = async (cnpj: string): Promise<boolean> => {
        try {
            if (cnpj.length !== 14) {
                throw new CustomError("Tamanho da string não representa um CNPJ.", 422);
            }

            const cnpjInNumber = Number(cnpj);

            if (Number.isNaN(cnpjInNumber)) {
                throw new CustomError(
                    "CNPJ contem algum caracter que não é um número.",
                    400,
                );
            }

            const cnpjValid = await this.validCnpjRepository.selectCnpjByCnpj(cnpj);

            if (!cnpjValid) {
                throw new CustomError("Cnpj não encontrado", 404);
            }

            if (cnpjValid.active && !cnpjValid.registered) {
                return true;
            }

            return false;
        } catch (err: any) {
            throw new CustomError(err.message, err.statusCode);
        }
    };
}
