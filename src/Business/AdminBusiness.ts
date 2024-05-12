import { IAdminData } from '../model/InterfaceAdminData'
import { TypeCreateAdmin } from '../types/TypeCreateAdmin'
import { TypeLoginAdmin } from '../types/TypeLoginAdmin'
import { CustomError } from '../Utils/CustomError'
import { generatedId } from '../services/idGenerator'
import { Authenticator } from '../services/Authenticator'
import { HashManager } from '../services/HashManager'
import { verifyFieldsToObject } from '../Utils/VerifyFieldsToObject'  

export class AdminBusiness {
    private adminData: IAdminData
    private authenticator: Authenticator
    private hashManager: HashManager

    constructor(adminRepository: IAdminData) {
        this.adminData = adminRepository
        this.authenticator = new Authenticator()
        this.hashManager = new HashManager()
    }

    addAdmin = async(newAdmin: TypeCreateAdmin): Promise<string> => {
        try{

            if(verifyFieldsToObject(newAdmin) === false){
                throw new CustomError('Campos inválidos', 422)
            }  

            const adminByEmail = await this.adminData.selectAdminByEmail(newAdmin.email)

            if(adminByEmail){
                throw new CustomError('Email informado já cadastrado em nossa base', 422)
            }

            const id = generatedId()
            const hashedPassword = await this.hashManager.hash(newAdmin.senha)
            newAdmin.senha = hashedPassword
            await this.adminData.insertAdmin(id, newAdmin)
            const token = this.authenticator.generateToken({ id: id, idSportsComplex: newAdmin.id_complexo_esportivo })
            return token

        }catch(err: any){
            throw new CustomError(err.message, err.statusCode)
        }
    }

    login = async(newLoginAdmin: TypeLoginAdmin): Promise<string> => {
        try{
            
            if(verifyFieldsToObject(newLoginAdmin) === false){
                throw new CustomError('Campos inválidos', 422)
            }

            const adminByEmail = await this.adminData.selectAdminByEmail(newLoginAdmin.email)

            if(!adminByEmail){
                throw new CustomError('Usuário ainda não cadastrado', 404)
            }

            if(adminByEmail.id_complexo_esportivo !== newLoginAdmin.id_complexo_esportivo){
                throw new CustomError('Usuário sem vínculo com Complexo Esportivo informado', 403)
            }

            const passwordIsCorrect = await this.hashManager.compare(newLoginAdmin.senha, adminByEmail.senha)

            if(!passwordIsCorrect){
                throw new CustomError('Senha incorreta', 401)
            }

            const token = this.authenticator.generateToken({ id: adminByEmail.id, idSportsComplex: newLoginAdmin.id_complexo_esportivo })
            return token
        }catch(err: any){
            throw new CustomError(err.message, err.statusCode)
        }
    }
}