import { prisma } from '@/lib/prisma'
import type {
	CreateData,
	NegotiationRepositoryInterface,
} from '@/repositories/database/interfaces/NegotiationRepositoryInterface'
import type { Negotiation } from '@prisma/client'

export class NegotiationRepository implements NegotiationRepositoryInterface {
	async create(data: CreateData): Promise<Negotiation> {
		console.log('NegotiationRepository.create', data)

		return prisma.negotiation.create({
			data: {
				quantity: data.quantity,
				price: data.price,
				total: data.total,
				negotiationCode: data.negotiationCode,
				negotiationAt: data.negotiationAt,
				dueDate: data.dueDate,
				market: data.market,
				user: { connect: { id: data.userId } },
				ticker: { connect: { id: data.tickerId } },
				movementType: { connect: { id: data.movementTypeId } },
				institution: { connect: { id: data.institutionId } },
			},
		})
	}

	async deleteByYear(userId: string, year: number): Promise<void> {
		await prisma.negotiation.deleteMany({
			where: {
				userId,
				negotiationAt: {
					gte: new Date(`${year}-01-01`),
					lte: new Date(`${year}-12-31`),
				},
			},
		})
	}
}
