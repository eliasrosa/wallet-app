import type {
	CreateData,
	TickerDataRepositoryInterface,
} from '@/repositories/database/interfaces/TickerDataRepositoryInterface'
import { PrismaClient, type TickerData } from '@prisma/client'

const prisma = new PrismaClient()

export class TickerDataRepository implements TickerDataRepositoryInterface {
	async create(data: CreateData): Promise<TickerData> {
		console.log('TickerDataRepository.create')

		return prisma.tickerData.create({
			data: {
				pvp: data.pvp,
				price: data.price,
				dy12m: data.dy12m,
				var12m: data.var12m,
				volDayAvg: data.volDayAvg,
				lastDividend: data.lastDividend,
				assetValuePerShare: data.assetValuePerShare,
				source: data.source,
				ticker: {
					connect: {
						id: data.tickerId,
					},
				},
			},
		})
	}
}
