import { PrismaClient, Quadra, HorarioAluguel, DataAluguel, DiaSemana } from '@prisma/client'
import { ICourtData } from '../model/InterfaceCourtData'
import { TypeCreateCourt } from '../types/TypeCreateCourt'
import { TypeCreateTime } from '../types/TypeCreateTime'
import { TypeRentCourt } from '../types/TypeRentCourt' 

export default class CourtData implements ICourtData{
    prisma = new PrismaClient()

    insertCourt = async(id: string, newCourt: TypeCreateCourt): Promise<Quadra> => {
        try{
            const court = await this.prisma.quadra.create({
                data: {
                    id: id,
                    nome: newCourt.nome,
                    id_complexo_esportivo: newCourt.id_complexo_esportivo
                }
            })

            return court
        }catch(err: any){
            throw new Error(err.slqMessage || err.message)
        }
    }

    insertTime = async(id: string, newTime: TypeCreateTime): Promise<void> => {
        try{
            await this.prisma.$queryRaw`
                INSERT INTO horario_aluguel
                    VALUES(
                        ${id},
                        CAST(${newTime.horario_inicial} AS TIME),
                        CAST(${newTime.horario_final} AS TIME),
                        ${newTime.preco},
                        'ATIVO',
                        now(),
                        now(),
                        ${newTime.id_dia_semana},
                        ${newTime.id_quadra}
                    )
            `
        }catch(err: any){
            throw new Error(err.slqMessage || err.message)
        }
    }

    insertDateRent = async(id: string, idClient: string, newRent: TypeRentCourt): Promise<void> => {
        try{
            await this.prisma.$queryRaw`
                INSERT INTO data_aluguel
                    VALUES(
                        ${id},
                        CAST (${newRent.data} AS DATE),
                        now(),
                        now(),
                        ${newRent.id_horario},
                        ${idClient}
                    )
            `
        }catch(err: any){
            throw new Error(err.slqMessage || err.message)
        }
    }

    deleteTime = async(idTime: string): Promise<HorarioAluguel> => {
        try{
            const deletedTime = await this.prisma.horarioAluguel.update({
                where: {
                    id: idTime
                },
                data: {
                    deletado: true
                }
            })

            return deletedTime
        }catch(err: any){
            throw new Error(err.slqMessage || err.message)
        }
    }

    selectCourtById = async (id: string): Promise<Quadra> => {
        try{
            const court = await this.prisma.quadra.findUnique({
                relationLoadStrategy: 'join',
                where: {
                    id: id
                },
                include: {
                    complexo_esportivo: true
                }
            })

            return court
        }catch(err: any){
            throw new Error(err.slqMessage || err.message)
        }
    }

    selectCourtByNameAndIdSportsComplex = async(name: string, idSportsComplex: string): Promise<Quadra> => {
        try{
            const court = await this.prisma.quadra.findFirst({
                relationLoadStrategy: 'join',
                where: {
                    nome: name,
                    AND: {
                        id_complexo_esportivo: idSportsComplex
                    }
                },
                include: {
                    complexo_esportivo: true
                }
            })

            return court
        }catch(err: any){
            throw new Error(err.slqMessage || err.message)
        }
    }

    selectCourtByIdSportsComplex = async(idSportsComplex: string): Promise<Quadra[]> => {
        try{
            const courts = await this.prisma.quadra.findMany({
                relationLoadStrategy: 'join',
                include: {
                    complexo_esportivo: true
                },
                where: {
                    id_complexo_esportivo: idSportsComplex
                }
            })

            return courts
        }catch(err: any){
            throw new Error(err.slqMessage || err.message)
        }
    }

    selectAllCourts = async(): Promise<Quadra[]> => {
        try{
            const courts = await this.prisma.quadra.findMany({
                relationLoadStrategy: 'join',
                include: {
                    complexo_esportivo: true
                }
            })

            return courts
        }catch(err: any){
            throw new Error(err.slqMessage || err.message)
        }
    }

    selectdayOfTheWeekById = async(id: string): Promise<DiaSemana> => {
        try{
            const dayOfTheWeek = await this.prisma.diaSemana.findUnique({
                where: {
                    id: id
                }
            })

            return dayOfTheWeek
        }catch(err: any){
            throw new Error(err.slqMessage || err.message)
        }
    }

    selectTimeById = async(id: string): Promise<HorarioAluguel> => {
        try{
            const time = await this.prisma.horarioAluguel.findUnique({
                relationLoadStrategy: 'join',
                where: {
                    id: id,
                    AND: {
                        deletado: false
                    }
                },
                include: {
                    dia_semana: true
                }
            })

            return time
        }catch(err: any){
            throw new Error(err.slqMessage || err.message)
        }
    }

    selectTimeByIdCourtAndInitialTimeAndIdDayOfTheWeek = async(id: string, insertTime: string, idDayOfTheWeek: string):Promise<HorarioAluguel> => {
        try{
            const time: HorarioAluguel[] = await this.prisma.$queryRaw`
                SELECT 
                    *
                FROM
                horario_aluguel
                WHERE id_quadra = ${id}
                AND horario_inicial = CAST(${insertTime} AS time)
                AND id_dia_semana = ${idDayOfTheWeek}
                AND deletado = false
            `            

            return time[0]
        }catch(err: any){   
            throw new Error(err.slqMessage || err.message)
        }
    }

    selectTimeByIdCourt = async(idCourt: string): Promise<HorarioAluguel[]> => {
        try{
            const times = await this.prisma.horarioAluguel.findMany({
                relationLoadStrategy: 'join',
                where: {
                    id_quadra: idCourt,
                    AND: {
                        deletado: false
                    }
                },
                include: {
                    dia_semana: true
                }
            })

            return times
        }catch(err: any){
            throw new Error(err.slqMessage || err.message)
        }
    }

    selectDateRentByIdTimeAndDateRent = async(idTime: string, dateRent: string): Promise<DataAluguel> => {
        try{
            const rentDate: DataAluguel[] = await this.prisma.$queryRaw`
                SELECT 
                    *
                FROM
                data_aluguel
                WHERE id_horario_aluguel = ${idTime}
                AND data = CAST (${dateRent} as DATE)
            ` 

            return rentDate[0]
        }catch(err: any){
            throw new Error(err.slqMessage || err.message)
        }
    }
}
