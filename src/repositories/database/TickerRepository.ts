import { config } from '@/config'
import type { TickerRepositoryInterface } from '@/repositories/database/interfaces/TickerRepositoryInterface'
import { PrismaClient, type Ticker, type TickerType } from '@prisma/client'

const prisma = new PrismaClient()

export class TickerRepository implements TickerRepositoryInterface {
	async getAll(): Promise<Ticker[]> {
		console.log('TickerRepository.getAll')
		return prisma.ticker.findMany({
			where: { id: { not: { endsWith: '12' } } },
		})
	}

	async findOrFail(id: string): Promise<Ticker> {
		console.log('TickerRepository.findOrFail', { id })
		const ticker = await prisma.ticker.findUnique({ where: { id } })
		if (!ticker) {
			throw new Error('Ticker not found')
		}

		return ticker
	}

	async findOrCreate(symbol: string, name?: string): Promise<Ticker> {
		console.log('TickerRepository.findOrCreate', { symbol, name })
		const type = this.getTickerType(symbol)

		return prisma.ticker.upsert({
			where: { id: symbol },
			update: { name },
			create: {
				id: symbol,
				name,
				type,
			},
		})
	}

	private getTickerType(symbol: string): TickerType | null {
		for (const [type, symbols] of Object.entries(config.tickers.type)) {
			if (symbols.includes(symbol.toLocaleUpperCase())) {
				return type.toUpperCase() as TickerType
			}
		}

		return null
	}
}
