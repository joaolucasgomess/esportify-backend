import { Authenticator } from './Authenticator'
import { CustomError } from './CustomError'

export function verifyToken(token: string): CustomError| true{
    const auth = new Authenticator()

    if(!token){
        return  new CustomError('Token inexistente', 442)
    }

    const tokenData = this.authenticator.getTokenData(token)

    if(!tokenData){
        return new CustomError('Token inválido', 401)
    }

    return true
}