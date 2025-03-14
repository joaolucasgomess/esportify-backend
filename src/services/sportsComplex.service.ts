import { ISportsComplexRepository } from "../repositories/interfaces/sportsComplex.repository.interface";
import { NewSportsComplexWithAddress } from "../types/newSportsComplexWithAddress";
import { CustomError } from "../utils/CustomError";
// import { verifyFieldsToObject } from "../utils/VerifyFieldsToObject"; // TODO
import { generatedId } from "../utils/idGenerator";
import ValidCnpjBusiness from "./validCnpj.service";
import { SportsComplex } from "../db/schema";
import { IAddressRepository } from "../repositories/interfaces/address.repository.interface";

export class SportsComplexService {
    private sportsComplexRepository: ISportsComplexRepository;
    private validCnpjBusiness: ValidCnpjBusiness;
    private addressRepository: IAddressRepository;

    constructor(
        sportsComplexRepository: ISportsComplexRepository,
        addressRepository: IAddressRepository,
        validCnpjBusiness: ValidCnpjBusiness,
    ) {
        this.sportsComplexRepository = sportsComplexRepository;
        this.addressRepository = addressRepository;
        this.validCnpjBusiness = validCnpjBusiness;
    }

    addSportsComplex = async (
        newSportsComplex: NewSportsComplexWithAddress,
    ): Promise<SportsComplex> => {
        try {
            // if(verifyFieldsToObject(newSportsComplex) === false){
            //     throw new CustomError('Campos inválidos', 422)
            // }

            newSportsComplex.number = Number(newSportsComplex.number);

            const validCnpj = await this.validCnpjBusiness.validCnpj(
                newSportsComplex.cnpj,
            );

            if (!validCnpj) {
                throw new CustomError(
                    "Cnpj informado ainda não possui acesso ao nosso sistema ou já esta cadastrado",
                    403,
                );
            }

            const addressId = generatedId();

            const address = await this.addressRepository.insertAddress({
                id: addressId,
                number: newSportsComplex.number,
                street: newSportsComplex.street,
                neighborhood: newSportsComplex.neighborhood,
                city: newSportsComplex.city,
                state: newSportsComplex.state,
                zipCode: newSportsComplex.zipCode,
            });

            const sportsComplexId = generatedId();

            const sportsComplex = await this.sportsComplexRepository.insertSportsComplex({
                id: sportsComplexId,
                name: newSportsComplex.name,
                cnpj: newSportsComplex.cnpj,
                addressId: address.id,
            });

            return sportsComplex;
        } catch (err: any) {
            throw new CustomError(err.message, err.statusCode);
        }
    };
}
