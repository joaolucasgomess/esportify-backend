import { Request, Response } from 'express'
import { UserService } from '../services/user.service';

export class UserController{
  constructor(private userService: UserService){}

  login = async (req: Request, res: Response): Promise<void> => {
    try{
        const { email, password, sportsComplexId } = req.body;
        const token = await this.userService.login({ email, password, sportsComplexId });
        res.status(200).send({ token });
    }catch(err){
        res.status(err.statusCode || 400).send({ error: err.message });
    }
}

}