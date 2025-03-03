import fs from 'node:fs'
import objectHash from 'object-hash'

import { inject, injectable } from '@/app'
import type { DividendRepositoryInterface } from '@/repositories/database/interfaces/DividendRepositoryInterface'
import type { DividendTypeRepositoryInterface } from '@/repositories/database/interfaces/DividendTypeRepositoryInterface'
import type { InstitutionRepositoryInterface } from '@/repositories/database/interfaces/InstitutionRepositoryInterface'
import type { TickerRepositoryInterface } from '@/repositories/database/interfaces/TickerRepositoryInterface'
import type { ReadXlsxFileRespositoryInterface } from '@/repositories/file-b3/interfaces/ReadXlsxFileRespositoryInterface'
import { TYPES } from '@/types'

@injectable()
export class ImportFileDividendsService {
	@inject(TYPES.ReadXlsxFileRespositoryInterface)
	private readXlsxFileRespository!: ReadXlsxFileRespositoryInterface
	@inject(TYPES.DividendTypeRepositoryInterface)
	private dividendTypeRepository!: DividendTypeRepositoryInterface
	@inject(TYPES.InstitutionRepositoryInterface)
	private institutionRepository!: InstitutionRepositoryInterface
	@inject(TYPES.DividendRepositoryInterface)
	private dividendRepository!: DividendRepositoryInterface
	@inject(TYPES.TickerRepositoryInterface)
	private tickerRepository!: TickerRepositoryInterface

	async execute(filePath: string): Promise<void> {
		console.log(`File path: ${filePath}`)
		const fileStream = fs.createReadStream(filePath)
		const rows = await this.readXlsxFileRespository.readDividendFile(fileStream)

		for await (const row of rows) {
			const ticker = await this.tickerRepository.findOrCreate(row.tickerId, row.tickerName)
			const institution = await this.institutionRepository.findOrCreate(row.institutionName)
			const dividendType = await this.dividendTypeRepository.findOrCreate(row.typeName)

			const data = {
				total: row.total,
				price: row.price,
				tickerId: ticker.id,
				quantity: row.quantity,
				paymentAt: row.paymentAt,
				institutionId: institution.id,
				dividendTypeId: dividendType.id,
			}

			const hash = objectHash(data)
			await this.dividendRepository.create({ ...data, hash })
		}
	}
}
