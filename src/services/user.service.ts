import { CustomError } from "../utils/CustomError";
import { verifyFieldsToObject } from "../utils/VerifyFieldsToObject";
import { UserLogin } from "../types/userLogin";
import { IUserRepository } from "../repositories/interfaces/user.repository.interface";
import { HashManager } from "../utils/HashManager";
import { IAdminRepository } from "../repositories/interfaces/admin.respository.interface";
import { ISportsComplexRepository } from "../repositories/interfaces/sportsComplex.repository.interface";
import { Authenticator } from "../utils/Authenticator";
import { IPlayerRepository } from "../repositories/interfaces/player.repository.interface";
import { User } from "../db/schema";

export class UserService {
    private userRepository: IUserRepository;
    private adminRepository: IAdminRepository;
    private playerRepository: IPlayerRepository;
    private sportsComplexRepository: ISportsComplexRepository;
    private hashManager: HashManager;
    private authenticator: Authenticator;

    constructor(
        userRepository: IUserRepository,
        adminRepository: IAdminRepository,
        playerRepository: IPlayerRepository,
        sportsComplexRepository: ISportsComplexRepository,
    ) {
        this.userRepository = userRepository;
        this.adminRepository = adminRepository;
        this.sportsComplexRepository = sportsComplexRepository;
        this.playerRepository = playerRepository;
        this.hashManager = new HashManager();
        this.authenticator = new Authenticator();
    }

    login = async (userLogin: UserLogin): Promise<string> => {
        try {
            if (verifyFieldsToObject(userLogin) === false) {
                throw new CustomError("Campos inválidos", 422);
            }

            const userByEmail = await this.userRepository.selectUserByEmail(
                userLogin.email,
            );

            if (!userByEmail) {
                throw new CustomError("Usuário ainda não cadastrado", 404);
            }

            const passwordIsCorrect = await this.hashManager.compare(
                userLogin.password,
                userByEmail.password,
            );

            if (!passwordIsCorrect) {
                throw new CustomError("Senha incorreta", 401);
            }

            const token = this.authenticator.generateToken({
                userId: userByEmail.id,
            });
            return token;
        } catch (err: any) {
            throw new CustomError(err.message, err.statusCode);
        }
    };

    getUserById = async (id: string): Promise<Omit<User, "password">> => {
        try {
            if (!id) {
                throw new CustomError("userId required", 422);
            }

            return await this.userRepository.selectUserById(id);
        } catch (err: any) {
            throw new CustomError(err.message, err.statusCode);
        }
    };
}
