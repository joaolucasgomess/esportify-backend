import { PrismaClient, CnpjValido } from "@prisma/client";

export default class ValidCnpjData{
  private readonly prisma = new PrismaClient()

  validCnpjByCnpj = async(cnpj: string): Promise<CnpjValido> => {
    try{
        const validCnpj = await this.prisma.cnpjValido.findFirstOrThrow({
            where: {
                cnpj: cnpj
            }
        })
        return validCnpj
    }catch(err: any){
        throw new Error(err.slqMessage || err.message)
    }
}
}