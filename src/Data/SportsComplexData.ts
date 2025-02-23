import { ISportsComplexData } from '../model/InterfaceSportsComplexData'
import { PrismaClient, ComplexoEsportivo, CnpjValido } from '@prisma/client'
import { TypeCreateSportsComplex } from '../types/TypeCreateSportsComplex'

export default class SportsComplexData implements ISportsComplexData {
    prisma = new PrismaClient()

    insertSportsComplex = async (id: string, newSportsComplex: TypeCreateSportsComplex): Promise<ComplexoEsportivo> => {
        try{
            const [sportsComplex, updateValidCnpj] = await this.prisma.$transaction([
                this.prisma.complexoEsportivo.create({
                    data: {
                        id: id,
                        nome: newSportsComplex.nome,
                        cnpj: newSportsComplex.cnpj,
                        cidade: newSportsComplex.cidade,
                        bairro: newSportsComplex.bairro,
                        complemento: newSportsComplex.complemento,
                        rua: newSportsComplex.rua,
                        numero: newSportsComplex.numero,
                        cep: newSportsComplex.cep
                    }
                }),
                this.prisma.cnpjValido.update({
                    where: {
                        cnpj: newSportsComplex.cnpj,
                    },
                    data: {
                        cadastrado: 'SIM'
                    }
                })
            ])

            return sportsComplex
        }catch(err: any){
            throw new Error(err.slqMessage || err.message)
        }
    }
}