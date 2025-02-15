import { PrismaClient } from '@prisma/client'
import { ImportDividendsService } from '@/services/ImportDividendsService'
import { ReadXlsxFileRespository } from '@/repositories/file/ReadXlsxFileRespository'
import { ImportMovementsService } from '@/services/ImportMovementsService'

const prisma = new PrismaClient()

async function importDividends(): Promise<void> {
  const dividendFilesPath = await (new ReadXlsxFileRespository).listFiles('data/b3/dividends')

  for await (const filePath of dividendFilesPath) {
    await (new ImportDividendsService()).execute(filePath)
  }
}

async function importMovements(): Promise<void> {
  const movementFilesPath = await (new ReadXlsxFileRespository).listFiles('data/b3/movements')

  for await (const filePath of movementFilesPath) {
    await (new ImportMovementsService()).execute(filePath)
  }
}

async function main(): Promise<void> {
  await importDividends()
  await importMovements()
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