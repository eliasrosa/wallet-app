import { prisma } from '@/lib/prisma'
import type {
	CreateData,
	DividendRepositoryInterface,
} from '@/repositories/database/interfaces/DividendRepositoryInterface'
import type { Dividend } from '@prisma/client'

export class DividendRepository implements DividendRepositoryInterface {
	async create(data: CreateData): Promise<Dividend> {
		console.log('DividendRepository.create', data)

		return prisma.dividend.create({
			data: {
				paymentAt: data.paymentAt,
				quantity: data.quantity,
				price: data.price,
				total: data.total,
				user: { connect: { id: data.userId } },
				ticker: { connect: { id: data.tickerId } },
				institution: { connect: { id: data.institutionId } },
				dividendType: { connect: { id: data.dividendTypeId } },
			},
		})
	}

	async deleteByYear(userId: string, year: number): Promise<void> {
		await prisma.dividend.deleteMany({
			where: {
				userId,
				paymentAt: {
					gte: new Date(`${year}-01-01`),
					lte: new Date(`${year}-12-31`),
				},
			},
		})
	}
}
