import fs from 'fs'
import { TickerRepository } from '@/repositories/database/TickerRepository'
import { DividendRepository } from '@/repositories/database/DividendRepository'
import { InstitutionRepository } from '@/repositories/database/InstitutionRepository'
import { ReadXlsxFileRespository } from '@/repositories/file/ReadXlsxFileRespository'
import { DividendTypeRepository } from '@/repositories/database/DividendTypeRepository'
import objectHash from 'object-hash'

export class ImportDividendsService {
  async execute(filePath: string): Promise<void> {
    console.log(`File path: ${filePath}`)
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
        hash: objectHash(row),
      })
    }
  }
}
