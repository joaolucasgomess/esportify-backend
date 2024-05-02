import { IAdminData } from '../model/InterfaceAdminData'
import { TypeCreateAdmin } from '../types/TypeCreateAdmin'
import { PrismaClient, Administrador, Usuario } from '@prisma/client'

export default class AdminData implements IAdminData {
    prisma = new PrismaClient()

    selectAdminByEmail = async (email: string): Promise<Usuario> => {
        try{
            const admin = await this.prisma.usuario.findUniqueOrThrow({
                where: {
                    email: email
                }
            })
            return admin
        }catch(err: any){
            throw new Error(err.slqMessage || err.message)
        }
    }

    insertAdmin = async(id: string, newAdmin: TypeCreateAdmin): Promise<Administrador> => {
        try{
            const [user, admin] = await this.prisma.$transaction([
                this.prisma.usuario.create({
                    data: {
                        id: id,
                        email: newAdmin.email,
                        nome: newAdmin.nome,
                        senha: newAdmin.senha              
                    }
                }),
                this.prisma.administrador.create({
                    data: {
                        id: id,
                        id_complexo_esportivo: newAdmin.id_complexo_esportivo,
                        id_usuario: id
                    }
                })
            ])
            return admin
        }catch(err: any){
            throw new Error(err.slqMessage || err.message)
        }
    }

}