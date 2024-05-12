import 'dotenv/config'
import express, { Request, Response } from 'express'
import cors from 'cors'
import { AddressInfo } from 'net'
import { sportsComplexRouter } from './routes/sportsComplexRouter'
import { adminRouter } from './routes/adminRouter'
import { playerRouter } from './routes/playerRouter'
import { courtRouter } from './routes/courtRouter'
import { PrismaClient, DiaSemana } from '@prisma/client'

const app = express()

app.use(express.json())
app.use(cors())

const prisma = new PrismaClient()

app.get('/', async (req: Request, res: Response) => {
  try {
    res.send('Hello, world!')
  } catch (e: any) {
    res.send(e.sqlMessage || e.message)
  }
})

app.use('/complexo-esportivo/', sportsComplexRouter)
app.use('/administrador/', adminRouter)
app.use('/jogador/', playerRouter)
app.use('/quadra/', courtRouter)

app.get('/dias_semana', async (req: Request, res: Response) => {
  try{

    const dias_semana = await prisma.diaSemana.findMany()

    if(!dias_semana){
      throw new Error('Dias da semana não encontrados')
    }

    res.status(200).send({ dias_da_semana : dias_semana })

  }catch(err: any){
    res.status(400).send(err.message)
  }
})

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo
    console.log(`Server is running in http://localhost:${address.port}`)
  } else {
    console.error(`Failure upon starting server.`)
  }
})
