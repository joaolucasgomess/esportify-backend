import { ICourtRepository } from '../repositories/interfaces/court.repository.interface';
import { CustomError } from '../utils/CustomError';
import { verifyFieldsToObject } from '../utils/VerifyFieldsToObject';
import { generatedId } from '../utils/idGenerator';
import { Authenticator } from '../utils/Authenticator';
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

            const courtByNameAndIdSportsComplex = await this.courtRepository.selectCourtByNameAndSportsComplexId(newCourt.name, tokenData.idSportsComplex);

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

    getCourts = async(token: string, querys: { name: string }): Promise<Court[]> => {
        try{
            if(!token){
                throw new CustomError('Token inexistente', 442);
            }
    
            const tokenData = this.authenticator.getTokenData(token);
    
            if(!tokenData){
                throw new CustomError('Token inválido', 401);
            }

            if(tokenData.idSportsComplex){
                const courtsBySportsComplex = await this.courtRepository.selectCourtBySportsComplexId(tokenData.idSportsComplex);

                if(!courtsBySportsComplex){
                    throw new CustomError('Este complexo esportivo ainda não possui quadras', 404);
                }

                return courtsBySportsComplex;
            }else{

                const allCourts = await this.courtRepository.selectAllCourts(querys);

                if(!allCourts){
                    throw new CustomError('Nenhuma quadra encontrada', 404);
                }

                return allCourts;
            }
        }catch(err: any){
            throw new CustomError(err.message, err.statusCode);
        }
    }

    getCourtById = async(token: string, id: string): Promise<Court | undefined> => {
        try{
            if(!token){
                throw new CustomError('Token inexistente', 442);
            }
    
            const tokenData = this.authenticator.getTokenData(token);
    
            if(!tokenData){
                throw new CustomError('Token inválido', 401);
            }

            if(!id){
                throw new CustomError('Campos inválidos', 422);
            }

            const courtById = await this.courtRepository.selectCourtById(id);

            if(!courtById){
                throw new CustomError('Quadra não existe', 404);
            }

            if(tokenData.idSportsComplex && (courtById.sportsComplexId !== tokenData.idSportsComplex)){
                throw new CustomError('Seu usuário não possui acesso a esta quadra', 403);
            }

            return courtById;

        }catch(err: any){
            throw new CustomError(err.message, err.statusCode);
        }
    }
}