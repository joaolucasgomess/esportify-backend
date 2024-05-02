import { IAdminData } from '../model/InterfaceAdminData'
import { TypeCreateAdmin } from '../types/TypeCreateAdmin'
import { PrismaClient, Adiministador, Usuario } from '@prisma/client'

export default class AdminData implements IAdminData {
    prisma = new PrismaClient()

    selectAdminByEmail = async (email: string): Promise<Usuario> => {
        try{
            const admin = await this.prisma.usuario.findFirstOrThrow({
                where: {
                    email: email
                }
            })
            return admin
        }catch(err){
            throw new Error(err.slqMessage || err.message)
        }
    }

    insertAdmin = async(id: string, newAdmin: TypeCreateAdmin): Promise<Adiministador> => {
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
                this.prisma.adiministador.create({
                    data: {
                        id: id,
                        id_complexo_esportivo: newAdmin.id_complexo_esportivo,
                        id_usuario: id
                    }
                })
            ])
            return admin
        }catch(err){
            throw new Error(err.slqMessage || err.message)
        }
    }

}