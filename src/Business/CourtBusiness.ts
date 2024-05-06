import { ICourtData } from '../model/InterfaceCourtData'
import { CustomError } from '../Utils/CustomError'
import { verifyFieldsToObject } from '../Utils/VerifyFieldsToObject'
import { Quadra, HorarioAluguel, DataAluguel } from '@prisma/client'
import { generatedId } from '../services/idGenerator'
import { Authenticator } from '../services/Authenticator'
import { TypeCreateCourt } from '../types/TypeCreateCourt'
import { TypeCreateTime } from '../types/TypeCreateTime'
import { TypeRentCourt } from '../types/TypeRentCourt'

export class CourtBusiness {
    private courtData: ICourtData
    private authenticator: Authenticator

    constructor(courtRepository: ICourtData){
        this.courtData = courtRepository
        this.authenticator = new Authenticator()
    }

    addCourt = async(token: string, newCourt: TypeCreateCourt): Promise<Quadra> => {
        try{
            if(!token){
                throw new CustomError('Token inexistente', 442)
            }
    
            const tokenData = this.authenticator.getTokenData(token)
    
            if(!tokenData){
                throw new CustomError('Token inválido', 401)
            }

            if(verifyFieldsToObject(newCourt) === false){
                throw new CustomError('Campos inválidos', 422) 
            } 

            if(newCourt.id_complexo_esportivo !== tokenData.idSportsComplex){
                throw new CustomError('Complexo esportivo informado difere do logado', 403)
            }

            const courtByNameAndIdSportsComplex = await this.courtData.selectCourtByNameAndIdSportsComplex(newCourt.nome, tokenData.idSportsComplex)

            if(courtByNameAndIdSportsComplex){
                throw new CustomError('Quadra já cadastrada no complexo esportivo informado', 422)
            }

            const id = generatedId()

            const court = await this.courtData.insertCourt(id, newCourt)
            return court

        }catch(err: any){
            throw new CustomError(err.message, err.statusCode)
        }
    }

    addTime = async(token: string, newTime: TypeCreateTime): Promise<HorarioAluguel> => {
        try{
            if(!token){
                throw new CustomError('Token inexistente', 442)
            }
    
            const tokenData = this.authenticator.getTokenData(token)
    
            if(!tokenData){
                throw new CustomError('Token inválido', 401)
            }

            if(verifyFieldsToObject(newTime) === false){
                throw new CustomError('Campos inválidos', 422) 
            } 

            if(Number(newTime.preco) <= 0){
                throw new CustomError('O preço informado é menor ou igual a zero', 403)
            }

            const dayOfTheWeek = await this.courtData.selectdayOfTheWeekById(newTime.id_dia_semana)

            if(!dayOfTheWeek){
                throw new CustomError('Dia da semana não encontrado', 404)       
            }

            const court = await this.courtData.selectCourtById(newTime.id_quadra)

            if(!court){
                throw new CustomError('Quadra não encontrada', 404)
            }

            if(court.id_complexo_esportivo !== tokenData.idSportsComplex){
                throw new CustomError('Complexo esportivo informado difere do logado', 403)
            }

            const timeByIdCourtAndInitialTime = await this.courtData.selectTimeByIdCourtAndInitialTime(newTime.id_quadra, newTime.horario_inicial)

            if(timeByIdCourtAndInitialTime){
                throw new CustomError(`Já existe um horário iniciando em ${newTime.horario_inicial.getHours() + newTime.horario_inicial.getMinutes()} no dia selecionado`, 422)
            }//TODO definir melhor as validações para não permitir horários repetidos

            const id = generatedId()
            const time = await this.courtData.insertTime(id, newTime)
            return time
            
        }catch(err: any){
            throw new CustomError(err.message, err.statusCode)
        }
    }

    rentCourt = async(token: string, newRent: TypeRentCourt): Promise<DataAluguel> => {
        try{
            if(!token){
                throw new CustomError('Token inexistente', 442)
            }
    
            const tokenData = this.authenticator.getTokenData(token)
    
            if(!tokenData){
                throw new CustomError('Token inválido', 401)
            }

            if(verifyFieldsToObject(newRent) === false){
                throw new CustomError('Campos inválidos', 422) 
            }
            
            const court = await this.courtData.selectCourtById(newRent.id_quadra)

            if(!court){
                throw new CustomError('Quadra não encontrada', 404)
            }

            const time = await this.courtData.selectTimeById(newRent.id_horario)

            if(!time){
                throw new CustomError('Horário não encontrado', 404)
            }

            const dateRent = await this.courtData.selectDateRentByIdTime(newRent.id_horario)

            if(!dateRent){
                const id = generatedId()
                const rentDate = await this.courtData.insertDateRent(id, newRent)
                return rentDate
            }else{  
                if(dateRent.data === newRent.data){
                    throw new CustomError('Horário já alugado nesta data', 422)
                }else{
                    const id = generatedId()
                    const rentDate = await this.courtData.insertDateRent(id, newRent)
                    return rentDate
                }
            }

        }catch(err: any){
            throw new CustomError(err.message, err.statusCode)
        }
    }
}