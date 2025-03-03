import { inject, injectable } from '@/app'
import type { TickerDataRepositoryInterface } from '@/repositories/database/interfaces/TickerDataRepositoryInterface'
import type { TickerRepositoryInterface } from '@/repositories/database/interfaces/TickerRepositoryInterface'
import type { DataFiiRepositoryInterface } from '@/repositories/ticker/interfaces/DataFiiRepositoryInterface'
import { TYPES } from '@/types'

@injectable()
export class ImportFiiService {
	@inject(TYPES.TickerRepositoryInterface)
	private tickerRepository!: TickerRepositoryInterface

	@inject(TYPES.TickerDataRepositoryInterface)
	private tickerDataRepository!: TickerDataRepositoryInterface

	@inject(TYPES.DataFiiRepositoryInterface)
	private dataFiiRepository!: DataFiiRepositoryInterface

	async execute(symbol: string): Promise<void> {
		const ticker = await this.tickerRepository.findOrFail(symbol)
		const data = await this.dataFiiRepository.getData(ticker.id)

		await this.tickerDataRepository.create({ ...data, tickerId: ticker.id })
	}
}
