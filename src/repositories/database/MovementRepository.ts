import { prisma } from '@/lib/prisma'
import type {
	CreateData,
	MovementRepositoryInterface,
} from '@/repositories/database/interfaces/MovementRepositoryInterface'
import type { Movement } from '@prisma/client'

export class MovementRepository implements MovementRepositoryInterface {
	async create(data: CreateData): Promise<Movement> {
		console.log('MovementRepository.create', data)

		return prisma.movement.create({
			data: {
				price: data.price,
				total: data.total,
				quantity: data.quantity,
				isCredit: data.isCredit,
				movementAt: data.movementAt,
				user: { connect: { id: data.userId } },
				ticker: { connect: { id: data.tickerId } },
				movementType: { connect: { id: data.movementTypeId } },
				institution: { connect: { id: data.institutionId } },
			},
		})
	}

	async deleteByYear(userId: string, year: number): Promise<void> {
		await prisma.movement.deleteMany({
			where: {
				userId,
				movementAt: {
					gte: new Date(`${year}-01-01`),
					lte: new Date(`${year}-12-31`),
				},
			},
		})
	}
}
