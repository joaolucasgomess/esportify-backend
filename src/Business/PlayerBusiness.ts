import { IPlayerData } from '../model/InterfacePlayerData'
import { CustomError } from '../Utils/CustomError'
import { generatedId } from '../services/idGenerator'
import { Authenticator } from '../services/Authenticator'
import { HashManager } from '../services/HashManager'
import { verifyFieldsToObject } from '../Utils/VerifyFieldsToObject' 
import { TypeCreatePlayer } from '../types/TypeCreatePlayer'
import { TypeLoginPlayer } from '../types/TypeLoginPlayer'
import { validadePassWord, validateEmail } from '../Utils/ValidateRegex'

export class PlayerBusiness {
    private playerData: IPlayerData
    private authenticator: Authenticator
    private hashManager: HashManager

    constructor(playerRepository: IPlayerData){
        this.playerData = playerRepository
        this.authenticator = new Authenticator()
        this.hashManager = new HashManager()
    }

    singup = async (newPlayer: TypeCreatePlayer): Promise<string> => {
        try{
            if(verifyFieldsToObject(newPlayer) === false){
                throw new CustomError('Campos inválidos', 422)
            }

            const playerByEmail = await this.playerData.selectPlayerByEmail(newPlayer.email)

            if(playerByEmail){
                throw new CustomError('Email já cadastrado', 422)   
            }

            if(validateEmail.test(newPlayer.email) === false){
              throw new CustomError('Email inválido', 422)
            }

            if(validadePassWord.test(newPlayer.senha) === false){
              throw new CustomError('Senha inválido', 422)
            }

            //TODO testar se a idade é >= 18 anos
            //TODO testar se o telefone existe na base dados

            const id = generatedId()
            const hashedPassword = await this.hashManager.hash(newPlayer.senha)
            newPlayer.senha = hashedPassword
            await this.playerData.insertPlayer(id, newPlayer)
            const token = this.authenticator.generateToken({ id })

            return token
        }catch(err: any){
            throw new CustomError(err.message, err.statusCode)
        } 
    }

    login = async (newLoginPlayer: TypeLoginPlayer): Promise<string> => {
        try{
            if(verifyFieldsToObject(newLoginPlayer) === false){
                throw new CustomError('Campos inválidos', 422)
            }

            const playerByEmail = await this.playerData.selectPlayerByEmail(newLoginPlayer.email)

            if(!playerByEmail){
                throw new CustomError('Usuário ainda não cadastrado', 404)
            }

            const passwordIsCorrect = await this.hashManager.compare(newLoginPlayer.senha, playerByEmail.senha)

            if(!passwordIsCorrect){
                throw new CustomError('Senha incorreta', 401)
            }
            const token = this.authenticator.generateToken({ id: playerByEmail.id })
            return token

        }catch(err: any){
            throw new CustomError(err.message, err.statusCode)
        }
    }

    getPlayer = async (token: string) => {
      try{
        if(!token){
          throw new CustomError('Token inexistente', 442)
        }

        const tokenData = this.authenticator.getTokenData(token)

        if(!tokenData){
            throw new CustomError('Token inválido', 401)
        }

        const player = this.playerData.selectPlayerById(tokenData.id)

        return player
      }catch(err: any){
        throw new CustomError(err.message, err.statusCode)
      }
    }
}   