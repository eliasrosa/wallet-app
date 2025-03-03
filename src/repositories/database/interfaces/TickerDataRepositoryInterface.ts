import type { TickerData, TickerDataSourceEnum } from '@prisma/client'

export interface CreateData {
	pvp: number
	price: number
	dy12m: number
	var12m: number
	volDayAvg: string
	lastDividend: number
	assetValuePerShare: number
	source: TickerDataSourceEnum
	tickerId: string
}

export interface TickerDataRepositoryInterface {
	create(data: CreateData): Promise<TickerData>
}
