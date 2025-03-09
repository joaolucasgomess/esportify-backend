import { Quadra, DiaSemana, HorarioAluguel, DataAluguel } from '@prisma/client'
import { TypeCreateCourt } from '../../types/TypeCreateCourt'
import { TypeCreateTime } from '../../types/TypeCreateTime'
import { TypeRentCourt } from '../../types/TypeRentCourt'
import { Court, NewCourt } from '../../db/schema'

export interface ICourtRepository{
    insertCourt(newCourt: NewCourt): Promise<Court>;
    insertTime(id: string, newTime: TypeCreateTime): Promise<void>
    insertDateRent(id: string, idClient: string, newRent: TypeRentCourt): Promise<void>
    updateTime(time: HorarioAluguel): Promise<HorarioAluguel>
    selectCourtById(id: string): Promise<Quadra>
    selectCourtByNameAndIdSportsComplex(name: string, idSportsComplex: string): Promise<Court | undefined>;
    selectCourtByIdSportsComplex(idSportsComplex: string): Promise<Quadra[]>
    selectAllCourts(querys: {nome: string, locatario: string}): Promise<Quadra[]>
    selectdayOfTheWeekById(id: string): Promise<DiaSemana>
    selectTimeById(id: string): Promise<HorarioAluguel>
    selectTimeByIdCourtAndInitialTimeAndIdDayOfTheWeek(id: string, insertTime: string, idDayOfTheWeek: string): Promise<HorarioAluguel>
    selectTimeByIdCourt(idCourt: string): Promise<HorarioAluguel[]>
    selectDateRentByIdTimeAndDateRent(idTime: string, dateRent: string): Promise<DataAluguel>
    selectRentByIdCourt(idCourt: string): Promise<any>
}
