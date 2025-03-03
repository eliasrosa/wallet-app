import type {
	CreateData,
	DividendRepositoryInterface,
} from '@/repositories/database/interfaces/DividendRepositoryInterface'
import { type Dividend, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class DividendRepository implements DividendRepositoryInterface {
	async create(data: CreateData): Promise<Dividend> {
		console.log('DividendRepository.create', data)
		return prisma.dividend.upsert({
			where: { hash: data.hash },
			update: {},
			create: {
				paymentAt: data.paymentAt,
				quantity: data.quantity,
				price: data.price,
				total: data.total,
				hash: data.hash,
				ticker: { connect: { id: data.tickerId } },
				institution: { connect: { id: data.institutionId } },
				dividendType: { connect: { id: data.dividendTypeId } },
			},
		})
	}

	async clearAll(): Promise<void> {
		console.log('DividendTypeRepository.clearAll')
		await prisma.dividend.deleteMany()
	}
}
