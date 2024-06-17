import { Administrador } from '@prisma/client'
import { TypeCreateAdmin } from '../types/TypeCreateAdmin'

export interface IAdminData {
    selectAdminByEmail(email: string):Promise<any>
    insertAdmin(id: string, newAdmin: TypeCreateAdmin): Promise<Administrador>
    selectAdminById(id: string): Promise<any>
}