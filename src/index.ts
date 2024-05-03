import 'dotenv/config'
import express, { Request, Response } from 'express'
import cors from 'cors'
import { AddressInfo } from 'net'
import { sportsComplexRouter } from './routes/sportsComplexRouter'
import { adminRouter } from './routes/adminRouter'
import { playerRouter } from './routes/playerRouter'
import { courtRouter } from './routes/courtRouter'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', async (req: Request, res: Response) => {
  try {
    res.send('Hello, world!')
  } catch (e: any) {
    res.send(e.sqlMessage || e.message)
  }
})

app.use('/ComplexoEsportivo/', sportsComplexRouter)
app.use('/Administrador/', adminRouter)
app.use('/Jogador/', playerRouter)
app.use('/Quadra/', courtRouter)

/*app.post('/quadra/add/', async (req: Request, res: Response) => {
  try{

    const { cnpj, nome, rua, bairro, cidade, numero, cep } = req.body

    if(!cnpj || !nome || !rua || !bairro || !cidade || !numero || !cep){
      throw new Error('Campos inválidos')
    }

    //TODO


    res.status(201).send('Quadra criada com sucesso')
  }catch(err: any){
    res.status(400).send(err.message)
  } 
})*/

/*app.post('/horario/add', async (req: Request, res: Response) => {
  try{

    const { id_quadra, id_dia_semana, horario_inicial, horario_final, preco } = req.body

    if(!id_quadra || !id_dia_semana || !horario_inicial || !horario_final || !preco){
      throw new Error('Campos inválidos')
    }

    const quadra = await db('quadra').where('id_quadra', id_quadra)

    if(!quadra){
      throw new Error('Quadra não existe')
    }

    const diaSemana = await db('dia_semana').where('id_dia_semana', id_dia_semana)

    if(!diaSemana){
      throw new Error('Dia da semana não existe')     
    }

    const id_horario_aluguel = uuidv7() as string

    await db('horario_aluguel')
      .insert({
        id_horario_aluguel,
        id_quadra, 
        id_dia_semana, 
        horario_inicial,
        horario_final,
        preco
      })

      res.status(201).send('Horario criado com sucesso!')
  }catch(err: any){
    res.status(400).send(err.message)
  }
})*/

/*app.get('/quadra', async (req: Request, res: Response) => {
  try{

    const quadras = await prisma.quadra.findMany({
      include: {
        complexo_esportivo: true
      }
    })

    res.status(200).send({ quadras: quadras })
  }catch(err: any){
    res.status(400).send(err.message)
  }
})*/

/*app.get('/quadra/:id_quadra', async (req: Request, res: Response) => {
  try{

    const { id_quadra } = req.params

    const quadra = await db('quadra as q')
      .select(
        'q.id_quadra', 
        'q.nome',  
        db.raw(`
          JSON_BUILD_OBJECT(
            'id_endereco', e.id_endereco,
            'rua', e.rua,
            'bairro', e.bairro,
            'cidade', e.cidade,
            'numero', e.numero,
            'cep', e.cep
          ) as endereco`)
      )
      .join('endereco as e', 'q.id_endereco', 'e.id_endereco')
      .where({ id_quadra: id_quadra })

    if(!quadra.length){
      throw new Error('Quadra não encontrado')
    }

    res.status(200).send({ quadra: quadra })
  }catch(err: any){
    res.status(400).send(err.message)
  }
})

app.get('/dias_semana', async (req: Request, res: Response) => {
  try{

    const dias_semana = await db('dia_semana')

    if(!dias_semana){
      throw new Error('Dias da semana não encontrados')
    }

    res.status(200).send({ dias_da_semana : dias_semana })

  }catch(err: any){
    res.status(400).send(err.message)
  }
})

app.get('/horarios_aluguel/:id_quadra', async (req: Request, res: Response) => {
  try{

    const { id_quadra } = req.params
    const horarios_aluguel = await db('horario_aluguel as h')
      .select(
        'h.id_horario_aluguel',
        'h.horario_inicial',
        'h.horario_final',
        'h.preco',
        db.raw(`
          JSON_BUILD_OBJECT(
            'id_dia_semana', d.id_dia_semana,
            'desc_dia', d.desc_dia
          ) as dia_semana`
        )
      )
      .join('dia_semana as d', 'h.id_dia_semana', 'd.id_dia_semana')
      .where('h.id_quadra', id_quadra)

    if(!horarios_aluguel){
      throw new Error('Horarios não encontrados')
    }

    res.status(200).send({ horarios_aluguel : horarios_aluguel })

  }catch(err: any){
    res.status(400).send(err.message)
  }
})*/

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo
    console.log(`Server is running in http://localhost:${address.port}`)
  } else {
    console.error(`Failure upon starting server.`)
  }
})
