import { PrismaClient } from '@prisma/client'
import readXlsxFile from 'read-excel-file/node'
import fs from 'fs'

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

    // ticker
    const [tickerId, tickerName] = (row.product as string).split(' - ')
    console.log(`Ticker: ${tickerId}, Name: ${tickerName}`)

    const ticker = await prisma.ticker.upsert({
      where: { id: tickerId },
      update: {
        name: tickerName
      },
      create: {
        id: tickerId,
        name: tickerName,
      }
    })

    // institution
    const institutionName = row.institution as string
    const institution = await prisma.institution.upsert({
      where: { name: institutionName },
      update: {},
      create: {
        name: institutionName
      }
    })

    // payment date
    const paymentAt = new Date(Date.parse((row.paymentDate as string).split('/').reverse().join('-')))

    // dividend type
    const dividendTypeName = row.type as string
    const dividendType = await prisma.dividendType.upsert({
      where: { name: dividendTypeName },
      update: {},
      create: {
        name: dividendTypeName,
      }
    })

    // dividend
    const dividend = await prisma.dividend.create({
      data: {
        paymentAt: paymentAt,
        quantity: parseFloat(row.quantity as string) || null,
        price: parseFloat(row.price as string) || null,
        total: parseFloat(row.total as string),
        ticker: {
          connect: {
            id: ticker.id
          }
        },
        institution: {
          connect: {
            id: institution.id
          }
        },
        dividendType: {
          connect: {
            id: dividendType.id
          }
        }
      }
    })

    console.log(`Ticker: ${tickerId}, PaymentAt: ${row.paymentDate}, Dividend: ${dividend.total}`)
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