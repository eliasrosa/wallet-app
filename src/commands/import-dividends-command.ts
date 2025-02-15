import { PrismaClient } from '@prisma/client'
import { DividendRepository } from '@/repositories/database/DividendRepository'
import { DividendTypeRepository } from '@/repositories/database/DividendTypeRepository'
import { InstitutionRepository } from '@/repositories/database/InstitutionRepository'
import { TickerRepository } from '@/repositories/database/TickerRepository'
import fs from 'fs'
import { ReadXlsxFileRespository } from '@/repositories/file/ReadXlsxFileRespository'

const prisma = new PrismaClient()

async function main(filePath: string): Promise<void> {
  console.log(`File path: ${filePath}`)
  await (new DividendRepository()).clearAll()
  
  const fileStream = fs.createReadStream(filePath)
  const rows = await (new ReadXlsxFileRespository()).readDividendFile(fileStream)

  for await (const row of rows) {
    const ticker = await (new TickerRepository()).findOrCreate(row.tickerId, row.tickerName)
    const institution = await (new InstitutionRepository()).findOrCreate(row.institutionName)
    const dividendType = await (new DividendTypeRepository()).findOrCreate(row.typeName)
    
    await (new DividendRepository()).create({
      total: row.total,
      price: row.price,
      tickerId: ticker.id,
      quantity: row.quantity,
      paymentAt: row.paymentAt,
      institutionId: institution.id,
      dividendTypeId: dividendType.id,
    })
  }

  console.log('Dividends imported!')
}

main('data/b3/dividends/proventos-recebidos-2024.xlsx')
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })