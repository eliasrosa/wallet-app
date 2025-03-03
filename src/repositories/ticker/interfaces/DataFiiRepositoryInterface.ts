import type { TickerDataSourceEnum } from '@prisma/client'

export interface FiiData {
	price: number
	dy12m: number
	pvp: number
	var12m: number
	volDayAvg: string
	lastDividend: number
	assetValuePerShare: number
	source: TickerDataSourceEnum
}

export interface DataFiiRepositoryInterface {
	getData(ticker: string): Promise<FiiData>
}
