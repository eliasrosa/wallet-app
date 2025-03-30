import type { Dividend } from '@prisma/client'

export interface CreateData {
	paymentAt: Date
	quantity?: number | null
	price?: number | null
	total: number
	tickerId: string
	userId: string
	institutionId: string
	dividendTypeId: string
}

export interface DividendRepositoryInterface {
	create(data: CreateData): Promise<Dividend>
	deleteByYear(userId: string, year: number): Promise<void>
}
