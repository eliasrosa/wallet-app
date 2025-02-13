import { PrismaClient } from '@prisma/client'
import readXlsxFile from 'read-excel-file/node'
import fs from 'fs'
import { DividendRepository } from '@/repositories/database/DividendRepository'
import { DividendTypeRepository } from '@/repositories/database/DividendTypeRepository'
import { InstitutionRepository } from '@/repositories/database/InstitutionRepository'
import { TickerRepository } from '@/repositories/database/TickerRepository'

const prisma = new PrismaClient()

async function main() {
  const filePath = 'data/b3/dividends/proventos-recebidos-2024.xlsx'
  const fileStream = fs.createReadStream(filePath)

  console.log('Importing dividends...')
  console.log(`File path: ${filePath}`)

  console.log('Deleting all dividends...')
  await prisma.dividend.deleteMany()

  console.log('Importing dividends...')
  const schema = {
    'Produto': {
      prop: 'product',
      type: String
    },
    'Pagamento': {
      prop: 'paymentDate',
      type: String
    },
    'Tipo de Evento': {
      prop: 'type',
      type: String
    },
    'Instituição': {
      prop: 'institution',
      type: String
    },
    'Quantidade': {
      prop: 'quantity',
      type: String
    },
    'Preço unitário': {
      prop: 'price',
      type: String
    },
    'Valor líquido': {
      prop: 'total',
      type: String
    },
  }

  const { rows, errors } = await readXlsxFile(fileStream, { schema })

  if (errors.length > 0) {
    console.error('Errors:', errors)
    return
  }

  for await (const row of rows) {

    if (!row.product) {
      return
    }

    const [tickerId, tickerName] = (row.product as string).split(' - ')
    const ticker = await (new TickerRepository()).findOrCreate(tickerId, tickerName)
    const institution = await (new InstitutionRepository()).findOrCreate(row.institution as string)
    const dividendType = await (new DividendTypeRepository()).findOrCreate(row.type as string)
    const paymentAt = new Date(Date.parse((row.paymentDate as string).split('/').reverse().join('-')))
    
    await (new DividendRepository()).create({
      tickerId: ticker.id,
      paymentAt: paymentAt,
      institutionId: institution.id,
      dividendTypeId: dividendType.id,
      total: parseFloat(row.total as string),
      price: parseFloat(row.price as string) || null,
      quantity: parseFloat(row.quantity as string) || null,
    })
  }

  console.log('Dividends imported!')
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