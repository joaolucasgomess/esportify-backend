import { IAdminData } from '../model/InterfaceAdminData'
import { TypeCreateAdmin } from '../types/TypeCreateAdmin'
import { CustomError } from '../Utils/CustomError'
import { generatedId } from '../services/idGenerator'
import { Authenticator } from '../services/Authenticator'
import { HashManager } from '../services/HashManager'

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

            const { email, senha, nome, id_complexo_esportivo } = newAdmin

            if(!email || !senha || !nome || !id_complexo_esportivo){
                throw new CustomError('Campos inválidos', 422)
            }   

            const adminByEmail = await this.adminData.selectAdminByEmail(email)
            console.log(adminByEmail)

            if(!adminByEmail){
                throw new CustomError('Email informado já cadastrado em nossa base', 422)
            }

            const id = generatedId()
            const hashedPassword = await this.hashManager.hash(senha)
            newAdmin.senha = hashedPassword
            await this.adminData.insertAdmin(id, newAdmin)
            const token = this.authenticator.generateToken({ id })
            return token

        }catch(err: any){
            throw new CustomError(err.statusCode, err.message)
        }
    }
}