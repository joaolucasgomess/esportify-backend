import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export class Authenticator {

    generateToken = (payload: AuthenticationData): string => {
        return jwt.sign(payload, process.env.JWT_KEY as string, {
            expiresIn: "59min"
        });
    }
}

export interface AuthenticationData {
    id: string,
    idSportsComplex?: string
}