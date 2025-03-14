import { Address, NewAddress } from "../../db/schema";

export interface IAddressRepository {
    insertAddress(newAddress: NewAddress): Promise<Address>;
}
