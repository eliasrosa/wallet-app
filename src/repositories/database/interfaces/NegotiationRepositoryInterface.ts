import type { Negotiation } from '@prisma/client'

export interface CreateData {
	tickerId: string
	userId: string
	quantity: number
	price: number
	total: number
	movementTypeId: string
	institutionId: string
	negotiationCode: string
	negotiationAt: Date
	dueDate?: Date
	market: string
}

export interface NegotiationRepositoryInterface {
	create(data: CreateData): Promise<Negotiation>
	deleteByYear(userId: string, year: number): Promise<void>
}
