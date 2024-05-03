import { ICourtData } from '../model/InterfaceCourtData'
export class CourtBusiness {
    private courtData: ICourtData

    constructor(courtRepository: ICourtData){
        this.courtData = courtRepository
    }
}