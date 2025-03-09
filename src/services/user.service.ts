import { CustomError } from '../utils/CustomError';
import { verifyFieldsToObject } from '../utils/VerifyFieldsToObject';
import { UserLogin } from "../types/userLogin";
import { IUserRepository } from "../repositories/interfaces/user.repository.interface";
import { HashManager } from "../utils/HashManager";
import { IAdminRepository } from '../repositories/interfaces/admin.respository.interface';
import { ISportsComplexRepository } from '../repositories/interfaces/sportsComplex.repository.interface';
import { Authenticator } from '../utils/Authenticator';
import { IPlayerRepository } from '../repositories/interfaces/player.repository.interface';

export class UserService{
  private userRepository: IUserRepository;
  private adminRepository: IAdminRepository;
  private playerRepository: IPlayerRepository;
  private sportsComplexRepository: ISportsComplexRepository;
  private hashManager: HashManager;
  private authenticator: Authenticator;

  constructor(userRepository: IUserRepository, adminRepository: IAdminRepository, playerRepository: IPlayerRepository, sportsComplexRepository: ISportsComplexRepository){
    this.userRepository = userRepository;
    this.adminRepository = adminRepository;
    this.sportsComplexRepository = sportsComplexRepository;
    this.playerRepository = playerRepository;
    this.hashManager = new HashManager();
    this.authenticator = new Authenticator();
  }

    login = async(userLogin: UserLogin): Promise<string> => {
        try{
            
            if(verifyFieldsToObject(userLogin) === false){
                throw new CustomError('Campos inválidos', 422);
            }

            const userByEmail = await this.userRepository.selectUserByEmail(userLogin.email);

            if(!userByEmail){
                throw new CustomError('Usuário ainda não cadastrado', 404);
            }

            const adminById = await this.adminRepository.selectAdminById(userByEmail.id);

            if(adminById){
              if(!userLogin.sportsComplexId.trim()){
                throw new CustomError("Infome a unidade.", 403);
              }

              const sportsComplexById = await this.sportsComplexRepository.selectSportsComplexById(adminById.sportsComplexId);

              if(!sportsComplexById || (sportsComplexById.id !== userLogin.sportsComplexId)){
                throw new CustomError("sportsComplexId inválido.", 401);
              }

              const passwordIsCorrect = await this.hashManager.compare(userLogin.password, userByEmail.password);

              if(!passwordIsCorrect){
                  throw new CustomError('Senha incorreta', 401);
              }

              const token = this.authenticator.generateToken({ id: userByEmail.id, idSportsComplex: adminById.sportsComplexId });
              return token;
            }

            const playerById = await this.playerRepository.selectPlayerById(userByEmail.id);

            if(playerById){
              if(userLogin.sportsComplexId.trim()){
                throw new CustomError("Voce precisa ser administrador para acessar essa area.", 403);
              }

              const passwordIsCorrect = await this.hashManager.compare(userLogin.password, userByEmail.password);

              if(!passwordIsCorrect){
                  throw new CustomError('Senha incorreta', 401);
              }

              const token = this.authenticator.generateToken({ id: userByEmail.id });
              return token;
            }

            throw new CustomError("Erro inesperado", 400);

        }catch(err: any){
            throw new CustomError(err.message, err.statusCode);
        }
    }
}