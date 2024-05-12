import { PrismaClient } from '@prisma/client'
import { generatedId } from '../../src/services/idGenerator'

const prisma = new PrismaClient()

async function main() {
    await prisma.cnpjValido.createMany({
        data: [{
            id: generatedId(),
            cnpj: '11111111111111',
            status: 'ATIVO',
            cadastrado: 'NAO'
        },
        {
          id: generatedId(),
          cnpj: '22222222222222',
          status: 'ATIVO',
          cadastrado: 'NAO'
      }]
    })

    await prisma.diaSemana.createMany({
      data: [
        {
          id: generatedId(),
          desc_dia: 'SEG'
        },
        {
          id: generatedId(),
          desc_dia: 'TER'
        },
        {
          id: generatedId(),
          desc_dia: 'QUA'
        },
        {
          id: generatedId(),
          desc_dia: 'QUI'
        },
        {
          id: generatedId(),
          desc_dia: 'SEX'
        },
        {
          id: generatedId(),
          desc_dia: 'SAB'
        },
        {
          id: generatedId(),
          desc_dia: 'DOM'
        },
      ]
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
