import { Quadra, DiaSemana, HorarioAluguel, DataAluguel } from '@prisma/client'
import { TypeCreateCourt } from '../../types/TypeCreateCourt'
import { TypeCreateTime } from '../../types/TypeCreateTime'
import { TypeRentCourt } from '../../types/TypeRentCourt'
import { Court, NewCourt } from '../../db/schema'

export interface ICourtRepository{
    insertCourt(newCourt: NewCourt): Promise<Court>;
    insertDateRent(id: string, idClient: string, newRent: TypeRentCourt): Promise<void>
    selectCourtById(id: string): Promise<Court>;
    selectCourtByNameAndIdSportsComplex(name: string, idSportsComplex: string): Promise<Court | undefined>;
    selectCourtByIdSportsComplex(idSportsComplex: string): Promise<Quadra[]>
    selectAllCourts(querys: {nome: string, locatario: string}): Promise<Quadra[]>
    selectdayOfTheWeekById(id: string): Promise<DiaSemana>
    selectDateRentByIdTimeAndDateRent(idTime: string, dateRent: string): Promise<DataAluguel>
    selectRentByIdCourt(idCourt: string): Promise<any>
}
