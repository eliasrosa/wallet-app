import type { Ticker } from '@prisma/client'

export interface TickerRepositoryInterface {
	findOrFail(id: string): Promise<Ticker>
	findOrCreate(symbol: string, name?: string): Promise<Ticker>
}
