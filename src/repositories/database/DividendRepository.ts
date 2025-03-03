import type {
	CreateData,
	DividendRepositoryInterface,
} from '@/repositories/database/interfaces/DividendRepositoryInterface'
import { type Dividend, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class DividendRepository implements DividendRepositoryInterface {
	async create(data: CreateData): Promise<Dividend> {
		console.log('DividendRepository.create', data)

		const dividends = await prisma.dividend.findMany({
			where: { hash: data.hash },
		})

		if (dividends.length > 0) {
			console.log('DividendRepository.create', 'OK - already exists')
			return dividends[0]
		}

		return prisma.dividend.create({
			data: {
				paymentAt: data.paymentAt,
				quantity: data.quantity,
				price: data.price,
				total: data.total,
				hash: data.hash, //Math.random().toString(36).substring(7),
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
