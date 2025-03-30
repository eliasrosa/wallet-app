import fs from 'node:fs'

import { inject, injectable } from '@/app'
import type { InstitutionRepositoryInterface } from '@/repositories/database/interfaces/InstitutionRepositoryInterface'
import type { MovementRepositoryInterface } from '@/repositories/database/interfaces/MovementRepositoryInterface'
import type { MovementTypeRepositoryInterface } from '@/repositories/database/interfaces/MovementTypeRepositoryInterface'
import type { TickerRepositoryInterface } from '@/repositories/database/interfaces/TickerRepositoryInterface'
import type { ReadXlsxFileRespositoryInterface } from '@/repositories/file-b3/interfaces/ReadXlsxFileRespositoryInterface'
import { TYPES } from '@/types'

@injectable()
export class ImportFileMovementsService {
	@inject(TYPES.TickerRepositoryInterface)
	private tickerRepository!: TickerRepositoryInterface
	@inject(TYPES.MovementRepositoryInterface)
	private movementRepository!: MovementRepositoryInterface
	@inject(TYPES.InstitutionRepositoryInterface)
	private institutionRepository!: InstitutionRepositoryInterface
	@inject(TYPES.MovementTypeRepositoryInterface)
	private movementTypeRepository!: MovementTypeRepositoryInterface
	@inject(TYPES.ReadXlsxFileRespositoryInterface)
	private readXlsxFileRespository!: ReadXlsxFileRespositoryInterface

	async execute(filePath: string, userId: string, year: number): Promise<void> {
		await this.movementRepository.deleteByYear(userId, year)

		const fileStream = fs.createReadStream(filePath)
		const rows = await this.readXlsxFileRespository.readMovementFile(fileStream)

		for await (const row of rows) {
			const ticker = await this.tickerRepository.findOrCreate(row.tickerId, row.tickerName)
			const institution = await this.institutionRepository.findOrCreate(row.institutionName)
			const movementType = await this.movementTypeRepository.findOrCreate(row.movementTypeName)

			await this.movementRepository.create({
				userId,
				tickerId: ticker.id,
				quantity: row.quantity,
				price: row.price,
				total: row.total,
				isCredit: row.isCredit,
				movementTypeId: movementType.id,
				institutionId: institution.id,
				movementAt: row.movementAt,
			})
		}
	}
}
