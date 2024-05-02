import * as jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export class Authenticator {

    generateToken = (payload: AuthenticationData): string => {
        return jwt.sign(payload, process.env.JWT_KEY as string, {
            expiresIn: "59min"
        })
    }

    getTokenData = (token: string): AuthenticationData => {
        try{
            const decoded = jwt.verify(token, process.env.JWT_KEY as string)
            return decoded as AuthenticationData
        } catch(e: any) {
            if(e.message.includes('jwt expired')){
                throw new Error('Token expired')
            }
            throw new Error(e.message)
        }
    }
}

export interface AuthenticationData {
    id: string
}