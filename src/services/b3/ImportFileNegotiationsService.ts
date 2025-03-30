import fs from 'node:fs'

import { inject, injectable } from '@/app'
import type { InstitutionRepositoryInterface } from '@/repositories/database/interfaces/InstitutionRepositoryInterface'
import type { MovementTypeRepositoryInterface } from '@/repositories/database/interfaces/MovementTypeRepositoryInterface'
import type { NegotiationRepositoryInterface } from '@/repositories/database/interfaces/NegotiationRepositoryInterface'
import type { TickerRepositoryInterface } from '@/repositories/database/interfaces/TickerRepositoryInterface'
import type { ReadXlsxFileRespositoryInterface } from '@/repositories/file-b3/interfaces/ReadXlsxFileRespositoryInterface'
import { TYPES } from '@/types'

@injectable()
export class ImportFileNegotiationsService {
	@inject(TYPES.TickerRepositoryInterface)
	private tickerRepository!: TickerRepositoryInterface
	@inject(TYPES.InstitutionRepositoryInterface)
	private institutionRepository!: InstitutionRepositoryInterface
	@inject(TYPES.MovementTypeRepositoryInterface)
	private movementTypeRepository!: MovementTypeRepositoryInterface
	@inject(TYPES.ReadXlsxFileRespositoryInterface)
	private readXlsxFileRespository!: ReadXlsxFileRespositoryInterface
	@inject(TYPES.NegotiationRepositoryInterface)
	private negotiationRepository!: NegotiationRepositoryInterface

	async execute(filePath: string, userId: string, year: number): Promise<void> {
		await this.negotiationRepository.deleteByYear(userId, year)

		const fileStream = fs.createReadStream(filePath)
		const rows = await this.readXlsxFileRespository.readNegotiationsFile(fileStream)

		for await (const row of rows) {
			const ticker = await this.tickerRepository.findOrCreate(row.tickerId)
			const institution = await this.institutionRepository.findOrCreate(row.institutionName)
			const movementType = await this.movementTypeRepository.findOrCreate(row.movementTypeName)

			await this.negotiationRepository.create({
				userId,
				tickerId: ticker.id,
				price: row.price,
				total: row.total,
				market: row.market,
				dueDate: row.dueDate,
				quantity: row.quantity,
				institutionId: institution.id,
				negotiationAt: row.negotiationAt,
				movementTypeId: movementType.id,
				negotiationCode: row.negotiationCode,
			})
		}
	}
}
