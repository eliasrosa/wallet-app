import type {
	CreateData,
	MovementRepositoryInterface,
} from '@/repositories/database/interfaces/MovementRepositoryInterface'
import { type Movement, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class MovementRepository implements MovementRepositoryInterface {
	async create(data: CreateData): Promise<Movement> {
		console.log('MovementRepository.create', data)
		return prisma.movement.upsert({
			where: { hash: data.hash },
			update: {},
			create: {
				hash: data.hash,
				price: data.price,
				total: data.total,
				quantity: data.quantity,
				isCredit: data.isCredit,
				movementAt: data.movementAt,
				ticker: { connect: { id: data.tickerId } },
				movementType: { connect: { id: data.movementTypeId } },
				institution: { connect: { id: data.institutionId } },
			},
		})
	}

	async clearAll(): Promise<void> {
		console.log('DividendTypeRepository.clearAll')
		await prisma.movement.deleteMany()
	}
}
