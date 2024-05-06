import { Quadra, DiaSemana, HorarioAluguel, DataAluguel } from '@prisma/client'
import { TypeCreateCourt } from '../types/TypeCreateCourt'
import { TypeCreateTime } from '../types/TypeCreateTime'
import { TypeRentCourt } from '../types/TypeRentCourt'

export interface ICourtData{
    selectCourtByNameAndIdSportsComplex(name: string, idSportsComplex: string): Promise<Quadra>
    insertCourt(id: string, newCourt: TypeCreateCourt): Promise<Quadra>
    selectdayOfTheWeekById(id: string): Promise<DiaSemana>
    selectCourtById(id: string): Promise<Quadra>
    insertTime(id: string, newTime: TypeCreateTime): Promise<HorarioAluguel>
    selectTimeByIdCourtAndInitialTime(id: string, insertTime: Date): Promise<HorarioAluguel>
    selectTimeById(id: string): Promise<HorarioAluguel>
    selectDateRentByIdTime(id: string): Promise<DataAluguel>
    insertDateRent(id: string, newRent: TypeRentCourt): Promise<DataAluguel>
}