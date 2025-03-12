import { ICourtRepository } from '../repositories/interfaces/court.repository.interface';
import { CustomError } from '../utils/CustomError';
import { verifyFieldsToObject } from '../utils/VerifyFieldsToObject';
import { generatedId } from '../utils/idGenerator';
import { Court, NewCourt } from '../db/schema';

export class CourtService {
    private courtRepository: ICourtRepository;

    constructor(courtRepository: ICourtRepository){
        this.courtRepository = courtRepository;
    }

    addCourt = async(newCourt: Omit<NewCourt, "id">): Promise<Court> => {
        try{

            if(verifyFieldsToObject(newCourt) === false){
                throw new CustomError('Campos inválidos', 422) ;
            }

            const courtByNameAndIdSportsComplex = await this.courtRepository.selectCourtByNameAndSportsComplexId(newCourt.name, newCourt.sportsComplexId);

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

    getCourts = async(querys: { name: string }, sportsComplexId?: string): Promise<Court[]> => {
        try{

            if(sportsComplexId){
                const courtsBySportsComplex = await this.courtRepository.selectCourtBySportsComplexId(sportsComplexId);

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

    getCourtById = async(id: string, sportesComplexId?: string): Promise<Court | undefined> => {
        try{

            if(!id){
                throw new CustomError('Campos inválidos', 422);
            }

            const courtById = await this.courtRepository.selectCourtById(id);

            if(!courtById){
                throw new CustomError('Quadra não existe', 404);
            }

            if(sportesComplexId && (courtById.sportsComplexId !== sportesComplexId)){
                throw new CustomError('Seu usuário não possui acesso a esta quadra', 403);
            }

            return courtById;

        }catch(err: any){
            throw new CustomError(err.message, err.statusCode);
        }
    }
}