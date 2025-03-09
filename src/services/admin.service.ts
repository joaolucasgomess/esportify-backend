import { IAdminRepository } from '../repositories/interfaces/admin.respository.interface';
import { NewUserAdmin } from '../types/newUserAdmin';
import { CustomError } from '../utils/CustomError';
import { generatedId } from '../utils/idGenerator';
import { Authenticator } from '../utils/Authenticator';
import { HashManager } from '../utils/HashManager';
import { verifyFieldsToObject } from '../utils/VerifyFieldsToObject';
import { validateEmail, validadePassWord } from '../utils/ValidateRegex'  ;
import { IUserRepository } from '../repositories/interfaces/user.repository.interface';
import { Admin } from '../db/schema'

export class AdminService {
    private adminRepository: IAdminRepository;
    private userRepository: IUserRepository;
    private authenticator: Authenticator;
    private hashManager: HashManager;

    constructor(adminRepository: IAdminRepository, userRepository: IUserRepository) {
        this.adminRepository = adminRepository;
        this.userRepository = userRepository;
        this.authenticator = new Authenticator();
        this.hashManager = new HashManager();
    }

    addAdmin = async(newUserAdmin: Omit<NewUserAdmin, "id">): Promise<string> => {
        try{

            if(verifyFieldsToObject(newUserAdmin) === false){
                throw new CustomError('Campos inválidos', 422);
            }  
            
            if(validateEmail.test(newUserAdmin.email) === false){
              throw new CustomError('Email inválido', 422);
            }

            if(validadePassWord.test(newUserAdmin.password) === false){
              throw new CustomError('Senha inválido', 422);
            }

            const userByEmail = await this.userRepository.selectUserByEmail(newUserAdmin.email);

            if(userByEmail){
                throw new CustomError('Email informado já cadastrado em nossa base', 422);
            }

            const id = generatedId();

            const hashedPassword = await this.hashManager.hash(newUserAdmin.password);
            newUserAdmin.password = hashedPassword;

            await this.userRepository.insertUser({ id: id, email: newUserAdmin.email, password: newUserAdmin.password, name: newUserAdmin.name });
            await this.adminRepository.insertAdmin({ id: id, sportsComplexId: newUserAdmin.sportsComplexId });

            const token = this.authenticator.generateToken({ id: id, idSportsComplex: newUserAdmin.sportsComplexId });
            return token;

        }catch(err: any){
            throw new CustomError(err.message, err.statusCode)
        }
    }

    getAdmin = async (token: string): Promise<Admin | undefined> => {
      try{
        if(!token){
          throw new CustomError('Token inexistente', 442);
        }

        const tokenData = this.authenticator.getTokenData(token);

        if(!tokenData){
            throw new CustomError('Token inválido', 401);
        }

        const player = this.adminRepository.selectAdminById(tokenData.id);

        return player;
      }catch(err: any){
        throw new CustomError(err.message, err.statusCode)
      }
    }
}