import { IPlayerData } from '../model/InterfacePlayerData'
import { TypeCreatePlayer } from '../types/TypeCreatePlayer'
import { PrismaClient, Cliente, Usuario } from '@prisma/client'

export default class PlayerData implements IPlayerData {
    prisma = new PrismaClient()

    selectPlayerByEmail = async(email: string): Promise<Usuario> => {
        try{
            const player = await this.prisma.usuario.findUnique({
                where: {
                    email: email
                }
            })
            return player
        }catch(err: any){
            throw new Error(err.slqMessage || err.message)
        }    
    }

    insertPlayer = async(id: string, newPlayer: TypeCreatePlayer): Promise<Cliente> => {
        try{
            const [user, player] = await this.prisma.$transaction([
                this.prisma.usuario.create({
                    data: {
                        id: id,
                        email: newPlayer.email,
                        nome: newPlayer.nome,
                        senha: newPlayer.senha              
                    }
                }),
                this.prisma.cliente.create({
                    data: {
                        id: id,
                        telefone: newPlayer.telefone,
                        id_usuario: id

                    }
                })
            ])
            return player
        }catch(err: any){
            throw new Error(err.slqMessage || err.message)
        }
    }

    selectPlayerById = async(id: string): Promise<any> => {
      try{
        const player = await this.prisma.usuario.findUnique({
          where: {
              id: id
          },
          select: {
            email: true,
            nome: true
          }
      })
      return player
      }catch(err: any){
        throw new Error(err.slqMessage || err.message)
      }
    }    
}