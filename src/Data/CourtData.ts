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

    updateTime = async(time: HorarioAluguel): Promise<HorarioAluguel> => {
        try{
            const updatedTime = await this.prisma.horarioAluguel.update({
                where: {
                    id: time.id
                }, data: {
                    horario_inicial: time.horario_inicial,
                    horario_final: time.horario_final,
                    preco: time.preco,
                    status: time.status,
                    deletado: time.deletado,
                    modificado_em: new Date(Date.now())
                }
            })

            return updatedTime;
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

    selectAllCourts = async(querys: {nome: string, locatario: string}): Promise<Quadra[]> => {
        try{
          const courts = await this.prisma.quadra.findMany({
            where: {
              nome: {
                contains: querys.nome
              }
            },
            include: {
              complexo_esportivo: true,
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

    selectTimeByIdCourtAndInitialTimeAndIdDayOfTheWeek = async(id: string, insertTime: string, idDayOfTheWeek: string):Promise<any> => {
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

    selectRentByIdCourt = async(idCourt: string): Promise<any> => {
      try{
        const rent = await this.prisma.$queryRaw`
          select
          d.data, 
          JSON_BUILD_OBJECT(
            'horario_inicial', h.horario_inicial,
            'horario_final', h.horario_final,
            'preco', h.preco, 
            'id_quadra', h.id_quadra 
          ) as horario_aluguel,
          JSON_BUILD_OBJECT(
            'nome', u.nome
          ) as usuario
          from data_aluguel AS d
          JOIN horario_aluguel AS h
          ON h.id = d.id_horario_aluguel
          join quadra as q
          on q.id = h.id_quadra
          join cliente as c
          on c.id = d.id_cliente
          join usuario as u
          on u.id = c.id_usuario
          where q.id = ${idCourt}
        ` 
        return rent
        
      }catch(err: any){
        throw new Error(err.slqMessage || err.message)
      }
    }
}
