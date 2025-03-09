import { ICourtRepository } from '../repositories/interfaces/court.repository.interface';
import { CustomError } from '../utils/CustomError';
import { verifyFieldsToObject } from '../utils/VerifyFieldsToObject';
import { Quadra, HorarioAluguel } from '@prisma/client';
import { generatedId } from '../utils/idGenerator';
import { Authenticator } from '../utils/Authenticator';
import { TypeRentCourt } from '../types/TypeRentCourt';
import { Court, NewCourt } from '../db/schema';

export class CourtService {
    private courtRepository: ICourtRepository;
    private authenticator: Authenticator;

    constructor(courtRepository: ICourtRepository){
        this.courtRepository = courtRepository;
        this.authenticator = new Authenticator();
    }

    addCourt = async(token: string, newCourt: Omit<NewCourt, "id">): Promise<Court> => {
        try{
            if(!token){
                throw new CustomError('Token inexistente', 442);
            }
    
            const tokenData = this.authenticator.getTokenData(token);
    
            if(!tokenData){
                throw new CustomError('Token inválido', 401);
            }

            if(verifyFieldsToObject(newCourt) === false){
                throw new CustomError('Campos inválidos', 422) ;
            } 

            if(newCourt.sportsComplexId !== tokenData.idSportsComplex){
                throw new CustomError('Complexo esportivo informado difere do logado', 403);
            }

            const courtByNameAndIdSportsComplex = await this.courtRepository.selectCourtByNameAndIdSportsComplex(newCourt.name, tokenData.idSportsComplex);

            if(courtByNameAndIdSportsComplex){
                throw new CustomError('Quadra já cadastrada no complexo esportivo informado', 422);
            }

            const id = generatedId();

            const court = await this.courtRepository.insertCourt({ id, name: newCourt.name, sportsComplexId: newCourt.sportsComplexId });
            return court;

        }catch(err: any){
            throw new CustomError(err.message, err.statusCode);
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
            
            const court = await this.courtRepository.selectCourtById(newRent.id_quadra)

            if(!court){
                throw new CustomError('Quadra não encontrada', 404)
            }

            const time = await this.courtRepository.selectTimeById(newRent.id_horario)

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

            const dateRent = await this.courtRepository.selectDateRentByIdTimeAndDateRent(newRent.id_horario, newRent.data)

            if(!dateRent){
                const id = generatedId()
                await this.courtRepository.insertDateRent(id, tokenData.id, newRent)
       
            }else{  
                const dateConverted = new Date(newRent.data)

                if(dateRent.data === dateConverted){
                    throw new CustomError('Horário já alugado nesta data', 422)
                }

                const id = generatedId()
                await this.courtRepository.insertDateRent(id, tokenData.id, newRent)
            }

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
                const courtsBySportsComplex = await this.courtRepository.selectCourtByIdSportsComplex(tokenData.idSportsComplex)

                if(!courtsBySportsComplex){
                    throw new CustomError('Este complexo esportivo ainda não possui quadras', 404)
                }

                return courtsBySportsComplex
            }else{

                const allCourts = await this.courtRepository.selectAllCourts(querys)

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

            const courtById = await this.courtRepository.selectCourtById(id)

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

      const rent = await this.courtRepository.selectRentByIdCourt(idCourt)

      if(!rent){
        throw new CustomError('Alugueis não encontrados', 404)
      }

      return rent
    }
}