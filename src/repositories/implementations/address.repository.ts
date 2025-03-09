import { IAddressRepository } from "../interfaces/address.repository.interface";
import { db } from "../../db";
import { NewAddress, Address, address } from "../../db/schema";

export class AddressRepository implements IAddressRepository{

  async insertAddress(newAddress: NewAddress): Promise<Address> {
    const [response] = await db.insert(address).values(newAddress).returning();
    return response;
  }

}