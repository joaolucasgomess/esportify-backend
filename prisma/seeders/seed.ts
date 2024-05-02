import { PrismaClient } from '@prisma/client'
import { generatedId } from '../../src/services/idGenerator'

const prisma = new PrismaClient()

async function main() {
    await prisma.cnpjValido.create({
        data: {
            id: generatedId(),
            cnpj: '11111111111112',
            status: 'ATIVO',
            cadastrado: 'NAO'
        }
    })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
