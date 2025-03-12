import { Quadra, DiaSemana, HorarioAluguel, DataAluguel } from '@prisma/client'
import { TypeCreateCourt } from '../../types/TypeCreateCourt'
import { TypeCreateTime } from '../../types/TypeCreateTime'
import { TypeRentCourt } from '../../types/TypeRentCourt'
import { Court, NewCourt } from '../../db/schema'

export interface ICourtRepository{
    insertCourt(newCourt: NewCourt): Promise<Court>;
    selectCourtById(id: string): Promise<Court | undefined>;
    selectCourtByNameAndSportsComplexId(name: string, sportsComplexId: string): Promise<Court | undefined>;
    selectCourtBySportsComplexId(SportsComplexId: string): Promise<Court[]>;
    selectAllCourts(querys: { name: string }): Promise<Court[]>;
}
