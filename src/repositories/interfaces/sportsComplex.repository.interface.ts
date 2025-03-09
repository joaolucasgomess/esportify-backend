import { NewSportsComplex, SportsComplex } from '../../db/schema';

export interface ISportsComplexRepository {
    insertSportsComplex(newSportsComplex: NewSportsComplex): Promise<SportsComplex>;
    selectSportsComplexById(id: string): Promise<SportsComplex | undefined>;
}