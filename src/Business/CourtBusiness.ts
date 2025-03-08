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

    addTime = async(token: string, newTime: TypeCreateTime): Promise<void> => {
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

            newTime.preco = Number(newTime.preco) 

            if(newTime.preco <= 0){
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

            const timeByIdCourtAndInitialTime = await this.courtData.selectTimeByIdCourtAndInitialTimeAndIdDayOfTheWeek(newTime.id_quadra, newTime.horario_inicial, dayOfTheWeek.id)

            if(timeByIdCourtAndInitialTime){
                throw new CustomError(`Já existe um horário iniciando em  no dia selecionado`, 422)
            }//TODO definir melhor as validações para não permitir horários repetidos

            const id = generatedId()
            await this.courtData.insertTime(id, newTime)
            
        }catch(err: any){
            throw new CustomError(err.message, err.statusCode)
        }
    }

    deleteTime = async (token: string, idTime: string): Promise<HorarioAluguel> => {
        try{
            if(!token){
                throw new CustomError('Token inexistente', 442)
            }
    
            const tokenData = this.authenticator.getTokenData(token)
    
            if(!tokenData){
                throw new CustomError('Token inválido', 401)
            }

            if(!idTime){
                throw new CustomError('É preciso informar um id', 422)
            }

            const timeToDelete = await this.courtData.selectTimeById(idTime)

            if(!timeToDelete){
                throw new CustomError('Horário não encontrado', 404)
            }

            const court = await this.courtData.selectCourtById(timeToDelete.id_quadra)

            if(tokenData.idSportsComplex !== court.id_complexo_esportivo){
                throw new CustomError('Usuário sem permissão para essa operação', 403)
            }

            timeToDelete.deletado = true

            const deletedTime = await this.courtData.updateTime(timeToDelete)

            return deletedTime
        }catch(err: any){
            throw new CustomError(err.message, err.statusCode)
        }
    }

    rentCourt = async(token: string, newRent: TypeRentCourt): Promise<void> => {
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

            const newRentDateInMiliseconds = Date.parse(newRent.data)

            if(isNaN(newRentDateInMiliseconds)){
                throw new CustomError('Data inválida.', 400)
            }

            if(newRentDateInMiliseconds < Date.now()){
                throw new CustomError('Data informada menor que a atual', 422)          
            }

            const dateRent = await this.courtData.selectDateRentByIdTimeAndDateRent(newRent.id_horario, newRent.data)

            if(!dateRent){
                const id = generatedId()
                await this.courtData.insertDateRent(id, tokenData.id, newRent)
       
            }else{  
                const dateConverted = new Date(newRent.data)

                if(dateRent.data === dateConverted){
                    throw new CustomError('Horário já alugado nesta data', 422)
                }

                const id = generatedId()
                await this.courtData.insertDateRent(id, tokenData.id, newRent)
            }

        }catch(err: any){
            throw new CustomError(err.message, err.statusCode)
        }
    }

    alterStatus = async(token: string, timeId: string): Promise<void> => {
        try{
            if(!token){
                throw new CustomError('Token inexistente', 442)
            }
    
            const tokenData = this.authenticator.getTokenData(token)
    
            if(!tokenData){
                throw new CustomError('Token inválido', 401)
            }

            if(!timeId){
                throw new CustomError('É preciso informar um id', 422)
            }

            const time = await this.courtData.selectTimeById(timeId)

            if(!time){
                throw new CustomError('Nenhum horário encontrado', 404)
            }

            //TODO: criar um metodo pra validar a conexão do horario, quadra e complexo esportivo

            if(time.status == 'ATIVO'){
                time.status = 'INATIVO'
            }else{
                time.status = 'ATIVO'
            }

            await this.courtData.updateTime(time)

        }catch(err: any){
            throw new CustomError(err.message, err.statusCode)
        }
    }

    getCourts = async(token: string, querys: {nome: string, locatario: string}): Promise<Quadra[]> => {
        try{
            if(!token){
                throw new CustomError('Token inexistente', 442)
            }
    
            const tokenData = this.authenticator.getTokenData(token)
    
            if(!tokenData){
                throw new CustomError('Token inválido', 401)
            }

            if(tokenData.idSportsComplex){
                const courtsBySportsComplex = await this.courtData.selectCourtByIdSportsComplex(tokenData.idSportsComplex)

                if(!courtsBySportsComplex){
                    throw new CustomError('Este complexo esportivo ainda não possui quadras', 404)
                }

                return courtsBySportsComplex
            }else{

                const allCourts = await this.courtData.selectAllCourts(querys)

                if(!allCourts){
                    throw new CustomError('Nenhuma quadra encontrada', 404)
                }

                return allCourts
            }
        }catch(err: any){
            throw new CustomError(err.message, err.statusCode)
        }
    }

    getCourtById = async(token: string, id: string): Promise<Quadra> => {
        try{
            if(!token){
                throw new CustomError('Token inexistente', 442)
            }
    
            const tokenData = this.authenticator.getTokenData(token)
    
            if(!tokenData){
                throw new CustomError('Token inválido', 401)
            }

            if(!id){
                throw new CustomError('Campos inválidos', 422)
            }

            const courtById = await this.courtData.selectCourtById(id)

            if(!courtById){
                throw new CustomError('Quadra não existe', 404)
            }

            if(tokenData.idSportsComplex && courtById.id_complexo_esportivo !== tokenData.idSportsComplex){
                throw new CustomError('Seu usuário não possui acesso a esta quadra', 403)
            }

            return courtById

        }catch(err: any){
            throw new CustomError(err.message, err.statusCode)
        }
    }

    getTimeByIdCourt = async(token: string, idCourt: string): Promise<any> => {
        try{
            if(!token){
                throw new CustomError('Token inexistente', 442)
            }
    
            const tokenData = this.authenticator.getTokenData(token)
    
            if(!tokenData){
                throw new CustomError('Token inválido', 401)
            }

            if(!idCourt){
                throw new CustomError('Campos inválidos', 422)
            }

            const timeByIdCourt = this.courtData.selectTimeByIdCourt(idCourt)

            if(!timeByIdCourt){
                throw new CustomError('Quadra não possui horários cadastrados', 404)
            }

            return timeByIdCourt
        }catch(err: any){
            throw new CustomError(err.message, err.statusCode)
        }
    }

    getRentByCourtId = async(token: string, idCourt: string) => {
      if(!token){
        throw new CustomError('Token inexistente', 442)
      }

      const tokenData = this.authenticator.getTokenData(token)

      if(!tokenData){
          throw new CustomError('Token inválido', 401)
      }

      if(!idCourt){
          throw new CustomError('Campos inválidos', 422)
      }

      const rent = await this.courtData.selectRentByIdCourt(idCourt)

      if(!rent){
        throw new CustomError('Alugueis não encontrados', 404)
      }

      return rent
    }
}