import fs from 'fs'
import objectHash from 'object-hash'

import { TYPES } from '@/types';
import { injectable, lazyInject } from '@/app';
import type{ TickerRepositoryInterface } from '@/interfaces/repositories/database/TickerRepositoryInterface'
import type { InstitutionRepositoryInterface } from '@/interfaces/repositories/database/InstitutionRepositoryInterface'
import type { ReadXlsxFileRespositoryInterface } from "@/interfaces/repositories/file/ReadXlsxFileRespositoryInterface";
import type { MovementTypeRepositoryInterface } from '@/interfaces/repositories/database/MovementTypeRepositoryInterface';
import type { MovementRepositoryInterface } from '@/interfaces/repositories/database/MovementRepositoryInterface';

@injectable()
export class ImportMovementsService {
  @lazyInject(TYPES.TickerRepositoryInterface) private tickerRepository!: TickerRepositoryInterface
  @lazyInject(TYPES.MovementRepositoryInterface) private movementRepository!: MovementRepositoryInterface
  @lazyInject(TYPES.InstitutionRepositoryInterface) private institutionRepository!: InstitutionRepositoryInterface
  @lazyInject(TYPES.MovementTypeRepositoryInterface) private movementTypeRepository!: MovementTypeRepositoryInterface
  @lazyInject(TYPES.ReadXlsxFileRespositoryInterface) private readXlsxFileRespository!: ReadXlsxFileRespositoryInterface

  async execute(filePath: string): Promise<void> {
    const fileStream = fs.createReadStream(filePath)
    const rows = await this.readXlsxFileRespository.readMovementFile(fileStream)

    for await (const row of rows) {
      const ticker = await this.tickerRepository.findOrCreate(row.tickerId, row.tickerName)
      const institution = await this.institutionRepository.findOrCreate(row.institutionName)
      const movementType = await this.movementTypeRepository.findOrCreate(row.movementTypeName)

      await this.movementRepository.create({
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