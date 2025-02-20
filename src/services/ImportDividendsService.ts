import fs from 'fs'
import objectHash from 'object-hash'

import { TYPES } from '@/types';
import { injectable, lazyInject } from '@/app';
import type{ TickerRepositoryInterface } from '@/interfaces/repositories/database/TickerRepositoryInterface'
import type { DividendRepositoryInterface } from '@/interfaces/repositories/database/DividendRepositoryInterface'
import type { DividendTypeRepositoryInterface } from '@/interfaces/repositories/database/DividendTypeRepositoryInterface'
import type { InstitutionRepositoryInterface } from '@/interfaces/repositories/database/InstitutionRepositoryInterface'
import type { ReadXlsxFileRespositoryInterface } from "@/interfaces/repositories/file/ReadXlsxFileRespositoryInterface";

@injectable()
export class ImportDividendsService {
  @lazyInject(TYPES.ReadXlsxFileRespositoryInterface) private readXlsxFileRespository!: ReadXlsxFileRespositoryInterface
  @lazyInject(TYPES.DividendTypeRepositoryInterface) private dividendTypeRepository!: DividendTypeRepositoryInterface
  @lazyInject(TYPES.InstitutionRepositoryInterface) private institutionRepository!: InstitutionRepositoryInterface
  @lazyInject(TYPES.DividendRepositoryInterface) private dividendRepository!: DividendRepositoryInterface
  @lazyInject(TYPES.TickerRepositoryInterface) private tickerRepository!: TickerRepositoryInterface

  async execute(filePath: string): Promise<void> {
    console.log(`File path: ${filePath}`)
    const fileStream = fs.createReadStream(filePath)
    const rows = await this.readXlsxFileRespository.readDividendFile(fileStream)

    for await (const row of rows) {
      const ticker = await this.tickerRepository.findOrCreate(row.tickerId, row.tickerName)
      const institution = await this.institutionRepository.findOrCreate(row.institutionName)
      const dividendType = await this.dividendTypeRepository.findOrCreate(row.typeName)

      await this.dividendRepository.create({
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
