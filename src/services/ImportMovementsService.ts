import fs from 'fs'
import objectHash from 'object-hash'
import { TickerRepository } from '@/repositories/database/TickerRepository'
import { MovementRepository } from '@/repositories/database/MovementRepository'
import { InstitutionRepository } from '@/repositories/database/InstitutionRepository'
import { ReadXlsxFileRespository } from '@/repositories/file/ReadXlsxFileRespository'
import { MovementTypeRepository } from '@/repositories/database/MovementTypeRepository'

export class ImportMovementsService {
  async execute(filePath: string): Promise<void> {

    const fileStream = fs.createReadStream(filePath)
    const rows = await (new ReadXlsxFileRespository()).readMovementFile(fileStream)

    for await (const row of rows) {
      const ticker = await (new TickerRepository()).findOrCreate(row.tickerId, row.tickerName)
      const institution = await (new InstitutionRepository()).findOrCreate(row.institutionName)
      const movementType = await (new MovementTypeRepository()).findOrCreate(row.movementTypeName)

      await (new MovementRepository()).create({
        tickerId: ticker.id,
        quantity: row.quantity,
        price: row.price,
        total: row.total,
        isCredit: row.isCredit,
        movementTypeId: movementType.id,
        institutionId: institution.id,
        movementAt: row.movementAt,
        hash: objectHash(row),
      })
    }
  }
}