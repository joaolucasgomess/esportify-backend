import { Administrador, Usuario } from '@prisma/client'
import { TypeCreateAdmin } from '../types/TypeCreateAdmin'

export interface IAdminData {
    selectAdminByEmail(email: string):Promise<Usuario>
    insertAdmin(id: string, newAdmin: TypeCreateAdmin): Promise<Administrador>
}