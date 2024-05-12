import { Cliente, Usuario } from '@prisma/client'
import { TypeCreatePlayer } from '../types/TypeCreatePlayer'

export interface IPlayerData {
    selectPlayerByEmail(email: string): Promise<Usuario>
    insertPlayer(id: string, newPlayer: TypeCreatePlayer): Promise<Cliente>
}