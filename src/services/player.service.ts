import { IPlayerRepository } from '../repositories/interfaces/player.repository.interface';
import { CustomError } from '../utils/CustomError';
import { Authenticator } from '../utils/Authenticator';


export class PlayerService {
    private playerRepository: IPlayerRepository;
    private authenticator: Authenticator;

    constructor(playerRepository: IPlayerRepository){
        this.playerRepository = playerRepository;
        this.authenticator = new Authenticator();
    }

    getPlayer = async (token: string) => {
      try{
        if(!token){
          throw new CustomError('Token inexistente', 442);
        }

        const tokenData = this.authenticator.getTokenData(token);

        if(!tokenData){
            throw new CustomError('Token inválido', 401);
        }

        const player = this.playerRepository.selectPlayerById(tokenData.id);

        return player;
      }catch(err: any){
        throw new CustomError(err.message, err.statusCode);
      }
    }
}   