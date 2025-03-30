import { prisma } from '@/lib/prisma'
import type {
	CreateData,
	NegotiationRepositoryInterface,
} from '@/repositories/database/interfaces/NegotiationRepositoryInterface'
import type { Negotiation } from '@prisma/client'

export class NegotiationRepository implements NegotiationRepositoryInterface {
	async create(data: CreateData): Promise<Negotiation> {
		console.log('NegotiationRepository.findOrCreate', data.tickerId)
		return prisma.negotiation.create({
			data: {
				tickerId: data.tickerId,
				quantity: data.quantity,
				price: data.price,
				total: data.total,
				movementTypeId: data.movementTypeId,
				institutionId: data.institutionId,
				negotiationCode: data.negotiationCode,
				negotiationAt: data.negotiationAt,
				dueDate: data.dueDate,
				market: data.market,
			},
		})
	}

	async clearByUserIdAndYear(userId: string, year: number): Promise<void> {
		await prisma.negotiation.deleteMany({
			where: {
				negotiationAt: {
					gte: new Date(`${year}-01-01`),
					lte: new Date(`${year}-12-31`),
				},
			},
		})
	}
}
