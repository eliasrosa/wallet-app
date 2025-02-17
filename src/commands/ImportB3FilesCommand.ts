import { ImportDividendsService } from '@/services/ImportDividendsService'
import { ReadXlsxFileRespository } from '@/repositories/file/ReadXlsxFileRespository'
import { ImportMovementsService } from '@/services/ImportMovementsService'

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
  })
  .catch(async (e) => {
    console.error(e)
    process.exit(1)
  })